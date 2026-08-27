# NET//HISTORY

An interactive digital museum: 30+ years of the web in one scroll.

The website itself is the exhibit. Visitors move from a CRT boot sequence through early documents, the wild web, social feeds, the mobile shift, platform infinite scroll, design-system sameness, generative interfaces, and a quiet ending.

## Stack

Next.js (App Router), React, TypeScript, Tailwind CSS, GSAP + ScrollTrigger. Deployed as a mostly static client experience on Vercel. No database and no Three.js in v1.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Source of truth

Product, motion, and architecture live in `MASTER.md`. Do not flatten era-specific ugliness into a single modern UI.

Optional: set `NEXT_PUBLIC_SITE_URL` (including protocol) so Open Graph URLs resolve to the public domain.

## Deploy

Production build: `pnpm build`.

This repo is Vercel-ready (static `/`, no server, no secrets). The CLI is not logged in on this machine. After `vercel login`:

```bash
npx vercel
```
