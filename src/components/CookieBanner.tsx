"use client";

import Link from "@/components/LocaleLink";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
} from "@/lib/cookie-consent";

export function CookieBanner() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const onOpen = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setExpanded(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  if (!open) return null;

  const acceptAll = () => {
    writeConsent({ analytics: true, marketing: true });
    setOpen(false);
  };
  const refuseAll = () => {
    writeConsent({ analytics: false, marketing: false });
    setOpen(false);
  };
  const saveCustom = () => {
    writeConsent({ analytics, marketing });
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t.cookies.title}
      aria-modal="false"
      className="fixed bottom-0 inset-x-0 z-[60] p-4 md:p-6 pointer-events-none"
    >
      <div className="max-w-[1100px] mx-auto pointer-events-auto bg-[var(--background)] border border-[var(--border)] shadow-xl">
        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <h2 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                {t.cookies.title}
              </h2>
              <p className="text-sm text-muted-strong leading-relaxed max-w-3xl">
                {t.cookies.description}{" "}
                <Link
                  href="/privacy"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {t.cookies.learnMore} →
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 lg:min-w-[200px]">
              <button
                type="button"
                onClick={acceptAll}
                className="text-[12px] tracking-[0.18em] uppercase px-5 py-3 bg-accent text-white hover:bg-accent-hover transition"
              >
                {t.cookies.acceptAll}
              </button>
              <button
                type="button"
                onClick={refuseAll}
                className="text-[12px] tracking-[0.18em] uppercase px-5 py-3 border border-[var(--border-strong)] text-foreground hover:bg-[var(--background-elev)] transition"
              >
                {t.cookies.refuse}
              </button>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-[11px] tracking-[0.18em] uppercase text-muted-strong hover:text-foreground transition py-2"
                aria-expanded={expanded}
              >
                {t.cookies.customize} {expanded ? "▲" : "▼"}
              </button>
            </div>
          </div>

          {expanded && (
            <div className="mt-8 pt-6 border-t border-[var(--border)] space-y-5">
              <CategoryRow
                label={t.cookies.essentialLabel}
                desc={t.cookies.essentialDesc}
                checked
                disabled
              />
              <CategoryRow
                label={t.cookies.analyticsLabel}
                desc={t.cookies.analyticsDesc}
                checked={analytics}
                onChange={setAnalytics}
              />
              <CategoryRow
                label={t.cookies.marketingLabel}
                desc={t.cookies.marketingDesc}
                checked={marketing}
                onChange={setMarketing}
              />

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={saveCustom}
                  className="text-[12px] tracking-[0.18em] uppercase px-6 py-3 bg-accent text-white hover:bg-accent-hover transition"
                >
                  {t.cookies.save}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  label,
  desc,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <p className="text-[13px] tracking-[0.06em] uppercase text-foreground font-medium mb-1">
          {label}
        </p>
        <p className="text-xs text-muted leading-relaxed">{desc}</p>
      </div>
      <label className={`relative inline-flex items-center shrink-0 mt-1 ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span className="w-10 h-5 bg-[var(--border-strong)] peer-checked:bg-accent transition relative">
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white transition-transform ${
              checked ? "translate-x-5" : ""
            }`}
          />
        </span>
      </label>
    </div>
  );
}
