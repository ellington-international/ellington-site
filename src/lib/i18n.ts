export type Lang = "fr" | "en" | "nl";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "nl", label: "NL" },
];

// Dictionary structure — keep deeply nested objects, never use stringly-typed
// magic keys at the call site (TS will autocomplete every leaf).
//
// Note: `as const` widens to literal types per language, which makes FR and
// EN incompatible. Cast back to a unified shape via `Dict` so the union
// resolves to a single shape downstream.
const dictRaw = {
  fr: {
    nav: {
      properties: "Propriétés",
      buy: "Acheter",
      rentals: "Locations",
      regions: "Nos régions",
      regionsNav: "Régions",
      sell: "Vendre",
      journal: "Journal",
      about: "À propos",
      contact: "Contact",
      login: "Connexion",
      favorites: "Favoris",
      menu: "Menu",
      close: "Fermer", // TODO client review
    },
    thankYou: {
      // TODO client review (FR draft)
      requestEyebrow: "Demande reçue",
      newsletterEyebrow: "Newsletter",
      title: "Merci",
      requestText: "Votre message nous est bien parvenu. Un membre de notre équipe vous répondra personnellement.",
      newsletterText: "Vous êtes inscrit à notre liste : nouveaux biens et histoires du Golfe.",
    },
    journal: {
      // Journal index + article pages (the articles themselves are French-only)
      eyebrow: "Le journal",
      titleBefore: "Chroniques du",
      titleAccent: "Golfe",
      subtitle: "Guides d'achat, analyses de marché et art de vivre — notre sélection éditoriale.",
      all: "Tous les articles",
      empty: "Aucun article dans cette catégorie pour le moment.",
      frenchOnly: "", // not shown on the French pages
      categories: {
        "guides-achat": "Guides d'achat",
        marche: "Marché immobilier",
        architecture: "Architecture & patrimoine",
        "art-de-vivre": "Art de vivre",
        fiscalite: "Fiscalité & juridique",
      },
      back: "Retour au journal",
      related: "À lire aussi",
      readingTime: "{n} min de lecture",
      team: "Équipe Ellington",
      ctaTitle: "Échangez avec un conseiller Ellington",
      ctaText: "Une expertise confidentielle, off-market, sur l'ensemble du Golfe de Saint-Tropez.",
      // Article page (Figma "08.1 Article"). TODO client review (FR draft)
      bandTitle: "Échangez avec un conseiller Ellington",
      bandSubtitle: "Des conseils confidentiels pour acheter dans tout le Golfe de Saint-Tropez.",
      bandCta: "Demander une consultation",
      keepReading: "À lire aussi",
    },
    village: {
      // Village page template (step 18). TODO client review (FR draft)
      back: "← Retour aux régions",
      eyebrow: "Le village",
      averagePrice: "Prix moyen",
      properties: "Biens",
      seeDoEyebrow: "À découvrir",
      seeDoTitle: "À voir & à faire",
      experiencesEyebrow: "Art de vivre",
      experiencesTitle: "Expériences",
      favouritesEyebrow: "Notre sélection",
      favouritesTitle: "Nos coups de cœur",
      investmentEyebrow: "Marché",
      investmentTitle: "Investissement & marché",
      bandTitle: "Votre expert local dans cette région",
      bandSubtitle: "Nous vivons et travaillons dans le Golfe — posez-nous toutes vos questions sur ce village.",
      bandCta: "Demander une consultation",
      propertiesTitle: "Biens dans cette région",
      viewAll: "Tout voir →",
      empty: "Aucun bien dans cette région pour le moment.",
    },
    heroes: {
      // Photo heroes of the inner pages (PageHero). TODO client review (FR draft)
      buyTitle: "Propriétés à vendre",
      buySubtitle: "Des biens d'exception sur la Côte d'Azur.",
      sellTitle: "Vendre avec nous",
      sellSubtitle: "Une estimation honnête, les bons acheteurs et des nouvelles claires jusqu'à la signature.",
      sellCta: "Demander une estimation",
      locationsTitle: "Nos régions",
      locationsSubtitle: "Les villages du Golfe de Saint-Tropez.",
      aboutTitle: "À propos d'Ellington",
      aboutSubtitle: "Fondée en 2023 dans le Golfe de Saint-Tropez.",
      journalSubtitle: "Guides d'achat, analyses de marché et art de vivre sur la Riviera.",
      contactTitle: "Nous contacter",
      contactSubtitle: "Nous répondons personnellement à chaque message.",
    },
    common: {
      backToPortfolio: "Retour au portefeuille",
      addFavorite: "Ajouter aux favoris",
      removeFavorite: "Retirer des favoris",
      contactUs: "Nous contacter",
      callUs: "+33 4 93 12 34 56",
      readMore: "Découvrir →",
      swipeHint: "← Faites glisser →",
      loading: "...",
      send: "Envoyer le message",
      sending: "Envoi…",
      reset: "Réinitialiser",
    },
    home: {
      // Home redesign (step 13). Figma "01 Home" copy is English; FR draft.
      // TODO client review (FR draft)
      title: "Là où la Riviera devient chez vous",
      subtitle: "Villas, domaines et maisons les pieds dans l'eau autour de Saint-Tropez.",
      heroAlt: "Jardin d'une villa avec vue sur le Golfe de Saint-Tropez",
      scroll: "Défiler",
      whyEyebrow: "Le standard Ellington",
      whyStatement: "Des conseils honnêtes, un ancrage local et un compte rendu écrit chaque mois.",
      points: [
        {
          title: "Des conseils honnêtes",
          body: "Nous vous disons ce que nous pensons vraiment du prix — vous gardez le dernier mot.",
        },
        { title: "Un ancrage local", body: "Basés à Gassin, des Issambres au Lavandou." },
        {
          title: "Des acheteurs du monde entier",
          body: "Nous vous conseillons en français, en anglais et en néerlandais.",
        },
      ] as { title: string; body: string }[],
      whyCta: "Vendre avec nous →",
      featuredEyebrow: "Sélection",
      featuredTitle: "Biens à la une",
      featuredSubtitle: "Une sélection des propriétés d'exception que nous représentons actuellement.",
      featuredCta: "Voir tout le portefeuille →",
      signatureEyebrow: "Notre signature",
      signatureTitle: "Un expert local pas comme les autres.",
      signatureLead:
        "Fondée en 2023 dans le Golfe de Saint-Tropez par deux associés qui partagent une passion pour l'immobilier et l'architecture.",
      signatureText:
        "Nous nous concentrons sur les villas et domaines d'exception, et restons aux côtés de nos clients de la première visite à la signature chez le notaire.",
      signatureQuote: "« Des conseils honnêtes, de la première visite à la signature finale. »",
      signatureCta: "En savoir plus →",
      signatureAlt: "Une baie de la Côte d'Azur au coucher du soleil",
      journalCta: "Voir tous les articles →",
      browseByCategory: "Parcourir par catégorie",
      newsletterEyebrow: "Newsletter",
      newsletterTitle: "Restez informé",
      newsletterSubtitle:
        "Recevez en exclusivité nos nouveaux biens et nos analyses du marché immobilier.",
      newsletterPlaceholder: "Votre adresse email",
      newsletterSubmit: "S'inscrire",
      // Still used on the About page until its redesign (step 21)
      expertTitle: "Un expert local pas comme les autres.",
    },
    search: {
      buy: "Achat",
      rent: "Location",
      location: "Localisation",
      type: "Type de bien",
      budget: "Budget",
      sort: "Trier par",
      allLocations: "Toutes",
      allTypes: "Tous types",
      allBudgets: "Tous budgets",
      allPrices: "Tous les prix",
      bedrooms: "Chambres",
      allBedrooms: "Toutes",
      submit: "Rechercher",
      results: (n: number) =>
        `${n} bien${n > 1 ? "s" : ""} disponible${n > 1 ? "s" : ""}`,
      noResults: "Aucun bien ne correspond à votre recherche.",
      noResultsCta: "Réinitialiser les filtres",
    },
    types: {
      villa: "Villa",
      penthouse: "Penthouse",
      apartment: "Appartement",
      estate: "Domaine",
      chalet: "Chalet",
      townhouse: "Maison de ville",
      land: "Terrain",
    },
    sort: {
      newest: "Plus récents",
      priceDesc: "Prix décroissant",
      priceAsc: "Prix croissant",
      areaDesc: "Surface décroissante",
    },
    priceRanges: {
      all: "Tous les prix",
      under3: "Jusqu'à 3 M€",
      r3to6: "3 – 6 M€",
      r6to10: "6 – 10 M€",
      r10to15: "10 – 15 M€",
      over15: "15 M€ et plus",
    },
    propertyDetail: {
      reference: "Réf.",
      exclusive: "Exclusivité",
      price: "Prix",
      bedrooms: "Chambres",
      bathrooms: "Salles de bain",
      area: "Surface",
      year: "Année",
      origin: "Origine",
      type: "Type",
      landArea: "Surface terrain",
      propertyDetailsTitle: "Détails du bien",
      officeHours: "Horaires",
      description: "Description",
      features: "Prestations",
      location: "Localisation",
      mapUnavailable: "Carte indisponible",
      addressNote:
        "Adresse précise communiquée sur demande, dans le respect de la confidentialité de notre client.",
      interestedTitle: "Intéressé ?",
      interestedBody:
        "Contactez-nous pour plus d'informations ou planifier une visite privée.",
      yourAdvisor: "Votre conseiller",
      advisorRole: "Directeur du portefeuille",
      phone: "Téléphone",
      email: "Email",
      confidentialTitle: "Service confidentiel",
      confidentialBody:
        "Toutes les demandes sont traitées avec la plus stricte discrétion. Notre clientèle internationale apprécie notre exigence de confidentialité.",
      similar: "Biens",
      similarAccent: "similaires",
      shortBed: "ch.",
      shortBath: "sdb.",
      energyTitle: "Performance énergétique",
      // Energy block (Figma "Energy performance"). TODO client review (FR draft)
      energyClass: "Classe énergie (DPE)",
      ghgClass: "Émissions de gaz à effet de serre (GES)",
      energyValue: (n: number) => `${n.toLocaleString("fr-FR")} kWh/m²/an`,
      ghgValue: (n: number) => `${n.toLocaleString("fr-FR")} kg CO₂/m²/an`,
      energyCost: (min: string, max: string, year?: number) =>
        `Coûts annuels d'énergie estimés pour un usage standard : ${min} – ${max}${year ? ` (prix ${year})` : ""}.`,
      energyUnavailable: "Diagnostic en cours.",
      photoPrev: "Photo précédente",
      photoNext: "Photo suivante",
      photoOpen: "Agrandir la photo",
      photoN: (n: number) => `Photo ${n}`,
      similarTitle: "Biens similaires",
      viewAll: "Tout voir →",
    },
    priceUnit: {
      week: "sem.",
      month: "mois",
    },
    propertiesPage: {
      eyebrow: "Portefeuille",
      titleBefore: "Propriétés",
      titleAccent: "à vendre",
      subtitle:
        "Découvrez les biens d'exception sélectionnés par Ellington sur l'ensemble de la Côte d'Azur.",
    },
    locationsPage: {
      // Locations redesign (step 17). TODO client review (FR draft)
      eyebrow: "Le Golfe de Saint-Tropez",
      intro:
        "Des villages perchés de Gassin et Ramatuelle aux canaux de Port Grimaud et aux baies plus paisibles de Cavalaire et du Rayol-Canadel, chaque village du Golfe a son caractère, son rythme et son type de maison. Choisissez un village pour découvrir la vie qu'on y mène et les biens que nous y représentons actuellement.",
    },
    aboutPage: {
      // About redesign (step 19). Figma copy is English; FR draft.
      // TODO client review (FR draft)
      introTitle: "Petite par choix, locale par nature.",
      introSubtitle: "Une agence jeune et indépendante pour des biens d'exception sur la Riviera.",
      stats: [
        { value: "2023", label: "Fondée dans le Golfe" },
        { value: "3", label: "Langues · FR, EN, NL" },
        { value: "9", label: "Villages du Golfe" },
        { value: "Mensuel", label: "Compte rendu écrit aux propriétaires" },
      ],
      storyEyebrow: "Notre histoire",
      storySubtitle: "Fondée dans le Golfe de Saint-Tropez par deux associés passionnés d'immobilier et d'architecture.",
      story: [
        "Ellington a été fondée en 2023 par deux associés qui partagent une passion pour l'immobilier et l'architecture. Depuis notre bureau de Gassin, nous couvrons le Golfe de Saint-Tropez, des Issambres au Lavandou, et accompagnons des biens d'exception plus loin sur la Riviera.",
        "Nos clients viennent du monde entier. Nous travaillons en français, en anglais et en néerlandais, pour que rien ne se perde entre acheteur, vendeur et notaire.",
        "Notre approche est simple : être disponibles, être discrets et donner des conseils honnêtes. Si nous pensons qu'un prix n'est pas juste, nous vous le disons — la décision vous appartient toujours.",
      ] as string[],
      storyAlt: "Une ruelle du village de Gassin",
      valuesEyebrow: "Ce qui nous guide",
      values: [
        {
          title: "Honnêteté",
          body: "Des réponses franches sur le prix et le marché, même quand elles ne sont pas les plus faciles. Vous gardez le dernier mot.",
        },
        {
          title: "Discrétion",
          body: "Vos projets, votre bien et vos informations restent entre nous — hors des portails publics si vous le souhaitez.",
        },
        {
          title: "Ancrage local",
          body: "Nous vivons et travaillons dans le Golfe et en connaissons les villages, les domaines et les vues.",
        },
      ] as { title: string; body: string }[],
      teamTitle: "L'équipe",
      team: [
        {
          name: "Marc Mehagnoul",
          role: "Fondateur & CEO",
          photo: "/team/marc-mehagnoul-v3.jpg",
          bio: "Fondateur d'Ellington, Marc met sa connaissance intime du Golfe de Saint-Tropez et son exigence d'excellence au service d'une clientèle internationale en quête de biens d'exception.",
          email: "marc@ellington-international.com",
          phone: "+33 6 74 75 07 03",
        },
        {
          name: "Sasha Bazzaro",
          role: "Co-fondateur & CEO",
          photo: "/team/sasha-bazzaro.jpg",
          bio: "Co-fondateur d'Ellington, Sasha partage la même exigence d'excellence et accompagne une clientèle internationale dans ses projets les plus prestigieux sur la Côte d'Azur.",
          email: "",
          phone: "+33 7 69 95 69 27",
        },
        {
          name: "Sophia Potentier",
          role: "Chargée de gestion commerciale",
          photo: "/team/sophia-potentier.jpg",
          bio: "Au cœur de la relation client, Sophia orchestre la gestion commerciale d'Ellington avec rigueur et sens du détail, garantissant un accompagnement fluide à chaque étape.",
          email: "",
          phone: "+33 6 14 54 71 30",
        },
      ],
      // Still used on the article pages (BlogPostShell)
      ctaEyebrow: "Une question ?",
      ctaTitle: "Trouvons votre bien",
      ctaBody: "Acheter, vendre ou estimer — dites-nous ce que vous avez en tête.",
      ctaPrimary: "Voir les biens",
    },
    contactPage: {
      eyebrow: "Contact",
      titleBefore: "Prenons",
      titleAccent: "contact",
      subtitle:
        "Nous sommes là pour répondre à vos questions et vous guider tout au long de votre parcours immobilier de prestige.",
      formTitle: "Envoyez-nous un message",
      formSubtitle:
        "Remplissez le formulaire ci-dessous et un membre de notre équipe vous répondra sous 24 heures.",
      detailsTitle: "Coordonnées",
      hoursTitle: "Horaires",
      advisorBlock: {
        eyebrow: "Votre interlocuteur",
        role: "Directeur du portefeuille",
        intro:
          "Chaque échange est traité personnellement, dans la plus stricte discrétion. N'hésitez pas à m'écrire, je vous recontacte sous 24 heures.",
        signature: "— Marc",
      },
      address: "Espace Lemarquis\nQuartier Bertaud\n83580 Gassin — France",
      monFri: "Lundi – Vendredi",
      sat: "Samedi",
      sun: "Dimanche",
      sunHours: "Sur RDV",
      monFriHours: "9h – 18h",
      satHours: "10h – 16h",
      confidentialTitle: "Service confidentiel",
      confidentialBody:
        "Toutes vos demandes sont traitées avec la plus stricte discrétion, conformément à notre engagement de confidentialité.",
      thanks: "Merci.",
      successBody:
        "Votre message a bien été reçu. Un conseiller vous recontactera sous 24 heures, en toute confidentialité.",
      firstName: "Prénom",
      lastName: "Nom",
      emailField: "Email",
      phone: "Téléphone",
      firstNamePh: "Jean",
      lastNamePh: "Dupont",
      emailPh: "jean.dupont@exemple.com",
      phonePh: "+33 6 12 34 56 78",
      subject: "Objet *",
      subjectPlaceholder: "Sélectionnez un objet",
      subjects: [
        "Acquisition d'un bien",
        "Estimation d'un bien",
        "Vente d'un bien",
        "Location saisonnière",
        "Autre demande",
      ],
      messageLabel: "Message",
      messagePlaceholder: "Décrivez votre demande en détail…",
      disclaimer:
        "En soumettant ce formulaire, vous acceptez notre politique de confidentialité. Nous ne partagerons jamais vos informations personnelles avec des tiers et ne les utiliserons que pour répondre à votre demande.",
      sendMessage: "Envoyer le message",
      consent:
        "J'accepte que mes informations soient utilisées pour me recontacter dans le cadre de ma demande.",
    },
    rentalsPage: {
      eyebrow: "Locations saisonnières",
      titleBefore: "Locations",
      titleAccent: "saisonnières",
      subtitle:
        "Une sélection de villas, mas et appartements à louer sur le Golfe de Saint-Tropez et la Côte d'Azur.",
    },
    sellPage: {
      // Sell redesign (step 16). Figma copy is English; FR draft.
      // TODO client review (FR draft)
      whyTitle: "Pourquoi Ellington ?",
      whyLead:
        "Fondée en 2023 dans le Golfe de Saint-Tropez par deux associés qui partagent une passion pour l'immobilier et l'architecture.",
      whyBody: [
        "Depuis notre bureau de Gassin, nous parcourons chaque jour le Golfe de Saint-Tropez, des Issambres au Lavandou. Savoir quels domaines, quelles rues et quelles vues recherchent les acheteurs nous permet de fixer un prix réaliste et de trouver le bon acquéreur.",
        "Nos acheteurs viennent du monde entier. Nous travaillons en français, en anglais et en néerlandais, et présentons chaque nouveau bien directement aux acheteurs actifs inscrits chez nous.",
        "Nous vous disons honnêtement à quel prix votre bien se vendra selon nous — même si ce n'est pas ce que vous espériez entendre — et vous gardez toujours le dernier mot.",
      ] as string[],
      methodEyebrow: "Notre méthode",
      processTitle: "Notre processus de vente",
      stepLabel: (n: number) => `Étape ${String(n).padStart(2, "0")}`,
      steps: [
        {
          title: "Une estimation honnête",
          body: "Nous visitons, comparons avec les ventes récentes du secteur et vous donnons un prix réaliste — en vous disant si nous jugeons les attentes trop élevées.",
        },
        {
          title: "La présentation",
          body: "Dès que vous nous confiez la vente, nous préparons les photos, une description complète et les documents que les acheteurs demanderont.",
        },
        {
          title: "Les bons acheteurs",
          body: "Votre bien est d'abord présenté aux acheteurs actifs inscrits chez nous, puis aux agences partenaires et aux portails internationaux.",
        },
        {
          title: "Offres et signature",
          body: "Nous accompagnons chaque visite, négocions les offres et coordonnons les diagnostics et le notaire jusqu'à la signature finale.",
        },
      ] as { title: string; body: string }[],
      trustEyebrow: "Notre promesse",
      trustTitle: "Pourquoi nos clients nous font confiance",
      trustAlt: "Vue sur le Golfe de Saint-Tropez depuis une terrasse",
      trustCards: [
        {
          title: "Un prix honnête",
          body: "Nous vous conseillons honnêtement sur le prix, quitte à ne pas être d'accord avec vous. Vous gardez le dernier mot.",
        },
        {
          title: "Un rapport mensuel",
          body: "Un compte rendu écrit chaque mois : visites, retours, offres et ce que nous suggérons d'ajuster.",
        },
        {
          title: "La discrétion",
          body: "Si vous le souhaitez, votre bien n'est présenté qu'à des acheteurs qualifiés — hors des portails publics.",
        },
        { title: "Une petite équipe", body: "Vous traitez avec les mêmes personnes, de l'estimation à la signature." },
      ] as { title: string; body: string }[],
      ctaTitle: "Découvrez la vraie valeur de votre bien",
      ctaSubtitle:
        "Vous pensez vendre, ou êtes simplement curieux de savoir ce que vaut votre bien aujourd'hui ? Nous vous donnerons un chiffre honnête.",
      ctaButton: "Demander votre estimation confidentielle →",
    },
    footer: {
      tagline:
        "Immobilier de prestige sur la Côte d'Azur. Biens d'exception, accompagnement confidentiel.",
      explore: "Explorer",
      contact: "Contact",
      hours: "Horaires",
      regions: "Nos régions",
      monFri: "Lundi – Vendredi · 9h – 18h",
      sat: "Samedi · 10h – 16h",
      sun: "Dimanche · sur rendez-vous",
      cityLabel: "Gassin · Var · France",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      cookies: "Gérer les cookies",
      rights: (year: number) => `© ${year} Ellington. Tous droits réservés.`,
    },
    cookies: {
      title: "Cookies & confidentialité",
      description:
        "Nous utilisons des cookies essentiels au fonctionnement du site (connexion, préférences) et, avec votre accord, des cookies pour mesurer son audience et améliorer votre expérience. Vous pouvez modifier votre choix à tout moment.",
      acceptAll: "Tout accepter",
      refuse: "Tout refuser",
      customize: "Personnaliser",
      save: "Enregistrer mes choix",
      learnMore: "En savoir plus",
      manage: "Gérer mes préférences",
      essentialLabel: "Cookies essentiels",
      essentialDesc:
        "Nécessaires au fonctionnement du site (authentification, préférences de langue). Toujours actifs.",
      analyticsLabel: "Mesure d'audience",
      analyticsDesc:
        "Nous aident à comprendre comment le site est utilisé afin de l'améliorer. Aucune donnée n'est utilisée à des fins publicitaires.",
      marketingLabel: "Marketing",
      marketingDesc:
        "Permettent de mesurer l'efficacité de nos communications et de personnaliser certains contenus.",
    },
    legalPage: {
      metaTitle: "Mentions légales",
      metaDescription: "Mentions légales du site Ellington Properties.",
      eyebrow: "Informations légales",
      titleBefore: "Mentions",
      titleAccent: "légales",
      editorHeading: "Éditeur du site",
      companyLabel: "Raison sociale",
      companyValue: "Ellington Properties",
      formLabel: "Forme juridique",
      formValue: "Société",
      addressLabel: "Siège social",
      addressValue: "Espace Lemarquis\nQuartier Bertaud\n83580 Gassin — France",
      siretLabel: "Numéro SIRET",
      vatLabel: "TVA intracommunautaire",
      phoneLabel: "Téléphone",
      emailLabel: "Email",
      directorLabel: "Directeur de la publication",
      directorValue: "Marc Mehagnoul",
      hostingHeading: "Hébergement",
      hostingBefore: "Le site est hébergé par ",
      hostingAfter:
        ", 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — ",
      ipHeading: "Propriété intellectuelle",
      ipBody:
        "L'ensemble du contenu présent sur ce site (textes, images, graphismes, logos, vidéos, photographies, données techniques, etc.) est la propriété exclusive de Ellington Properties ou de ses partenaires, et est protégé par les lois en vigueur sur la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable est strictement interdite et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.",
      regulatedHeading: "Activité réglementée",
      regulatedBefore:
        "Ellington Properties exerce une activité d'intermédiation immobilière soumise à la loi n° 70-9 du 2 janvier 1970, dite loi Hoguet. La carte professionnelle, les garanties financières et les coordonnées de la chambre de commerce et d'industrie de rattachement sont disponibles sur simple demande à ",
      dataHeading: "Données personnelles",
      dataBefore:
        "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés modifiée, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous à ",
    },
    privacyPage: {
      metaTitle: "Politique de confidentialité",
      metaDescription:
        "Politique de confidentialité et de protection des données personnelles d'Ellington Properties.",
      eyebrow: "Protection de vos données",
      titleBefore: "Politique de",
      titleAccent: "confidentialité",
      lastUpdated: "Dernière mise à jour : 5 mai 2026",
      intro:
        "Ellington Properties accorde une importance particulière à la protection de votre vie privée et de vos données personnelles. La présente politique vous informe de la manière dont nous recueillons, utilisons et protégeons les données collectées sur ce site, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés modifiée.",
      controllerHeading: "Responsable du traitement",
      controllerBody:
        "Ellington Properties — Espace Lemarquis, Quartier Bertaud, 83580 Gassin, France. SIRET 983 021 650.",
      controllerContact: "Contact : ",
      collectedHeading: "Données collectées",
      collectedIntro:
        "Nous ne collectons que les données strictement nécessaires aux services demandés :",
      collectedItems: [
        {
          label: "Formulaire de contact",
          body: "nom, email, téléphone, message. Finalité : répondre à votre demande de renseignement ou de visite.",
        },
        {
          label: "Création de compte",
          body: "adresse email, mot de passe (chiffré), identifiants de session. Finalité : permettre la sauvegarde de vos biens favoris.",
        },
        {
          label: "Favoris",
          body: "référence des biens ajoutés à vos favoris et date d'ajout. Finalité : afficher votre sélection personnelle.",
        },
        {
          label: "Préférences techniques",
          body: "langue choisie, choix de cookies. Stockés localement dans votre navigateur.",
        },
      ],
      legalBasisHeading: "Bases légales",
      legalBasisIntro: "Les traitements reposent sur :",
      legalBasisItems: [
        {
          label: "Votre consentement",
          body: "pour les cookies non essentiels et l'envoi de communications marketing.",
        },
        {
          label: "L'exécution d'un contrat ou de mesures précontractuelles",
          body: "pour le traitement de vos demandes (contact, visite) et la gestion de votre compte.",
        },
        {
          label: "L'intérêt légitime",
          body: "pour la sécurité technique du site et la prévention de la fraude.",
        },
        {
          label: "Les obligations légales",
          body: "pour la conservation de certaines données liées à l'activité réglementée d'agent immobilier.",
        },
      ],
      recipientsHeading: "Destinataires",
      recipientsIntro:
        "Vos données ne sont jamais vendues. Elles peuvent être partagées avec nos sous-traitants, dans la stricte mesure nécessaire à la fourniture du service :",
      recipientsItems: [
        {
          label: "Vercel Inc.",
          body: "(États-Unis) — hébergement du site. Transfert encadré par les Clauses Contractuelles Types de la Commission européenne.",
        },
        {
          label: "Supabase Inc.",
          body: "(Irlande, UE) — base de données et authentification. Données stockées en Union européenne.",
        },
        {
          label: "Apimo",
          body: "— logiciel de gestion immobilière, pour la synchronisation des biens présentés.",
        },
      ],
      retentionHeading: "Durée de conservation",
      retentionItems: [
        {
          label: "Demandes de contact",
          body: "3 ans à compter du dernier échange.",
        },
        {
          label: "Compte utilisateur et favoris",
          body: "jusqu'à la suppression du compte par vos soins ou après 3 ans d'inactivité.",
        },
        {
          label: "Cookies de mesure d'audience",
          body: "13 mois maximum.",
        },
        {
          label: "Données comptables et liées à l'activité d'agent immobilier",
          body: "durées légales de conservation.",
        },
      ],
      cookiesHeading: "Cookies",
      cookiesIntro: "Le site utilise différentes catégories de cookies :",
      cookiesItems: [
        {
          label: "Essentiels",
          body: "nécessaires au fonctionnement (authentification, panier, choix de langue, mémorisation de votre choix de cookies). Toujours actifs, ne nécessitent pas de consentement.",
        },
        {
          label: "Mesure d'audience",
          body: "soumis à votre consentement, ils permettent de comprendre l'usage du site pour l'améliorer. Désactivés tant que vous ne les acceptez pas.",
        },
        {
          label: "Marketing",
          body: "soumis à votre consentement, ils permettent de mesurer l'efficacité de nos communications. Désactivés tant que vous ne les acceptez pas.",
        },
      ],
      cookiesManageBtn: "Gérer mes préférences cookies",
      rightsHeading: "Vos droits",
      rightsIntro:
        "Conformément au RGPD, vous disposez à tout moment des droits suivants sur vos données :",
      rightsItems: [
        { label: "Accès", body: "obtenir une copie des données vous concernant." },
        { label: "Rectification", body: "corriger des données inexactes." },
        { label: "Effacement", body: "demander la suppression de vos données." },
        { label: "Limitation", body: "limiter le traitement dans certains cas." },
        {
          label: "Opposition",
          body: "vous opposer à un traitement, notamment marketing.",
        },
        {
          label: "Portabilité",
          body: "récupérer vos données dans un format structuré.",
        },
        {
          label: "Retrait du consentement",
          body: "à tout moment, sans effet rétroactif.",
        },
      ],
      rightsFooterBefore: "Pour exercer ces droits, contactez-nous à ",
      rightsFooterAfter: ". Nous répondons dans un délai d'un mois maximum.",
      complaintHeading: "Réclamation",
      complaintBefore:
        "Si vous estimez que le traitement de vos données ne respecte pas la réglementation, vous pouvez introduire une réclamation auprès de la ",
      complaintAfter: " — l'autorité française de protection des données.",
      securityHeading: "Sécurité",
      securityBody:
        "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre toute perte, altération, divulgation ou accès non autorisé : chiffrement des mots de passe, connexions HTTPS, contrôle d'accès aux outils internes, sous-traitants conformes au RGPD.",
      evolutionHeading: "Évolution de cette politique",
      evolutionBody:
        "Cette politique peut être mise à jour pour refléter les évolutions du site ou de la réglementation. La date de dernière mise à jour figure en haut de la page. Pour toute modification substantielle, vous serez informé via le site ou par email si vous disposez d'un compte.",
    },
  },
  en: {
    nav: {
      properties: "Properties",
      buy: "Buy",
      rentals: "Rentals",
      regions: "Our regions",
      regionsNav: "Locations",
      sell: "Sell",
      journal: "Journal",
      about: "About",
      contact: "Contact",
      login: "Login",
      favorites: "Favorites",
      menu: "Menu",
      close: "Close",
    },
    thankYou: {
      requestEyebrow: "Request received",
      newsletterEyebrow: "Newsletter",
      title: "Thank you",
      requestText: "Your message is with us. A member of our team will reply to you personally.",
      newsletterText: "You're on our list for new properties and stories from the Golfe.",
    },
    journal: {
      // Journal index + article pages (the articles themselves are French-only)
      eyebrow: "The Journal",
      titleBefore: "Stories from the",
      titleAccent: "Golfe",
      subtitle: "Buyer's guides, market analyses and Riviera lifestyle — our editorial selection.",
      all: "All articles",
      empty: "No article in this category yet.",
      frenchOnly: "Articles are currently published in French only — English versions coming soon.",
      categories: {
        "guides-achat": "Buyer's Guides",
        marche: "Market Analysis",
        architecture: "Architecture & Heritage",
        "art-de-vivre": "Lifestyle",
        fiscalite: "Tax & Legal",
      },
      back: "Back to journal",
      related: "Related",
      readingTime: "{n} min read",
      team: "Ellington team",
      ctaTitle: "Speak with one of our advisors",
      ctaText: "Confidential, off-market expertise across the Golfe de Saint-Tropez.",
      // Article page (Figma "08.1 Article")
      bandTitle: "Speak with an Ellington advisor",
      bandSubtitle: "Confidential advice on buying across the Golfe de Saint-Tropez.",
      bandCta: "Request a consultation",
      keepReading: "Keep reading",
    },
    village: {
      // Village page template (step 18), Figma "06 Village" copy
      back: "← Back to locations",
      eyebrow: "The village",
      averagePrice: "Average price",
      properties: "Properties",
      seeDoEyebrow: "Discover",
      seeDoTitle: "Things to see & do",
      experiencesEyebrow: "Lifestyle",
      experiencesTitle: "Experiences",
      favouritesEyebrow: "Our selection",
      favouritesTitle: "Our favourites",
      investmentEyebrow: "Market",
      investmentTitle: "Investment & market",
      bandTitle: "Your local expert in this region",
      bandSubtitle: "We live and work in the Golfe — ask us anything about this village.",
      bandCta: "Request a consultation",
      propertiesTitle: "Properties in this region",
      viewAll: "View all →",
      empty: "No properties in this region at the moment.",
    },
    heroes: {
      // Photo heroes of the inner pages (PageHero), Figma copy
      buyTitle: "Properties for sale",
      buySubtitle: "Exceptional homes across the French Riviera.",
      sellTitle: "Sell with us",
      sellSubtitle: "An honest valuation, the right buyers, and clear updates until the signature.",
      sellCta: "Request a valuation",
      locationsTitle: "Our locations",
      locationsSubtitle: "The villages of the Golfe de Saint-Tropez.",
      aboutTitle: "About Ellington",
      aboutSubtitle: "Founded in 2023 in the Golfe de Saint-Tropez.",
      journalSubtitle: "Buyer's guides, market analyses and Riviera life.",
      contactTitle: "Get in touch",
      contactSubtitle: "We reply personally to every message.",
    },
    common: {
      backToPortfolio: "Back to portfolio",
      addFavorite: "Add to favorites",
      removeFavorite: "Remove from favorites",
      contactUs: "Contact us",
      callUs: "+33 4 93 12 34 56",
      readMore: "Discover →",
      swipeHint: "← Swipe →",
      loading: "...",
      send: "Send message",
      sending: "Sending…",
      reset: "Reset",
    },
    home: {
      // Home redesign (step 13): Figma "01 Home" copy (approved).
      title: "Where the Riviera becomes home",
      subtitle: "Villas, estates and waterfront houses around Saint-Tropez.",
      heroAlt: "Villa garden overlooking the Golfe de Saint-Tropez",
      scroll: "Scroll",
      whyEyebrow: "The Ellington standard",
      whyStatement: "Honest advice, local roots, and a written update every month.",
      points: [
        {
          title: "Honest advice",
          body: "We tell you what we really think about price — you keep the final word.",
        },
        { title: "Local roots", body: "Based in Gassin, from Les Issambres to Le Lavandou." },
        { title: "Buyers from around the world", body: "We advise in French, English and Dutch." },
      ] as { title: string; body: string }[],
      whyCta: "Sell with us →",
      featuredEyebrow: "Selection",
      featuredTitle: "Featured properties",
      featuredSubtitle: "A selection of the exceptional homes we currently represent.",
      featuredCta: "View entire portfolio →",
      signatureEyebrow: "Our signature",
      signatureTitle: "Not your ordinary local expert.",
      signatureLead:
        "Founded in 2023 in the Golfe de Saint-Tropez by two partners who share a passion for property and architecture.",
      signatureText:
        "We focus on exceptional villas and estates, and stay close to our clients from the first visit to the signature at the notary.",
      signatureQuote: "“Honest advice, from the first visit to the final signature.”",
      signatureCta: "Learn more →",
      signatureAlt: "A bay on the Côte d'Azur at sunset",
      journalCta: "View all articles →",
      browseByCategory: "Browse by category",
      newsletterEyebrow: "Newsletter",
      newsletterTitle: "Stay informed",
      newsletterSubtitle: "Receive exclusive updates on new properties and market insights.",
      newsletterPlaceholder: "Your email address",
      newsletterSubmit: "Subscribe",
      // Still used on the About page until its redesign (step 21)
      expertTitle: "Not Your Ordinary Local Expert.",
    },
    search: {
      buy: "Buy",
      rent: "Rent",
      location: "Location",
      type: "Property type",
      budget: "Budget",
      sort: "Sort by",
      allLocations: "All",
      allTypes: "All types",
      allBudgets: "All budgets",
      allPrices: "All prices",
      bedrooms: "Bedrooms",
      allBedrooms: "All",
      submit: "Search",
      results: (n: number) =>
        `${n} propert${n === 1 ? "y" : "ies"} available`,
      noResults: "No property matches your search.",
      noResultsCta: "Reset filters",
    },
    types: {
      villa: "Villa",
      penthouse: "Penthouse",
      apartment: "Apartment",
      estate: "Estate",
      chalet: "Chalet",
      townhouse: "Townhouse",
      land: "Land",
    },
    sort: {
      newest: "Newest",
      priceDesc: "Price: high to low",
      priceAsc: "Price: low to high",
      areaDesc: "Largest area",
    },
    priceRanges: {
      all: "All prices",
      under3: "Up to €3M",
      r3to6: "€3 – €6M",
      r6to10: "€6 – €10M",
      r10to15: "€10 – €15M",
      over15: "€15M and above",
    },
    propertyDetail: {
      reference: "Ref.",
      exclusive: "Exclusive",
      price: "Price",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      area: "Living area",
      year: "Year",
      origin: "Origin",
      type: "Type",
      landArea: "Land area",
      propertyDetailsTitle: "Property details",
      officeHours: "Office hours",
      description: "Description",
      features: "Features",
      location: "Location",
      mapUnavailable: "Map unavailable",
      addressNote:
        "Exact address shared on request, in respect of our client's confidentiality.",
      interestedTitle: "Interested?",
      interestedBody:
        "Contact us for more information or to schedule a private viewing.",
      yourAdvisor: "Your advisor",
      advisorRole: "Portfolio director",
      phone: "Phone",
      email: "Email",
      confidentialTitle: "Confidential service",
      confidentialBody:
        "All enquiries are handled with the strictest discretion. Our international clientele values our commitment to confidentiality.",
      similar: "Similar",
      similarAccent: "properties",
      shortBed: "bd.",
      shortBath: "ba.",
      energyTitle: "Energy performance",
      // Energy block (Figma "Energy performance")
      energyClass: "Energy class (DPE)",
      ghgClass: "Greenhouse gas emissions (GES)",
      energyValue: (n: number) => `${n.toLocaleString("en-GB")} kWh/m²/year`,
      ghgValue: (n: number) => `${n.toLocaleString("en-GB")} kg CO₂/m²/year`,
      energyCost: (min: string, max: string, year?: number) =>
        `Estimated annual energy costs for standard use: ${min} – ${max}${year ? ` (${year} prices)` : ""}.`,
      energyUnavailable: "Diagnosis in progress.",
      photoPrev: "Previous photo",
      photoNext: "Next photo",
      photoOpen: "Enlarge photo",
      photoN: (n: number) => `Photo ${n}`,
      similarTitle: "Similar properties",
      viewAll: "View all →",
    },
    priceUnit: {
      week: "wk",
      month: "mo",
    },
    propertiesPage: {
      eyebrow: "Portfolio",
      titleBefore: "Properties",
      titleAccent: "for sale",
      subtitle:
        "Discover the exceptional properties curated by Ellington across the entire French Riviera.",
    },
    locationsPage: {
      // Locations redesign (step 17): Figma "05 Locations" copy
      eyebrow: "The Golfe de Saint-Tropez",
      intro:
        "From the hilltop villages of Gassin and Ramatuelle to the canals of Port Grimaud and the quieter bays of Cavalaire and Rayol-Canadel, every village around the Golfe has its own character, its own pace and its own kind of home. Choose a village to see what life there is like and which properties we currently represent.",
    },
    aboutPage: {
      // About redesign (step 19): Figma "07 About" copy
      introTitle: "Small by choice, local by nature.",
      introSubtitle: "A young, independent agency for exceptional homes on the Riviera.",
      stats: [
        { value: "2023", label: "Founded in the Golfe" },
        { value: "3", label: "Languages · FR, EN, NL" },
        { value: "9", label: "Villages in the Golfe" },
        { value: "Monthly", label: "Written owner reports" },
      ],
      storyEyebrow: "Our story",
      storySubtitle: "Founded in the Golfe de Saint-Tropez by two partners with a passion for property and architecture.",
      story: [
        "Ellington was founded in 2023 by two partners with a shared passion for property and architecture. From our office in Gassin we cover the Golfe de Saint-Tropez, from Les Issambres to Le Lavandou, and take on exceptional properties further along the Riviera.",
        "Our clients come from all over the world. We work in French, English and Dutch, so nothing gets lost between buyer, seller and notary.",
        "Our approach is simple: be available, be discreet, and give honest advice. If we think a price is wrong, we say so — the decision always stays with you.",
      ] as string[],
      storyAlt: "A street in the village of Gassin",
      valuesEyebrow: "What we stand for",
      values: [
        {
          title: "Honesty",
          body: "Straight answers on price and market, even when they are not the easy ones. You keep the final word.",
        },
        {
          title: "Discretion",
          body: "Your plans, your property and your details stay between us — off the public portals if you prefer.",
        },
        {
          title: "Local roots",
          body: "We live and work in the Golfe and know its villages, domains and views.",
        },
      ] as { title: string; body: string }[],
      teamTitle: "The team",
      team: [
        {
          name: "Marc Mehagnoul",
          role: "Founder & CEO",
          photo: "/team/marc-mehagnoul-v3.jpg",
          bio: "Founder of Ellington, Marc brings his intimate knowledge of the Golfe de Saint-Tropez and his commitment to excellence to an international clientele in search of exceptional properties.",
          email: "marc@ellington-international.com",
          phone: "+33 6 74 75 07 03",
        },
        {
          name: "Sasha Bazzaro",
          role: "Co-founder & CEO",
          photo: "/team/sasha-bazzaro.jpg",
          bio: "Co-founder of Ellington, Sasha shares the same commitment to excellence, guiding an international clientele through their most prestigious projects on the French Riviera.",
          email: "",
          phone: "+33 7 69 95 69 27",
        },
        {
          name: "Sophia Potentier",
          role: "Commercial operations manager",
          photo: "/team/sophia-potentier.jpg",
          bio: "At the heart of the client relationship, Sophia oversees Ellington's commercial operations with rigour and an eye for detail, ensuring a seamless experience at every step.",
          email: "",
          phone: "+33 6 14 54 71 30",
        },
      ],
      // Still used on the article pages (BlogPostShell)
      ctaEyebrow: "A question?",
      ctaTitle: "Let's find your property",
      ctaBody: "Buying, selling or valuing — tell us what you have in mind.",
      ctaPrimary: "View properties",
    },
    contactPage: {
      eyebrow: "Contact",
      titleBefore: "Get in",
      titleAccent: "touch",
      subtitle:
        "We're here to answer your questions and guide you through your luxury real estate journey.",
      formTitle: "Send Us a Message",
      formSubtitle:
        "Fill out the form below and a member of our team will respond within 24 hours.",
      detailsTitle: "Contact Information",
      hoursTitle: "Office Hours",
      advisorBlock: {
        eyebrow: "Your contact",
        role: "Portfolio director",
        intro:
          "Every enquiry is handled personally, in the strictest discretion. Reach out — I will get back to you within 24 hours.",
        signature: "— Marc",
      },
      address: "Espace Lemarquis\nQuartier Bertaud\n83580 Gassin — France",
      monFri: "Monday – Friday",
      sat: "Saturday",
      sun: "Sunday",
      sunHours: "By appointment",
      monFriHours: "9am – 6pm",
      satHours: "10am – 4pm",
      confidentialTitle: "Confidential service",
      confidentialBody:
        "All your enquiries are handled with the strictest discretion, in line with our commitment to confidentiality.",
      thanks: "Thank you.",
      successBody:
        "Your message has been received. An advisor will contact you within 24 hours, in full confidentiality.",
      firstName: "First name",
      lastName: "Last name",
      emailField: "Email address",
      phone: "Phone number",
      firstNamePh: "John",
      lastNamePh: "Smith",
      emailPh: "john.smith@example.com",
      phonePh: "+33 6 12 34 56 78",
      subject: "Subject *",
      subjectPlaceholder: "Select a subject",
      subjects: [
        "Property acquisition",
        "Property valuation",
        "Property sale",
        "Seasonal rental",
        "Other enquiry",
      ],
      messageLabel: "Message",
      messagePlaceholder: "Please provide details about your inquiry...",
      disclaimer:
        "By submitting this form, you agree to our privacy policy. We will never share your personal information with third parties and will only use it to respond to your inquiry.",
      sendMessage: "Send message",
      consent:
        "I agree that my information may be used to contact me in connection with my enquiry.",
    },
    rentalsPage: {
      eyebrow: "Seasonal rentals",
      titleBefore: "Seasonal",
      titleAccent: "rentals",
      subtitle:
        "A curated selection of villas, country houses and apartments for rent on the Gulf of Saint-Tropez and the French Riviera.",
    },
    sellPage: {
      // Sell redesign (step 16): Figma "04 Sell" copy
      whyTitle: "Why Ellington?",
      whyLead:
        "Founded in 2023 in the Golfe de Saint-Tropez by two partners who share a passion for property and architecture.",
      whyBody: [
        "From our office in Gassin we work the Golfe de Saint-Tropez every day, from Les Issambres to Le Lavandou. Knowing which domains, streets and views buyers ask for is what lets us set a realistic price and find the right buyer.",
        "Our buyers come from all over the world. We work in French, English and Dutch, and share every new listing directly with the active buyers registered with us.",
        "We tell you honestly what we think your property will sell for — even if it is not what you hoped to hear — and you always keep the final word.",
      ] as string[],
      methodEyebrow: "Our method",
      processTitle: "Our selling process",
      stepLabel: (n: number) => `Step ${String(n).padStart(2, "0")}`,
      steps: [
        {
          title: "Honest valuation",
          body: "We visit, compare with recent sales in the area and give you a realistic price — and tell you if we think expectations are too high.",
        },
        {
          title: "Presentation",
          body: "Once you entrust us with the sale, we prepare photos, a full description and the documents buyers will ask for.",
        },
        {
          title: "The right buyers",
          body: "Your property goes first to the active buyers registered with us, then to partner agencies and international portals.",
        },
        {
          title: "Offers & signature",
          body: "We accompany every visit, negotiate offers and coordinate diagnostics and the notary until the final signature.",
        },
      ] as { title: string; body: string }[],
      trustEyebrow: "Our promise",
      trustTitle: "Why clients trust us",
      trustAlt: "View over the Golfe de Saint-Tropez from a terrace",
      trustCards: [
        {
          title: "Honest pricing",
          body: "We advise on price honestly, even if it means disagreeing with you. You keep the final word.",
        },
        {
          title: "Monthly reports",
          body: "A written update every month: visits, feedback, offers and what we suggest adjusting.",
        },
        {
          title: "Discretion",
          body: "If you prefer, your property is only shown to qualified buyers — off the public portals.",
        },
        { title: "One small team", body: "You deal with the same people from valuation to signature." },
      ] as { title: string; body: string }[],
      ctaTitle: "Discover the true value of your property",
      ctaSubtitle:
        "Thinking about selling, or simply curious what your property is worth today? We will give you an honest figure.",
      ctaButton: "Request your confidential valuation →",
    },
    footer: {
      tagline:
        "Luxury real estate on the French Riviera. Exceptional properties, confidential service.",
      explore: "Explore",
      contact: "Contact",
      hours: "Hours",
      regions: "Our regions",
      monFri: "Monday – Friday · 9am – 6pm",
      sat: "Saturday · 10am – 4pm",
      sun: "Sunday · by appointment",
      cityLabel: "Gassin · Var · France",
      legal: "Legal",
      privacy: "Privacy",
      cookies: "Manage cookies",
      rights: (year: number) =>
        `© ${year} Ellington. All rights reserved.`,
    },
    cookies: {
      title: "Cookies & privacy",
      description:
        "We use essential cookies to make the site work (login, preferences) and, with your consent, cookies to measure audience and improve your experience. You can change your choice at any time.",
      acceptAll: "Accept all",
      refuse: "Refuse all",
      customize: "Customize",
      save: "Save my choices",
      learnMore: "Learn more",
      manage: "Manage my preferences",
      essentialLabel: "Essential cookies",
      essentialDesc:
        "Required for the site to work (authentication, language preferences). Always active.",
      analyticsLabel: "Audience measurement",
      analyticsDesc:
        "Help us understand how the site is used so we can improve it. No advertising use.",
      marketingLabel: "Marketing",
      marketingDesc:
        "Allow us to measure the effectiveness of our communications and personalise some content.",
    },
    legalPage: {
      metaTitle: "Legal notice",
      metaDescription: "Legal notice for the Ellington Properties website.",
      eyebrow: "Legal information",
      titleBefore: "Legal",
      titleAccent: "notice",
      editorHeading: "Site publisher",
      companyLabel: "Company name",
      companyValue: "Ellington Properties",
      formLabel: "Legal form",
      formValue: "Company",
      addressLabel: "Registered office",
      addressValue: "Espace Lemarquis\nQuartier Bertaud\n83580 Gassin — France",
      siretLabel: "SIRET number",
      vatLabel: "Intra-community VAT",
      phoneLabel: "Phone",
      emailLabel: "Email",
      directorLabel: "Publication director",
      directorValue: "Marc Mehagnoul",
      hostingHeading: "Hosting",
      hostingBefore: "The site is hosted by ",
      hostingAfter: ", 340 S Lemon Ave #4133, Walnut, CA 91789, United States — ",
      ipHeading: "Intellectual property",
      ipBody:
        "All content on this site (texts, images, graphics, logos, videos, photographs, technical data, etc.) is the exclusive property of Ellington Properties or its partners, and is protected by applicable intellectual property laws. Any reproduction, representation, modification or use, in whole or in part, without prior written authorisation is strictly prohibited and would constitute an infringement punishable under articles L.335-2 et seq. of the French Intellectual Property Code.",
      regulatedHeading: "Regulated activity",
      regulatedBefore:
        "Ellington Properties carries out a real estate brokerage activity governed by French law no. 70-9 of 2 January 1970, known as the Hoguet law. The professional licence, financial guarantees and the contact details of the relevant chamber of commerce and industry are available on simple request at ",
      dataHeading: "Personal data",
      dataBefore:
        "In accordance with the General Data Protection Regulation (GDPR) and the amended French Data Protection Act, you have a right of access, rectification, erasure, restriction and objection regarding your personal data. To exercise these rights, contact us at ",
    },
    privacyPage: {
      metaTitle: "Privacy policy",
      metaDescription:
        "Privacy policy and personal data protection of Ellington Properties.",
      eyebrow: "Protecting your data",
      titleBefore: "Privacy",
      titleAccent: "policy",
      lastUpdated: "Last updated: 5 May 2026",
      intro:
        "Ellington Properties attaches particular importance to protecting your privacy and personal data. This policy informs you of how we collect, use and protect the data gathered on this site, in accordance with the General Data Protection Regulation (GDPR) and the amended French Data Protection Act.",
      controllerHeading: "Data controller",
      controllerBody:
        "Ellington Properties — Espace Lemarquis, Quartier Bertaud, 83580 Gassin, France. SIRET 983 021 650.",
      controllerContact: "Contact: ",
      collectedHeading: "Data collected",
      collectedIntro:
        "We only collect the data strictly necessary for the services requested:",
      collectedItems: [
        {
          label: "Contact form",
          body: "name, email, phone, message. Purpose: to respond to your enquiry or viewing request.",
        },
        {
          label: "Account creation",
          body: "email address, password (encrypted), session identifiers. Purpose: to allow you to save your favourite properties.",
        },
        {
          label: "Favourites",
          body: "reference of the properties added to your favourites and the date added. Purpose: to display your personal selection.",
        },
        {
          label: "Technical preferences",
          body: "chosen language, cookie choices. Stored locally in your browser.",
        },
      ],
      legalBasisHeading: "Legal bases",
      legalBasisIntro: "The processing is based on:",
      legalBasisItems: [
        {
          label: "Your consent",
          body: "for non-essential cookies and the sending of marketing communications.",
        },
        {
          label: "The performance of a contract or pre-contractual measures",
          body: "for handling your requests (contact, viewing) and managing your account.",
        },
        {
          label: "Legitimate interest",
          body: "for the technical security of the site and fraud prevention.",
        },
        {
          label: "Legal obligations",
          body: "for retaining certain data linked to the regulated activity of a real estate agent.",
        },
      ],
      recipientsHeading: "Recipients",
      recipientsIntro:
        "Your data is never sold. It may be shared with our sub-processors, strictly to the extent necessary to provide the service:",
      recipientsItems: [
        {
          label: "Vercel Inc.",
          body: "(United States) — site hosting. Transfer governed by the European Commission's Standard Contractual Clauses.",
        },
        {
          label: "Supabase Inc.",
          body: "(Ireland, EU) — database and authentication. Data stored within the European Union.",
        },
        {
          label: "Apimo",
          body: "— real estate management software, for synchronising the properties presented.",
        },
      ],
      retentionHeading: "Retention period",
      retentionItems: [
        {
          label: "Contact requests",
          body: "3 years from the last exchange.",
        },
        {
          label: "User account and favourites",
          body: "until you delete the account, or after 3 years of inactivity.",
        },
        {
          label: "Audience measurement cookies",
          body: "13 months maximum.",
        },
        {
          label: "Accounting data and data linked to the real estate agent activity",
          body: "statutory retention periods.",
        },
      ],
      cookiesHeading: "Cookies",
      cookiesIntro: "The site uses different categories of cookies:",
      cookiesItems: [
        {
          label: "Essential",
          body: "necessary for the site to work (authentication, cart, language choice, remembering your cookie choice). Always active, no consent required.",
        },
        {
          label: "Audience measurement",
          body: "subject to your consent, they help us understand how the site is used in order to improve it. Disabled until you accept them.",
        },
        {
          label: "Marketing",
          body: "subject to your consent, they allow us to measure the effectiveness of our communications. Disabled until you accept them.",
        },
      ],
      cookiesManageBtn: "Manage my cookie preferences",
      rightsHeading: "Your rights",
      rightsIntro:
        "In accordance with the GDPR, you have the following rights over your data at any time:",
      rightsItems: [
        { label: "Access", body: "obtain a copy of the data concerning you." },
        { label: "Rectification", body: "correct inaccurate data." },
        { label: "Erasure", body: "request the deletion of your data." },
        { label: "Restriction", body: "restrict processing in certain cases." },
        {
          label: "Objection",
          body: "object to a processing, in particular for marketing.",
        },
        {
          label: "Portability",
          body: "retrieve your data in a structured format.",
        },
        {
          label: "Withdrawal of consent",
          body: "at any time, without retroactive effect.",
        },
      ],
      rightsFooterBefore: "To exercise these rights, contact us at ",
      rightsFooterAfter: ". We respond within a maximum of one month.",
      complaintHeading: "Complaint",
      complaintBefore:
        "If you consider that the processing of your data does not comply with the regulations, you may lodge a complaint with the ",
      complaintAfter: " — the French data protection authority.",
      securityHeading: "Security",
      securityBody:
        "We implement appropriate technical and organisational measures to protect your data against any loss, alteration, disclosure or unauthorised access: password encryption, HTTPS connections, access control to internal tools, GDPR-compliant sub-processors.",
      evolutionHeading: "Changes to this policy",
      evolutionBody:
        "This policy may be updated to reflect changes to the site or regulations. The date of the last update appears at the top of the page. For any substantial change, you will be informed via the site or by email if you have an account.",
    },
  },
  nl: {
    nav: {
      properties: "Woningen",
      buy: "Kopen",
      rentals: "Verhuur",
      regions: "Onze regio's",
      regionsNav: "Locaties",
      sell: "Verkopen",
      journal: "Journaal",
      about: "Over ons",
      contact: "Contact",
      login: "Inloggen",
      favorites: "Favorieten",
      menu: "Menu",
      close: "Sluiten", // TODO client review
    },
    thankYou: {
      // TODO client review (NL draft)
      requestEyebrow: "Aanvraag ontvangen",
      newsletterEyebrow: "Nieuwsbrief",
      title: "Dank u",
      requestText: "Uw bericht is bij ons. Een lid van ons team antwoordt u persoonlijk.",
      newsletterText: "U staat op onze lijst voor nieuwe woningen en verhalen uit de Golfe.",
    },
    journal: {
      // TODO client review (NL draft)
      // Journal index + article pages (the articles themselves are French-only)
      eyebrow: "Het Journaal", // same as the Home section
      titleBefore: "Verhalen uit de",
      titleAccent: "Golfe",
      subtitle: "Koopgidsen, marktanalyses en het leven aan de Rivièra — onze redactionele selectie.",
      all: "Alle artikelen",
      empty: "Nog geen artikelen in deze categorie.",
      frenchOnly: "Onze artikelen verschijnen voorlopig alleen in het Frans — Nederlandse versies volgen binnenkort.",
      categories: {
        "guides-achat": "Koopgidsen",
        marche: "Marktanalyse",
        architecture: "Architectuur & erfgoed",
        "art-de-vivre": "Levensstijl",
        fiscalite: "Belasting & recht",
      },
      back: "Terug naar het Journaal",
      related: "Lees ook",
      readingTime: "{n} min leestijd",
      team: "Team Ellington",
      ctaTitle: "Spreek met een van onze adviseurs",
      ctaText: "Discrete, off-market expertise in de hele Golfe de Saint-Tropez.",
      // Article page (Figma "08.1 Article"). TODO client review (NL draft)
      bandTitle: "Spreek met een adviseur van Ellington",
      bandSubtitle: "Vertrouwelijk advies bij het kopen in de hele Golfe de Saint-Tropez.",
      bandCta: "Vraag een adviesgesprek aan",
      keepReading: "Lees verder",
    },
    village: {
      // Village page template (step 18). TODO client review (NL draft)
      back: "← Terug naar locaties",
      eyebrow: "Het dorp",
      averagePrice: "Gemiddelde prijs",
      properties: "Woningen",
      seeDoEyebrow: "Ontdekken",
      seeDoTitle: "Bezienswaardigheden & activiteiten",
      experiencesEyebrow: "Levensstijl",
      experiencesTitle: "Belevenissen",
      favouritesEyebrow: "Onze selectie",
      favouritesTitle: "Onze favorieten",
      investmentEyebrow: "Markt",
      investmentTitle: "Investering & markt",
      bandTitle: "Uw lokale expert in deze regio",
      bandSubtitle: "We wonen en werken in de Golfe — vraag ons alles over dit dorp.",
      bandCta: "Vraag een adviesgesprek aan",
      propertiesTitle: "Woningen in deze regio",
      viewAll: "Alles bekijken →",
      empty: "Momenteel geen woningen in deze regio.",
    },
    heroes: {
      // Photo heroes of the inner pages (PageHero). TODO client review (NL draft)
      buyTitle: "Woningen te koop",
      buySubtitle: "Uitzonderlijke woningen aan de Côte d'Azur.",
      sellTitle: "Verkopen met ons",
      sellSubtitle: "Een eerlijke waardebepaling, de juiste kopers en duidelijke updates tot aan de ondertekening.",
      sellCta: "Waardebepaling aanvragen",
      locationsTitle: "Onze locaties",
      locationsSubtitle: "De dorpen van de Golfe de Saint-Tropez.",
      aboutTitle: "Over Ellington",
      aboutSubtitle: "Opgericht in 2023 in de Golfe de Saint-Tropez.",
      journalSubtitle: "Koopgidsen, marktanalyses en het leven aan de Rivièra.",
      contactTitle: "Neem contact op",
      contactSubtitle: "We beantwoorden elk bericht persoonlijk.",
    },
    common: {
      backToPortfolio: "Terug naar portfolio",
      addFavorite: "Toevoegen aan favorieten", // TODO client review
      removeFavorite: "Verwijderen uit favorieten", // TODO client review
      contactUs: "Neem contact op",
      callUs: "+33 4 93 12 34 56",
      readMore: "Ontdekken →",
      swipeHint: "← Veeg →",
      loading: "...",
      send: "Bericht versturen",
      sending: "Versturen…",
      reset: "Opnieuw instellen",
    },
    home: {
      // Home redesign (step 13). Figma "01 Home" copy is English; NL draft.
      // TODO client review (NL draft)
      title: "Waar de Rivièra thuis wordt",
      subtitle: "Villa's, landgoederen en huizen aan het water rond Saint-Tropez.",
      heroAlt: "Tuin van een villa met uitzicht op de Golfe de Saint-Tropez",
      scroll: "Scroll",
      whyEyebrow: "De Ellington-standaard",
      whyStatement: "Eerlijk advies, lokale wortels en elke maand een schriftelijke update.",
      points: [
        {
          title: "Eerlijk advies",
          body: "We zeggen u wat we echt van de prijs vinden — u houdt het laatste woord.",
        },
        { title: "Lokale wortels", body: "Gevestigd in Gassin, van Les Issambres tot Le Lavandou." },
        { title: "Kopers van over de hele wereld", body: "We adviseren in het Frans, Engels en Nederlands." },
      ] as { title: string; body: string }[],
      whyCta: "Verkopen met ons →",
      featuredEyebrow: "Selectie",
      featuredTitle: "Uitgelichte woningen",
      featuredSubtitle: "Een selectie van de uitzonderlijke woningen die wij momenteel vertegenwoordigen.",
      featuredCta: "Bekijk de hele portefeuille →",
      signatureEyebrow: "Onze signatuur",
      signatureTitle: "Geen gewone lokale expert.",
      signatureLead:
        "Opgericht in 2023 in de Golfe de Saint-Tropez door twee partners die een passie delen voor vastgoed en architectuur.",
      signatureText:
        "We richten ons op uitzonderlijke villa's en landgoederen en blijven dicht bij onze klanten, van het eerste bezoek tot de ondertekening bij de notaris.",
      signatureQuote: "“Eerlijk advies, van het eerste bezoek tot de laatste handtekening.”",
      signatureCta: "Meer weten →",
      signatureAlt: "Een baai aan de Côte d'Azur bij zonsondergang",
      journalCta: "Alle artikelen bekijken →",
      browseByCategory: "Bladeren per categorie",
      newsletterEyebrow: "Nieuwsbrief",
      newsletterTitle: "Blijf op de hoogte",
      newsletterSubtitle: "Ontvang exclusieve updates over nieuwe woningen en marktinzichten.",
      newsletterPlaceholder: "Uw e-mailadres",
      newsletterSubmit: "Inschrijven",
      // Still used on the About page until its redesign (step 21)
      expertTitle: "Geen gewone lokale expert.",
    },
    search: {
      buy: "Kopen",
      rent: "Huren",
      location: "Locatie",
      type: "Type woning",
      budget: "Budget",
      sort: "Sorteren op",
      allLocations: "Alle",
      allTypes: "Alle types",
      allBudgets: "Alle budgetten",
      allPrices: "Alle prijzen",
      bedrooms: "Slaapkamers", // TODO client review
      allBedrooms: "Alle",
      submit: "Zoeken",
      results: (n: number) =>
        `${n} ${n === 1 ? "woning" : "woningen"} beschikbaar`,
      noResults: "Geen woning komt overeen met uw zoekopdracht.",
      noResultsCta: "Filters opnieuw instellen",
    },
    types: {
      villa: "Villa",
      penthouse: "Penthouse",
      apartment: "Appartement",
      estate: "Landgoed",
      chalet: "Chalet",
      townhouse: "Herenhuis",
      land: "Grond",
    },
    sort: {
      newest: "Nieuwste",
      priceDesc: "Prijs: hoog naar laag",
      priceAsc: "Prijs: laag naar hoog",
      areaDesc: "Grootste oppervlakte",
    },
    priceRanges: {
      all: "Alle prijzen",
      under3: "Tot €3M",
      r3to6: "€3 – €6M",
      r6to10: "€6 – €10M",
      r10to15: "€10 – €15M",
      over15: "€15M en meer",
    },
    propertyDetail: {
      reference: "Ref.",
      exclusive: "Exclusief",
      price: "Prijs",
      bedrooms: "Slaapkamers",
      bathrooms: "Badkamers",
      area: "Woonoppervlakte",
      year: "Bouwjaar",
      origin: "Herkomst",
      type: "Type",
      landArea: "Perceeloppervlakte",
      propertyDetailsTitle: "Kenmerken van de woning",
      officeHours: "Openingstijden",
      description: "Omschrijving",
      features: "Voorzieningen",
      location: "Locatie",
      mapUnavailable: "Kaart niet beschikbaar",
      addressNote:
        "Exact adres wordt op verzoek gedeeld, uit respect voor de vertrouwelijkheid van onze cliënt.",
      interestedTitle: "Geïnteresseerd?",
      interestedBody:
        "Neem contact met ons op voor meer informatie of om een privébezichtiging te plannen.",
      yourAdvisor: "Uw adviseur",
      advisorRole: "Portfoliodirecteur",
      phone: "Telefoon",
      email: "E-mail",
      confidentialTitle: "Vertrouwelijke service",
      confidentialBody:
        "Alle aanvragen worden met de grootste discretie behandeld. Onze internationale clientèle waardeert onze toewijding aan vertrouwelijkheid.",
      similar: "Vergelijkbare",
      similarAccent: "woningen",
      shortBed: "slpk.",
      shortBath: "badk.",
      energyTitle: "Energieprestatie",
      // Energy block (Figma "Energy performance"). TODO client review (NL draft)
      energyClass: "Energieklasse (DPE)",
      ghgClass: "Uitstoot van broeikasgassen (GES)",
      energyValue: (n: number) => `${n.toLocaleString("nl-NL")} kWh/m²/jaar`,
      ghgValue: (n: number) => `${n.toLocaleString("nl-NL")} kg CO₂/m²/jaar`,
      energyCost: (min: string, max: string, year?: number) =>
        `Geschatte jaarlijkse energiekosten bij standaardgebruik: ${min} – ${max}${year ? ` (prijzen ${year})` : ""}.`,
      energyUnavailable: "Diagnose in uitvoering.",
      photoPrev: "Vorige foto", // TODO client review
      photoNext: "Volgende foto",
      photoOpen: "Foto vergroten",
      photoN: (n: number) => `Foto ${n}`,
      similarTitle: "Vergelijkbare woningen",
      viewAll: "Alles bekijken →",
    },
    priceUnit: {
      week: "wk",
      month: "mnd",
    },
    propertiesPage: {
      eyebrow: "Portfolio",
      titleBefore: "Woningen",
      titleAccent: "te koop",
      subtitle:
        "Ontdek de uitzonderlijke woningen die Ellington over de hele Franse Rivièra heeft samengesteld.",
    },
    locationsPage: {
      // Locations redesign (step 17). TODO client review (NL draft)
      eyebrow: "De Golfe de Saint-Tropez",
      intro:
        "Van de heuveldorpen Gassin en Ramatuelle tot de kanalen van Port Grimaud en de rustigere baaien van Cavalaire en Rayol-Canadel: elk dorp rond de Golfe heeft zijn eigen karakter, zijn eigen ritme en zijn eigen soort woning. Kies een dorp om te zien hoe het leven er is en welke woningen wij er momenteel vertegenwoordigen.",
    },
    aboutPage: {
      // About redesign (step 19). Figma copy is English; NL draft.
      // TODO client review (NL draft)
      introTitle: "Klein uit overtuiging, lokaal van nature.",
      introSubtitle: "Een jong, onafhankelijk makelaarskantoor voor uitzonderlijke woningen aan de Rivièra.",
      stats: [
        { value: "2023", label: "Opgericht in de Golfe" },
        { value: "3", label: "Talen · FR, EN, NL" },
        { value: "9", label: "Dorpen in de Golfe" },
        { value: "Elke maand", label: "Schriftelijk rapport voor eigenaars" }, // two short words: "Maandelijks" is too wide for the column
      ],
      storyEyebrow: "Ons verhaal",
      storySubtitle: "Opgericht in de Golfe de Saint-Tropez door twee partners met een passie voor vastgoed en architectuur.",
      story: [
        "Ellington werd in 2023 opgericht door twee partners die een passie delen voor vastgoed en architectuur. Vanuit ons kantoor in Gassin bestrijken we de Golfe de Saint-Tropez, van Les Issambres tot Le Lavandou, en nemen we ook uitzonderlijke woningen verder langs de Rivièra aan.",
        "Onze klanten komen van over de hele wereld. We werken in het Frans, Engels en Nederlands, zodat er niets verloren gaat tussen koper, verkoper en notaris.",
        "Onze aanpak is eenvoudig: bereikbaar zijn, discreet zijn en eerlijk advies geven. Als we vinden dat een prijs niet klopt, zeggen we dat — de beslissing ligt altijd bij u.",
      ] as string[],
      storyAlt: "Een straatje in het dorp Gassin",
      valuesEyebrow: "Waar wij voor staan",
      values: [
        {
          title: "Eerlijkheid",
          body: "Duidelijke antwoorden over prijs en markt, ook als die niet de makkelijkste zijn. U houdt het laatste woord.",
        },
        {
          title: "Discretie",
          body: "Uw plannen, uw woning en uw gegevens blijven tussen ons — buiten de openbare portalen als u dat wenst.",
        },
        {
          title: "Lokale wortels",
          body: "We wonen en werken in de Golfe en kennen de dorpen, domeinen en uitzichten.",
        },
      ] as { title: string; body: string }[],
      teamTitle: "Het team",
      team: [
        {
          name: "Marc Mehagnoul",
          role: "Oprichter & CEO",
          photo: "/team/marc-mehagnoul-v3.jpg",
          bio: "Oprichter van Ellington stelt Marc zijn grondige kennis van de Golf van Saint-Tropez en zijn streven naar uitmuntendheid ten dienste van een internationale clientèle op zoek naar uitzonderlijke panden.",
          email: "marc@ellington-international.com",
          phone: "+33 6 74 75 07 03",
        },
        {
          name: "Sasha Bazzaro",
          role: "Medeoprichter & CEO",
          photo: "/team/sasha-bazzaro.jpg",
          bio: "Medeoprichter van Ellington, deelt Sasha dezelfde toewijding aan uitmuntendheid en begeleidt een internationale clientèle door hun meest prestigieuze projecten aan de Franse Rivièra.",
          email: "",
          phone: "+33 7 69 95 69 27",
        },
        {
          name: "Sophia Potentier",
          role: "Manager Commerciële Operaties",
          photo: "/team/sophia-potentier.jpg",
          bio: "In het hart van de cliëntrelatie beheert Sophia de commerciële operaties van Ellington met nauwgezetheid en oog voor detail, en zorgt zo voor een naadloze ervaring bij elke stap.",
          email: "",
          phone: "+33 6 14 54 71 30",
        },
      ],
      // Still used on the article pages (BlogPostShell)
      ctaEyebrow: "Een vraag?",
      ctaTitle: "Laten we uw woning vinden",
      ctaBody: "Kopen, verkopen of laten waarderen — vertel ons wat u voor ogen heeft.",
      ctaPrimary: "Bekijk woningen",
    },
    contactPage: {
      eyebrow: "Contact",
      titleBefore: "Neem",
      titleAccent: "contact op",
      subtitle:
        "Wij staan klaar om uw vragen te beantwoorden en u te begeleiden in uw luxe vastgoedtraject.",
      formTitle: "Stuur ons een bericht",
      formSubtitle:
        "Vul onderstaand formulier in en een lid van ons team reageert binnen 24 uur.",
      detailsTitle: "Contactgegevens",
      hoursTitle: "Openingstijden",
      advisorBlock: {
        eyebrow: "Uw contactpersoon",
        role: "Portfoliodirecteur",
        intro:
          "Elke aanvraag wordt persoonlijk behandeld, in de grootste discretie. Neem contact op — ik kom binnen 24 uur bij u terug.",
        signature: "— Marc",
      },
      address: "Espace Lemarquis\nQuartier Bertaud\n83580 Gassin — France",
      monFri: "Maandag – Vrijdag",
      sat: "Zaterdag",
      sun: "Zondag",
      sunHours: "Op afspraak",
      monFriHours: "9.00 – 18.00",
      satHours: "10.00 – 16.00",
      confidentialTitle: "Vertrouwelijke service",
      confidentialBody:
        "Al uw aanvragen worden met de grootste discretie behandeld, in lijn met onze toewijding aan vertrouwelijkheid.",
      thanks: "Dank u.",
      successBody:
        "Uw bericht is ontvangen. Een adviseur neemt binnen 24 uur contact met u op, in volledige vertrouwelijkheid.",
      firstName: "Voornaam",
      lastName: "Achternaam",
      emailField: "E-mailadres",
      phone: "Telefoonnummer",
      firstNamePh: "Jan",
      lastNamePh: "Jansen",
      emailPh: "jan.jansen@voorbeeld.nl",
      phonePh: "+33 6 12 34 56 78",
      subject: "Onderwerp *",
      subjectPlaceholder: "Selecteer een onderwerp",
      subjects: [
        "Aankoop van een woning",
        "Taxatie van een woning",
        "Verkoop van een woning",
        "Seizoensverhuur",
        "Andere aanvraag",
      ],
      messageLabel: "Bericht",
      messagePlaceholder: "Geef alstublieft details over uw aanvraag...",
      disclaimer:
        "Door dit formulier te verzenden, gaat u akkoord met ons privacybeleid. Wij delen uw persoonlijke gegevens nooit met derden en gebruiken deze uitsluitend om op uw aanvraag te reageren.",
      sendMessage: "Bericht versturen",
      consent:
        "Ik ga ermee akkoord dat mijn gegevens worden gebruikt om contact met mij op te nemen in verband met mijn aanvraag.",
    },
    rentalsPage: {
      eyebrow: "Seizoensverhuur",
      titleBefore: "Seizoens-",
      titleAccent: "verhuur",
      subtitle:
        "Een zorgvuldig samengestelde selectie van villa's, landhuizen en appartementen te huur aan de Golf van Saint-Tropez en de Franse Rivièra.",
    },
    sellPage: {
      // Sell redesign (step 16). Figma copy is English; NL draft.
      // TODO client review (NL draft)
      whyTitle: "Waarom Ellington?",
      whyLead:
        "Opgericht in 2023 in de Golfe de Saint-Tropez door twee partners die een passie delen voor vastgoed en architectuur.",
      whyBody: [
        "Vanuit ons kantoor in Gassin werken we elke dag in de Golfe de Saint-Tropez, van Les Issambres tot Le Lavandou. Weten naar welke domeinen, straten en uitzichten kopers vragen, maakt het mogelijk een realistische prijs te bepalen en de juiste koper te vinden.",
        "Onze kopers komen van over de hele wereld. We werken in het Frans, Engels en Nederlands en delen elk nieuw aanbod rechtstreeks met de actieve kopers die bij ons ingeschreven staan.",
        "We zeggen u eerlijk voor welke prijs uw woning volgens ons zal verkopen — ook als dat niet is wat u hoopte te horen — en u houdt altijd het laatste woord.",
      ] as string[],
      methodEyebrow: "Onze methode",
      processTitle: "Ons verkoopproces",
      stepLabel: (n: number) => `Stap ${String(n).padStart(2, "0")}`,
      steps: [
        {
          title: "Eerlijke waardebepaling",
          body: "We bezoeken de woning, vergelijken met recente verkopen in de buurt en geven u een realistische prijs — en zeggen het als we de verwachtingen te hoog vinden.",
        },
        {
          title: "Presentatie",
          body: "Zodra u ons de verkoop toevertrouwt, maken we foto's, een volledige beschrijving en de documenten waar kopers om zullen vragen.",
        },
        {
          title: "De juiste kopers",
          body: "Uw woning gaat eerst naar de actieve kopers die bij ons ingeschreven staan, daarna naar partnerkantoren en internationale portalen.",
        },
        {
          title: "Biedingen & ondertekening",
          body: "We begeleiden elk bezoek, onderhandelen over biedingen en coördineren de keuringen en de notaris tot aan de definitieve ondertekening.",
        },
      ] as { title: string; body: string }[],
      trustEyebrow: "Onze belofte",
      trustTitle: "Waarom klanten ons vertrouwen",
      trustAlt: "Uitzicht op de Golfe de Saint-Tropez vanaf een terras",
      trustCards: [
        {
          title: "Eerlijke prijzen",
          body: "We adviseren eerlijk over de prijs, ook als we het daarover niet met u eens zijn. U houdt het laatste woord.",
        },
        {
          title: "Maandelijkse rapporten",
          body: "Elke maand een schriftelijke update: bezoeken, feedback, biedingen en wat we voorstellen bij te sturen.",
        },
        {
          title: "Discretie",
          body: "Als u dat wenst, wordt uw woning alleen aan gekwalificeerde kopers getoond — buiten de openbare portalen.",
        },
        { title: "Eén klein team", body: "U heeft van waardebepaling tot ondertekening met dezelfde mensen te maken." },
      ] as { title: string; body: string }[],
      ctaTitle: "Ontdek de werkelijke waarde van uw woning",
      ctaSubtitle:
        "Overweegt u te verkopen, of bent u gewoon benieuwd wat uw woning vandaag waard is? We geven u een eerlijk cijfer.",
      ctaButton: "Vraag uw vertrouwelijke waardebepaling aan →",
    },
    footer: {
      tagline:
        "Luxe vastgoed aan de Franse Rivièra. Uitzonderlijke woningen, vertrouwelijke service.",
      explore: "Verkennen",
      contact: "Contact",
      hours: "Openingstijden",
      regions: "Onze regio's",
      monFri: "Maandag – Vrijdag · 9.00 – 18.00",
      sat: "Zaterdag · 10.00 – 16.00",
      sun: "Zondag · op afspraak",
      cityLabel: "Gassin · Var · Frankrijk", // TODO client review
      legal: "Juridisch",
      privacy: "Privacy",
      cookies: "Cookies beheren",
      rights: (year: number) =>
        `© ${year} Ellington. Alle rechten voorbehouden.`,
    },
    cookies: {
      title: "Cookies & privacy",
      description:
        "Wij gebruiken essentiële cookies om de site te laten werken (inloggen, voorkeuren) en, met uw toestemming, cookies om het publiek te meten en uw ervaring te verbeteren. U kunt uw keuze op elk moment wijzigen.",
      acceptAll: "Alles accepteren",
      refuse: "Alles weigeren",
      customize: "Aanpassen",
      save: "Mijn keuzes opslaan",
      learnMore: "Meer informatie",
      manage: "Mijn voorkeuren beheren",
      essentialLabel: "Essentiële cookies",
      essentialDesc:
        "Vereist om de site te laten werken (authenticatie, taalvoorkeuren). Altijd actief.",
      analyticsLabel: "Publieksmeting",
      analyticsDesc:
        "Helpen ons te begrijpen hoe de site wordt gebruikt zodat wij die kunnen verbeteren. Geen gebruik voor advertentiedoeleinden.",
      marketingLabel: "Marketing",
      marketingDesc:
        "Stellen ons in staat de effectiviteit van onze communicatie te meten en bepaalde inhoud te personaliseren.",
    },
    legalPage: {
      metaTitle: "Wettelijke vermeldingen",
      metaDescription:
        "Wettelijke vermeldingen van de website van Ellington Properties.",
      eyebrow: "Wettelijke informatie",
      titleBefore: "Wettelijke",
      titleAccent: "vermeldingen",
      editorHeading: "Uitgever van de site",
      companyLabel: "Handelsnaam",
      companyValue: "Ellington Properties",
      formLabel: "Rechtsvorm",
      formValue: "Vennootschap",
      addressLabel: "Maatschappelijke zetel",
      addressValue: "Espace Lemarquis\nQuartier Bertaud\n83580 Gassin — France",
      siretLabel: "SIRET-nummer",
      vatLabel: "Intracommunautair btw-nummer",
      phoneLabel: "Telefoon",
      emailLabel: "E-mail",
      directorLabel: "Verantwoordelijke uitgever",
      directorValue: "Marc Mehagnoul",
      hostingHeading: "Hosting",
      hostingBefore: "De site wordt gehost door ",
      hostingAfter:
        ", 340 S Lemon Ave #4133, Walnut, CA 91789, Verenigde Staten — ",
      ipHeading: "Intellectuele eigendom",
      ipBody:
        "Alle inhoud op deze site (teksten, afbeeldingen, grafische elementen, logo's, video's, foto's, technische gegevens, enz.) is de exclusieve eigendom van Ellington Properties of haar partners en wordt beschermd door de geldende wetgeving inzake intellectuele eigendom. Elke reproductie, weergave, wijziging of exploitatie, geheel of gedeeltelijk, zonder voorafgaande schriftelijke toestemming is strikt verboden en zou een inbreuk vormen die strafbaar is op grond van de artikelen L.335-2 en volgende van het Franse Wetboek van intellectuele eigendom.",
      regulatedHeading: "Gereglementeerde activiteit",
      regulatedBefore:
        "Ellington Properties oefent een activiteit van vastgoedbemiddeling uit die is onderworpen aan de Franse wet nr. 70-9 van 2 januari 1970, de zogenaamde Hoguet-wet. De beroepskaart, de financiële garanties en de contactgegevens van de bevoegde kamer van koophandel en industrie zijn op eenvoudig verzoek verkrijgbaar via ",
      dataHeading: "Persoonsgegevens",
      dataBefore:
        "In overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en de gewijzigde Franse wet op de gegevensbescherming beschikt u over een recht op inzage, rectificatie, wissing, beperking en bezwaar met betrekking tot uw persoonsgegevens. Om deze rechten uit te oefenen, neemt u contact met ons op via ",
    },
    privacyPage: {
      metaTitle: "Privacybeleid",
      metaDescription:
        "Privacybeleid en bescherming van persoonsgegevens van Ellington Properties.",
      eyebrow: "Bescherming van uw gegevens",
      titleBefore: "Privacy-",
      titleAccent: "beleid",
      lastUpdated: "Laatst bijgewerkt: 5 mei 2026",
      intro:
        "Ellington Properties hecht bijzonder belang aan de bescherming van uw privacy en uw persoonsgegevens. Dit beleid informeert u over de manier waarop wij de op deze site verzamelde gegevens verzamelen, gebruiken en beschermen, in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en de gewijzigde Franse wet op de gegevensbescherming.",
      controllerHeading: "Verwerkingsverantwoordelijke",
      controllerBody:
        "Ellington Properties — Espace Lemarquis, Quartier Bertaud, 83580 Gassin, France. SIRET 983 021 650.",
      controllerContact: "Contact: ",
      collectedHeading: "Verzamelde gegevens",
      collectedIntro:
        "Wij verzamelen alleen de gegevens die strikt noodzakelijk zijn voor de gevraagde diensten:",
      collectedItems: [
        {
          label: "Contactformulier",
          body: "naam, e-mail, telefoon, bericht. Doel: reageren op uw informatie- of bezichtigingsaanvraag.",
        },
        {
          label: "Account aanmaken",
          body: "e-mailadres, wachtwoord (versleuteld), sessie-identificatoren. Doel: het opslaan van uw favoriete woningen mogelijk maken.",
        },
        {
          label: "Favorieten",
          body: "referentie van de aan uw favorieten toegevoegde woningen en de datum van toevoeging. Doel: uw persoonlijke selectie weergeven.",
        },
        {
          label: "Technische voorkeuren",
          body: "gekozen taal, cookiekeuzes. Lokaal opgeslagen in uw browser.",
        },
      ],
      legalBasisHeading: "Rechtsgronden",
      legalBasisIntro: "De verwerkingen zijn gebaseerd op:",
      legalBasisItems: [
        {
          label: "Uw toestemming",
          body: "voor niet-essentiële cookies en het verzenden van marketingcommunicatie.",
        },
        {
          label: "De uitvoering van een overeenkomst of precontractuele maatregelen",
          body: "voor de verwerking van uw aanvragen (contact, bezichtiging) en het beheer van uw account.",
        },
        {
          label: "Het gerechtvaardigd belang",
          body: "voor de technische beveiliging van de site en de preventie van fraude.",
        },
        {
          label: "De wettelijke verplichtingen",
          body: "voor het bewaren van bepaalde gegevens die verband houden met de gereglementeerde activiteit van vastgoedmakelaar.",
        },
      ],
      recipientsHeading: "Ontvangers",
      recipientsIntro:
        "Uw gegevens worden nooit verkocht. Ze kunnen worden gedeeld met onze verwerkers, strikt voor zover nodig voor de levering van de dienst:",
      recipientsItems: [
        {
          label: "Vercel Inc.",
          body: "(Verenigde Staten) — hosting van de site. Doorgifte geregeld door de Modelcontractbepalingen van de Europese Commissie.",
        },
        {
          label: "Supabase Inc.",
          body: "(Ierland, EU) — database en authenticatie. Gegevens opgeslagen binnen de Europese Unie.",
        },
        {
          label: "Apimo",
          body: "— vastgoedbeheersoftware, voor de synchronisatie van de gepresenteerde woningen.",
        },
      ],
      retentionHeading: "Bewaartermijn",
      retentionItems: [
        {
          label: "Contactaanvragen",
          body: "3 jaar vanaf de laatste uitwisseling.",
        },
        {
          label: "Gebruikersaccount en favorieten",
          body: "tot u het account zelf verwijdert of na 3 jaar inactiviteit.",
        },
        {
          label: "Cookies voor publieksmeting",
          body: "maximaal 13 maanden.",
        },
        {
          label: "Boekhoudkundige gegevens en gegevens verbonden aan de activiteit van vastgoedmakelaar",
          body: "wettelijke bewaartermijnen.",
        },
      ],
      cookiesHeading: "Cookies",
      cookiesIntro: "De site gebruikt verschillende categorieën cookies:",
      cookiesItems: [
        {
          label: "Essentieel",
          body: "noodzakelijk voor de werking (authenticatie, winkelmandje, taalkeuze, het onthouden van uw cookiekeuze). Altijd actief, geen toestemming vereist.",
        },
        {
          label: "Publieksmeting",
          body: "onderworpen aan uw toestemming, stellen ons in staat het gebruik van de site te begrijpen om die te verbeteren. Uitgeschakeld zolang u ze niet accepteert.",
        },
        {
          label: "Marketing",
          body: "onderworpen aan uw toestemming, stellen ons in staat de effectiviteit van onze communicatie te meten. Uitgeschakeld zolang u ze niet accepteert.",
        },
      ],
      cookiesManageBtn: "Mijn cookievoorkeuren beheren",
      rightsHeading: "Uw rechten",
      rightsIntro:
        "In overeenstemming met de AVG beschikt u te allen tijde over de volgende rechten met betrekking tot uw gegevens:",
      rightsItems: [
        { label: "Inzage", body: "een kopie verkrijgen van de gegevens die op u betrekking hebben." },
        { label: "Rectificatie", body: "onjuiste gegevens corrigeren." },
        { label: "Wissing", body: "de verwijdering van uw gegevens vragen." },
        { label: "Beperking", body: "de verwerking in bepaalde gevallen beperken." },
        {
          label: "Bezwaar",
          body: "bezwaar maken tegen een verwerking, met name voor marketing.",
        },
        {
          label: "Overdraagbaarheid",
          body: "uw gegevens in een gestructureerd formaat verkrijgen.",
        },
        {
          label: "Intrekking van de toestemming",
          body: "op elk moment, zonder terugwerkende kracht.",
        },
      ],
      rightsFooterBefore: "Om deze rechten uit te oefenen, neemt u contact met ons op via ",
      rightsFooterAfter: ". Wij reageren binnen maximaal één maand.",
      complaintHeading: "Klacht",
      complaintBefore:
        "Als u van mening bent dat de verwerking van uw gegevens niet in overeenstemming is met de regelgeving, kunt u een klacht indienen bij de ",
      complaintAfter: " — de Franse autoriteit voor gegevensbescherming.",
      securityHeading: "Beveiliging",
      securityBody:
        "Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies, wijziging, openbaarmaking of ongeoorloofde toegang: versleuteling van wachtwoorden, HTTPS-verbindingen, toegangscontrole tot interne tools, AVG-conforme verwerkers.",
      evolutionHeading: "Wijziging van dit beleid",
      evolutionBody:
        "Dit beleid kan worden bijgewerkt om wijzigingen aan de site of de regelgeving te weerspiegelen. De datum van de laatste bijwerking staat boven aan de pagina. Bij elke substantiële wijziging wordt u via de site of per e-mail geïnformeerd als u over een account beschikt.",
    },
  },
} as const;

export type Dict = (typeof dictRaw)["fr"];

export const dict: Record<Lang, Dict> = dictRaw as unknown as Record<Lang, Dict>;

