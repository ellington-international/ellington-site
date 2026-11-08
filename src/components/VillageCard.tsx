import Image from "next/image";
import Link from "@/components/LocaleLink";
import { cardImageCls, cardLinkCls, cardPhotoCls, cardTitleHoverCls } from "./ui/card";

// Figma "Village card" (2048:466): photo 4:3, then the village name in
// Heading/H3 and the tagline in Text/Small. Spacing ≈ ¾ of Figma (14 / 10)
// on client request.
export function VillageCard({
  href,
  name,
  tagline,
  image,
  priority = false,
}: {
  href: string;
  name: string;
  tagline?: string;
  image: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className={`${cardLinkCls} flex flex-col gap-[14px]`}>
      <div className={`${cardPhotoCls} aspect-[4/3]`}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
          priority={priority}
          className={cardImageCls}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <h2 className={`type-h3 ${cardTitleHoverCls}`}>{name}</h2>
        {tagline && <p className="type-small">{tagline}</p>}
      </div>
    </Link>
  );
}
