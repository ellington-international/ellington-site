"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/Button";

// Figma "10 Overlay — Thank you" (request 2196:2430 / newsletter 2196:2446,
// mobile 2196:4716 / 2196:4732). Dark veil rgba(10,30,50,.45); white card
// 480px (mobile: screen − 2 × 24), padding 64 × 56 (mobile 48 × 28), soft
// shadow; champagne circle with check, eyebrow in brand/accent, "Thank you"
// in H2, message in Text/Body, Primary "Close".
// Closes with Close, Esc, or a click / tap on the veil. While open: page
// scroll locked, focus kept inside the card, focus returned afterwards.
// Rendered in a portal on <body> so it sits above the header and menu.

const subscribe = () => () => {};

export function ThankYouOverlay({
  open,
  variant,
  onClose,
}: {
  open: boolean;
  variant: "request" | "newsletter";
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const id = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Latest onClose without re-running the open/close effect on every render
  // (callers usually pass an inline function).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  // document.body only exists in the browser
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
      }
      if (e.key === "Tab") {
        // Focus trap: cycle through the focusable elements in the card
        const items = cardRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!items || items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [open]);

  if (!open || !isClient) return null;

  const eyebrow = variant === "request" ? t.thankYou.requestEyebrow : t.thankYou.newsletterEyebrow;
  const text = variant === "request" ? t.thankYou.requestText : t.thankYou.newsletterText;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-[24px] bg-[rgba(10,30,50,0.45)] animate-[fadeIn_0.25s_ease-out]"
      // Click / tap on the veil (outside the card) closes
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-text`}
        className="w-full max-w-[480px] bg-surface shadow-[0_24px_60px_rgba(10,30,50,0.18)] px-[28px] py-[48px] md:px-[56px] md:py-[64px] flex flex-col items-center text-center gap-[20px] md:gap-[24px]"
      >
        <span className="size-[56px] rounded-full border border-brand-accent flex items-center justify-center mb-[4px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- 24px static icon from Figma */}
          <img src="/ui/icons/check.svg" alt="" width={24} height={24} />
        </span>
        <p className="type-eyebrow text-brand-accent">{eyebrow}</p>
        <h2 id={`${id}-title`} className="type-h2">
          {t.thankYou.title}
        </h2>
        <p id={`${id}-text`} className="type-body">
          {text}
        </p>
        <Button ref={closeRef} variant="primary" className="mt-[12px]" onClick={onClose}>
          {t.nav.close}
        </Button>
      </div>
    </div>,
    document.body,
  );
}
