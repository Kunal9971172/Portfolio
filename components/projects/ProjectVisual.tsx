"use client";

import { CheckCircle2, FileCode2, Layers, Sparkles } from "lucide-react";

export default function ProjectVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "gurukul-ai":
      return <GurukulVisual />;
    case "edureach":
      return <EduReachVisual />;
    case "workflow-ai":
      return <WorkflowVisual />;
    case "heart-disease-predictor":
      return <HeartDiseaseVisual />;
    default:
      return null;
  }
}

function WindowHeader({ title, badge }: { title: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/60 px-4 py-2.5 text-xs">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </div>
        <span className="ml-1 font-mono text-[11px] font-medium text-slate-300">{title}</span>
      </div>
      {badge && (
        <span className="inline-flex items-center gap-1 rounded-full bg-cyan/15 px-2.5 py-0.5 font-mono text-[10px] text-cyan border border-cyan/30">
          <span className="h-1 w-1 rounded-full bg-cyan animate-pulse" />
          {badge}
        </span>
      )}
    </div>
  );
}

function GurukulVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-slate-950/90 text-xs shadow-2xl">
      <WindowHeader title="assessment.cpp — Monaco Editor" badge="Judge0 Connected" />
      <div className="p-4 space-y-3 font-mono">
        <div className="space-y-1 text-[11px] leading-relaxed text-slate-400">
          <p><span className="text-violet-400">#include</span> <span className="text-emerald-400">&lt;iostream&gt;</span></p>
          <p><span className="text-cyan">int</span> <span className="text-blue-400">maxSubArray</span>(vector&lt;<span className="text-cyan">int</span>&gt;&amp; nums) &#123;</p>
          <p className="pl-3 text-slate-500">{"// Kadane's algorithm: O(n) telemetry tracked"}</p>
          <p className="pl-3"><span className="text-cyan">int</span> cur = nums[0], maxVal = nums[0];</p>
          <p className="pl-3">for (<span className="text-cyan">int</span> i = 1; i &lt; nums.size(); ++i) &#123;</p>
          <p className="pl-6">cur = max(nums[i], cur + nums[i]);</p>
          <p className="pl-6">maxVal = max(maxVal, cur);</p>
          <p className="pl-3">&#125;</p>
          <p className="pl-3"><span className="text-violet-400">return</span> maxVal;</p>
          <p>&#125;</p>
        </div>

        {/* Real-time Telemetry & Evaluation HUD */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
          <div className="rounded-lg bg-white/[0.03] p-2.5 border border-white/[0.06]">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
              <FileCode2 size={12} className="text-cyan" /> Keystroke Telemetry
            </p>
            <p className="mt-1 text-[11px] text-slate-200 font-semibold">
              74 WPM <span className="text-slate-400 font-normal">· 2 Backspaces · 0 Paste</span>
            </p>
          </div>
          <div className="rounded-lg bg-emerald-950/30 p-2.5 border border-emerald-500/25">
            <p className="text-[10px] uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-semibold">
              <CheckCircle2 size={12} /> Test Suite
            </p>
            <p className="mt-1 text-[11px] text-emerald-200 font-semibold">
              12/12 Passed <span className="text-emerald-400/80 font-normal">(34ms)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EduReachVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-slate-950/90 text-xs shadow-2xl">
      <WindowHeader title="EduReach · AI Admission Assistant" badge="Agentic RAG Active" />
      <div className="p-4 space-y-3 font-sans">
        {/* User Query */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-none bg-blue-600/30 px-3.5 py-2 text-slate-200 border border-blue-500/30 text-xs leading-relaxed">
            What is the intake and curriculum for B.E. AI &amp; Data Science at DY Patil?
          </div>
        </div>

        {/* AI Response grounded in knowledge base */}
        <div className="flex gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan/20 border border-cyan/30 text-cyan text-[10px]">
            <Sparkles size={13} />
          </div>
          <div className="max-w-[90%] rounded-2xl rounded-tl-none bg-white/[0.04] p-3 text-slate-300 border border-white/[0.08] space-y-2 text-xs">
            <p className="leading-relaxed">
              Dr. D. Y. Patil Institute of Technology offers <strong className="text-white">B.E. in AI &amp; Data Science</strong> (SPPU) with curriculum covering ML, NLP, Data Structures, and Computer Vision.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono">
              <span className="rounded bg-cyan/15 px-2 py-0.5 text-cyan border border-cyan/20 font-medium">
                Sarvam AI
              </span>
              <span className="rounded bg-white/5 px-2 py-0.5 text-slate-400 border border-white/5">
                EN · HI · MR Multilingual
              </span>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400 border border-emerald-500/20">
                Similarity: 0.95
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowVisual() {
  const steps = [
    { title: "Planning Agent", desc: "Goal decomposition", tag: "Sarvam AI" },
    { title: "Execution Agent", desc: "Sheets + Gmail + Tools", tag: "Integrations" },
    { title: "Validation Agent", desc: "Contract verification", tag: "Recovery loop" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-slate-950/90 text-xs shadow-2xl">
      <WindowHeader title="WorkflowAI · Multi-Agent Orchestrator" badge="Orchestrator v1.0" />
      <div className="p-4 space-y-3 font-sans">
        <div className="grid grid-cols-3 gap-2 text-center">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-xl border border-white/[0.08] bg-white/[0.025] p-2.5 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block rounded-full bg-cyan/15 px-2 py-0.2 font-mono text-[9px] text-cyan mb-1.5 font-semibold">
                  Step 0{i + 1}
                </span>
                <p className="font-semibold text-slate-200 text-[11px] truncate">{s.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{s.desc}</p>
              </div>
              <div className="mt-2.5 pt-1.5 border-t border-white/[0.06] font-mono text-[9px] text-slate-500">
                {s.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Active pipeline status */}
        <div className="rounded-xl bg-violet-950/30 border border-violet-500/25 p-2.5 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-violet-300">
            <Layers size={13} className="text-violet-400" />
            <span className="font-mono">Self-Healing Recovery: Active</span>
          </div>
          <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[10px] font-mono text-violet-200 border border-violet-500/30">
            Retry &lt;200ms
          </span>
        </div>
      </div>
    </div>
  );
}

function HeartDiseaseVisual() {
  const models = [
    { name: "Random Forest", acc: "91.8%", rec: "94.2%", highlight: true },
    { name: "SVM (RBF Kernel)", acc: "89.4%", rec: "91.0%", highlight: false },
    { name: "KNN (k=5)", acc: "86.2%", rec: "84.5%", highlight: false },
    { name: "Decision Tree", acc: "85.0%", rec: "83.1%", highlight: false },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-slate-950/90 text-xs shadow-2xl">
      <WindowHeader title="Heart Disease Predictor · Clinical Classification" badge="PCA + LDA Evaluated" />
      <div className="p-4 space-y-2.5 font-sans">
        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 border-b border-white/[0.06] pb-2">
          <span>ALGORITHM</span>
          <span className="flex gap-4">
            <span>ACCURACY</span>
            <span className="text-cyan font-semibold">RECALL</span>
          </span>
        </div>
        <div className="space-y-1.5">
          {models.map((m) => (
            <div
              key={m.name}
              className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 font-mono text-[11px] ${
                m.highlight
                  ? "bg-cyan/15 border border-cyan/35 text-white shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                  : "bg-white/[0.02] border border-white/[0.05] text-slate-300"
              }`}
            >
              <span className="flex items-center gap-1.5 font-medium">
                {m.highlight && <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />}
                {m.name}
              </span>
              <div className="flex items-center gap-6">
                <span className="text-slate-300">{m.acc}</span>
                <span className={m.highlight ? "font-semibold text-cyan" : "text-slate-400"}>
                  {m.rec}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-white/[0.025] border border-white/[0.06] p-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Dimensionality: PCA 95% variance</span>
          <span className="text-emerald-400 font-medium">Minimizing False Negatives</span>
        </div>
      </div>
    </div>
  );
}
