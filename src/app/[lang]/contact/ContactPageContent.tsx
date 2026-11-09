"use client";

import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageProvider";
import { InfoBox } from "@/components/ui/SmallParts";

// Figma "09 Contact — Desktop" / "— Mobile" (13:2044):
//   Hero "Get in touch". Content 72px below (mobile 48), 144px padding at the
//   bottom (mobile 96): form column (764) and aside (380), 96px apart; on
//   phones the aside follows the form, 40px below.
//   Aside (13:1963): three Info boxes 48px apart (mobile 36) — Contact
//   information (rows with a champagne icon circle), Office hours,
//   Confidential service. No advisor block (Figma).
export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contactPage;
  return (
    <>
      {/* HERO — Figma "09 Contact" › Hero (2167:1453); photo from Figma for now */}
      <PageHero image="/heroes/contact.jpg" title={t.heroes.contactTitle} subtitle={t.heroes.contactSubtitle} />

      <section className="bg-surface">
        <div className="container-wrap pt-[48px] md:pt-[72px] pb-section grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-y-[40px] lg:gap-x-[64px] xl:gap-x-[96px] items-start">
          {/* The form reads ?subject= / ?property= from the address */}
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>

          <aside className="flex flex-col gap-[36px] md:gap-[48px]">
            <InfoBox title={c.detailsTitle}>
              <InfoRow label={c.phone} icon="phone">
                <a href="tel:+33674750703" className="hover:text-brand-blue transition-colors">
                  +33 6 74 75 07 03
                </a>
              </InfoRow>
              <InfoRow label={t.propertyDetail.email} icon="mail">
                <a href="mailto:marc@ellington-international.com" className="hover:text-brand-blue transition-colors break-all">
                  marc@ellington-international.com
                </a>
              </InfoRow>
              <InfoRow label={t.propertyDetail.location} icon="pin">
                <span className="whitespace-pre-line">{c.address}</span>
              </InfoRow>
            </InfoBox>

            <InfoBox title={c.hoursTitle}>
              <p className="type-small">
                {c.monFri} : {c.monFriHours}
                <br />
                {c.sat} : {c.satHours}
              </p>
            </InfoBox>

            <InfoBox title={c.confidentialTitle}>
              <p className="type-small">{c.confidentialBody}</p>
            </InfoBox>
          </aside>
        </div>
      </section>
    </>
  );
}

// Row: 40px champagne circle with a 20px icon, 14px, label (Caps/Label muted)
// and the value (Text/Small in text/body), 4px apart.
function InfoRow({ label, icon, children }: { label: string; icon: keyof typeof ICONS; children: React.ReactNode }) {
  return (
    <div className="flex gap-[14px] items-start">
      <span className="flex-none size-[40px] rounded-full border border-brand-accent text-brand-accent flex items-center justify-center" aria-hidden>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[icon].map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </span>
      <div className="min-w-0 flex flex-col gap-[4px]">
        <p className="type-label">{label}</p>
        <div className="text-body-text">{children}</div>
      </div>
    </div>
  );
}

// Icons exported from Figma (phone, mail, pin), stroke 1, champagne.
const ICONS = {
  phone: [
    "M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1938 17.2745C18.1008 17.4871 17.9644 17.678 17.7934 17.8349C17.6224 17.9918 17.4205 18.1112 17.2006 18.1856C16.9808 18.2599 16.7478 18.2876 16.5167 18.2667C13.9524 17.988 11.4892 17.1118 9.325 15.7083C7.31152 14.4289 5.60445 12.7218 4.325 10.7083C2.91665 8.53434 2.0402 6.05916 1.76667 3.48333C1.74584 3.25289 1.77323 3.02063 1.84708 2.80135C1.92094 2.58207 2.03964 2.38057 2.19564 2.20968C2.35163 2.03879 2.5415 1.90226 2.75316 1.80877C2.96481 1.71528 3.19362 1.66688 3.425 1.66667H5.925C6.32942 1.66269 6.72149 1.8059 7.02813 2.06961C7.33478 2.33332 7.53506 2.69954 7.59167 3.1C7.69719 3.90006 7.89287 4.68561 8.175 5.44167C8.28712 5.73994 8.31139 6.0641 8.24492 6.37573C8.17846 6.68737 8.02405 6.97343 7.8 7.2L6.74167 8.25833C7.92796 10.3446 9.65538 12.072 11.7417 13.2583L12.8 12.2C13.0266 11.9759 13.3126 11.8215 13.6243 11.7551C13.9359 11.6886 14.2601 11.7129 14.5583 11.825C15.3144 12.1071 16.0999 12.3028 16.9 12.4083C17.3048 12.4654 17.6745 12.6693 17.9388 12.9812C18.2031 13.2932 18.3435 13.6913 18.3333 14.1Z",
  ],
  mail: [
    "M3.33333 3.33333H16.6667C17.5871 3.33333 18.3333 4.07953 18.3333 5V15C18.3333 15.9205 17.5871 16.6667 16.6667 16.6667H3.33333C2.41286 16.6667 1.66667 15.9205 1.66667 15V5C1.66667 4.07953 2.41286 3.33333 3.33333 3.33333Z",
    "M18.3333 5.83333L10.8583 10.5833C10.6011 10.7445 10.3036 10.83 10 10.83C9.6964 10.83 9.39894 10.7445 9.14167 10.5833L1.66667 5.83333",
  ],
  pin: [
    "M16.6667 8.33333C16.6667 12.4942 12.0508 16.8275 10.5008 18.1658C10.3564 18.2744 10.1807 18.3331 10 18.3331C9.81933 18.3331 9.64356 18.2744 9.49917 18.1658C7.94917 16.8275 3.33333 12.4942 3.33333 8.33333C3.33333 6.56522 4.03571 4.86953 5.28595 3.61929C6.5362 2.36905 8.23189 1.66667 10 1.66667C11.7681 1.66667 13.4638 2.36905 14.714 3.61929C15.9643 4.86953 16.6667 6.56522 16.6667 8.33333Z",
    "M12.5 8.33333C12.5 9.71405 11.3807 10.8333 10 10.8333C8.61929 10.8333 7.5 9.71405 7.5 8.33333C7.5 6.95262 8.61929 5.83333 10 5.83333C11.3807 5.83333 12.5 6.95262 12.5 8.33333Z",
  ],
};
