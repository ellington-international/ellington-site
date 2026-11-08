"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/auth";
import { useLanguage } from "./LanguageProvider";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();
  const { lang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => logout(lang))}
      disabled={pending}
      className="self-start text-[11px] tracking-[0.22em] uppercase text-muted-strong hover:text-link transition disabled:opacity-50"
    >
      {pending ? "..." : "Se déconnecter"}
    </button>
  );
}
