import type { Chunk } from "@/lib/knowledge-base/chunks";

export function synthesizeFallbackAnswer(query: string, chunks: Chunk[]): string {
  if (!chunks || chunks.length === 0) {
    return "I don't have enough verified information in Kunal's portfolio to answer that specifically. You can explore his projects directly or reach out via the Contact page.";
  }

  // If query is about contact or email
  const q = query.toLowerCase();
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("interview")) {
    const contactChunk = chunks.find((c) => c.id === "contact") || chunks[0];
    return `${contactChunk.text}\n\nYou can also download his verified engineering resume PDF directly from the navigation bar or header.`;
  }

  // If query is about specific project
  const projectSlug = ["gurukul", "edureach", "workflow", "heart"].find((s) => q.includes(s));
  if (projectSlug) {
    const projChunks = chunks.filter((c) => c.id.includes(projectSlug) || c.text.toLowerCase().includes(projectSlug));
    if (projChunks.length > 0) {
      const main = projChunks.find((c) => c.id.endsWith("overview")) || projChunks[0];
      const details = projChunks.filter((c) => c !== main).slice(0, 2);
      let out = main.text;
      if (details.length > 0) {
        out += "\n\n" + details.map((d) => `• ${d.title}: ${d.text}`).join("\n");
      }
      return out;
    }
  }

  // General questions (e.g. "Who is Kunal", skills, background)
  const top = chunks.slice(0, 3);
  const primary = top[0];
  const supporting = top.slice(1);

  let response = primary.text;
  if (supporting.length > 0) {
    response += "\n\n" + supporting.map((s) => `• ${s.title}: ${s.text}`).join("\n");
  }

  return response;
}
