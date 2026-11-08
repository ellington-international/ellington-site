"use client";

import { usePathname } from "next/navigation";
import { LANGS } from "@/lib/i18n";
import { LANG_COOKIE, switchLangPath } from "@/lib/locale";
import { useLanguage } from "./LanguageProvider";

// Figma Navigation › "Language" (7:20 / 7:56): FR EN NL, Caps/Button, 10px apart,
// no separators. Solid nav: current language brand/blue, others text/muted.
// Over a photo: current language white, the other two at 60 % (Figma draws all
// three white; changed so the active language is visible).
//
// The URL is the only source of the language. Each language is a plain link to
// the same page under the other prefix (/en/sell → /fr/sell). A click:
//   1. stores the choice in the "lang" cookie — read ONLY when someone opens
//      the bare domain "/", never on a prefixed page;
//   2. loads that address as a full page (filters in the query string kept),
//      so the server renders everything fresh in the new language and nothing
//      from the previous language is reused from the client-side cache.
export function LanguageToggle({
  className = "",
  overImage = false,
}: {
  className?: string;
  overImage?: boolean;
}) {
  const { lang } = useLanguage();
  const pathname = usePathname();
  return (
    <div className={`inline-flex items-center gap-[10px] ${className}`} role="group" aria-label="Language">
      {LANGS.map((l) => {
        const active = lang === l.code;
        const href = switchLangPath(pathname, l.code);
        return (
          <a
            key={l.code}
            href={href}
            hrefLang={l.code}
            lang={l.code}
            aria-current={active ? "true" : undefined}
            onClick={(e) => {
              // Let cmd/ctrl-click open a new tab as usual
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              document.cookie = `${LANG_COOKIE}=${l.code}; path=/; max-age=31536000; samesite=lax`;
              if (active) return;
              window.location.assign(href + window.location.search);
            }}
            className={`type-button py-[6px] transition-colors ${
              overImage
                ? active
                  ? "text-white"
                  : "text-white/60 hover:text-white"
                : active
                  ? "text-brand-blue"
                  : "text-muted hover:text-brand-blue"
            }`}
          >
            {l.label}
          </a>
        );
      })}
    </div>
  );
}
