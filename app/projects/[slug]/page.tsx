import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldAlert, Cpu, Sparkles } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { projects, workflowExamples } from "@/lib/data";
import WorkflowDiagram from "@/components/projects/WorkflowDiagram";
import ProjectVisual from "@/components/projects/ProjectVisual";
import ShareProjectButton from "@/components/projects/ShareProjectButton";
import { Card, Chip, Section } from "@/components/ui/Primitives";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name} — ${p.title}`, description: p.oneLiner || p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="rounded-full bg-cyan/15 border border-cyan/30 px-3 py-1 font-mono text-xs font-semibold text-cyan">
            {p.index} · {p.category}
          </span>
          <span className="rounded-full bg-white/[0.05] border border-white/[0.08] px-3 py-1 font-mono text-xs text-slate-300">
            {p.status}
          </span>
        </div>

        {/* Project Title */}
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">{p.name}</h1>
        <p className="mt-3 text-lg text-slate-300 font-medium sm:text-xl">{p.title}</p>
        <p className="mt-4 max-w-3xl text-base text-slate-300 leading-relaxed">{p.oneLiner || p.summary}</p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3.5 text-sm">
          {p.github ? (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-black hover:bg-white/90 shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] transition-all hover:-translate-y-0.5"
            >
              <Github size={16} /> Source Code
            </a>
          ) : (
            <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-slate-400 font-mono">
              <Github size={14} className="text-slate-500" /> Source Available Upon Request
            </span>
          )}
          {p.demo ? (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-cyan/40 bg-cyan/15 px-5 py-2.5 font-medium text-cyan hover:bg-cyan/25 transition-all hover:-translate-y-0.5"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          ) : (
            <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-slate-400 font-mono">
              <ExternalLink size={14} className="text-slate-500" /> Demo Staged For Review
            </span>
          )}
          <ShareProjectButton title={p.name} />
        </div>
      </div>

      {/* Large Interactive Visual Canvas */}
      <Section className="!py-10">
        <div className="liquid-glass overflow-hidden rounded-3xl p-4 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-white/[0.12]">
          <div className="mb-4 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/[0.06] pb-3">
            <span className="flex items-center gap-2 font-medium">
              <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
              Live Architectural &amp; System Preview
            </span>
            <span className="text-[11px] text-slate-500">{p.name} · Verified Build</span>
          </div>
          <ProjectVisual slug={p.slug} />
        </div>
      </Section>

      {/* Problem & Solution Grid */}
      <Section eyebrow="Problem & Solution" title="Engineering Rationale." className="!py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-t-2 border-t-cyan/50">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan font-semibold">The Problem</h3>
            <p className="mt-3 text-slate-300 leading-relaxed text-sm sm:text-base">{p.problem}</p>
          </Card>
          <Card className="border-t-2 border-t-violet-400/50">
            <h3 className="font-mono text-xs uppercase tracking-wider text-violet-400 font-semibold">The Solution</h3>
            <p className="mt-3 text-slate-300 leading-relaxed text-sm sm:text-base">{p.solution}</p>
          </Card>
        </div>
      </Section>

      {/* Capabilities */}
      <Section eyebrow="Capabilities" title="Core Features." className="!py-12">
        <ul className="grid gap-3.5 sm:grid-cols-2">
          {p.features.map((f) => (
            <li key={f} className="liquid-glass rounded-2xl px-5 py-3.5 text-sm text-slate-300 flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Technical Architecture */}
      <Section eyebrow="Architecture" title="System Components." className="!py-12">
        {p.slug === "workflow-ai" && (
          <div className="liquid-glass mb-8 rounded-3xl p-6 border border-cyan/25">
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan mb-4 font-semibold flex items-center gap-2">
              <Sparkles size={14} /> Agent Orchestration Pipeline
            </h4>
            <WorkflowDiagram />
          </div>
        )}
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {p.architecture.map((a, i) => (
            <li key={a.label}>
              <Card className="h-full">
                <span className="font-mono text-xs text-cyan font-bold">0{i + 1}</span>
                <h3 className="mt-2 font-semibold text-white tracking-tight">{a.label}</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">{a.detail}</p>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </Section>

      {p.slug === "workflow-ai" && (
        <Section eyebrow="Workflows" title="Demonstrated Pipelines." className="!py-12">
          <ul className="grid gap-3.5 sm:grid-cols-2">
            {workflowExamples.map((w) => (
              <li key={w} className="liquid-glass rounded-2xl px-5 py-3.5 text-sm text-slate-300 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Scope & Bounds */}
      <Section eyebrow="Scope" title="Contributions &amp; Bounds." className="!py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan font-semibold flex items-center gap-2">
              <Cpu size={14} /> My Contribution
            </h3>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">{p.contribution}</p>
          </Card>
          <Card>
            <h3 className="font-mono text-xs uppercase tracking-wider text-violet-400 font-semibold flex items-center gap-2">
              <ShieldAlert size={14} /> Engineering Bounds
            </h3>
            <ul className="mt-3 space-y-2 text-slate-300 text-sm leading-relaxed">
              {p.limitations.map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </main>
  );
}
