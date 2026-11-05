import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:py-28 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-12 max-w-2xl">
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" aria-hidden />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan font-semibold">
                {eyebrow}
              </p>
            </div>
          )}
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          )}
        </header>
      )}
      <Reveal>{children}</Reveal>
    </section>
  );
}

export function PageShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-3 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" aria-hidden />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan font-semibold">
            {eyebrow}
          </p>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-4 max-w-2xl text-base text-slate-300 leading-relaxed sm:text-lg">
            {lead}
          </p>
        )}
      </div>
      {children}
    </main>
  );
}

export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  borderGlow?: boolean;
}) {
  return (
    <div
      className={`liquid-glass rounded-3xl p-6 sm:p-7 transition-all duration-300 ${
        hover ? "glass-hover cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`rounded-lg border px-2.5 py-1 font-mono text-xs transition-colors ${
        active
          ? "border-cyan/40 bg-cyan/15 text-cyan font-medium"
          : "border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/[0.18]"
      }`}
    >
      {children}
    </span>
  );
}

export function GlassBadge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "violet" | "emerald";
}) {
  const styles = {
    default: "border-white/[0.08] bg-white/[0.04] text-slate-300",
    cyan: "border-cyan/30 bg-cyan/10 text-cyan",
    violet: "border-violet/30 bg-violet/10 text-violet",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

export function Placeholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`Preview: ${label}`}
      className="flex aspect-video w-full items-center justify-center rounded-2xl border border-white/[0.08] bg-slate-900/40 p-6 text-center font-mono text-xs text-slate-400"
    >
      <span className="rounded-lg bg-white/[0.04] px-3 py-1.5 border border-white/[0.08]">
        {label}
      </span>
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "cyan";
  download?: boolean;
  external?: boolean;
}) {
  let cls = "";
  if (variant === "primary") {
    cls =
      "bg-white text-black font-semibold hover:bg-white/90 shadow-[0_10px_25px_-5px_rgba(255,255,255,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(255,255,255,0.45)]";
  } else if (variant === "cyan") {
    cls =
      "border border-cyan/40 bg-cyan/10 text-cyan hover:bg-cyan/20 shadow-[0_0_20px_rgba(56,189,248,0.2)]";
  } else {
    cls =
      "border border-white/[0.12] bg-white/[0.03] text-slate-200 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.22]";
  }

  const base = `inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${cls}`;

  if (download || external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={base}
      >
        {children}
        {external && <ArrowUpRight size={14} />}
      </a>
    );
  }
  return (
    <Link href={href} className={base}>
      {children}
    </Link>
  );
}
