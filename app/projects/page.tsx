import type { Metadata } from "next";
import { PageShell, Section, Card } from "@/components/ui/Primitives";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects, otherWork } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Gurukul.ai, EduReach, WorkflowAI, and Heart Disease Predictor — engineering projects by Kunal Chaudhari.",
};

export default function Projects() {
  return (
    <PageShell
      eyebrow="Product Vault"
      title="Engineering Systems."
      lead="Core architectures spanning coding assessment telemetry, multilingual Agentic RAG, multi-agent workflows, and clinical machine learning."
    >
      <Section className="!pt-6">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </Section>

      <Section eyebrow="System Exploration" title="Additional Research.">
        <div className="grid gap-5 sm:grid-cols-2">
          {otherWork.map((o) => (
            <Card key={o.name} hover className="border-l-2 border-l-cyan/60">
              <span className="font-mono text-xs text-cyan">{o.period}</span>
              <h3 className="mt-2 text-lg font-semibold text-white tracking-tight">{o.name}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{o.detail}</p>
            </Card>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
