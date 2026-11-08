"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { ThankYouOverlay } from "./ThankYouOverlay";

export function NewsletterForm({ onDark = false }: { onDark?: boolean }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    // TODO: wire to /api/newsletter when backend is ready.
    await new Promise((r) => setTimeout(r, 600));
    setState("ok");
    setEmail("");
  }

  // Success: Figma thank-you overlay (newsletter); the emptied form stays.
  return (
    <>
    <ThankYouOverlay open={state === "ok"} variant="newsletter" onClose={() => setState("idle")} />
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.home.newsletterPlaceholder}
        className={`flex-1 px-5 py-4 bg-transparent border transition text-sm ${
          onDark
            ? "border-white/30 text-white placeholder:text-white/50 focus:border-white"
            : "border-[var(--border-strong)] focus:border-accent placeholder:text-muted"
        }`}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className={`px-7 py-4 text-[11px] tracking-[0.22em] uppercase transition disabled:opacity-60 ${
          onDark
            ? "bg-[var(--gold)] text-[var(--accent)] hover:bg-[var(--gold-hover)]"
            : "border border-[var(--border-strong)] text-muted-strong hover:bg-accent hover:text-white hover:border-accent"
        }`}
      >
        {state === "loading" ? t.common.loading : t.home.newsletterSubmit}
      </button>
    </form>
    </>
  );
}
