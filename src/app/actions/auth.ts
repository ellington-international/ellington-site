"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { LEGACY_LANG, isLang } from "@/lib/locale";
import type { Lang } from "@/lib/i18n";

// Language of the page the form was sent from (hidden "lang" field).
function formLang(formData: FormData): Lang {
  const l = formData.get("lang");
  return isLang(l) ? l : LEGACY_LANG;
}

// Only follow "next" to a page of this site ("/…", never "//other.site").
function safeNext(value: unknown, fallback: string): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\")
    ? value
    : fallback;
}

export type AuthState = { error?: string } | null;

// Absolute site URL for the email-confirmation link. Prefers NEXT_PUBLIC_SITE_URL
// but falls back to the incoming request host, so confirmation links work on
// prod/preview even when the env var isn't set.
async function getSiteUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : "";
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  const lang = formLang(formData);
  redirect(safeNext(formData.get("next"), `/${lang}/mes-favoris`));
}

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (password.length < 8) {
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${await getSiteUrl()}/auth/callback?next=/${formLang(formData)}/mes-favoris`,
    },
  });
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect(`/${formLang(formData)}/login?signup=success`);
}

export async function logout(lang: Lang = LEGACY_LANG) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(`/${isLang(lang) ? lang : LEGACY_LANG}`);
}
