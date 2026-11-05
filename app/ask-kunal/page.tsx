import type { Metadata } from "next";
import { PageShell, Section } from "@/components/ui/Primitives";
import Chat from "@/components/chatbot/Chat";

export const metadata: Metadata = {
  title: "Ask Kunal AI",
  description: "An AI assistant grounded in Kunal Chaudhari's verified engineering portfolio.",
};

export default function AskKunal() {
  return (
    <PageShell
      eyebrow="Interactive Assistant"
      title="Ask Kunal AI."
      lead="An AI assistant grounded directly in Kunal's verified engineering systems, architecture specs, and background."
    >
      <Section className="!py-10">
        <Chat />
      </Section>
    </PageShell>
  );
}
