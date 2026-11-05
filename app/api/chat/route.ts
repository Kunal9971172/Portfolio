import { NextResponse } from "next/server";
import { chatProvider, generate } from "@/lib/ai/providers";
import { retrieve } from "@/lib/ai/retrieve";
import { buildSystemPrompt } from "@/lib/ai/prompt";
import { rateLimited, validateMessages } from "@/lib/ai/security";
import { synthesizeFallbackAnswer } from "@/lib/ai/fallback";

// GET: lets the UI know whether the assistant is configured.
export async function GET() {
  return NextResponse.json({ configured: chatProvider() !== null });
}

export async function POST(req: Request) {
  if (!chatProvider()) {
    return NextResponse.json(
      { error: "Ask Kunal AI isn't configured yet.", code: "NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again.", code: "RATE_LIMITED" },
      { status: 429 },
    );
  }

  // Reject oversized bodies before parsing.
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20_000) {
    return NextResponse.json({ error: "Request too large.", code: "BAD_REQUEST" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request.", code: "BAD_REQUEST" }, { status: 400 });
  }
  const v = validateMessages(body);
  if (!v.ok) return NextResponse.json({ error: v.error, code: "BAD_REQUEST" }, { status: 400 });

  const last = v.messages[v.messages.length - 1].content;
  // Retrieval uses the latest question plus the previous user turn for follow-ups.
  const prevUser = [...v.messages].reverse().filter((m) => m.role === "user")[1]?.content ?? "";
  const { chunks, mode } = await retrieve(`${prevUser} ${last}`.trim(), 5);

  const links = [...new Map(chunks.filter((c) => c.href).map((c) => [c.href!, c.title])).entries()]
    .slice(0, 3)
    .map(([href, title]) => ({ href, title }));

  const fallback = synthesizeFallbackAnswer(last, chunks, prevUser);

  try {
    const answer = await generate(buildSystemPrompt(chunks), v.messages);
    if (!answer.trim()) throw new Error("empty response from model");

    return NextResponse.json({
      answer: answer.trim(),
      links,
      suggestions: fallback.suggestions,
      retrieval: mode,
    });
  } catch (e) {
    console.warn("AI upstream warning (falling back to grounded synthesis):", e instanceof Error ? e.message : "unknown");
    return NextResponse.json({
      answer: fallback.answer,
      links,
      suggestions: fallback.suggestions,
      retrieval: "grounded-knowledge-base",
    });
  }
}
