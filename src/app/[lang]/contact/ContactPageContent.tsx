"use client";

import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <>
    {/* HERO — Figma "09 Contact" › Hero (2167:1453); photo from Figma for now */}
    <PageHero image="/heroes/contact.jpg" title={t.heroes.contactTitle} subtitle={t.heroes.contactSubtitle} />
    {/* Figma "09 Contact" › Content starts 72px below the hero (mobile 48) */}
    <div className="pt-[48px] md:pt-[72px] pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <aside className="space-y-6">
            {/* Contact information — white card */}
            <div className="bg-[var(--background-card)] border border-[var(--border)] p-8">
              <h3 className="type-h4 mb-7">{t.contactPage.detailsTitle}</h3>
              <div className="space-y-6 text-sm">
                <InfoRow label={t.contactPage.phone} icon="phone">
                  <a href="tel:+33674750703" className="hover:text-link transition">
                    +33 6 74 75 07 03
                  </a>
                </InfoRow>
                <InfoRow label={t.propertyDetail.email} icon="mail">
                  <a
                    href="mailto:marc@ellington-international.com"
                    className="hover:text-link transition break-all"
                  >
                    marc@ellington-international.com
                  </a>
                </InfoRow>
                <InfoRow label={t.propertyDetail.location} icon="pin">
                  <span className="whitespace-pre-line leading-relaxed">
                    {t.contactPage.address}
                  </span>
                </InfoRow>
              </div>
            </div>

            {/* Office hours — white card */}
            <div className="bg-[var(--background-card)] border border-[var(--border)] p-8">
              <h3 className="type-h4 mb-6">{t.contactPage.hoursTitle}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  {t.contactPage.monFri} : {t.contactPage.monFriHours}
                </li>
                <li>
                  {t.contactPage.sat} : {t.contactPage.satHours}
                </li>
              </ul>
            </div>

            {/* Confidential service — blue card (no border) */}
            <div className="bg-[var(--panel)] p-8">
              <h3 className="type-h4 mb-3">
                {t.contactPage.confidentialTitle}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {t.contactPage.confidentialBody}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}

function InfoRow({
  label,
  icon,
  children,
}: {
  label: string;
  icon: "phone" | "mail" | "pin";
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-none w-10 h-10 bg-[var(--panel)] text-accent flex items-center justify-center">
        <InfoIcon name={icon} />
      </div>
      <div>
        <p className="text-[10px] tracking-[0.22em] uppercase text-accent mb-1">
          {label}
        </p>
        <div className="text-foreground/90">{children}</div>
      </div>
    </div>
  );
}

function InfoIcon({ name }: { name: "phone" | "mail" | "pin" }) {
  const p = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  };
  if (name === "phone")
    return (
      <svg {...p}>
        <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
      </svg>
    );
  if (name === "mail")
    return (
      <svg {...p}>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M12 2c-3.5 0-6 2.5-6 6 0 4 6 12 6 12s6-8 6-12c0-3.5-2.5-6-6-6z" />
      <circle cx="12" cy="8" r="2" />
    </svg>
  );
}
