"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Command, Download, Eye, Menu, Sparkles, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { useApp } from "@/components/providers/AppProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { recruiter, toggleRecruiter, setCommandOpen } = useApp();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Primary"
        className="glass-pill mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7)]"
      >
        {/* Brand Monogram & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan/15 border border-cyan/30 text-xs font-mono font-bold text-cyan transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
            KC
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-white group-hover:text-cyan transition-colors sm:text-sm">
            {profile.brand}
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`relative rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive(l.href)
                    ? "bg-white/[0.12] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-cyan" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions Bar */}
        <div className="flex items-center gap-2">
          {/* Quick Cmd+K Palette Trigger */}
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-300 hover:border-white/[0.18] hover:text-white md:flex transition-colors"
            aria-label="Open command center"
          >
            <Command size={13} className="text-cyan" />
            <span className="font-mono text-[11px] text-slate-400">Search</span>
            <kbd className="rounded bg-white/[0.08] px-1.5 py-0.2 font-mono text-[10px] text-slate-400 border border-white/[0.06]">
              ⌘K
            </kbd>
          </button>

          {/* Recruiter Mode Button */}
          <button
            onClick={toggleRecruiter}
            aria-pressed={recruiter}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
              recruiter
                ? "border-cyan/60 bg-cyan/15 text-cyan shadow-[0_0_20px_rgba(56,189,248,0.25)]"
                : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/[0.18] hover:text-white"
            }`}
          >
            <Eye size={13} className={recruiter ? "text-cyan" : "text-slate-400"} />
            <span className="hidden sm:inline">
              {recruiter ? "Recruiter: ON" : "Recruiter Mode"}
            </span>
          </button>

          {/* Resume Download CTA */}
          <a
            href={profile.resumePath}
            download
            className="hidden items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-white/90 shadow-[0_4px_15px_rgba(255,255,255,0.2)] transition-all sm:flex"
          >
            <Download size={13} />
            <span>Resume</span>
          </a>

          {/* Ask Kunal AI */}
          <Link
            href="/ask-kunal"
            aria-label="Ask Kunal AI Assistant"
            className="flex items-center gap-1.5 rounded-xl border border-cyan/40 bg-cyan/15 px-3 py-1.5 text-xs font-medium text-cyan hover:bg-cyan/25 transition-all shadow-[0_0_15px_rgba(56,189,248,0.15)]"
          >
            <Sparkles size={13} />
            <span className="hidden md:inline">Ask AI</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-xl border border-white/[0.1] bg-white/[0.04] p-1.5 text-slate-300 hover:text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="glass-pill mx-auto mt-2 max-w-6xl rounded-2xl p-3 lg:hidden shadow-[0_20px_45px_rgba(0,0,0,0.8)] border border-white/[0.15] space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                isActive(l.href)
                  ? "bg-cyan/15 text-cyan font-semibold border border-cyan/30"
                  : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span>{l.label}</span>
              {isActive(l.href) && <span className="h-1.5 w-1.5 rounded-full bg-cyan" />}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2 px-1">
            <a
              href={profile.resumePath}
              download
              className="flex-1 text-center rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-white/90 transition-colors"
            >
              Download Resume
            </a>
            <button
              onClick={() => {
                toggleRecruiter();
                setOpen(false);
              }}
              className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-300"
            >
              {recruiter ? "Normal Mode" : "Recruiter Mode"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
