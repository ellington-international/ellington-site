#!/usr/bin/env node
// Checks the redirects from the old site's URLs to the new structure
// (src/proxy.ts, REDESIGN-PLAN.md §5). Run it against a running site:
//
//   node scripts/check-redirects.mjs                       # http://localhost:3000
//   node scripts/check-redirects.mjs https://preview-url.vercel.app
//   node scripts/check-redirects.mjs https://www.ellingtoninternational.com
//
// For every old URL it checks the first answer (status + target) and that the
// target page loads (200, or 404 where a 404 is expected), in one hop.
// The old URLs are the live sitemap before the redesign (November 2026) plus
// pages that were not in it. The language old URLs go to is read from
// LEGACY_LANG in src/lib/locale.ts, so this list follows that setting.
// Exit code 1 if anything fails; listings that have been sold since are only
// reported as warnings (their old URL then correctly ends on a 404).
import { readFileSync } from "node:fs";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const locale = readFileSync(new URL("../src/lib/locale.ts", import.meta.url), "utf8");
const L = locale.match(/LEGACY_LANG: Lang = "(\w+)"/)?.[1] ?? "fr";
const D = locale.match(/DEFAULT_LANG: Lang = "(\w+)"/)?.[1] ?? "en";

const PAGES = ["/properties", "/locations", "/sell", "/about", "/contact", "/blog", "/legal", "/privacy", "/login", "/signup", "/mes-favoris"];
const VILLAGES = ["saint-tropez", "grimaud", "port-grimaud", "ramatuelle", "gassin", "sainte-maxime", "la-croix-valmer", "cavalaire-sur-mer", "rayol-canadel"];
const ARTICLES = ["acheter-villa-saint-tropez-guide-2026", "acheter-gassin-ou-ramatuelle-guide-comparatif", "prix-m2-golfe-saint-tropez-comparatif"];
// Property IDs in the old live sitemap (they come from Apimo, unchanged)
const PROPERTIES = ["85647966", "85101134", "85595120", "85949500", "86218976", "85956402", "84319656", "86841775", "86939112", "87030881", "85614516", "84198133", "87073886", "87084068", "87172274", "87172330", "86141235", "84552731", "87433818", "87505308", "87508580", "87525314", "87543606"];

// [old URL, expected status, expected target, expected final status, kind]
const blog = (s) => `/fr/blog/${s}`; // articles are French-only, whatever LEGACY_LANG is
const cases = [
  ["/", 301, `/${D}`, 200],
  ...PAGES.map((p) => [p, 301, `/${L}${p}`, p === "/mes-favoris" ? 307 : 200]), // favourites → login when logged out
  ...VILLAGES.map((v) => [`/locations/${v}`, 301, `/${L}/locations/${v}`, 200]),
  ...ARTICLES.map((a) => [`/blog/${a}`, 301, blog(a), 200]),
  ...ARTICLES.slice(0, 1).flatMap((a) => [[`/en/blog/${a}`, 301, blog(a), 200], [`/nl/blog/${a}`, 301, blog(a), 200]]),
  ...PROPERTIES.map((id) => [`/properties/${id}`, 301, `/${L}/properties/${id}`, 200, "property"]),
  // Rentals: switched off for now → temporary redirect to the Buy page
  ["/rentals", 307, `/${L}/properties`, 200],
  ["/en/rentals", 307, "/en/properties", 200],
  ["/fr/rentals", 307, "/fr/properties", 200],
  ["/nl/rentals", 307, "/nl/properties", 200],
  // Query strings are kept (same filter names as before)
  ["/properties?city=Grimaud&type=villa", 301, `/${L}/properties?city=Grimaud&type=villa`, 200],
  ["/blog?category=marche", 301, `/${L}/blog?category=marche`, 200],
  // Trailing slash: one hop
  ["/about/", 301, `/${L}/about`, 200],
  ["/properties/85647966/", 301, `/${L}/properties/85647966`, 200, "property"],
  ["/en/about/", 301, "/en/about", 200],
  // Not found: a real 404 at the end
  ["/properties/12345678", 301, `/${L}/properties/12345678`, 404],
  ["/en/properties/12345678", 404, null, null],
  ["/some-old-page", 301, `/${L}/some-old-page`, 404],
  // Never redirected
  ["/robots.txt", 200, null, null],
  ["/sitemap.xml", 200, null, null],
  ["/en", 200, null, null],
];

const strip = (loc) => (loc ? loc.replace(/^https?:\/\/[^/]+/, "") : null);
const get = (path) => fetch(base + path, { redirect: "manual", headers: { "user-agent": "ellington-redirect-check" } });

let fails = 0;
let warns = 0;
for (const [from, status, to, finalStatus, kind] of cases) {
  const res = await get(from);
  const loc = strip(res.headers.get("location"));
  const problems = [];
  if (res.status !== status) problems.push(`status ${res.status}, expected ${status}`);
  if (to !== null && loc !== to) problems.push(`goes to ${loc ?? "(nothing)"}, expected ${to}`);
  let final = "";
  if (loc && finalStatus !== null) {
    const next = await get(loc);
    final = ` → ${next.status}`;
    if (next.status !== finalStatus) {
      if (kind === "property" && next.status === 404) {
        warns++;
        console.log(`warn ${from} → ${loc} → 404 (listing no longer online)`);
        continue;
      }
      problems.push(`target answers ${next.status}, expected ${finalStatus}`);
    }
  }
  if (problems.length) {
    fails++;
    console.log(`FAIL ${from}: ${problems.join("; ")}`);
  } else {
    console.log(`ok   ${String(res.status).padEnd(3)} ${from.padEnd(52)} ${loc ?? ""}${final}`);
  }
}
console.log(`\n${cases.length} URLs checked against ${base} (old URLs → /${L}/…): ${fails} failed, ${warns} warnings`);
process.exit(fails ? 1 : 0);
