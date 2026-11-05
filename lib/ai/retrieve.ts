import fs from "node:fs";
import path from "node:path";
import { buildDataChunks, type Chunk } from "@/lib/knowledge-base/chunks";
import { loadDocChunks } from "@/lib/knowledge-base/docs";
import { embed, embeddingProvider } from "./providers";

export type EmbeddedIndex = { provider: string; chunks: (Chunk & { vector: number[] })[] };

const INDEX_PATH = path.join(process.cwd(), "lib", "knowledge-base", "embeddings.json");

export function allChunks(): Chunk[] {
  return [...buildDataChunks(), ...loadDocChunks()];
}

// ---------- Lexical retrieval (always available; used when no embeddings) ----------
const STOP = new Set(["the","a","an","is","are","of","to","and","in","on","for","with","what","does","do","how","he","his","him","kunal","about","can","me","tell","explain","who","has","have","it","this","that"]);

// Very light stemming so "internships"/"internship"/"intern" and plurals match.
function stem(t: string): string {
  return t.replace(/ships?$/, "").replace(/(.{3,})s$/, "$1");
}

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9.+# ]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map(stem);
}

export function lexicalSearch(query: string, chunks: Chunk[], k = 5): Chunk[] {
  const q = tokens(query);
  if (!q.length) return [];
  const docs = chunks.map((c) => ({ c, t: tokens(`${c.title} ${c.title} ${c.text}`) }));
  const df = new Map<string, number>();
  for (const d of docs) for (const t of new Set(d.t)) df.set(t, (df.get(t) ?? 0) + 1);
  const N = docs.length;

  const scored = docs.map(({ c, t }) => {
    const tf = new Map<string, number>();
    t.forEach((x) => tf.set(x, (tf.get(x) ?? 0) + 1));
    let score = 0;
    for (const term of q) {
      const f = tf.get(term) ?? 0;
      if (!f) continue;
      const idf = Math.log(1 + (N - (df.get(term) ?? 0) + 0.5) / ((df.get(term) ?? 0) + 0.5));
      score += idf * ((f * 2.2) / (f + 1.2 * (0.25 + (0.75 * t.length) / 80)));
    }
    return { c, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, k).map((s) => s.c);
}

// ---------- Semantic retrieval (when embeddings.json exists and a key is set) ----------
let cached: EmbeddedIndex | null | undefined;

function loadIndex(): EmbeddedIndex | null {
  if (cached !== undefined) return cached;
  try {
    cached = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8")) as EmbeddedIndex;
  } catch {
    cached = null;
  }
  return cached;
}

function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

export async function retrieve(query: string, k = 5): Promise<{ chunks: Chunk[]; mode: "semantic" | "lexical" }> {
  const live = allChunks();
  const index = loadIndex();
  // Use semantic search only if the saved index matches the current provider
  // and still covers every current chunk (so stale indexes don't hide new content).
  if (index && embeddingProvider() === index.provider && index.chunks.length === live.length) {
    try {
      const [qv] = await embed([query]);
      const sem = index.chunks
        .map((c) => ({ c, s: cosine(qv, c.vector) }))
        .sort((a, b) => b.s - a.s)
        .slice(0, k)
        .map(({ c }) => ({ id: c.id, title: c.title, text: c.text, href: c.href }));
      // Blend with lexical hits so exact terms (e.g. "Judge0") are never missed.
      const lex = lexicalSearch(query, live, 2);
      const seen = new Set(sem.map((c) => c.id));
      return { chunks: [...sem, ...lex.filter((c) => !seen.has(c.id))].slice(0, k + 1), mode: "semantic" };
    } catch {
      /* fall through to lexical */
    }
  }
  return { chunks: lexicalSearch(query, live, k), mode: "lexical" };
}
