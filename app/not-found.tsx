import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-xl flex-col items-center justify-center px-4 text-center pt-28">
      <div className="glass w-full rounded-3xl p-8 sm:p-10 border border-white/[0.1] shadow-2xl">
        <span className="rounded-full bg-cyan/15 border border-cyan/30 px-3 py-1 font-mono text-xs font-semibold text-cyan">
          STATUS 404
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Route Not Found
        </h1>
        <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
          The requested system route does not exist. Use the command palette or return to the main engineering portfolio.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90 shadow-md transition-all"
          >
            <Home size={15} />
            <span>Return to HQ</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white hover:bg-white/[0.08] transition-all"
          >
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
