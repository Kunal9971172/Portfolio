"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown,
  Download,
  Mail,
  Brain,
  Code2,
  Cpu,
  Layers,
  GitBranch,
} from "lucide-react";
import { profile } from "@/lib/data";

export default function Hero() {
  // Smooth mouse-responsive parallax tracking on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-6xl flex-col justify-center px-4 pt-20 pb-10 sm:px-6 sm:pt-24 lg:flex-row lg:items-center lg:justify-between lg:gap-12 overflow-hidden"
    >
      {/* Sophisticated Ambient Lighting Depth */}
      <div
        className="pointer-events-none absolute -top-16 left-1/4 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan/12 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/4 right-0 h-[36rem] w-[36rem] rounded-full bg-violet-600/10 blur-[150px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]"
        aria-hidden
      />

      {/* LEFT COLUMN: Strong Personal Identity & Typography */}
      <div className="relative z-10 max-w-2xl py-4 lg:py-0">
        {/* Living Engineering Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-slate-900/70 px-3.5 py-1 text-xs text-slate-300 backdrop-blur-xl shadow-inner"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] font-medium tracking-wide">
            Building intelligent systems
          </span>
        </motion.div>

        {/* Identity Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-cyan font-bold"
        >
          KUNAL CHAUDHARI
        </motion.p>

        {/* Impactful Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]"
        >
          <span className="text-white block">ENGINEERING</span>
          <span className="text-gradient block">INTELLIGENT SYSTEMS.</span>
        </motion.h1>

        {/* Professional Positioning Statement */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-slate-300 font-medium sm:text-sm"
        >
          AI &amp; DATA SCIENCE &nbsp;|&nbsp; FULL-STACK DEVELOPMENT &nbsp;|&nbsp; AI SYSTEMS
        </motion.p>

        {/* Three Primary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3.5"
        >
          {/* Explore Projects */}
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_-5px_rgba(255,255,255,0.35)] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_15px_35px_-5px_rgba(255,255,255,0.45)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Projects</span>
            <ArrowDown size={15} />
          </Link>

          {/* View Resume */}
          <a
            href={profile.resumePath}
            download
            className="liquid-glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.08] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download size={15} className="text-cyan" />
            <span>View Resume</span>
          </a>

          {/* Contact Me */}
          <Link
            href="/contact"
            className="liquid-glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.08] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mail size={15} />
            <span>Contact Me</span>
          </Link>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: Interactive Abstract Engineering Centerpiece */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: parallaxX, y: parallaxY }}
        className="relative z-10 mt-10 flex w-full items-center justify-center lg:mt-0 lg:w-auto lg:flex-1 lg:justify-end"
      >
        <div className="relative flex aspect-square w-[310px] sm:w-[400px] lg:w-[440px] items-center justify-center">
          {/* Soft Radial Core Glow */}
          <div
            className="pointer-events-none absolute h-64 w-64 rounded-full bg-gradient-to-tr from-cyan/25 via-blue-500/20 to-violet-500/20 blur-3xl opacity-75"
            aria-hidden
          />

          {/* Subtle Outer Starry Dash Orbital 1 */}
          <div
            className="pointer-events-none absolute h-[290px] w-[290px] sm:h-[370px] sm:w-[370px] lg:h-[410px] lg:w-[410px] rounded-full border border-dashed border-cyan/25 animate-[spin_55s_linear_infinite]"
            aria-hidden
          />

          {/* Counter-rotating Elliptical Ring 2 */}
          <div
            className="pointer-events-none absolute h-[240px] w-[240px] sm:h-[310px] sm:w-[310px] lg:h-[340px] lg:w-[340px] rounded-full border border-violet-500/20 animate-[spin_40s_linear_infinite_reverse]"
            style={{ transform: "rotateX(55deg) rotateY(15deg)" }}
            aria-hidden
          />

          {/* 3D Glass Portrait Sphere Centerpiece */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            animate={{
              y: [-8, 8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="group relative flex h-60 w-60 sm:h-68 sm:w-68 lg:h-76 lg:w-76 items-center justify-center rounded-full p-1.5 border border-white/[0.22] bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-white/[0.01] backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.4),0_0_45px_rgba(56,189,248,0.25)]"
          >
            {/* Ambient Internal Backlight */}
            <div
              className="pointer-events-none absolute -top-6 -right-6 h-36 w-36 rounded-full bg-cyan/20 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-6 -left-6 h-36 w-36 rounded-full bg-violet/20 blur-2xl"
              aria-hidden
            />

            {/* Perfectly Clipped Circular Portrait */}
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={profile.portraitPath || "/images/kunal.png"}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 272px, 304px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Liquid Glass Ambient Gradient Overlay */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20"
                aria-hidden
              />

              {/* Specular Inner Rim Light */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12]"
                aria-hidden
              />
            </div>

            {/* Glowing Accent Outer Orbit Ring */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-full border border-cyan/30 opacity-70 animate-[pulse_4s_ease-in-out_infinite]"
              aria-hidden
            />
          </motion.div>

          {/* FLOATING TECHNOLOGY BADGES AT ORBITAL NODES */}

          {/* 1. Top-Left: AI / ML */}
          <motion.div
            animate={{ y: [-5, 5] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute top-2 left-0 sm:-top-2 sm:left-4 z-20 flex items-center gap-1.5 rounded-xl border border-cyan/35 bg-slate-950/80 px-3 py-1.5 font-mono text-xs text-slate-200 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(56,189,248,0.25)]"
          >
            <Brain size={13} className="text-cyan" />
            <span className="font-semibold text-white">AI / ML</span>
          </motion.div>

          {/* 2. Top-Right: Python */}
          <motion.div
            animate={{ y: [5, -5] }}
            transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
            className="absolute top-6 right-0 sm:top-2 sm:right-6 z-20 flex items-center gap-1.5 rounded-xl border border-blue-500/35 bg-slate-950/80 px-3 py-1.5 font-mono text-xs text-slate-200 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(96,165,250,0.25)]"
          >
            <Code2 size={13} className="text-blue-400" />
            <span className="font-semibold text-white">Python</span>
          </motion.div>

          {/* 3. Bottom-Left: C++ */}
          <motion.div
            animate={{ y: [6, -6] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
            className="absolute bottom-6 left-0 sm:bottom-4 sm:left-6 z-20 flex items-center gap-1.5 rounded-xl border border-violet-500/35 bg-slate-950/80 px-3 py-1.5 font-mono text-xs text-slate-200 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(168,85,247,0.25)]"
          >
            <Cpu size={13} className="text-violet-400" />
            <span className="font-semibold text-white">C++</span>
          </motion.div>

          {/* 4. Bottom-Right: React */}
          <motion.div
            animate={{ y: [-6, 6] }}
            transition={{ duration: 4.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-6 right-0 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 rounded-xl border border-cyan/35 bg-slate-950/80 px-3 py-1.5 font-mono text-xs text-slate-200 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(56,189,248,0.25)]"
          >
            <Layers size={13} className="text-cyan" />
            <span className="font-semibold text-white">React</span>
          </motion.div>

          {/* 5. Center-Top: Automation */}
          <motion.div
            animate={{ y: [-4, 4] }}
            transition={{ duration: 5.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.8 }}
            className="hidden sm:flex absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 items-center gap-1.5 rounded-xl border border-emerald-500/35 bg-slate-950/80 px-3 py-1.5 font-mono text-xs text-slate-200 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(52,211,153,0.25)]"
          >
            <GitBranch size={13} className="text-emerald-400" />
            <span className="font-semibold text-white">Automation</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
