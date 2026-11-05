// Offline checks for the knowledge base, retrieval, prompt and input validation.
//   npm run test:kb
import assert from "node:assert/strict";
import { allChunks, lexicalSearch } from "../lib/ai/retrieve";
import { buildSystemPrompt } from "../lib/ai/prompt";
import { rateLimited, validateMessages, sanitizeText } from "../lib/ai/security";

const chunks = allChunks();
console.log(`chunks: ${chunks.length}`);

// 1. No private data in the knowledge base.
const blob = JSON.stringify(chunks);
assert.ok(!blob.includes("9373381214"), "phone number leaked into knowledge base");
assert.ok(!/\+91/.test(blob), "phone prefix leaked");

// 2. Retrieval: each question must surface the right chunk in the top results.
const cases: [string, string][] = [
  ["Who is Kunal Chaudhari?", "profile"],
  ["Explain Gurukul.ai", "gurukul-ai"],
  ["How does Judge0 integration work in Gurukul.ai?", "gurukul-ai"],
  ["Explain EduReach's Agentic RAG architecture", "edureach"],
  ["What is WorkflowAI?", "workflow"],
  ["What internships has he completed?", "exp-UI/UX"],
  ["What are his achievements?", "achievements"],
  ["How can I contact him?", "contact"],
  ["Is he open to internships?", "availability"],
  ["What is his experience with full-stack development?", "skills-Full-Stack"],
  ["What are his AI/ML skills?", "skills-AI"],
];
let failed = 0;
for (const [q, want] of cases) {
  const top = lexicalSearch(q, chunks, 5).map((c) => c.id);
  const ok = want === "mern" ? top.length > 0 : top.some((id) => id.includes(want));
  console.log(`${ok ? "PASS" : "FAIL"}  ${q}  ->  ${top.slice(0, 3).join(", ")}`);
  if (!ok) failed++;
}

// 3. Prompt contains guardrails and the retrieved context.
const p = buildSystemPrompt(lexicalSearch("Gurukul.ai", chunks, 2));
assert.ok(p.includes("KNOWLEDGE BASE") && p.includes("Never invent"));
assert.ok(p.includes("not Kunal himself"));

// 4. Validation + sanitization.
assert.equal(validateMessages(null).ok, false);
assert.equal(validateMessages({ messages: [] }).ok, false);
assert.equal(validateMessages({ messages: [{ role: "system", content: "x" }] }).ok, false);
assert.equal(validateMessages({ messages: [{ role: "assistant", content: "hi" }] }).ok, false);
const good = validateMessages({ messages: [{ role: "user", content: "hello\u0000 there" }] });
assert.ok(good.ok && good.messages[0].content === "hello there");
assert.equal(sanitizeText("a".repeat(900)).length, 500);

// 5. Rate limiting kicks in at the 9th request in a window.
const t = 1_000_000;
const results = Array.from({ length: 9 }, () => rateLimited("test-ip", t));
assert.deepEqual(results.slice(0, 8).every((r) => r === false) && results[8] === true, true);
assert.equal(rateLimited("test-ip", t + 61_000), false);

if (failed) {
  console.error(`${failed} retrieval case(s) failed`);
  process.exit(1);
}
console.log("All knowledge-base tests passed.");
