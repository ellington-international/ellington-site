"use client";

import { PropertyGallery } from "./PropertyGallery";
import { PropertyCard } from "./PropertyCard";
import { FavoriteButton } from "./FavoriteButton";
import { EnergyDiagnostics } from "./EnergyDiagnostics";
import { formatPriceShort } from "@/lib/properties";
import { localizeFeature } from "@/lib/amenities";
import { useLanguage } from "./LanguageProvider";
import type { Property } from "@/lib/types";
import { cardGridCls, formatArea } from "@/components/ui/card";
import { Stat, DetailRow, Tag, InfoBox } from "@/components/ui/SmallParts";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { reveal } from "./ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

// Figma "03 Property — Desktop" (11:2) / "— Mobile" (11:270).
// Top: back link, 32px, title row (town in Caps/Eyebrow champagne, title in
// Heading/Title as the H1, price in Heading/Title champagne bottom right;
// mobile: price under the title), 36px, gallery + thumbnails.
// Body 72px below (mobile 48): main column (800) + aside (360), 80px apart;
// mobile stacked, aside 56px below. Main sections 56px apart, each an H2
// with its content 24px below (mobile 20). Similar properties 128px below
// (mobile 80), cards 56px under the head (mobile 40).
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
  const pd = t.propertyDetail;
  const typeLabel = t.types[property.type as keyof typeof t.types] ?? property.type;
  const area = (n: number) => formatArea(n, lang);

  // Figma key figures: bedrooms · living area · land area · bathrooms.
  // Written like Figma ("3016 m²", no thousands separator) so they fit the
  // 176px columns in the large H2 figure style; no wrapping inside a figure.
  const stats = [
    property.bedrooms > 0 && { figure: property.bedrooms, label: pd.bedrooms },
    property.area > 0 && { figure: `${property.area} m²`, label: pd.area },
    property.landArea && { figure: `${property.landArea} m²`, label: pd.landArea },
    property.bathrooms > 0 && { figure: property.bathrooms, label: pd.bathrooms },
  ].filter(Boolean) as { figure: React.ReactNode; label: string }[];

  // Figma property details, in two columns (row order)
  const details = [
    { label: pd.type, value: typeLabel },
    { label: pd.location, value: property.city },
    property.area > 0 && { label: pd.area, value: area(property.area) },
    property.landArea && { label: pd.landArea, value: area(property.landArea) },
    property.bedrooms > 0 && { label: pd.bedrooms, value: property.bedrooms },
    property.bathrooms > 0 && { label: pd.bathrooms, value: property.bathrooms },
    property.yearBuilt && { label: pd.year, value: property.yearBuilt },
    { label: pd.reference, value: property.reference },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  const sectionCls = "flex flex-col gap-[20px] md:gap-[24px]";

  return (
    <div className="container-wrap pt-[calc(var(--nav-height)+48px)] pb-section">
      {/* flex row: keeps the link at its own height (no inline line-height gap) */}
      <div className="flex">
        <TextLink href="/properties">← {t.common.backToPortfolio}</TextLink>
      </div>

      {/* TITLE ROW */}
      <div className="mt-[32px] flex flex-col md:flex-row md:items-end md:justify-between gap-[16px] md:gap-[40px]">
        <div className="flex flex-col gap-[16px] max-w-[820px]">
          <p className="type-eyebrow text-brand-accent">{property.city}</p>
          <h1 className="type-title">{property.title}</h1>
        </div>
        <p className="type-title text-brand-accent whitespace-nowrap">{formatPriceShort(property.price)}</p>
      </div>

      {/* GALLERY */}
      <div className="mt-[36px]">
        <PropertyGallery
          pictures={property.pictures}
          title={property.title}
          overlay={<FavoriteButton propertyId={property.id} initialFavored={initialFavored} variant="detail" />}
        />
      </div>

      {/* BODY */}
      {/* side by side from 1280px (below, the 800px Figma column doesn't fit next to the aside) */}
      <div className="mt-[48px] md:mt-[72px] grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-x-[80px] gap-y-[56px]">
        <div className="min-w-0 flex flex-col gap-[56px]">
          {stats.length > 0 && (
            // 4 equal columns 32px apart (below 1024px 2 × 2), like Figma's
            // 176px columns; a long figure (e.g. 80000 m²) takes the room it
            // needs from the others instead of overflowing, and the row wraps
            // only if nothing fits.
            <div className="flex flex-wrap gap-x-[20px] md:gap-x-[32px] gap-y-[24px]">
              {stats.map((s) => (
                <Stat
                  key={s.label}
                  className="grow basis-[calc(50%-16px)] lg:basis-0 min-w-max"
                  figure={<span className="whitespace-nowrap">{s.figure}</span>}
                  label={s.label}
                />
              ))}
            </div>
          )}

          <section className={sectionCls}>
            <h2 className="type-h2" {...reveal}>{pd.description}</h2>
            <p className="type-body whitespace-pre-line" {...reveal}>{property.description}</p>
          </section>

          {property.features.length > 0 && (
            <section className={sectionCls}>
              <h2 className="type-h2" {...reveal}>{pd.features}</h2>
              <ul className="flex flex-wrap gap-[8px]" {...reveal}>
                {property.features.map((f) => (
                  <li key={f}>
                    <Tag>{localizeFeature(f, lang)}</Tag>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className={sectionCls}>
            <h2 className="type-h2" {...reveal}>{pd.propertyDetailsTitle}</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-[40px] border-t border-hairline" {...reveal}>
              {details.map((d) => (
                <DetailRow key={d.label} label={d.label} value={d.value} />
              ))}
            </dl>
          </section>

          <EnergyDiagnostics property={property} />

          <section className={sectionCls}>
            <h2 className="type-h2" {...reveal}>{pd.location}</h2>
            <p className="type-body" {...reveal}>{pd.addressNote}</p>
          </section>
        </div>

        {/* ASIDE (11:131): boxes 48px apart (mobile 36) */}
        <aside className="flex flex-col gap-[36px] md:gap-[48px]">
          <div className="border-t border-hairline pt-[24px] flex flex-col gap-[20px]" {...reveal}>
            <h3 className="type-h3">{pd.interestedTitle}</h3>
            <p className="type-body">{pd.interestedBody}</p>
            <ButtonLink href={`/contact?property=${encodeURIComponent(property.reference)}`} variant="primary" className="w-full">
              {t.common.contactUs}
            </ButtonLink>
            {/* Figma Outline button with the phone number (a tel: link) */}
            <a href="tel:+33674750703" className={buttonClasses({ variant: "outline", className: "w-full" })}>
              +33 6 74 75 07 03
            </a>
          </div>

          <div className="border-t border-hairline pt-[24px] flex flex-col gap-[20px]" {...reveal}>
            <h3 className="type-h3">{pd.yourAdvisor}</h3>
            <AdvisorRow icon="/ui/icons/phone.svg" label={pd.phone}>
              <a href="tel:+33674750703" className="hover:text-brand-blue transition-colors">
                +33 6 74 75 07 03
              </a>
            </AdvisorRow>
            <AdvisorRow icon="/ui/icons/mail.svg" label={pd.email}>
              <a href="mailto:marc@ellington-international.com" className="hover:text-brand-blue transition-colors break-all">
                marc@ellington-international.com
              </a>
            </AdvisorRow>
            <AdvisorRow icon="/ui/icons/clock.svg" label={pd.officeHours}>
              {t.footer.monFri}
              <br />
              {t.footer.sat}
            </AdvisorRow>
          </div>

          <InfoBox title={pd.confidentialTitle}>
            <p>{pd.confidentialBody}</p>
          </InfoBox>
        </aside>
      </div>

      {/* SIMILAR PROPERTIES */}
      {similar.length > 0 && (
        <section className="mt-[80px] md:mt-[128px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-[16px]">
            <h2 className="type-h2" {...reveal}>{pd.similarTitle}</h2>
            <TextLink href="/properties" className="self-start md:self-auto" {...reveal}>
              {pd.viewAll}
            </TextLink>
          </div>
          <div className={`${cardGridCls} mt-[40px] md:mt-[56px]`}>
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} initialFavored={similarFavoredIds.includes(p.id)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Figma "Phone / Email / Office hours row": 40px champagne circle with a 20px
// icon, 14px, Caps/Label + Text/Small 4px apart.
function AdvisorRow({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-[14px]">
      <span className="size-[40px] shrink-0 rounded-full border border-brand-accent flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- 20px static icon from Figma */}
        <img src={icon} alt="" width={20} height={20} />
      </span>
      <div className="min-w-0 flex flex-col gap-[4px]">
        <p className="type-label">{label}</p>
        <p className="type-small text-body-text">{children}</p>
      </div>
    </div>
  );
}
