"use client";

import Link from "next/link";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 pt-32 pb-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16">
      {/* Ambient Radial Beams */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 right-10 h-[28rem] w-[28rem] rounded-full bg-violet/10 blur-[140px]"
        aria-hidden
      />

      {/* Main Pitch (Left) */}
      <div className="relative z-10 max-w-2xl">
        {/* Name & Positioning Eyebrow */}
        <div className="mb-4 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" aria-hidden />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan font-semibold">
            {profile.name}
          </p>
        </div>

        {/* Impactful Headline */}
        <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
          <span className="text-gradient">Engineering Intelligent Systems.</span>
        </h1>

        {/* Short Professional Positioning Statement */}
        <p className="mt-5 font-mono text-sm uppercase tracking-wider text-slate-400 sm:text-base">
          {profile.positioningStatement}
        </p>

        {/* Three Focused CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_-5px_rgba(255,255,255,0.35)] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_15px_35px_-5px_rgba(255,255,255,0.45)] hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowDown size={15} />
          </Link>

          <a
            href={profile.resumePath}
            download
            className="glass-interactive inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <Download size={15} className="text-cyan" />
            <span>Resume</span>
          </a>

          <Link
            href="/contact"
            className="glass-interactive inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail size={15} />
            <span>Contact</span>
          </Link>
        </div>
      </div>

      {/* Subtle Liquid Glass Visual Element (Right) */}
      <div className="relative z-10 mt-12 flex w-full justify-center lg:mt-0 lg:w-auto lg:flex-1 lg:justify-end">
        <div className="group relative flex aspect-square w-72 sm:w-80 items-center justify-center">
          {/* Subtle Outer Ambient Ring */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-cyan/20 via-violet/10 to-transparent blur-2xl opacity-60 transition-opacity duration-700 group-hover:opacity-90"
            aria-hidden
          />

          {/* Liquid Glass Orb Container */}
          <div className="specular-rim relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]">
            {/* Ambient Internal Glow */}
            <div
              className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-cyan/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet/20 blur-3xl"
              aria-hidden
            />

            {/* Concentric Minimal Orbitals */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none" aria-hidden>
              <div className="h-56 w-56 rounded-full border border-dashed border-cyan/40 animate-[spin_45s_linear_infinite]" />
              <div className="absolute h-40 w-40 rounded-full border border-white/15 animate-[spin_30s_linear_infinite_reverse]" />
            </div>

            {/* Center Core Monogram */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_35px_rgba(56,189,248,0.25)] transition-transform duration-500 group-hover:scale-105">
                <span className="font-mono text-xl font-bold tracking-widest text-white">KC</span>
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white font-semibold">
                Kunal Chaudhari
              </p>
              <p className="mt-1 font-mono text-[11px] text-cyan flex items-center gap-1.5 justify-center">
                <Sparkles size={11} /> AI Systems Engine
              </p>
            </div>

            {/* Specular Edge Highlight Overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
