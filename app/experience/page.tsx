import type { Metadata } from "next";
import { ArrowUpRight, Briefcase, GraduationCap, Globe } from "lucide-react";
import { PageShell, Section } from "@/components/ui/Primitives";
import Achievements from "@/components/dashboard/Achievements";
import { experience, clientWork } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description: "Internship, technical teaching, and client deliveries of Kunal Chaudhari.",
};

export default function Experience() {
  return (
    <PageShell
      eyebrow="Track Record"
      title="Experience &amp; Delivery."
      lead="Applied frontend engineering, three years of technical mentoring, and deployed client solutions."
    >
      {/* Work & Teaching Experience Timeline */}
      <Section eyebrow="Professional History" title="Work &amp; Mentorship." className="!py-10">
        <div className="relative space-y-6 before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-white/[0.08] sm:before:left-5">
          {experience.map((e) => (
            <div key={e.role} className="relative flex items-start gap-4 sm:gap-6">
              {/* Timeline Indicator Node */}
              <div className="relative z-10 flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan/40 bg-slate-950 text-cyan shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                {e.role.includes("Teacher") ? (
                  <GraduationCap size={16} />
                ) : (
                  <Briefcase size={16} />
                )}
              </div>

              {/* Experience Card */}
              <div className="w-full rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)]">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.06] pb-3 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {e.role}
                    </h3>
                    <p className="text-sm font-medium text-cyan">{e.org}</p>
                  </div>
                  <span className="self-start rounded-full bg-white/[0.05] border border-white/[0.08] px-3 py-1 font-mono text-xs text-slate-300">
                    {e.period}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-slate-300">{e.summary}</p>

                {e.link && (
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400">Deployed Platform:</span>
                    <a
                      href={e.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-cyan/30 bg-cyan/15 px-3 py-1.5 text-xs font-semibold text-cyan hover:bg-cyan/25 transition-colors"
                    >
                      <span>Visit CashCub</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Client Deliveries */}
      <Section eyebrow="Production Deployments" title="Client Websites." className="!py-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {clientWork.map((c) => (
            <div
              key={c.name}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(56,189,248,0.2)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] text-cyan">
                    <Globe size={18} />
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-white group-hover:text-cyan transition-colors">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.detail}</p>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-cyan hover:underline"
                >
                  <span>Launch Live Site</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Achievements />
    </PageShell>
  );
}
