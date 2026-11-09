import type { Property, Location } from "./types";
import { fetchApimoProperties, fetchApimoProperty, isApimoConfigured } from "./apimo";

// High-quality Unsplash images — placeholder until Apimo media is wired in.
const img = (id: string, alt: string) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`,
  alt,
});

/**
 * Mock dataset used as fallback when Apimo env vars are absent (local dev,
 * preview deployments without secrets). Once APIMO_PROVIDER / APIMO_TOKEN /
 * APIMO_AGENCY are present in env, the live Apimo data takes over.
 */
export const mockProperties: Property[] = [
  {
    id: "ell-001",
    reference: "ELL-ST-001",
    category: "sale",
    type: "penthouse",
    status: "available",
    title: "Penthouse Cœur du Village",
    subtitle: "Vue Place des Lices et Golfe",
    description:
      "Penthouse contemporain au cœur de Saint-Tropez, à deux pas de la Place des Lices et du port. Baies vitrées du sol au plafond, terrasse panoramique de 80m² avec vue sur le Golfe et les toits du village. Ascenseur privatif, prestations haut de gamme, parking sécurisé.",
    city: "Saint-Tropez",
    region: "Côte d'Azur",
    country: "FR",
    coordinates: { lat: 43.2727, lng: 6.6407 },
    price: 8500000,
    currency: "EUR",
    area: 280,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    yearBuilt: 2022,
    features: [
      "Vue Place des Lices",
      "Vue Golfe",
      "Terrasse 80m²",
      "Ascenseur privatif",
      "Parking sécurisé",
      "Cave à vin",
      "Domotique",
      "Concierge",
    ],
    pictures: [
      img("photo-1600596542815-ffad4c1539a9", "Salon principal"),
      img("photo-1613490493576-7fde63acd811", "Vue extérieure"),
      img("photo-1600585154340-be6161a56a0c", "Cuisine ouverte"),
      img("photo-1600210492486-724fe5c67fb0", "Suite parentale"),
      img("photo-1600607687939-ce8a6c25118c", "Salle de bain"),
      img("photo-1600566753190-17f0baa2a6c3", "Terrasse"),
    ],
    // Mock energy data (REDESIGN-PLAN.md §4): the full Figma example
    energyClass: "B",
    ghgClass: "A",
    energyValue: 109,
    ghgValue: 3,
    energyCostMin: 3040,
    energyCostMax: 4190,
    energyCostYear: 2023,
    isFeatured: true,
    isExclusive: true,
  },
  {
    id: "ell-002",
    reference: "ELL-GR-002",
    category: "sale",
    type: "villa",
    status: "available",
    title: "Villa au Bord de l'Eau",
    subtitle: "Pieds dans l'eau, vue Golfe de Saint-Tropez",
    description:
      "Villa contemporaine pieds dans l'eau à Grimaud, face au Golfe de Saint-Tropez. Architecture épurée, matériaux nobles, vue mer à 180°. Plage privée, ponton, piscine à débordement. Un cadre exceptionnel sur l'une des plus belles baies de la Côte d'Azur.",
    city: "Grimaud",
    region: "Côte d'Azur",
    country: "FR",
    coordinates: { lat: 43.2752, lng: 6.5219 },
    price: 12900000,
    currency: "EUR",
    area: 450,
    landArea: 2200,
    rooms: 9,
    bedrooms: 6,
    bathrooms: 5,
    yearBuilt: 2018,
    features: [
      "Accès direct mer",
      "Plage privée",
      "Piscine à débordement",
      "Pool house",
      "Domotique complète",
      "Cinéma privé",
      "Cave à vin",
      "Ponton",
    ],
    pictures: [
      img("photo-1613553497126-a44624272024", "Façade côté mer"),
      img("photo-1582268611958-ebfd161ef9cf", "Piscine"),
      img("photo-1600585154526-990dced4db0d", "Salon"),
      img("photo-1564013799919-ab600027ffc6", "Vue aérienne"),
      img("photo-1600566753086-00f18fb6b3ea", "Suite"),
    ],
    // Mock energy data: numbers only, the classes are computed (C / B)
    energyValue: 150,
    ghgValue: 9,
    energyCostMin: 4200,
    energyCostMax: 5800,
    energyCostYear: 2023,
    isFeatured: true,
    isExclusive: true,
  },
  {
    id: "ell-003",
    reference: "ELL-ST-003",
    category: "sale",
    type: "estate",
    status: "available",
    title: "Domaine Historique",
    subtitle: "Bastide provençale rénovée — 8 hectares",
    description:
      "Bastide du XVIIIᵉ siècle entièrement rénovée sur un domaine de 8 hectares à Saint-Tropez. Oliveraies, vignes, oranges, jardins à la française. La rénovation préserve l'authenticité provençale tout en intégrant les standards contemporains les plus exigeants.",
    city: "Saint-Tropez",
    region: "Côte d'Azur",
    country: "FR",
    coordinates: { lat: 43.2727, lng: 6.6407 },
    price: 15200000,
    currency: "EUR",
    area: 680,
    landArea: 80000,
    rooms: 12,
    bedrooms: 8,
    bathrooms: 7,
    yearBuilt: 1780,
    features: [
      "Bastide XVIIIᵉ",
      "Domaine 8 hectares",
      "Oliveraie 200 oliviers",
      "Piscine à débordement",
      "Maison d'amis",
      "Court de tennis",
      "Hélistation",
      "Vignes",
    ],
    pictures: [
      img("photo-1600585154340-be6161a56a0c", "Vue d'ensemble"),
      img("photo-1568605114967-8130f3a36994", "Façade"),
      img("photo-1600596542815-ffad4c1539a9", "Salon"),
      img("photo-1600210491892-03d54c0aaf87", "Jardins"),
    ],
    energyClass: "E",
    ghgClass: "D",
    energyCostMin: 5400,
    energyCostMax: 7300,
    isFeatured: true,
    isExclusive: true,
  },
  {
    id: "ell-004",
    reference: "ELL-GA-004",
    category: "sale",
    type: "villa",
    status: "available",
    title: "Villa Panoramique",
    subtitle: "Vue 360° sur le Golfe et les Maures",
    description:
      "Villa d'exception sur les hauteurs de Gassin, classé parmi les Plus Beaux Villages de France. Vue à 360° sur le Golfe de Saint-Tropez, le massif des Maures et la Méditerranée. Architecture contemporaine, piscine à débordement, parc paysager arboré, pool house.",
    city: "Gassin",
    region: "Côte d'Azur",
    country: "FR",
    coordinates: { lat: 43.235, lng: 6.586 },
    price: 9800000,
    currency: "EUR",
    area: 520,
    landArea: 5000,
    rooms: 10,
    bedrooms: 7,
    bathrooms: 6,
    yearBuilt: 2016,
    features: [
      "Vue 360°",
      "Vue Golfe de Saint-Tropez",
      "Piscine à débordement",
      "Parc paysager 5000m²",
      "Pool house",
      "Maison de gardien",
      "Cave à vin",
    ],
    pictures: [
      img("photo-1512917774080-9991f1c4c750", "Façade"),
      img("photo-1600566753104-685f4f24cb4d", "Salon"),
      img("photo-1600607687920-4e2a09cf159d", "Chambre"),
      img("photo-1600566752355-35792bedcfea", "Piscine"),
    ],
    energyClass: "B",
    ghgClass: "B",
    energyCostMin: 3100,
    energyCostMax: 4200,
    isFeatured: true,
  },
  {
    id: "ell-005",
    reference: "ELL-PG-005",
    category: "sale",
    type: "townhouse",
    status: "available",
    title: "Maison sur les Canaux",
    subtitle: "Anneau d'amarrage privé à Port Grimaud",
    description:
      "Maison de pêcheur entièrement rénovée à Port Grimaud, la Venise provençale conçue par François Spoerry. Anneau d'amarrage privé devant la maison, terrasse au bord de l'eau, façade aux tons pastel typiques. Prestations haut de gamme, climatisation, place de parking.",
    city: "Port Grimaud",
    region: "Côte d'Azur",
    country: "FR",
    coordinates: { lat: 43.279, lng: 6.579 },
    price: 3450000,
    currency: "EUR",
    area: 165,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2021,
    features: [
      "Anneau d'amarrage privé",
      "Terrasse au bord de l'eau",
      "Façade pastel typique",
      "Climatisation",
      "Parking",
      "Rénovation complète",
    ],
    pictures: [
      img("photo-1600566753190-17f0baa2a6c3", "Salon"),
      img("photo-1600585154526-990dced4db0d", "Cuisine"),
      img("photo-1600210492486-724fe5c67fb0", "Chambre"),
    ],
    energyClass: "B",
    ghgClass: "A",
    energyCostMin: 1900,
    energyCostMax: 2600,
  },
  {
    id: "ell-006",
    reference: "ELL-SM-006",
    category: "sale",
    type: "villa",
    status: "available",
    title: "Villa Contemporaine d'Architecte",
    subtitle: "Sainte-Maxime, vue baie de Saint-Tropez",
    description:
      "Villa d'architecte contemporaine à Sainte-Maxime avec vue panoramique sur la baie de Saint-Tropez. Lignes pures, matériaux nobles, intégration parfaite dans le paysage méditerranéen.",
    city: "Sainte-Maxime",
    region: "Côte d'Azur",
    country: "FR",
    coordinates: { lat: 43.3094, lng: 6.6386 },
    price: 11500000,
    currency: "EUR",
    area: 380,
    landArea: 1800,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 5,
    yearBuilt: 2020,
    features: [
      "Architecture contemporaine",
      "Vue baie de Saint-Tropez",
      "Piscine miroir",
      "Spa",
      "Salle de sport",
      "Garage 4 voitures",
    ],
    pictures: [
      img("photo-1613490493576-7fde63acd811", "Vue extérieure"),
      img("photo-1600596542815-ffad4c1539a9", "Salon"),
      img("photo-1600566753086-00f18fb6b3ea", "Chambre"),
      img("photo-1600607687939-ce8a6c25118c", "Salle de bain"),
    ],
    energyClass: "A",
    ghgClass: "A",
    energyCostMin: 2200,
    energyCostMax: 3100,
    isFeatured: true,
  },
  {
    id: "ell-007",
    reference: "ELL-RM-007",
    category: "sale",
    type: "estate",
    status: "available",
    title: "Bastide de Pampelonne",
    subtitle: "À deux pas des plages mythiques",
    description:
      "Bastide provençale entièrement rénovée à Ramatuelle, à quelques minutes des plages de Pampelonne. Pinède centenaire, piscine chauffée, dépendances, charme authentique provençal. Une adresse confidentielle au cœur de la presqu'île.",
    city: "Ramatuelle",
    region: "Côte d'Azur",
    country: "FR",
    coordinates: { lat: 43.215, lng: 6.6126 },
    price: 6750000,
    currency: "EUR",
    area: 145,
    landArea: 3500,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 1880,
    features: [
      "Bastide provençale",
      "Proche Pampelonne",
      "Pinède centenaire",
      "Piscine chauffée",
      "Dépendances",
      "Cave voûtée",
    ],
    pictures: [
      img("photo-1600585154340-be6161a56a0c", "Salon"),
      img("photo-1600210492486-724fe5c67fb0", "Suite"),
      img("photo-1600566753190-17f0baa2a6c3", "Cuisine"),
    ],
    energyClass: "D",
    ghgClass: "C",
    energyCostMin: 3200,
    energyCostMax: 4400,
  },
  {
    id: "ell-008",
    reference: "ELL-RM-008",
    category: "sale",
    type: "estate",
    status: "available",
    title: "Domaine Viticole",
    subtitle: "Vignes en production, oliveraie centenaire",
    description:
      "Domaine viticole d'exception à Ramatuelle, entre Saint-Tropez et Pampelonne. Vignes en AOP Côtes-de-Provence, oliveraie centenaire, mas principal du XIXᵉ rénové, maison d'amis, piscine eau de mer. Cadre préservé sur près de 5 hectares.",
    city: "Ramatuelle",
    region: "Côte d'Azur",
    country: "FR",
    coordinates: { lat: 43.215, lng: 6.6126 },
    price: 24500000,
    currency: "EUR",
    area: 720,
    landArea: 48000,
    rooms: 14,
    bedrooms: 9,
    bathrooms: 8,
    yearBuilt: 1865,
    features: [
      "Vignes en production",
      "Oliveraie centenaire",
      "Mas du XIXᵉ rénové",
      "Maison d'amis",
      "Piscine eau de mer",
      "Cave de vinification",
      "Domaine 4,8 hectares",
    ],
    pictures: [
      img("photo-1564013799919-ab600027ffc6", "Vue aérienne"),
      img("photo-1600585154340-be6161a56a0c", "Façade"),
      img("photo-1582268611958-ebfd161ef9cf", "Piscine"),
      img("photo-1600596542815-ffad4c1539a9", "Salon"),
    ],
    // Mock energy data: none → "Diagnosis in progress"
    isFeatured: true,
    isExclusive: true,
  },
];

export const locations: Location[] = [
  {
    slug: "saint-tropez",
    name: "Saint-Tropez",
    tagline: "Le glamour iconique et l'élégance intemporelle de la Riviera",
    taglineEn: "Iconic glamour meets timeless Riviera elegance",
    taglineNl: "Iconische glamour en tijdloze elegantie aan de Rivièra", // TODO client review
    description:
      "De la Place des Lices aux plages de Pampelonne, Saint-Tropez incarne la quintessence de la Riviera française. Domaines viticoles, bastides provençales et villas contemporaines composent un patrimoine d'exception.",
    descriptionEn:
      "From Place des Lices to the beaches of Pampelonne, Saint-Tropez embodies the very essence of the French Riviera. Wine estates, Provençal bastides and contemporary villas form an exceptional heritage.",
    longDescription:
      "Ancien village de pêcheurs devenu mythe international depuis Brigitte Bardot, Saint-Tropez conserve une âme village derrière son aura glamour. Le marché provençal de la Place des Lices, la Citadelle dominant la baie, les ruelles colorées du quartier de la Ponche, le port intime aux yachts à quai : chaque adresse raconte un fragment de l'art de vivre tropézien. La péninsule offre l'un des marchés immobiliers les plus exigeants d'Europe — rareté foncière, exigence architecturale et discrétion absolue caractérisent les biens disponibles.",
    longDescriptionEn:
      "Once a fishermen's village turned international myth thanks to Brigitte Bardot, Saint-Tropez retains a village soul beneath its glamour. The Provençal market on Place des Lices, the Citadel watching over the bay, the colourful streets of the Ponche quarter, the intimate yacht-lined port — every address tells a fragment of the Tropezian way of life. The peninsula commands one of Europe's most demanding real estate markets, defined by land scarcity, architectural rigour and absolute discretion.",
    highlights: [
      "Place des Lices et marché provençal",
      "Plages de Pampelonne (à 10 min)",
      "Yacht clubs et marina internationale",
      "Bastides historiques et villas d'architecte",
    ],
    highlightsEn: [
      "Place des Lices and Provençal market",
      "Pampelonne beaches (10 min away)",
      "Yacht clubs and international marina",
      "Historic bastides and architect-designed villas",
    ],
    keyFacts: [
      { label: "Population", labelEn: "Population", value: "≈ 4 000 hab." },
      { label: "Aéroport", labelEn: "Airport", value: "Nice — 1h15" },
      { label: "Hélistation", labelEn: "Heliport", value: "La Môle — 10 min" },
      { label: "Saison", labelEn: "Season", value: "Toute l'année" },
    ],
    metaDescription:
      "Immobilier de prestige à Saint-Tropez. Découvrez villas, bastides et penthouses d'exception au cœur du village et sur la péninsule, avec Ellington.",
    metaDescriptionEn:
      "Luxury real estate in Saint-Tropez. Discover exceptional villas, bastides and penthouses in the village and across the peninsula, with Ellington.",
    image: "/locations/saint-tropez/sttropez-v2.jpg",
    coordinates: { lat: 43.2727, lng: 6.6407 },
    activities: [
      "Voile et yachting dans le Golfe",
      "Promenades côtières et points de vue",
      "Visites culturelles (Citadelle, musées, galeries)",
      "Beach clubs et farniente en bord de mer",
      "Événements saisonniers et régates",
    ],
    activitiesEn: [
      "Sailing and yachting in the Gulf of Saint-Tropez",
      "Coastal walks and scenic viewpoints",
      "Cultural visits (Citadel, museums, galleries)",
      "Beach clubs and seaside relaxation",
      "Seasonal events and regattas",
    ],
    favouritePlaces: [
      { name: "L'Opéra", category: "Restaurant", image: "/locations/saint-tropez/favourites/opera.jpg" },
      { name: "Byblos", category: "Hôtel", image: "/locations/saint-tropez/favourites/byblos.jpg" },
      { name: "La Petite Plage", category: "Beach club", image: "/locations/saint-tropez/favourites/la-petite-plage.jpg" },
      { name: "Café de Paris", category: "Restaurant", image: "/locations/saint-tropez/favourites/cafe-de-paris.jpg" },
      { name: "Cherry", category: "Bar", image: "/locations/saint-tropez/favourites/cherry.jpg" },
      { name: "Villa Azur", category: "Restaurant", image: "/locations/saint-tropez/favourites/villa-azur.jpg" },
    ],
  },
  {
    slug: "grimaud",
    name: "Grimaud",
    tagline: "Le caractère médiéval au cœur du Golfe",
    taglineEn: "Medieval character at the heart of the Golfe",
    taglineNl: "Middeleeuws karakter in het hart van de Golfe", // TODO client review
    description:
      "Au cœur du Golfe de Saint-Tropez, Grimaud séduit par son village médiéval perché, ses ruelles pavées et ses villas en bord de mer. Une adresse confidentielle et préservée de la Côte d'Azur.",
    descriptionEn:
      "At the heart of the Gulf of Saint-Tropez, Grimaud charms with its perched medieval village, its cobbled lanes and its waterfront villas — a confidential, preserved address on the French Riviera.",
    longDescription:
      "Dominé par les ruines du Château des Grimaldi (XIᵉ siècle), Grimaud déroule ses ruelles pavées entre maisons en pierre, fontaines et passages voûtés. Le village offre depuis ses hauteurs une vue plongeante sur le Golfe de Saint-Tropez. En contrebas, les hameaux résidentiels et les domaines en pinède dessinent un cadre de vie alliant authenticité provençale et confort contemporain. Une alternative confidentielle aux adresses plus exposées du Golfe.",
    longDescriptionEn:
      "Crowned by the ruins of the Grimaldi Castle (11th century), Grimaud unfolds its cobbled lanes between stone houses, fountains and vaulted passages. The hilltop village offers a sweeping view over the Gulf of Saint-Tropez. Below, residential hamlets and pine-shaded estates create a setting that blends Provençal authenticity with contemporary comfort — a confidential alternative to the Gulf's more exposed addresses.",
    highlights: [
      "Château des Grimaldi (XIᵉ siècle)",
      "Vue panoramique sur le Golfe",
      "Hameaux résidentiels en pinède",
      "À 10 min de Saint-Tropez et Port Grimaud",
    ],
    highlightsEn: [
      "Grimaldi Castle (11th century)",
      "Panoramic view over the Gulf",
      "Residential hamlets in pinewoods",
      "10 min from Saint-Tropez and Port Grimaud",
    ],
    keyFacts: [
      { label: "Altitude", labelEn: "Altitude", value: "105 m" },
      { label: "Population", labelEn: "Population", value: "≈ 4 200 hab." },
      { label: "Saint-Tropez", labelEn: "Saint-Tropez", value: "10 min" },
      { label: "Aéroport", labelEn: "Airport", value: "Nice — 1h20" },
    ],
    metaDescription:
      "Immobilier de prestige à Grimaud. Bastides, villas en pinède et propriétés au cœur du village médiéval, sélectionnées par Ellington.",
    metaDescriptionEn:
      "Luxury real estate in Grimaud. Bastides, pinewood villas and properties at the heart of the medieval village, curated by Ellington.",
    image: "/locations/grimaud/grimaud1.jpg",
    coordinates: { lat: 43.2752, lng: 6.5219 },
  },
  {
    slug: "port-grimaud",
    name: "Port Grimaud",
    tagline: "La Venise provençale, l'art de vivre au bord de l'eau",
    taglineEn: "The Provençal Venice with waterfront living",
    taglineNl: "Het Provençaalse Venetië, wonen aan het water", // TODO client review
    description:
      "Conçue dans les années 1960 par l'architecte François Spoerry, Port Grimaud est une cité lacustre unique en France. Maisons aux façades pastel, canaux navigables, anneaux d'amarrage privés : la Venise provençale conjugue charme méditerranéen et raffinement contemporain.",
    descriptionEn:
      "Designed in the 1960s by architect François Spoerry, Port Grimaud is a unique lakeside town. Pastel façades, navigable canals and private moorings — Provence's Venice blends Mediterranean charm with contemporary refinement.",
    longDescription:
      "Inscrite au Patrimoine du XXᵉ siècle, Port Grimaud déploie 7 km de canaux navigables sur lesquels chaque maison dispose de son propre anneau d'amarrage. L'architecture, signée François Spoerry et inspirée des villages de pêcheurs italiens, mêle façades aux tons pastel, tuiles romaines et placettes intimistes. Cette singularité urbaine — chaque acquéreur est aussi propriétaire d'un poste à quai — fait de Port Grimaud l'une des adresses les plus convoitées du Golfe pour les amateurs de plaisance.",
    longDescriptionEn:
      "Listed as 20th-century heritage, Port Grimaud unfolds 7 km of navigable canals where each home has its own private mooring. The architecture, designed by François Spoerry and inspired by Italian fishing villages, combines pastel façades, Roman tiles and intimate squares. This urban singularity — every buyer also owns a private berth — makes Port Grimaud one of the Gulf's most coveted addresses for sailing enthusiasts.",
    highlights: [
      "7 km de canaux navigables",
      "Anneau d'amarrage privé inclus",
      "Architecture François Spoerry",
      "Patrimoine du XXᵉ siècle",
    ],
    highlightsEn: [
      "7 km of navigable canals",
      "Private mooring included",
      "François Spoerry architecture",
      "20th-century heritage listing",
    ],
    keyFacts: [
      { label: "Création", labelEn: "Founded", value: "1966" },
      { label: "Canaux", labelEn: "Canals", value: "7 km" },
      { label: "Saint-Tropez", labelEn: "Saint-Tropez", value: "10 min" },
      { label: "Plages", labelEn: "Beaches", value: "à pied" },
    ],
    metaDescription:
      "Immobilier de prestige à Port Grimaud — la Venise provençale. Maisons sur les canaux avec anneau d'amarrage privé, sélectionnées par Ellington.",
    metaDescriptionEn:
      "Luxury real estate in Port Grimaud — the Provençal Venice. Canal-front houses with private mooring, curated by Ellington.",
    image: "/locations/portgrimaud.jpg",
    coordinates: { lat: 43.279, lng: 6.579 },
  },
  {
    slug: "ramatuelle",
    name: "Ramatuelle",
    tagline: "Le charme perché dominant la Méditerranée",
    taglineEn: "Hilltop charm overlooking the Mediterranean",
    taglineNl: "Charme op een heuvel met uitzicht op de Middellandse Zee", // TODO client review
    description:
      "Village perché entre vignobles et mer, Ramatuelle abrite la mythique plage de Pampelonne. Bastides en pierre, ruelles ombragées et mas d'exception composent un patrimoine d'une rare authenticité, à quelques minutes de Saint-Tropez.",
    descriptionEn:
      "A hilltop village set between vineyards and sea, Ramatuelle is home to the legendary Pampelonne beach. Stone bastides, shaded lanes and exceptional country estates form a rare authentic heritage, just minutes from Saint-Tropez.",
    longDescription:
      "Étendue sur 2 700 hectares dont la moitié est classée Natura 2000, Ramatuelle conjugue le mythe de Pampelonne — 5 km de sable fin et de plages mythiques (Club 55, Nikki Beach, La Réserve) — et l'authenticité d'un village médiéval perché à 136 m. Les vignobles AOP Côtes-de-Provence, les pinèdes et les domaines confidentiels font de Ramatuelle l'un des marchés les plus prisés du Golfe pour les acquéreurs en quête de discrétion et d'espace.",
    longDescriptionEn:
      "Spanning 2,700 hectares — half of it Natura 2000 protected — Ramatuelle combines the Pampelonne myth (5 km of fine sand, Club 55, Nikki Beach, La Réserve) with the authenticity of a hilltop village perched at 136 m. AOP Côtes-de-Provence vineyards, pinewoods and confidential estates make Ramatuelle one of the Gulf's most sought-after markets for buyers seeking discretion and space.",
    highlights: [
      "5 km de plages de Pampelonne",
      "Vignobles AOP Côtes-de-Provence",
      "Festival de Théâtre depuis 1985",
      "Bastides et mas d'exception",
    ],
    highlightsEn: [
      "5 km of Pampelonne beaches",
      "AOP Côtes-de-Provence vineyards",
      "Theatre Festival since 1985",
      "Exceptional bastides and farmhouses",
    ],
    keyFacts: [
      { label: "Altitude village", labelEn: "Village altitude", value: "136 m" },
      { label: "Plages", labelEn: "Beaches", value: "5 km" },
      { label: "Saint-Tropez", labelEn: "Saint-Tropez", value: "12 min" },
      { label: "Surface", labelEn: "Surface", value: "27 km²" },
    ],
    metaDescription:
      "Immobilier de prestige à Ramatuelle. Bastides, mas viticoles et villas proches de Pampelonne, sélectionnés par Ellington.",
    metaDescriptionEn:
      "Luxury real estate in Ramatuelle. Bastides, wine estates and villas near Pampelonne, curated by Ellington.",
    image: "/locations/ramatuelle.jpg",
    coordinates: { lat: 43.215, lng: 6.6126 },
  },
  {
    slug: "gassin",
    name: "Gassin",
    tagline: "Village provençal authentique aux vues panoramiques",
    taglineEn: "Authentic Provençal village with panoramic views",
    taglineNl: "Authentiek Provençaals dorp met panoramisch uitzicht", // TODO client review
    description:
      "Classé parmi les Plus Beaux Villages de France, Gassin couronne une colline avec vue à 360° sur le Golfe de Saint-Tropez, les Maures et la Méditerranée. Villas de prestige et propriétés viticoles s'épanouissent dans un cadre préservé.",
    descriptionEn:
      "Listed among the Most Beautiful Villages of France, Gassin crowns a hilltop with 360° views over the Gulf of Saint-Tropez, the Maures range and the Mediterranean. Prestigious villas and vineyard estates thrive in a preserved setting.",
    longDescription:
      "Perché à 200 mètres d'altitude, Gassin offre l'une des vues les plus spectaculaires du Var : Golfe de Saint-Tropez, île de Porquerolles, massif des Maures et, par temps clair, jusqu'aux Alpes. Le village médiéval, classé parmi les « Plus Beaux Villages de France », alterne ruelles fleuries, terrasses de pierre et placettes ombragées. Autour, les vignobles AOP et les domaines en hauteur attirent une clientèle en quête de panoramas exceptionnels et de tranquillité absolue, à 10 minutes seulement de Saint-Tropez.",
    longDescriptionEn:
      "Perched at 200 metres, Gassin offers one of Provence's most spectacular vistas — the Gulf of Saint-Tropez, the island of Porquerolles, the Maures range, and on clear days, the Alps beyond. The medieval village, listed among France's Most Beautiful Villages, alternates flowered lanes, stone terraces and shaded squares. Around it, AOP vineyards and hillside estates attract buyers seeking exceptional panoramas and absolute quiet, just 10 minutes from Saint-Tropez.",
    highlights: [
      "Plus Beaux Villages de France",
      "Vue 360° sur le Golfe",
      "Vignobles AOP en hauteur",
      "À 10 min de Saint-Tropez",
    ],
    highlightsEn: [
      "Most Beautiful Villages of France",
      "360° view over the Gulf",
      "AOP vineyards on the hillside",
      "10 min from Saint-Tropez",
    ],
    keyFacts: [
      { label: "Altitude", labelEn: "Altitude", value: "200 m" },
      { label: "Population", labelEn: "Population", value: "≈ 2 800 hab." },
      { label: "Saint-Tropez", labelEn: "Saint-Tropez", value: "10 min" },
      { label: "Vue", labelEn: "View", value: "360°" },
    ],
    metaDescription:
      "Immobilier de prestige à Gassin, Plus Beaux Villages de France. Villas vue 360° sur le Golfe, propriétés viticoles, par Ellington.",
    metaDescriptionEn:
      "Luxury real estate in Gassin, Most Beautiful Villages of France. Villas with 360° Gulf views and vineyard estates, by Ellington.",
    image: "/locations/gassin.jpg",
    coordinates: { lat: 43.235, lng: 6.586 },
  },
  {
    slug: "sainte-maxime",
    name: "Sainte-Maxime",
    tagline: "Une vie de famille raffinée sur la rive nord", // TODO client review,
    taglineEn: "Refined family living on the northern shore",
    taglineNl: "Verfijnd gezinsleven aan de noordkust", // TODO client review
    description:
      "Face à Saint-Tropez sur le Golfe, Sainte-Maxime allie élégance balnéaire et authenticité provençale. Plages de sable fin, villas contemporaines et propriétés historiques en font une destination privilégiée.",
    descriptionEn:
      "Facing Saint-Tropez across the Gulf, Sainte-Maxime combines seaside elegance with Provençal authenticity. Fine sandy beaches, contemporary villas and historic properties make it a privileged destination.",
    longDescription:
      "Sainte-Maxime conjugue 11 km de plages plein sud avec un arrière-pays vallonné où s'épanouissent les domaines de prestige. La ville offre tous les services d'une station moderne — port, golf, casino, marché provençal — tout en préservant un urbanisme à taille humaine. Sa position face à Saint-Tropez, accessible en 10 minutes par bateau-navette ou 20 minutes par la corniche, en fait une alternative privilégiée pour ceux qui cherchent l'art de vivre du Golfe avec un meilleur rapport surface/budget.",
    longDescriptionEn:
      "Sainte-Maxime combines 11 km of south-facing beaches with a hillside hinterland where prestigious estates flourish. The town offers every service of a modern resort — port, golf, casino, Provençal market — while preserving a human-scale urban fabric. Its position facing Saint-Tropez, reached in 10 minutes by shuttle boat or 20 minutes along the corniche, makes it a privileged alternative for those seeking Gulf living with a better space/budget ratio.",
    highlights: [
      "11 km de plages plein sud",
      "Port, golf et casino",
      "Domaines en arrière-pays",
      "10 min de Saint-Tropez par bateau",
    ],
    highlightsEn: [
      "11 km of south-facing beaches",
      "Port, golf and casino",
      "Hinterland estates",
      "10 min to Saint-Tropez by boat",
    ],
    keyFacts: [
      { label: "Plages", labelEn: "Beaches", value: "11 km" },
      { label: "Population", labelEn: "Population", value: "≈ 14 000 hab." },
      { label: "Saint-Tropez", labelEn: "Saint-Tropez", value: "10 min (bateau)" },
      { label: "Aéroport", labelEn: "Airport", value: "Nice — 1h" },
    ],
    metaDescription:
      "Immobilier de prestige à Sainte-Maxime. Villas vue mer, propriétés en arrière-pays et appartements front de mer, par Ellington.",
    metaDescriptionEn:
      "Luxury real estate in Sainte-Maxime. Sea-view villas, hinterland properties and beachfront apartments, by Ellington.",
    image: "/locations/sainte-maxime/stemaxime.jpg",
    coordinates: { lat: 43.3094, lng: 6.6386 },
  },
  {
    slug: "la-croix-valmer",
    name: "La Croix-Valmer",
    tagline: "Retraite côtière sereine aux plages préservées",
    taglineEn: "Serene coastal retreat with pristine beaches",
    taglineNl: "Rustige kustplek met ongerepte stranden", // TODO client review
    description:
      "Entre Saint-Tropez et le Lavandou, La Croix-Valmer déroule des plages de sable fin protégées, des vignobles AOP Côtes-de-Provence et un arrière-pays sauvage. Une adresse confidentielle pour qui cherche la quiétude méditerranéenne loin de l'effervescence du Golfe.",
    descriptionEn:
      "Between Saint-Tropez and Le Lavandou, La Croix-Valmer unfolds protected sandy beaches, AOP Côtes-de-Provence vineyards and a wild hinterland — a confidential address for those seeking Mediterranean quiet, away from the Gulf's bustle.",
    longDescription:
      "Aux portes du Cap Lardier et du Cap Taillat — sites classés du Conservatoire du Littoral — La Croix-Valmer est une enclave préservée du Var. Ses plages de Gigaro, du Débarquement et du Sylvabelle offrent un littoral encore sauvage, prisé par une clientèle internationale en quête d'authenticité. Le marché immobilier mêle villas contemporaines vue mer, mas viticoles et propriétés en bord de mer, avec un excellent rapport qualité/prix par rapport aux adresses voisines du Golfe.",
    longDescriptionEn:
      "At the gates of Cap Lardier and Cap Taillat — protected coastal sites — La Croix-Valmer is a preserved enclave of the Var. Its beaches at Gigaro, Le Débarquement and Sylvabelle offer a wild shoreline coveted by an international clientele seeking authenticity. The property market combines contemporary sea-view villas, wine estates and waterfront homes, with excellent value compared with neighbouring Gulf addresses.",
    highlights: [
      "Plages préservées (Gigaro, Sylvabelle)",
      "Cap Lardier et Cap Taillat protégés",
      "Vignobles AOP Côtes-de-Provence",
      "À 25 min de Saint-Tropez",
    ],
    highlightsEn: [
      "Preserved beaches (Gigaro, Sylvabelle)",
      "Protected Cap Lardier and Cap Taillat",
      "AOP Côtes-de-Provence vineyards",
      "25 min from Saint-Tropez",
    ],
    keyFacts: [
      { label: "Population", labelEn: "Population", value: "≈ 3 500 hab." },
      { label: "Plages", labelEn: "Beaches", value: "5 km" },
      { label: "Saint-Tropez", labelEn: "Saint-Tropez", value: "25 min" },
      { label: "Aéroport", labelEn: "Airport", value: "Nice — 1h30" },
    ],
    metaDescription:
      "Immobilier de prestige à La Croix-Valmer. Villas vue mer, mas viticoles et propriétés entre plages préservées et vignobles, par Ellington.",
    metaDescriptionEn:
      "Luxury real estate in La Croix-Valmer. Sea-view villas, wine estates and properties between preserved beaches and vineyards, by Ellington.",
    image: "/locations/croix-valmer.jpg",
    coordinates: { lat: 43.2069, lng: 6.5697 },
  },
  {
    slug: "cavalaire-sur-mer",
    name: "Cavalaire-sur-Mer",
    tagline: "La douceur d'une baie au charme français authentique",
    taglineEn: "Gentle bay living with authentic French charm",
    taglineNl: "Wonen aan een zachte baai met authentieke Franse charme", // TODO client review
    description:
      "Adossée à l'une des plus belles baies de la Côte d'Azur, Cavalaire-sur-Mer conjugue 3 km de plage de sable fin, marina active et villas perchées sur les hauteurs. Une destination familiale et raffinée, à mi-chemin entre Saint-Tropez et Le Lavandou.",
    descriptionEn:
      "Nestled in one of the French Riviera's most beautiful bays, Cavalaire-sur-Mer combines 3 km of fine sandy beach, a busy marina and hillside villas. A refined family destination halfway between Saint-Tropez and Le Lavandou.",
    longDescription:
      "Avec sa baie orientée plein sud et ses 3 km de plage, Cavalaire offre un cadre balnéaire authentique à l'écart des projecteurs. Sa marina de 1 200 anneaux et ses spots de plongée renommés (épaves du Rubis, du Togo) attirent une clientèle de plaisanciers. Les villas vue mer sur les hauteurs et les propriétés en bord de plage se négocient à des prix sensiblement inférieurs à Saint-Tropez, pour un cadre de vie tout aussi privilégié.",
    longDescriptionEn:
      "With its south-facing bay and 3 km of beach, Cavalaire offers an authentic seaside setting away from the spotlight. Its 1,200-berth marina and renowned dive sites (Rubis and Togo wrecks) attract a sailing clientele. Hillside sea-view villas and waterfront properties sell at noticeably lower prices than Saint-Tropez, for a setting just as privileged.",
    highlights: [
      "Baie plein sud, plage de 3 km",
      "Marina de 1 200 anneaux",
      "Spots de plongée renommés",
      "À 35 min de Saint-Tropez",
    ],
    highlightsEn: [
      "South-facing bay, 3 km beach",
      "1,200-berth marina",
      "Renowned dive sites",
      "35 min from Saint-Tropez",
    ],
    keyFacts: [
      { label: "Population", labelEn: "Population", value: "≈ 7 500 hab." },
      { label: "Plage", labelEn: "Beach", value: "3 km" },
      { label: "Marina", labelEn: "Marina", value: "1 200 anneaux" },
      { label: "Aéroport", labelEn: "Airport", value: "Nice — 1h45" },
    ],
    metaDescription:
      "Immobilier de prestige à Cavalaire-sur-Mer. Villas vue mer, propriétés sur la baie et appartements front de mer, par Ellington.",
    metaDescriptionEn:
      "Luxury real estate in Cavalaire-sur-Mer. Sea-view villas, bayfront properties and beachside apartments, by Ellington.",
    image: "/locations/cavalaire.jpg",
    coordinates: { lat: 43.1714, lng: 6.5294 },
  },
  {
    slug: "rayol-canadel",
    name: "Rayol-Canadel-sur-Mer",
    tagline: "L'enclave exclusive de la corniche des Maures",
    taglineEn: "Exclusive enclave on the Corniche des Maures",
    taglineNl: "Exclusieve enclave aan de Corniche des Maures", // TODO client review
    description:
      "Sur la mythique corniche des Maures, Rayol-Canadel-sur-Mer est l'une des adresses les plus confidentielles du littoral varois. Pinèdes plongeant dans la mer, propriétés d'architecte et calanques discrètes : une parenthèse rare entre Saint-Tropez et Hyères.",
    descriptionEn:
      "On the legendary Maures corniche, Rayol-Canadel-sur-Mer is one of the most confidential addresses on the Var coastline. Pinewoods plunging into the sea, architect-designed properties and hidden coves — a rare parenthesis between Saint-Tropez and Hyères.",
    longDescription:
      "Niché entre mer et collines boisées, Rayol-Canadel doit sa renommée à son célèbre Domaine du Rayol, jardin méditerranéen unique en Europe, et à son urbanisme discret de villas individuelles cachées dans la pinède. Avec moins de 1 000 habitants, c'est l'une des communes les plus paisibles de la côte. Les propriétés y sont rares et le marché — exclusivement haut de gamme — reste tenu par le bouche-à-oreille d'une clientèle fidèle, souvent de génération en génération.",
    longDescriptionEn:
      "Tucked between the sea and wooded hills, Rayol-Canadel owes its renown to the famous Domaine du Rayol — a unique Mediterranean garden — and to its discreet urbanism of individual villas hidden in the pinewood. With fewer than 1,000 residents, it is one of the quietest towns on the coast. Properties are rare and the market — exclusively top-tier — is largely driven by word of mouth among a faithful clientele, often handed down through generations.",
    highlights: [
      "Domaine du Rayol, jardin méditerranéen",
      "Pinèdes en bord de mer",
      "Calanques préservées",
      "Adresse confidentielle (≈ 1 000 hab.)",
    ],
    highlightsEn: [
      "Domaine du Rayol Mediterranean garden",
      "Seafront pinewoods",
      "Preserved coves",
      "Confidential address (≈ 1,000 residents)",
    ],
    keyFacts: [
      { label: "Population", labelEn: "Population", value: "≈ 950 hab." },
      { label: "Saint-Tropez", labelEn: "Saint-Tropez", value: "40 min" },
      { label: "Toulon-Hyères", labelEn: "Toulon-Hyères", value: "45 min" },
      { label: "Saison", labelEn: "Season", value: "Toute l'année" },
    ],
    metaDescription:
      "Immobilier de prestige à Rayol-Canadel-sur-Mer. Villas en pinède, propriétés bord de mer sur la corniche des Maures, par Ellington.",
    metaDescriptionEn:
      "Luxury real estate in Rayol-Canadel-sur-Mer. Pinewood villas and seafront properties on the Maures corniche, by Ellington.",
    image: "/locations/rayol.jpg",
    coordinates: { lat: 43.1622, lng: 6.4825 },
  },
];

// --- Data layer ---------------------------------------------------------
// All getters are async. They first try Apimo (when env vars are set) and
// transparently fall back to the mock dataset so the app keeps working in
// local dev without credentials.

interface PropertyFilters {
  category?: "sale" | "rent";
  city?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}

function applyFilters(list: Property[], filters?: PropertyFilters): Property[] {
  return list.filter((p) => {
    if (filters?.category && p.category !== filters.category) return false;
    if (filters?.city && p.city !== filters.city) return false;
    if (filters?.type && p.type !== filters.type) return false;
    if (filters?.minPrice && p.price < filters.minPrice) return false;
    if (filters?.maxPrice && p.price > filters.maxPrice) return false;
    return true;
  });
}

/**
 * Returns the full property catalogue. Apimo (live) when configured,
 * mock dataset otherwise. Filters apply in-memory in both cases.
 */
export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  if (isApimoConfigured()) {
    const live = await fetchApimoProperties(filters?.category ?? "sale");
    if (live && live.length > 0) return applyFilters(live, filters);
  }
  return applyFilters(mockProperties, filters);
}

export async function getProperty(id: string): Promise<Property | undefined> {
  if (isApimoConfigured()) {
    const live = await fetchApimoProperty(id);
    if (live) return live;
  }
  return mockProperties.find((p) => p.id === id);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  if (isApimoConfigured()) {
    const live = await fetchApimoProperties("sale");
    if (live && live.length > 0) {
      // Apimo has no native "featured" flag — pick the priciest 6 as a sane default.
      // Override later via a custom Apimo tag once the client confirms the convention.
      return [...live].sort((a, b) => b.price - a.price).slice(0, 6);
    }
  }
  return mockProperties.filter((p) => p.isFeatured);
}

export async function getCities(): Promise<string[]> {
  const list = await getProperties();
  return [...new Set(list.map((p) => p.city))].filter(Boolean).sort();
}

export function formatPrice(price: number, currency = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `€${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (price >= 1_000) return `€${Math.round(price / 1_000)}K`;
  return `€${price}`;
}

export function propertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    villa: "Villa",
    penthouse: "Penthouse",
    apartment: "Appartement",
    estate: "Domaine",
    chalet: "Chalet",
    townhouse: "Maison de ville",
    land: "Terrain",
  };
  return labels[type] ?? type;
}

/** Village tagline in the page language (NL falls back to EN, then FR). */
export function villageTagline(loc: Location, lang: "fr" | "en" | "nl"): string | undefined {
  if (lang === "en") return loc.taglineEn ?? loc.tagline;
  if (lang === "nl") return loc.taglineNl ?? loc.taglineEn ?? loc.tagline;
  return loc.tagline;
}
