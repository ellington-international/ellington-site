"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "./PropertyCard";
import { hasPrice } from "@/lib/properties";
import type { Property } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { Dropdown } from "./ui/Dropdown";
import { reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { textLinkClasses } from "./ui/TextLink";
import { PRICE_RANGES, filterOptions, normalizeCity } from "@/lib/filters";
import { cardGridCls } from "@/components/ui/card";

// Case- and accent-insensitive comparison so "ramatuelle", "Ramatuelle"
// and "RAMATUELLE" all match (client feedback). Cities match exactly, so
// "Grimaud" doesn't also show the Port Grimaud listings.
const normalize = normalizeCity;

export function PropertiesBrowser(props: {
  properties: Property[];
  cities: string[];
}) {
  return (
    <Suspense fallback={null}>
      <PropertiesBrowserInner {...props} />
    </Suspense>
  );
}

function PropertiesBrowserInner({
  properties,
  cities,
}: {
  properties: Property[];
  cities: string[];
}) {
  const { t } = useLanguage();
  const params = useSearchParams();
  const initialPriceIdx = (() => {
    const min = Number(params.get("minPrice") || 0);
    const max = Number(params.get("maxPrice") || Infinity);
    const idx = PRICE_RANGES.findIndex((r) => r.min === min && r.max === max);
    return idx >= 0 ? idx : 0;
  })();

  // Resolve the incoming ?city= term (often free-typed in the hero search) to a
  // real city option, case/accent-insensitively, so the dropdown selects it.
  const initialCity = (() => {
    const raw = params.get("city") ?? "";
    if (!raw) return "";
    const n = normalize(raw);
    return (
      cities.find((c) => normalize(c) === n) ??
      cities.find((c) => normalize(c).includes(n)) ??
      raw
    );
  })();

  const [city, setCity] = useState<string>(initialCity);
  const [type, setType] = useState<string>(params.get("type") ?? "");
  const [priceIdx, setPriceIdx] = useState<number>(initialPriceIdx);
  const [beds, setBeds] = useState<number>(Number(params.get("beds") || 0));

  // A ?city= that isn't in the list (free text from an old link) still filters,
  // and is shown as its own option so the dropdown displays it.
  const cityList = city && !cities.includes(city) ? [city, ...cities] : cities;
  const opts = filterOptions(t, cityList);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES[priceIdx];
    return properties.filter((p) => {
      if (city && normalize(p.city) !== normalize(city)) return false;
      if (type && p.type !== type) return false;
      if (beds > 0 && p.bedrooms < beds) return false;
      // A budget leaves out "Price on request" listings (they show under "All prices")
      if (range.key !== "all" && (!hasPrice(p) || p.price < range.min || p.price > range.max)) return false;
      return true;
    });
  }, [properties, city, type, priceIdx, beds]);

  const reset = () => {
    setCity("");
    setType("");
    setPriceIdx(0);
    setBeds(0);
  };

  // Figma "02 Buy" › Content (10:6 / mobile 10:223), inside the 1240 container:
  //   Filter: 4 Search fields (light) + Primary "Search" (padding 28 × 14) in
  //     one row, 14px apart, aligned at the bottom; mobile 2 × 2, 12px apart,
  //     full-width button.
  //   Toolbar 40px below (mobile 32): count in Text/Small muted, 16px padding,
  //     hairline below.
  //   Grid 40px below (mobile 32): 3 / 2 / 1 columns (cardGridCls).
  // The list updates live as filters change; the button scrolls to the results.
  return (
    <div className="container-wrap">
      {/* relative z-20: the open dropdown lists stay above the revealed cards */}
      <div className="relative z-20 grid grid-cols-2 md:grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-[12px] md:gap-[14px] items-end" {...reveal}>
        <Dropdown label={t.search.location} value={city} onChange={setCity} options={opts.location} />
        <Dropdown label={t.search.type} value={type} onChange={setType} options={opts.type} />
        <Dropdown
          label={t.search.budget}
          value={String(priceIdx)}
          onChange={(v) => setPriceIdx(Number(v))}
          options={opts.budget}
        />
        <Dropdown
          label={t.search.bedrooms}
          value={String(beds)}
          onChange={(v) => setBeds(Number(v))}
          options={opts.bedrooms}
        />
        <Button
          variant="primary"
          className="col-span-2 md:col-span-1 px-[28px]!"
          onClick={() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })}
        >
          {t.search.submit}
        </Button>
      </div>

      <div id="results" className="scroll-mt-nav">
        <p className="mt-[32px] md:mt-[40px] py-[16px] border-b border-hairline type-small text-muted" aria-live="polite" {...reveal}>
          {t.search.results(filtered.length)}
        </p>

        {filtered.length === 0 ? (
          <div className="py-section flex flex-col items-center gap-[24px] text-center" {...reveal}>
            <p className="type-subtitle">{t.search.noResults}</p>
            <button type="button" onClick={reset} className={textLinkClasses()}>
              {t.search.noResultsCta}
            </button>
          </div>
        ) : (
          <div className={`${cardGridCls} mt-[32px] md:mt-[40px]`}>
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
