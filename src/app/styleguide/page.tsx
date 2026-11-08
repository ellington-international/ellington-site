// TEMPORARY design-token check page for the redesign (steps 1–11).
// Not linked anywhere, not in the sitemap, noindex. Delete before merging the
// redesign branch (REDESIGN-PLAN.md step 24).
import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Tag, Stat, DetailRow, InfoBox } from "@/components/ui/SmallParts";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Band } from "@/components/ui/Band";
import { ChipDemo, OverlayDemo } from "./StyleguideDemos";

export const metadata: Metadata = {
  title: "Styleguide (temporary)",
  robots: { index: false, follow: false },
};

const COLOURS = [
  { name: "brand/blue", v: "--brand-blue", hex: "#154166" },
  { name: "brand/blue-deep", v: "--brand-blue-deep", hex: "#0f3352" },
  { name: "brand/accent", v: "--brand-accent", hex: "#978a7a" },
  { name: "text/body", v: "--body-text", hex: "#3d5670" },
  { name: "text/muted", v: "--muted-text", hex: "#5b7189" },
  { name: "surface/white", v: "--surface-white", hex: "#ffffff" },
  { name: "surface/light", v: "--surface-light", hex: "#e8eef4" },
  { name: "line/hairline", v: "--line-hairline", hex: "#d5dee7" },
];

const TYPE = [
  { cls: "type-h1", label: "Heading/H1 · Cormorant Medium Italic · 80 / 48", sample: "Where the Riviera becomes home" },
  { cls: "type-h2", label: "Heading/H2 · Cormorant Medium Italic · 56 / 40", sample: "Featured properties" },
  { cls: "type-title", label: "Heading/Title · Cormorant Medium · 36 / 24", sample: "Energy performance" },
  { cls: "type-h3", label: "Heading/H3 · Cormorant Medium · 24 / 21", sample: "Villa d'exception à Port-Grimaud" },
  { cls: "type-figure", label: "Heading/Figure · Cormorant Medium · 44 / 34", sample: "2023" },
  { cls: "type-number", label: "Number/Display · Cormorant Bold Italic · 64 / 48", sample: "01" },
  { cls: "type-subtitle", label: "Text/Subtitle · Cormorant Medium · 26 / 22", sample: "A selection of the exceptional homes we currently represent." },
  { cls: "type-price", label: "Text/Price · Cormorant Regular · 20", sample: "€7.0M" },
  { cls: "type-body", label: "Text/Body · Inter Light · 15 / 1.7", sample: "We tell you what we really think about price — you keep the final word. Based in Gassin, from Les Issambres to Le Lavandou." },
  { cls: "type-value", label: "Text/Value · Inter Light · 15 / 1.5", sample: "504 m²" },
  { cls: "type-input", label: "Text/Input · Inter Light · 14", sample: "john.smith@example.com" },
  { cls: "type-small", label: "Text/Small · Inter Light · 13 / 1.6", sample: "25 April 2026 · 6 min" },
  { cls: "type-eyebrow", label: "Caps/Eyebrow · Inter Regular · 12 · .2em", sample: "The Ellington standard" },
  { cls: "type-label", label: "Caps/Label · Inter Regular · 11 · .2em", sample: "Bedrooms" },
  { cls: "type-button", label: "Caps/Button · Inter Regular · 12 · .2em", sample: "View entire portfolio →" },
];

const SPACING = [
  { name: "space/margin", v: "--space-margin", d: 100, m: 28 },
  { name: "space/gutter", v: "--space-gutter", d: 72, m: 20 },
  { name: "space/section", v: "--space-section", d: 144, m: 96 },
  { name: "space/gap", v: "--space-gap", d: 32, m: 20 },
  { name: "space/stack", v: "--space-stack", d: 24, m: 20 },
  { name: "space/sm", v: "--space-sm", d: 14, m: 14 },
  { name: "space/xs", v: "--space-xs", d: 8, m: 8 },
  { name: "nav/height", v: "--nav-height", d: 80, m: 68 },
  { name: "button/pad-x", v: "--button-pad-x", d: 22, m: 22 },
  { name: "button/pad-y", v: "--button-pad-y", d: 14, m: 14 },
];

