"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Copy,
  Check,
  ArrowUpRight,
  Loader2,
  Bot,
  MessageSquare,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { profile } from "@/lib/data";

type Msg = {
  role: "user" | "assistant";
  content: string;
  links?: { href: string; title: string }[];
  suggestions?: string[];
};

const INITIAL_SUGGESTIONS = [
  "Who is Kunal?",
  "Explain his technical projects",
  "Tell me about Gurukul.ai",
  "What technologies does he work with?",
  "What is his experience with AI and ML?",
  "What makes his projects different?",
  "What is his educational background?",
  "How can I contact him?",
];

const MAX_INPUT = 500;

export default function FloatingAssistant() {
  const { assistantOpen, setAssistantOpen } = useApp();
  const [messages, setMessages] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = sessionStorage.getItem("ask-kunal-chat");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showWelcomePill, setShowWelcomePill] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Persist messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("ask-kunal-chat", JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  // Show friendly welcome bubble once after 3.2 seconds if not opened yet
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePill(true);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Autoscroll to bottom
  useEffect(() => {
    if (assistantOpen) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, assistantOpen]);

  // Focus input when opened
  useEffect(() => {
    if (assistantOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
  }, [assistantOpen]);

  const clearChat = () => {
    setMessages([]);
    setError(null);
    try {
      sessionStorage.removeItem("ask-kunal-chat");
    } catch {}
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;

    setShowWelcomePill(false);
    setError(null);

    const nextMessages: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.answer,
          links: data.links,
          suggestions: data.suggestions,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* 1. Floating Trigger Button with Ambient Pulse & Welcome Pill */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Occasional Welcome Pill */}
        <AnimatePresence>
          {showWelcomePill && !assistantOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              className="glass-pill relative flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs text-white shadow-2xl border border-cyan/30"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-cyan/20 text-cyan">
                <Sparkles size={12} />
              </div>
              <span className="font-medium">Curious about Kunal&apos;s projects? Ask me!</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWelcomePill(false);
                }}
                className="ml-1 rounded-md p-0.5 text-slate-400 hover:text-white"
                aria-label="Dismiss greeting"
              >
                <X size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Button */}
        <div className="relative group">
          {/* Subtle Ambient Breathing Glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-cyan via-blue-500 to-violet-500 blur-2xl opacity-40 animate-pulse duration-1000 group-hover:opacity-75 transition-opacity"
            aria-hidden
          />

          <button
            onClick={() => {
              setAssistantOpen(!assistantOpen);
              setShowWelcomePill(false);
            }}
            aria-label="Ask Kunal - AI Portfolio Assistant"
            className={`relative flex h-[76px] w-[76px] sm:h-[88px] sm:w-[88px] items-center justify-center rounded-full border border-cyan/40 bg-slate-950/90 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 hover:scale-105 active:scale-95 ${
              assistantOpen ? "border-cyan/70 shadow-[0_0_30px_rgba(56,189,248,0.45)]" : ""
            }`}
          >
            {/* Outer Subtle Glass Track */}
            <div className="pointer-events-none absolute inset-1 rounded-full border border-white/10" />

            {/* Rotating Circular Text Boundary: ASK KUNAL */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <svg
                className="h-full w-full animate-[spin_20s_linear_infinite] group-hover:[animation-duration:12s] transition-all"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="askKunalBoundaryPath"
                    d="M 50, 50 m -38, 0 a 38, 38 0 1, 1 76, 0 a 38, 38 0 1, 1 -76, 0"
                  />
                </defs>
                <text className="font-mono text-[7px] font-bold uppercase tracking-[0.24em] fill-cyan/90">
                  <textPath href="#askKunalBoundaryPath">
                    ✦ ASK KUNAL ✦ ASK KUNAL ✦
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Inner Circular Portrait Container */}
            <div className="relative flex h-[46px] w-[46px] sm:h-[56px] sm:w-[56px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-slate-900 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <Image
                src={profile.portraitPath || "/images/kunal.png"}
                alt="Ask Kunal"
                fill
                sizes="64px"
                className="object-cover object-center"
              />

              {/* Specular Edge Highlight */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.15] ring-1 ring-inset ring-white/20"
                aria-hidden
              />

              {/* Close State Overlay when Assistant is Open */}
              {assistantOpen && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm transition-opacity">
                  <X size={20} className="text-white transition-transform duration-300 group-hover:rotate-90" />
                </div>
              )}
            </div>

            {/* Online Indicator Badge */}
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-20 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950" />
            </span>
          </button>
        </div>
      </div>

      {/* 2. Floating Chat Interface */}
      <AnimatePresence>
        {assistantOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAssistantOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 inset-x-0 sm:bottom-24 sm:right-6 sm:inset-x-auto z-50 flex h-[85vh] sm:h-[590px] w-full sm:w-[420px] max-h-[calc(100vh-100px)] flex-col rounded-t-3xl sm:rounded-3xl border border-white/[0.14] bg-slate-950/95 sm:bg-slate-950/90 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.12)] overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Ask Kunal AI Assistant"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/40 px-5 py-3.5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan/40 bg-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                    <Image
                      src={profile.portraitPath || "/images/kunal.png"}
                      alt="Ask Kunal"
                      fill
                      sizes="40px"
                      className="object-cover object-center"
                    />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-slate-950" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold tracking-tight text-white">Ask Kunal</h2>
                      <span className="rounded-full bg-cyan/10 px-2 py-0.2 font-mono text-[10px] font-semibold text-cyan border border-cyan/25">
                        AI Portfolio
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Your guide to Kunal&apos;s engineering journey
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="rounded-xl p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
                      title="Clear conversation"
                      aria-label="Clear conversation"
                    >
                      <RotateCcw size={15} />
                    </button>
                  )}
                  <button
                    onClick={() => setAssistantOpen(false)}
                    className="rounded-xl p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition-colors"
                    aria-label="Close assistant"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                {messages.length === 0 ? (
                  <div className="space-y-4 pt-2">
                    {/* Welcome Introduction */}
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 space-y-2">
                      <p className="text-white font-medium flex items-center gap-2">
                        <Bot size={15} className="text-cyan" />
                        Hello! I am Kunal&apos;s AI Portfolio Assistant.
                      </p>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        I am grounded in Kunal&apos;s verified engineering projects, technical stack, architecture specifications, and background.
                      </p>
                    </div>

                    {/* Suggested Question Chips */}
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2.5 font-semibold flex items-center gap-1.5">
                        <MessageSquare size={12} className="text-cyan" /> Suggested Questions
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {INITIAL_SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => send(s)}
                            className="w-full text-left rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-xs text-slate-200 hover:border-cyan/40 hover:bg-cyan/10 hover:text-white transition-all duration-200"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        m.role === "user" ? "items-end" : "items-start"
                      } space-y-1.5`}
                    >
                      {/* Message Bubble */}
                      <div
                        className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed text-xs sm:text-sm ${
                          m.role === "user"
                            ? "bg-blue-600/35 text-white border border-blue-500/35 rounded-br-sm shadow-md"
                            : "bg-white/[0.04] text-slate-200 border border-white/[0.09] rounded-tl-sm shadow-lg whitespace-pre-line"
                        }`}
                      >
                        <FormattedMessage content={m.content} />
                      </div>

                      {/* Assistant Actions Bar: Copy + Links */}
                      {m.role === "assistant" && (
                        <div className="flex flex-wrap items-center gap-2 px-1 text-[11px]">
                          <button
                            onClick={() => copyToClipboard(m.content, idx)}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            {copiedIdx === idx ? (
                              <>
                                <Check size={11} className="text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {/* Clickable Citations */}
                          {m.links && m.links.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                              {m.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  onClick={() => setAssistantOpen(false)}
                                  className="inline-flex items-center gap-1 rounded-md bg-cyan/15 px-2 py-0.5 font-mono text-[10px] font-medium text-cyan hover:bg-cyan/25 border border-cyan/30 transition-colors"
                                >
                                  <span>{link.title || link.href}</span>
                                  <ArrowUpRight size={10} />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Follow-up Suggestion Chips under the last assistant message */}
                      {m.role === "assistant" &&
                        idx === messages.length - 1 &&
                        m.suggestions &&
                        m.suggestions.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-white/[0.06] w-full">
                            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">
                              Follow-up questions:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {m.suggestions.map((sug) => (
                                <button
                                  key={sug}
                                  onClick={() => send(sug)}
                                  className="rounded-lg border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[11px] text-cyan hover:bg-cyan/20 hover:border-cyan/50 transition-all text-left"
                                >
                                  {sug} →
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))
                )}

                {/* Loading Typing Indicator */}
                {loading && (
                  <div className="flex items-center gap-2 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-xs text-slate-300 w-fit">
                    <Loader2 size={13} className="animate-spin text-cyan" />
                    <span className="font-mono text-[11px] text-slate-400">
                      Grounded synthesis in progress…
                    </span>
                  </div>
                )}

                {/* Error Banner */}
                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                    {error}
                  </div>
                )}

                <div ref={endRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/[0.08] bg-black/60 p-3.5 backdrop-blur-md">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                    onKeyDown={onKeyDown}
                    placeholder="Ask me anything about Kunal..."
                    disabled={loading}
                    className="flex-1 resize-none rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 outline-none focus:border-cyan transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-black hover:bg-white/90 disabled:opacity-40 transition-all shadow-[0_4px_15px_rgba(255,255,255,0.25)] active:scale-95"
                  >
                    <Send size={15} />
                  </button>
                </form>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Enter to send · Shift+Enter new line</span>
                  <span>Ask Kunal AI</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Lightweight Markdown formatter component for structured readability
function FormattedMessage({ content }: { content: string }) {
  // Split into paragraphs / lines
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        // Header ###
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={i} className="font-semibold text-white text-sm sm:text-base pt-1 pb-0.5">
              {trimmed.replace(/^###\s+/, "")}
            </h4>
          );
        }

        // Bullet point
        if (trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const text = trimmed.replace(/^[•\-*]\s+/, "");
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="text-cyan mt-1 select-none">•</span>
              <span className="flex-1">{formatInline(text)}</span>
            </div>
          );
        }

        return <p key={i}>{formatInline(trimmed)}</p>;
      })}
    </div>
  );
}

function formatInline(text: string) {
  // Regex to format `code`, **bold**, *italic*
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-cyan"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={index} className="text-slate-300 italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
