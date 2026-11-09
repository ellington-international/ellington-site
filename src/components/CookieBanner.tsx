"use client";

import Link from "@/components/LocaleLink";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/Button";
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

  // Not in Figma (step 23): white panel with a hairline border (kept
  // floating with a soft shadow), H3 title, Text/Small text,
  // inline underlined link (as on Contact), Primary / Outline buttons, Caps/Label toggle for the details.
  return (
    <div role="dialog" aria-label={t.cookies.title} aria-modal="false" className="fixed bottom-0 inset-x-0 z-[60] p-[16px] md:p-[24px] pointer-events-none">
      <div className="max-w-[1100px] mx-auto pointer-events-auto bg-surface border border-hairline shadow-[0_12px_40px_rgba(21,65,102,0.12)]">
        <div className="p-[24px] md:p-[32px]">
          <div className="flex flex-col lg:flex-row lg:items-start gap-[24px] lg:gap-[40px]">
            <div className="flex-1 flex flex-col gap-[12px]">
              <h2 className="type-h3">{t.cookies.title}</h2>
              <p className="type-small max-w-[720px]">
                {t.cookies.description}{" "}
                <Link href="/privacy" className="text-brand-blue underline decoration-hairline underline-offset-[0.2em] hover:decoration-brand-accent transition-colors">
                  {t.cookies.learnMore}
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-[8px] shrink-0 lg:min-w-[200px]">
              <Button variant="primary" onClick={acceptAll}>
                {t.cookies.acceptAll}
              </Button>
              <Button variant="outline" onClick={refuseAll}>
                {t.cookies.refuse}
              </Button>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="type-label py-[8px] hover:text-brand-blue transition-colors"
                aria-expanded={expanded}
              >
                {t.cookies.customize} {expanded ? "−" : "+"}
              </button>
            </div>
          </div>

          {expanded && (
            <div className="mt-[28px] pt-[24px] border-t border-hairline flex flex-col gap-[20px]">
              <CategoryRow label={t.cookies.essentialLabel} desc={t.cookies.essentialDesc} checked disabled />
              <CategoryRow label={t.cookies.analyticsLabel} desc={t.cookies.analyticsDesc} checked={analytics} onChange={setAnalytics} />
              <CategoryRow label={t.cookies.marketingLabel} desc={t.cookies.marketingDesc} checked={marketing} onChange={setMarketing} />
              <div className="pt-[8px] flex justify-end">
                <Button variant="primary" onClick={saveCustom}>
                  {t.cookies.save}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Square switch (no round shapes): hairline track, brand/blue when on.
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
    <div className="flex items-start gap-[16px]">
      <div className="flex-1 flex flex-col gap-[4px]">
        <p className="type-label text-brand-blue">{label}</p>
        <p className="type-small">{desc}</p>
      </div>
      <label className={`relative inline-flex items-center shrink-0 mt-[2px] ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>
        <input type="checkbox" className="sr-only peer" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} aria-label={label} />
        <span className="w-[40px] h-[20px] bg-hairline peer-checked:bg-brand-blue peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-blue transition-colors relative">
          <span className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white transition-transform ${checked ? "translate-x-[20px]" : ""}`} />
        </span>
      </label>
    </div>
  );
}
