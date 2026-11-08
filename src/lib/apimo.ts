// Apimo REST API adapter — server-only.
//
// Docs: https://apimo.pro/api
// Auth : Basic auth provider:token (base64)
//
// Required env vars (set in .env.local for dev, Vercel dashboard for prod) :
//   APIMO_PROVIDER   — Apimo provider username
//   APIMO_TOKEN      — Apimo API token
//   APIMO_AGENCY     — Numeric agency id from Apimo back-office
//
// Behaviour : if any env var is missing, the helpers below return null and the
// data layer falls back to the mock properties. This lets the app boot in dev
// without credentials and switch to live data the moment env vars are set on
// Vercel.

import type {
  Property,
  PropertyCategory,
  PropertyType,
  PropertyStatus,
} from "./types";

const APIMO_BASE = "https://api.apimo.pro";

interface ApimoConfig {
  provider: string;
  token: string;
  agency: string;
}

function getConfig(): ApimoConfig | null {
  const provider = process.env.APIMO_PROVIDER;
  const token = process.env.APIMO_TOKEN;
  const agency = process.env.APIMO_AGENCY;
  if (!provider || !token || !agency) return null;
  return { provider, token, agency };
}

export function isApimoConfigured(): boolean {
  return getConfig() !== null;
}

async function apimoFetch<T>(path: string): Promise<T | null> {
  const cfg = getConfig();
  if (!cfg) return null;

  const auth = Buffer.from(`${cfg.provider}:${cfg.token}`).toString("base64");
  try {
    const res = await fetch(`${APIMO_BASE}${path}`, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
      // ISR — re-fetch from Apimo every 10 min
      next: { revalidate: 600 },
    });
    if (!res.ok) {
      console.error(`[apimo] ${res.status} on ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.error("[apimo] fetch error", e);
    return null;
  }
}

// --- Apimo response types (only the fields we use; everything else is loose) ---

interface ApimoListResponse {
  total_items?: number;
  processed_items?: number;
  timestamp?: string;
  properties?: ApimoProperty[];
}

interface ApimoMultilingual {
  language?: string;
  title?: string;
  comment?: string;
  comment_full?: string;
}

interface ApimoPicture {
  id?: number;
  rank?: number;
  url?: string;
  width_max?: string;
  comments?: ApimoMultilingual[];
}

interface ApimoCity {
  id?: number;
  name?: string;
  country?: string;
  zipcode?: string;
  latitude?: number;
  longitude?: number;
  district?: { name?: string };
}

interface ApimoArea {
  unit?: number;
  value?: number;
  total?: number;
  weighted?: number;
}

interface ApimoPrice {
  value?: number;
  currency?: string;
  hide?: boolean;
  period?: number;
}

interface ApimoNamed {
  id?: number;
  name?: string;
}

interface ApimoArea2 {
  type?: number;
  number?: number;
  /** Surface in m² for this zone — e.g. type 51 (plot/land) carries the land area. */
  area?: number | null;
}

interface ApimoProperty {
  id?: number;
  reference?: string;
  category?: ApimoNamed;
  type?: ApimoNamed | number;
  subtype?: ApimoNamed | number;
  step?: ApimoNamed | number;
  city?: ApimoCity;
  area?: ApimoArea;
  // Apimo's `areas` array — list of room/zone counts by numeric type code.
  // No top-level bathrooms/shower_rooms field exists for this agency, so we
  // derive bathroom counts from this array.
  areas?: ApimoArea2[];
  surface?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  shower_rooms?: number;
  water_rooms?: number;
  toilets?: number;
  price?: ApimoPrice;
  comments?: ApimoMultilingual[];
  pictures?: ApimoPicture[];
  /** Apimo returns service amenities as numeric catalog IDs (see property_service catalog). */
  services?: number[];
  year_built?: number;
  year?: number;
  latitude?: number;
  longitude?: number;
  status?: ApimoNamed | number;
  // Apimo sometimes nests location info differently
  district?: ApimoNamed;
  region?: ApimoNamed;
  // DPE — energy performance diagnostic. Apimo's `dpe` block carries
  // numeric class codes (1 = A, 2 = B, ..., 7 = G) plus consumption / GHG
  // figures used for the cost estimate.
  dpe?: {
    consumption?: number;
    emission?: number;
    reference?: string;
    date?: string;
    type?: number;
    /** Letter class (some agencies return the letter directly). */
    letter?: string;
    /** Numeric DPE class code (1–7 maps to A–G). */
    consumption_class?: number;
    emission_class?: number;
    minimum_energy_cost?: number;
    maximum_energy_cost?: number;
  };
  // Regulations (energy diagnostics etc.): `type` refers to Apimo's
  // property_regulation catalog, `value` is a number or a letter as text.
  regulations?: { type?: number; value?: string | number; date?: string }[];
}

function mapDpeClass(
  numeric?: number,
  letter?: string,
): "A" | "B" | "C" | "D" | "E" | "F" | "G" | undefined {
  const valid = ["A", "B", "C", "D", "E", "F", "G"] as const;
  if (letter) {
    const upper = letter.toUpperCase() as (typeof valid)[number];
    if (valid.includes(upper)) return upper;
  }
  if (numeric && numeric >= 1 && numeric <= 7) {
    return valid[numeric - 1];
  }
  return undefined;
}

// --- Energy data from `regulations` (REDESIGN-PLAN.md §4) ---
// The regulation type ids aren't documented per agency, so each entry is
// classified by its catalog name (FR or EN), e.g. "DPE - consommation
// énergétique", "Classe GES", "Coût annuel d'énergie minimum".
type RegulationKind =
  | "energyValue"
  | "energyClass"
  | "ghgValue"
  | "ghgClass"
  | "costMin"
  | "costMax"
  | "costYear"
  | "date";

function classifyRegulation(name: string): RegulationKind | undefined {
  const n = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Short tokens must start a word ("ges" must not match "charges").
  const has = (...words: string[]) =>
    words.some((w) => (w.length <= 4 ? new RegExp(`(^|[^a-z])${w}`).test(n) : n.includes(w)));
  const isClass = has("classe", "class", "lettre", "letter", "etiquette", "label");
  if (has("cout", "cost", "depense", "expense")) {
    if (has("annee", "year", "reference", "indice")) return "costYear";
    if (has("min", "bas", "low")) return "costMin";
    if (has("max", "haut", "high")) return "costMax";
    return undefined;
  }
  if (has("date") && has("dpe", "diagnostic", "energ")) return "date";
  if (has("ges", "gaz", "emission", "co2", "climat", "greenhouse")) return isClass ? "ghgClass" : "ghgValue";
  if (has("dpe", "energ", "consommation", "consumption")) return isClass ? "energyClass" : "energyValue";
  return undefined;
}

function toNumber(v: unknown): number | undefined {
  if (typeof v === "number") return Number.isFinite(v) ? v : undefined;
  if (typeof v !== "string") return undefined;
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

type EnergyFields = Pick<
  Property,
  "energyClass" | "ghgClass" | "energyValue" | "ghgValue" | "energyCostMin" | "energyCostMax" | "energyCostYear" | "energyDiagnosticDate"
>;

const unmatchedRegulations = new Set<string>();

function mapRegulations(
  regs: ApimoProperty["regulations"],
  catalog?: Map<number, string>,
): EnergyFields {
  const out: EnergyFields = {};
  for (const r of regs ?? []) {
    const name = r.type != null ? catalog?.get(r.type) : undefined;
    const kind = name ? classifyRegulation(name) : undefined;
    if (!kind) {
      // Dev aid: list regulation names we don't use yet, once each.
      if (process.env.NODE_ENV === "development" && name && !unmatchedRegulations.has(name)) {
        unmatchedRegulations.add(name);
        console.info(`[apimo] regulation not used: #${r.type} "${name}" = ${r.value}`);
      }
      continue;
    }
    const num = toNumber(r.value);
    const letter = typeof r.value === "string" ? mapDpeClass(undefined, r.value.trim()) : undefined;
    switch (kind) {
      case "energyClass":
        out.energyClass = letter ?? mapDpeClass(num);
        break;
      case "ghgClass":
        out.ghgClass = letter ?? mapDpeClass(num);
        break;
      case "energyValue":
        if (letter) out.energyClass = letter;
        else out.energyValue = num;
        break;
      case "ghgValue":
        if (letter) out.ghgClass = letter;
        else out.ghgValue = num;
        break;
      case "costMin":
        out.energyCostMin = num;
        break;
      case "costMax":
        out.energyCostMax = num;
        break;
      case "costYear":
        out.energyCostYear = num;
        break;
      case "date":
        out.energyDiagnosticDate = typeof r.value === "string" ? r.value : r.date;
        break;
    }
    if (r.date && !out.energyDiagnosticDate) out.energyDiagnosticDate = r.date;
  }
  return out;
}

