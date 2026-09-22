#!/usr/bin/env node
// =============================================================================
// scripts/build-composer-graph.ts
// =============================================================================
// Expands the hand-curated composer geography/relationships in
// data/composer-graph.ts by querying two external sources:
//
//   - Wikidata's public SPARQL endpoint (query.wikidata.org) for
//     birthplace/death-place coordinates and teacher/student/influence
//     relationships. Covers every era, so this is the backbone.
//   - The Musical Meetups Knowledge Graph (Polifonia project,
//     polifonia.kmi.open.ac.uk) for documented historical encounters
//     between composers -- richer than Wikidata's relations, but only
//     covers people active 1800-1945 (see its paper's stated scope).
//
// IMPORTANT -- read before running: this was written against real,
// documented query patterns (Wikidata's standard property IDs; MMKG's
// own example SPARQL query, taken directly from its published paper's
// Figure 3a) but could NOT be tested against the live endpoints from
// the environment this was built in (no network path to either
// service). Treat the first run as a real test, not a known-working
// tool -- run it, read the console output/composer-graph.generated.json
// it produces, and if anything looks wrong (missing matches, obviously
// wrong coordinates, a query erroring), send the output back for
// debugging rather than assuming the fault is in your setup.
//
// What it does NOT do: overwrite data/composer-graph.ts (the curated,
// verified-by-hand file). It writes to data/composer-graph.generated.ts
// instead -- merge anything useful from there into the curated file
// yourself once you've spot-checked it, rather than this script
// silently replacing hand-verified facts with scraped ones.
//
// Usage:
//   npx tsx scripts/build-composer-graph.ts
//
// Optional: set WIKIDATA_USER_AGENT to identify these requests (Wikidata
// asks for this as good practice, not a hard requirement) --
//   WIKIDATA_USER_AGENT="EUCO Education Site (https://edu.eu-co.co.uk)" npx tsx scripts/build-composer-graph.ts
// =============================================================================
import { writeFileSync } from "fs";
import { join } from "path";
import { composers } from "../data/education";
import { composerPlaces } from "../data/composer-graph";

const WIKIDATA_ENDPOINT = "https://query.wikidata.org/sparql";
const MMKG_ENDPOINT = "https://polifonia.kmi.open.ac.uk/meetups/sparql/";
const USER_AGENT = process.env.WIKIDATA_USER_AGENT || "EUCO-Education-Site-ComposerGraph/1.0";

interface WikidataMatch {
  qid: string;
  birthPlace?: { name: string; lat: number; lng: number };
  deathPlace?: { name: string; lat: number; lng: number };
  dbpediaUri?: string;
}

interface RelationHit {
  fromQid: string;
  toQid: string;
  toName: string;
  type: "teacher" | "influence";
}

