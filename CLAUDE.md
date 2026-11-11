@AGENTS.md

# Project rules: Ellington Properties website

- **Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.** This Next.js version differs from older ones: read the matching guide in `node_modules/next/dist/docs/` before writing code (see AGENTS.md).
- **Keep the existing structure and data sources.** Listings come from Apimo (`src/lib/apimo.ts` → `src/lib/properties.ts`, with mock fallback). Login and favourites come from Supabase (`src/lib/supabase/`). Blog articles are MDX in `content/blog/`. Village texts are in `src/lib/village-content.ts` (names, photos, slugs in `src/lib/properties.ts`). Contact goes through FormSubmit. Don't add new services or move data elsewhere without asking.
- **Design comes from Figma** (file `HuwxKn1GP5t95FTtrBwtEK`, pages "Website — Desktop" and "Website — Mobile"). Use the Figma variables and text styles as tokens in `src/app/globals.css`. Don't invent colours or sizes. Desktop and mobile must both match. The work plan is in `REDESIGN-PLAN.md`.
- **FR / EN / NL must keep working on every page.** UI text goes in `src/lib/i18n.ts` (all three languages). Never ship a string in only one or two languages. The Figma copy is English and approved. Draft FR and NL yourself and mark them `// TODO client review`.
- **Languages live in the URL** (after redesign step 12): every page is prefixed `/en/`, `/fr/` or `/nl/`. The bare domain `/` always redirects to `/en/` (English is the default; browser language is not used). Old unprefixed URLs redirect 301 to `/en/` (`LEGACY_LANG`); old article URLs to `/fr/blog/`. Static files are never redirected. Blog articles are French-only under `/fr/blog`. Details in `REDESIGN-PLAN.md` §5.
- **Redesign decisions are recorded in `REDESIGN-PLAN.md` §6.** Follow them, and don't re-open them. In short: Figma text styles win over the Foundations-page notes. Mobile side margin 28 px. No "Sort by" on Buy. Request buttons go to `/contact?subject=…`. No Subject select or consent checkbox on the contact form. Village figures are static data. "Our favourite places" is hidden, not deleted. `/rentals` is switched off (code kept, 307 to Buy, `RENTALS_ENABLED`).
- **Work step by step.** Do one step of `REDESIGN-PLAN.md` at a time and stop for the user to check it in the browser before the next.
- **The region is called "Golfe de Saint-Tropez"** in every language (never "Gulf of Saint-Tropez" or "Golf van Saint-Tropez").
- **Never commit `.env.local`** or any secret. Only `.env.example` (no values) is committed.
- **Work on the `redesign` branch only.** Don't commit to or push `main` (pushing `main` deploys to production).
