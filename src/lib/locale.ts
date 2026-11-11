// Language-in-the-URL helpers (redesign step 12, REDESIGN-PLAN.md §5).
// Every page lives under /en/, /fr/ or /nl/. Kept free of the dictionary so the
// proxy and server files can import it cheaply.
import type { Lang } from "./i18n";

export const LOCALES: readonly Lang[] = ["en", "fr", "nl"];
/** Default language: the bare domain "/" always redirects here (client decision) */
export const DEFAULT_LANG: Lang = "en";
/** Language that old unprefixed URLs (pre-redesign site) redirect to (301).
 *  English (November 2026): the old site's visible text, as Google rendered it,
 *  was English. Journal articles are the exception: French-only, always /fr. */
export const LEGACY_LANG: Lang = "en";
/** Cookie set by the language switch; read by the auth callback to return the
 *  visitor to their language (no longer used for the "/" redirect) */
export const LANG_COOKIE = "lang";
/** Seasonal rentals page: off for now (client), kept in the code. While off,
 *  /rentals and /<lang>/rentals redirect (307) to the Buy page, and the page is
 *  in no navigation, footer or sitemap. Set to true to switch it back on (and
 *  add the links / sitemap entry again). */
export const RENTALS_ENABLED = false;

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "fr" || value === "nl";
}

/** Blog articles are French-only: /blog/<slug> always lives under /fr. */
const ARTICLE = /^\/blog\/[^/?#]+/;

/**
 * Internal path → the same path in `lang`: "/properties" → "/en/properties",
 * "/" → "/en". Left untouched: external links, anchors, paths that already
 * carry a language, static files (with an extension) and /auth/….
 * Blog articles always go to /fr (French only).
 */
export function localePath(lang: Lang, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const pathOnly = href.split(/[?#]/)[0];
  const first = pathOnly.split("/")[1] ?? "";
  if (isLang(first)) return href;
  if (pathOnly.startsWith("/auth/") || /\.[a-z0-9]+$/i.test(pathOnly)) return href;
  if (ARTICLE.test(href)) return `/fr${href}`;
  if (pathOnly === "/") return `/${lang}${href.slice(1)}`;
  return `/${lang}${href}`;
}

/** "/en/properties/12" → { lang: "en", path: "/properties/12" }; "/en" → path "/" */
export function splitLang(pathname: string): { lang: Lang | null; path: string } {
  const first = pathname.split("/")[1] ?? "";
  if (!isLang(first)) return { lang: null, path: pathname };
  return { lang: first, path: pathname.slice(first.length + 1) || "/" };
}

/**
 * The current page in another language (language switch). A blog article has
 * no EN/NL version, so EN/NL lead to the journal index instead.
 */
export function switchLangPath(pathname: string, target: Lang): string {
  const { path } = splitLang(pathname);
  if (target !== "fr" && ARTICLE.test(path)) return `/${target}/blog`;
  return path === "/" ? `/${target}` : `/${target}${path}`;
}

/** Route param → Lang (the [lang] layout already 404s anything else). */
export function asLang(value: string): Lang {
  return isLang(value) ? value : DEFAULT_LANG;
}
