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
      eyebrow: "Immobilier de prestige · Côte d'Azur",
      titleBefore: "Découvrez l'élégance",
      titleAccent: "",
      titleAfter: "",
      subtitle: "Propriétés d'exception sur la Côte d'Azur",
      whyEyebrow: "L'excellence Ellington",
      whyTitleBefore: "Pourquoi choisir",
      whyTitleAccent: "Ellington",
      whySubtitle:
        "Une expertise inégalée dans l'immobilier de luxe sur l'ensemble de la Côte d'Azur.",
      whyCta: "Vendre avec nous",
      features: [
        {
          title: "Conseillers de confiance",
          body: "Une approche confidentielle et discrète, dans le respect des plus hauts standards professionnels.",
        },
        {
          title: "Réseau exclusif",
          body: "Accès privilégié à des biens off-market, indisponibles sur les canaux publics.",
        },
        {
          title: "Clientèle internationale",
          body: "Des acquéreurs de plus de 10 pays nous font confiance pour leurs projets sur la Côte d'Azur.",
        },
        {
          title: "Service sur-mesure",
          body: "De la première visite à la signature, un accompagnement personnalisé à chaque étape.",
        },
      ] as { title: string; body: string }[],
      featuredEyebrow: "Sélection",
      featuredTitleBefore: "Propriétés",
      featuredTitleAccent: "en vedette",
      featuredSubtitle:
        "Une sélection des biens les plus rares de notre portefeuille, renouvelée chaque semaine.",
      featuredCta: "Voir tout le portefeuille →",
      regionsEyebrow: "Nos régions",
      regionsTitleBefore: "Adresses",
      regionsTitleAccent: "d'exception",
      regionsSubtitle:
        "De Monaco à Saint-Tropez, nous opérons sur les emplacements les plus prestigieux de la Côte d'Azur.",
      regionsCta: "Voir toutes nos régions",
      newsletterEyebrow: "Restez informé",
      newsletterTitleBefore: "Restez",
      newsletterTitleAccent: "informé",
      newsletterSubtitle:
        "Recevez en exclusivité nos nouveaux biens et nos analyses du marché immobilier.",
      expertTitle: "Un expert local pas comme les autres.",
      expertP1:
        "Né au cœur du Golfe de Saint-Tropez, Ellington est plus qu'une agence immobilière — c'est une signature.",
      expertP2:
        "Son fondateur, ayant grandi dans la région, possède une connaissance intime et instinctive de chaque secteur, chaque adresse et chaque détail subtil qui définit la valeur d'un bien sur la Côte d'Azur. Cette expertise locale, bâtie au fil des années, est aujourd'hui mise au service d'une clientèle exigeante en quête d'excellence.",
      expertP3:
        "Choisir Ellington, c'est s'associer à un conseiller de confiance combinant des racines locales profondes, un rayonnement international et l'excellence du service.",
      newsletterDisclaimer:
        "Pas de spam — désinscription possible à tout moment.",
      newsletterPlaceholder: "Votre adresse email",
      newsletterSubmit: "S'inscrire",
      newsletterSuccess: "Merci, votre inscription est confirmée.",
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
      energyClass: "Diagnostic de performance énergétique",
      ghgClass: "Indice d'émission de gaz à effet de serre",
      energyDate: (date: string) =>
        `Diagnostic réalisé après le 1er juillet 2021${date ? ` — ${date}` : ""}`,
      energyCost: (min: number, max: number) =>
        `Coût annuel d'énergie estimé pour un usage standard : entre ${min.toLocaleString("fr-FR")} € et ${max.toLocaleString("fr-FR")} € par an`,
      energyUnavailable: "Diagnostic en cours de réalisation.",
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
      eyebrow: "La Riviera française",
      titleBefore: "Nos",
      titleAccent: "régions",
      subtitle:
        "Explorez les emplacements les plus prestigieux le long de la Côte d'Azur, où le luxe rencontre l'art de vivre méditerranéen.",
      intro:
        "Découvrez l'agence Ellington, votre partenaire immobilier de renom depuis 1987. Nichée au cœur du Golfe de Saint-Tropez, notre expertise et passion pour les biens d'exception nous permettent de dénicher les joyaux cachés de la Côte d'Azur. Avec une présence digitale avant-gardiste et un accompagnement sur-mesure, nous sommes votre allié pour trouver la perle rare qui saura combler vos attentes. Réputés pour notre sérieux, nous sommes fiers de compter une clientèle internationale fidèle à notre agence !",
      regionLabel: (i: number, total: number) => `Région ${i} / ${total}`,
      currentlyAvailable: (n: number) =>
        `${n} bien${n > 1 ? "s" : ""} actuellement en portefeuille`,
      viewProperties: "Voir les propriétés →",
    },
    aboutPage: {
      eyebrow: "À propos d'Ellington",
      titleBefore: "À propos",
      titleAccent: "d'Ellington",
      heroSubtitle:
        "Née au cœur du Golfe de Saint-Tropez, bâtie sur la confiance.",
      dividerLabel: "Notre signature",
      bandSubtitle:
        "Ellington est plus qu'une agence immobilière — c'est une signature.",
      storyTitle: "Notre histoire",
      lead: "Née au cœur du Golfe de Saint-Tropez, Ellington est plus qu'une agence immobilière — c'est une signature. Son fondateur, ayant grandi dans la région, possède une connaissance intime et instinctive de chaque secteur, chaque adresse et chaque détail subtil qui définit la valeur d'un bien sur la Côte d'Azur.",
      body: "Animée par un esprit profondément international, Ellington s'adresse à une clientèle sans frontières — trilingue français, anglais et néerlandais, avec de solides relations au sein d'un réseau de partenaires internationaux.",
      body2: "Choisir Ellington, c'est s'associer à un conseiller de confiance combinant des racines locales profondes, un rayonnement international et l'excellence du service.",
      stats: [
        { value: "30+", label: "Ans sur la Riviera" },
        { value: "10+", label: "Pays internationaux" },
        { value: "9", label: "Régions exclusives" },
        { value: "3", label: "Langues parlées" },
      ],
      valuesEyebrow: "Nos valeurs",
      valuesTitleBefore: "Nos",
      valuesTitleAccent: "valeurs",
      commitTitle: "Ce pour quoi nous nous engageons",
      values: [
        {
          title: "Intégrité",
          body: "Transparence totale dans chaque transaction, chaque conversation.",
        },
        {
          title: "Excellence",
          body: "La perfection dans chaque détail, de la première consultation à la signature finale.",
        },
        {
          title: "Discrétion",
          body: "Toutes les demandes traitées avec une absolue confidentialité et professionnalisme.",
        },
        {
          title: "Rayonnement mondial",
          body: "Notre réseau vous connecte aux acquéreurs les plus qualifiés du monde entier.",
        },
        {
          title: "Racines locales",
          body: "Trois décennies à vivre et respirer le marché de la Riviera.",
        },
        {
          title: "Service bespoke",
          body: "Chaque client, chaque bien, chaque stratégie — entièrement sur-mesure.",
        },
      ],
      teamEyebrow: "L'équipe",
      teamTitleBefore: "Notre",
      teamTitleAccent: "équipe",
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
      ctaEyebrow: "Une question ?",
      ctaTitleBefore: "Trouvons ensemble votre",
      ctaTitleAccent: "bien",
      ctaBody:
        "Que vous souhaitiez acheter, vendre ou estimer — notre équipe est à votre service.",
      ctaPrimary: "Voir les propriétés",
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
      eyebrow: "Vendre avec Ellington",
      titleBefore: "Vendre",
      titleAccent: "avec nous",
      lead: "Expertise locale. Rayonnement international. Excellence sur-mesure.",
      cta: "Demander une estimation",
      whyTitle: "Pourquoi Ellington ?",
      whyBody1:
        "Née au cœur du Golfe de Saint-Tropez, Ellington est plus qu'une agence immobilière — c'est une signature.",
      whyBody2:
        "Son fondateur, ayant grandi dans la région, possède une compréhension instinctive de chaque adresse et de chaque nuance qui définit la valeur d'un bien sur la Côte d'Azur. Cette connaissance locale approfondie, combinée à un solide réseau international, nous permet de connecter les biens d'exception aux bons acquéreurs.",
      whyBody3:
        "Trilingues en français, anglais et néerlandais, et soutenus par des partenaires internationaux de confiance, Ellington garantit à chaque bien une exposition ciblée et globale.",
      whyBody4:
        "Chaque vente est abordée avec discrétion, précision et une stratégie sur-mesure — parce qu'aucun bien ne ressemble à un autre.",
      processTitle: "Notre processus de vente",
      steps: [
        {
          title: "Estimation sur-mesure",
          body: "Nous établissons une estimation précise et stratégique, fondée sur notre expertise du marché, pour positionner votre bien et obtenir les meilleurs résultats.",
        },
        {
          title: "Exposition ciblée",
          body: "Nous activons notre réseau international et notre base de clients privés pour atteindre des acquéreurs sérieux et pertinents.",
        },
        {
          title: "Marketing sur-mesure",
          body: "Votre bien est présenté à travers des visuels soigneusement réalisés et promu auprès d'une audience internationale qualifiée.",
        },
        {
          title: "Négociation & finalisation",
          body: "Nous vous accompagnons à chaque étape, de l'offre à la signature, en sécurisant la transaction dans les meilleures conditions possibles.",
        },
      ],
      trustTitle: "Pourquoi nos clients nous font confiance",
      trustCards: [
        {
          title: "Discrétion",
          body: "Nous comprenons l'importance de la confidentialité et traitons chaque transaction avec une discrétion absolue.",
        },
        {
          title: "Réseau international",
          body: "Nos connexions mondiales attirent des acquéreurs qualifiés au-delà des frontières.",
        },
        {
          title: "Accompagnement dédié",
          body: "Une équipe réactive et attentive vous guide à chaque étape du processus.",
        },
        {
          title: "Approche sur-mesure",
          body: "Chaque bien bénéficie d'une stratégie personnalisée conçue pour maximiser sa valeur.",
        },
      ],
      ctaTitle: "Découvrez la vraie valeur de votre bien",
      ctaSubtitle:
        "Que vous envisagiez de vendre ou que vous exploriez simplement vos options, notre équipe est à votre disposition.",
      ctaButton: "Demander votre estimation confidentielle",
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
      eyebrow: "Luxury Real Estate · French Riviera",
      titleBefore: "Discover Elegance",
      titleAccent: "",
      titleAfter: "",
      subtitle: "Exclusive Properties in the French Riviera",
      whyEyebrow: "The Ellington Standard",
      whyTitleBefore: "Why choose",
      whyTitleAccent: "Ellington",
      whySubtitle:
        "Unparalleled expertise in luxury real estate across the French Riviera.",
      whyCta: "Sell with us",
      features: [
        {
          title: "Trusted advisors",
          body: "A confidential, discreet approach respecting the highest professional standards.",
        },
        {
          title: "Exclusive network",
          body: "Privileged access to off-market properties, unavailable through public channels.",
        },
        {
          title: "International clientele",
          body: "Buyers from over 10 countries trust us with their projects on the French Riviera.",
        },
        {
          title: "Bespoke service",
          body: "From first viewing to signing, personal guidance at every step.",
        },
      ] as { title: string; body: string }[],
      featuredEyebrow: "Selection",
      featuredTitleBefore: "Featured",
      featuredTitleAccent: "properties",
      featuredSubtitle:
        "A curated selection of the rarest properties in our portfolio, refreshed weekly.",
      featuredCta: "View entire portfolio →",
      regionsEyebrow: "Our regions",
      regionsTitleBefore: "Exceptional",
      regionsTitleAccent: "addresses",
      regionsSubtitle:
        "From Monaco to Saint-Tropez, we operate in the most prestigious locations on the French Riviera.",
      regionsCta: "View all our regions",
      newsletterEyebrow: "Stay informed",
      newsletterTitleBefore: "Stay",
      newsletterTitleAccent: "informed",
      newsletterSubtitle:
        "Receive exclusive updates on new properties and market insights.",
      expertTitle: "Not Your Ordinary Local Expert.",
      expertP1:
        "Born in the heart of the Gulf of Saint-Tropez, Ellington is more than a real estate agency — it is a signature.",
      expertP2:
        "Its founder, having grown up in the region, possesses an intimate and instinctive knowledge of every area, every address, and every subtle detail that defines the value of a property on the French Riviera. This local expertise, built over the years, is now dedicated to serving a discerning clientele in search of excellence.",
      expertP3:
        "Choosing Ellington means partnering with a trusted advisor who combines deep local roots, international reach, and excellence in service.",
      newsletterDisclaimer:
        "No spam — unsubscribe at any time.",
      newsletterPlaceholder: "Your email address",
      newsletterSubmit: "Subscribe",
      newsletterSuccess: "Thank you, your subscription is confirmed.",
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
        `${n} propert${n > 1 ? "ies" : "y"} available`,
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
      propertyDetailsTitle: "Property Details",
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
      energyClass: "Energy performance diagnostic",
      ghgClass: "Greenhouse gas emission index",
      energyDate: (date: string) =>
        `Diagnostic completed after July 1, 2021${date ? ` — ${date}` : ""}`,
      energyCost: (min: number, max: number) =>
        `Estimated annual energy expenses for standard use: between €${min.toLocaleString("en-US")} and €${max.toLocaleString("en-US")} per year`,
      energyUnavailable: "Diagnostic in progress.",
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
      eyebrow: "The French Riviera",
      titleBefore: "Our",
      titleAccent: "Locations",
      subtitle:
        "Explore the most prestigious locations along the Côte d'Azur, where luxury meets the Mediterranean lifestyle.",
      intro:
        "Discover Ellington, your renowned real estate partner since 1987. Nestled in the heart of the Gulf of Saint-Tropez, our expertise and passion for exceptional properties allow us to uncover the hidden gems of the Côte d'Azur. With a forward-thinking digital presence and bespoke support, we are your ally in finding the rare gem that will fulfil your every expectation. Renowned for our integrity, we are proud to count a loyal international clientele!",
      regionLabel: (i: number, total: number) => `Region ${i} / ${total}`,
      currentlyAvailable: (n: number) =>
        `${n} propert${n > 1 ? "ies" : "y"} currently in portfolio`,
      viewProperties: "View properties →",
    },
    aboutPage: {
      eyebrow: "About Ellington",
      titleBefore: "About",
      titleAccent: "Ellington",
      heroSubtitle:
        "Born in the heart of the Gulf of Saint-Tropez, built on trust.",
      dividerLabel: "Our signature",
      bandSubtitle:
        "Ellington is more than a real estate agency — it is a signature.",
      storyTitle: "Our story",
      lead: "Born in the heart of the Gulf of Saint-Tropez, Ellington is more than a real estate agency — it is a signature. Its founder, having grown up in the region, possesses an intimate and instinctive knowledge of every area, every address, and every subtle detail that defines the value of a property on the French Riviera.",
      body: "Driven by a deeply international mindset, Ellington speaks to a clientele without borders — fluent in French, English and Dutch, with strong relationships across a network of international partners.",
      body2: "Choosing Ellington means partnering with a trusted advisor who combines deep local roots, international reach, and excellence in service.",
      stats: [
        { value: "30+", label: "Years on the Riviera" },
        { value: "10+", label: "Countries worldwide" },
        { value: "9", label: "Exclusive regions" },
        { value: "3", label: "Languages spoken" },
      ],
      valuesEyebrow: "Our values",
      valuesTitleBefore: "Our",
      valuesTitleAccent: "Values",
      commitTitle: "What we stand for",
      values: [
        {
          title: "Integrity",
          body: "Complete transparency in every transaction, every conversation.",
        },
        {
          title: "Excellence",
          body: "Perfection in every detail, from the first consultation to the final signature.",
        },
        {
          title: "Discretion",
          body: "Every enquiry handled with absolute confidentiality and professionalism.",
        },
        {
          title: "Global reach",
          body: "Our network connects you with the most qualified buyers worldwide.",
        },
        {
          title: "Local roots",
          body: "Three decades living and breathing the Riviera market.",
        },
        {
          title: "Bespoke service",
          body: "Every client, every property, every strategy — entirely tailored.",
        },
      ],
      teamEyebrow: "The team",
      teamTitleBefore: "Agency",
      teamTitleAccent: "Team",
      team: [
        {
          name: "Marc Mehagnoul",
          role: "Founder & CEO",
          photo: "/team/marc-mehagnoul-v3.jpg",
          bio: "Founder of Ellington, Marc brings his intimate knowledge of the Gulf of Saint-Tropez and his commitment to excellence to an international clientele in search of exceptional properties.",
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
          role: "Commercial Operations Manager",
          photo: "/team/sophia-potentier.jpg",
          bio: "At the heart of the client relationship, Sophia oversees Ellington's commercial operations with rigour and an eye for detail, ensuring a seamless experience at every step.",
          email: "",
          phone: "+33 6 14 54 71 30",
        },
      ],
      ctaEyebrow: "A question?",
      ctaTitleBefore: "Let's find your",
      ctaTitleAccent: "property",
      ctaBody:
        "Whether you wish to buy, sell or value — our team is at your service.",
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
      eyebrow: "Sell with Ellington",
      titleBefore: "Sell",
      titleAccent: "with us",
      lead: "Local expertise. International reach. Tailored excellence.",
      cta: "Request a valuation",
      whyTitle: "Why Ellington?",
      whyBody1:
        "Born in the heart of the Gulf of Saint-Tropez, Ellington is more than a real estate agency — it is a signature.",
      whyBody2:
        "Its founder, having grown up in the region, offers an instinctive understanding of every address and nuance that defines the value of a property on the French Riviera. This deep local knowledge, combined with a strong international network, allows us to connect exceptional properties with the right buyers.",
      whyBody3:
        "Fluent in French, English, and Dutch, and supported by trusted international partners, Ellington ensures each property benefits from targeted global exposure.",
      whyBody4:
        "We approach every sale with discretion, precision, and a bespoke strategy — because no property is ever the same.",
      processTitle: "Our selling process",
      steps: [
        {
          title: "Tailored valuation",
          body: "We provide a precise and strategic valuation based on market expertise, positioning your property for optimal results.",
        },
        {
          title: "Targeted exposure",
          body: "We activate our global network and private client base to reach serious and relevant buyers.",
        },
        {
          title: "Bespoke marketing",
          body: "Your property is presented through carefully crafted visuals and promoted to a qualified international audience.",
        },
        {
          title: "Negotiation & completion",
          body: "We guide you at every step from offer to signature, securing the transaction under the best possible conditions.",
        },
      ],
      trustTitle: "Why clients trust us",
      trustCards: [
        {
          title: "Discretion",
          body: "We understand the importance of privacy and handle every transaction with complete confidentiality.",
        },
        {
          title: "International network",
          body: "Our global connections bring qualified buyers beyond borders.",
        },
        {
          title: "Dedicated support",
          body: "A responsive, attentive team guiding you at every step.",
        },
        {
          title: "Tailored approach",
          body: "Every property benefits from a personalized strategy designed to maximize its value.",
        },
      ],
      ctaTitle: "Discover the true value of your property",
      ctaSubtitle:
        "Whether you are considering selling or simply exploring your options, our team is at your disposal.",
      ctaButton: "Request your confidential valuation",
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
      eyebrow: "Luxe vastgoed · Côte d'Azur",
      titleBefore: "Ontdek elegantie",
      titleAccent: "",
      titleAfter: "",
      subtitle: "Exclusieve woningen aan de Franse Rivièra",
      whyEyebrow: "De Ellington-standaard",
      whyTitleBefore: "Waarom kiezen voor",
      whyTitleAccent: "Ellington",
      whySubtitle:
        "Ongeëvenaarde expertise in luxe vastgoed langs de hele Franse Rivièra.",
      whyCta: "Verkoop met ons",
      features: [
        {
          title: "Vertrouwde adviseurs",
          body: "Een vertrouwelijke, discrete aanpak met respect voor de hoogste professionele normen.",
        },
        {
          title: "Exclusief netwerk",
          body: "Bevoorrechte toegang tot off-market woningen, niet beschikbaar via openbare kanalen.",
        },
        {
          title: "Internationale clientèle",
          body: "Kopers uit meer dan 10 landen vertrouwen ons hun projecten aan de Franse Rivièra toe.",
        },
        {
          title: "Service op maat",
          body: "Van eerste bezichtiging tot ondertekening, persoonlijke begeleiding bij elke stap.",
        },
      ] as { title: string; body: string }[],
      featuredEyebrow: "Selectie",
      featuredTitleBefore: "Uitgelichte",
      featuredTitleAccent: "woningen",
      featuredSubtitle:
        "Een zorgvuldig samengestelde selectie van de zeldzaamste woningen in ons portfolio, wekelijks ververst.",
      featuredCta: "Bekijk het volledige portfolio →",
      regionsEyebrow: "Onze regio's",
      regionsTitleBefore: "Uitzonderlijke",
      regionsTitleAccent: "adressen",
      regionsSubtitle:
        "Van Monaco tot Saint-Tropez zijn wij actief op de meest prestigieuze locaties aan de Franse Rivièra.",
      regionsCta: "Bekijk al onze regio's",
      newsletterEyebrow: "Blijf op de hoogte",
      newsletterTitleBefore: "Blijf",
      newsletterTitleAccent: "op de hoogte",
      newsletterSubtitle:
        "Ontvang exclusieve updates over nieuwe woningen en marktinzichten.",
      expertTitle: "Geen gewone lokale expert.",
      expertP1:
        "Geboren in het hart van de Golf van Saint-Tropez is Ellington meer dan een vastgoedkantoor — het is een handtekening.",
      expertP2:
        "De oprichter, opgegroeid in de regio, beschikt over een intieme en instinctieve kennis van elk gebied, elk adres en elk subtiel detail dat de waarde van een woning aan de Franse Rivièra bepaalt. Deze lokale expertise, door de jaren heen opgebouwd, staat nu ten dienste van een veeleisende clientèle op zoek naar uitmuntendheid.",
      expertP3:
        "Kiezen voor Ellington betekent samenwerken met een vertrouwde adviseur die diepe lokale wortels, internationaal bereik en uitmuntende service combineert.",
      newsletterDisclaimer:
        "Geen spam — u kunt zich op elk moment uitschrijven.",
      newsletterPlaceholder: "Uw e-mailadres",
      newsletterSubmit: "Inschrijven",
      newsletterSuccess: "Dank u, uw inschrijving is bevestigd.",
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
        `${n} ${n > 1 ? "woningen" : "woning"} beschikbaar`,
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
      energyClass: "Energieprestatiediagnose",
      ghgClass: "Index voor broeikasgasemissies",
      energyDate: (date: string) =>
        `Diagnose uitgevoerd na 1 juli 2021${date ? ` — ${date}` : ""}`,
      energyCost: (min: number, max: number) =>
        `Geschatte jaarlijkse energiekosten bij standaardgebruik: tussen €${min.toLocaleString("nl-NL")} en €${max.toLocaleString("nl-NL")} per jaar`,
      energyUnavailable: "Diagnose in uitvoering.",
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
      eyebrow: "De Franse Rivièra",
      titleBefore: "Onze",
      titleAccent: "Locaties",
      subtitle:
        "Verken de meest prestigieuze locaties langs de Côte d'Azur, waar luxe en de mediterrane levensstijl samenkomen.",
      intro:
        "Maak kennis met Ellington, uw gerenommeerde vastgoedpartner sinds 1987. Genesteld in het hart van de Golf van Saint-Tropez stellen onze expertise en passie voor uitzonderlijke woningen ons in staat de verborgen parels van de Côte d'Azur te ontdekken. Met een vooruitstrevende digitale aanwezigheid en begeleiding op maat zijn wij uw bondgenoot bij het vinden van die zeldzame parel die aan al uw verwachtingen voldoet. Bekend om onze integriteit, zijn wij er trots op een trouwe internationale clientèle te mogen tellen!",
      regionLabel: (i: number, total: number) => `Regio ${i} / ${total}`,
      currentlyAvailable: (n: number) =>
        `${n} ${n > 1 ? "woningen" : "woning"} momenteel in portfolio`,
      viewProperties: "Bekijk woningen →",
    },
    aboutPage: {
      eyebrow: "Over Ellington",
      titleBefore: "Over",
      titleAccent: "Ellington",
      heroSubtitle:
        "Geboren in het hart van de Golf van Saint-Tropez, gebouwd op vertrouwen.",
      dividerLabel: "Onze signatuur",
      bandSubtitle:
        "Ellington is meer dan een vastgoedkantoor — het is een signatuur.",
      storyTitle: "Ons verhaal",
      lead: "Geboren in het hart van de Golf van Saint-Tropez is Ellington meer dan een vastgoedkantoor — het is een signatuur. De oprichter, opgegroeid in de regio, beschikt over een intieme en instinctieve kennis van elk gebied, elk adres en elk subtiel detail dat de waarde van een woning aan de Franse Rivièra bepaalt.",
      body: "Gedreven door een diep internationale instelling spreekt Ellington een clientèle zonder grenzen aan — vloeiend in het Frans, Engels en Nederlands, met sterke relaties binnen een netwerk van internationale partners.",
      body2: "Kiezen voor Ellington betekent samenwerken met een vertrouwde adviseur die diepe lokale wortels, internationaal bereik en uitmuntende service combineert.",
      stats: [
        { value: "30+", label: "Jaar aan de Rivièra" },
        { value: "10+", label: "Internationale landen" },
        { value: "9", label: "Exclusieve regio's" },
        { value: "3", label: "Gesproken talen" },
      ],
      valuesEyebrow: "Onze waarden",
      valuesTitleBefore: "Onze",
      valuesTitleAccent: "Waarden",
      commitTitle: "Waar wij voor staan",
      values: [
        {
          title: "Integriteit",
          body: "Volledige transparantie in elke transactie, elk gesprek.",
        },
        {
          title: "Uitmuntendheid",
          body: "Perfectie in elk detail, van het eerste gesprek tot de definitieve handtekening.",
        },
        {
          title: "Discretie",
          body: "Elke aanvraag behandeld met absolute vertrouwelijkheid en professionaliteit.",
        },
        {
          title: "Wereldwijd bereik",
          body: "Ons netwerk verbindt u met de meest gekwalificeerde kopers wereldwijd.",
        },
        {
          title: "Lokale wortels",
          body: "Drie decennia leven en ademen op de Rivièra-markt.",
        },
        {
          title: "Bespoke service",
          body: "Elke klant, elk pand, elke strategie — volledig op maat.",
        },
      ],
      teamEyebrow: "Het team",
      teamTitleBefore: "Het",
      teamTitleAccent: "Team",
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
      ctaEyebrow: "Een vraag?",
      ctaTitleBefore: "Laten we samen uw",
      ctaTitleAccent: "pand vinden",
      ctaBody:
        "Of u nu wilt kopen, verkopen of taxeren — ons team staat tot uw dienst.",
      ctaPrimary: "Bekijk de panden",
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
      eyebrow: "Verkopen met Ellington",
      titleBefore: "Verkoop",
      titleAccent: "met ons",
      lead: "Lokale expertise. Internationaal bereik. Uitmuntendheid op maat.",
      cta: "Vraag een taxatie aan",
      whyTitle: "Waarom Ellington?",
      whyBody1:
        "Geboren in het hart van de Golf van Saint-Tropez is Ellington meer dan een vastgoedkantoor — het is een handtekening.",
      whyBody2:
        "De oprichter, opgegroeid in de regio, biedt een instinctief begrip van elk adres en elke nuance die de waarde van een woning aan de Franse Rivièra bepaalt. Deze diepgaande lokale kennis, gecombineerd met een sterk internationaal netwerk, stelt ons in staat uitzonderlijke woningen te verbinden met de juiste kopers.",
      whyBody3:
        "Vloeiend in het Frans, Engels en Nederlands, en ondersteund door vertrouwde internationale partners, zorgt Ellington ervoor dat elke woning gerichte wereldwijde zichtbaarheid geniet.",
      whyBody4:
        "Wij benaderen elke verkoop met discretie, precisie en een strategie op maat — omdat geen enkele woning hetzelfde is.",
      processTitle: "Ons verkoopproces",
      steps: [
        {
          title: "Taxatie op maat",
          body: "Wij bieden een nauwkeurige en strategische taxatie op basis van marktexpertise, waarmee uw woning optimaal wordt gepositioneerd voor het beste resultaat.",
        },
        {
          title: "Gerichte zichtbaarheid",
          body: "Wij activeren ons wereldwijde netwerk en privécliëntenbestand om serieuze en relevante kopers te bereiken.",
        },
        {
          title: "Marketing op maat",
          body: "Uw woning wordt gepresenteerd met zorgvuldig vervaardigd beeldmateriaal en gepromoot bij een gekwalificeerd internationaal publiek.",
        },
        {
          title: "Onderhandeling & afronding",
          body: "Wij begeleiden u bij elke stap van bod tot ondertekening en stellen de transactie veilig onder de best mogelijke voorwaarden.",
        },
      ],
      trustTitle: "Waarom cliënten ons vertrouwen",
      trustCards: [
        {
          title: "Discretie",
          body: "Wij begrijpen het belang van privacy en behandelen elke transactie met volledige vertrouwelijkheid.",
        },
        {
          title: "Internationaal netwerk",
          body: "Onze wereldwijde connecties brengen gekwalificeerde kopers van over de grenzen.",
        },
        {
          title: "Toegewijde ondersteuning",
          body: "Een responsief, attent team dat u bij elke stap begeleidt.",
        },
        {
          title: "Aanpak op maat",
          body: "Elke woning profiteert van een persoonlijke strategie die is ontworpen om haar waarde te maximaliseren.",
        },
      ],
      ctaTitle: "Ontdek de werkelijke waarde van uw woning",
      ctaSubtitle:
        "Of u nu overweegt te verkopen of gewoon uw opties verkent, ons team staat tot uw beschikking.",
      ctaButton: "Vraag uw vertrouwelijke taxatie aan",
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

