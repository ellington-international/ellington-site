import type { Metadata } from "next";
import { LocationsIndexContent } from "@/components/LocationsIndexContent";
import { asLang } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(asLang((await params).lang), "locations", "/locations");
}

export default function LocationsPage() {
  return <LocationsIndexContent />;
}
