import type { Metadata } from "next";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { asLang } from "@/lib/locale";
import { HOME_LABEL, pageMetadata } from "@/lib/seo";
import SellContent from "./SellContent";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(asLang((await params).lang), "sell", "/sell");
}

export default async function SellPage({ params }: Props) {
  const lang = asLang((await params).lang);
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: HOME_LABEL[lang], path: `/${lang}` },
          { name: { fr: "Vendre", en: "Sell", nl: "Verkopen" }[lang], path: `/${lang}/sell` },
        ])}
      />
      <SellContent />
    </>
  );
}
