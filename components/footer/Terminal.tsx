"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { profile, projects, experience, currentlyUsed } from "@/lib/data";

type Line = { kind: "in" | "out"; text: string };

const COMMANDS = ["help", "about", "projects", "skills", "experience", "resume", "contact", "clear"];
const HELP = "Available commands: help, about, projects, skills, experience, resume, contact, clear";

export default function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Kunal Chaudhari Engineering Shell v2.4 initialized." },
    { kind: "out", text: "Type 'help' or click any command shortcut below to explore." },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const out: string[] = [];
    switch (cmd) {
      case "":
        break;
      case "help":
        out.push(HELP);
        break;
      case "about":
        out.push(
          profile.positioning,
          `${profile.title} · ${profile.location} · CGPA ${profile.cgpa}/10`,
        );
        break;
      case "projects":
        projects.forEach((p) => out.push(`[${p.index}] ${p.name}: ${p.title}`));
        out.push("Navigating to /projects…");
        router.push("/projects");
        break;
      case "skills":
        currentlyUsed.forEach((g) =>
          out.push(`${g.group}: ${g.items.slice(0, 6).join(", ")}…`),
        );
        break;
      case "experience":
        experience.forEach((e) => out.push(`${e.role} — ${e.org} (${e.period})`));
        out.push("Navigating to /experience…");
        router.push("/experience");
        break;
      case "resume": {
        out.push("Downloading verified resume PDF…");
        const a = document.createElement("a");
        a.href = profile.resumePath;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.download = "Kunal_Chaudhari_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        break;
      }
      case "contact":
        out.push(`Direct Email: ${profile.email}`, "Navigating to /contact…");
        router.push("/contact");
        break;
      case "clear":
        setLines([]);
        setValue("");
        return;
      default:
        out.push(`Command not recognized: '${cmd}'. Type 'help' for available commands.`);
    }
    setLines((l) => [
      ...l,
      { kind: "in", text: raw },
      ...out.map((t) => ({ kind: "out" as const, text: t })),
    ]);
    setValue("");
  };

  return (
    <div
      className="liquid-glass overflow-hidden rounded-3xl shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/60 px-4 py-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-slate-300 flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-cyan" />
            kunal@engineering-hq: ~ (zsh)
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Shell Ready
        </span>
      </div>

      {/* Terminal Output Log */}
      <div className="p-5 font-mono text-xs sm:text-sm">
        <div className="max-h-56 space-y-1.5 overflow-y-auto" aria-live="polite">
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === "in"
                  ? "text-cyan font-semibold"
                  : "text-slate-300 leading-relaxed"
              }
            >
              {l.kind === "in" ? `$ ${l.text}` : l.text}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
          }}
          className="mt-3.5 flex items-center gap-2 border-t border-white/[0.06] pt-3"
        >
          <label htmlFor="term" className="whitespace-nowrap font-mono text-xs text-cyan font-bold">
            kunal@engineering-hq:~$
          </label>
          <input
            id="term"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Type a command (or click below)..."
            className="w-full bg-transparent font-mono text-xs text-white outline-none placeholder:text-slate-600"
          />
          <CornerDownLeft size={13} className="text-slate-500 shrink-0" />
        </form>

        {/* Quick Command Pills */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-white/[0.04] pt-2.5 text-[11px]">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono mr-1">
            Shortcuts:
          </span>
          {COMMANDS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => run(c)}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-400 hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
