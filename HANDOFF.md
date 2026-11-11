# Passation du site Ellington Properties

Ce document décrit comment reprendre la pleine propriété du site
**www.ellingtoninternational.com** (code, hébergement, base de données, emails).

À la fin, tout tourne sur les comptes du client et l'ancien prestataire
n'a plus aucun accès.

---

## 1. Vue d'ensemble des briques

| Brique | Rôle | Compte à créer par le client |
|---|---|---|
| **GitHub** | Le code source | Oui (gratuit) |
| **Vercel** | L'hébergement (déploie à chaque push) | Oui (gratuit) |
| **Supabase** | Connexion utilisateurs + favoris | Oui (gratuit) |
| **Resend** | Envoi des emails d'inscription | Oui (gratuit) |
| **Google Cloud** | Bouton « Se connecter avec Google » | Oui (gratuit) |
| **Apimo** | Les annonces immobilières | Déjà au client (agence) |
| **Domaine + DNS (Hostinger)** | ellingtoninternational.com | Déjà au client |
| **FormSubmit** | Le formulaire de contact | Aucun — juste l'email de Marc |

> Il n'y a **que 3 secrets** dans le code (voir `.env.example`). Tout le reste
> (Resend, Google, templates d'emails) est configuré **dans les tableaux de
> bord**, pas dans le code.

---

## 2. Ordre à suivre

1. Le client crée ses 5 comptes (GitHub, Vercel, Supabase, Resend, Google Cloud).
2. Transfert du **repo GitHub**.
3. Le client branche son **Vercel** sur le repo.
4. Transfert du projet **Supabase** (garde les utilisateurs et favoris).
5. Bascule du **domaine** vers le nouveau Vercel.
6. Le client reprend **Resend** et **Google** sur ses propres comptes.
7. L'ancien prestataire **révoque** ses accès et ses clés.

---

## 3. GitHub — transfert du repo

Le repo actuel : `armordeckk/ellington-site`.

**Méthode (transfert, garde tout l'historique) :**
1. Le client crée un compte sur https://github.com et donne son identifiant.
2. Prestataire : repo → **Settings → General → Danger Zone → Transfer ownership**.
3. Saisir le nom d'utilisateur GitHub du client → confirmer.
4. Le client accepte le transfert (email reçu). Le repo devient
   `pseudo-client/ellington-site`.

> Vercel se reconnectera au repo **sous son nouveau propriétaire** à l'étape 4.

---

## 4. Vercel — hébergement

Le plus simple est que le client **recrée** le projet (10 min), les valeurs
de configuration ne changent pas.

1. Le client crée un compte sur https://vercel.com en **se connectant avec son
   GitHub** (celui qui possède maintenant le repo).
2. **Add New → Project → Import** le repo `ellington-site`.
3. Framework détecté : **Next.js**. Ne rien changer aux réglages de build.
4. **Environment Variables** — ajouter les 6 variables (voir `.env.example`).
   Les valeurs se copient depuis l'ancien Vercel :
   `Settings → Environment Variables → (afficher/copier chaque valeur)`.
   - `APIMO_PROVIDER`, `APIMO_TOKEN`, `APIMO_AGENCY`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://www.ellingtoninternational.com`
5. **Deploy**. Le site est accessible sur une URL `*.vercel.app` temporaire.
6. Brancher le domaine → voir §5.

---

## 5. Domaine & DNS (Hostinger)

Le domaine est **déjà sur le compte Hostinger du client** — aucun transfert de
domaine n'est nécessaire. Il faut juste réattribuer le domaine au nouveau
projet Vercel.

> ⚠️ Un domaine ne peut être relié qu'à **un seul** projet Vercel à la fois.
> Pour éviter toute coupure, faire dans cet ordre :

1. **Ancien Vercel** : projet → Settings → Domains → **retirer**
   `ellingtoninternational.com` et `www.ellingtoninternational.com`.
2. **Nouveau Vercel** (celui du client) : projet → Settings → Domains →
   **ajouter** `www.ellingtoninternational.com` (et l'apex sans www, qui
   redirigera vers www).
3. Vercel confirme « Valid Configuration » car le DNS pointe déjà vers lui.

**Les enregistrements DNS actuels chez Hostinger (à conserver tels quels) :**

| Type | Nom | Valeur |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |
| TXT | `@` | `google-site-verification=…` (Search Console — garder) |
| TXT / CNAME | `resend._domainkey`, SPF, DMARC | enregistrements **Resend** — voir §7 |

> L'email de Marc (`marc@ellington-international.com`, **avec** tiret) est sur
> un **autre domaine** (Google Workspace) et n'est pas concerné par cette
> passation.

---

## 6. Supabase — transfert (garde utilisateurs + favoris)

On **transfère** le projet existant (réf. `qutxjgacxexzxbwhmqkw`) vers
l'organisation du client. Gros avantage : l'URL et les clés **ne changent
pas**, donc rien à retoucher côté Vercel, Google ou Resend après le transfert.

1. Le client crée un compte + une **organisation** sur https://supabase.com.
2. Le client **invite le prestataire** dans son organisation en rôle
   **Owner** : Organization → Team → Invite.
3. Prestataire : projet Ellington → **Project Settings → General →
   Transfer project** → choisir l'organisation du client → confirmer.
4. Une fois transféré, le client **retire le prestataire** de l'organisation.

> Rien d'autre à faire : les comptes inscrits, les favoris, la configuration
> Auth (emails de confirmation, redirections, Google) restent intacts.

---

## 7. Resend — emails d'inscription (reprise sur le compte du client)

Après le transfert Supabase, les emails continuent de partir via **le compte
Resend du prestataire**. Pour une propriété complète, le client bascule sur
son propre Resend :

1. Le client crée un compte sur https://resend.com.
2. **Domains → Add Domain** : `ellingtoninternational.com`.
3. Resend affiche des enregistrements (DKIM, SPF, DMARC) à ajouter chez
   **Hostinger** → les créer, puis cliquer **Verify** (quelques minutes).
4. **API Keys → Create** → copier la nouvelle clé (format `re_…`).
5. Dans **Supabase** : Project Settings → Authentication → **SMTP Settings** :
   - Host : `smtp.resend.com`  ·  Port : `465`  ·  User : `resend`
   - Password : **coller la nouvelle clé API Resend**
   - Sender : `noreply@ellingtoninternational.com`
6. Tester une inscription pour vérifier la réception de l'email.

> Tant que cette étape n'est pas faite, les emails fonctionnent encore via
> l'ancien compte — à faire dans le mois qui suit la passation.

---

## 8. Google Cloud — « Se connecter avec Google » (reprise)

Idem : ça continue de marcher après le transfert, mais pour tout posséder le
client recrée son propre identifiant OAuth.

1. Le client crée un projet sur https://console.cloud.google.com.
2. **APIs & Services → OAuth consent screen** : configurer (nom « Ellington »,
   email de support, domaine `ellingtoninternational.com`), puis **publier**.
3. **Credentials → Create credentials → OAuth client ID → Web application**.
4. **Authorized redirect URI** — la coller depuis Supabase :
   Supabase → Authentication → Providers → Google → « Callback URL ».
   (forme : `https://qutxjgacxexzxbwhmqkw.supabase.co/auth/v1/callback`)
5. Copier le **Client ID** et le **Client Secret**.
6. Dans **Supabase** → Authentication → Providers → **Google** : coller le
   nouveau Client ID + Secret → Save.
7. Tester le bouton « Se connecter avec Google » sur le site.

---

## 9. Formulaire de contact (FormSubmit)

Aucun compte : le formulaire envoie vers `marc@ellington-international.com`
via https://formsubmit.co. Rien à transférer. Si l'adresse de réception
change un jour, modifier l'email dans `src/components/ContactForm.tsx`
(une seule ligne) et réactiver via le lien reçu par email.

---

## 10. Nettoyage final (prestataire)

Une fois que tout tourne chez le client et a été testé :

- [ ] Retiré du projet/organisation **Supabase**.
- [ ] Domaine retiré de l'**ancien Vercel** ; ancien projet Vercel supprimé.
- [ ] Clé **Resend** de l'ancien compte révoquée (une fois le client sur sa
      propre clé).
- [ ] Identifiant **OAuth Google** de l'ancien projet supprimé (une fois le
      client sur le sien).
