import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import type { Project } from "@/lib/data";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-white/[0.005] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.07] hover:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85),0_0_35px_-5px_rgba(56,189,248,0.2)] hover:-translate-y-1">
      <div>
        {/* Large Visual Preview Showcase */}
        <div className="mb-5 overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[1.015]">
          <ProjectVisual slug={p.slug} />
        </div>

        {/* Project Meta Pill */}
        <div className="mb-3 flex items-center justify-between font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-0.5 text-[11px] text-slate-300">
            <span className="font-semibold text-cyan">{p.index}</span>
            <span className="text-slate-600">·</span>
            <span>{p.category}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
            {p.status}
          </span>
        </div>

        {/* Project Title & One-Line Description */}
        <Link href={`/projects/${p.slug}`} className="block focus:outline-none">
          <h3 className="flex items-center gap-1.5 text-2xl font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan">
            {p.name}
            <ArrowUpRight
              size={18}
              className="text-slate-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
            />
          </h3>
        </Link>

        {/* Impactful One-Line Description */}
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {p.oneLiner || p.summary}
        </p>

        {/* 3 to 5 Clean Technology Labels */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors group-hover:border-white/[0.16] group-hover:text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs">
        <Link
          href={`/projects/${p.slug}`}
          className="font-medium text-cyan transition-colors hover:text-cyan-accent flex items-center gap-1"
        >
          <span>Architecture &amp; Case Study</span>
          <ArrowUpRight size={14} />
        </Link>

        <div className="flex items-center gap-3 text-slate-400">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} GitHub`}
              className="p-1 transition-colors hover:text-white"
            >
              <Github size={16} />
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} Live Demo`}
              className="p-1 transition-colors hover:text-white"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
