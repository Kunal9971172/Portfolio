import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Compass, Target, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { PageShell, Section } from "@/components/ui/Primitives";
import Analytics from "@/components/analytics/Analytics";
import { missionControl as m } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Current focus, active learning, featured systems, and long-term vision of Kunal Chaudhari.",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/[0.06] py-3.5 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <dt className="font-mono text-xs uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="text-sm font-medium text-white sm:text-right">{value}</dd>
    </div>
  );
}

export default function MissionControl() {
  return (
    <PageShell
      eyebrow="Operations"
      title="Mission Control."
      lead="Real-time stated focus, ongoing system developments, technical radar, and architecture objectives."
    >
      <Section className="!py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Engineer Profile HUD */}
          <div className="lg:col-span-2 rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 sm:p-8 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan font-semibold flex items-center gap-2">
                <Activity size={15} className="text-cyan" />
                PRIMARY SPECIFICATIONS
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE
              </span>
            </div>
            <dl className="divide-y divide-white/[0.04]">
              <Row label="Engineer" value={m.engineer} />
              <Row label="Primary Domain" value={m.domain} />
              <Row label="Degree / Base" value={m.education} />
              <Row label="Location" value={m.location} />
              <Row label="Current Priority" value={m.currentFocus} />
            </dl>
          </div>

          {/* Active Systems */}
          <div className="rounded-3xl border border-cyan/25 bg-gradient-to-b from-cyan/10 via-cyan/[0.02] to-transparent p-6 sm:p-8 backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-4 flex items-center gap-2">
                <Sparkles size={14} /> Active Systems ({m.activeProjects.length})
              </h3>
              <ul className="space-y-2.5">
                {m.activeProjects.map((p) => (
                  <li key={p.name}>
                    <Link
                      href={p.href}
                      className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-slate-200 hover:border-cyan/40 hover:bg-white/[0.08] hover:text-white transition-all"
                    >
                      <span className="font-medium">{p.name}</span>
                      <ArrowRight size={14} className="text-cyan transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 font-mono text-[11px] text-slate-500">
              Verified Staged Systems
            </p>
          </div>

          {/* Current Learning Radar */}
          <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-transparent p-6 sm:p-8 backdrop-blur-2xl">
            <h3 className="font-mono text-xs uppercase tracking-wider text-blue-400 font-bold mb-3 flex items-center gap-2">
              <Compass size={14} /> Active Learning Radar
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Frontier architectures currently being studied and built.
            </p>
            <div className="flex flex-wrap gap-2">
              {m.currentLearning.map((l) => (
                <span
                  key={l}
                  className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 font-mono text-xs text-blue-200"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Milestones */}
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-500/10 to-transparent p-6 sm:p-8 backdrop-blur-2xl">
            <h3 className="font-mono text-xs uppercase tracking-wider text-violet-400 font-bold mb-3 flex items-center gap-2">
              <Target size={14} /> Strategic Objectives
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              {m.upcomingGoals.map((g) => (
                <li key={g} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-violet-400 shrink-0 mt-0.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long-term Vision */}
          <div className="rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 sm:p-8 backdrop-blur-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-3 flex items-center gap-2">
                <ShieldCheck size={14} /> North Star Vision
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                “{m.longTermVision}”
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-[11px] text-slate-400">
              Guiding Principle: Real Utility
            </div>
          </div>
        </div>
      </Section>
      <Analytics />
    </PageShell>
  );
}
