#!/usr/bin/env node
// =============================================================================
// scripts/seed-composers.ts
// =============================================================================
// One-off migration: moves the ~50 composers hardcoded in data/education.ts
// (EUCO's own performed repertoire -- this is the exact list "played by us")
// into the new Directus `composers` collection, each tagged
// played_by_us: true. Run this once, after applying the updated
// schema-snapshot.yaml (see backend/directus/README.md) -- the /composers
// page has been reading from Directus instead of this file for a while now
// (see lib/directus.ts's getComposers()), which is why it's been showing
// "Composer entries are managed in the CMS — check back soon" instead of
// this data: nothing had actually written it there yet. This script is
// that missing step.
//
// Safe to re-run: matches existing Directus rows by `name` and PATCHes
// them instead of creating duplicates, so re-running after editing
// data/education.ts (e.g. adding the 2025/26 season's repertoire) just
// updates what changed.
//
// Usage:
//   DIRECTUS_URL=https://cms.eu-co.co.uk \
//   DIRECTUS_ADMIN_TOKEN=xxxxx \
//   npx tsx scripts/seed-composers.ts
//
// DIRECTUS_ADMIN_TOKEN: an admin user's static token (Directus admin →
// your user profile → "Generate Token"), or any token for a role with
// create/update access to `composers`. Not committed anywhere.
// =============================================================================
import { composers } from "../data/education";

const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://localhost:8055";
const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!TOKEN) {
  console.error("Set DIRECTUS_ADMIN_TOKEN (an admin static token) before running this.");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function findExisting(name: string): Promise<number | null> {
  const params = new URLSearchParams({ "filter[name][_eq]": name, limit: "1" });
  const res = await fetch(`${DIRECTUS_URL}/items/composers?${params}`, { headers });
  if (!res.ok) throw new Error(`GET /items/composers failed: ${res.status} ${await res.text()}`);
  const { data } = await res.json();
  return data?.[0]?.id ?? null;
}

async function upsertComposer(payload: Record<string, unknown>, existingId: number | null): Promise<void> {
  const url = existingId ? `${DIRECTUS_URL}/items/composers/${existingId}` : `${DIRECTUS_URL}/items/composers`;
  const res = await fetch(url, {
    method: existingId ? "PATCH" : "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`${existingId ? "PATCH" : "POST"} /items/composers failed: ${res.status} ${await res.text()}`);
}

async function main() {
  console.log(`Seeding ${composers.length} composers into ${DIRECTUS_URL}...`);
  let created = 0;
  let updated = 0;

  for (const c of composers) {
    const existingId = await findExisting(c.name);
    const payload = {
      status: "published",
      played_by_us: true,
      name: c.name,
      lifespan: c.lifespan,
      bio: c.bio,
      // Directus's composers.pieces is a newline-separated string (see
      // schema-snapshot.yaml's note on that field / ComposerAccordion.tsx's
      // .split("\n")), not an array — data/education.ts stores it as an
      // array, so join it here.
      pieces: c.pieces.join("\n"),
      // Deliberately NOT migrating imageUrl -- those are all placehold.co
      // filler (see this repo's README), not real images worth carrying
      // into Directus. Upload real photos directly in Directus once
      // available, per composer.
    };
    await upsertComposer(payload, existingId);
    if (existingId) updated++;
    else created++;
    process.stdout.write(existingId ? "." : "+");
  }

  console.log(`\nDone. ${created} created, ${updated} updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
