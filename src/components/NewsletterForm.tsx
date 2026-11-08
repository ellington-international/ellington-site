"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { ThankYouOverlay } from "./ThankYouOverlay";
import { Button } from "./ui/Button";

// Figma "01 Home" › Newsletter › Form (9:187 / mobile 9:453): "Input"
// (white, hairline border, 14 × 10 padding, Text/Input, placeholder #8ea0b3
// from Figma) + Primary "Subscribe". Desktop one row, 560px, 10px apart;
// mobile stacked full width, 24px apart.
// Success: Figma thank-you overlay (newsletter); the emptied form stays.
export function NewsletterForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    // TODO: wire to a newsletter service when the client has chosen one.
    await new Promise((r) => setTimeout(r, 600));
    setState("ok");
    setEmail("");
  }

  return (
    <>
      <ThankYouOverlay open={state === "ok"} variant="newsletter" onClose={() => setState("idle")} />
      <form onSubmit={onSubmit} className="w-full max-w-[560px] mx-auto flex flex-col md:flex-row gap-[24px] md:gap-[10px]">
        <label className="flex-1 min-w-0">
          <span className="sr-only">{t.home.newsletterPlaceholder}</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.home.newsletterPlaceholder}
            className="type-input w-full h-[42px] px-[14px] py-[10px] bg-surface border border-hairline focus:border-brand-blue transition-colors placeholder:text-[#8ea0b3]"
          />
        </label>
        <Button type="submit" variant="primary" disabled={state === "loading"} className="shrink-0">
          {state === "loading" ? t.common.loading : t.home.newsletterSubmit}
        </Button>
      </form>
    </>
  );
}