// --- Mapping helpers ---

// Apimo type ids → our PropertyType
const APIMO_TYPE_MAP: Record<number, PropertyType> = {
  1: "apartment",
  2: "villa", // "house" in Apimo, mapped to villa for the luxury vocabulary
  3: "townhouse",
  4: "land",
  5: "estate",
  6: "chalet",
  7: "penthouse",
};

function mapType(t: ApimoNamed | number | undefined): PropertyType {
  if (t == null) return "villa";
  if (typeof t === "number") return APIMO_TYPE_MAP[t] ?? "villa";
  if (typeof t === "object") {
    if (typeof t.id === "number") return APIMO_TYPE_MAP[t.id] ?? "villa";
    const name = (t.name ?? "").toLowerCase();
    if (name.includes("penthouse")) return "penthouse";
    if (name.includes("chalet")) return "chalet";
    if (name.includes("land") || name.includes("terrain")) return "land";
    if (name.includes("apart")) return "apartment";
    if (name.includes("estate") || name.includes("domaine")) return "estate";
    if (name.includes("townhouse") || name.includes("maison de ville"))
      return "townhouse";
  }
  return "villa";
}

function mapCategory(
  c: ApimoNamed | undefined,
  price?: ApimoPrice,
): PropertyCategory {
  // Strongest signal first: a positive `price.period` means a recurring price,
  // which is exclusive to rentals (Apimo never sets it on sale listings).
  // Some agencies — including this one — let rentals leak into the
  // ?category=1 (sale) feed, so we cannot trust the `category` field alone.
  if (price?.period && price.period > 0) return "rent";
  if (!c) return "sale";
  if (typeof c.id === "number") return c.id === 2 ? "rent" : "sale";
  const name = (c.name ?? "").toLowerCase();
  return name.includes("rent") || name.includes("location") ? "rent" : "sale";
}