- [ ] Repo **GitHub** bien transféré (plus listé chez le prestataire).

---

## 11. Développement local (pour un futur dev)

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
npm run dev                  # http://localhost:3000
```

- **Stack** : Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4.
- ⚠️ Cette version de Next.js a des spécificités : voir `AGENTS.md` et la doc
  dans `node_modules/next/dist/docs/` avant de coder.
- Chaque `git push` sur la branche `main` **déploie automatiquement** en prod
  via Vercel.

---

## 12. Code map — developer notes

Quick reference for where the main things live in the code (state after the
redesign, November 2026). The full redesign log and its decisions are in
`REDESIGN-PLAN.md` (§6 = decisions, don't re-open them).

### Design system (from Figma)
- **Source:** Figma file `HuwxKn1GP5t95FTtrBwtEK`, pages "Website — Desktop" and
  "Website — Mobile". Every colour, size and spacing comes from its variables
  and text styles. Don't invent new ones.
- `src/app/globals.css` holds all design tokens. **Tailwind CSS 4** is configured
  there (`@theme inline`, `@layer`), there is no `tailwind.config.js`.
  - **Colours** (Figma "Color" collection, the only real values):
    brand/blue `#154166`, brand/blue-deep `#0f3352`, brand/accent (champagne)
    `#978a7a`, text/body `#3d5670`, text/muted `#5b7189`, surface/white,
    surface/light `#e8eef4`, line/hairline `#d5dee7`.
    Utilities: `bg-brand-blue`, `text-brand-accent`, `text-body-text`,
    `text-muted`, `bg-surface`, `bg-surface-light`, `border-hairline`.
    The old navy/gold palette and its alias names were removed in step 24.
  - **Text styles:** one class per Figma style, desktop and mobile sizes built
    in: `.type-h1`, `.type-h2`, `.type-title`, `.type-h3`, `.type-subtitle`,
    `.type-price`, `.type-figure`, `.type-number`, `.type-body`, `.type-value`,
    `.type-input`, `.type-small`, `.type-eyebrow`, `.type-label`, `.type-button`.
    Don't use Tailwind font-size utilities for text.
  - **Layout** (Figma "Layout" collection, switches at 768px): content max 1240,
    side margin 100 / 28, section padding 144 / 96, nav 80 / 68.
    Utilities: `container-wrap`, `section-y`, `py-section`, `px-margin`,
    `gap-gap`, `gap-stack`, `h-nav`…
