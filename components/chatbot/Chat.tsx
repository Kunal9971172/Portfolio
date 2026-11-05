"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string; links?: { href: string; title: string }[] };

const SUGGESTIONS = [
  "Who is Kunal Chaudhari?",
  "What is the architecture of Gurukul.ai?",
  "Explain EduReach's Agentic RAG pipeline",
  "How does WorkflowAI handle self-healing?",
  "Explain the ML models in Heart Disease Predictor",
  "What are Kunal's core technical skills?",
];

const MAX = 500;

export default function Chat() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat")
      .then((r) => r.json())
      .then((j) => setConfigured(Boolean(j.configured)))
      .catch(() => setConfigured(false));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Something went wrong.");
      setMessages([...next, { role: "assistant", content: j.answer, links: j.links }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (configured === false) {
    return (
      <div className="liquid-glass max-w-2xl rounded-3xl p-7 border border-white/[0.1] shadow-2xl">
        <div className="flex items-center gap-2 text-cyan font-mono text-xs uppercase tracking-wider mb-2">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Server Configuration Notice
        </div>
        <h2 className="text-lg font-semibold text-white">Assistant Engine Ready</h2>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          The chat architecture is built and ready. Provide a provider API key (Gemini, OpenAI, or Anthropic) in{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-cyan">.env.local</code> to activate live inference. All project knowledge chunks are pre-indexed.
        </p>
      </div>
    );
  }

  return (
    <div className="liquid-glass flex h-[72vh] max-w-3xl flex-col rounded-3xl border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Chat Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/60 px-5 py-3.5 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
          <span className="font-semibold text-white">Ask Kunal AI</span>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">· Grounded Portfolio Assistant</span>
        </div>
        <span className="font-mono text-[10px] text-cyan rounded-full bg-cyan/10 px-2.5 py-0.5 border border-cyan/25">
          Grounded v2.4
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" aria-live="polite">
        {messages.length === 0 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Ask any question about Kunal Chaudhari&apos;s architectures, verified projects, tech stack, or engineering background.
            </p>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2.5">
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={configured !== true}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 hover:border-cyan/40 hover:bg-cyan/10 hover:text-white transition-all disabled:opacity-50 text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-blue-600/30 text-white border border-blue-500/30 rounded-br-none shadow-md"
                  : "bg-white/[0.05] text-slate-200 border border-white/[0.08] rounded-tl-none shadow-md"
              }`}
            >
              {m.content}
              {m.links && m.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-white/[0.08] pt-2.5">
                  {m.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="rounded bg-cyan/15 px-2 py-0.5 font-mono text-xs text-cyan hover:underline border border-cyan/25"
                    >
                      {l.title || l.href}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-cyan font-mono" role="status">
            <Loader2 size={15} className="animate-spin text-cyan" /> Grounding response in portfolio chunks…
          </div>
        )}
        {error && (
          <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2.5 border-t border-white/[0.08] bg-black/60 p-3 sm:p-4"
      >
        <label htmlFor="chat-input" className="sr-only">
          Ask a question about Kunal
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX))}
          placeholder={configured === null ? "Initializing assistant…" : "Ask about Kunal's work, tech stack, or projects…"}
          disabled={configured !== true}
          className="min-w-0 flex-1 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan transition-colors"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={loading || !input.trim() || configured !== true}
          aria-label="Send message"
          className="rounded-xl bg-white p-2.5 text-black hover:bg-white/90 disabled:opacity-40 transition-colors shadow-sm"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
