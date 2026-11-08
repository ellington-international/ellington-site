import type { Metadata } from "next";
import { getCities, getProperties } from "@/lib/properties";
import { PropertiesPageContent } from "@/components/PropertiesPageContent";
import { asLang } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(asLang((await params).lang), "properties", "/properties");
}

export default async function PropertiesPage() {
  const [properties, cities] = await Promise.all([
    getProperties({ category: "sale" }),
    getCities(),
  ]);
  return <PropertiesPageContent properties={properties} cities={cities} />;
}
