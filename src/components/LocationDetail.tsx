"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { PropertyCard } from "./PropertyCard";
import { LOCATION_CONTENT } from "@/lib/location-content";
import type { Location, Property } from "@/lib/types";

export function LocationDetail({
  location: loc,
  properties = [],
}: {
  location: Location;
  properties?: Property[];
}) {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  // Rich location content only exists in fr/en — nl falls back to fr.
  const pick = (l: { fr: string; en: string }) => (isEn ? l.en : l.fr);
  const rich = LOCATION_CONTENT[loc.slug];

  const tr = (fr: string, en: string, nl: string) =>
    lang === "en" ? en : lang === "nl" ? nl : fr;

  const subtitle = rich
    ? pick(rich.heroSubtitle)
    : isEn
      ? loc.taglineEn ?? loc.tagline
      : loc.tagline;
  const intro = rich
    ? pick(rich.intro)
    : isEn
      ? loc.descriptionEn ?? loc.description
      : loc.description;
  const mainImage = rich?.mainImage ?? loc.image;
  const propsHref = `/properties?city=${encodeURIComponent(loc.name)}`;

  return (
    <div>
      {/* HERO — full-bleed image, centered title + Text/Subtitle */}
      <section className="relative h-[62svh] min-h-[420px] flex items-center justify-center overflow-hidden text-white on-photo">
        <Image
          src={mainImage}
          alt={loc.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="relative z-20 text-center px-6">
          <h1 className="type-h1 mb-4">{loc.name}</h1>
          {subtitle && (
            <p className="type-subtitle">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* BACK LINK */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        <Link
          href="/locations"
          className="inline-block px-8 py-4 border border-[var(--border-strong)] hover:border-accent hover:bg-accent hover:text-white text-[11px] tracking-[0.22em] uppercase transition"
        >
          {tr("← Retour aux régions", "← Back to locations", "← Terug naar regio's")}
        </Link>
      </div>

      {/* STATS PANEL (light-blue) + INTRO */}
      <section className="grid md:grid-cols-2">
        <div className="bg-[var(--panel)] px-6 md:px-16 py-16 md:py-20 flex items-center">
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 w-full max-w-md mx-auto">
            {(rich?.overview ?? []).map((o, i) => (
              <div
                key={i}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <p className="font-serif text-lg md:text-xl mb-2 leading-snug">
                  {pick(o.value)}
                </p>
                <p className="text-[10px] tracking-[0.22em] uppercase text-muted-strong">
                  {pick(o.label)}
                </p>
              </div>
            ))}
            {!rich && (
              <div data-reveal>
                <p className="font-serif text-4xl md:text-5xl mb-2">
                  {loc.propertyCount ? `${loc.propertyCount}+` : "—"}
                </p>
                <p className="text-[10px] tracking-[0.22em] uppercase text-muted-strong">
                  {tr("Propriétés", "Properties", "Panden")}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="px-6 md:px-16 py-16 md:py-20 flex flex-col justify-center" data-reveal>
          <h2 className="font-serif text-2xl md:text-3xl tracking-[0.1em] uppercase mb-7">
            {loc.name}
          </h2>
          <p className="text-muted-strong leading-[1.9] text-[14px] max-w-xl">
            {intro}
          </p>
        </div>
      </section>

      {/* IMAGE BAND */}
      <section className="relative h-[40svh] min-h-[280px] overflow-hidden">
        <Image src={mainImage} alt={loc.name} fill sizes="100vw" className="object-cover" />
      </section>

      {rich && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* ART DE VIVRE — paragraph + bulleted list (kept content) */}
          <ContentSection
            label={tr("Art de vivre", "Lifestyle", "Levenskunst")}
            heading={tr("Culture & Expériences", "Culture & Experiences", "Cultuur & Belevingen")}
          >
            <p className="text-muted-strong leading-[1.9] text-[14px] max-w-3xl mb-8">
              {(isEn ? rich.lifestyle.en : rich.lifestyle.fr)[0]}
            </p>
            <ul className="max-w-3xl">
              {rich.activities.map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-4 border-b border-[var(--border)] text-[14px] text-foreground"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--gold)] flex-none" />
                  {pick(a.title)}
                </li>
              ))}
            </ul>
          </ContentSection>

          {/* POINTS FORTS — chips */}
          {rich.highlights.length > 0 && (
            <ContentSection
              label={tr("À découvrir", "Discover", "Ontdekken")}
              heading={tr("Le territoire", "The area", "De omgeving")}
            >
              <p className="text-muted-strong leading-[1.9] text-[14px] max-w-3xl mb-8">
                {pick(rich.gastronomy)}
              </p>
              <div className="flex flex-wrap gap-3">
                {rich.highlights.map((h, i) => (
                  <Chip key={i}>{pick(h.title)}</Chip>
                ))}
              </div>
            </ContentSection>
          )}

          {/* MARCHÉ — chips */}
          <ContentSection
            label={tr("Marché", "Market", "Markt")}
            heading={tr("Investissement & Marché", "Investment & Market", "Investering & Markt")}
            last
          >
            <p className="text-muted-strong leading-[1.9] text-[14px] max-w-3xl mb-8">
              {tr(
                `Biens d'exception au fort potentiel patrimonial à ${loc.name}.`,
                `Exceptional properties with strong asset potential in ${loc.name}.`,
                `Uitzonderlijke panden met sterk vermogenspotentieel in ${loc.name}.`,
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              {rich.realEstate.map((r, i) => (
                <Chip key={i}>{pick(r)}</Chip>
              ))}
            </div>
          </ContentSection>
        </div>
      )}

      {/* EXPERT CTA — navy band */}
      <section className="relative bg-[var(--accent)] text-white py-16 md:py-20 px-6 md:px-10 mt-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="font-serif italic text-2xl md:text-3xl mb-3">
              {tr(
                "Votre expert local dans cette région",
                "Your local expert in this region",
                "Uw lokale expert in deze regio",
              )}
            </h2>
            <p className="text-white/70 text-[14px] max-w-xl">
              {tr(
                "Notre équipe connaît chaque rue, chaque vue, chaque bien exceptionnel.",
                "Our team knows every street, every view, every exceptional property.",
                "Ons team kent elke straat, elk uitzicht, elk uitzonderlijk pand.",
              )}
            </p>
          </div>
          <Link
            href={`/contact?city=${encodeURIComponent(loc.name)}`}
            className="flex-none self-start md:self-auto px-[60px] py-4 border border-white/40 text-white hover:bg-white hover:text-[var(--accent)] text-[11px] tracking-[0.22em] uppercase transition"
          >
            {tr("Demander une consultation", "Request a consultation", "Vraag een consult aan")}
          </Link>
        </div>
      </section>

      {/* PROPERTIES IN THIS REGION */}
      {properties.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-reveal>
            <h2 className="type-h2">
              {tr(
                "Propriétés dans cette région",
                "Properties in this region",
                "Panden in deze regio",
              )}
            </h2>
            <Link
              href={propsHref}
              className="self-start md:self-end text-[11px] tracking-[0.22em] uppercase text-accent hover:text-link border-b border-accent pb-1"
            >
              {tr("Voir tout →", "View all →", "Alles bekijken →")}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p, i) => (
              <div
                key={p.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <PropertyCard property={p} priority={i < 3} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Section with a small left-aligned label and a serif heading (prototype).
function ContentSection({
  label,
  heading,
  children,
  last = false,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      className={`grid md:grid-cols-[180px_1fr] gap-6 md:gap-10 py-14 md:py-16 ${
        last ? "" : "border-b border-[var(--border)]"
      }`}
      data-reveal
    >
      <p className="text-[10px] tracking-[0.28em] uppercase text-muted pt-2">
        {label}
      </p>
      <div>
        <h2 className="type-h3 mb-6">{heading}</h2>
        {children}
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-[var(--border)] px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase text-muted-strong">
      {children}
    </span>
  );
}
