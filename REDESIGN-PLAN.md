# Ellington redesign plan

Source of truth: Figma file `HuwxKn1GP5t95FTtrBwtEK` (approved by the client).
Pages: **Website — Desktop** (1440 px frames) and **Website — Mobile** (390 px frames).
Branch: `redesign`. Written 6 November 2026.

Each step below is small enough to check in the browser (`npm run dev`) before
moving on. Do one step, check desktop and mobile against the Figma frame, commit, then go to the next.

---

## 0. Map of the project (for orientation)

| What | Where |
|---|---|
| Pages (routes) | `src/app/[lang]/<route>/page.tsx` (since step 12; `[lang]` = en / fr / nl). Most pages are a thin server file plus a client `…Content.tsx` that renders the UI |
| Shared layout (header, footer, fonts, `<html lang>`) | `src/app/[lang]/layout.tsx` |
| Components | `src/components/*.tsx` |
| Colours, type scale, global CSS | `src/app/globals.css` (Tailwind 4, configured inside the CSS. There is no `tailwind.config.js`) |
| Fonts | `src/app/layout.tsx` via `next/font/google`: Cormorant Garamond (serif) + Inter (sans) |
| UI translations FR/EN/NL | `src/lib/i18n.ts` (one big `dict` with `fr`, `en`, `nl`) |
| Current language | From the URL: `src/proxy.ts` (redirects), `src/lib/locale.ts` (helpers), `LanguageProvider.tsx` (gets `lang` from the layout), `LanguageToggle.tsx`, `LocaleLink.tsx` (links keep the language), `src/lib/seo.ts` (per-language titles + hreflang) |
| Hard-coded per-language strings (outside i18n) | `HomeContent.tsx`, `BlogIndexContent.tsx`, `BlogPostShell.tsx`, `PropertiesBrowser.tsx`, `ContactForm.tsx`, `LocationDetail.tsx`, `LocationsIndexContent.tsx` |
| Blog articles | `content/blog/*.mdx` (French only), read by `src/lib/blog.ts` (server) / `blog-shared.ts` (client-safe) |
| Location (village) texts | `src/lib/properties.ts` → `locations` array (9 villages, FR + EN fields, **no NL**); rich Saint-Tropez content in `src/lib/location-content.ts` (FR + EN, **no NL**) |
| Location images | `public/locations/…` |
| Apimo (listings) | `src/lib/apimo.ts` (API calls + mapping) → `src/lib/properties.ts` (`getProperties`, `getProperty`, mock fallback) |
| Supabase (login + favourites) | `src/lib/supabase/{client,server,proxy}.ts`, `src/app/actions/{auth,favorites}.ts`, `src/app/auth/callback/route.ts`, `proxy.ts`, `supabase/schema.sql` (proxy: `src/proxy.ts`) |
| Contact form | `src/components/ContactForm.tsx` (FormSubmit → marc@ellington-international.com) |
| Secrets | `.env.local` (git-ignored). Template in `.env.example` |

---

## 1. Figma tokens vs. current code

### 1.1 Colours (Figma collection "Color", one mode)

| Figma variable | Value | Role in Figma | Current code (`globals.css`) |
|---|---|---|---|
| `brand/blue` | `#154166` | headings, buttons, links, logo | `--accent` / `--foreground` / `--brand-navy` = `#1a2744` |
| `brand/blue-deep` | `#0f3352` | hover, footer base | `--accent-hover` = `#0f1726` |
| `brand/accent` | `#978a7a` | champagne. Fine accents only (hover underline, numbers, step lines, quote line, active chip) | `--gold` = `#c9a96e` (+ `--gold-hover`) |
| `text/body` | `#3d5670` | body copy | none. Body uses `--foreground` `#1a2744` |
| `text/muted` | `#5b7189` | small text, labels | `--muted` `#9a9a9a`, `--muted-strong` `#5a6b86` |
| `surface/white` | `#ffffff` | page background | `--background` (+ `--background-elev`, `--background-card`) |
| `surface/light` | `#e8eef4` | page heads, closing bands | `--panel` `#ebeef5` |
| `line/hairline` | `#d5dee7` | hairlines, borders, inputs | `--border` `#d9d9d9`, `--border-strong` `#c2c2c2` |
| — | — | not in Figma | `--link` `#004bc1`, `--link-hover` (remove: links use `brand/blue`) |

In short: every colour changes slightly, and Figma separates **heading blue** from **body blue-grey**, which the code does not do today.

### 1.2 Typography (Figma collection "Type", modes Desktop / Mobile + 16 text styles)

| Figma text style | Font | Desktop / Mobile | Line height | Closest current class |
|---|---|---|---|---|
| Heading/H1 | Cormorant Medium *Italic* | 80 / 48 | 1.05 | `.type-h1` 52/40, **uppercase**, 0.1em tracking |
| Heading/H2 | Cormorant Medium *Italic* | 56 / 40 | 1.1 | `.type-h2` 40/36, SemiBold, **uppercase** |
| Heading/Title | Cormorant Medium | 36 / 24 | 1.2 | none |
| Heading/H3 (+ "· Underline") | Cormorant Medium | 24 / 21 | 1.25 | `.type-h3` 30/26 italic, `.type-h4` 22/20 |
| Heading/Figure | Cormorant Medium | 44 / 34 | 1.0 | none |
| Number/Display | Cormorant Bold *Italic* | 64 / 48 | 1.0 | none |
| Text/Subtitle | Cormorant Medium | 26 / 22 | 1.3 | none (`.type-subhead` is a different thing: 12 px Inter caps) |
| Text/Price | Cormorant Regular | 20 | 1.4 | `.type-card-title` 20 Medium |
| Text/Body | Inter Light | 15 | 1.7 | global `p` 14/1.75, `.type-body` 16/32 weight 200 |
| Text/Value | Inter Light | 15 | 1.5 | none |
| Text/Input | Inter Light | 14 | 1.4 | global `input` 13 |
| Text/Small | Inter Light | 13 | 1.6 | `.type-body-sm` 14 |
| Caps/Eyebrow | Inter Regular, UPPER, 0.2em | 12 | 1.4 | `.type-eyebrow` 10 SemiBold, 0.3em, gold |
| Caps/Label | Inter Regular, UPPER, 0.2em | 11 | 1.4 | `.type-caption` 12, 2px |
| Caps/Button | Inter Regular, UPPER, 0.2em | 12 | 1.0 | `.type-button` 12 Light, 2px |

Other findings:
- The code has **two competing type scales**: Tailwind `--text-h1…` tokens in `@theme` (64/48/32…) and the `.type-*` classes (52/40/30…). The redesign replaces both with one scale taken from Figma.
- Headings in Figma are **sentence case**, not uppercase.
- **Decided:** follow the Figma **text styles and variables** (italic H1/H2, 80/48 and 56/40, price Cormorant 20). The notes on the Figma *Foundations* page ("H1 64/40, no italic, price Inter 16") are outdated. Ignore them.
- Fonts: same two families, so `layout.tsx` only needs its weights adjusted (Cormorant 400, 500, 500 italic, 700 italic. Weights 300/600 can go).

### 1.3 Layout & spacing (Figma collection "Layout", modes Desktop / Mobile)