// Apimo `price.period` codes — number of days the price covers.
// 7 = week, 30 = month. Anything else → undefined (we omit the suffix).
function mapPricePeriod(period?: number): "week" | "month" | undefined {
  if (!period) return undefined;
  if (period <= 7) return "week";
  return "month";
}

function mapStatus(s: ApimoNamed | number | undefined): PropertyStatus {
  if (s == null) return "available";
  if (typeof s === "number") {
    return s === 3 ? "sold" : s === 2 ? "under_offer" : "available";
  }
  const name = (s.name ?? "").toLowerCase();
  if (name.includes("sold") || name.includes("vendu")) return "sold";
  if (name.includes("offer") || name.includes("offre") || name.includes("compromis"))
    return "under_offer";
  return "available";
}

function pickComment(
  comments: ApimoMultilingual[] | undefined,
  lang: "fr" | "en",
): { title?: string; description: string } {
  if (!comments || comments.length === 0) return { description: "" };
  // 1. exact language match, 2. french fallback, 3. first available
  const exact = comments.find((c) => c.language?.toLowerCase() === lang);
  const fr = comments.find((c) => c.language?.toLowerCase() === "fr");
  const chosen = exact ?? fr ?? comments[0];
  return {
    title: chosen.title?.trim(),
    description:
      chosen.comment_full?.trim() ||
      chosen.comment?.trim() ||
      "",
  };
}

