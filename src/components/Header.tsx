"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoLockup } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import { AuthMenu } from "./AuthMenu";
import { ButtonLink } from "./ui/Button";

// Figma component "Navigation" (7:75), 4 variants:
//   Transparent (over hero photo: white logo + text) / Solid (white bar,
//   hairline bottom border, blue text) × Desktop (80px) / Mobile (68px).
// Height = --nav-height, side padding = --space-margin (tokens, step 4).
// Below 1024px the links don't fit, so the mobile bar (logo + menu icon) is
// shown and the links move to the full-screen menu, Figma frame
// "00 Menu — Mobile" (2049:2442).
export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers the page it was opened on, so it is closed
  // automatically as soon as the route changes (no effect needed).
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the full-screen menu is open: lock page scroll, move focus to the
  // close button, close on Escape, and give focus back to the menu icon after.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    const menuButton = menuButtonRef.current;
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuButton?.focus();
    };
  }, [open]);

  // Pages whose top section is a full-bleed image hero — the header should
  // start transparent so the image flows behind it, then turn solid on scroll.
  const hasImageHero =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/sell" ||
    pathname === "/locations" ||
    pathname.startsWith("/locations/");
  // Until mounted, default to the transparent "over image" state. usePathname()
  // is unreliable during static prerender (the layout is shared across routes),
  // which baked the solid header into the initial HTML and caused a white flash
  // over image heroes on reload. Client mount then computes the real state.
  // (Goes away with the language-in-URL fix, step 12.)
  const overImage = mounted ? hasImageHero && !scrolled : true;

  const navLinks = [
    { href: "/properties", label: t.nav.buy },
    { href: "/sell", label: t.nav.sell },
    { href: "/locations", label: t.nav.regionsNav },
    { href: "/about", label: t.nav.about },
  ];
  // The mobile menu also lists the Journal (Figma "00 Menu — Mobile").
  const menuLinks = [...navLinks, { href: "/blog", label: t.nav.journal }];

  const isCurrent = (href: string) =>
    mounted && (pathname === href || pathname.startsWith(`${href}/`));

  const tone = overImage ? "text-white" : "text-brand-blue";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-500 ${
          overImage
            ? "bg-transparent border-transparent"
            : "bg-surface border-hairline"
        }`}
      >
        <div className={`container-wrap h-nav flex items-center justify-between ${tone}`}>
          <Link
            href="/"
            aria-label="Ellington Properties"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="shrink-0 hover:opacity-80 transition-opacity"
          >
            <LogoLockup tone={overImage ? "white" : "blue"} />
          </Link>

          {/* Desktop: links (Figma "Links", gap 40) */}
          <nav className="hidden lg:flex items-center gap-[40px]">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isCurrent(l.href) ? "page" : undefined}
                className="type-button nav-link"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop: language, Contact button, Login (Figma "Right", gap 28) */}
          <div className="hidden lg:flex items-center gap-[28px]">
            <LanguageToggle overImage={overImage} />
            {/* Figma Button: Ghost over a photo, Outline on the solid nav,
                with the nav's smaller padding (18 × 8). */}
            <ButtonLink
              href="/contact"
              variant={overImage ? "ghost" : "outline"}
              size="compact"
            >
              {t.nav.contact}
            </ButtonLink>
            <AuthMenu overImage={overImage} />
          </div>

          {/* Mobile / tablet: menu icon, two 24px lines 6px apart in a 40px box */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="lg:hidden size-[40px] flex flex-col items-center justify-center gap-[6px]"
          >
            <span className="block h-px w-[24px] bg-current" />
            <span className="block h-px w-[24px] bg-current" />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu, Figma "00 Menu — Mobile". Rendered outside
          <header> so it covers the whole screen, header included. */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="lg:hidden fixed inset-0 z-[60] bg-surface flex flex-col overflow-y-auto animate-[fadeIn_0.25s_ease-out]"
        >
          {/* Close (×) sits exactly where the menu icon was */}
          <div className="container-wrap h-nav shrink-0 flex items-center justify-end">
            <button
              ref={closeButtonRef}
              type="button"
              aria-label={t.nav.close}
              onClick={() => setOpen(false)}
              className="size-[40px] flex items-center justify-center font-sans font-light text-[28px] leading-none text-brand-blue"
            >
              ×
            </button>
          </div>

          <nav className="container-wrap flex-1 flex flex-col pb-[40px]">
            {menuLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(l.href) ? "page" : undefined}
                className="type-h2 block py-[14px] border-b border-hairline"
              >
                {l.label}
              </Link>
            ))}

            {/* Figma: 32px spacer, then the full-width Primary button */}
            <ButtonLink
              href="/contact"
              onClick={() => setOpen(false)}
              variant="primary"
              className="mt-[32px] w-full"
            >
              {t.nav.contact}
            </ButtonLink>

            {/* Not in the Figma frame: the mobile bar has no room for the
                language switch and Login, so they sit under the button. */}
            <div className="mt-stack flex items-center justify-between">
              <LanguageToggle />
              <AuthMenu variant="mobile" onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
