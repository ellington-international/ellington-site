"use client";

import Link from "@/components/LocaleLink";
import { useActionState, useState } from "react";
import { login, signup, type AuthState } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "./LanguageProvider";

type Mode = "login" | "signup";

export function AuthForm({ mode, signupSuccess, next }: { mode: Mode; signupSuccess?: boolean; next?: string }) {
  const { lang } = useLanguage();
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
      setOauthError(
        "La connexion Google n'est pas encore disponible. Réessayez plus tard.",
      );
      setOauthPending(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24 md:py-32">
      <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3 text-center">
        {isLogin ? "Connexion" : "Créer un compte"}
      </h1>
      <p className="text-sm text-muted text-center mb-10 tracking-[0.05em]">
        {isLogin
          ? "Accédez à votre sélection de biens favoris."
          : "Sauvegardez les biens qui vous inspirent."}
      </p>

      {signupSuccess && (
        <div className="mb-6 p-4 border border-accent/30 bg-accent/5 text-sm text-foreground">
          Compte créé. Vérifiez votre boîte mail pour confirmer votre adresse, puis connectez-vous.
        </div>
      )}

      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={oauthPending}
        className="w-full flex items-center justify-center gap-3 border border-[var(--border-strong)] px-5 py-3.5 text-[13px] tracking-[0.06em] text-foreground hover:border-accent transition disabled:opacity-50"
      >
        <GoogleIcon />
        {oauthPending ? "Redirection…" : "Continuer avec Google"}
      </button>

      {oauthError && (
        <p className="text-sm text-red-600 mt-3 text-center">{oauthError}</p>
      )}

      <div className="flex items-center gap-4 my-7 text-[10px] uppercase tracking-[0.22em] text-muted">
        <span className="flex-1 h-px bg-[var(--border)]" />
        ou
        <span className="flex-1 h-px bg-[var(--border)]" />
      </div>

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="next" value={after} />
        <div>
          <label htmlFor="email" className="block text-[11px] tracking-[0.22em] uppercase text-muted-strong mb-2">
            Adresse email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] focus:border-accent focus:outline-none text-foreground"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-[11px] tracking-[0.22em] uppercase text-muted-strong mb-2">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={isLogin ? undefined : 8}
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] focus:border-accent focus:outline-none text-foreground"
          />
          {!isLogin && (
            <p className="text-xs text-muted mt-2">8 caractères minimum.</p>
          )}
        </div>

        {state?.error && (
          <p className="text-sm text-red-600 border border-red-200 bg-red-50 px-4 py-3">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full text-[13px] tracking-[0.18em] uppercase px-5 py-3.5 bg-accent text-white hover:bg-accent-hover transition disabled:opacity-50"
        >
          {pending
            ? "..."
            : isLogin
            ? "Se connecter"
            : "Créer mon compte"}
        </button>
      </form>

      <p className="text-sm text-muted text-center mt-8">
        {isLogin ? (
          <>
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-accent hover:underline">
              Créer un compte
            </Link>
          </>
        ) : (
          <>
            Déjà inscrit ?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Se connecter
            </Link>
          </>
        )}
      </p>
    </div>
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