- **Fonts:** loaded in `src/app/[lang]/layout.tsx` via `next/font/google`:
  **Cormorant Garamond** (serif, headings) and **Inter** (sans, body).
- **Shared components** in `src/components/ui/`: `Button` / `ButtonLink`,
  `TextLink`, `Dropdown` (filters, with option groups), `SectionHeader`,
  `Band`, `SmallParts` (Tag, Stat, DetailRow, InfoBox, Chip), `TextPage`,
  `GolfeBand` (full-bleed Golfe graphic, Locations + About), `ScrollCue`,
  `Reveal`, `card.ts` (card grid), `input.ts` (form fields).
- **Header** (`src/components/Header.tsx` + `Logo.tsx`): transparent over hero
  photos, white after 24px of scroll. After 80px the wordmark fades out; on
  the mobile bar the crest slides to the centre. No animation with "reduce
  motion". The desktop links need 1280px: below that (phones, iPads up to
  iPad Air / Pro 11" landscape) the mobile bar with the menu icon is shown.
- **Heroes on touch tablets** (`HomeContent` hero, `PageHero`): from 768px
  with a touch screen (`md:pointer-coarse:`), at least the visible screen high
  (`100svh`) with the text centred below the navigation, instead of the fixed
  Figma 820px. Desktop keeps 820px, phones 760px.
- **Scroll reveal:** `src/components/ui/Reveal.tsx` (`{...reveal}`, or
  `{...revealFade}` for a fade only, plus an optional `--reveal-delay`) and
  the engine `src/components/ScrollReveal.tsx` (one observer in the layout).
  CSS in `globals.css` › "Scroll reveal". Card grids (`reveal-grid`) and
  article text are revealed automatically. ⚠️ The standard reveal is still the
  temporary "very obvious" setting (80px over 1.5s, `DURATION` in
  `ScrollReveal.tsx` + the distance in `FRAMES`), to be toned down to
  20px / 700ms once the client confirms.

### Language system (FR / EN / NL)
- **The language is in the URL**: every page is `/en/…`, `/fr/…` or `/nl/…`
  (`src/app/[lang]/…`). `src/proxy.ts` redirects the bare domain `/` to `/en`
  (always: English is the default, visitors switch to FR / NL themselves), old
  unprefixed URLs (pre-redesign site) with a 301 to the same page in English
  (`LEGACY_LANG = "en"` in `src/lib/locale.ts`), and blog articles, old or
  under `/en` / `/nl`, to `/fr/blog/…` in one hop (articles are French-only,
  MDX in `content/blog/`). A trailing slash is
  removed in the same hop. Static files are never redirected.
- **Redirect check:** `node scripts/check-redirects.mjs <base URL>` tests every
  old URL (the pre-redesign sitemap + other old pages). Run it on the Vercel
  preview before launch and on the live site right after.