| Variable | Desktop | Mobile | Current code |
|---|---|---|---|
| `frame/width` | 1440 | 390 | — |
| `wrap/max` (content width) | 1240 | 334 | ad-hoc `max-w-*` per component |
| `space/margin` (side margin) | 100 | **28** (decided. Its Figma description saying 20 is outdated) | ad-hoc `px-*` |
| `space/gutter` | 72 | 20 | — |
| `space/section` (vertical section padding) | 144 | 96 | ad-hoc `py-*` |
| `space/gap` | 32 | 20 | — |
| `space/stack` | 24 | 20 | — |
| `space/sm` / `space/xs` | 14 / 8 | 14 / 8 | — |
| `nav/height` | 80 | 68 | — |
| `button/pad-x` / `pad-y` | 22 / 14 | 22 / 14 | — |
| `radius/none` | 0 | 0 | mostly square already |

The code has no spacing tokens today. Every section picks its own Tailwind padding.
**Breakpoint proposal:** Mobile values below `768px` (Tailwind `md`, already used in `globals.css`), Desktop values from `768px`. The 1240 px wrap is centred on wider screens.

### 1.4 Figma components → code

| Figma component | Code today |
|---|---|
| Navigation (4 variants: over photo / solid × desktop/mobile) + "00 Menu — Mobile" | `Header.tsx`, `LanguageToggle.tsx`, `AuthMenu.tsx`, `Logo.tsx` |
| Footer (2) | `Footer.tsx` |
| Button (8), Link (4), Nav link (4) | no shared component. Classes repeated inline → create `src/components/ui/Button.tsx` (+ `TextLink`) |
| Filter field (2), Dropdown option (2), Search field (16) | `HeroSearch.tsx`, `PropertiesBrowser.tsx` (one native `<select>` today) |
| Input (4) | `ContactForm.tsx`, `NewsletterForm.tsx`, `AuthForm.tsx` |
| Property card (2) | `PropertyCard.tsx` |
| Journal card (2) | `BlogCard.tsx` |
| Village card (2) | inside `LocationsIndexContent.tsx` |
| Gallery (8) | `PropertyGallery.tsx` |
| Chip (4), Tag, Stat, Detail row, Info box, Line item (2) | inline markup in several pages |
| Thank-you overlays (request, newsletter) | **missing**. Success is shown inline today |

---

## 2. Step-by-step plan

Legend: **[D]** check against Desktop frame, **[M]** check against Mobile frame.

