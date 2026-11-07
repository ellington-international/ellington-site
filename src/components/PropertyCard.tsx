"use client";

import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/types";
import { formatPriceShort } from "@/lib/properties";
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
// title only takes the lines it needs; price + specs sit at the bottom of the
// card (mt-auto) so they line up across a row of cards.
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
            alt={cover.alt ?? property.title}
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

      <div className="flex flex-col gap-[10px] flex-1">
        <p className="type-eyebrow text-muted">{property.city}</p>
        <h3 className={`type-h3 line-clamp-2 ${cardTitleHoverCls}`}>
          {property.title}
        </h3>
        <div className="mt-auto flex flex-col gap-[10px]">
        <p className="type-price">
          {formatPriceShort(property.price)}
          {property.pricePeriod && (
            <span>
              {" "}/{property.pricePeriod === "week" ? t.priceUnit.week : t.priceUnit.month}
            </span>
          )}
        </p>
        {specs.length > 0 && (
          <ul className="border-t border-hairline pt-[10px] flex flex-wrap gap-x-[16px] gap-y-[6px]">
            {specs.map((s) => (
              <li key={s.icon} className="type-small flex items-center gap-[6px] whitespace-nowrap">
                {/* eslint-disable-next-line @next/next/no-img-element -- 16px static icon from Figma */}
                <img src={`/ui/icons/${s.icon}.svg`} alt="" width={16} height={16} className="shrink-0" />
                <span className="sr-only">{s.label}: </span>
                {s.value}
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>
    </Link>
  );
}