export default function StyleguidePage() {
  return (
    <div className="pt-nav">
      {/* Container demo: the light band shows the side margins, the white box the 1240 content width */}
      <section className="bg-surface-light">
        <div className="container-wrap section-y">
          <div className="bg-surface border border-hairline p-stack">
            <p className="type-eyebrow mb-xs">Temporary · redesign steps 1–11</p>
            <h1 className="type-h2">Styleguide</h1>
            <p className="type-body mt-stack max-w-[60ch]">
              Compare with the Figma page “Foundations”. This white box is the
              content container (<code>.container-wrap</code>): max 1240 px with
              100 px side margins on desktop, 28 px on mobile (below 768 px).
              The light-blue band uses <code>.section-y</code> (144 / 96 px).
            </p>
          </div>
        </div>
      </section>

      <section className="container-wrap section-y">
        <h2 className="type-title mb-stack">Colours</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gap">
          {COLOURS.map((c) => (
            <div key={c.v}>
              <div className="h-20 border border-hairline" style={{ background: `var(${c.v})` }} />
              <p className="type-label mt-sm">{c.name}</p>
              <p className="type-small">{c.hex} · <code>{c.v}</code></p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wrap pb-section">
        <h2 className="type-title mb-stack">Text styles</h2>
        <div className="flex flex-col">
          {TYPE.map((t) => (
            <div key={t.cls} className="border-t border-hairline py-stack grid md:grid-cols-[280px_1fr] gap-sm md:gap-gutter">
              <p className="type-small">
                <code>.{t.cls}</code>
                <br />
                {t.label}
              </p>
              <p className={t.cls}>{t.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step 5: Figma "Button" (5:29) and "Link" (2048:48). Hover to see the hover states. */}
      <section className="container-wrap pb-section">
        <h2 className="type-title mb-xs">Buttons &amp; links</h2>
        <p className="type-small mb-stack">Hover each one to see its Figma hover state.</p>
        <div className="grid md:grid-cols-2">
          <div className="bg-surface border border-hairline p-stack md:p-gutter flex flex-col gap-stack">
            <p className="type-label">On white</p>
            <div className="flex flex-wrap items-center gap-sm">
              <ButtonLink href="#" variant="primary">Primary</ButtonLink>
              <ButtonLink href="#" variant="outline">Outline</ButtonLink>
              <ButtonLink href="#" variant="outline" size="compact">Compact (nav)</ButtonLink>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
            <div>
              <TextLink href="#">View all →</TextLink>
            </div>
          </div>
          <div className="bg-brand-blue p-stack md:p-gutter flex flex-col gap-stack">
            <p className="type-label text-white/85">On photo / blue</p>
            <div className="flex flex-wrap items-center gap-sm">
              <ButtonLink href="#" variant="white">White</ButtonLink>
              <ButtonLink href="#" variant="ghost">Ghost</ButtonLink>
              <ButtonLink href="#" variant="ghost" size="compact">Compact (nav)</ButtonLink>
            </div>
            <div>
              <TextLink href="#" tone="white">View all →</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* Step 10: small parts */}
      <section className="container-wrap pb-section flex flex-col gap-section">
        <div>
          <h2 className="type-title mb-stack">Section header</h2>
          <div className="flex flex-col gap-gutter">
            <SectionHeader
              eyebrow="Selection"
              title="Featured properties"
              subtitle="A selection of the exceptional homes we currently represent."
              action={<TextLink href="#">View entire portfolio →</TextLink>}
            />
            <SectionHeader
              align="center"
              eyebrow="Journal"
              title="Stories from the Golfe"
              subtitle="Buyer's guides, market analyses and Riviera lifestyle."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-gutter">
          <div>
            <h2 className="type-title mb-stack">Chip (category filter)</h2>
            <p className="type-small mb-stack">Click to change the active one; hover the others.</p>
            <ChipDemo />
          </div>
          <div>
            <h2 className="type-title mb-stack">Tag (property feature)</h2>
            <div className="flex flex-wrap gap-xs">
              <Tag>Swimming pool</Tag>
              <Tag>Sea view</Tag>
              <Tag>Air conditioning</Tag>
              <Tag>Garage</Tag>
            </div>
          </div>
        </div>

        <div>
          <h2 className="type-title mb-stack">Stat</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gap">
            <Stat figure="2023" label="Founded" />
            <Stat figure="9" label="Villages" />
            <Stat figure="30+" label="Years on the Riviera" />
            <Stat figure="4" label="Languages" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-gutter">
          <div>
            <h2 className="type-title mb-stack">Detail row</h2>
            <dl className="border-t border-hairline">
              <DetailRow label="Bedrooms" value="7" />
              <DetailRow label="Bathrooms" value="7" />
              <DetailRow label="Living area" value="504 m²" />
              <DetailRow label="Land" value="3,016 m²" />
            </dl>
          </div>
          <div>
            <h2 className="type-title mb-stack">Info box</h2>
            <div className="flex flex-col gap-gutter">
              <InfoBox title="Confidential service">
                <p>
                  All enquiries are handled with the strictest discretion. Our international
                  clientele values our commitment to confidentiality.
                </p>
              </InfoBox>
              <InfoBox title="Interested in this property?">
                <p>Ask for the full file or a private viewing.</p>
                <ButtonLink href="#" variant="primary" className="self-start">Request information</ButtonLink>
              </InfoBox>
            </div>
          </div>
        </div>

        <div>
          <h2 className="type-title mb-stack">Thank-you overlay (step 11)</h2>
          <p className="type-small mb-stack">
            Closes with Close, Esc, or a click on the dark area. Also on the real forms:
            /contact?test (dev only, nothing is sent) and the newsletter at the bottom of Home.
          </p>
          <OverlayDemo />
        </div>
      </section>

      {/* Step 10: closing bands (full width) */}
      <Band
        variant="light"
        title="Discover the true value of your property"
        subtitle="Thinking about selling, or simply curious what your property is worth today? We will give you an honest figure."
      >
        <TextLink href="#">Request your confidential valuation →</TextLink>
      </Band>
      <Band
        variant="light"
        title="Let’s find your property"
        subtitle="Buying, selling or valuing — tell us what you have in mind."
      >
        <ButtonLink href="#" variant="primary">View properties</ButtonLink>
        <ButtonLink href="#" variant="outline">Contact us</ButtonLink>
      </Band>
      <Band
        variant="blue"
        title="Your local expert in this region"
        subtitle="We live and work in the Golfe — ask us anything about this village."
      >
        <TextLink href="#" tone="white">Request a consultation</TextLink>
      </Band>

      <section className="relative bg-brand-blue-deep on-photo">
        <div className="container-wrap py-section">
          <p className="type-eyebrow mb-xs">on-photo</p>
          <h2 className="type-h2">White text on a photo or dark band</h2>
          <p className="type-body mt-stack max-w-[60ch]">
            Inside <code>.on-photo</code> every type style turns white; labels at 85 %.
          </p>
          <p className="type-label mt-stack">Caps/Label on photo</p>
        </div>
      </section>

      <section className="container-wrap section-y">
        <h2 className="type-title mb-stack">Spacing (current mode)</h2>
        <p className="type-small mb-stack">
          Bars show the live value: resize the window below 768 px to see the Mobile mode.
        </p>
        <div className="flex flex-col gap-sm">
          {SPACING.map((s) => (
            <div key={s.v} className="grid grid-cols-[150px_1fr] md:grid-cols-[220px_1fr] items-center gap-sm">
              <p className="type-small">
                {s.name} · {s.d} / {s.m}
              </p>
              <div className="h-3 bg-brand-accent" style={{ width: `var(${s.v})` }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
