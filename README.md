# Kunal Chaudhari — Personal Engineering HQ

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Needs Node.js 20+.

## Where to edit content

All portfolio content lives in `lib/data/` (profile, projects, experience, skills, mission-control).
Search the code for `TODO(Kunal)` and `PLACEHOLDER` to find things that still need your input:

- Portrait photo: `profile.portraitPath` (hero currently shows a labeled placeholder)
- Project screenshots, GitHub and live-demo URLs: `lib/data/projects.ts` (all `null` for now)
- "My contribution" text for each project: `lib/data/projects.ts`
- Open-to-opportunities badge: `profile.openToOpportunities` in `lib/data/profile.ts`
- Resume file: `public/resume/Kunal_Chaudhari_Resume.pdf`
  (**this PDF currently contains your phone number**; replace it with a version without one if you want it private)

## Ask Kunal AI

Server-side only. Keys never reach the browser.

1. Copy `.env.example` to `.env.local` and add a key (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY` or `GEMINI_API_KEY`).
2. Optional, for semantic search: add an `OPENAI_API_KEY` or `GEMINI_API_KEY`, then run `npm run ingest`.
   Without embeddings, retrieval falls back to keyword (BM25-style) search over the same knowledge base.
3. Restart the dev server.

The knowledge base is generated from `lib/data/` plus any approved `.md` files in `lib/knowledge-base/docs/`.
Run `npm run test:kb` to check retrieval, validation and rate limiting offline.

Safeguards: input validation and length caps, history trimming, per-IP rate limit (8/min, in-memory),
grounded system prompt with injection resistance, no phone number in the knowledge base.
For multi-instance production, replace the in-memory limiter in `lib/ai/security.ts` with a shared store.

## Scripts

`npm run dev` · `npm run build` · `npm run lint` · `npm run ingest` · `npm run test:kb`
