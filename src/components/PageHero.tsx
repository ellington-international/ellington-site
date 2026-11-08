"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { ScrollCue } from "./ui/ScrollCue";

// Shared photo hero of the inner pages, from the Figma heroes ("Hero (drop
// photo as fill)" on Buy 2136:1547, Sell 11:1164, Locations 11:1406, Village
// 12:3, About 13:3, Journal 2167:1427, Contact 2167:1453, Article 2186:1441;
// mobile e.g. 2136:2967):
//   - 820px high (mobile 760), photo as fill + flat 30 % black overlay
//   - text centred, starting 282px from the top (mobile 272, i.e. below the
//     navigation): optional eyebrow, title, subtitle (max 600), 24px apart;
//     optional actions 30px further down (Sell: "Request a valuation")
//   - title in Heading/H1 (80 / 48); articles use Heading/H2 (56 / 40)
//   - Scroll cue 32px from the bottom (mobile 104, clear of Safari's bar),
//     jumping to the content right after the hero
// Photo crop: by default the photo covers the hero, centred. `crop` repeats
// the Figma desktop crop exactly (the photo's box in % of the hero, as in the
// Figma fill: e.g. Buy is zoomed to 123 % and anchored to the top so the sky
// stays behind the title); `position` is the object-position on phones.
// The header is transparent over it (see Header › hasImageHero).
export type HeroCrop = { top: number; left: number; width: number; height: number };

export function PageHero({
  image,
  imageAlt = "",
  position = "center",
  crop,
  eyebrow,
  title,
  subtitle,
  titleSize = "h1",
  children,
}: {
  image: string;
  imageAlt?: string;
  /** object-position on phones (and on desktop when there is no `crop`) */
  position?: string;
  /** Figma desktop crop (from 768px): the photo's box in % of the hero */
  crop?: HeroCrop;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  titleSize?: "h1" | "h2";
  children?: ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative h-[760px] md:h-[820px] overflow-hidden on-photo">
        <div
          className={`absolute inset-0 ${
            crop ? "md:inset-auto md:top-[var(--crop-t)] md:left-[var(--crop-l)] md:w-[var(--crop-w)] md:h-[var(--crop-h)]" : ""
          }`}
          style={
            crop
              ? ({
                  "--crop-t": `${crop.top}%`,
                  "--crop-l": `${crop.left}%`,
                  "--crop-w": `${crop.width}%`,
                  "--crop-h": `${crop.height}%`,
                } as CSSProperties)
              : undefined
          }
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes={crop ? `${Math.round(crop.width)}vw` : "100vw"}
            className={`object-cover object-[var(--pos)] ${crop ? "md:object-center" : ""}`}
            style={{ "--pos": position } as CSSProperties}
          />
        </div>
        <div className="absolute inset-0 bg-black/30" aria-hidden />

        <div className="relative z-10 container-wrap pt-[272px] md:pt-[282px] flex flex-col items-center gap-[24px] text-center">
          {eyebrow && <p className="type-eyebrow">{eyebrow}</p>}
          <h1 className={titleSize === "h2" ? "type-h2" : "type-h1"}>{title}</h1>
          {subtitle && <p className="type-subtitle max-w-[600px]">{subtitle}</p>}
          {children && <div className="pt-[30px] flex flex-wrap justify-center gap-[14px]">{children}</div>}
        </div>

        <ScrollCue href="#after-hero" label={t.home.scroll} className="bottom-[104px] md:bottom-[32px]" />
      </section>
      {/* Scroll cue target: the top of the content, just below the navigation */}
      <div id="after-hero" className="scroll-mt-nav" aria-hidden />
    </>
  );
}
