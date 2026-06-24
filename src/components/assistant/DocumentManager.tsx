import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  getDocuments,
  uploadDocument,
  deleteDocument,
  type DocumentInfo,
} from "@/api/assistantService";

interface DocumentManagerProps {
  courseId: number;
}

function DocumentManager({ courseId }: DocumentManagerProps) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const canManage = user?.roles?.some((r) =>
    ["PROFESSOR", "MODERATOR"].includes(r.title)
  );

  const fetchDocuments = useCallback(async () => {
    try {
      setError("");
      const docs = await getDocuments(courseId);
      setDocuments(docs);
    } catch {
      setError("Failed to load documents");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "md") {
      setError("Only PDF and MD files are supported");
      return;
    }

    setUploading(true);
    setError("");
    try {
      await uploadDocument(courseId, file);
      await fetchDocuments();
    } catch {
      setError("Failed to upload document");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(docId: string) {
    if (!window.confirm("Delete this document?")) return;
    try {
      setError("");
      await deleteDocument(courseId, docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
    } catch {
      setError("Failed to delete document");
    }
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h3
        className="text-base font-semibold text-text mb-3"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Course Documents
      </h3>

      {canManage && (
        <div className="mb-4">
          <label className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent transition-colors text-sm text-text-muted hover:text-accent">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {uploading ? "Uploading..." : "Upload PDF or Markdown"}
            <input
              type="file"
              accept=".pdf,.md"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      {loading ? (
        <p className="text-sm text-text-muted">Loading documents...</p>
      ) : documents.length === 0 ? (
        <p className="text-sm text-text-muted italic">
          No documents uploaded yet
        </p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between px-4 py-2.5 bg-bg border border-border-light rounded-xl text-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-text-muted shrink-0">
                  {doc.filename.endsWith(".pdf") ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </span>
                <span className="truncate text-text">{doc.filename}</span>
                <span className="text-text-muted text-xs shrink-0">
                  {formatSize(doc.size)}
                </span>
              </div>
              {canManage && (
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-red-400 hover:text-red-600 transition-colors shrink-0 ml-2"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocumentManager;
