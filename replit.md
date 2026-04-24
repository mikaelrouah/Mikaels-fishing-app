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
