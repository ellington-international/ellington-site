"use client";

import { LANGS } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

// Figma Navigation › "Language" (7:20 / 7:56): FR EN NL, Caps/Button, 10px apart,
// no separators. Solid nav: current language brand/blue, others text/muted.
// Over a photo: current language white, the other two at 60 % (Figma draws all
// three white; changed so the active language is visible).
export function LanguageToggle({
  className = "",
  overImage = false,
}: {
  className?: string;
  overImage?: boolean;
}) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`inline-flex items-center gap-[10px] ${className}`}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={`type-button py-[6px] transition-colors ${
              overImage
                ? active
                  ? "text-white"
                  : "text-white/60 hover:text-white"
                : active
                  ? "text-brand-blue"
                  : "text-muted hover:text-brand-blue"
            }`}
            aria-pressed={active}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
