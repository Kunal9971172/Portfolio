"use client";

import { motion } from "framer-motion";
import { Trophy, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { achievements, certifications } from "@/lib/data";
import { Section } from "@/components/ui/Primitives";

export default function Achievements() {
  const getCardTheme = (index: number, title: string) => {
    if (title.includes("Google") || index === 0) {
      return {
        icon: Sparkles,
        iconColor: "text-cyan",
        iconBg: "bg-cyan/15 border-cyan/30",
        pill: "bg-cyan/10 border-cyan/25 text-cyan",
        glow: "from-cyan/20 to-transparent",
        hoverBorder: "hover:border-cyan/50",
        shadow: "hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_35px_-5px_rgba(56,189,248,0.3)]",
        domain: "Ecosystem & Developer Advocacy",
      };
    }
    if (title.includes("Startup") || title.includes("Prize") || index === 1) {
      return {
        icon: Trophy,
        iconColor: "text-amber-400",
        iconBg: "bg-amber-400/15 border-amber-400/30",
        pill: "bg-amber-400/10 border-amber-400/25 text-amber-300",
        glow: "from-amber-400/20 to-transparent",
        hoverBorder: "hover:border-amber-400/50",
        shadow: "hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_35px_-5px_rgba(251,191,36,0.3)]",
        domain: "Healthcare Tech & Telemetry",
      };
    }
    return {
      icon: ShieldCheck,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-400/15 border-emerald-400/30",
      pill: "bg-emerald-400/10 border-emerald-400/25 text-emerald-300",
      glow: "from-emerald-400/20 to-transparent",
      hoverBorder: "hover:border-emerald-400/50",
      shadow: "hover:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_35px_-5px_rgba(52,211,153,0.3)]",
      domain: "LLM Guardrails & AI Safety",
    };
  };

  return (
    <Section eyebrow="Recognition" title="Honors &amp; Leadership.">
      {/* Exactly 3 Visual Cards with Liquid Glass and Smooth Motion */}
      <div className="grid gap-6 md:grid-cols-3">
        {achievements.map((a, idx) => {
          const theme = getCardTheme(idx, a.title);
          const Icon = theme.icon;

          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.10] bg-gradient-to-b from-white/[0.06] via-white/[0.025] to-white/[0.01] p-7 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] transition-all duration-300 ${theme.hoverBorder} ${theme.shadow}`}
            >
              {/* Radial Ambient Backglow on hover */}
              <div
                className={`pointer-events-none absolute -top-14 -right-14 h-40 w-40 rounded-full bg-gradient-to-b ${theme.glow} blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500`}
                aria-hidden
              />

              {/* Specular Edge Highlight */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08]"
                aria-hidden
              />

              <div className="relative z-10">
                {/* Header: Icon & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${theme.iconBg} backdrop-blur-xl group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon size={22} className={theme.iconColor} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`rounded-full border px-3 py-1 font-mono text-[11px] font-semibold tracking-wide backdrop-blur-md ${theme.pill}`}>
                      {a.year}
                    </span>
                    {"org" in a && a.org && (
                      <span className="font-mono text-[10px] text-slate-400 tracking-wider uppercase">
                        {String(a.org)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category Pill / Eyebrow */}
                <div className="mt-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                    {("category" in a && a.category ? String(a.category) : theme.domain)}
                  </span>
                  <h3 className="mt-1 text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan transition-colors duration-200">
                    {a.title}
                  </h3>
                </div>

                {/* Engineering Detail */}
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {a.detail}
                </p>
              </div>

              {/* Card Footer: Domain & Verified Credential */}
              <div className="relative z-10 mt-6 border-t border-white/[0.07] pt-4">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 size={13} className={theme.iconColor} />
                    <span>Verified Credential</span>
                  </div>
                  {"badge" in a && a.badge && (
                    <span className="text-[10px] text-slate-400 tracking-wider">
                      {String(a.badge)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Compact Certifications Bar */}
      <div className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
            <CheckCircle2 size={14} className="text-cyan" />
            Verified Technical Credentials
          </p>
          <span className="font-mono text-xs text-slate-500">{certifications.length} Certifications</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {certifications.map((c) => (
            <span
              key={c}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-300 hover:border-cyan/30 hover:text-white transition-colors"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