async function sparqlQuery(endpoint: string, query: string): Promise<any> {
  const res = await fetch(`${endpoint}?query=${encodeURIComponent(query)}&format=json`, {
    headers: { Accept: "application/sparql-results+json", "User-Agent": USER_AGENT },
  });
  if (!res.ok) {
    throw new Error(`SPARQL query failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

function parseCoord(pointLiteral: string): { lat: number; lng: number } | null {
  // Wikidata coordinates come back as a WKT literal: "Point(lng lat)"
  const match = pointLiteral.match(/Point\(([-\d.]+)\s+([-\d.]+)\)/);
  if (!match) return null;
  return { lng: parseFloat(match[1]), lat: parseFloat(match[2]) };
}

/**
 * Finds a composer's Wikidata entry by exact English label + occupation
 * "composer" (Q36834), pulling birth/death place + coordinates and (if
 * present) their DBpedia sitelink -- which is also the identifier MMKG
 * uses, so this doubles as the bridge into the second query below.
 */
async function lookupWikidata(name: string): Promise<WikidataMatch | null> {
  const query = `
    SELECT ?person ?birthPlaceLabel ?birthCoord ?deathPlaceLabel ?deathCoord ?dbpedia WHERE {
      ?person rdfs:label "${name.replace(/"/g, '\\"')}"@en.
      ?person wdt:P106 wd:Q36834.
      OPTIONAL {
        ?person wdt:P19 ?birthPlace.
        ?birthPlace wdt:P625 ?birthCoord.
        ?birthPlace rdfs:label ?birthPlaceLabel.
        FILTER(lang(?birthPlaceLabel) = "en")
      }
      OPTIONAL {
        ?person wdt:P20 ?deathPlace.
        ?deathPlace wdt:P625 ?deathCoord.
        ?deathPlace rdfs:label ?deathPlaceLabel.
        FILTER(lang(?deathPlaceLabel) = "en")
      }
      OPTIONAL {
        ?dbpedia schema:about ?person.
        FILTER(STRSTARTS(STR(?dbpedia), "https://en.wikipedia.org/"))
      }
    } LIMIT 1
  `;
  const result = await sparqlQuery(WIKIDATA_ENDPOINT, query);
  const row = result.results.bindings[0];
  if (!row) return null;

  const qid = row.person.value.split("/").pop();
  const match: WikidataMatch = { qid };
  if (row.birthCoord) {
    const coord = parseCoord(row.birthCoord.value);
    if (coord) match.birthPlace = { name: row.birthPlaceLabel?.value ?? "Unknown", ...coord };
  }
  if (row.deathCoord) {
    const coord = parseCoord(row.deathCoord.value);
    if (coord) match.deathPlace = { name: row.deathPlaceLabel?.value ?? "Unknown", ...coord };
  }
  if (row.dbpedia) {
    // Wikipedia URL -> DBpedia resource URI follows a fixed, documented
    // naming convention (same page title, different domain/path).
    const title = row.dbpedia.value.replace("https://en.wikipedia.org/wiki/", "");
    match.dbpediaUri = `http://dbpedia.org/resource/${title}`;
  }
  return match;
}

/**
 * Teacher-of / influenced-by relations, restricted to composers already
 * in `knownQids` -- we only care about edges between people already in
 * our own roster, not Bach's connections to the entire world.
 */
async function lookupRelations(qid: string, knownQids: Map<string, string>): Promise<RelationHit[]> {
  const otherQids = Array.from(knownQids.keys()).filter((q) => q !== qid);
  if (otherQids.length === 0) return [];
  const valuesClause = otherQids.map((q) => `wd:${q}`).join(" ");

  const query = `
    SELECT ?other ?otherLabel ?rel WHERE {
      VALUES ?other { ${valuesClause} }
      {
        wd:${qid} wdt:P1066 ?other. BIND("teacher" AS ?rel)
      } UNION {
        ?other wdt:P1066 wd:${qid}. BIND("teacher-inverse" AS ?rel)
      } UNION {
        wd:${qid} wdt:P737 ?other. BIND("influence" AS ?rel)
      }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
  `;
  const result = await sparqlQuery(WIKIDATA_ENDPOINT, query);
  return result.results.bindings.map((row: any) => {
    const otherQid = row.other.value.split("/").pop();
    const rel = row.rel.value;
    return {
      fromQid: rel === "teacher-inverse" ? otherQid : qid,
      toQid: rel === "teacher-inverse" ? qid : otherQid,
      toName: row.otherLabel?.value ?? knownQids.get(otherQid) ?? otherQid,
      type: rel === "influence" ? "influence" : "teacher",
    } as RelationHit;
  });
}

/**
 * MMKG's own example query (paper Figure 3a), adapted from "places one
 * subject visited" to "did two subjects appear in the same meetup" --
 * same predicates (mtp:hasSubject, mtp:hasParticipant, mtp:hasEvidenceText),
 * different shape of question. Only meaningful for the subset of
 * composers active 1800-1945 (MMKG's documented coverage window).
 */
