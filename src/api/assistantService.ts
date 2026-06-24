import axios from "axios";
import { getAuthToken } from "@/utils/api";

const assistantApi = axios.create({
  baseURL: import.meta.env.VITE_ASSISTANT_API_BASE_URL ?? "http://localhost:8000",
});

assistantApi.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface AssistantMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  course_id: number;
  model?: string;
  messages: AssistantMessage[];
  stream?: boolean;
}

export interface DocumentInfo {
  id: string;
  filename: string;
  size: number;
  created: number;
  chunk_count: number;
}

export async function sendMessage(
  courseId: number,
  messages: AssistantMessage[],
  signal?: AbortSignal
): Promise<{ content: string }> {
  const payload: ChatRequest = {
    course_id: courseId,
    messages,
    stream: false,
  };

  const res = await assistantApi.post("/v1/chat/completions", payload, {
    signal,
  });

  return { content: res.data.choices[0]?.message?.content ?? "" };
}

export async function sendMessageStreaming(
  courseId: number,
  messages: AssistantMessage[],
  onChunk: (text: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const token = getAuthToken();
  const payload: ChatRequest = {
    course_id: courseId,
    messages,
    stream: true,
  };

  const response = await fetch(
    `${import.meta.env.VITE_ASSISTANT_API_BASE_URL ?? "http://localhost:8000"}/v1/chat/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(`Chat request failed: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body stream");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data: ")) continue;

      const data = trimmed.slice(6);
      if (data === "[DONE]") return;

      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) {
          onChunk(delta);
        }
      } catch {
        // skip malformed chunks
      }
    }
  }
}

export async function getDocuments(courseId: number): Promise<DocumentInfo[]> {
  const res = await assistantApi.get(`/courses/${courseId}/documents`);
  return res.data.documents ?? [];
}

export async function uploadDocument(
  courseId: number,
  file: File
): Promise<DocumentInfo> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await assistantApi.post(
    `/courses/${courseId}/documents`,
    formData
  );
  return res.data;
}

export async function deleteDocument(
  courseId: number,
  docId: string
): Promise<void> {
  await assistantApi.delete(`/courses/${courseId}/documents/${docId}`);
}
