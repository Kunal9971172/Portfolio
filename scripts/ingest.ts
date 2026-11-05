// Knowledge-base ingestion: chunks site content + approved docs, embeds them,
// and writes lib/knowledge-base/embeddings.json.
//   npm run ingest
// Needs OPENAI_API_KEY or GEMINI_API_KEY in .env.local. Without one, the chatbot
// still works using lexical retrieval.

import fs from "node:fs";
import path from "node:path";
import { allChunks } from "../lib/ai/retrieve";
import { embed, embeddingProvider } from "../lib/ai/providers";

async function main() {
  const provider = embeddingProvider();
  if (!provider) {
    console.log("No embedding key found (OPENAI_API_KEY or GEMINI_API_KEY). Skipping: lexical retrieval will be used.");
    return;
  }
  const chunks = allChunks();
  console.log(`Embedding ${chunks.length} chunks with ${provider}…`);

  const vectors: number[][] = [];
  for (let i = 0; i < chunks.length; i += 20) {
    const batch = chunks.slice(i, i + 20);
    vectors.push(...(await embed(batch.map((c) => `${c.title}\n${c.text}`))));
  }
  const out = { provider, chunks: chunks.map((c, i) => ({ ...c, vector: vectors[i] })) };
  const file = path.join(process.cwd(), "lib", "knowledge-base", "embeddings.json");
  fs.writeFileSync(file, JSON.stringify(out));
  console.log(`Wrote ${file}`);
}

main().catch((e) => {
  console.error("Ingestion failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
