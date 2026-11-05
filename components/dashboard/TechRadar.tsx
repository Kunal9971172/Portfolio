"use client";

import { Code2, Brain, Database, Layers, Wrench } from "lucide-react";
import { skillCategories, strengthening } from "@/lib/data/skills";
import { Section } from "@/components/ui/Primitives";

export default function TechRadar() {
  const getIcon = (category: string) => {
    switch (category) {
      case "Programming":
        return <Code2 size={18} className="text-cyan" />;
      case "AI & Machine Learning":
        return <Brain size={18} className="text-violet-400" />;
      case "Data Science":
        return <Database size={18} className="text-blue-400" />;
      case "Full-Stack Development":
        return <Layers size={18} className="text-cyan-accent" />;
      case "Tools & Technologies":
        return <Wrench size={18} className="text-emerald-400" />;
      default:
        return <Code2 size={18} className="text-cyan" />;
    }
  };

  return (
    <Section
      id="skills"
      eyebrow="Technical Stack"
      title="Engineering Competencies."
    >
      {/* 5 Clean Skill Categories Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat) => (
          <div
            key={cat.group}
            className="group rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8)]"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:scale-105 transition-transform">
                {getIcon(cat.group)}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white tracking-tight">{cat.group}</h3>
                <span className="font-mono text-[10px] text-slate-400">Core Stack</span>
              </div>
            </div>

            {/* Compact Badges */}
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan/40 hover:bg-cyan/10 hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Growth & Research Radar Card */}
        <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-500/10 via-blue-500/[0.03] to-transparent p-6 backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-blue-500/15 pb-3.5 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white tracking-tight">Active Research</h3>
              <span className="font-mono text-[10px] text-blue-300">Frontier Systems</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {strengthening.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 font-mono text-xs text-blue-200"
              >
                <span className="h-1 w-1 rounded-full bg-blue-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
