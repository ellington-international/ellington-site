"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Dropdown } from "./ui/Dropdown";
import { textLinkClasses } from "./ui/TextLink";
import { filterOptions, filterQuery } from "@/lib/filters";

// Home hero search (Figma "01 Home" › Hero › Filter + Search link):
// Location · Property type · Budget · Bedrooms on the photo, then a white
// "Search" text link. Desktop: one row, 980px max, 14px apart.
// Mobile: 2 × 2, 12px apart. Opens the Buy page with the chosen filters.
export function HeroSearch({ cities }: { cities: string[] }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [priceIdx, setPriceIdx] = useState(0);
  const [beds, setBeds] = useState(0);

  const opts = filterOptions(t, cities);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/properties${filterQuery({ city, type, priceIdx, beds })}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[980px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[14px] text-left">
        <Dropdown context="photo" label={t.search.location} value={city} onChange={setCity} options={opts.location} />
        <Dropdown context="photo" label={t.search.type} value={type} onChange={setType} options={opts.type} />
        <Dropdown
          context="photo"
          label={t.search.budget}
          value={String(priceIdx)}
          onChange={(v) => setPriceIdx(Number(v))}
          options={opts.budget}
        />
        <Dropdown
          context="photo"
          label={t.search.bedrooms}
          value={String(beds)}
          onChange={(v) => setBeds(Number(v))}
          options={opts.bedrooms}
        />
      </div>
      <div className="flex justify-center pt-[34px]">
        <button type="submit" className={textLinkClasses({ tone: "white" })}>
          {t.search.submit}
        </button>
      </div>
    </form>
  );
}
