import Hero from "@/components/hero/Hero";
import ProofOfWork from "@/components/dashboard/ProofOfWork";
import ProjectCard from "@/components/projects/ProjectCard";
import TechRadar from "@/components/dashboard/TechRadar";
import Achievements from "@/components/dashboard/Achievements";
import BuilderStory from "@/components/dashboard/BuilderStory";
import HiringPillars from "@/components/dashboard/HiringPillars";
import RecruiterSummary from "@/components/dashboard/RecruiterSummary";
import { Section } from "@/components/ui/Primitives";
import { projects } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <RecruiterSummary />
      <div className="hide-recruiter">
        <Hero />
      </div>
      <ProofOfWork />
      <Section id="projects" eyebrow="Featured Systems" title="Core Engineering Projects.">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </Section>
      <div className="hide-recruiter">
        <BuilderStory />
      </div>
      <TechRadar />
      <Achievements />
      <HiringPillars />
    </main>
  );
}
