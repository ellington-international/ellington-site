"use client";

import Link from "@/components/LocaleLink";
import Image from "next/image";
import type { Property } from "@/lib/types";
import { formatPriceShort, hasPrice } from "@/lib/properties";
import { propertyTitle } from "@/lib/property-text";
import { useLanguage } from "./LanguageProvider";
import { FavoriteButton } from "./FavoriteButton";
import {
  cardImageCls,
  cardLinkCls,
  cardPhotoCls,
  cardTitleHoverCls,
  formatArea,
} from "./ui/card";

// Figma "Property card" (2048:447): photo 4:5, location eyebrow, title (max
// 2 lines), price, specs on a hairline. Specs = icon + number, as on the
// Figma pages; the full words are read out to screen readers.
// Spacing ≈ ¾ of Figma on client request (photo → text 15, lines 10). The
// title box is always two lines high and the hairline + specs row is always
// drawn, so price and hairline line up across a row of cards (client
// feedback: Apimo listings without details or with one-line titles).
// Kept from before (not drawn in Figma): the favourite heart and the
// "Exclusive" label on the photo.
export function PropertyCard({
  property,
  priority = false,
  initialFavored = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw",
}: {
  property: Property;
  priority?: boolean;
  initialFavored?: boolean;
  sizes?: string;
}) {
  const { t, lang } = useLanguage();
  const cover = property.pictures[0];
  const title = propertyTitle(property, lang);

  const specs = [
    property.bedrooms > 0 && { icon: "bedrooms", value: String(property.bedrooms), label: t.propertyDetail.bedrooms },
    property.bathrooms > 0 && { icon: "bathrooms", value: String(property.bathrooms), label: t.propertyDetail.bathrooms },
    property.area > 0 && { icon: "living", value: formatArea(property.area, lang), label: t.propertyDetail.area },
    property.landArea && { icon: "land", value: formatArea(property.landArea, lang), label: t.propertyDetail.landArea },
  ].filter(Boolean) as { icon: string; value: string; label: string }[];

  return (
    <Link href={`/properties/${property.id}`} className={`${cardLinkCls} flex flex-col gap-[15px] h-full`}>
      <div className={`${cardPhotoCls} aspect-[4/5]`}>
        {cover && (
          <Image
            src={cover.url}
            alt={cover.alt ?? title}
            fill
            sizes={sizes}
            priority={priority}
            className={cardImageCls}
          />
        )}
        {property.isExclusive && (
          // Not in Figma: square label in Caps/Label, white with brand/blue text
          <span className="type-label absolute top-[14px] left-[14px] px-[10px] py-[6px] bg-surface text-brand-blue">
            {t.propertyDetail.exclusive}
          </span>
        )}
        <div className="absolute top-[14px] right-[14px]">
          <FavoriteButton propertyId={property.id} initialFavored={initialFavored} />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <p className="type-eyebrow text-muted truncate">{property.city}</p>
        {/* Always two lines high (a one-line title is centred in it), so the
            price, hairline and specs start at the same height on every card
            of a row. The wrapper carries type-h3 so 2lh = two title lines. */}
        <div className="type-h3 min-h-[2lh] flex items-center">
          <h3 className={`type-h3 line-clamp-2 ${cardTitleHoverCls}`}>{title}</h3>
        </div>
        <p className="type-price">
          {hasPrice(property) ? formatPriceShort(property.price) : t.priceOnRequest}
          {hasPrice(property) && property.pricePeriod && (
            <span>
              {" "}/{property.pricePeriod === "week" ? t.priceUnit.week : t.priceUnit.month}
            </span>
          )}
        </p>
        {/* Hairline + specs always drawn; without any spec an invisible
            placeholder keeps the row's height. */}
        <ul className="border-t border-hairline pt-[10px] flex flex-wrap gap-x-[16px] gap-y-[6px]">
          {specs.length > 0 ? (
            specs.map((s) => (
              <li key={s.icon} className="type-small flex items-center gap-[6px] whitespace-nowrap">
                {/* eslint-disable-next-line @next/next/no-img-element -- 16px static icon from Figma */}
                <img src={`/ui/icons/${s.icon}.svg`} alt="" width={16} height={16} className="shrink-0" />
                <span className="sr-only">{s.label}: </span>
                {s.value}
              </li>
            ))
          ) : (
            <li aria-hidden className="type-small flex items-center gap-[6px] invisible">
              <span className="size-[16px] shrink-0" />0
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}
