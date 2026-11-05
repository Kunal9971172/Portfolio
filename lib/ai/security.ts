// Input validation and a small in-memory rate limiter.
// Note: in-memory limits are per server instance. For multi-instance production
// deployments, swap this for a shared store (e.g. Upstash Redis) behind the same API.

export const MAX_MESSAGE_CHARS = 500;
export const MAX_HISTORY = 6;

export type Msg = { role: "user" | "assistant"; content: string };

export function sanitizeText(s: string): string {
  return s
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") // control chars
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_MESSAGE_CHARS);
}

export function validateMessages(body: unknown): { ok: true; messages: Msg[] } | { ok: false; error: string } {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) {
    return { ok: false, error: "Invalid request." };
  }
  const raw = (body as { messages: unknown[] }).messages;
  if (raw.length === 0 || raw.length > 50) return { ok: false, error: "Invalid request." };

  const msgs: Msg[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return { ok: false, error: "Invalid request." };
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return { ok: false, error: "Invalid request." };
    }
    const clean = sanitizeText(content);
    if (clean) msgs.push({ role, content: clean });
  }
  const trimmed = msgs.slice(-MAX_HISTORY);
  // Must end on a user turn and start on a user turn (required by providers).
  while (trimmed.length && trimmed[0].role !== "user") trimmed.shift();
  if (!trimmed.length || trimmed[trimmed.length - 1].role !== "user") {
    return { ok: false, error: "Please enter a question." };
  }
  return { ok: true, messages: trimmed };
}

const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const LIMIT = 8; // requests per minute per client

export function rateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}
