import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ellington Properties — Immobilier de prestige · Golfe de Saint-Tropez",
    template: "%s | Ellington Properties",
  },
  description:
    "Ellington Properties, agence immobilière de prestige spécialisée dans les biens d'exception sur le Golfe de Saint-Tropez. Saint-Tropez, Grimaud, Port Grimaud, Ramatuelle, Gassin, Sainte-Maxime.",
  applicationName: "Ellington Properties",
  authors: [{ name: "Ellington Properties" }],
  openGraph: {
    title: "Ellington Properties — Immobilier de prestige · Golfe de Saint-Tropez",
    description: "Biens d'exception dans le Golfe de Saint-Tropez.",
    type: "website",
    locale: "fr_FR",
    siteName: "Ellington Properties",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ellington Properties — Golfe de Saint-Tropez",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ellington Properties — Immobilier de prestige · Golfe de Saint-Tropez",
    description: "Biens d'exception dans le Golfe de Saint-Tropez.",
    images: ["/og.jpg"],
  },
  // Favicons come from the square app/ convention files (favicon.ico, icon.png,
  // apple-icon.png) — no manual override here, so Google gets a clean square mark.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <LanguageProvider>
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
