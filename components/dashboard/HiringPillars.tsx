"use client";

import Link from "next/link";
import { Download, Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { Section } from "@/components/ui/Primitives";

const pillars = [
  {
    title: "Applied AI Systems",
    desc: "Architecting Agentic RAG assistants, LLM integrations, and robust workflow automation.",
  },
  {
    title: "Full-Stack Engineering",
    desc: "Modern Next.js and React 19 web applications with robust API and data layers.",
  },
  {
    title: "Machine Learning Rigor",
    desc: "Comparative classification benchmarking, PCA/LDA projection, and clinical metrics.",
  },
  {
    title: "Technical Communication",
    desc: "3 years teaching technical curricula and Google Student Ambassador leadership.",
  },
  {
    title: "Product Execution",
    desc: "Shipping functional platforms with telemetry, intuitive UI, and measurable value.",
  },
  {
    title: "Academic Excellence",
    desc: "Consistent 8.99 / 10 CGPA in AI & Data Science at Dr. D. Y. Patil (SPPU).",
  },
] as const;

export default function HiringPillars() {
  return (
    <Section eyebrow="Value Proposition" title="Why Work With Me.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <div
            key={p.title}
            className="group relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan">
                0{i + 1}
              </span>
              <ArrowUpRight size={14} className="text-slate-600 transition-transform group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <h3 className="mt-3 text-base font-semibold text-white tracking-tight group-hover:text-cyan transition-colors">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Direct Contact Bar */}
      <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-8">
        <a
          href={profile.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          download="Kunal_Chaudhari_Resume.pdf"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 shadow-[0_10px_25px_-5px_rgba(255,255,255,0.35)] transition-all hover:-translate-y-0.5"
        >
          <Download size={15} />
          <span>Download Resume</span>
        </a>

        <Link
          href="/contact"
          className="glass-interactive inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white hover:-translate-y-0.5"
        >
          <Mail size={15} className="text-cyan" />
          <span>Get in Touch</span>
        </Link>
      </div>
    </Section>
  );
}
