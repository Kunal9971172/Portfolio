"use client";

import { Code2, Layers, Users } from "lucide-react";
import { Section } from "@/components/ui/Primitives";

export default function BuilderStory() {
  const pillars = [
    {
      icon: Code2,
      title: "Engineering Rigor",
      text: "Deep analytical foundation in AI algorithms, data structures, and scalable system design.",
    },
    {
      icon: Layers,
      title: "Product Execution",
      text: "Transforming architectures into working systems — from telemetry engines to multi-agent pipelines.",
    },
    {
      icon: Users,
      title: "Technical Mentorship",
      text: "Three years translating complex technical abstractions into clear, intuitive concepts.",
    },
  ];

  return (
    <Section eyebrow="Philosophy" title="Engineering Mindset.">
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="group rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/35 hover:bg-white/[0.06] hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan/15 border border-cyan/30 text-cyan mb-4 group-hover:scale-105 transition-transform">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.text}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
