export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-cyan/20 border-t-cyan animate-spin" />
        <div className="absolute h-4 w-4 rounded-full bg-cyan/10 blur-sm" />
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
        Loading Kunal HQ…
      </span>
    </div>
  );
}
