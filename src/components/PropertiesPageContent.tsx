"use client";

import { PropertiesBrowser } from "./PropertiesBrowser";
import { useLanguage } from "./LanguageProvider";
import type { Property } from "@/lib/types";

export function PropertiesPageContent({
  properties,
  cities,
}: {
  properties: Property[];
  cities: string[];
}) {
  const { t } = useLanguage();
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12 text-center">
        <h1 className="type-h1 mb-5">
          {t.propertiesPage.titleBefore} {t.propertiesPage.titleAccent}
        </h1>
        <p className="type-subtitle max-w-2xl mx-auto">
          {t.propertiesPage.subtitle}
        </p>
      </div>

      <PropertiesBrowser properties={properties} cities={cities} />
    </div>
  );
}
