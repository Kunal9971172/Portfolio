
// Provider-agnostic LLM + embedding calls. Keys come from environment variables only.
//   AI_PROVIDER        anthropic | openai | gemini     (chat)
//   AI_MODEL           optional model override
//   EMBEDDING_PROVIDER openai | gemini | none          (semantic search; default: auto)
// Keys: ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type Provider = "anthropic" | "openai" | "gemini";

const KEY_ENV: Record<Provider, string> = {
  anthropic: "ANTHROPIC_API_KEY",
  openai: "OPENAI_API_KEY",
  gemini: "GEMINI_API_KEY",
};

const DEFAULT_MODEL: Record<Provider, string> = {
  anthropic: "claude-sonnet-5-5",
  openai: "gpt-4o-mini",
  gemini: "gemini-2.0-flash",
};

export function chatProvider(): Provider | null {
  const want = (process.env.AI_PROVIDER ?? "").toLowerCase() as Provider;
  if (want in KEY_ENV) return process.env[KEY_ENV[want]] ? want : null;
  // Auto-detect from whichever key is present.
  for (const p of Object.keys(KEY_ENV) as Provider[]) if (process.env[KEY_ENV[p]]) return p;
  return null;
}

export function embeddingProvider(): "openai" | "gemini" | null {
  const want = (process.env.EMBEDDING_PROVIDER ?? "auto").toLowerCase();
  if (want === "none") return null;
  if (want === "openai" || want === "auto") if (process.env.OPENAI_API_KEY) return "openai";
  if (want === "gemini" || want === "auto") if (process.env.GEMINI_API_KEY) return "gemini";
  return null;
}

async function post(url: string, headers: Record<string, string>, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Upstream AI error ${res.status}`);
  return res.json();
}

export async function generate(system: string, messages: ChatMessage[]): Promise<string> {
  const provider = chatProvider();
  if (!provider) throw new Error("NOT_CONFIGURED");
  const key = process.env[KEY_ENV[provider]]!;
  const model = process.env.AI_MODEL || DEFAULT_MODEL[provider];

  if (provider === "anthropic") {
    const j = await post(
      "https://api.anthropic.com/v1/messages",
      { "x-api-key": key, "anthropic-version": "2023-06-01" },
      { model, max_tokens: 700, system, messages },
    );
    return j.content?.map((b: { text?: string }) => b.text ?? "").join("") ?? "";
  }
  if (provider === "openai") {
    const j = await post(
      "https://api.openai.com/v1/chat/completions",
      { authorization: `Bearer ${key}` },
      { model, max_tokens: 700, messages: [{ role: "system", content: system }, ...messages] },
    );
    return j.choices?.[0]?.message?.content ?? "";
  }
  const j = await post(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    { "x-goog-api-key": key },
    {
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: 700 },
    },
  );
  return j.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
}

export async function embed(texts: string[]): Promise<number[][]> {
  const provider = embeddingProvider();
  if (!provider) throw new Error("NO_EMBEDDINGS");
  if (provider === "openai") {
    const j = await post(
      "https://api.openai.com/v1/embeddings",
      { authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      { model: "text-embedding-3-small", input: texts },
    );
    return j.data.map((d: { embedding: number[] }) => d.embedding);
  }
  const j = await post(
    "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:batchEmbedContents",
    { "x-goog-api-key": process.env.GEMINI_API_KEY! },
    {
      requests: texts.map((t) => ({
        model: "models/text-embedding-004",
        content: { parts: [{ text: t }] },
      })),
    },
  );
  return j.embeddings.map((e: { values: number[] }) => e.values);
}
