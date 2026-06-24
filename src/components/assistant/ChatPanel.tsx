import { useState, useRef, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  sendMessageStreaming,
  type AssistantMessage,
} from "@/api/assistantService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatPanelProps {
  courseId: number;
}

function ChatPanel({ courseId }: ChatPanelProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError("");

    const userMsg: AssistantMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    setLoading(true);
    const assistantMsg: AssistantMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      await sendMessageStreaming(courseId, updatedMessages, (chunk) => {
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last && last.role === "assistant") {
            copy[copy.length - 1] = {
              ...last,
              content: last.content + chunk,
            };
          }
          return copy;
        });
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Failed to get response. Make sure the assistant backend is running.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, courseId]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-border-light rounded-2xl bg-surface overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !loading && (
          <p className="text-text-muted text-sm text-center pt-8">
            Ask questions about the course materials
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent text-white rounded-br-md"
                  : "bg-bg-alt text-text rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                msg.content ? (
                  <div className="markdown">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <span className="italic opacity-60">Thinking...</span>
                )
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="px-4 pb-1 text-xs text-red-500">{error}</p>
      )}

      <div className="border-t border-border-light p-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder={user ? "Ask a question..." : "Log in to ask questions"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!user || loading}
          className="flex-1 px-4 py-2 bg-bg border border-border rounded-xl text-text placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!user || loading || !input.trim()}
          className="px-5 py-2 bg-accent hover:bg-accent-hover disabled:bg-accent-hover/50 text-white text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
