"use client";

import { createContext, useContext } from "react";
import { dict, type Dict, type Lang } from "@/lib/i18n";

// The language comes from the URL (/en/, /fr/, /nl/): the [lang] layout passes
// it in, so the server HTML and the browser always render the same language
// (no flash, no hydration mismatch). Switching language = going to the same
// page under another prefix (see LanguageToggle).
interface Ctx {
  lang: Lang;
  t: Dict;
}

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LanguageContext.Provider value={{ lang, t: dict[lang] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  // Every page is inside the provider; this fallback only guards stray use.
  return ctx ?? { lang: "fr", t: dict.fr };
}
