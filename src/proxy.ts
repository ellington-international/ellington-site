import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { DEFAULT_LANG, LANG_COOKIE, LEGACY_LANG, isLang } from "@/lib/locale";
import type { Lang } from "@/lib/i18n";

// Language in the URL (redesign step 12, REDESIGN-PLAN.md §5):
//   /                      → /en, or /fr / /nl for French / Dutch visitors (307)
//   /properties, /sell, …  → /fr/properties, /fr/sell, … (old French URLs, 301)
//   /en/blog/<slug>, /nl/… → /fr/blog/<slug> (articles are French-only, 301)
//   /en/…, /fr/…, /nl/…    → unchanged
// Static files (anything with an extension), /_next and /auth/… are never
// redirected. Afterwards the Supabase session is refreshed as before.
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (!pathname.startsWith("/auth/")) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = `/${chooseLang(request)}`;
      const res = NextResponse.redirect(url, 307);
      // The answer depends on the visitor: caches must not share it.
      res.headers.set("Vary", "Accept-Language, Cookie");
      res.headers.set("Cache-Control", "private, no-store");
      return res;
    }

    if (!isLang(first)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${LEGACY_LANG}${pathname}`;
      url.search = search;
      return NextResponse.redirect(url, 301);
    }

    const article = pathname.match(/^\/(en|nl)(\/blog\/[^/]+)\/?$/);
    if (article) {
      const url = request.nextUrl.clone();
      url.pathname = `/fr${article[2]}`;
      return NextResponse.redirect(url, 301);
    }
  }

  return await updateSession(request);
}

/** Bare domain: the language-switch cookie first, then the browser languages. */
function chooseLang(request: NextRequest): Lang {
  const cookie = request.cookies.get(LANG_COOKIE)?.value;
  if (isLang(cookie)) return cookie;

  // Accept-Language, e.g. "nl-BE,nl;q=0.9,en;q=0.8": highest q first; the
  // first of our languages wins.
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.trim().toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1, i };
    })
    .filter((x) => x.base && x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { base } of ranked) if (isLang(base)) return base;
  return DEFAULT_LANG;
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
