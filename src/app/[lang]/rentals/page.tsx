import type { Metadata } from "next";
import { getProperties } from "@/lib/properties";
import { RentalsPageContent } from "@/components/RentalsPageContent";
import { asLang } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(asLang((await params).lang), "rentals", "/rentals");
}

export default async function RentalsPage() {
  const properties = await getProperties({ category: "rent" });
  const cities = [...new Set(properties.map((p) => p.city))]
    .filter(Boolean)
    .sort();
  return <RentalsPageContent properties={properties} cities={cities} />;
}
