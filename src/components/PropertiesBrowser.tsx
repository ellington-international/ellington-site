"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "./PropertyCard";
import type { Property } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import { Dropdown } from "./ui/Dropdown";
import { Button } from "./ui/Button";
import { PRICE_RANGES, filterOptions } from "@/lib/filters";

// Case- and accent-insensitive normalisation so "ramatuelle", "Ramatuelle"
// and "RAMATUELLE" all match (client feedback).
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

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
      if (city && !normalize(p.city).includes(normalize(city))) return false;
      if (type && p.type !== type) return false;
      if (beds > 0 && p.bedrooms < beds) return false;
      if (p.price < range.min || p.price > range.max) return false;
      return true;
    });
  }, [properties, city, type, priceIdx, beds]);

  const reset = () => {
    setCity("");
    setType("");
    setPriceIdx(0);
    setBeds(0);
  };

  return (
    <div>
      {/* FILTERS — Figma "02 Buy" › Filter: 4 dropdowns + Search button.
          Desktop one row (gap 14, button at the bottom); mobile 2 × 2 (gap 12)
          with a full-width button. The list updates live; the button scrolls
          to the results. */}
      <div className="bg-[var(--panel)] mb-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 grid grid-cols-2 md:grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-[12px] md:gap-[14px] items-end">
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
            className="col-span-2 md:col-span-1 h-[42px]"
            onClick={() =>
              document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t.search.submit}
          </Button>
        </div>
      </div>

      <div id="results" className="max-w-[1400px] mx-auto px-6 md:px-10 scroll-mt-28">
        <p className="text-sm text-muted mb-8">
          {t.search.results(filtered.length)}
        </p>

        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif text-2xl italic mb-4">
              {t.search.noResults}
            </p>
            <button
              onClick={reset}
              className="text-[11px] tracking-[0.22em] uppercase text-accent border-b border-accent pb-1"
            >
              {t.search.noResultsCta}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
