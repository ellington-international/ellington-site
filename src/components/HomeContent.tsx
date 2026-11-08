"use client";

import Image from "next/image";
import Link from "@/components/LocaleLink";
import { PropertyCard } from "@/components/PropertyCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroSearch } from "@/components/HeroSearch";
import { BlogCard } from "@/components/BlogCard";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { cardGridCls } from "@/components/ui/card";
import type { Property } from "@/lib/types";
import type { BlogCategory, Post } from "@/lib/blog-shared";

// Figma "01 Home — Desktop" (9:2) / "01 Home — Mobile" (9:268):
// Hero + search · The Ellington standard · Featured properties ·
// Our signature · Journal + Browse by category · Newsletter.

const CATEGORIES_ORDER: BlogCategory[] = ["guides-achat", "marche", "architecture", "art-de-vivre", "fiscalite"];
const POINT_ICONS = ["/ui/icons/chat.svg", "/ui/icons/pin.svg", "/ui/icons/globe.svg"];

export function HomeContent({
  posts,
  featured,
  cities,
}: {
  posts: Post[];
  featured: Property[];
  cities: string[];
}) {
  const { t } = useLanguage();
  const h = t.home;
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      {/* HERO (9:3 / 9:269): photo with a flat 30 % black overlay, 820px high
          (mobile 760). Title H1, subtitle, the four search fields, Search link,
          Scroll cue at the bottom. No overflow-hidden on the section: an open
          dropdown may reach below the hero, so the photo clips itself. */}
      <section className="relative min-h-[760px] md:min-h-[820px] flex flex-col items-center justify-center gap-[24px] pt-nav md:pb-[110px] on-photo">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <Image
            src="/home/hero-home.jpg"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 container-wrap flex flex-col items-center gap-[24px] text-center">
          <h1 className="type-h1">{h.title}</h1>
          <p className="type-subtitle max-w-[640px]">{h.subtitle}</p>
          {/* Figma spacer 10px (+ the 24px gaps) */}
          <div className="h-[10px]" aria-hidden />
          <HeroSearch cities={cities} />
        </div>

        {/* Home mobile frame: 21px from the bottom (inner pages: 104) */}
        <ScrollCue href="#ellington-standard" label={h.scroll} className="bottom-[21px] md:bottom-[32px]" />
      </section>

      {/* THE ELLINGTON STANDARD (2158:1457 / 2158:2911): eyebrow, statement in
          H1, three points (56px champagne circle with icon, H3, Text/Small),
          "Sell with us →". 64px apart (mobile 40); points 64 apart in a row
          (mobile stacked, 32 apart). */}
      <section id="ellington-standard" className="bg-surface scroll-mt-nav">
        <div className="container-wrap section-y flex flex-col items-start gap-[40px] md:gap-[64px]">
          <p className="type-eyebrow">{h.whyEyebrow}</p>
          <h2 className="type-h1 max-w-[1000px]">{h.whyStatement}</h2>
          <ul className="w-full grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[64px]">
            {h.points.map((p, i) => (
              <li key={p.title} className="flex flex-col items-start gap-[10px]">
                <span className="size-[56px] rounded-full border border-brand-accent flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element -- 28px static icon from Figma */}
                  <img src={POINT_ICONS[i]} alt="" width={28} height={28} />
                </span>
                <h3 className="type-h3">{p.title}</h3>
                <p className="type-small text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
          <TextLink href="/sell">{h.whyCta}</TextLink>
        </div>
      </section>

      {/* FEATURED PROPERTIES (9:59 / 9:325): hairline on top, head with
          "View entire portfolio →", three cards. Swipe track: one card (86 %)
          with the next peeking on mobile, 2 on tablet, 3 on desktop.
          Head → cards 56px (mobile 40), cards → swipe hint 56 (mobile 40). */}
      <section className="bg-surface border-t border-hairline">
        <div className="container-wrap section-y">
          <SectionHeader
            eyebrow={h.featuredEyebrow}
            title={h.featuredTitle}
            subtitle={h.featuredSubtitle}
            action={<TextLink href="/properties">{h.featuredCta}</TextLink>}
          />
          <div className="relative mt-[40px] md:mt-[56px] -mx-margin px-margin scroll-px-margin flex gap-[20px] md:gap-gap overflow-x-auto snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className="flex-none snap-start w-[86%] md:w-[calc((100%-var(--space-gap))/2)] lg:w-[calc((100%-2*var(--space-gap))/3)]"
              >
                <PropertyCard property={p} priority={i < 3} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 86vw" />
              </div>
            ))}
          </div>
          {/* "relative" on the track: the cards' hidden screen-reader labels are
              positioned against it, so they can't widen the page on phones. */}
          {/* Shown only where there is something to swipe (3 cards fill the
              desktop row). */}
          <p className="type-label text-muted text-center mt-[40px] md:mt-[56px] lg:hidden" aria-hidden>
            {t.common.swipeHint}
          </p>
        </div>
      </section>

      {/* OUR SIGNATURE (2158:1486 / 2158:2940) */}
      <Signature />

      {/* JOURNAL (9:132 / 9:398): head with "View all articles →", three cards,
          "Browse by category" row with a hairline on top. Starts 96px below the
          signature (mobile 64); head → cards and cards → categories 56 (40). */}
      {recentPosts.length > 0 && (
        <section className="bg-surface">
          <div className="container-wrap pt-[64px] md:pt-[96px] pb-section">
            <SectionHeader
              eyebrow={t.journal.eyebrow}
              title={`${t.journal.titleBefore} ${t.journal.titleAccent}`}
              subtitle={t.journal.subtitle}
              action={<TextLink href="/blog">{h.journalCta}</TextLink>}
            />
            <div className={`${cardGridCls} mt-[40px] md:mt-[56px]`}>
              {recentPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
            <nav
              aria-label={h.browseByCategory}
              className="mt-[40px] md:mt-[56px] pt-[28px] border-t border-hairline flex flex-wrap items-center gap-x-[28px] gap-y-[12px]"
            >
              <p className="type-label text-muted">{h.browseByCategory}</p>
              {CATEGORIES_ORDER.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${cat}`}
                  className="type-label text-muted py-[6px] border-b border-transparent hover:text-brand-blue hover:border-hairline transition-colors"
                >
                  {t.journal.categories[cat]}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      )}

      {/* NEWSLETTER (9:180 / 9:446): surface/light, centred stack (max 640),
          form 40px below (mobile 32). Success = thank-you overlay. */}
      <section className="bg-surface-light">
        <div className="container-wrap section-y flex flex-col items-center">
          <SectionHeader
            align="center"
            eyebrow={h.newsletterEyebrow}
            title={h.newsletterTitle}
            subtitle={h.newsletterSubtitle}
          />
          <div className="w-full mt-[32px] md:mt-[40px]">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}

// "Our signature". Desktop (from 1280px, where the Figma composition fits):
// photo 720px high bleeding to the left edge of the screen, text column
// 384px on the right (96px gap), white quote box (560px, padding 40 × 48,
// quote in H2 italic) overlapping the photo's bottom by 140px, 460px into
// the content area. Below 1280px (Figma mobile): photo full width 460px high,
// quote box overlapping its bottom by 90px (padding 28), text 75px below.
function Signature() {
  const { t } = useLanguage();
  const h = t.home;
  const text = (
    <>
      <p className="type-eyebrow">{h.signatureEyebrow}</p>
      <h2 className="type-h2">{h.signatureTitle}</h2>
      <p className="type-subtitle">{h.signatureLead}</p>
      <p className="type-body">{h.signatureText}</p>
      <div className="h-[8px]" aria-hidden />
      <TextLink href="/about" className="self-start">
        {h.signatureCta}
      </TextLink>
    </>
  );
  const photo = (
    <Image src="/home/signature.jpg" alt={h.signatureAlt} fill sizes="(min-width: 1280px) 60vw, 100vw" className="object-cover" />
  );

  return (
    <section className="bg-surface">
      {/* Mobile / tablet */}
      <div className="xl:hidden">
        <div className="relative h-[460px] md:h-[560px]">{photo}</div>
        <div className="container-wrap">
          <blockquote className="relative z-10 -mt-[90px] bg-surface p-[28px]">
            <p className="type-h2">{h.signatureQuote}</p>
          </blockquote>
          <div className="mt-[75px] pb-[69px] flex flex-col items-start gap-[20px]">{text}</div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden xl:block relative pt-[144px] pb-[98px]">
        <div className="absolute left-0 top-[144px] h-[720px] w-[min(calc(100vw-580px),calc(50vw+140px))]">{photo}</div>
        <div className="container-wrap relative">
          <div className="min-h-[720px] flex justify-end">
            {/* pb 178 = room for the quote box below the text (580 − 40 − 502 + 140 + 38) */}
            <div className="w-[384px] pt-[40px] pb-[178px] flex flex-col items-start gap-[24px]">{text}</div>
          </div>
          <blockquote className="relative z-10 -mt-[140px] ml-[460px] w-[560px] bg-surface px-[48px] py-[40px]">
            <p className="type-h2">{h.signatureQuote}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
