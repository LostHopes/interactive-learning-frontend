import { useState } from "react";
import type { CreateCourseData, UpdateCourseData } from "@/api/courseService";

interface Props {
  initial?: { title: string; category: string; description: string; avatarUrl: string };
  onSubmit: (data: CreateCourseData | UpdateCourseData) => Promise<void>;
  submitLabel: string;
  loading: boolean;
}

function CourseForm({ initial, onSubmit, submitLabel, loading }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatarUrl ?? "");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        category: category.trim() || undefined,
        description: description.trim() || undefined,
        avatarUrl: avatarUrl.trim() || undefined,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium text-[var(--color-text)]">
          Title *
        </label>
        <input
          type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
          required disabled={loading}
          className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 disabled:opacity-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-sm font-medium text-[var(--color-text)]">
          Category
        </label>
        <input
          type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 disabled:opacity-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm font-medium text-[var(--color-text)]">
          Description
        </label>
        <textarea
          id="description" value={description} onChange={(e) => setDescription(e.target.value)}
          rows={4} disabled={loading}
          className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 disabled:opacity-50 resize-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="avatarUrl" className="text-sm font-medium text-[var(--color-text)]">
          Avatar URL
        </label>
        <input
          type="url" id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)}
          disabled={loading}
          className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200 disabled:opacity-50"
        />
      </div>
      <button
        type="submit" disabled={loading}
        className="w-full py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-accent-hover)] text-white font-medium rounded-xl transition-all duration-200 mt-2"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default CourseForm;
