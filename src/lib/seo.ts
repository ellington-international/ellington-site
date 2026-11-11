import type { Metadata } from "next";
import type { Lang } from "./i18n";
import { LOCALES } from "./locale";

// Per-language metadata (redesign step 12). Every public page gets:
//   canonical = its own language version, e.g. /en/sell
//   hreflang  = en / fr / nl versions + x-default
// x-default: the English version (the site's default language). Not the bare
// domain "/": it is a 301 to /en, and hreflang should not point at a redirect.

export const OG_LOCALE: Record<Lang, string> = { fr: "fr_FR", en: "en_GB", nl: "nl_NL" };

/** `path` without language, e.g. "/sell" or "/" */
export function languageAlternates(lang: Lang, path: string, only: readonly Lang[] = LOCALES): Metadata["alternates"] {
  const url = (l: Lang) => (path === "/" ? `/${l}` : `/${l}${path}`);
  const languages: Record<string, string> = {};
  for (const l of only) languages[l] = url(l);
  if (only.length > 1) languages["x-default"] = url("en");
  return { canonical: url(lang), languages };
}

type Copy = { title: string; description: string };
type PageKey =
  | "properties"
  | "rentals"
  | "sell"
  | "about"
  | "contact"
  | "blog"
  | "locations"
  | "legal"
  | "privacy"
  | "login"
  | "signup"
  | "favorites";

