import fs from "node:fs";
import path from "node:path";
import type { Chunk } from "./chunks";

const DOCS_DIR = path.join(process.cwd(), "lib", "knowledge-base", "docs");

// Splits each approved markdown document by "## " headings (max ~900 chars per chunk).
export function loadDocChunks(): Chunk[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  const out: Chunk[] = [];
  for (const file of fs.readdirSync(DOCS_DIR)) {
    if (!file.endsWith(".md") || file.toLowerCase() === "readme.md") continue;
    const raw = fs.readFileSync(path.join(DOCS_DIR, file), "utf8");
    const parts = raw.split(/\n(?=## )/);
    parts.forEach((part, i) => {
      const text = part.trim();
      if (!text) return;
      const title = (text.match(/^#+\s*(.+)$/m)?.[1] ?? file).slice(0, 80);
      for (let off = 0, n = 0; off < text.length; off += 900, n++) {
        out.push({ id: `doc-${file}-${i}-${n}`, title: `${file}: ${title}`, text: text.slice(off, off + 900) });
      }
    });
  }
  return out;
}
