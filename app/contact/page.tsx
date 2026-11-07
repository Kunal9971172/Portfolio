"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight, Download, Send } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { PageShell, Section } from "@/components/ui/Primitives";
import { profile } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCompose = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || "Engineering Opportunity / Inquiry",
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  const channels = [
    {
      icon: Mail,
      label: "Direct Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      actionLabel: "Send Email",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "kunal-chaudhari",
      href: profile.linkedin,
      actionLabel: "Connect",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Kunal9971172",
      href: profile.github,
      actionLabel: "View Code",
    },
  ];

  return (
    <PageShell
      eyebrow="Initiate Connection"
      title="Let's Build Together."
      lead="Available for AI engineering roles, software internships, and technical collaborations."
    >
      <Section className="!py-10">
        {/* Availability Status Header */}
        <div className="mb-8 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-cyan/10 via-slate-900/40 to-violet/10 p-5 backdrop-blur-2xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Active &amp; Responsive</p>
              <p className="text-xs text-slate-300">
                Typically responds within 24 hours · Pune, India
              </p>
            </div>
          </div>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-2 text-xs font-mono font-medium text-slate-200 hover:border-cyan/40 hover:text-white transition-all"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Copied to clipboard!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-cyan" />
                <span>Copy {profile.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {channels.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 backdrop-blur-2xl transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(56,189,248,0.2)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan/15 border border-cyan/30 text-cyan group-hover:scale-105 transition-transform">
                    <Icon size={18} />
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-400 group-hover:text-cyan transition-colors">
                    {c.actionLabel} <ArrowUpRight size={13} />
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{c.label}</h3>
                <p className="mt-1 break-all font-mono text-xs text-slate-400">{c.value}</p>
              </a>
            );
          })}
        </div>

        {/* Quick Email Launcher Form & Resume */}
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Quick Message Box */}
          <div className="lg:col-span-3 rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-6 sm:p-8 backdrop-blur-2xl">
            <h3 className="text-lg font-semibold text-white">Draft a Direct Message</h3>
            <p className="mt-1 text-xs text-slate-400 mb-6">
              Generates a pre-formatted email directly in your default mail application.
            </p>

            <form onSubmit={handleCompose} className="space-y-4">
              <div>
                <label htmlFor="subj" className="block font-mono text-xs text-slate-400 mb-1.5">
                  SUBJECT
                </label>
                <input
                  id="subj"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. AI Engineering Internship Opportunity"
                  className="w-full rounded-xl border border-white/[0.09] bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan"
                />
              </div>

              <div>
                <label htmlFor="msg" className="block font-mono text-xs text-slate-400 mb-1.5">
                  MESSAGE
                </label>
                <textarea
                  id="msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Kunal, we reviewed your work on Gurukul.ai and EduReach and would love to connect..."
                  className="w-full rounded-xl border border-white/[0.09] bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 shadow-[0_10px_25px_-5px_rgba(255,255,255,0.35)] transition-all hover:-translate-y-0.5"
              >
                <Send size={14} />
                <span>Open Mail Client</span>
              </button>
            </form>
          </div>

          {/* Resume & Verification Card */}
          <div className="lg:col-span-2 flex flex-col justify-between rounded-3xl border border-white/[0.09] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-6 sm:p-8 backdrop-blur-2xl">
            <div>
              <span className="rounded-full bg-cyan/15 border border-cyan/30 px-3 py-1 font-mono text-xs font-semibold text-cyan">
                Official Document
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">Engineering Resume</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Verified one-page PDF outlining academics (CGPA 8.99), engineering systems, technical stack, and leadership credentials.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/15 px-4 py-3 text-sm font-semibold text-cyan hover:bg-cyan/25 transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)]"
              >
                <Download size={15} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