// FR = the existing titles. EN / NL drafted for step 12.
// TODO client review (FR + NL)
export const PAGE_META: Record<PageKey, Record<Lang, Copy>> = {
  properties: {
    fr: {
      title: "Propriétés à vendre — Ellington",
      description:
        "Découvrez notre sélection de biens d'exception à vendre dans le Golfe de Saint-Tropez : villas, penthouses, domaines, appartements de prestige.",
    },
    en: {
      title: "Properties for sale — Ellington",
      description:
        "Discover our selection of exceptional properties for sale in the Golfe de Saint-Tropez: villas, penthouses, estates and prestige apartments.",
    },
    nl: {
      title: "Woningen te koop — Ellington",
      description:
        "Ontdek onze selectie uitzonderlijke woningen te koop in de Golfe de Saint-Tropez: villa's, penthouses, landgoederen en luxeappartementen.",
    },
  },
  rentals: {
    fr: {
      title: "Locations saisonnières — Ellington",
      description: "Sélection de villas, mas et appartements à louer sur le Golfe de Saint-Tropez et la Côte d'Azur.",
    },
    en: {
      title: "Seasonal rentals — Ellington",
      description: "A selection of villas, mas and apartments to rent in the Golfe de Saint-Tropez and on the Côte d'Azur.",
    },
    nl: {
      title: "Vakantieverhuur — Ellington",
      description: "Een selectie villa's, mas en appartementen te huur in de Golfe de Saint-Tropez en aan de Côte d'Azur.",
    },
  },
  sell: {
    fr: {
      title: "Vendre votre bien d'exception sur le Golfe de Saint-Tropez",
      description:
        "Vendez votre propriété avec Ellington : estimation sur-mesure, réseau international et accompagnement confidentiel pour les biens d'exception de la Côte d'Azur.",
    },
    en: {
      title: "Sell your exceptional property in the Golfe de Saint-Tropez",
      description:
        "Sell your property with Ellington: a tailored valuation, an international network and confidential guidance for exceptional homes on the Côte d'Azur.",
    },
    nl: {
      title: "Verkoop uw uitzonderlijke woning in de Golfe de Saint-Tropez",
      description:
        "Verkoop uw woning met Ellington: een waardebepaling op maat, een internationaal netwerk en discrete begeleiding voor uitzonderlijke woningen aan de Côte d'Azur.",
    },
  },
  about: {
    fr: {
      title: "À propos — Notre agence de prestige du Golfe de Saint-Tropez",
      description:
        "Découvrez Ellington Properties : agence immobilière de prestige du Golfe de Saint-Tropez, son équipe trilingue (FR/EN/NL) et ses valeurs d'excellence et de discrétion.",
    },
    en: {
      title: "About us — Our luxury agency in the Golfe de Saint-Tropez",
      description:
        "Meet Ellington Properties: a luxury real estate agency in the Golfe de Saint-Tropez, its trilingual team (FR/EN/NL) and its values of excellence and discretion.",
    },
    nl: {
      title: "Over ons — Ons exclusieve makelaarskantoor in de Golfe de Saint-Tropez",
      description:
        "Maak kennis met Ellington Properties: makelaar in exclusief vastgoed in de Golfe de Saint-Tropez, met een drietalig team (FR/EN/NL) en waarden als excellentie en discretie.",
    },
  },
  contact: {
    fr: {
      title: "Contact — Acquérir, vendre ou estimer un bien d'exception",
      description:
        "Contactez Ellington Properties pour acquérir, vendre ou estimer un bien d'exception sur le Golfe de Saint-Tropez et la Côte d'Azur. Réponse sous 24 heures.",
    },
    en: {
      title: "Contact — Buy, sell or value an exceptional property",
      description:
        "Contact Ellington Properties to buy, sell or value an exceptional property in the Golfe de Saint-Tropez and on the Côte d'Azur. Reply within 24 hours.",
    },
    nl: {
      title: "Contact — Een uitzonderlijke woning kopen, verkopen of laten waarderen",
      description:
        "Neem contact op met Ellington Properties om een uitzonderlijke woning te kopen, te verkopen of te laten waarderen in de Golfe de Saint-Tropez en aan de Côte d'Azur. Antwoord binnen 24 uur.",
    },
  },
  blog: {
    fr: {
      title: "Le journal Ellington — Guides, marché et art de vivre du Golfe de Saint-Tropez",
      description:
        "Guides d'achat, analyses de marché, lifestyle : retrouvez nos articles sur l'immobilier de prestige dans le Golfe de Saint-Tropez.",
    },
    en: {
      title: "The Ellington Journal — Guides, market and lifestyle in the Golfe de Saint-Tropez",
      description:
        "Buyer's guides, market analyses and lifestyle: our articles on luxury real estate in the Golfe de Saint-Tropez (published in French).",
    },
    nl: {
      title: "Het Ellington Journal — Gidsen, markt en levensstijl in de Golfe de Saint-Tropez",
      description:
        "Koopgidsen, marktanalyses en lifestyle: onze artikelen over exclusief vastgoed in de Golfe de Saint-Tropez (in het Frans).",
    },
  },
  locations: {
    fr: {
      title: "Nos régions — Ellington",
      description:
        "Explorez les villages les plus prestigieux du Golfe de Saint-Tropez où Ellington opère : Saint-Tropez, Grimaud, Port Grimaud, Ramatuelle, Gassin, Sainte-Maxime.",
    },
    en: {
      title: "Our villages — Ellington",
      description:
        "Explore the most prestigious villages of the Golfe de Saint-Tropez where Ellington works: Saint-Tropez, Grimaud, Port Grimaud, Ramatuelle, Gassin, Sainte-Maxime.",
    },
    nl: {
      title: "Onze dorpen — Ellington",
      description:
        "Ontdek de meest prestigieuze dorpen van de Golfe de Saint-Tropez waar Ellington actief is: Saint-Tropez, Grimaud, Port Grimaud, Ramatuelle, Gassin, Sainte-Maxime.",
    },
  },
  legal: {
    fr: { title: "Mentions légales", description: "Mentions légales du site Ellington Properties." },
    en: { title: "Legal notice", description: "Legal notice of the Ellington Properties website." },
    nl: { title: "Juridische informatie", description: "Juridische informatie over de website van Ellington Properties." },
  },
  privacy: {
    fr: {
      title: "Politique de confidentialité",
      description: "Politique de confidentialité et de protection des données personnelles d'Ellington Properties.",
    },
    en: { title: "Privacy policy", description: "Privacy and personal data protection policy of Ellington Properties." },
    nl: { title: "Privacybeleid", description: "Privacy- en gegevensbeschermingsbeleid van Ellington Properties." },
  },
  login: {
    fr: { title: "Connexion", description: "Connectez-vous à votre espace Ellington Properties." },
    en: { title: "Log in", description: "Log in to your Ellington Properties account." },
    nl: { title: "Inloggen", description: "Log in op uw Ellington Properties-account." },
  },
  signup: {
    fr: { title: "Créer un compte", description: "Créez votre compte pour sauvegarder vos biens favoris." },
    en: { title: "Create an account", description: "Create your account to save your favourite properties." },
    nl: { title: "Account aanmaken", description: "Maak een account aan om uw favoriete woningen te bewaren." },
  },
  favorites: {
    fr: { title: "Mes favoris", description: "Retrouvez les biens que vous avez sauvegardés." },
    en: { title: "My favourites", description: "The properties you have saved." },
    nl: { title: "Mijn favorieten", description: "De woningen die u hebt bewaard." },
  },
};

/** Standard metadata for a public page that exists in all three languages. */
export function pageMetadata(lang: Lang, key: PageKey, path: string, extra: Metadata = {}): Metadata {
  const { title, description } = PAGE_META[key][lang];
  return {
    title,
    description,
    alternates: languageAlternates(lang, path),
    ...extra,
    openGraph: { url: `/${lang}${path}`, locale: OG_LOCALE[lang], images: ["/og.jpg"], ...extra.openGraph },
  };
}

/** Breadcrumb "Home" label for JSON-LD */
export const HOME_LABEL: Record<Lang, string> = { fr: "Accueil", en: "Home", nl: "Home" };
