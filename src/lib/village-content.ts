// Village page content (redesign step 18), one entry per village, keyed by
// slug. Source: the client documents "ellington-locations-en.pdf" and
// "ellington-locations-fr.pdf" (November 2026).
//   EN: from the PDF, with accents / typos fixed (Provençal, Café, Château…)
//       and "Golfe" instead of "Gulf" (project rule).
//   FR: from the PDF (small typo fixes: "Le Café de France", accents).
//   NL: draft translation. TODO client review (NL draft)
// Figures (average price / properties) are the Figma placeholders, to be
// replaced by the client (decision 8). `favourites: null` hides the
// "Our favourites" section until the client sends the names.
// Gallery: photos from the Figma village frames for now (2 or 3 per village;
// the mosaic adapts). Replace with the client's own photos when available.

type L = { fr: string; en: string; nl: string };
type LList = { fr: string[]; en: string[]; nl: string[] };

export interface VillageContent {
  tagline: L;
  intro: L;
  stats: { averagePrice: string; properties: string };
  gallery: string[];
  seeDo: LList;
  experiences: LList;
  /** Names of places (same in every language); null = not provided yet */
  favourites: string[] | null;
  /** Only Saint-Tropez (Figma) */
  investment?: { intro: L; items: LList };
}

export const VILLAGE_CONTENT: Record<string, VillageContent> = {
  "saint-tropez": {
    tagline: {
      en: "Iconic glamour meets timeless Riviera elegance",
      fr: "Le glamour iconique de la Riviera",
      nl: "Iconische glamour en tijdloze elegantie aan de Rivièra",
    },
    intro: {
      en: "Saint-Tropez continues to attract a discerning international clientele, drawn by its superyachts, art galleries and world-class restaurants. Behind the summer spectacle lies a preserved Provençal village — its citadel, its orange-red bell tower and the legendary Place des Lices speak to an authenticity that resists the passage of time.",
      fr: "Saint-Tropez continue d'attirer une clientèle internationale exigeante, séduite par ses yachts, ses galeries d'art et ses tables gastronomiques. Derrière l'agitation estivale se cache un village provençal préservé, avec sa citadelle, son clocher rouge orangé et son marché de la place des Lices.",
      nl: "Saint-Tropez blijft een veeleisende internationale clientèle aantrekken, die komt voor de superjachten, de kunstgalerieën en de restaurants van wereldklasse. Achter het zomerse spektakel schuilt een bewaard gebleven Provençaals dorp — de citadel, de oranjerode klokkentoren en het legendarische Place des Lices getuigen van een authenticiteit die de tijd weerstaat.",
    },
    stats: { averagePrice: "€8M+", properties: "40+" },
    gallery: ["/locations/saint-tropez/mosaic-1.jpg", "/locations/saint-tropez/mosaic-2.jpg", "/locations/saint-tropez/mosaic-3.jpg"],
    seeDo: {
      en: [
        "The citadel and maritime history museum, with views over the Baie des Canebiers",
        "The old port and fish market, gateway to the historic village",
        "Place des Lices and its pétanque games (Tuesdays and Saturdays)",
        "Notre-Dame de l'Assomption church and its iconic orange-red bell tower",
        "The beaches of Pampelonne and Tahiti",
        "The Gendarme de Saint-Tropez museum",
      ],
      fr: [
        "La citadelle et son musée de l'histoire maritime, vue sur la baie des Canebiers",
        "Le vieux port et le marché aux poissons, entrée du vieux village",
        "La place des Lices et ses parties de pétanque (mardi et samedi)",
        "L'église Notre-Dame de l'Assomption et son clocher rouge orangé",
        "Les plages de Pampelonne et de Tahiti",
        "Le musée du Gendarme de Saint-Tropez",
      ],
      nl: [
        "De citadel en het museum voor maritieme geschiedenis, met uitzicht over de Baie des Canebiers",
        "De oude haven en de vismarkt, toegangspoort tot het historische dorp",
        "Het Place des Lices en de jeu-de-boulespartijen (dinsdag en zaterdag)",
        "De kerk Notre-Dame de l'Assomption en haar iconische oranjerode klokkentoren",
        "De stranden van Pampelonne en Tahiti",
        "Het museum van de Gendarme de Saint-Tropez",
      ],
    },
    experiences: {
      en: [
        "Strolling the coastal path and the old port jetty",
        "Exploring boutiques and art galleries in the village lanes",
        "Tasting the tropézienne — the town's emblematic cake",
        "Wine tasting at local vineyards and estates",
      ],
      fr: [
        "Flâner sur le sentier du littoral et la jetée du vieux port",
        "Découvrir boutiques et galeries dans les ruelles du centre",
        "Déguster la tropézienne, gâteau emblématique de la ville",
        "Visiter les vignobles et déguster les grands crus locaux",
      ],
      nl: [
        "Wandelen over het kustpad en de pier van de oude haven",
        "Boetieks en kunstgalerieën ontdekken in de straatjes van het dorp",
        "De tropézienne proeven — het kenmerkende gebak van de stad",
        "Wijnproeverijen bij de wijngaarden en domeinen in de omgeving",
      ],
    },
    favourites: [
      "La Vague d'Or",
      "Au Caprice des Deux",
      "Les Graniers",
      "Le Restaurant du Byblos",
      "Le Quai",
      "Le Café",
      "L'Opéra",
      "La Petite Plage",
      "Cherry",
      "Zetta",
      "Villa Azur",
    ],
    // Figma "Investment & market" (EN); FR / NL draft. TODO client review
    investment: {
      intro: {
        en: "Exceptional properties with strong asset potential in Saint-Tropez.",
        fr: "Des biens d'exception au fort potentiel patrimonial à Saint-Tropez.",
        nl: "Uitzonderlijke woningen met een sterk vermogenspotentieel in Saint-Tropez.",
      },
      items: {
        en: [
          "Contemporary villas with sea view",
          "Exclusive estates in private domains",
          "Provençal mas and country houses",
          "Waterfront apartments and penthouses",
        ],
        fr: [
          "Villas contemporaines avec vue mer",
          "Propriétés d'exception dans des domaines privés",
          "Mas provençaux et maisons de campagne",
          "Appartements et penthouses en front de mer",
        ],
        nl: [
          "Hedendaagse villa's met zeezicht",
          "Exclusieve landgoederen in privédomeinen",
          "Provençaalse mas en landhuizen",
          "Appartementen en penthouses aan het water",
        ],
      },
    },
  },

  ramatuelle: {
    tagline: {
      en: "Hilltop charm overlooking the Bay of Pampelonne",
      fr: "Le charme perché dominant la Méditerranée",
      nl: "Charme op een heuvel met uitzicht op de baai van Pampelonne",
    },
    intro: {
      en: "Ramatuelle is a medieval village perched at 130 metres, commanding sweeping views over the Bay of Pampelonne. Its vine-covered lanes, its 16th-century Saracen gate and the Notre-Dame church bear witness to a rich architectural heritage.",
      fr: "Ramatuelle est un village médiéval perché à 130 mètres, dominant la somptueuse baie de Pampelonne. Son centre a su garder toute son authenticité : ses ruelles sinueuses, sa porte sarrasine du XVIe siècle et son église Notre-Dame témoignent d'un riche patrimoine architectural.",
      nl: "Ramatuelle is een middeleeuws dorp op 130 meter hoogte, met een weids uitzicht over de baai van Pampelonne. De met wingerd begroeide straatjes, de Saraceense poort uit de 16e eeuw en de kerk Notre-Dame getuigen van een rijk architectonisch erfgoed.",
    },
    stats: { averagePrice: "€5M+", properties: "25+" },
    gallery: ["/locations/ramatuelle/mosaic-1.jpg", "/locations/ramatuelle/mosaic-2.jpg"],
    seeDo: {
      en: [
        "The medieval village: Saracen gate (16th c.), Sainte-Anne chapel, Notre-Dame church",
        "The Bay of Pampelonne and its beaches (Jardin Tropezina, Bagatelle, Cabane Bambou)",
        "Anse de Bonne Terrasse and L'Escalet beach (diving)",
        "Camarat lighthouse (130 m) and Cap Taillat",
        "Château Volterra and its prestigious wine estate",
      ],
      fr: [
        "Le village médiéval : la porte sarrasine (XVIe s.), la chapelle Sainte-Anne, l'église Notre-Dame",
        "La baie de Pampelonne et ses plages (Jardin Tropezina, Bagatelle, Cabane Bambou)",
        "L'Anse de Bonne Terrasse et la plage de l'Escalet (plongée)",
        "Le phare de Camarat (130 m) et le Cap Taillat",
        "Le Château Volterra et son domaine viticole",
      ],
      nl: [
        "Het middeleeuwse dorp: Saraceense poort (16e eeuw), kapel Sainte-Anne, kerk Notre-Dame",
        "De baai van Pampelonne en haar stranden (Jardin Tropezina, Bagatelle, Cabane Bambou)",
        "Anse de Bonne Terrasse en het strand van L'Escalet (duiken)",
        "De vuurtoren van Camarat (130 m) en Cap Taillat",
        "Château Volterra en zijn prestigieuze wijndomein",
      ],
    },
    experiences: {
      en: [
        "Getting lost in the lanes of the historic centre",
        "Hiking the coastal trail between Cap Camarat and Cap Taillat",
        "Wine tasting at local estates",
      ],
      fr: [
        "Se perdre dans les ruelles du centre historique",
        "Randonnée sur le sentier côtier entre cap Camarat et cap Taillat",
        "Dégustation de vins dans les domaines locaux",
      ],
      nl: [
        "Verdwalen in de straatjes van het historische centrum",
        "Wandelen over het kustpad tussen Cap Camarat en Cap Taillat",
        "Wijnproeverijen bij de domeinen in de omgeving",
      ],
    },
    favourites: ["L'Estable", "Le Fil à la Pâte", "La Ferme la Douceur", "La Grignote", "Le Café de l'Ormeau", "Bagatelle", "Cabane Bambou"],
  },

  gassin: {
    tagline: {
      en: "One of France's Most Beautiful Villages with 360° views",
      fr: "Village provençal aux vues panoramiques à 360°",
      nl: "Een van de mooiste dorpen van Frankrijk, met een uitzicht van 360°",
    },
    intro: {
      en: "Perched at 200 metres, Gassin is one of France's Most Beautiful Villages. Its extraordinary 360° views over the Golfe de Saint-Tropez and its authentic Provençal character attract buyers who prize tranquillity and timeless beauty.",
      fr: "Perché à 200 mètres, Gassin est l'un des Plus Beaux Villages de France. Ses vues extraordinaires sur le Golfe de Saint-Tropez et son caractère provençal authentique séduisent les acheteurs en quête de tranquillité et de beauté intemporelle.",
      nl: "Gassin ligt op 200 meter hoogte en is een van de mooiste dorpen van Frankrijk. Het buitengewone uitzicht van 360° over de Golfe de Saint-Tropez en het authentieke Provençaalse karakter trekken kopers aan die rust en tijdloze schoonheid waarderen.",
    },
    stats: { averagePrice: "€4M+", properties: "20+" },
    gallery: ["/locations/gassin/mosaic-1.jpg", "/locations/gassin/mosaic-2.jpg"],
    seeDo: {
      en: [
        "The historic centre: Saracen gate, Notre-Dame-de-la-Compassion chapel, washhouses",
        "The Androuno — reportedly the world's narrowest street at 29 cm (National Geographic)",
        "The L'Hardy-Denonain botanical garden (classified remarkable in 2009, 2,500 m²)",
        "Wine estates: Château Minuty, Château Barbeyrolles, Château de Chausse",
      ],
      fr: [
        "Le centre historique : porte des Sarrasins, chapelle Notre-Dame-de-la-Compassion, lavoirs",
        "L'Androuno — la rue la plus étroite du monde (29 cm) selon le National Geographic",
        "Le jardin botanique L'Hardy-Denonain (classé remarquable en 2009, 2 500 m²)",
        "Les vignobles : Château Minuty, Château Barbeyrolles, Château de Chausse",
      ],
      nl: [
        "Het historische centrum: Saraceense poort, kapel Notre-Dame-de-la-Compassion, wasplaatsen",
        "De Androuno — volgens National Geographic de smalste straat ter wereld (29 cm)",
        "De botanische tuin L'Hardy-Denonain (in 2009 als bijzonder erkend, 2.500 m²)",
        "Wijndomeinen: Château Minuty, Château Barbeyrolles, Château de Chausse",
      ],
    },
    experiences: {
      en: [
        "Panoramic walks over the Golfe",
        "Wine tasting at organic estates",
        "Hiking or mountain biking through the Maures forest",
      ],
      fr: [
        "Promenade panoramique sur le Golfe",
        "Dégustation dans les domaines viticoles biologiques",
        "Randonnées à pied ou en VTT dans la forêt des Maures",
      ],
      nl: [
        "Panoramische wandelingen boven de Golfe",
        "Wijnproeverijen bij biologische domeinen",
        "Wandelen of mountainbiken in het Massif des Maures",
      ],
    },
    favourites: ["Chez Nous", "Petit Jacques", "Open Bistro", "La Petite Maison", "Via Marine", "Le Passage"],
  },

  grimaud: {
    tagline: {
      en: "Medieval character at the heart of the Golfe",
      fr: "Le caractère médiéval au cœur du Golfe",
      nl: "Middeleeuws karakter in het hart van de Golfe",
    },
    intro: {
      en: "Grimaud is a medieval village crowned by its 11th-century castle, overlooking the Golfe de Saint-Tropez. It combines remarkable historical character with an authentically Provençal atmosphere.",
      fr: "Grimaud est un village médiéval dominé par son château du XIe siècle, surplombant le Golfe de Saint-Tropez. Il allie un remarquable caractère historique à une atmosphère authentiquement provençale.",
      nl: "Grimaud is een middeleeuws dorp, bekroond door een kasteel uit de 11e eeuw, met uitzicht over de Golfe de Saint-Tropez. Het combineert een opmerkelijk historisch karakter met een authentiek Provençaalse sfeer.",
    },
    stats: { averagePrice: "€3.5M+", properties: "18+" },
    gallery: ["/locations/grimaud/mosaic-1.jpg", "/locations/grimaud/mosaic-2.jpg"],
    seeDo: {
      en: [
        "The medieval castle and ruins (11th century)",
        "The Pont des Fées trail (Massif des Maures)",
        "Ranch de la Mène and Hubside Jumping (horse riding)",
        "Cycling and mountain bike trails around the village",
      ],
      fr: [
        "Le château médiéval et ses ruines (XIe siècle)",
        "Le sentier du Pont des Fées (Massif des Maures)",
        "Ranch de la Mène et Hubside Jumping (équitation)",
        "Pistes cyclables et VTT",
      ],
      nl: [
        "Het middeleeuwse kasteel en de ruïnes (11e eeuw)",
        "Het wandelpad van de Pont des Fées (Massif des Maures)",
        "Ranch de la Mène en Hubside Jumping (paardrijden)",
        "Fiets- en mountainbikeroutes rond het dorp",
      ],
    },
    experiences: {
      en: ["Tree climbing · Karting · Golf · Bowling · Skate park"],
      fr: ["Accrobranche · Karting · Golf · Bowling · Skate-park"],
      nl: ["Klimbos · Karting · Golf · Bowling · Skatepark"],
    },
    favourites: ["La Grimaudoise", "Chez Jeff et Ju", "La Table des Oliviers", "La Fontaine", "Le Grand Pin", "La Table de Didier", "Le Plaisancier"],
  },

  "port-grimaud": {
    tagline: {
      en: "The Provençal Venice with private canal access to the sea",
      fr: "La Venise provençale, l'art de vivre au bord de l'eau",
      nl: "Het Provençaalse Venetië, met eigen kanalen naar zee",
    },
    intro: {
      en: "Known as the little Provençal Venice, Port Grimaud is a unique lakeside village created by architect François Spoerry. Every home has direct access to the sea via private canals, offering an unmatched intimacy with the Mediterranean.",
      fr: "Surnommée la petite Venise provençale, Port Grimaud est un village lacustre unique créé par l'architecte François Spoerry. Chaque maison possède un accès direct à la mer via des canaux privés.",
      nl: "Port Grimaud, het kleine Provençaalse Venetië, is een uniek lagunedorp, ontworpen door architect François Spoerry. Elke woning heeft via eigen kanalen directe toegang tot de zee — een ongeëvenaarde nabijheid van de Middellandse Zee.",
    },
    stats: { averagePrice: "€2.5M+", properties: "35+" },
    gallery: ["/locations/port-grimaud/mosaic-1.jpg", "/locations/port-grimaud/mosaic-2.jpg"],
    seeDo: {
      en: [
        "The canal network and marina basins: Galiote, Cascatelle and Brigantine",
        "The waterfront promenade",
        "Water sports: sailing, diving, boat hire",
      ],
      fr: [
        "Les canaux et bassins portuaires : Galiote, Cascatelle et Brigantine",
        "La promenade en front de mer",
        "Activités nautiques : voile, plongée, location de bateaux",
      ],
      nl: [
        "Het kanalennet en de havenbekkens: Galiote, Cascatelle en Brigantine",
        "De boulevard langs het water",
        "Watersport: zeilen, duiken, bootverhuur",
      ],
    },
    experiences: {
      en: ["Sailing · Diving · Boat hire · Water skiing"],
      fr: ["Navigation · Plongée · Location de bateaux · Ski nautique"],
      nl: ["Zeilen · Duiken · Bootverhuur · Waterskiën"],
    },
    favourites: ["Côté Port", "Via Marine", "Le M", "Le Jardin Impérial"],
  },

  "sainte-maxime": {
    tagline: {
      en: "Refined family living on the northern shore of the Golfe",
      fr: "L'élégance familiale sur la rive nord du Golfe",
      nl: "Verfijnd gezinsleven aan de noordkust van de Golfe",
    },
    intro: {
      en: "Facing Saint-Tropez across the Golfe, Sainte-Maxime offers all the pleasures of the Côte d'Azur with a refined family atmosphere, excellent amenities and a rich cultural calendar throughout the year.",
      fr: "Face à Saint-Tropez de l'autre côté du Golfe, Sainte-Maxime offre tous les plaisirs de la Côte d'Azur avec une atmosphère familiale raffinée, d'excellentes infrastructures et une animation culturelle toute l'année.",
      nl: "Sainte-Maxime ligt tegenover Saint-Tropez aan de overkant van de Golfe en biedt alle genoegens van de Côte d'Azur, met een verfijnde gezinssfeer, uitstekende voorzieningen en het hele jaar door een rijk cultureel programma.",
    },
    stats: { averagePrice: "€2M+", properties: "45+" },
    gallery: ["/locations/sainte-maxime/mosaic-1.jpg", "/locations/sainte-maxime/mosaic-2.jpg"],
    seeDo: {
      en: [
        "The Tour Carrée (16th century), emblem of the town",
        "La Pointe des Sardinaux — a wild headland with coves and snorkelling",
        "The Myrtes botanical garden (free entry)",
        "Seven beaches, including La Nartelle (families) and La Madrague (snorkelling)",
        "Domaine des Beraucas (AOC Côtes-de-Provence vineyard)",
      ],
      fr: [
        "La Tour Carrée (XVIe siècle), emblème de la ville",
        "La Pointe des Sardinaux (criques, snorkeling)",
        "Le jardin botanique des Myrtes (entrée gratuite)",
        "7 plages dont La Nartelle (familles) et La Madrague (snorkeling)",
        "Le domaine des Beraucas (AOC Côtes-de-Provence)",
      ],
      nl: [
        "De Tour Carrée (16e eeuw), het symbool van de stad",
        "La Pointe des Sardinaux — een ruige landtong met baaitjes, ideaal om te snorkelen",
        "De botanische tuin Les Myrtes (gratis toegang)",
        "Zeven stranden, waaronder La Nartelle (gezinnen) en La Madrague (snorkelen)",
        "Domaine des Beraucas (AOC Côtes-de-Provence)",
      ],
    },
    experiences: {
      en: ["Markets: Friday (general) · Thursday morning (regional) · summer night market"],
      fr: ["Marchés : vendredi (général) · jeudi matin (régional) · marché nocturne d'art (été)"],
      nl: ["Markten: vrijdag (algemeen) · donderdagochtend (streekproducten) · avondmarkt in de zomer"],
    },
    favourites: ["Le Café de France", "Maison Bianca", "Plage La Rascasse"],
  },

  "la-croix-valmer": {
    tagline: {
      en: "A serene coastal retreat with some of the finest beaches on the Riviera",
      fr: "Retraite côtière aux plages les plus préservées de la Riviera",
      nl: "Een rustige kustplek met enkele van de mooiste stranden van de Rivièra",
    },
    intro: {
      en: "La Croix-Valmer enjoys some of the finest natural beaches on the Riviera. Nestled between vineyards and the sea, it offers exceptional properties in one of the most naturally preserved settings on the coast.",
      fr: "La Croix-Valmer profite de certaines des plus belles plages naturelles de la Riviera. Nichée entre vignobles et mer, elle offre des propriétés d'exception dans l'un des cadres naturels les plus préservés du littoral.",
      nl: "La Croix-Valmer heeft enkele van de mooiste natuurlijke stranden van de Rivièra. Tussen wijngaarden en zee biedt het uitzonderlijke woningen in een van de best bewaarde natuurlijke omgevingen aan de kust.",
    },
    stats: { averagePrice: "€1.8M+", properties: "22+" },
    gallery: ["/locations/la-croix-valmer/mosaic-1.jpg", "/locations/la-croix-valmer/mosaic-2.jpg"],
    seeDo: {
      en: [
        "Beaches: Gigaro, Cap Lardier, Débarquement beach, Sylvabelle",
        "The coastal path and cycling routes",
        "Château de Chausse (15 ha, 7 organic grape varieties)",
        "Domaine de la Croix: tastings, cellar tours, vineyard walks",
        "Domaine La Tourraque (organic farming since 2013)",
      ],
      fr: [
        "Plages : Gigaro, Cap Lardier, plage du Débarquement, Sylvabelle",
        "Le sentier du littoral et les balades à vélo",
        "Château de Chausse (15 ha, 7 cépages en agriculture biologique)",
        "Domaine de La Croix : dégustation, visite des chais, promenade dans les vignes",
        "Domaine La Tourraque (agriculture biologique depuis 2013)",
      ],
      nl: [
        "Stranden: Gigaro, Cap Lardier, plage du Débarquement, Sylvabelle",
        "Het kustpad en de fietsroutes",
        "Château de Chausse (15 ha, 7 biologische druivenrassen)",
        "Domaine de la Croix: proeverijen, kelderbezoek, wandelingen door de wijngaard",
        "Domaine La Tourraque (biologische teelt sinds 2013)",
      ],
    },
    experiences: {
      en: ["Sustainable winemaking · Coastal hiking · Cycling"],
      fr: ["Viticulture durable · Randonnées côtières · Vélo"],
      nl: ["Duurzame wijnbouw · Kustwandelingen · Fietsen"],
    },
    favourites: null, // PDF: "to be completed by the client"
  },

  "cavalaire-sur-mer": {
    tagline: {
      en: "A magnificent bay with an exceptional marina and authentic charm",
      fr: "La douceur d'une magnifique baie authentiquement méditerranéenne",
      nl: "Een prachtige baai met een uitzonderlijke jachthaven en authentieke charme",
    },
    intro: {
      en: "Cavalaire-sur-Mer stretches along a magnificent three-kilometre bay. Its marina — one of the largest and best-equipped on the Côte d'Azur — accommodates up to 1,600 boats.",
      fr: "Cavalaire-sur-Mer s'étend le long d'une magnifique baie de trois kilomètres. Sa marina, l'une des plus étendues et des mieux équipées de la Côte d'Azur, accueille jusqu'à 1 600 bateaux.",
      nl: "Cavalaire-sur-Mer strekt zich uit langs een prachtige baai van drie kilometer. De jachthaven — een van de grootste en best uitgeruste aan de Côte d'Azur — biedt plaats aan 1.600 boten.",
    },
    stats: { averagePrice: "€1.5M+", properties: "30+" },
    gallery: ["/locations/cavalaire-sur-mer/mosaic-1.jpg", "/locations/cavalaire-sur-mer/mosaic-2.jpg"],
    seeDo: {
      en: [
        "The marina with 1,600 berths, one of the best-equipped on the Côte d'Azur",
        "The bay of Cavalaire and its fine sandy beaches",
        "Water sports: sailing, diving, water skiing",
        "The coastal path with panoramic views",
      ],
      fr: [
        "La marina et ses 1 600 anneaux, l'une des mieux équipées de la Côte d'Azur",
        "La baie de Cavalaire et ses plages de sable fin",
        "Sports nautiques : voile, plongée, ski nautique",
        "Le sentier du littoral",
      ],
      nl: [
        "De jachthaven met 1.600 ligplaatsen, een van de best uitgeruste aan de Côte d'Azur",
        "De baai van Cavalaire en haar fijne zandstranden",
        "Watersport: zeilen, duiken, waterskiën",
        "Het kustpad met panoramisch uitzicht",
      ],
    },
    experiences: {
      en: ["Sailing · Diving · Water skiing · Full marina services"],
      fr: ["Navigation · Plongée · Ski nautique · Services portuaires"],
      nl: ["Zeilen · Duiken · Waterskiën · Volledige havenvoorzieningen"],
    },
    favourites: null, // PDF: "to be completed by the client"
  },

  "rayol-canadel": {
    tagline: {
      en: "An exclusive protected enclave on the Corniche des Maures",
      fr: "L'enclave exclusive de la Corniche des Maures",
      nl: "Een exclusieve, beschermde enclave aan de Corniche des Maures",
    },
    intro: {
      en: "Rayol-Canadel-sur-Mer is one of the most exclusive resorts on the Côte d'Azur — a protected enclave of remarkable landscapes and crystal-clear waters, preserved from mass tourism.",
      fr: "Rayol-Canadel-sur-Mer est l'une des stations balnéaires les plus exclusives de la Côte d'Azur — une enclave protégée aux paysages remarquables et aux eaux cristallines, préservée du tourisme de masse.",
      nl: "Rayol-Canadel-sur-Mer is een van de meest exclusieve badplaatsen aan de Côte d'Azur — een beschermde enclave met opmerkelijke landschappen en kristalhelder water, gevrijwaard van massatoerisme.",
    },
    stats: { averagePrice: "€2M+", properties: "15+" },
    gallery: ["/locations/rayol-canadel/mosaic-1.jpg", "/locations/rayol-canadel/mosaic-2.jpg"],
    seeDo: {
      en: [
        "Domaine du Rayol / Jardin des Méditerranées (20 ha, protected site)",
        "Three beaches: Canadel, Rayol, Pramousquier",
        "Hiking to the Col du Canadel (269 m, views over the Îles d'Or)",
        "The monumental staircase of Le Rayol (1920s, built in Maures schist)",
        "The Chemin des Douaniers coastal path",
      ],
      fr: [
        "Le Domaine du Rayol / Jardin des Méditerranées (20 ha, site protégé)",
        "Trois plages : Canadel, Rayol, Pramousquier",
        "Randonnée jusqu'au col du Canadel (269 m, vue sur les îles d'Or)",
        "L'escalier monumental du Rayol (années 1920)",
        "Le Chemin des Douaniers, sentier maritime",
      ],
      nl: [
        "Domaine du Rayol / Jardin des Méditerranées (20 ha, beschermd gebied)",
        "Drie stranden: Canadel, Rayol, Pramousquier",
        "Wandelen naar de Col du Canadel (269 m, uitzicht over de Îles d'Or)",
        "De monumentale trap van Le Rayol (jaren 1920, gebouwd in leisteen uit de Maures)",
        "Het kustpad Chemin des Douaniers",
      ],
    },
    experiences: {
      en: ["Hiking · Beaches · Snorkelling · Botanical gardens"],
      fr: ["Randonnée · Plages · Snorkeling · Jardins botaniques"],
      nl: ["Wandelen · Stranden · Snorkelen · Botanische tuinen"],
    },
    favourites: ["Restaurant Maurin des Maures", "L'Ancre d'Or", "Le Café des Jardiniers", "Le Vindeux"],
  },
};