// Apimo area type codes that correspond to bath / shower / water rooms.
// Codes 5/6/7/8 are the classic mapping (salle de bain / salle d'eau / WC /
// salle d'eau ensuite). Code 42 also recurs for shower rooms in some agencies.
// We sum them; if a property uses a different agency-specific code we'll
// observe a 0 and the UI will hide the bathroom row.
const BATHROOM_AREA_TYPES = new Set([5, 6, 7, 8, 42]);

function countBathrooms(p: ApimoProperty): number {
  // 1. Top-level fields (some Apimo agencies expose them)
  const direct = (p.bathrooms ?? 0) + (p.shower_rooms ?? 0) + (p.water_rooms ?? 0);
  if (direct > 0) return direct;
  // 2. Aggregate counts from the areas[] table
  let viaAreas = 0;
  for (const a of p.areas ?? []) {
    if (a.type != null && BATHROOM_AREA_TYPES.has(a.type)) {
      viaAreas += a.number ?? 0;
    }
  }
  return viaAreas;
}

function pickPictures(pictures: ApimoPicture[] | undefined): Property["pictures"] {
  if (!pictures || pictures.length === 0) return [];
  return pictures
    .slice()
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
    .filter((p) => !!p.url)
    .map((p) => ({
      url: p.url as string,
      alt: p.comments?.[0]?.comment ?? undefined,
    }));
}

// Apimo `areas[]` zone type for the plot / land surface.
const AREA_TYPE_PLOT = 51;

// Service amenities (Property "features") are returned by Apimo as numeric
// catalog IDs. We resolve them to names via the `property_service` catalog,
// fetched once and cached for the ISR window.
interface ApimoServiceEntry {
  id?: number;
  name?: string;
}
let serviceCatalogCache: Map<number, string> | null = null;

export async function getServiceCatalog(): Promise<Map<number, string>> {
  if (serviceCatalogCache) return serviceCatalogCache;
  const list = await apimoFetch<ApimoServiceEntry[]>(
    "/catalogs/property_service",
  );
  const map = new Map<number, string>();
  for (const c of list ?? []) {
    if (c.id != null && c.name && !map.has(c.id)) map.set(c.id, c.name);
  }
  // Only cache a non-empty result so a transient failure can retry next time.
  if (map.size > 0) serviceCatalogCache = map;
  return map;
}

let regulationCatalogCache: Map<number, string> | null = null;

export async function getRegulationCatalog(): Promise<Map<number, string>> {
  if (regulationCatalogCache) return regulationCatalogCache;
  const list = await apimoFetch<(ApimoServiceEntry & { culture?: string })[]>("/catalogs/property_regulation");
  const map = new Map<number, string>();
  // Prefer the French names (the agency's language); any culture works for matching.
  for (const c of list ?? []) {
    if (c.id == null || !c.name) continue;
    if (!map.has(c.id) || c.culture?.startsWith("fr")) map.set(c.id, c.name);
  }
  if (map.size > 0) regulationCatalogCache = map;
  return map;
}

