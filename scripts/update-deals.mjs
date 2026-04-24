#!/usr/bin/env node
// scripts/update-deals.mjs
//
// Walks every item in content/deals.json, fetches the product page (when the
// `url` looks like a real product page, not a search/home page), and tries to
// extract a current price. If the fetched price is *lower* than the stored
// salePrice, we update the file. Items we can't price are left untouched.
//
// Usage:
//   node scripts/update-deals.mjs            # update + write
//   node scripts/update-deals.mjs --dry-run  # report only

import fs from "node:fs/promises";
import path from "node:path";

const DEALS_PATH = path.join(process.cwd(), "content/deals.json");
const UA =
  "Mozilla/5.0 (compatible; CapeAnglerBot/1.0; +https://mikaels-fishing-app.vercel.app)";
const TIMEOUT_MS = 15_000;
const isDry = process.argv.includes("--dry-run");

// URLs that are clearly NOT individual product pages — skip without fetching.
const NON_PRODUCT_URL = [
  /takealot\.com\/all\?qsearch/i,
  /sportsmanswarehouse\.co\.za\/?$/i,
  /africanoutdoor\.co\.za\/?$/i,
  /capeunionmart\.co\.za\/?$/i
];

function isProductUrl(url) {
  if (!url) return false;
  return !NON_PRODUCT_URL.some((re) => re.test(url));
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

async function fetchHtml(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,*/*" },
      redirect: "follow",
      signal: ctrl.signal
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function priceFromJsonLd(html) {
  const matches = [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    )
  ];
  for (const m of matches) {
    const raw = m[1].trim();
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      continue;
    }
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    for (const node of nodes) {
      const price = walkForPrice(node);
      if (price != null) return price;
    }
  }
  return null;
}

function walkForPrice(node) {
  if (!node || typeof node !== "object") return null;
  if (node.offers) {
    const offers = Array.isArray(node.offers) ? node.offers : [node.offers];
    for (const o of offers) {
      const candidate = o?.price ?? o?.lowPrice ?? o?.priceSpecification?.price;
      const n = Number(candidate);
      if (!Number.isNaN(n) && n > 0) return n;
    }
  }
  // Recurse into common nested keys
  for (const key of ["@graph", "mainEntity", "hasVariant"]) {
    if (node[key]) {
      const child = Array.isArray(node[key]) ? node[key] : [node[key]];
      for (const c of child) {
        const p = walkForPrice(c);
        if (p != null) return p;
      }
    }
  }
  return null;
}

function priceFromMeta(html) {
  const patterns = [
    /<meta\s+property=["']product:price:amount["']\s+content=["']([\d.]+)["']/i,
    /<meta\s+property=["']og:price:amount["']\s+content=["']([\d.]+)["']/i,
    /<meta\s+itemprop=["']price["']\s+content=["']([\d.]+)["']/i
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) {
      const n = Number(m[1]);
      if (!Number.isNaN(n) && n > 0) return n;
    }
  }
  return null;
}

async function fetchPrice(url) {
  const html = await fetchHtml(url);
  if (!html) return null;
  return priceFromJsonLd(html) ?? priceFromMeta(html);
}

async function main() {
  const data = JSON.parse(await fs.readFile(DEALS_PATH, "utf8"));
  let checked = 0;
  let skipped = 0;
  let drops = 0;
  let touched = 0;

  for (const cat of data.categories) {
    for (const item of cat.items) {
      if (!isProductUrl(item.url)) {
        skipped++;
        continue;
      }
      checked++;
      const newPrice = await fetchPrice(item.url);
      if (newPrice == null) {
        console.log(`?  ${item.id}: could not parse price`);
        continue;
      }
      const rounded = Math.round(newPrice);
      if (rounded < item.salePrice) {
        const before = item.salePrice;
        item.salePrice = rounded;
        item.priceCheckedAt = todayISO();
        drops++;
        touched++;
        console.log(`↓  ${item.id}: R${before} → R${rounded}`);
      } else {
        item.priceCheckedAt = todayISO();
        touched++;
        console.log(`=  ${item.id}: R${rounded} (no change)`);
      }
    }
  }

  if (drops > 0) {
    data.lastUpdated = todayISO();
  }

  console.log(
    `\nDone. Checked ${checked}, skipped ${skipped} (non-product URLs), price drops: ${drops}.`
  );

  if (touched > 0 && !isDry) {
    await fs.writeFile(DEALS_PATH, JSON.stringify(data, null, 2) + "\n");
    console.log(drops > 0 ? "deals.json updated with new prices." : "deals.json updated with check timestamps.");
  } else if (isDry) {
    console.log("Dry run — no file written.");
  } else {
    console.log("No changes to write.");
  }

  // Exit code: 0 always (the workflow only commits if the file actually changed).
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
