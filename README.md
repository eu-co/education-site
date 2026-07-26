# education-site

The EUCO Education Hub — a composer database, programme notes archive, a
"what is a chamber orchestra" explainer, and articles — deployed separately
from the main site at `edu.eu-co.co.uk`, in its own container.

Ported from the education pages of the live CRA site
(`src/pages/education/*.js`), rebuilt in Next.js (App Router) since that's
what the app already existed in before this container split, rather than
Astro like the main site — there was no strong reason to change frameworks
for this piece.

## What's here

- `/` — Education Hub (links to the four sections below)
- `/composers` — a database of ~50 composers with biographies and key
  chamber-orchestra repertoire, in a working accordion
- `/programme-notes` — an archive of notes from past concerts
- `/learn` — a scroll-linked explainer of chamber orchestra instrumentation
- `/articles` — in-depth pieces (currently one, on Ravel's *Le Tombeau de
  Couperin*, with embedded YouTube/Spotify players)

## Filler images

Composer headshots and the instrument illustrations on `/learn` all use
[placehold.co](https://placehold.co) labelled placeholders rather than real
photos — the `/learn` page's instrument images were already placeholders in
the original source; the composer headshots were real image paths that
don't resolve to anything in this repo, so they've been swapped for
placeholders too. Replace `imageUrl` in `data/education.ts` per composer
once real photos exist.

## Why this app has its own header now

The original education pages had no header of their own — they relied on
the main site's shared header persisting across client-side navigation
within one single-page app. Now that this is a genuinely separate
deployment (its own subdomain, its own container), it needs its own way to
navigate back to eu-co.co.uk — see `components/Header.tsx`.

## Local development

```bash
npm install
npm run dev
```

## Deploying

This repo doesn't run standalone in production — it's one of four services
in the shared `docker-compose.yml` that lives in the `euco-backend` repo,
alongside Postgres, the API, and the main Astro site. See that repo's
`deploy/Caddyfile.snippet` and the main rollout runbook for the full
picture. In short: this repo's own CI/CD (`.github/workflows/deploy.yml`)
SSHes into the droplet, pulls this repo, then runs
`docker compose build education && docker compose up -d education` against
that shared compose file — it only ever touches its own container.

## Notes for whoever inherits this next

- Two small data-quality things noticed and fixed while porting from the
  original `educationData.js`, worth knowing about: two programme notes
  entries shared the same `id` (a React key collision, not a display bug —
  fixed with a compound key), and this is otherwise a straight port of that
  file's content.
- `next.config.ts` sets `output: "standalone"` — required for the
  Dockerfile's small runtime image; don't remove it without also updating
  the Dockerfile.
