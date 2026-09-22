import { composers as seedComposers } from "@/data/education";
import { composerConnections, composerPlaces, type ComposerConnection, type ComposerPlace } from "@/data/composer-graph";
import type { Composer } from "@/lib/directus";

export interface ComposerMapNode {
  composer: Composer;
  birthPlace: ComposerPlace["birthPlace"] | null;
  deathPlace: ComposerPlace["deathPlace"] | null;
}

export interface ComposerMapEdge {
  from: ComposerMapNode;
  to: ComposerMapNode;
  type: ComposerConnection["type"];
  label: string;
  period?: string;
}

export interface ComposerGraph {
  nodes: ComposerMapNode[];
  edges: ComposerMapEdge[];
  /** Composers with no known coordinates yet -- shown in a plain list
   * alongside the map rather than silently dropped, and the most useful
   * signal for "these are the ones scripts/build-composer-graph.ts still
   * needs to fill in." */
  unplaced: Composer[];
}

function normalize(name: string): string {
  return name.trim().toLowerCase();
}

/**
 * data/composer-graph.ts's curated entries key off data/education.ts's
 * string ids ("bach-js") -- the only place those ids are paired with an
 * actual composer *name* is data/education.ts itself, so that's the
 * bridge used here to go id -> name -> live Directus composer (which
 * has its own numeric id and knows nothing about the string ones).
 */
const idToName = new Map(seedComposers.map((c) => [c.id, c.name]));

export function buildComposerGraph(composers: Composer[]): ComposerGraph {
  const byName = new Map(composers.map((c) => [normalize(c.name), c]));
  const nodeByComposerId = new Map<number, ComposerMapNode>();
  const unplaced: Composer[] = [];

  for (const composer of composers) {
    const place = composerPlaces.find((p) => normalize(idToName.get(p.id) ?? "") === normalize(composer.name));
    const node: ComposerMapNode = {
      composer,
      birthPlace: place?.birthPlace ?? null,
      deathPlace: place?.deathPlace ?? null,
    };
    nodeByComposerId.set(composer.id, node);
    if (!place) unplaced.push(composer);
  }

  const edges: ComposerMapEdge[] = [];
  for (const conn of composerConnections) {
    const fromName = idToName.get(conn.from);
    const toName = idToName.get(conn.to);
    if (!fromName || !toName) continue;
    const fromComposer = byName.get(normalize(fromName));
    const toComposer = byName.get(normalize(toName));
    if (!fromComposer || !toComposer) continue; // one side isn't in Directus yet -- skip rather than error
    const fromNode = nodeByComposerId.get(fromComposer.id);
    const toNode = nodeByComposerId.get(toComposer.id);
    if (!fromNode?.birthPlace || !toNode?.birthPlace) continue; // can't draw a line with no coordinates
    edges.push({ from: fromNode, to: toNode, type: conn.type, label: conn.label, period: conn.period });
  }

  return {
    nodes: Array.from(nodeByComposerId.values()),
    edges,
    unplaced,
  };
}
