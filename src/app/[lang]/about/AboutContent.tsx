"use client";

import Image from "next/image";
import { GolfeBand } from "@/components/ui/GolfeBand";
import { reveal, revealFade } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageProvider";
import { Stat } from "@/components/ui/SmallParts";
import { Band } from "@/components/ui/Band";
import { ButtonLink } from "@/components/ui/Button";
import { cardGridCls } from "@/components/ui/card";

// Figma "07 About — Desktop" (13:2) / "— Mobile" (13:171).
// Section rhythm (Figma, client change): Intro white · Our story light blue
// (surface/light) · What we stand for white · Golfe graphic · The team. Each
// coloured section has its own 144px (mobile 96) top and bottom padding.
// The mobile frame still shows Our story white; the client asked for the
// light blue on mobile too.

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.aboutPage;
  const [first, ...moreStory] = a.story;

  return (
    <>
      {/* HERO (13:3) — client photo */}
      <PageHero image="/heroes/about.jpg" title={t.heroes.aboutTitle} subtitle={t.heroes.aboutSubtitle} />

      {/* INTRO + KEY FIGURES (13:7): H2 + subtitle (max 640), four Stats 72px
          below (mobile 48), 4 columns (mobile 2 × 2) */}
      <section className="bg-surface">
        <div className="container-wrap section-y">
          <div className="max-w-[640px] flex flex-col gap-[20px] md:gap-[24px]">
            <h2 className="type-h2" {...reveal}>{a.introTitle}</h2>
            <p className="type-subtitle" {...reveal}>{a.introSubtitle}</p>
          </div>
          <div className="mt-[48px] md:mt-[72px] grid grid-cols-2 lg:grid-cols-4 gap-x-[20px] md:gap-x-[32px] gap-y-[24px]">
            {a.stats.map((s) => (
              <Stat key={s.label} figure={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY (2158:1500): big "2023" (Cormorant Bold Italic 180 /
          mobile 110, champagne) + "Our story" and subtitle; then a centred
          640px column: first paragraph with a drop-cap E (96 / 72px), the
          portrait photo (right-aligned, 80px from the edge; mobile full width),
          then two paragraphs, 56px apart (mobile 40). Light blue background
          (surface/light), section padding 144 / 96 top and bottom. */}
      <section className="bg-surface-light">
        <div className="container-wrap section-y">
          <div className="flex flex-col md:flex-row md:items-center gap-[16px] md:gap-[48px]">
            <p className="font-serif font-bold italic text-[110px] md:text-[180px] leading-[0.9] text-brand-accent" aria-hidden {...reveal}>
              2023
            </p>
            <div className="max-w-[520px] flex flex-col gap-[12px]">
              <h2 className="type-eyebrow" {...reveal}>{a.storyEyebrow}</h2>
              <p className="type-subtitle" {...reveal}>{a.storySubtitle}</p>
            </div>
          </div>
          <div className="mt-[48px] md:mt-[72px] flex flex-col items-center gap-[40px] md:gap-[56px]">
            <p className="w-full max-w-[640px] flex items-start gap-[14px] type-body" {...reveal}>
              <span className="font-serif font-medium italic text-[72px] md:text-[96px] leading-[0.8] text-brand-blue shrink-0" aria-hidden>
                {first.charAt(0)}
              </span>
              <span>
                <span className="sr-only">{first.charAt(0)}</span>
                {first.slice(1)}
              </span>
            </p>
            <div className="w-full flex justify-end md:pr-[80px]">
              <div className="relative w-full md:w-[460px] aspect-[334/400] md:aspect-[460/560]" {...reveal}>
                <Image src="/about/story.jpg" alt={a.storyAlt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
              </div>
            </div>
            {moreStory.map((p) => (
              <p key={p.slice(0, 24)} className="w-full max-w-[640px] type-body" {...reveal}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE STAND FOR (2158:1514): eyebrow, three rows with hairlines:
          the word in H1 italic left, text (max 380) right-aligned; mobile
          word above the text, 12px apart. White again after the light blue
          Our story, so it has its own top padding (144 / 96). */}
      <section className="bg-surface">
        <div className="container-wrap section-y">
          <h2 className="type-eyebrow" {...reveal}>
            {a.valuesEyebrow}
          </h2>
          <ul className="mt-[40px] md:mt-[56px] border-b border-hairline">
            {a.values.map((v) => (
              <li
                key={v.title}
                className="border-t border-hairline py-[28px] md:py-[40px] flex flex-col md:flex-row md:items-center md:justify-between gap-[12px] md:gap-[40px]"
                {...reveal}
              >
                <h3 className="type-h1">{v.title}</h3>
                <p className="type-body md:text-right md:max-w-[380px]">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GOLFE GRAPHIC BAND (2342:4737 / mobile 2345:2344, client change:
          replaces the village photo strip). Full-bleed graphic straight after
          "What we stand for" (its 144 / 96 bottom padding above), the blue
          crest on the white sea at the lower right: 211px wide from 68.75 %
          (990/1440), top at 65.1 % (521/800); mobile 80px wide from 65.9 %
          (257/390), top at 59 % (128/217). "The team" follows with its normal
          section padding (no extra space below the graphic). */}
      {/* Reveal: the graphic fades in (900ms, no movement), the crest
          fades in 200ms after it. */}
      <section className="bg-surface">
        <GolfeBand crop="about">
          {/* eslint-disable-next-line @next/next/no-img-element -- static brand SVG */}
          <img
            src="/brand/crest-blue.svg"
            alt=""
            aria-hidden
            {...revealFade}
            className="absolute h-auto [--reveal-delay:200ms] w-[80px] md:w-[14.65%] md:max-w-[211px] left-[65.9%] top-[59%] md:left-[68.75%] md:top-[65.1%]"
          />
        </GolfeBand>
      </section>

      {/* THE TEAM (13:63): H2, cards 56px below (mobile 40): photo 4:5,
          30px, name (H3), role (Caps/Eyebrow), bio — 10px apart. Photo 4:5
          (mobile 334 × 438, as in Figma). */}
      <section className="bg-surface">
        <div className="container-wrap section-y">
          <h2 className="type-h2" {...reveal}>
            {a.teamTitle}
          </h2>
          <div className={`${cardGridCls} mt-[40px] md:mt-[56px]`}>
            {a.team.map((m) => (
              <article key={m.name} className="flex flex-col gap-[10px]">
                <div className="relative aspect-[334/438] md:aspect-[4/5] overflow-hidden bg-surface-light">
                  <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <h3 className="type-h3 mt-[20px]">{m.name}</h3>
                <p className="type-eyebrow">{m.role}</p>
                <p className="type-body">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING BAND (light blue) (13:88): Primary + Outline */}
      <Band variant="light" title={a.ctaTitle} subtitle={a.ctaBody}>
        <ButtonLink href="/properties" variant="primary">
          {a.ctaPrimary}
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          {t.common.contactUs}
        </ButtonLink>
      </Band>
    </>
  );
}