### Phase 1. Foundations: colours, type, spacing
1. **Colour tokens.** ✅ *done (commit 41a47e1).* In `globals.css`, the 8 Figma colours are the only real values. The old names (`--foreground`, `--accent`, `--gold`, `--panel`, `--link`, …) are kept as **aliases** pointing to them so existing pages don't break. Each alias is removed when the components using it are redone in Phases 2 and 4. New Tailwind classes: `bg-brand-blue`, `bg-brand-blue-deep`, `text-brand-accent`, `text-body-text`, `text-muted`, `bg-surface`, `bg-surface-light`, `border-hairline`. Default page text stays brand blue (it was navy). *Check:* layout unchanged, colours shift to the new blue / champagne / hairlines.
2. **Type scale.** ✅ *done (commit 3f48fe7).* Delete the old `--text-*` tokens and rewrite the `.type-*` classes as one class per Figma text style (`.type-h1`, `.type-h2`, `.type-title`, `.type-h3`, `.type-figure`, `.type-number`, `.type-subtitle`, `.type-price`, `.type-body`, `.type-value`, `.type-input`, `.type-small`, `.type-eyebrow`, `.type-label`, `.type-button`), with mobile sizes under `768px`. Remove the global `p { 14px }` override. **Also apply the colours per style here**: headings brand/blue, body text/body (`#3d5670`), small/labels text/muted. Add an `on-photo` modifier (white) for hero text, because hero headings currently inherit white from their container and a colour on the heading would override it. *Check:* a temporary `/styleguide` page (delete before merge) next to the Figma Foundations page.
3. **Fonts.** ✅ *done, waiting for your check.* Cormorant Garamond is loaded as a Google **variable** font (weights 300–700, normal + italic) instead of 5 static weights × 2 styles: 2 files instead of 10, every weight the styles need (400, 500, 500 italic, 700 italic) included. Inter was already variable.
4. **Spacing tokens.** ✅ *done, waiting for your check.* All Figma Layout variables as CSS variables (Desktop ≥ 768 px, Mobile below) and Tailwind utilities (`px-margin`, `py-section`, `gap-gutter`, `gap-gap`, `gap-stack`, `p-xs`, `gap-sm`, `h-nav`, `px-btn-x`, `py-btn-y`, `max-w-wrap`), plus `.container-wrap` (content max 1240, side margin 100 / 28) and `.section-y` (144 / 96). On mobile the content fills the screen minus 28 px (Figma's mobile `wrap/max` 334 is just 390 − 2 × 28, not a cap). Not used by components yet: they adopt the tokens when redone. Temporary check page: `/styleguide`.

### Phase 2. Shared parts
5. **Button + text link.** ✅ *done.* `src/components/ui/Button.tsx`: `Button` (a real `<button>`) and `ButtonLink` (a link that looks like a button), 4 Figma styles `primary` / `outline` / `white` / `ghost` with their hover states, sizes `default` (22 × 14) and `compact` (18 × 8, the nav's Contact). `src/components/ui/TextLink.tsx`: tones `blue` / `white` (underline hairline → champagne, white 50 % → white). Not in Figma: keyboard focus outline and a disabled look (60 %) for forms. Used in the navigation's Contact buttons (desktop + mobile menu). Other buttons are swapped in as their pages are redone. Check: `/styleguide` → "Buttons & links".
6. **Navigation.** ✅ *done (step 5 not done yet; the nav button styles are inline and move into `ui/Button.tsx` at step 5).* Desktop links from 1024 px; below that the mobile bar + full-screen menu. Logo = Figma crest SVG (`public/brand/crest-*.svg`) + wordmark (`LogoLockup`). Shared `.nav-link` class (champagne underline on hover / current page). Not in Figma: the language switch and Login sit under the Contact button in the mobile menu, because the mobile bar has no room for them. Over a photo the current language is white and the other two 60 % (Figma draws all three white). `Header.tsx`: transparent over photo, solid on scroll, 80/68 px high, links Buy · Sell · Locations · About, FR | EN | NL, Contact button, Login. **[M]** full-screen menu = frame "00 Menu — Mobile" (Buy, Sell, Locations, About, Journal, button, close).
7. **Footer.** ✅ *done.* `Footer.tsx` per Figma: **brand/blue** background (Figma uses blue, not blue-deep), white text; 4 columns (brand + address, Explore, Contact, Hours) from 1280 px, 2 columns from 768 px, stacked on mobile; fine print with a white line (©, Legal, Privacy, Manage cookies). Logo = `LogoLockup` white. **"Site by Z.Development" left out** (your decision, 7 Nov 2026; the old "Site réalisé par Z.Development" line is removed too). Contact city "Gassin · Var · France" in EN, "Gassin · Var · Frankrijk" in NL. Link hover (not in Figma): champagne underline. `/rentals` removed from `src/app/sitemap.ts` (the page itself stays, decision 4).
8. **Dropdown filter.** ✅ *done.* `src/components/ui/Dropdown.tsx` = Figma Search field / Filter field / Dropdown option, contexts `light` and `photo`: label above, white 42px box, Figma chevron (`public/ui/chevron-down.svg`), open = blue border + list under the box (max 174px, scrolls), option hover light blue. One open at a time (click/tap outside or focus leaving closes it); keyboard ↑ ↓ Home End Enter Esc and first-letter jump. Shared options and URL query in `src/lib/filters.ts`. **Home hero:** Location · Property type · Budget · **Bedrooms** (new) + white "Search" text link → `/properties?…` (replaces the free-text field); 1 row desktop, 2 × 2 mobile; cities from `getCities()` like the Buy page; the hero no longer clips its content (the slideshow clips itself) so open lists aren't cut off. **Buy:** same 4 dropdowns (light) + primary Search button (scrolls to results); 2 × 2 + full-width button on mobile. The Buy page layout itself is step 14. "Bedrooms" label now in i18n for FR/EN/NL (NL was missing).
9. **Cards.** ✅ *done.* `PropertyCard` (photo 4:5, location eyebrow, title max 2 lines, price in Text/Price, specs = Figma icons + numbers on a hairline), `BlogCard` (photo 4:5, the Figma "3:2" note is outdated; category, title, excerpt 3 lines, clock + date · reading time on a hairline), new `VillageCard` (photo 4:3, name, tagline) on Locations. Shared in `src/components/ui/card.ts`: hover = photo zoom 6 % + champagne title underline (also on keyboard focus); `cardGridCls` for every card grid (3 / 2 / 1 columns, columns 32 px, **rows 56 px desktop / 48 px mobile**, client feedback). **Client adjustments:** spacing inside the cards ≈ ¾ of Figma (photo → text 15 px, lines 10 px); titles take only the lines they need and price + specs (journal: date row) sit at the bottom of the card, so they line up across a row. Heart (not in Figma): square white box, thin brand-blue outline, filled when saved, light-blue hover; label in FR/EN/NL. "Exclusive" (not in Figma): square Caps/Label, white with brand-blue text. Removed: crest watermark on hover (not in Figma; client to confirm). Home featured properties = swipe track (86 % card on mobile, 2 / 3 on tablet / desktop, "← Swipe →"). Icons from Figma in `public/ui/icons/`.
10. **Small parts.** ✅ *done, waiting for your check.* `src/components/ui/SmallParts.tsx`: `Chip` (category filter: muted → hover blue + hairline → active blue + champagne line), `Tag` (blue box, white Text/Input), `Stat` (hairline, figure in H2 italic champagne, Caps/Label), `DetailRow` (label left / value right, hairline below; inside a `<dl>`), `InfoBox` (hairline, H3, content). `ui/SectionHeader.tsx` (eyebrow + H2 + subtitle, max 640; action bottom-right on desktop, below on mobile; or centred). `ui/Band.tsx`: `light` = closing band (surface/light) and `blue` = Ellington blue band (white text via `.on-photo`), centred stack max 720, actions 48px below (text link or Primary + Outline). Shown on `/styleguide`; used on the pages from Phase 4.
11. **Thank-you overlay.** ✅ *done, waiting for your check.* `src/components/ThankYouOverlay.tsx`, variants `request` ("Request received" · "Thank you" · "Your message is with us…") and `newsletter` ("Newsletter" · "Thank you" · "You're on our list…"), FR/NL drafts marked for client review. Figma card (480 px, mobile screen − 48), champagne check circle, Primary Close. Closes with Close, Esc or a click/tap on the dark veil; page scroll locked, focus kept in the card and returned afterwards; portal above header and menu. Replaces the inline success messages of `ContactForm` (also Sell valuation / village consultation, which use it) and `NewsletterForm`. **Test:** `/styleguide` buttons; `/contact?test` = dev-only dry run (no email sent, ignored in production); newsletter at the bottom of Home (no backend yet, always succeeds).

### Phase 3. Fix the language system (before redoing pages, see §5)
12. Language in the URL (§5). ✅ *done.* Routes moved to `src/app/[lang]/`. `src/proxy.ts`: `/` → 307 to `/en` (or `/fr` / `/nl` from the `lang` cookie or the browser language, `Vary: Accept-Language, Cookie`); old unprefixed URLs → 301 to `/fr/…` (query kept); `/en|nl/blog/<slug>` → 301 `/fr/blog/<slug>`; static files, `/_next`, `/auth/…` untouched. **Found:** the old `proxy.ts` sat in the project root, where Next.js ignores it when there is a `src/` folder, so it had never run (also not the Supabase session refresh); now in `src/proxy.ts`. `LanguageProvider` gets the language from the layout (no localStorage, no flash; Header `mounted` workaround removed, header state now correct in the server HTML). `LanguageToggle` = links to the same page in the other language (query kept, sets the `lang` cookie; from an article EN/NL go to the journal index). All internal links go through `LocaleLink` / `localePath` (articles always `/fr`). Per-language titles/descriptions in `src/lib/seo.ts` (EN/NL drafts, client review), canonical + hreflang en/fr/nl + x-default (home → `/`, inner pages → English version) on every public page; articles fr only. Sitemap: every page × 3 with hreflang, articles under `/fr` only, no `/rentals`. robots.txt per language. Login/signup/logout/auth callback keep the language. `llms.txt` links → `/fr/`. **After your check:** the language switch now does a full page load of the same page in the other language (nothing reused from the previous language); mobile menu raised above the cookie banner (z-65), which was covering FR/EN/NL and Login on phones; journal texts (index + article page: eyebrow, title, subtitle, chips, notice, back link, reading time, CTA) moved to `i18n.ts › journal` in FR/EN/NL (NL draft, client review), category names now come from there too; dropdowns close on touch (tap outside, same field, option, other dropdown; no close-on-blur, which Safari broke), page keeps scrolling while a list is open.

### Phase 4. Pages (one step each, desktop + mobile)
- **Shared PageHero** (between steps 13 and 14, client request). ✅ *done, waiting for your check.* `src/components/PageHero.tsx` from the Figma heroes: 820 / 760px, photo + 30 % overlay, title H1 (articles: caps line + H2) 282 / 272px from the top, subtitle max 600, optional actions (Sell: "Request a valuation"), Scroll cue (`ui/ScrollCue.tsx`, also on Home) 32 / 104px from the bottom → `#after-hero`; smooth scroll in `globals.css` (off with reduced motion) + `data-scroll-behavior="smooth"` on `<html>`. Exact Figma desktop crops via `crop` (Buy, Sell, Locations), phone crop via `position`. Used on Buy, Sell, Locations, villages (photo + tagline from the data), About, Journal, articles (cover), Contact; header transparent on all of them. Photos in `public/heroes/` (client: buy, sell, locations; from Figma for now: about, journal, contact). Texts in `i18n.ts › heroes` (FR/NL drafts, client review). Old hero photos (`/sell/hero.jpg`, `/about/hero.jpg`, `/locations/hero.jpg`) and old title keys to clean up in step 24.
13. **Home** `/` (`HomeContent.tsx`) → frames "01 Home". Hero + search, The Ellington standard (3 features), Featured properties, **Our signature** (new section replacing "Exceptional addresses"), Journal (+ Browse by category), Newsletter. ✅ *done, waiting for your check.* Hero: `public/home/hero-home.jpg` (from IMG_2176, 2880px, metadata stripped), flat 30 % overlay, 820 / 760px, title + subtitle, 4 search fields incl. Bedrooms, Search link, Scroll cue (→ #ellington-standard). The Ellington standard: statement in H1, 3 points with Figma icons (`public/ui/icons/{chat,pin,globe}.svg`), Sell with us →. Featured: hairline on top, 3 cards, swipe track (swipe hint hidden on desktop where 3 cards fill the row). Our signature: `public/home/signature.jpg` (from IMG_8044, 1800px; swap if the client prefers another photo), desktop composition from 1280px (photo bleeds left, quote box overlaps), stacked below. Journal: head + 3 cards + Browse by category (links to /blog?category=…). Newsletter: surface/light, Figma Input + Primary button, thank-you overlay. Removed: old regions section, 4th feature, navy quote band, HeroSlideshow. Copy in `i18n.ts › home` (FR/NL drafts, client review). Fixed on the way: card screen-reader labels widened the page on phones (track now `relative`); SectionHeader gap 24 / 20.
14. **Buy** `/properties` (`PropertiesPageContent`, `PropertiesBrowser`) → "02 Buy". Photo hero, filter bar, count, 3-col grid. **Remove "Sort by"** (decision 5). Listings stay in the default order. ✅ *done, waiting for your check.* PageHero (Buy photo, Figma crop). Content in the 1240 container: 4 light Search fields + Primary Search (28 × 14) in one row (mobile 2 × 2 + full-width button), 72 / 48px below the hero; toolbar with the count (Text/Small muted, 16px padding, hairline) 40 / 32px below; card grid 40 / 32px below; 144 / 96px to the footer. No panel behind the filters, no Sort by. Filters still update the list live (Search scrolls to the results); no-results state with a Reset text link. Count reads "0 properties" (EN/NL plural fix).
15. **Property detail** `/properties/[id]` (`PropertyDetailContent`, `PropertyGallery`) → "03 Property". Gallery with counter, key stats, description, features, property details, **new energy block** (§4), interested / advisor / confidential sidebar, similar properties. Restyle `loading.tsx` skeleton to match. ✅ *done, waiting for your check.* Back link, town (Caps/Eyebrow champagne), title (Heading/Title, H1) + price (Heading/Title champagne; mobile under the title). Gallery 16:9 (mobile 334 × 197) with square arrows, counter, swipe, heart top right, full-screen view; 8 thumbnails (mobile 2 × 4), current one with a champagne line. Key figures (Stat; flexible so long areas fit), Description, Features (Tag), Property details (DetailRow, 2 columns), Energy (§4), Location note (map removed, as in Figma). Aside from 1280px (stacked below): Interested? (Primary Contact us + Outline phone), Your advisor (phone / email / office hours rows with Figma icons), Confidential service (InfoBox). Similar properties + View all →. Skeleton restyled to the same layout.
16. **Sell** `/sell` (`SellContent.tsx`) → "04 Sell". Hero + button, Why Ellington?, 4 numbered steps, 4 trust cards, light-blue closing band. "Request a valuation" buttons → `/contact?subject=valuation` (decision 6). ✅ *done, waiting for your check.* PageHero + white "Request a valuation" link. Why Ellington? (H2 + subtitle | 3 paragraphs, 96px apart; stacked on mobile). Our selling process on surface/light: "Our method" + H2, Timeline (from 1024px horizontal, champagne line at 60 % between 11px dots with a surface/light ring; mobile vertical with the line on the left; "Step 01–04", H3, body). Why clients trust us: photo 4:5 (`public/sell/trust.jpg`, from Figma) + "Our promise" list with hairlines and 48px icon circles (`public/ui/icons/{tag,doc,lock,team}.svg`). Closing Band (light) + "Request your confidential valuation →". Band: mobile spacing 20 / 40 (Figma). Copy in `i18n.ts › sellPage` (FR/NL drafts, client review).
17. **Locations index** `/locations` (`LocationsIndexContent`) → "05 Locations". Intro "The Golfe de Saint-Tropez" + 9 village cards. ✅ *done, waiting for your check.* PageHero, then "The Golfe de Saint-Tropez" (Caps/Eyebrow) + Figma intro (Text/Subtitle, max 760), nine VillageCards (photo 4:3, name, tagline; hover zoom + champagne underline) 56 / 40px below, 3 / 2 / 1 columns. Removed: old intro ("since 1987"), map (not in Figma), "Region i / total", "View properties →". Taglines as in Figma (Grimaud, Sainte-Maxime updated; FR updated for Sainte-Maxime), new `taglineNl` for all villages (draft) + `villageTagline()` helper, also used by the village heroes.
18. **Village page: one template for all 9 villages** `/locations/[slug]` (`LocationDetail`) → "06 Village" (decision 11). Every village gets the same sections as Saint-Tropez: hero, The village (intro + Average price + Properties), Culture & experiences, The area, Investment & market, blue band, Properties in this region. **You provide Marc's texts for all villages at this step.** Unify the data into one shape per village (merge `location-content.ts` into the village data, FR/EN/NL). `averagePrice` and `propertyCount` are static text in the data file, so the placeholder figures can be replaced later (decision 8). "Request a consultation" → `/contact?subject=consultation&village=<slug>`. **"Our favourite places"**: keep the data and the component code but don't render the section (a `SHOW_FAVOURITE_PLACES = false` flag), to be restyled and switched on later (decision 9). ✅ *done, waiting for your check.* One template (`LocationDetail.tsx`) for all 9 villages; content in the new `src/lib/village-content.ts` from the client PDFs (EN corrected: accents, Golfe; FR from the PDF; NL draft). Hero: village photo + PDF tagline (cards keep the short Figma taglines). The village: back link, name, PDF intro, Average price / Properties (Figma placeholders), photo mosaic (Figma photos for now in `public/locations/<slug>/mosaic-*.jpg`; the Saint-Tropez placeholder Figma reused on the other villages is left out, so they have 2 photos and the mosaic adapts). Sections heading left / hairline list right, alternating light / white: Things to see & do, Experiences, Our favourites (one line, dots; `favourites: null` hides it — La Croix-Valmer, Cavalaire), Investment & market (Saint-Tropez only). Blue band + "Request a consultation" (→ `/contact?subject=consultation&city=…`). Properties in this region: only that village's listings (max 3, names matched without accents / hyphens / "La, Le"), else the empty state; View all → Buy filtered by the village. `location-content.ts` no longer used (remove in step 24).
19. **About** `/about` (`AboutContent.tsx`) → "07 About". Intro + 4 key figures, Our story (drop-cap "E"), 3 values, photo strip, team, closing band. ✅ *done, waiting for your check.* PageHero with the client photo (`hero-about.JPG` → `public/heroes/about.jpg`). Intro "Small by choice, local by nature." + 4 Stats (2023 · 3 · 9 · Monthly; NL "Elke maand" so it fits). Our story: "2023" (Cormorant Bold Italic 180 / 110), eyebrow + subtitle, centred 640 column with drop-cap E, portrait photo right (Figma photo, `public/about/story.jpg`), two paragraphs. What we stand for: Honesty / Discretion / Local roots in H1 italic with right-aligned text, hairlines. Photo strip 480 / 280 with the village names (Figma photo, `public/about/strip.jpg`). The team (Marc, Sasha, Sophia; existing photos). Closing Band (light) with View properties + Contact us. Our story and What we stand for have no top padding (reduced spacing, as in Figma). Removed: values 4–6, "30+ years" figures, navy band. Copy in `i18n.ts › aboutPage` (FR/NL drafts).
20. **Journal** `/fr/blog` (`BlogIndexContent`) → "08 Journal". Category chips, cards, "French only" notice. See §5 for how `/en/blog` and `/nl/blog` behave.
21. **Article** `/fr/blog/[slug]` (`BlogPostShell`, `mdx.tsx`) → "08.1–08.3". Hero, article typography, blue band, Keep reading.
22. **Contact** `/contact` (`ContactPageContent`, `ContactForm`) → "09 Contact". Form + contact info + confidential box + overlay. **Drop the Subject select and the consent checkbox** and keep a short privacy note linking to the privacy page (decision 7). Pre-filled subject (decision 6): read `?subject=valuation|consultation` (+ `village`) from the URL. Show a small line above the form ("Valuation request" / "Consultation about Ramatuelle"), start the message with a matching sentence, and send it to FormSubmit as the e-mail subject (`_subject`). So there's no visible select, but Marc still sees what the request is about.
23. **Pages not in Figma**: restyle with the new tokens only, no new layout: `/legal`, `/privacy`, `/login`, `/signup`, `/mes-favoris`, cookie banner, `/rentals` (kept for now, out of the sitemap. The client confirms later).

### Phase 5. Wrap-up
24. Delete the temporary `/styleguide` page (`src/app/styleguide/`), remove unused classes/tokens, run `npm run lint` and `npm run build`, test FR/EN/NL on every page, check no hydration warnings in the console, Lighthouse on Home + Property.
25. Update `HANDOFF.md` §12 (colours, fonts, language system).

---

## 3. New pages & sections that don't exist yet

| New | Where in Figma | Notes |
|---|---|---|
| **Thank-you overlays** (request + newsletter) | "10 Overlay — …" | Replace inline success messages |
| **Village page template, Figma version** | "06 Village", "06.2–06.9" | Route `/locations/[slug]` already exists for all 9 villages, but the layout is different. New sections: The village (intro + **Average price** + **Properties** stats), Culture & experiences, The area, Investment & market, blue band "Your local expert in this region" + Request a consultation, Properties in this region (+ empty state). |
| Village rich sections for the 8 other villages | hidden in Figma ("waiting for content from Marc") | **Decided:** one template, same sections as Saint-Tropez for every village. Marc's texts arrive at step 18. Today only Saint-Tropez has rich content. |
| Village data fields | — | Add `averagePrice` (e.g. "€8M+", static placeholder) and the new intro text to each village in `properties.ts`, keep `propertyCount` static too. Add **NL** to all village texts (none exist today). |
| **Energy performance block, new design** | "03 Property" → Energy performance | Two A–G scales with labels under the bars **plus the numeric values** (kWh/m²/year, kg CO₂/m²/year) and the cost line. See §4. |
| **Our signature** section (Home) | "01 Home" | Photo + quote + text + Learn more → About |
| **Browse by category** row (Home journal) | "01 Home" | Links to `/blog?category=…` |
| **Intro + key figures**, **photo strip** (About) | "07 About" | |
| **Hero search with Bedrooms filter** | "01 Home" | Bedrooms filter exists only on the Buy page today |
| **Mobile menu** design | "00 Menu — Mobile" | Includes Journal |
| "Request a valuation" / "Request a consultation" | Sell, Village | Link to `/contact?subject=…` with the subject pre-filled (decision 6, see step 22) |

Removed by Figma (exist today): Home "Exceptional addresses / Our regions" section, Home 4th feature card, About values 4–6, footer "Our regions" column, contact "Subject" select and consent checkbox, contact advisor block ("— Marc"), diagnostic date line in the energy block, Buy page "Sort by". **Exception:** village "Our favourite places" is hidden, not deleted (decision 9).

---

## 4. Energy data from Apimo `regulations`

**Today:** `apimo.ts` reads a `dpe` object (`consumption_class`, `emission_class`, `minimum_energy_cost`, `maximum_energy_cost`, `date`) and maps only the **letters** and **cost range** onto `Property` (`energyClass`, `ghgClass`, `energyCostMin/Max`, `energyDiagnosticDate`). The numeric consumption/emission values are not mapped. In practice the data often only appears inside the free-text description ("Performance énergétique : B(109) A(3) … entre 3040€ et 4190€"), as the Figma sample shows.

**Target:** read the energy data from the property's **`regulations`** array in the Apimo API (entries `{ type, value, date? }` whose `type` refers to Apimo's *property_regulation* catalog).

Steps:
1. Fetch one real property (server-side, with `.env.local`) and log its `regulations` array. Fetch the `property_regulation` catalog to get the IDs for: DPE consumption value (kWh/m²/yr), DPE class, GES emission value (kg CO₂/m²/yr), GES class, min/max annual energy cost, cost reference year, diagnostic date.
2. Add `regulations?: { type: number; value: string; date?: string }[]` to `ApimoProperty` and a `mapRegulations()` helper in `apimo.ts`.
3. Extend `Property` in `types.ts`: `energyValue?: number`, `ghgValue?: number`, `energyCostYear?: number` (keep the existing fields).
4. Priority: `regulations` → old `dpe` block → nothing ("Diagnostic in progress" state). Compute the class from the value if Apimo gives only the number (official DPE/GES thresholds).
5. Add the same fields to a couple of mock properties so the block can be checked without Apimo.
**Status (step 15):** ✅ done except step 1: `APIMO_PROVIDER` / `APIMO_TOKEN` are empty in the local `.env.local` (the site runs on mock data locally), so real `regulations` couldn't be inspected. Instead of hard-coded type ids, `apimo.ts` loads the `property_regulation` catalog and classifies each entry by its name (FR/EN: DPE / consommation → energy, GES / émission → emissions, coût min / max / année, date; "classe" = letter). In development, unused regulation names are logged once (`[apimo] regulation not used: …`), so the mapping can be checked as soon as the keys are set. Classes are computed from the values with the official thresholds (`src/lib/energy.ts`). Mock data: ell-001 = full Figma example, ell-002 = numbers only (classes computed), ell-008 = no data ("Diagnosis in progress").
6. Rebuild `EnergyDiagnostics.tsx` to the Figma design. Labels go into `i18n.ts` for FR/EN/NL: "Energy class (DPE)", "Greenhouse gas emissions (GES)", "{n} kWh/m²/year", "{n} kg CO₂/m²/year", "Estimated annual energy costs for standard use: €{min} – €{max} ({year} prices)."

---

## 5. Language bug (hydration + SEO)

**What happens now:** `layout.tsx` renders `<html lang="fr">`, and `LanguageProvider` always starts in `"fr"` on the server. After loading, the browser reads `localStorage` / `navigator.language` and switches to EN or NL. So:
- the HTML Google receives is **always French**, and EN/NL are invisible to search engines (no `/en` URLs, no `hreflang`);
- the first paint is French, then the text flips (flash), and any component that renders differently on server vs. client produces **hydration errors**;
- workarounds such as the `mounted` trick in `Header.tsx` exist only because of this.

**Decided fix: all three languages prefixed in the URL (option A3, 6 November 2026)**, following the Next.js 16 guide `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`:

| Language | URL | Example |
|---|---|---|
| English | `/en/` | `/en/properties`, `/en/sell` |
| French | `/fr/` | `/fr/properties`, `/fr/sell` |
| Dutch | `/nl/` | `/nl/properties`, `/nl/sell` |

**Redirect rules (in `proxy.ts`):**

| Incoming URL | Goes to | Type |
|---|---|---|
| `/` (bare domain) | `/fr/` or `/nl/` if the visitor's `lang` cookie (set by the language toggle) or browser language (`Accept-Language`) prefers French or Dutch, otherwise `/en/` | **307 temporary** (the result depends on the visitor), with `Vary: Accept-Language, Cookie` |
| Any other unprefixed page URL (old site URLs: `/properties`, `/properties/123`, `/sell`, `/locations/gassin`, `/blog/<slug>`, …) | same path under `/fr/` (query string kept) | **301 permanent**, so the current French Google ranking moves to `/fr/` |
| `/en/blog/<slug>`, `/nl/blog/<slug>` | `/fr/blog/<slug>` | 301 (articles are French-only) |
| `/fr/…`, `/en/…`, `/nl/…` | unchanged | — |

Never redirected: `/_next/*`, `/auth/callback`, server actions, `/robots.txt`, `/sitemap.xml`, favicons/icons, `/llms.txt`, and **every static file** (anything with a file extension, e.g. `/locations/gassin.jpg` and `/brand/logo.png`; note that `public/locations/` shares its prefix with the `/locations` page route, so the extension check matters).

Implementation:
1. Move the routes under `src/app/[lang]/…` (same files and names, one folder deeper). `[lang]/layout.tsx` renders `<html lang={lang}>` and calls `notFound()` for anything other than `en`/`fr`/`nl`. Auth callback, server actions, `robots.ts`, `sitemap.ts` and the favicon files stay at the root.
2. `proxy.ts` applies the table above, then the existing Supabase `updateSession` call.
3. `LanguageProvider` gets `lang` from the layout (server) as a prop, so server and client render the same language: no more flash or hydration errors. `localStorage` and the `mounted` work-arounds go. `LanguageToggle` links to the same page in the other language and sets the `lang` cookie (used only for the bare-domain redirect). Browser-language detection happens **only on `/`**. A prefixed URL always shows its own language.
4. `generateStaticParams` returns `en/fr/nl`. Every page gets `generateMetadata` per language with `alternates.canonical` and `alternates.languages` (hreflang `en`, `fr`, `nl`, plus `x-default` → `/`, the bare-domain chooser). The sitemap lists all three versions of every page (no unprefixed URLs, no `/rentals`).
5. Internal links use a small helper `href(lang, "/properties")` so they keep their language.
6. **Blog: French only.** Articles live only at `/fr/blog/[slug]`. `/en/blog` and `/nl/blog` show the journal index in EN/NL with the Figma notice "Articles are currently published in French only…", and the cards link to `/fr/blog/[slug]`. Articles are excluded from the EN/NL hreflang.
7. SEO note: every old inner page keeps its French ranking through the 301 to `/fr/…`. The homepage is the exception, because `/` becomes a per-visitor 307. Google usually crawls without a French browser language, so it will be sent to `/en/`. French searchers are pointed to `/fr/` by hreflang, but the French homepage may dip briefly while Google re-indexes. After launch: submit the new sitemap in Search Console and watch the "Pages" report for redirect errors.

This moves folders one level deeper but keeps the same files, components and data sources.

---

## 6. Decisions (6 November 2026)

| # | Topic | Decision |
|---|---|---|
| 1 | Language | **A3**: all three languages prefixed (`/en/`, `/fr/`, `/nl/`). The bare domain `/` goes to `/en/`, or to `/fr/` / `/nl/` when the visitor's browser language is French or Dutch. Old unprefixed URLs redirect (301) to `/fr/`. Blog French-only under `/fr/blog`. Details in §5. |
| 2 | Type | Follow the Figma text styles (italic H1/H2, 80/48 and 56/40). Foundations notes are outdated. |
| 3 | Mobile margin | 28 px. |
| 4 | `/rentals` | Keep the page, remove it from the sitemap. The client confirms later. |
| 5 | Sort by | Remove from the Buy page. |
| 6 | Request buttons | "Request a valuation" / "Request a consultation" → `/contact` with the subject pre-filled. |
| 7 | Contact form | Drop the Subject select and consent checkbox. Keep a short privacy note linking to the privacy page. (Decisions 6 + 7 together: subject passed in the URL, shown as a line above the form and sent as the e-mail subject. See step 22.) |
| 8 | Village figures | Average price + properties are static text per village in the data file (placeholders to replace later). |
| 9 | Our favourite places | Keep content and code, hide the section (flag), switch back on later. |
| 10 | Translations | I draft FR and NL for all new copy. The client reviews. |
| 11 | Village pages | One template for all villages with the same sections as Saint-Tropez. Marc's texts are provided at step 18. |

### Resolved
**A. Old URLs vs. English default.** Resolved 6 November 2026: option **A3** chosen (see decision 1 and §5).

---

## 7. Copy changes (Figma English is approved → FR + NL to translate)

Unless noted, the "Current" column is the current **EN** text in `src/lib/i18n.ts`. Each new line needs FR and NL versions: **I draft them in `i18n.ts` during the step that uses them, and the client reviews** (decision 10). Drafted FR/NL strings get a `// TODO client review` comment so they're easy to find.
Property titles/descriptions in the Figma frames come from Apimo and are **not** copy changes.

### Global
- English copy says **"Golfe de Saint-Tropez"** / "the Golfe" everywhere, never "Gulf of Saint-Tropez" (`i18n.ts`, `properties.ts`, `BlogPostShell.tsx`, `BlogIndexContent.tsx`). NL currently says "Golf van Saint-Tropez" → use "Golfe de Saint-Tropez".
- Headings become sentence case: "Property details", "Send us a message", "Contact information", "Office hours", "Commercial operations manager".
- `common.callUs` is a placeholder number (`+33 4 93 12 34 56`). Figma uses `+33 6 74 75 07 03` everywhere.
- Locations intro currently says "your renowned real estate partner **since 1987**". This conflicts with "Founded in 2023" and is replaced (see Locations).

### Navigation & footer
| Element | Current | Figma |
|---|---|---|
| Footer brand column | tagline only | tagline + "Espace Lemarquis · Quartier Bertaud 83580 Gassin · France" |
| Footer contact city | "French Riviera, France" | "Gassin · Var · France" |
| Footer columns | Explore / Contact / Hours / Our regions | Explore (Buy, Sell, Locations, About, Journal) / Contact / Hours |
| Footer credit | "Site réalisé par Z.Development" | *(none: left out on request, 7 Nov 2026)* |

### Home
| Element | Current | Figma |
|---|---|---|
| Hero eyebrow | Luxury Real Estate · French Riviera | *(none)* |
| Hero title | Discover Elegance | Where the Riviera becomes home |
| Hero subtitle | Exclusive Properties in the French Riviera | Villas, estates and waterfront houses around Saint-Tropez. |
| Search labels | …, Budget "All budgets" | Location "All", Property type "All types", Budget "All prices", **Bedrooms** "All", Search |
| Hero | — | "Scroll" cue |
| Why: eyebrow | The Ellington Standard | The Ellington standard |
| Why: title | Why choose Ellington | Honest advice, local roots, and a written update every month. |
| Why: subtitle | Unparalleled expertise in luxury real estate across the French Riviera. | *(none)* |
| Feature 1 | Trusted advisors: A confidential, discreet approach… | **Honest advice**: We tell you what we really think about price — you keep the final word. |
| Feature 2 | Exclusive network: Privileged access to off-market… | **Local roots**: Based in Gassin, from Les Issambres to Le Lavandou. |
| Feature 3 | International clientele: Buyers from over 10 countries… | **Buyers from around the world**: We advise in French, English and Dutch. |
| Feature 4 | Bespoke service… | *(removed)* |
| Featured subtitle | A curated selection of the rarest properties in our portfolio, refreshed weekly. | A selection of the exceptional homes we currently represent. |
| Regions section | Our regions / Exceptional addresses / From Monaco to Saint-Tropez… / View all our regions | *(removed)* |
| Signature quote | — | “Honest advice, from the first visit to the final signature.” |
| Signature eyebrow / title | — / Not Your Ordinary Local Expert. | Our signature / Not your ordinary local expert. |
| Signature text | expertP1–P3 ("Born in the heart of the Gulf… Its founder, having grown up in the region…") | "Founded in 2023 in the Golfe de Saint-Tropez by two partners who share a passion for property and architecture." / "We focus on exceptional villas and estates, and stay close to our clients from the first visit to the signature at the notary." / Learn more → |
| Journal (hard-coded in `HomeContent.tsx`) | The Journal / … | The journal / Stories from the Golfe / Buyer's guides, market analyses and Riviera lifestyle — our editorial selection. / View all articles → / Browse by category |
| Newsletter eyebrow / title | Stay informed / Stay informed | Newsletter / Stay informed |
| Newsletter disclaimer | No spam — unsubscribe at any time. | *(none)* |
| Newsletter success | Thank you, your subscription is confirmed. (inline) | Overlay: Newsletter / Thank you / You're on our list for new properties and stories from the Golfe. / Close |

### Buy
| Element | Current | Figma |
|---|---|---|
| Eyebrow | Portfolio | *(none)* |
| Title | Properties for sale (split) | Properties for sale |
| Subtitle | Discover the exceptional properties curated by Ellington across the entire French Riviera. | Exceptional homes across the French Riviera. |
| Bedrooms label (hard-coded EN/FR only) | Bedrooms / Chambres | Bedrooms (needs NL) |

### Property detail
| Element | Current | Figma |
|---|---|---|
| Details title | Property Details | Property details |
| DPE label | Energy performance diagnostic | Energy class (DPE) |
| GES label | Greenhouse gas emission index | Greenhouse gas emissions (GES) |
| Values | — | 109 kWh/m²/year · 3 kg CO₂/m²/year |
| Cost line | Estimated annual energy expenses for standard use: between €X and €Y per year | Estimated annual energy costs for standard use: €X – €Y (2023 prices). |
| Diagnostic date | Diagnostic completed after July 1, 2021 — … | *(none)* |
| Similar | Similar properties | Similar properties + View all → |
| Sidebar hours | — | Office hours: Monday – Friday · 9am – 6pm, Saturday · 10am – 4pm |

### Sell
| Element | Current | Figma |
|---|---|---|
| Eyebrow | Sell with Ellington | *(none)* |
| Hero lead | Local expertise. International reach. Tailored excellence. | An honest valuation, the right buyers, and clear updates until the signature. |
| Why Ellington? p1 | Born in the heart of the Gulf… a signature. | Founded in 2023 in the Golfe de Saint-Tropez by two partners who share a passion for property and architecture. |
| p2 | Its founder, having grown up in the region… | From our office in Gassin we work the Golfe de Saint-Tropez every day, from Les Issambres to Le Lavandou. Knowing which domains, streets and views buyers ask for is what lets us set a realistic price and find the right buyer. |
| p3 | Fluent in French, English, and Dutch… | Our buyers come from all over the world. We work in French, English and Dutch, and share every new listing directly with the active buyers registered with us. |
| p4 | We approach every sale with discretion… | We tell you honestly what we think your property will sell for — even if it is not what you hoped to hear — and you always keep the final word. |
| Process eyebrow | — | Our method (+ "Step 01…04" labels) |
| Step 1 | Tailored valuation… | **Honest valuation**: We visit, compare with recent sales in the area and give you a realistic price — and tell you if we think expectations are too high. |
| Step 2 | Targeted exposure… | **Presentation**: Once you entrust us with the sale, we prepare photos, a full description and the documents buyers will ask for. |
| Step 3 | Bespoke marketing… | **The right buyers**: Your property goes first to the active buyers registered with us, then to partner agencies and international portals. |
| Step 4 | Negotiation & completion… | **Offers & signature**: We accompany every visit, negotiate offers and coordinate diagnostics and the notary until the final signature. |
| Trust eyebrow | — | Our promise |
| Trust 1 | Discretion… | **Honest pricing**: We advise on price honestly, even if it means disagreeing with you. You keep the final word. |
| Trust 2 | International network… | **Monthly reports**: A written update every month: visits, feedback, offers and what we suggest adjusting. |
| Trust 3 | Dedicated support… | **Discretion**: If you prefer, your property is only shown to qualified buyers — off the public portals. |
| Trust 4 | Tailored approach… | **One small team**: You deal with the same people from valuation to signature. |
| CTA subtitle | Whether you are considering selling or simply exploring your options… | Thinking about selling, or simply curious what your property is worth today? We will give you an honest figure. |
| CTA button | Request your confidential valuation | Request your confidential valuation → |

### Locations index
| Element | Current | Figma |
|---|---|---|
| Hero | eyebrow "The French Riviera", "Our Locations", "Explore the most prestigious locations along the Côte d'Azur…" | "Our locations" / "The villages of the Golfe de Saint-Tropez." |
| Section title | — | The Golfe de Saint-Tropez |
| Intro | Discover Ellington, your renowned real estate partner since 1987… | From the hilltop villages of Gassin and Ramatuelle to the canals of Port Grimaud and the quieter bays of Cavalaire and Rayol-Canadel, every village around the Golfe has its own character, its own pace and its own kind of home. Choose a village to see what life there is like and which properties we currently represent. |
| Grimaud tagline | Medieval character in the heart of the Gulf | Medieval character at the heart of the Golfe |
| Sainte-Maxime tagline | Family-friendly elegance on the northern shore | Refined family living on the northern shore |
| "Region i / total", "View properties →" | shown | *(not in Figma)* |

### Village pages (all 9). Intro text is **new for every village**
| Village | Figma intro (replaces `descriptionEn`) | Avg. price | Properties |
|---|---|---|---|
| Saint-Tropez | Saint-Tropez continues to attract a discerning international clientele, drawn by its superyachts, art galleries and world-class restaurants. Behind the summer spectacle lies a preserved Provençal village — its citadel, its orange-red bell tower and the legendary Place des Lices speak to an authenticity that resists the passage of time. | €8M+ | 40+ |
| Ramatuelle | Ramatuelle is a medieval village perched on the peninsula south of Saint-Tropez. Its vine-covered lanes, sweeping sea panoramas and proximity to Pampelonne make it one of the most coveted addresses for discerning buyers on the Riviera. | €5M+ | 25+ |
| Gassin | Perched at 200 metres, Gassin is one of France's Most Beautiful Villages. Its extraordinary 360° views over the Golfe de Saint-Tropez and its authentic Provençal character attract buyers who prize tranquillity and timeless beauty. | €4M+ | 20+ |
| Grimaud | Grimaud is a medieval village crowned by its 11th-century castle, overlooking the Golfe de Saint-Tropez. It combines remarkable historical character with modern luxury in a setting of unique prestige. | €3.5M+ | 18+ |
| Port Grimaud | Port Grimaud is a unique lakeside village where every home has direct access to the sea via private canals. Created by architect François Spoerry, this architectural masterpiece offers an unmatched intimacy with the Mediterranean. | €2.5M+ | 35+ |
| Sainte-Maxime | Facing Saint-Tropez across the Golfe, Sainte-Maxime offers all the pleasures of the Côte d'Azur with a refined family atmosphere, excellent amenities and a rich cultural calendar throughout the year. | €2M+ | 45+ |
| La Croix-Valmer | La Croix-Valmer enjoys some of the finest natural beaches on the Riviera. Nestled between vineyards and the sea, it offers exceptional properties in one of the most naturally preserved settings on the coast. | €1.8M+ | 22+ |
| Cavalaire-sur-Mer | Cavalaire-sur-Mer stretches along a magnificent three-kilometre bay. Its authentic character, its marina and its fine sand beaches make it an outstanding address for buyers seeking value and Mediterranean beauty. | €1.5M+ | 30+ |
| Rayol-Canadel-sur-Mer | Rayol-Canadel-sur-Mer is one of the most exclusive resorts on the Côte d'Azur — a protected enclave of remarkable landscapes and crystal-clear waters, preserved from mass tourism. | €2M+ | 15+ |

Shared village-page texts (new): "← Back to locations", "The village", "Average price", "Properties", "Lifestyle / Culture & experiences", "Discover / The area", "Market / Investment & market", "Exceptional properties with strong asset potential in Saint-Tropez.", band "Your local expert in this region" / "We live and work in the Golfe — ask us anything about this village." / "Request a consultation", "Properties in this region", "View all →", "No properties in this region at the moment."
Saint-Tropez activity 1: "…in the **Golfe** de Saint-Tropez" (was "Gulf of"). Its other rich texts (lifestyle paragraph 1, gastronomy, highlights, real estate list) match `location-content.ts`.

### About
| Element | Current | Figma |
|---|---|---|
| Hero subtitle | Born in the heart of the Gulf of Saint-Tropez, built on trust. | Founded in 2023 in the Golfe de Saint-Tropez. |
| Intro | — | Small by choice, local by nature. / A young, independent agency for exceptional homes on the Riviera. |
| Key figures | 30+ Years on the Riviera · 10+ Countries worldwide · 9 Exclusive regions · 3 Languages spoken | 2023 Founded in the Golfe · 3 Languages · FR, EN, NL · 9 Villages in the Golfe · Monthly Written owner reports |
| Story subtitle | — | Founded in the Golfe de Saint-Tropez by two partners with a passion for property and architecture. |
| Story p1 | Born in the heart of the Gulf… Its founder, having grown up in the region… | Ellington was founded in 2023 by two partners with a shared passion for property and architecture. From our office in Gassin we cover the Golfe de Saint-Tropez, from Les Issambres to Le Lavandou, and take on exceptional properties further along the Riviera. |
| Story p2 | Driven by a deeply international mindset… | Our clients come from all over the world. We work in French, English and Dutch, so nothing gets lost between buyer, seller and notary. |
| Story p3 | Choosing Ellington means partnering with a trusted advisor… | Our approach is simple: be available, be discreet, and give honest advice. If we think a price is wrong, we say so — the decision always stays with you. |
| Values (6 → 3) | Integrity, Excellence, Discretion, Global reach, Local roots, Bespoke service | **Honesty**: Straight answers on price and market, even when they are not the easy ones. You keep the final word. · **Discretion**: Your plans, your property and your details stay between us — off the public portals if you prefer. · **Local roots**: We live and work in the Golfe and know its villages, domains and views. |
| Photo strip | — | Saint-Tropez · Ramatuelle · Gassin · Grimaud · Port-Grimaud · Sainte-Maxime · Croix-Valmer · Cavalaire · Rayol-Canadel |
| Team title | Agency Team | The team |
| Marc bio | …knowledge of the Gulf of Saint-Tropez… | …knowledge of the Golfe de Saint-Tropez… |
| Sophia role | Commercial Operations Manager | Commercial operations manager |
| Closing band | A question? / Let's find your property / Whether you wish to buy, sell or value — our team is at your service. | Let's find your property / Buying, selling or valuing — tell us what you have in mind. / View properties · Contact us |

### Journal & articles (strings hard-coded in `BlogIndexContent.tsx` / `BlogPostShell.tsx`, FR/EN only, **NL missing**)
| Element | Current | Figma |
|---|---|---|
| Hero | The Journal / Stories from the Gulf | Stories from the Golfe / Buyer's guides, market analyses and Riviera life. |
| Filter | All articles + categories | All articles · Buyer's guides · Market analysis · Architecture & heritage · Lifestyle · Tax & legal |
| Notice | (EN only) | Articles are currently published in French only — English versions coming soon. / Contact us · marc@ellington-international.com |
| Article band / end | Confidential, off-market expertise across the Gulf of Saint-Tropez. | Blue band + "Keep reading" (check exact copy in 08.1–08.3 during step 21) |

Article titles/excerpts in Figma match the 3 MDX files. Article bodies were not compared line by line. Do that in step 21.

### Contact
| Element | Current | Figma |
|---|---|---|
| Hero | Contact / Get in touch / We're here to answer your questions and guide you through your luxury real estate journey. | Get in touch / We reply personally to every message. |
| Form title | Send Us a Message | Send us a message |
| Labels | First name, Last name, Email address, Phone number, Subject *, Message | First name *, Last name *, Email address *, Phone number, Message * (no Subject) |
| Consent checkbox | shown | *(none)*. Disclaimer text stays |
| Advisor block | Your contact / … — Marc | *(none)* |
| Info titles | Contact Information, Office Hours | Contact information, Office hours (Mon–Fri : 9am – 6pm, Sat : 10am – 4pm. No Sunday line) |
| Success | Thank you. / Your message has been received… (inline) | Overlay: Request received / Thank you / Your message is with us. A member of our team will reply to you personally. / Close |
