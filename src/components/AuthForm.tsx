"use client";

import { useActionState, useState } from "react";
import { login, signup, type AuthState } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/Button";
import { TextLink } from "./ui/TextLink";
import { inputCls } from "./ui/input";

type Mode = "login" | "signup";

export function AuthForm({ mode, signupSuccess, next }: { mode: Mode; signupSuccess?: boolean; next?: string }) {
  const { lang, t } = useLanguage();
  const a = t.auth;
  // Where to go after logging in (the server action checks it is a page of this site)
  const after = next ?? `/${lang}/mes-favoris`;
  const action = mode === "login" ? login : signup;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, null);
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [oauthPending, setOauthPending] = useState(false);

  const isLogin = mode === "login";

  async function signInWithGoogle() {
    setOauthError(null);
    setOauthPending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(after)}`,
        queryParams: { prompt: "select_account" },
      },
    });
    // On success the browser redirects to Google; we only get here on error.
    if (error) {
      setOauthError(a.googleError);
      setOauthPending(false);
    }
  }

  const errorText = state?.code ? a[state.code] : state?.error;

  // Not in Figma (step 23): restyled with the Figma tokens — H2 title,
  // Text/Body subtitle, Outline button for Google, Figma inputs, Primary
  // submit, Link component for the switch between login and signup.
  return (
    <section className="bg-surface pt-nav">
      <div className="container-wrap section-y">
        <div className="max-w-[440px] mx-auto">
          <div className="flex flex-col gap-[20px] md:gap-[24px] text-center">
            <h1 className="type-h2">{isLogin ? a.loginTitle : a.signupTitle}</h1>
            <p className="type-body">{isLogin ? a.loginSubtitle : a.signupSubtitle}</p>
          </div>

          {signupSuccess && (
            <p className="mt-[40px] border-t border-brand-accent pt-[16px] type-small text-brand-blue" role="status">
              {a.signupSuccess}
            </p>
          )}

          <Button variant="outline" onClick={signInWithGoogle} disabled={oauthPending} className="w-full mt-[40px] gap-[12px]">
            <GoogleIcon />
            {oauthPending ? a.googleRedirect : a.google}
          </Button>
          {oauthError && (
            <p className="type-small text-[#b42318] mt-[12px] text-center" role="alert">
              {oauthError}
            </p>
          )}

          <div className="flex items-center gap-[16px] my-[28px] type-label" aria-hidden>
            <span className="flex-1 h-px bg-hairline" />
            {a.or}
            <span className="flex-1 h-px bg-hairline" />
          </div>

          <form action={formAction} className="flex flex-col gap-[20px]">
            <input type="hidden" name="lang" value={lang} />
            <input type="hidden" name="next" value={after} />
            <label className="flex flex-col gap-[8px]">
              <span className="type-label text-brand-blue">{a.email}</span>
              <input name="email" type="email" required autoComplete="email" className={inputCls} />
            </label>
            <label className="flex flex-col gap-[8px]">
              <span className="type-label text-brand-blue">{a.password}</span>
              <input
                name="password"
                type="password"
                required
                minLength={isLogin ? undefined : 8}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className={inputCls}
              />
              {!isLogin && <span className="type-small">{a.passwordHint}</span>}
            </label>

            {errorText && (
              <p className="type-small text-[#b42318]" role="alert">
                {errorText}
              </p>
            )}

            <Button type="submit" variant="primary" disabled={pending} className="w-full mt-[8px]">
              {pending ? "…" : isLogin ? a.loginBtn : a.signupBtn}
            </Button>
          </form>

          <p className="type-small text-center mt-[32px] flex flex-wrap justify-center items-baseline gap-x-[8px]">
            {isLogin ? a.noAccount : a.haveAccount}
            <TextLink href={isLogin ? "/signup" : "/login"}>{isLogin ? a.signupTitle : a.loginBtn}</TextLink>
          </p>
        </div>
      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 110-24c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 1024 44c11 0 20-9 20-20 0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8A12 12 0 0124 12c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 006.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0124 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3a12 12 0 01-4.1 5.6l6.2 5.2C39.9 41.6 44 38 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}
