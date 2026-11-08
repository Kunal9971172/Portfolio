# Kunal Chaudhari — Personal Engineering HQ

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Production-black?style=for-the-badge&logo=vercel)](https://kunal-portfolio-steel-rho.vercel.app)

> **Live Production:** [kunal-portfolio-steel-rho.vercel.app](https://kunal-portfolio-steel-rho.vercel.app)  
> **Identity:** AI & Data Science Engineering Student · Product Engineer & Full-Stack Developer · Google Student Ambassador '26

---

## 🌟 Overview

This repository powers the personal engineering headquarters and interactive portfolio for **Kunal Chaudhari**. Built with the modern **Next.js 16 (App Router)** and **React 19** stack, it combines high-performance web architecture with an immersive liquid-glass aesthetic, interactive AI assistance, and deep engineering showcase features.

---

## 🚀 Key Architectural Features

### 1. 3D Liquid-Glass Hero & Responsive Visual Hierarchy
- **Adaptive Viewport Layout**: Mobile-first responsive hierarchy placing the high-res circular liquid-glass portrait on top with specular rim lighting and pulsing cyan/violet ambient auras.
- **Desktop 3D Parallax**: Real-time cursor-tracking springs (`framer-motion`) offering physical depth and tilt on desktop viewports without layout thrashing.
- **Typography Matrix**: Two-column dual-identity lockup representing **AI & Data Science** and **Product Engineering / Full-Stack Development**.

### 2. "Ask Kunal" — Grounded Server-Side AI Assistant
- **RAG Architecture**: Ingests structured portfolio data, project case studies, and engineering achievements (`lib/data/` & `lib/knowledge-base/docs/`).
- **Hybrid Retrieval**: Combines semantic embedding search (OpenAI/Gemini embeddings) with keyword fallback (BM25-style ranking) for instantaneous, hallucination-resistant answers.
- **Security & Privacy Guardrails**: Input sanitization, strict token length caps, in-memory IP rate-limiting, and intentional redaction of sensitive credentials.

### 3. Recruiter Executive Summary & Command Center
- **Recruiter Mode**: Instant executive view toggle providing hiring managers with direct PDF resume access, fast facts, GPA metrics, and core skill matrices.
- **Universal Command Palette (`Cmd+K` / `Ctrl+K`)**: Keyboard-driven navigation across all portfolio routes, projects, and direct contact actions.
- **Interactive Terminal Easter Egg**: UNIX-style terminal emulator in the footer supporting commands (`help`, `projects`, `resume`, `skills`, `clear`).

### 4. Search Engine Optimization (SEO) & Schema Architecture
- **JSON-LD Schema Markup**: Embedded `Person` and `WebSite` structured data for Google Knowledge Graph integration.
- **Dynamic Sitemap & Robots**: Automated `sitemap.xml` with priority weighting, change frequencies, and strict crawler boundaries in `robots.txt`.
- **OpenGraph & Twitter Cards**: High-resolution social preview cards with responsive metadata fallback.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.4.5 (App Router, Turbopack/Webpack, Partial Prerendering) |
| **Language** | TypeScript 5.x (Strict Type Safety) |
| **UI Library** | React 19.3.0 & React DOM |
| **Styling** | Tailwind CSS v4, PostCSS, Custom Liquid-Glass Tokens |
| **Animation** | Framer Motion 14.x (Hardware-accelerated springs, transitions, layout transforms) |
| **Icons & Typography** | Lucide React, Geist Sans & Geist Mono (Vercel) |
| **AI / RAG** | Vercel AI SDK, Multi-LLM provider compatibility (OpenAI, Gemini, Anthropic) |
| **Deployment** | Vercel Serverless Edge Network with automated continuous integration |

---

## 📂 Project Structure

```text
kunal-hq/
├── app/                      # Next.js 16 App Router pages & API routes
│   ├── layout.tsx            # Global Root Layout (SEO, JSON-LD, Providers)
│   ├── page.tsx              # Home Hero & Engineering Showcases
│   ├── about/                # Profile, Education & Journey
│   ├── projects/             # Project Grid & Dynamic [slug] Detail Pages
│   ├── experience/           # Timeline & Internships
│   ├── mission-control/      # Tech Radar, System Status & Metrics
│   ├── contact/              # Interactive Message Form & Contacts
│   ├── sitemap.ts            # Dynamic SEO Sitemap
│   └── api/                  # Chat & Telemetry Endpoints
├── components/
│   ├── hero/                 # 3D Parallax & Typography Hero
│   ├── chatbot/              # Floating Assistant & Floating Trigger
│   ├── command-center/       # Keyboard Palette (Cmd+K)
│   ├── dashboard/            # Recruiter Mode, Proof of Work, Tech Radar
│   ├── projects/             # Project Cards, Diagrams & Share Controls
│   ├── ui/                   # Liquid Glass Primitives, Brand Icons, ScrollToTop
│   └── footer/               # Interactive Terminal & Footer Nav
├── lib/
│   ├── data/                 # Central data source (profile, projects, experience)
│   ├── ai/                   # RAG retriever, prompts, fallbacks & security
│   └── analytics/            # In-memory session tracking & metrics
└── public/
    ├── images/               # High-res portraits & brand assets
    └── resume/               # Official PDF Resume
```

---

## 💻 Local Development

### Prerequisites
- Node.js 20+ installed
- npm or pnpm

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kunal9971172/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   Add your preferred AI key (`GEMINI_API_KEY`, `OPENAI_API_KEY`, or `ANTHROPIC_API_KEY`).

4. **Launch development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Production Build:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📬 Connect with Kunal

- **LinkedIn:** [linkedin.com/in/kunal-chaudhari-81bb22310](https://www.linkedin.com/in/kunal-chaudhari-81bb22310)
- **GitHub:** [github.com/Kunal9971172](https://github.com/Kunal9971172)
- **Email:** [hikunal2005@gmail.com](mailto:hikunal2005@gmail.com)
- **Portfolio:** [kunal-portfolio-steel-rho.vercel.app](https://kunal-portfolio-steel-rho.vercel.app)

---

© 2026 Kunal Chaudhari. Built with Next.js 16 & React 19. All rights reserved.
