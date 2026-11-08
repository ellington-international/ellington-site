"use client";

import Link from "@/components/LocaleLink";
import { LogoLockup } from "./Logo";
import { useLanguage } from "./LanguageProvider";
import { ManageCookiesButton } from "./ManageCookiesButton";

// Figma component "Footer" (7:156): brand/blue, white text.
//   Desktop (7:115): 4 columns (brand 373 + Explore / Contact / Hours, equal
//   widths, gap 40), padding 96 top / 32 bottom, 56 between columns and the
//   fine print. Mobile (7:155): stacked, gap 40, padding 64 top.
//   Fine print: white top line, 22 above the text; © left, links right
//   (stacked on mobile, gap 12). "Site by Z.Development" left out on request.
// 2 columns between 768 and 1279px: 4 columns don't fit there.

// Hover is not drawn in Figma: champagne underline, like the other links.
const linkCls =
  "hover:underline underline-offset-4 decoration-brand-accent transition-colors";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const explore = [
    { href: "/properties", label: t.nav.buy },
    { href: "/sell", label: t.nav.sell },
    { href: "/locations", label: t.nav.regionsNav },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.journal },
  ];

  // Figma shows the tagline as two lines, one sentence each.
  // (Plain split, no regex look-behind, which older iPhone Safari lacks.)
  const tagline = t.footer.tagline
    .split(". ")
    .map((line, i, all) => (i < all.length - 1 ? `${line}.` : line));

  return (
    <footer className="bg-brand-blue text-white">
      <div className="container-wrap pt-[64px] md:pt-[96px] pb-[32px] flex flex-col gap-[56px]">
        <div className="grid gap-[40px] md:grid-cols-2 xl:grid-cols-[373fr_249fr_249fr_249fr]">
          {/* Brand */}
          <div className="flex flex-col gap-[14px]">
            <Link
              href="/"
              aria-label="Ellington Properties"
              className="self-start mb-[20px] hover:opacity-80 transition-opacity"
            >
              <LogoLockup tone="white" />
            </Link>
            <p className="type-small text-white">
              {tagline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="type-small text-white">
              Espace Lemarquis · Quartier Bertaud
              <br />
              83580 Gassin · France
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-[18px] min-w-0">
            <h2 className="type-label text-white">{t.footer.explore}</h2>
            <ul className="type-small text-white flex flex-col gap-[10px]">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-[18px] min-w-0">
            <h2 className="type-label text-white">{t.footer.contact}</h2>
            <ul className="type-small text-white flex flex-col gap-[10px]">
              <li>
                <a href="tel:+33674750703" className={linkCls}>
                  +33 6 74 75 07 03
                </a>
              </li>
              <li>
                <a href="mailto:marc@ellington-international.com" className={linkCls}>
                  marc@ellington-international.com
                </a>
              </li>
              <li>{t.footer.cityLabel}</li>
            </ul>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-[18px] min-w-0">
            <h2 className="type-label text-white">{t.footer.hours}</h2>
            <ul className="type-small text-white flex flex-col gap-[10px]">
              <li>{t.footer.monFri}</li>
              <li>{t.footer.sat}</li>
              <li>{t.footer.sun}</li>
            </ul>
          </div>
        </div>

        {/* Fine print */}
        <div className="type-small text-white border-t border-white pt-[22px] flex flex-col gap-[12px] md:flex-row md:justify-between md:items-start">
          <p className="type-small text-white">{t.footer.rights(year)}</p>
          <div className="flex flex-wrap gap-x-[20px] gap-y-[8px]">
            <Link href="/legal" className={linkCls}>
              {t.footer.legal}
            </Link>
            <Link href="/privacy" className={linkCls}>
              {t.footer.privacy}
            </Link>
            {/* type-small again: the base `button` rule would make it 12px */}
            <ManageCookiesButton className={`${linkCls} type-small text-white text-left`}>
              {t.footer.cookies}
            </ManageCookiesButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
