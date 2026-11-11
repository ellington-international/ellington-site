import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { DEFAULT_LANG, LEGACY_LANG, RENTALS_ENABLED, isLang } from "@/lib/locale";

// Redirects (REDESIGN-PLAN.md §5). Every page lives under /en/, /fr/ or /nl/.
//   /                       → /en (always; visitors switch to FR / NL themselves)       301
//   /properties, /sell, …   → /<LEGACY_LANG>/properties, … (old pre-redesign URLs)    301
//                             (query string kept, e.g. ?city=Grimaud&type=villa)
//   /en/blog/<slug>, /nl/…  → /fr/blog/<slug> (articles are French-only)               301
//   /rentals, /<lang>/rentals → the Buy page of that language, while rentals are off   307
//   any path ending in "/"  → the same path without it, in ONE hop with the rules above
//                             (next.config: skipTrailingSlashRedirect)                 301
//   /en/…, /fr/…, /nl/…     → unchanged
// Static files (anything with an extension) and /_next are never redirected
// (matcher below); /auth/… only loses a trailing slash. Afterwards the
// Supabase session is refreshed as before.
// The full list of old URLs is checked by scripts/check-redirects.mjs.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Trailing slash removed here (Next's own 308 is switched off), so an old
  // "/about/" goes straight to "/fr/about" instead of two hops.
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;
  // A plain URL, not request.nextUrl.clone(): Next's URL object re-adds the
  // trailing slash it saw on the request, which would undo the removal.
  const redirect = (to: string, status: 301 | 307 | 308, keepQuery = true) =>
    NextResponse.redirect(new URL(to + (keepQuery ? request.nextUrl.search : ""), request.url), status);

  if (path.startsWith("/auth/")) {
    // Supabase / Google callback: never moved; 308 keeps the request method.
    if (path !== pathname) return redirect(path, 308);
    return await updateSession(request);
  }

  if (path === "/") return redirect(`/${DEFAULT_LANG}`, 301);

  const segments = path.split("/").filter(Boolean);
  const hasLang = isLang(segments[0]);
  const lang = hasLang ? segments[0] : LEGACY_LANG;
  const rest = "/" + (hasLang ? segments.slice(1) : segments).join("/");

  // Rentals switched off (kept in the code): temporary, to that language's Buy page
  if (!RENTALS_ENABLED && rest === "/rentals") return redirect(`/${lang}/properties`, 307, false);

  // Articles are French-only
  if (hasLang && lang !== "fr" && /^\/blog\/[^/]+$/.test(rest)) return redirect(`/fr${rest}`, 301);

  // Old unprefixed URL → same page under the legacy language
  if (!hasLang) return redirect(`/${LEGACY_LANG}${rest === "/" ? "" : rest}`, 301);

  // Prefixed URL with a trailing slash
  if (path !== pathname) return redirect(path, 301);

  return await updateSession(request);
}

export const config = {
  matcher: [
    // Every path except Next.js internals and files with an extension
    // (/robots.txt, /sitemap.xml, /llms.txt, /favicon.ico, /locations/x.jpg,
    // /brand/…). Note: /locations/… photos share their prefix with the
    // /locations page, so the extension check is what keeps them apart.
    "/((?!_next/|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
