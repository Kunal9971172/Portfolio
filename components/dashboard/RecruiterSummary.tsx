import Link from "next/link";
import { Download, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { achievements, clientWork, experience, profile, projects } from "@/lib/data";

// Shown exclusively in Recruiter Mode (controlled by html[data-recruiter="true"] .recruiter-only).
export default function RecruiterSummary() {
  const coreSkills = [
    "Python",
    "C++",
    "Java",
    "JavaScript",
    "TypeScript",
    "SQL",
    "React 19",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Machine Learning",
    "NLP",
    "Agentic RAG",
    "Git",
  ];

  return (
    <section className="recruiter-only mx-auto max-w-6xl px-4 pt-28 sm:px-6" aria-label="Recruiter Executive Summary">
      <div className="rounded-2xl border border-white/20 bg-slate-900/95 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan/15 px-3 py-1 font-mono text-xs font-semibold text-cyan border border-cyan/30">
              <Sparkles size={12} /> RECRUITER EXECUTIVE SUMMARY
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">{profile.name}</h2>
            <p className="mt-1 text-sm text-slate-300">
              {profile.title} · {profile.location}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              download="Kunal_Chaudhari_Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90 transition-colors"
            >
              <Download size={13} />
              Download Resume (PDF)
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors"
            >
              <Mail size={13} className="text-cyan" />
              Email Kunal
            </a>
          </div>
        </div>

        {/* Fast-Facts Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-xs">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <span className="text-slate-400">EDUCATION</span>
            <p className="mt-1 font-semibold text-white">B.E. AI &amp; DS (2024–28)</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <span className="text-slate-400">INSTITUTION</span>
            <p className="mt-1 font-semibold text-white">DY Patil, Pune (SPPU)</p>
          </div>
          <div className="rounded-xl border border-cyan/30 bg-cyan/10 p-3">
            <span className="text-cyan font-bold">ACADEMIC CGPA</span>
            <p className="mt-1 font-bold text-white text-sm">8.99 / 10</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <span className="text-slate-400">AMBASSADOR</span>
            <p className="mt-1 font-semibold text-cyan">Google Student &apos;26</p>
          </div>
        </div>

        {/* Two-Column Deep Executive Breakdown */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Left Column: Projects & Core Stack */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
                Featured Engineering Systems ({projects.length})
              </h3>
              <ul className="mt-2.5 space-y-2">
                {projects.map((p) => (
                  <li key={p.slug} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="font-semibold text-white hover:text-cyan transition-colors"
                      >
                        {p.name}
                      </Link>
                      <span className="font-mono text-[10px] text-cyan">{p.category}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300">{p.oneLiner || p.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-1 font-mono text-[10px] text-slate-400">
                      {p.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded bg-white/5 px-1.5 py-0.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
                Core Competencies &amp; Technologies
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-xs text-slate-300">
                {coreSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience, Client Delivery, Achievements */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
                Work &amp; Teaching Experience
              </h3>
              <ul className="mt-2.5 space-y-2">
                {experience.map((e) => (
                  <li key={e.role} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-sm">{e.role}</strong>
                      <span className="font-mono text-slate-400">{e.period}</span>
                    </div>
                    <p className="text-cyan font-medium mt-0.5">{e.org}</p>
                    <p className="mt-1 text-slate-300">{e.summary}</p>
                  </li>
                ))}
                {clientWork.map((c) => (
                  <li key={c.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs">
                    <strong className="text-white">Client Website: {c.name}</strong>
                    <p className="mt-1 text-slate-300">{c.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan font-bold">
                Honors &amp; Leadership
              </h3>
              <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                {achievements.map((a) => (
                  <li key={a.title} className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-cyan shrink-0" />
                    <span>
                      <strong className="text-white">{a.title}</strong> ({a.year}) — {a.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
