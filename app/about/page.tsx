import type { Metadata } from "next";
import { Globe2, Code2, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { PageShell, Section } from "@/components/ui/Primitives";
import BuilderStory from "@/components/dashboard/BuilderStory";
import TechRadar from "@/components/dashboard/TechRadar";
import { education, profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Background, education, and engineering profile of Kunal Chaudhari — AI & Data Science student.",
};

const positioning = [
  {
    icon: Code2,
    title: "Engineer First",
    desc: "Analytical foundations in algorithms, AI architectures, and system design.",
  },
  {
    icon: Layers,
    title: "Product Builder",
    desc: "Shipping full-stack applications with telemetry, agentic workflows, and clean UX.",
  },
  {
    icon: Sparkles,
    title: "Community Leader",
    desc: "Google Student Ambassador '26, 3-year technical educator, and hackathon builder.",
  },
];

export default function About() {
  return (
    <PageShell
      eyebrow="Profile"
      title="Engineering with Purpose."
      lead="AI & Data Science engineering student at Dr. D. Y. Patil (SPPU) dedicated to building intelligent systems with mathematical rigor and product polish."
    >
      {/* 3 Concise Identity Pillars */}
      <Section className="!py-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {positioning.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan/15 border border-cyan/30 text-cyan mb-4 group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Minimal Academic Card */}
      <Section eyebrow="Academics" title="Education &amp; Foundation." className="!py-10">
        {education.map((e) => (
          <div
            key={e.degree}
            className="rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-white/[0.005] p-7 sm:p-9 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.08] pb-5">
              <div>
                <span className="rounded-full bg-cyan/15 border border-cyan/30 px-3 py-1 font-mono text-xs font-semibold text-cyan">
                  {e.period}
                </span>
                <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {e.degree}
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {e.institution} · <span className="text-cyan">{e.university}</span>
                </p>
              </div>

              {/* CGPA Display */}
              <div className="flex items-center gap-3 rounded-2xl border border-cyan/30 bg-cyan/10 p-4 font-mono">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-cyan font-bold">CUMULATIVE CGPA</p>
                  <p className="text-2xl font-bold text-white">{e.cgpa}</p>
                </div>
              </div>
            </div>

            {/* Coursework Tags */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                Core Coursework
              </h4>
              <div className="flex flex-wrap gap-2">
                {e.coursework.map((c) => (
                  <span
                    key={c}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages & Curricula */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Globe2 size={14} className="text-cyan" />
                <span>Languages: {profile.languages.join(" · ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-cyan" />
                <span>Verified SPPU Curriculum</span>
              </div>
            </div>
          </div>
        ))}
      </Section>

      <BuilderStory />
      <TechRadar />
    </PageShell>
  );
}
