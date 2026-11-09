"use client";

import { useLanguage } from "./LanguageProvider";
import { reveal } from "./ui/Reveal";
import { ENERGY_CLASSES, energyInfo, type EnergyClass } from "@/lib/energy";
import type { Property } from "@/lib/types";

// Figma "03 Property" › Energy performance (11:119 / mobile 11:387):
// two A–G scales side by side (40px apart; mobile stacked, 32 apart), each:
// Caps/Label title, 16px, scale, 16px, value in Text/Body.
// Scale: 7 columns 4px apart, aligned at the bottom; each = bar + key letter
// (Caps/Label) 8px below. Inactive bar 8px high in the class colour at 50 %,
// key muted at 60 %; the property's class: 32px bar in the full colour with
// the letter inside (Inter Medium 15, #142640), key in brand/blue.
// Note under both (Text/Small muted): estimated annual energy costs.
// No data at all → greyed scales + "Diagnosis in progress".
// Colours = the official French DPE / GES label colours, as in Figma.
const DPE_COLORS: Record<EnergyClass, string> = {
  A: "#009c6d",
  B: "#52b153",
  C: "#a5cc74",
  D: "#f4e70f",
  E: "#f0b40f",
  F: "#eb8235",
  G: "#d7221f",
};
const GES_COLORS: Record<EnergyClass, string> = {
  A: "#f6edfd",
  B: "#e4c7fb",
  C: "#d5aaf6",
  D: "#cb95f3",
  E: "#ba72f0",
  F: "#a74eeb",
  G: "#8a19df",
};

function Scale({
  label,
  active,
  colors,
  value,
}: {
  label: string;
  active?: EnergyClass;
  colors: Record<EnergyClass, string>;
  value?: string;
}) {
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-[16px]">
      <p className="type-label">{label}</p>
      <div className="flex items-end gap-[4px]" role="img" aria-label={active ? `${label}: ${active}` : label}>
        {ENERGY_CLASSES.map((c) => {
          const on = c === active;
          return (
            <div key={c} className="flex-1 min-w-0 flex flex-col items-center gap-[8px]" aria-hidden>
              {on ? (
                <div
                  className="w-full h-[32px] flex items-center justify-center font-sans font-medium text-[15px] leading-[1.5] text-[#142640]"
                  style={{ backgroundColor: colors[c] }}
                >
                  {c}
                </div>
              ) : (
                <div className="w-full h-[8px]" style={{ backgroundColor: colors[c], opacity: 0.5 }} />
              )}
              <span className={`type-label ${on ? "text-brand-blue" : "opacity-60"}`}>{c}</span>
            </div>
          );
        })}
      </div>
      {value && <p className="type-body text-brand-blue">{value}</p>}
    </div>
  );
}

export function EnergyDiagnostics({ property }: { property: Property }) {
  const { t, lang } = useLanguage();
  const pd = t.propertyDetail;
  const e = energyInfo(property);
  const euro = (n: number) =>
    new Intl.NumberFormat(lang === "fr" ? "fr-FR" : lang === "nl" ? "nl-NL" : "en-GB", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section className="flex flex-col gap-[20px] md:gap-[24px]">
      <h2 className="type-h2" {...reveal}>{pd.energyTitle}</h2>
      <div className="flex flex-col md:flex-row gap-[32px] md:gap-[40px]" {...reveal}>
        <Scale
          label={pd.energyClass}
          active={e.energyClass}
          colors={DPE_COLORS}
          value={e.energyValue != null ? pd.energyValue(e.energyValue) : undefined}
        />
        <Scale
          label={pd.ghgClass}
          active={e.ghgClass}
          colors={GES_COLORS}
          value={e.ghgValue != null ? pd.ghgValue(e.ghgValue) : undefined}
        />
      </div>
      {e.hasData ? (
        e.costMin != null &&
        e.costMax != null && <p className="type-small text-muted" {...reveal}>{pd.energyCost(euro(e.costMin), euro(e.costMax), e.costYear)}</p>
      ) : (
        <p className="type-small text-muted" {...reveal}>{pd.energyUnavailable}</p>
      )}
    </section>
  );
}
