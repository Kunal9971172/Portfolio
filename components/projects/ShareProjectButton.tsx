"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareProjectButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${title} by Kunal Chaudhari`,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard if user dismissed or cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share this project"
      className="flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 font-medium text-slate-300 hover:border-cyan/40 hover:bg-white/[0.08] hover:text-white transition-all hover:-translate-y-0.5 active:translate-y-0"
    >
      {copied ? (
        <>
          <Check size={16} className="text-emerald-400" />
          <span className="text-emerald-400 font-semibold">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={16} className="text-cyan" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
