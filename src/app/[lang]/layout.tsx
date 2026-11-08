import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../globals.css";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { LOCALES, isLang } from "@/lib/locale";
import { OG_LOCALE } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

// Fonts from the Figma text styles. Both are Google *variable* fonts: one file
// per style covers every weight, so no `weight` list is needed.
// Inter (sans) — Light 300 for text, Regular 400 for caps/labels/buttons.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Cormorant Garamond (serif) — Regular 400 (price), Medium 500 (headings,
// italic for H1/H2), Bold Italic 700 (Number/Display). Variable 300–700, in
// normal + italic: 2 files instead of the previous 10 static ones.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Site-wide defaults per language (pages add their own title, canonical and
// hreflang). FR = the previous texts; EN / NL drafted in step 12.
// TODO client review (FR + NL)
const SITE_COPY: Record<Lang, { title: string; description: string; short: string }> = {
  fr: {
    title: "Ellington Properties — Immobilier de prestige · Golfe de Saint-Tropez",
    description:
      "Ellington Properties, agence immobilière de prestige spécialisée dans les biens d'exception sur le Golfe de Saint-Tropez. Saint-Tropez, Grimaud, Port Grimaud, Ramatuelle, Gassin, Sainte-Maxime.",
    short: "Biens d'exception dans le Golfe de Saint-Tropez.",
  },
  en: {
    title: "Ellington Properties — Luxury real estate · Golfe de Saint-Tropez",
    description:
      "Ellington Properties, a luxury real estate agency specialising in exceptional homes in the Golfe de Saint-Tropez: Saint-Tropez, Grimaud, Port Grimaud, Ramatuelle, Gassin, Sainte-Maxime.",
    short: "Exceptional homes in the Golfe de Saint-Tropez.",
  },
  nl: {
    title: "Ellington Properties — Exclusief vastgoed · Golfe de Saint-Tropez",
    description:
      "Ellington Properties, makelaar in exclusief vastgoed in de Golfe de Saint-Tropez: Saint-Tropez, Grimaud, Port Grimaud, Ramatuelle, Gassin, Sainte-Maxime.",
    short: "Uitzonderlijke woningen in de Golfe de Saint-Tropez.",
  },
};

// The three language versions are pre-rendered: /en, /fr, /nl.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "fr";
  const c = SITE_COPY[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.title, template: "%s | Ellington Properties" },
    description: c.description,
    applicationName: "Ellington Properties",
    authors: [{ name: "Ellington Properties" }],
    openGraph: {
      title: c.title,
      description: c.short,
      type: "website",
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      siteName: "Ellington Properties",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ellington Properties — Golfe de Saint-Tropez" }],
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.short, images: ["/og.jpg"] },
    // Favicons come from the square app/ convention files (favicon.ico, icon.png,
    // apple-icon.png) — no manual override here, so Google gets a clean square mark.
  };
}

// Root layout, one level below app/ so it knows the language from the URL:
// <html lang> and every component render in that language on the server.
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html
      lang={lang}
      // Smooth scrolling (globals.css) only for in-page links like the hero
      // Scroll cue; page-to-page navigation stays instant (Next.js 16).
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={[organizationSchema(), websiteSchema(lang)]} />
        <LanguageProvider lang={lang}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
          <ScrollReveal />
        </LanguageProvider>
      </body>
    </html>
  );
}
