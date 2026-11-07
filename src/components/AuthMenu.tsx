"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "./LanguageProvider";

interface Props {
  overImage?: boolean;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function AuthMenu({ overImage = false, variant = "desktop", onNavigate }: Props) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setAuthed(Boolean(data.user)));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(Boolean(session?.user));
    });
    return () => sub.subscription.unsubscribe();
  }, [pathname]);

  // Desktop : avoid layout shift on first paint
  if (authed === null) {
    return variant === "desktop" ? <span className="w-[80px]" aria-hidden /> : null;
  }

  // Figma Navigation › "Login" (7:26 / 7:62): Caps/Button, white over a photo,
  // brand/blue on the solid nav. Same style in the mobile menu.
  const desktopCls = `type-button nav-link ${overImage ? "text-white" : "text-brand-blue"}`;

  const mobileCls = "type-button nav-link text-brand-blue";

  const cls = variant === "desktop" ? desktopCls : mobileCls;

  return authed ? (
    <Link
      href="/mes-favoris"
      className={cls}
      aria-label={t.nav.favorites}
      onClick={onNavigate}
    >
      <span className="inline-flex items-center gap-2">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
          <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.65 12 21 12 21z" />
        </svg>
        {t.nav.favorites}
      </span>
    </Link>
  ) : (
    <Link href="/login" className={cls} onClick={onNavigate}>
      {t.nav.login}
    </Link>
  );
}