- **Rentals** are switched off for now (`RENTALS_ENABLED = false` in
  `src/lib/locale.ts`): the page and its code stay, `/rentals` and
  `/<lang>/rentals` redirect (307) to Buy. To switch back on: set it to `true`
  and add the links (Header, Footer) and the sitemap entry again.
- `src/lib/i18n.ts` is the single UI dictionary: one entry per language,
  same keys in all three (TypeScript checks it). **To change UI wording, edit
  this file**, always in all three languages. The approved copy is English;
  French / Dutch drafts are marked `// TODO client review`.
- `src/components/LanguageProvider.tsx` gives components `useLanguage()`
  (`{ lang, t }`), with the language taken from the URL. `LanguageToggle.tsx`
  switches to the same page under another prefix.
- The region is always called **"Golfe de Saint-Tropez"**, in every language.

### Property listings (Apimo)
- `src/lib/apimo.ts` talks to the Apimo API: `fetchApimoProperties()` (list) and
  `fetchApimoProperty(id)` (one listing), with the `APIMO_PROVIDER` /
  `APIMO_TOKEN` / `APIMO_AGENCY` env vars. Responses are cached for 10 minutes
  (`revalidate: 600`).
- `src/lib/properties.ts` is the layer pages call: `getProperties()`,
  `getProperty(id)`, `getFeaturedProperties()`, `getCities()`. **Fallback:**
  without the Apimo env vars, the site serves the demo dataset
  (`mockProperties`).
- **Listing texts are per language:** Apimo's title and description are kept
  for FR, EN and NL (`src/lib/property-text.ts`: `propertyTitle()`,
  `propertyDescription()`). If a language is missing, the site falls back to
  French, then to any language the listing has. Missing translations are
  fixed in Apimo, not in the code.
- **Price on request:** a price of 0, missing, or hidden in Apimo shows "Price
  on request" (FR/EN/NL) instead of a price. Such listings appear under "All
  prices" but not in a budget range, and sort last (`hasPrice()` in
  `properties.ts`).
- **Location filter (Buy + Home search):** cities match exactly, ignoring
  capitals, accents, hyphens and a leading "La / Le" (`normalizeCity()` in
  `src/lib/filters.ts`). Golfe towns come first, the other cities under
  "Other areas" (list `GOLFE_TOWNS` in `filters.ts`).
- Pages: `src/app/[lang]/properties/page.tsx` (Buy) and
  `src/app/[lang]/properties/[id]/page.tsx` (detail). Images come from Apimo's
  CDN through Vercel's image optimizer.

### Villages
- 9 village pages, one template: `src/components/LocationDetail.tsx`. Texts:
  `src/lib/village-content.ts` (client PDFs, EN / FR + NL drafts); names,
  photos and slugs: `locations` in `src/lib/properties.ts`. Figures (average
  price, number of properties) are static text there.
- "Properties in this region" shows up to 3 listings of that village. With
  more, a "View all properties in [village]" link opens Buy filtered on it.
  With none, an off-market text and a Contact button.

### Checks before a release
- `npm run lint` and `npm run build` must pass with no errors or warnings
  (both clean at step 24).
- Step 24 results: all 76 pages (every page × FR / EN / NL, plus an article)
  load with no hydration warnings or console errors, at 1440px and 390px, with
  no horizontal scrolling (tested on the dev server). Unknown addresses return
  404 with the translated "Page not found" page (checked on the production
  build).
- Lighthouse at step 24 (local production build; Vercel will differ):

  | Page | Performance (mobile / desktop) | Accessibility | Best practices | SEO |
  |---|---|---|---|---|
  | Home | 75–79 / 86 | 100 | 100 | 100 |
  | Property | 77 / 77 | 96 (champagne contrast, see below) | 100 | 100 |

  CLS is 0 everywhere. Mobile time is mostly JavaScript start-up and the size
  of the Apimo photos.

### Known open points
- **Contrast:** the champagne city line above a property title
  (`type-eyebrow text-brand-accent` on white) is below the WCAG AA contrast
  ratio for small text. That's a Figma decision; ask the designer before
  changing it.
- **Dev server only:** the 404 page logs one React warning ("Encountered a
  script tag…") because Next.js re-renders the layout's inline reveal script
  in the browser there. Production is not affected. Leave it: moving the
  script to `next/script` would run it too late and let content flash.
- **Apimo data:** REF-1073 (Monaco) exists in English only, so it shows in
  English on `/fr` and `/nl`. A Grimaud listing is titled "Port-Grimaud…";
  if it really is in Port Grimaud, correct its city in Apimo.
- **Mobile Figma frame** for About still shows "Our story" on white; the site
  uses light blue on mobile too, as the client asked.
