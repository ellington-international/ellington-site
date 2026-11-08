"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toggleFavorite } from "@/app/actions/favorites";
import { useLanguage } from "./LanguageProvider";

// Not in Figma; styled to fit it (client request): square white box, thin
// brand/blue outline heart, filled brand/blue when saved. Hover: the box
// turns surface/light. No rounded corners, no shadow.
export function FavoriteButton({
  propertyId,
  initialFavored = false,
  variant = "card",
}: {
  propertyId: string;
  initialFavored?: boolean;
  variant?: "card" | "detail";
}) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [favored, setFavored] = useState(initialFavored);
  const [pending, startTransition] = useTransition();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      const res = await toggleFavorite(propertyId);
      if (res.needsAuth) {
        router.push(`/${lang}/login?next=/${lang}/properties/${propertyId}`);
        return;
      }
      if (res.ok) setFavored(res.favored ?? false);
    });
  };

  const size = variant === "detail" ? "size-[44px]" : "size-[36px]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-label={favored ? t.common.removeFavorite : t.common.addFavorite}
      aria-pressed={favored}
      className={`${size} flex items-center justify-center bg-surface text-brand-blue hover:bg-surface-light transition-colors disabled:opacity-60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-brand-blue`}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill={favored ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.65 12 21 12 21z" />
      </svg>
    </button>
  );
}
