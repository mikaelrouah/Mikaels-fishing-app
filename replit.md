# Cape Angler

## Overview

Single-page reference site for recreational anglers fishing the Cape (knots, spots, reading, rod deals). Pulled from https://github.com/108city/fishing-app.

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Content**: Static JSON in `/content`
- **Node**: 24
- **Package manager**: npm

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve production build

## Replit setup

- Workflow `Start application` runs `npm run dev -- -p 5000 -H 0.0.0.0` and serves the preview on port 5000.
- `next.config.mjs` allows Replit dev origins for the iframe preview.

## Deployment

- GitHub repo: https://github.com/mikaelrouah/Mikaels-fishing-app
- Auto-deploys to https://mikaels-fishing-app.vercel.app on every push to `main` via `.github/workflows/vercel-deploy.yml` (uses `VERCEL_TOKEN` repo secret).

## Auto deal refresh

- `scripts/update-deals.mjs` walks `content/deals.json`, fetches each item's `url`, parses the product price (JSON-LD / Open Graph meta), and updates `salePrice` only when the fetched price is *lower* than the stored one. Items whose `url` is a search/home page (e.g. `takealot.com/all?qsearch=...`) are skipped.
- `.github/workflows/refresh-deals.yml` runs the script daily at 02:00 UTC (also manual via "Run workflow"). If `deals.json` changes, it commits and pushes — which triggers the Vercel deploy workflow automatically.
- To enable refresh for an item, replace its `url` with the actual product page URL on the retailer site.
