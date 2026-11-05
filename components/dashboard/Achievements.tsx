"use client";

import { Trophy, Award, Medal, Sparkles, CheckCircle2 } from "lucide-react";
import { achievements, certifications } from "@/lib/data";
import { Section } from "@/components/ui/Primitives";

export default function Achievements() {
  const getAwardIcon = (title: string) => {
    if (title.includes("Google")) {
      return <Sparkles size={20} className="text-cyan" />;
    }
    if (title.includes("Startup") || title.includes("2nd Prize")) {
      return <Trophy size={20} className="text-amber-400" />;
    }
    if (title.includes("Allianz")) {
      return <Medal size={20} className="text-blue-400" />;
    }
    return <Award size={20} className="text-violet-400" />;
  };

  return (
    <Section eyebrow="Recognition" title="Honors &amp; Leadership.">
      {/* 4 Clean Visual Cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {achievements.map((a) => (
          <div
            key={a.title}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(56,189,248,0.2)] hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:scale-105 transition-transform">
                  {getAwardIcon(a.title)}
                </div>
                <span className="rounded-full bg-cyan/10 border border-cyan/20 px-3 py-1 font-mono text-xs font-semibold text-cyan">
                  {a.year}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white group-hover:text-cyan transition-colors">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{a.detail}</p>
            </div>

            <div className="mt-5 flex items-center gap-1.5 border-t border-white/[0.06] pt-3 font-mono text-[11px] text-slate-400">
              <CheckCircle2 size={13} className="text-cyan shrink-0" />
              <span>Verified Credential</span>
            </div>
          </div>
        ))}
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