export function mapApimoToProperty(
  p: ApimoProperty,
  serviceCatalog?: Map<number, string>,
  regulationCatalog?: Map<number, string>,
): Property {
  const id = p.id?.toString() ?? p.reference ?? Math.random().toString(36);
  const reference = p.reference ?? `APIMO-${p.id ?? "?"}`;
  const { description } = pickComment(p.comments, "fr");
  const cityName = p.city?.name ?? "";
  const region = p.region?.name ?? p.city?.district?.name ?? "Côte d'Azur";
  const surface = p.area?.value ?? p.surface ?? 0;
  // Land area: Apimo stores the plot surface in areas[] (type 51 = plot),
  // not in area.total (which is null for this agency).
  const land =
    p.areas?.find((a) => a.type === AREA_TYPE_PLOT)?.area ??
    (p.area?.total && p.area.total > surface ? p.area.total : undefined) ??
    undefined;
  const lat = p.latitude ?? p.city?.latitude;
  const lng = p.longitude ?? p.city?.longitude;
  // Energy: regulations first, then the old dpe block, then nothing
  // (the page shows "Diagnosis in progress").
  const reg = mapRegulations(p.regulations, regulationCatalog);

  return {
    id,
    reference,
    category: mapCategory(p.category, p.price),
    type: mapType(p.type),
    status: mapStatus(p.status),
    title: pickComment(p.comments, "fr").title || cityName || reference,
    subtitle: undefined,
    description,
    city: cityName,
    region,
    district: p.city?.district?.name,
    country: p.city?.country ?? "FR",
    coordinates: lat && lng ? { lat, lng } : undefined,
    price: p.price?.value ?? 0,
    currency: "EUR",
    pricePeriod: mapPricePeriod(p.price?.period),
    energyClass: reg.energyClass ?? mapDpeClass(p.dpe?.consumption_class, p.dpe?.letter),
    ghgClass: reg.ghgClass ?? mapDpeClass(p.dpe?.emission_class),
    energyValue: reg.energyValue ?? p.dpe?.consumption,
    ghgValue: reg.ghgValue ?? p.dpe?.emission,
    energyDiagnosticDate: reg.energyDiagnosticDate ?? p.dpe?.date,
    energyCostMin: reg.energyCostMin ?? p.dpe?.minimum_energy_cost,
    energyCostMax: reg.energyCostMax ?? p.dpe?.maximum_energy_cost,
    energyCostYear: reg.energyCostYear,
    area: surface,
    landArea: land,
    rooms: p.rooms ?? 0,
    bedrooms: p.bedrooms ?? 0,
    // Apimo doesn't expose a top-level bathrooms count for this agency.
    // We try, in order :
    //   1. Top-level bathrooms + shower_rooms (other Apimo configurations)
    //   2. Sum of `areas` entries with type codes for bath/shower/water rooms
    // If still 0, the UI hides the "sdb." line entirely (cleaner than "0 sdb.").
    bathrooms: countBathrooms(p),
    yearBuilt: p.year_built ?? p.year,
    features: (p.services ?? [])
      .map((sid) => serviceCatalog?.get(sid))
      .filter((n): n is string => Boolean(n)),
    pictures: pickPictures(p.pictures),
    isFeatured: false, // Apimo has no "featured" concept — we'll flag client-side or via convention
    isExclusive: false,
  };
}

// --- Public API ---

export async function fetchApimoProperties(
  category: PropertyCategory = "sale",
): Promise<Property[] | null> {
  const cfg = getConfig();
  if (!cfg) return null;
  const data = await apimoFetch<ApimoListResponse>(
    `/agencies/${cfg.agency}/properties?category=${
      category === "rent" ? 2 : 1
    }&limit=100`,
  );
  if (!data?.properties) return null;
  const [catalog, regulationCatalog] = await Promise.all([getServiceCatalog(), getRegulationCatalog()]);
  // Apimo's server-side category filter is unreliable for this agency
  // (rentals show up in the sale feed). Re-filter on our mapped category,
  // which uses `price.period` as the source of truth.
  return data.properties
    .map((p) => mapApimoToProperty(p, catalog, regulationCatalog))
    .filter((p) => p.category === category);
}

export async function fetchApimoProperty(id: string): Promise<Property | null> {
  const cfg = getConfig();
  if (!cfg) return null;
  const data = await apimoFetch<ApimoProperty | { property?: ApimoProperty }>(
    `/agencies/${cfg.agency}/properties/${id}`,
  );
  if (!data) return null;
  // Apimo sometimes wraps the response in { property: ... }, sometimes not
  const p =
    typeof data === "object" && data && "property" in data && data.property
      ? data.property
      : (data as ApimoProperty);
  if (!p?.id && !p?.reference) return null;
  const [catalog, regulationCatalog] = await Promise.all([getServiceCatalog(), getRegulationCatalog()]);
  return mapApimoToProperty(p, catalog, regulationCatalog);
}
