import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_LANG, LANG_COOKIE, isLang } from "@/lib/locale";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // No language in this URL: use the language-switch cookie, else the default (English).
  const cookie = request.cookies.get(LANG_COOKIE)?.value;
  const lang = isLang(cookie) ? cookie : DEFAULT_LANG;
  const asked = searchParams.get("next");
  // Only a page of this site ("/…", never "//other.site")
  const next = asked && asked.startsWith("/") && !asked.startsWith("//") && !asked.startsWith("/\\") ? asked : `/${lang}/mes-favoris`;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/${lang}/login?error=callback`);
}
