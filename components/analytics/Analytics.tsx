import { achievements, currentlyUsed, education, experience, projects } from "@/lib/data";
import { Section } from "@/components/ui/Primitives";

// All figures here are derived strictly from content files.
export default function Analytics() {
  const cgpa = 8.99;
  const r = 44;
  const circ = 2 * Math.PI * r;
  const groups = currentlyUsed.map((g) => ({ name: g.group, count: g.items.length }));
  const max = Math.max(...groups.map((g) => g.count));

  return (
    <Section eyebrow="Telemetry &amp; Metrics" title="Profile Analytics at a Glance.">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Academic CGPA Gauge */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold">Academic Performance</h3>
            <span className="font-mono text-[10px] text-cyan bg-cyan/10 px-2 py-0.5 rounded-full border border-cyan/20">
              Verified
            </span>
          </div>
          <div className="flex items-center gap-6">
            <svg width="110" height="110" viewBox="0 0 110 110" role="img" aria-label={`CGPA ${cgpa} out of 10`} className="shrink-0">
              <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle
                cx="55"
                cy="55"
                r={r}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - cgpa / 10)}
                transform="rotate(-90 55 55)"
                className="shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              />
              <text x="55" y="60" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="700" fontFamily="monospace">
                {cgpa}
              </text>
            </svg>
            <div>
              <p className="text-sm font-semibold text-white">Out of 10.0</p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                B.E. Artificial Intelligence &amp; Data Science
                <br />
                <span className="text-cyan font-medium">{education[0].university}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Technologies Distribution */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-blue font-bold">Stack Distribution</h3>
            <span className="font-mono text-[10px] text-slate-400">Total: {currentlyUsed.reduce((acc, g) => acc + g.items.length, 0)}</span>
          </div>
          <ul className="space-y-3 font-sans">
            {groups.map((g) => (
              <li key={g.name}>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span className="font-medium">{g.name}</span>
                  <span className="font-mono text-slate-400">{g.count} technologies</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-cyan to-blue"
                    style={{ width: `${(g.count / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects Breakdown */}
        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-violet font-bold">Product Vault</h3>
            <span className="font-mono text-[10px] text-violet-300">{projects.length} Systems</span>
          </div>
          <ul className="space-y-3 text-xs">
            {projects.map((p) => (
              <li key={p.slug} className="flex items-center justify-between gap-3 border-b border-white/[0.04] pb-2 last:border-0 last:pb-0">
                <span className="font-semibold text-white truncate">{p.name}</span>
                <span className="shrink-0 font-mono text-[11px] text-slate-400">{p.category}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chronological Trajectory */}
        <div className="lg:col-span-3 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-xl">
          <h3 className="font-mono text-xs uppercase tracking-wider text-cyan font-bold mb-4">
            Chronological Trajectory &amp; Milestones
          </h3>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 font-sans">
            {[
              ...experience.map((e) => ({ when: e.period, what: e.role, sub: e.org, kind: "Experience" })),
              ...achievements.map((a) => ({ when: a.year, what: a.title, sub: a.detail, kind: "Achievement" })),
            ].map((t, i) => (
              <li key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 hover:border-cyan/30 transition-colors">
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                  <span className="text-cyan font-semibold">{t.kind}</span>
                  <span>{t.when}</span>
                </div>
                <p className="text-xs font-semibold text-white">{t.what}</p>
                <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">{t.sub}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
