"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_LANG, isLang } from "@/lib/locale";
import type { Lang } from "@/lib/i18n";

// Language of the page the form was sent from (hidden "lang" field).
function formLang(formData: FormData): Lang {
  const l = formData.get("lang");
  return isLang(l) ? l : DEFAULT_LANG;
}

// Only follow "next" to a page of this site ("/…", never "//other.site").
function safeNext(value: unknown, fallback: string): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\")
    ? value
    : fallback;
}

// `code` is translated by AuthForm (t.auth); `error` is Supabase's own
// message, shown only when there is no translation for it.
export type AuthErrorCode = "passwordShort" | "invalidCredentials" | "alreadyRegistered";
export type AuthState = { code?: AuthErrorCode; error?: string } | null;

function authError(error: { code?: string; message: string }): AuthState {
  if (error.code === "invalid_credentials" || /invalid login credentials/i.test(error.message)) return { code: "invalidCredentials" };
  if (error.code === "user_already_exists" || error.code === "email_exists" || /already registered/i.test(error.message))
    return { code: "alreadyRegistered" };
  return { error: error.message };
}

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
  if (error) return authError(error);

  revalidatePath("/", "layout");
  const lang = formLang(formData);
  redirect(safeNext(formData.get("next"), `/${lang}/mes-favoris`));
}

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (password.length < 8) {
    return { code: "passwordShort" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${await getSiteUrl()}/auth/callback?next=/${formLang(formData)}/mes-favoris`,
    },
  });
  if (error) return authError(error);

  revalidatePath("/", "layout");
  redirect(`/${formLang(formData)}/login?signup=success`);
}

export async function logout(lang: Lang = DEFAULT_LANG) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(`/${isLang(lang) ? lang : DEFAULT_LANG}`);
}
