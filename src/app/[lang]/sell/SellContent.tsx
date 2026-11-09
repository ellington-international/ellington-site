"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Band } from "@/components/ui/Band";
import { useLanguage } from "@/components/LanguageProvider";

// Figma "04 Sell — Desktop" (11:1163) / "— Mobile" (11:1291).
const TRUST_ICONS = ["/ui/icons/tag.svg", "/ui/icons/doc.svg", "/ui/icons/lock.svg", "/ui/icons/team.svg"];

export default function SellPage() {
  const { t } = useLanguage();
  const s = t.sellPage;
  return (
    <>
      {/* HERO (11:1164) + white "Request a valuation" link */}
      <PageHero
        image="/heroes/sell.jpg"
        position="20% center"
        crop={{ top: -7.75, left: -17.65, width: 117.65, height: 155.04 }}
        title={t.heroes.sellTitle}
        subtitle={t.heroes.sellSubtitle}
      >
        <TextLink href="/contact?subject=valuation" tone="white">
          {t.heroes.sellCta}
        </TextLink>
      </PageHero>

      {/* WHY ELLINGTON? (11:1170): H2 + subtitle left, three paragraphs right,
          96px apart (two 572px columns); mobile stacked, 40px apart */}
      <section className="bg-surface">
        <div className="container-wrap section-y grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[96px]">
          <div className="flex flex-col gap-[20px] md:gap-[24px]">
            <h2 className="type-h2" {...reveal}>{s.whyTitle}</h2>
            <p className="type-subtitle" {...reveal}>{s.whyLead}</p>
          </div>
          <div className="flex flex-col gap-[16px]">
            {s.whyBody.map((p) => (
              <p key={p.slice(0, 24)} className="type-body" {...reveal}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SELLING PROCESS (11:1180 / 11:1308) */}
      <section className="bg-surface-light">
        <div className="container-wrap section-y">
          <SectionHeader eyebrow={s.methodEyebrow} title={s.processTitle} />
          <Timeline steps={s.steps} label={s.stepLabel} />
        </div>
      </section>

      {/* WHY CLIENTS TRUST US (11:1201 / 11:1329): photo 4:5 left (vertically
          centred), promise list right, 96px apart; mobile photo on top, list
          40px below. Promises: hairline on top (last one also below), 24px
          padding, 48px champagne circle with icon, H3, body, 12px apart. */}
      <section className="bg-surface">
        <div className="container-wrap section-y grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[96px] items-center">
          <div className="relative aspect-[4/5]" {...reveal}>
            <Image src="/sell/trust.jpg" alt={s.trustAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div>
            <div className="flex flex-col gap-[20px] md:gap-[24px] pb-[40px]">
              <p className="type-eyebrow" {...reveal}>{s.trustEyebrow}</p>
              <h2 className="type-h2" {...reveal}>{s.trustTitle}</h2>
            </div>
            <ul>
              {s.trustCards.map((c, i) => (
                <li
                  key={c.title}
                  className={`border-t border-hairline py-[24px] flex flex-col items-start gap-[12px] ${
                    i === s.trustCards.length - 1 ? "border-b" : ""
                  }`}
                  {...reveal}
                >
                  <span className="size-[48px] rounded-full border border-brand-accent flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element -- 24px static icon from Figma */}
                    <img src={TRUST_ICONS[i]} alt="" width={24} height={24} />
                  </span>
                  <h3 className="type-h3">{c.title}</h3>
                  <p className="type-body">{c.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CLOSING BAND (light blue) (11:1221) */}
      <Band variant="light" title={s.ctaTitle} subtitle={s.ctaSubtitle}>
        <TextLink href="/contact?subject=valuation">{s.ctaButton}</TextLink>
      </Band>
    </>
  );
}

// Figma "Timeline" (2215:2477 / mobile 2215:4857).
// Desktop (from 1024px): 4 steps in a row, 32px apart; each = 11px champagne
// dot, 28px, content. A 1px champagne line at 60 % joins the dots (drawn per
// step to the next dot). Mobile: steps stacked 40px apart, dot on the left
// (6px down, level with the label), content 20px to its right, the line runs
// down through the dots. Dots have a 4px surface/light ring that cuts the
// line, as in Figma. Content: "Step 01" (Caps/Eyebrow champagne), H3, body,
// 12px apart.
function Timeline({
  steps,
  label,
}: {
  steps: { title: string; body: string }[];
  label: (n: number) => string;
}) {
  return (
    <ol className="mt-[40px] md:mt-[56px] grid grid-cols-1 lg:grid-cols-4 gap-[40px] lg:gap-[32px]">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={step.title} className="relative flex lg:flex-col gap-[20px] lg:gap-[28px]" {...reveal}>
            {!last && (
              <span
                aria-hidden
                className="absolute bg-brand-accent/60 left-[5px] top-[11.5px] w-px bottom-[-51.5px] lg:left-[5.5px] lg:top-[5px] lg:bottom-auto lg:h-px lg:w-[calc(100%+32px)]"
              />
            )}
            <span aria-hidden className="relative shrink-0 mt-[6px] lg:mt-0 size-[11px] rounded-full bg-brand-accent ring-4 ring-surface-light" />
            <div className="min-w-0 flex flex-col gap-[12px]">
              <p className="type-eyebrow text-brand-accent">{label(i + 1)}</p>
              <h3 className="type-h3">{step.title}</h3>
              <p className="type-body">{step.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
