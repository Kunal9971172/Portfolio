"use client";

import { CheckCircle2 } from "lucide-react";
import { proofMetrics } from "@/lib/data";
import { Section } from "@/components/ui/Primitives";
import Counter from "./Counter";

export default function ProofOfWork() {
  return (
    <Section eyebrow="Milestones" title="Verified Track Record." className="!py-12">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {proofMetrics.map((m) => (
          <div
            key={m.label}
            className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-white/[0.005] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.07] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8),0_0_30px_-5px_rgba(56,189,248,0.2)] hover:-translate-y-1"
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan/15 blur-2xl transition-opacity opacity-0 group-hover:opacity-100"
              aria-hidden
            />

            <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl group-hover:text-cyan transition-colors">
              {"text" in m ? (
                m.text
              ) : "plain" in m && m.plain ? (
                m.value
              ) : (
                <Counter value={m.value} decimals={"decimals" in m ? m.decimals : 0} />
              )}
            </div>

            <div className="mt-2 text-sm font-medium text-slate-300">{m.label}</div>

            <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.06] pt-3 font-mono text-[11px] text-slate-400">
              <CheckCircle2 size={13} className="text-cyan shrink-0" />
              <span className="truncate">{m.source}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
