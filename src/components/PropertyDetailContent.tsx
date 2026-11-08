"use client";

import Link from "@/components/LocaleLink";
import { PropertyGallery } from "./PropertyGallery";
import { PropertyCard } from "./PropertyCard";
import { FavoriteButton } from "./FavoriteButton";
import { EnergyDiagnostics } from "./EnergyDiagnostics";
import { formatPriceShort } from "@/lib/properties";
import { localizeFeature } from "@/lib/amenities";
import { useLanguage } from "./LanguageProvider";
import type { Property } from "@/lib/types";
import { cardGridCls } from "@/components/ui/card";

export function PropertyDetailContent({
  property,
  similar,
  initialFavored = false,
  similarFavoredIds = [],
}: {
  property: Property;
  similar: Property[];
  initialFavored?: boolean;
  similarFavoredIds?: string[];
}) {
  const { t, lang } = useLanguage();
  const typeKey = property.type as keyof typeof t.types;
  const typeLabel = t.types[typeKey] ?? property.type;

  // Stat boxes — Figma order: bedrooms · living area · land area · year · bathrooms.
  const stats: { icon: string; label: string; value: React.ReactNode }[] = [];
  if (property.bedrooms > 0)
    stats.push({ icon: "bed", label: t.propertyDetail.bedrooms, value: property.bedrooms });
  if (property.area > 0)
    stats.push({ icon: "area", label: t.propertyDetail.area, value: `${property.area} m²` });
  if (property.landArea)
    stats.push({ icon: "land", label: t.propertyDetail.landArea, value: `${property.landArea} m²` });
  if (property.yearBuilt)
    stats.push({
      icon: "calendar",
      label: property.yearBuilt < 1900 ? t.propertyDetail.origin : t.propertyDetail.year,
      value: property.yearBuilt,
    });
  if (property.bathrooms > 0)
    stats.push({ icon: "bath", label: t.propertyDetail.bathrooms, value: property.bathrooms });

  const statCols =
    stats.length >= 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : stats.length === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : stats.length === 3
          ? "grid-cols-3"
          : stats.length === 2
            ? "grid-cols-2"
            : "grid-cols-1";

  // Property Details table — Figma pairs (row-flow: Type/Location, Living/Land, …).
  const details: { label: string; value: React.ReactNode }[] = [
    { label: t.propertyDetail.type, value: typeLabel },
    { label: t.propertyDetail.location, value: property.city },
    ...(property.area > 0
      ? [{ label: t.propertyDetail.area, value: `${property.area} m²` }]
      : []),
    ...(property.landArea
      ? [{ label: t.propertyDetail.landArea, value: `${property.landArea} m²` }]
      : []),
    ...(property.bedrooms > 0
      ? [{ label: t.propertyDetail.bedrooms, value: property.bedrooms }]
      : []),
    ...(property.bathrooms > 0
      ? [{ label: t.propertyDetail.bathrooms, value: property.bathrooms }]
      : []),
    ...(property.yearBuilt
      ? [{ label: t.propertyDetail.year, value: property.yearBuilt }]
      : []),
    { label: t.propertyDetail.reference, value: property.reference },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border-strong)] hover:border-accent hover:bg-accent hover:text-white text-[11px] tracking-[0.22em] uppercase transition mb-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          {t.common.backToPortfolio}
        </Link>

        {/* HEADER */}
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-accent text-[11px] tracking-[0.22em] uppercase mb-4">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2c-3.5 0-6 2.5-6 6 0 4 6 12 6 12s6-8 6-12c0-3.5-2.5-6-6-6z" />
                <circle cx="12" cy="8" r="2" />
              </svg>
              <span>{property.city}</span>
              {property.isExclusive && (
                <>
                  <span className="opacity-50">·</span>
                  <span>{t.propertyDetail.exclusive}</span>
                </>
              )}
            </div>
            {/* Lighter, lower-case + italic (client: type-h1 looked too heavy here) */}
            <h1 className="font-serif italic font-medium normal-case text-4xl md:text-6xl leading-[1.1] mb-3">
              {property.title}
            </h1>
            {/* Price uses the same (sans) font as the property cards — client feedback */}
            <p className="text-2xl text-accent">
              {formatPriceShort(property.price)}
            </p>
            {property.subtitle && (
              <p className="text-lg text-muted-strong italic font-serif mt-3">
                {property.subtitle}
              </p>
            )}
          </div>
          <FavoriteButton
            propertyId={property.id}
            initialFavored={initialFavored}
            variant="detail"
          />
        </div>

        {/* GALLERY */}
        <PropertyGallery pictures={property.pictures} title={property.title} />

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          <div className="lg:col-span-2 space-y-14">
            {/* KEY FACTS — left-aligned blue boxes with gaps */}
            {stats.length > 0 && (
              <div className={`grid ${statCols} gap-3`}>
                {stats.map((s, i) => (
                  <div key={i} className="bg-[var(--panel)] p-6">
                    <div className="mb-4 text-accent">
                      <KeyIcon name={s.icon} />
                    </div>
                    <p className="font-serif text-2xl mb-1">{s.value}</p>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-muted">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* DESCRIPTION */}
            <div>
              <h2 className="type-h3 mb-6">
                {t.propertyDetail.description}
              </h2>
              <p className="text-muted-strong text-[14px] leading-[1.85] whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* KEY FEATURES — navy pills */}
            {property.features.length > 0 && (
              <div>
                <h2 className="type-h3 mb-6">
                  {t.propertyDetail.features}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {property.features.map((f) => (
                    <span
                      key={f}
                      className="bg-accent text-white text-[11px] tracking-[0.18em] uppercase px-5 py-3"
                    >
                      {localizeFeature(f, lang)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* PROPERTY DETAILS — blue table */}
            <div>
              <h2 className="type-h3 mb-6">
                {t.propertyDetail.propertyDetailsTitle}
              </h2>
              <div className="bg-[var(--panel)] p-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {details.map((d, i) => (
                  <div key={i}>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-muted mb-1">
                      {d.label}
                    </p>
                    <p className="text-sm text-accent">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ENERGY DIAGNOSTICS (DPE) */}
            <EnergyDiagnostics property={property} />

            {/* LOCATION */}
            <div>
              <h2 className="type-h3 mb-6">
                {t.propertyDetail.location}
              </h2>
              <div className="aspect-[16/9] bg-[var(--background-card)] border border-[var(--border)] flex items-center justify-center text-muted relative overflow-hidden">
                {property.coordinates ? (
                  <iframe
                    title="Map"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                      property.coordinates.lng - 0.05
                    }%2C${property.coordinates.lat - 0.03}%2C${
                      property.coordinates.lng + 0.05
                    }%2C${
                      property.coordinates.lat + 0.03
                    }&layer=mapnik&marker=${property.coordinates.lat}%2C${property.coordinates.lng}`}
                    className="absolute inset-0 w-full h-full grayscale opacity-90"
                    loading="lazy"
                  />
                ) : (
                  <p className="text-sm">{t.propertyDetail.mapUnavailable}</p>
                )}
              </div>
              <p className="text-sm text-muted mt-4">
                {t.propertyDetail.addressNote}
              </p>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            {/* Interested — white card (borders allowed on white) */}
            <div className="bg-[var(--background-card)] border border-[var(--border)] p-8">
              <h3 className="type-h4 mb-2">
                {t.propertyDetail.interestedTitle}
              </h3>
              <p className="text-sm text-muted mb-6">
                {t.propertyDetail.interestedBody}
              </p>
              <Link
                href={`/contact?property=${property.reference}`}
                className="flex items-center justify-center gap-2 px-5 py-3.5 border border-[var(--border-strong)] hover:border-accent text-[11px] tracking-[0.22em] uppercase transition mb-3"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="5" width="18" height="14" rx="1" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                {t.common.contactUs}
              </Link>
              <a
                href="tel:+33674750703"
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-accent hover:bg-accent-hover text-white text-[11px] tracking-[0.22em] uppercase transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                </svg>
                +33 6 74 75 07 03
              </a>
            </div>

            {/* Dedicated agent — white card */}
            <div className="bg-[var(--background-card)] border border-[var(--border)] p-8">
              <h3 className="type-h4 mb-5">
                {t.propertyDetail.yourAdvisor}
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-[10px] tracking-[0.22em] uppercase text-muted mb-1">
                    {t.propertyDetail.phone}
                  </dt>
                  <dd>+33 6 74 75 07 03</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.22em] uppercase text-muted mb-1">
                    {t.propertyDetail.email}
                  </dt>
                  <dd>marc@ellington-international.com</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.22em] uppercase text-muted mb-1">
                    {t.propertyDetail.officeHours}
                  </dt>
                  <dd>
                    {t.footer.monFri}
                    <br />
                    {t.footer.sat}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Confidential — blue card (no border) */}
            <div className="bg-[var(--panel)] p-6">
              <h4 className="font-serif text-lg mb-2">
                {t.propertyDetail.confidentialTitle}
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                {t.propertyDetail.confidentialBody}
              </p>
            </div>
          </aside>
        </div>

        {/* SIMILAR */}
        {similar.length > 0 && (
          <div className="mt-28 pt-20 border-t border-[var(--border)]">
            <h2 className="type-h2 mb-10">
              {t.propertyDetail.similar}{" "}
              <em className="not-italic">{t.propertyDetail.similarAccent}</em>
            </h2>
            <div className={cardGridCls}>
              {similar.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  initialFavored={similarFavoredIds.includes(p.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function KeyIcon({ name }: { name: string }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
  };
  switch (name) {
    case "bed":
      return (
        <svg {...props}>
          <path d="M3 18v-6a3 3 0 013-3h12a3 3 0 013 3v6M3 14h18M7 11V8a1 1 0 011-1h3a1 1 0 011 1v3" />
        </svg>
      );
    case "bath":
      return (
        <svg {...props}>
          <path d="M4 12h16v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5zM6 12V7a2 2 0 012-2h2v3" />
        </svg>
      );
    case "area":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" />
          <path d="M4 9h3M4 15h3M9 4v3M15 4v3M9 20v-3M15 20v-3M17 9h3M17 15h3" />
        </svg>
      );
    case "land":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" />
          <path d="M7 16l3-3.5 2.5 3L16 11l3 5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="4" y="5" width="16" height="16" rx="1" />
          <path d="M4 10h16M9 3v4M15 3v4" />
        </svg>
      );
    default:
      return null;
  }
}
