"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, ArrowDown } from "lucide-react";
import { profile } from "@/lib/data";

export default function Hero() {
  // Smooth mouse-responsive parallax tracking on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

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
      className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl flex-col justify-center px-4 pt-16 pb-12 sm:px-6 sm:pt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-14 overflow-hidden"
    >
      {/* Sophisticated Ambient Lighting Depth */}
      <div
        className="pointer-events-none absolute -top-16 left-1/4 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]"
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

      {/* LEFT SIDE: Bold Typography & Strong Personal Identity */}
      <div className="relative z-10 flex-1 max-w-2xl lg:max-w-3xl py-4 lg:py-0">
        {/* BIG WHITE NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-black tracking-tight text-white leading-[0.98] uppercase"
        >
          Kunal Chaudhari
        </motion.h1>

        {/* TWO-COLUMN PROFESSIONAL IDENTITY DIRECTLY BELOW NAME */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10 lg:gap-12">
          {/* LEFT BLOCK – Cyan */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex-1"
          >
            <p className="font-extrabold text-cyan tracking-tight text-xl sm:text-2xl lg:text-[1.65rem] leading-[1.15] uppercase">
              AI &amp; Data Science<br />
              Engineering Student.
            </p>
          </motion.div>

          {/* RIGHT BLOCK – Violet */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
            className="flex-1"
          >
            <p className="font-extrabold text-violet-400 tracking-tight text-xl sm:text-2xl lg:text-[1.65rem] leading-[1.15] uppercase">
              Full-Stack<br />
              Developer.
            </p>
          </motion.div>
        </div>

        {/* SHORT PROFESSIONAL INTRODUCTION */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300 font-normal"
        >
          I build intelligent applications and full-stack solutions, combining AI, machine learning, and software engineering to solve real-world problems.
        </motion.p>

        {/* THREE CALL-TO-ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5"
        >
          {/* 1. View Resume (White button with dark text) */}
          <a
            href={profile.resumePath}
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-3.5 text-sm font-semibold text-black shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_15px_30px_-5px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download size={15} />
            <span>View Resume</span>
          </a>

          {/* 2. Explore Projects (Dark translucent with subtle border) */}
          <Link
            href="#projects"
            className="liquid-glass inline-flex items-center justify-center gap-2 rounded-xl px-5 sm:px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.08] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore Projects</span>
            <ArrowDown size={15} />
          </Link>

          {/* 3. Enter Mission Control (Cyan text with simple arrow) */}
          <Link
            href="/mission-control"
            className="group inline-flex items-center gap-2 px-2 sm:px-3 py-3.5 text-sm font-medium text-cyan transition-all duration-300 hover:text-cyan-300 hover:translate-x-0.5"
          >
            <span>Enter Mission Control</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Preserved Personal Image with Liquid Glass Refinement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: parallaxX, y: parallaxY }}
        className="relative z-10 mt-10 flex w-full items-center justify-center lg:mt-0 lg:w-auto lg:flex-1 lg:justify-end"
      >
        <div className="relative flex items-center justify-center">
          {/* Soft Radial Ambient Aura */}
          <div
            className="pointer-events-none absolute -top-8 -right-8 h-72 w-72 rounded-full bg-cyan/20 blur-3xl opacity-75"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-8 -left-8 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl opacity-75"
            aria-hidden
          />

          {/* Liquid Glass Portrait Container */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative flex h-64 w-64 sm:h-80 sm:w-80 lg:h-[380px] lg:w-[380px] xl:h-[410px] xl:w-[410px] items-center justify-center rounded-full p-2 border border-white/[0.18] bg-gradient-to-b from-white/[0.10] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.35),0_0_50px_rgba(56,189,248,0.2)]"
          >
            {/* Perfectly Clipped High-Res Personal Portrait */}
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={profile.portraitPath || "/images/kunal.png"}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 410px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Liquid Glass Ambient Gradient Overlay */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-black/15"
                aria-hidden
              />

              {/* Specular Inner Rim Light */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.10]"
                aria-hidden
              />
            </div>

            {/* Subtle Outer Glowing Accent Ring */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-full border border-cyan/25 opacity-70 animate-[pulse_4s_ease-in-out_infinite]"
              aria-hidden
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
