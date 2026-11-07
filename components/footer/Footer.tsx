import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { navLinks, profile } from "@/lib/data";
import Terminal from "./Terminal";

export default function Footer() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-6xl px-4 pb-12 sm:px-6">
      {/* Interactive Terminal Easter Egg */}
      <Terminal />

      {/* Structured Footer Navigation & Presence */}
      <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/[0.08] pt-8 sm:flex-row">
        <div>
          <Link href="/" className="font-mono text-sm font-semibold tracking-wider text-white">
            {profile.brand}
          </Link>
          <p className="mt-1 text-xs text-slate-400">
            {profile.title} · Pune, Maharashtra, India
          </p>
        </div>

        {/* Navigation Quick Links */}
        <ul className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-cyan transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              Resume PDF
            </a>
          </li>
        </ul>

        {/* Social Presence */}
        <div className="flex items-center gap-3 text-slate-400">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-2 hover:bg-white/[0.06] hover:text-cyan transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 hover:bg-white/[0.06] hover:text-cyan transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-lg p-2 hover:bg-white/[0.06] hover:text-cyan transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>All systems operational · Next.js 16</span>
        </div>
      </div>
    </footer>
  );
}