async function lookupMmkgMeetups(dbpediaUri: string, otherDbpediaUris: string[]): Promise<{ withUri: string; evidence: string }[]> {
  if (otherDbpediaUris.length === 0) return [];
  const valuesClause = otherDbpediaUris.map((u) => `<${u}>`).join(" ");
  const query = `
    PREFIX mtp: <https://w3id.org/polifonia/ontology/meetups/>
    SELECT DISTINCT ?other ?evidenceText WHERE {
      ?meetup mtp:hasSubject <${dbpediaUri}> .
      ?meetup mtp:hasParticipant ?participant .
      ?participant mtp:hasEntity ?other .
      VALUES ?other { ${valuesClause} }
      ?meetup mtp:hasEvidenceText ?evidenceText .
    }
  `;
  try {
    const result = await sparqlQuery(MMKG_ENDPOINT, query);
    return result.results.bindings.map((row: any) => ({ withUri: row.other.value, evidence: row.evidenceText.value }));
  } catch (err) {
    console.warn(`  MMKG query failed for ${dbpediaUri} (this composer may be outside MMKG's 1800-1945 coverage, or the endpoint may be unreachable):`, (err as Error).message);
    return [];
  }
}

async function main() {
  const alreadyPlaced = new Set(composerPlaces.map((p) => p.id));
  const toLookUp = composers.filter((c) => !alreadyPlaced.has(c.id));
  console.log(`${alreadyPlaced.size} composers already have curated data; looking up the remaining ${toLookUp.length} via Wikidata...\n`);

  const newPlaces: Record<string, unknown>[] = [];
  const qidByComposerId = new Map<string, string>();
  const nameByQid = new Map<string, string>();

  for (const composer of toLookUp) {
    process.stdout.write(`${composer.name}... `);
    try {
      const match = await lookupWikidata(composer.name);
      if (!match) {
        console.log("no Wikidata match found");
        continue;
      }
      qidByComposerId.set(composer.id, match.qid);
      nameByQid.set(match.qid, composer.name);
      newPlaces.push({
        id: composer.id,
        wikidataQid: match.qid,
        dbpediaUri: match.dbpediaUri ?? null,
        birthPlace: match.birthPlace ?? null,
        deathPlace: match.deathPlace ?? null,
      });
      console.log(`found ${match.qid}${match.birthPlace ? `, born ${match.birthPlace.name}` : " (no birthplace on record)"}`);
    } catch (err) {
      console.log(`FAILED: ${(err as Error).message}`);
    }
    // Be a polite, rate-limited guest of a free public endpoint -- no
    // documented hard limit for occasional scripted use, but a small
    // delay between requests costs nothing here and avoids being the
    // reason that changes.
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nLooking up teacher/influence relations between the ${qidByComposerId.size} newly-matched composers...\n`);
  const newRelations: Record<string, unknown>[] = [];
  for (const [composerId, qid] of qidByComposerId) {
    try {
      const relations = await lookupRelations(qid, nameByQid);
      for (const rel of relations) {
        newRelations.push({ fromQid: rel.fromQid, toQid: rel.toQid, type: rel.type, label: `${rel.type === "teacher" ? "Teacher/student relationship" : "Documented influence"} (Wikidata)` });
      }
      if (relations.length) console.log(`  ${nameByQid.get(qid)}: ${relations.length} relation(s) found`);
    } catch (err) {
      console.log(`  ${nameByQid.get(qid)}: relation lookup FAILED: ${(err as Error).message}`);
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\nChecking MMKG for documented meetups (only composers active 1800-1945 will match)...\n`);
  const dbpediaUris = newPlaces.filter((p) => p.dbpediaUri).map((p) => p.dbpediaUri as string);
  const meetupResults: Record<string, unknown>[] = [];
  for (const place of newPlaces) {
    if (!place.dbpediaUri) continue;
    const others = dbpediaUris.filter((u) => u !== place.dbpediaUri);
    const hits = await lookupMmkgMeetups(place.dbpediaUri as string, others);
    for (const hit of hits) {
      meetupResults.push({ from: place.id, withDbpediaUri: hit.withUri, evidence: hit.evidence });
    }
    if (hits.length) console.log(`  ${place.id}: ${hits.length} meetup(s) found`);
    await new Promise((r) => setTimeout(r, 300));
  }

  const outPath = join(process.cwd(), "data", "composer-graph.generated.json");
  writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), newPlaces, newRelations, meetupResults }, null, 2));
  console.log(`\nWrote ${newPlaces.length} places, ${newRelations.length} relations, ${meetupResults.length} meetup hits to ${outPath}`);
  console.log("Review this file, then hand-merge anything useful into data/composer-graph.ts.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
