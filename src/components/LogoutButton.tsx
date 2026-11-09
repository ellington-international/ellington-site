"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/auth";
import { useLanguage } from "./LanguageProvider";
import { textLinkClasses } from "./ui/TextLink";

// Styled as the Figma "Link" component (text link with underline).
export function LogoutButton() {
  const [pending, startTransition] = useTransition();
  const { lang, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => logout(lang))}
      disabled={pending}
      className={textLinkClasses({ className: "disabled:opacity-50" })}
    >
      {pending ? "…" : t.favoritesPage.logout}
    </button>
  );
}
