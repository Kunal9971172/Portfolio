"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search, FileText, Bot, Briefcase, Compass, Home, FolderGit2, Mail, Layers, Cpu, Sparkles, Activity } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { profile } from "@/lib/data";

type Item = {
  label: string;
  category: "Navigation" | "Projects" | "Actions";
  hint: string;
  href?: string;
  download?: boolean;
  icon: React.ComponentType<{ size: number; className?: string }>;
};

const items: Item[] = [
  { label: "Home", category: "Navigation", hint: "Landing & Overview", href: "/", icon: Home },
  { label: "About", category: "Navigation", hint: "Background & Academics", href: "/about", icon: Compass },
  { label: "Projects", category: "Navigation", hint: "All Engineering Works", href: "/projects", icon: FolderGit2 },
  { label: "Experience", category: "Navigation", hint: "Internships & Teaching", href: "/experience", icon: Briefcase },
  { label: "Mission Control", category: "Navigation", hint: "Tech Radar & Learning", href: "/mission-control", icon: Activity },
  { label: "Contact", category: "Navigation", hint: "Get in touch", href: "/contact", icon: Mail },
  { label: "Gurukul.ai", category: "Projects", hint: "Coding Assessment Platform", href: "/projects/gurukul-ai", icon: Cpu },
  { label: "EduReach", category: "Projects", hint: "AI Admission Platform", href: "/projects/edureach", icon: Bot },
  { label: "WorkflowAI", category: "Projects", hint: "Multi-Agent Automation", href: "/projects/workflow-ai", icon: Layers },
  { label: "Heart Disease Predictor", category: "Projects", hint: "Clinical ML Classification", href: "/projects/heart-disease-predictor", icon: Sparkles },
  { label: "Ask Kunal AI", category: "Actions", hint: "Interactive Assistant", href: "/ask-kunal", icon: Sparkles },
  { label: "Download Resume", category: "Actions", hint: "PDF Document", href: profile.resumePath, download: true, icon: FileText },
];

export default function CommandCenter() {
  const { commandOpen } = useApp();
  return commandOpen ? <Palette /> : null;
}

function Palette() {
  const { setCommandOpen } = useApp();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () =>
      items.filter(
        (i) =>
          i.label.toLowerCase().includes(q.trim().toLowerCase()) ||
          i.hint.toLowerCase().includes(q.trim().toLowerCase()) ||
          i.category.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [q],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const run = (item?: Item) => {
    if (!item?.href) return;
    setCommandOpen(false);
    if (item.download) {
      const a = document.createElement("a");
      a.href = item.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.download = "Kunal_Chaudhari_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      router.push(item.href);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setCommandOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") run(results[idx]);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 px-4 pt-[15vh] backdrop-blur-md animate-in fade-in duration-150"
      onMouseDown={() => setCommandOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command center"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/[0.14] bg-slate-950/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.15)] backdrop-blur-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5 bg-white/[0.02]">
          <Search size={18} className="text-cyan shrink-0" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            placeholder="Type a command, project name, or navigation..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500 font-sans"
            aria-label="Search commands"
          />
          <kbd className="rounded-md border border-white/[0.1] bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <ul className="max-h-80 overflow-y-auto p-2 space-y-1" role="listbox">
          {results.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-slate-500 font-mono">
              No matching pages or actions found
            </li>
          )}
          {results.map((r, i) => {
            const Icon = r.icon;
            const isSelected = i === idx;
            return (
              <li key={r.label} role="option" aria-selected={isSelected}>
                <button
                  onMouseEnter={() => setIdx(i)}
                  onClick={() => run(r)}
                  className={`flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-left transition-all ${
                    isSelected
                      ? "bg-white/[0.1] text-white shadow-sm border border-white/[0.12]"
                      : "text-slate-300 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                        isSelected
                          ? "border-cyan/40 bg-cyan/20 text-cyan"
                          : "border-white/[0.08] bg-white/[0.04] text-slate-400"
                      }`}
                    >
                      <Icon size={15} />
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-none text-white">{r.label}</p>
                      <p className="mt-1 text-xs text-slate-400 leading-none">{r.hint}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-slate-400 border border-white/[0.06]">
                      {r.category}
                    </span>
                    {isSelected && <CornerDownLeft size={13} className="text-cyan" />}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Keyboard Helper Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2.5 bg-black/60 text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </span>
          <span className="text-cyan">Kunal Chaudhari HQ</span>
        </div>
      </div>
    </div>
  );
}
