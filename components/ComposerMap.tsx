"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ComposerGraph, ComposerMapEdge, ComposerMapNode } from "@/lib/composerGraph";

// Same CARTO tile family used across every other EUCO map (the main
// site and ticketing site's LocationMap.astro) -- light/Positron here
// rather than their dark variant, to sit naturally on this app's
// parchment background instead of fighting it. Same optional API-key
// convention too: unkeyed works, just rate-limited/watermarked.
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY;
const TILE_URL = CARTO_KEY
  ? `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`
  : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

const EDGE_COLORS: Record<ComposerMapEdge["type"], string> = {
  teacher: "#4A6FE8", // fresco-ultramarine
  influence: "#F2B33D", // fresco-gold
  friendship: "#4FB89B", // fresco-verdigris
  meetup: "#F27C9E", // fresco-rose
};

function pinIcon(color: string, size: number) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FitToNodes({ nodes }: { nodes: ComposerMapNode[] }) {
  const map = useMap();
  const points = nodes.filter((n) => n.birthPlace).map((n) => [n.birthPlace!.lat, n.birthPlace!.lng] as [number, number]);
  if (points.length > 1) {
    map.fitBounds(points, { padding: [40, 40], maxZoom: 5 });
  }
  return null;
}

export default function ComposerMap({ graph }: { graph: ComposerGraph }) {
  const [selected, setSelected] = useState<ComposerMapNode | null>(null);
  const placedNodes = graph.nodes.filter((n) => n.birthPlace);

  return (
    <div className="relative">
      <div className="rounded-[2rem] overflow-hidden border-2 border-ink/5 shadow-lg h-[32rem]">
        <MapContainer center={[48, 10]} zoom={4} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url={TILE_URL}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains="abcd"
          />
          <FitToNodes nodes={placedNodes} />

          {graph.edges.map((edge, i) => (
            <Polyline
              key={i}
              positions={[
                [edge.from.birthPlace!.lat, edge.from.birthPlace!.lng],
                [edge.to.birthPlace!.lat, edge.to.birthPlace!.lng],
              ]}
              pathOptions={{ color: EDGE_COLORS[edge.type], weight: 2, opacity: 0.55 }}
            />
          ))}

          {placedNodes.map((node) => (
            <Marker
              key={node.composer.id}
              position={[node.birthPlace!.lat, node.birthPlace!.lng]}
              icon={pinIcon(node.composer.played_by_us ? "#F4795B" : "#8B5FBF", node.composer.played_by_us ? 16 : 11)}
              eventHandlers={{ click: () => setSelected(node) }}
            >
              <Popup>
                <div className="font-display font-semibold text-ink">{node.composer.name}</div>
                <div className="text-ink-soft text-sm">{node.composer.lifespan}</div>
                <div className="text-ink-soft text-xs mt-1">Born {node.birthPlace!.name}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs text-ink-soft">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-fresco-terracotta inline-block border border-white" /> Played by us</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-fresco-plum inline-block border border-white" /> Not yet played by us</span>
        {(Object.keys(EDGE_COLORS) as ComposerMapEdge["type"][]).map((type) => (
          <span key={type} className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 inline-block" style={{ backgroundColor: EDGE_COLORS[type] }} />
            {type === "teacher" ? "Taught" : type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>

      {selected && (
        <div className="mt-6 bg-white border-2 border-ink/5 rounded-3xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-display font-semibold text-ink">{selected.composer.name}</h3>
              <p className="text-ink-soft text-sm mb-3">{selected.composer.lifespan}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-ink-soft hover:text-ink shrink-0" aria-label="Close">
              &times;
            </button>
          </div>
          {selected.composer.bio && <p className="text-ink-soft leading-relaxed mb-3">{selected.composer.bio}</p>}
          <div className="flex flex-wrap gap-3 text-sm">
            {selected.composer.imslp_slug ? (
              <a
                href={`https://imslp.org/wiki/Category:${selected.composer.imslp_slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fresco-ultramarine underline font-semibold"
              >
                View on IMSLP &rarr;
              </a>
            ) : (
              <a
                href={`https://imslp.org/index.php?title=Special:Search&search=${encodeURIComponent(selected.composer.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fresco-ultramarine underline font-semibold"
              >
                Search IMSLP &rarr;
              </a>
            )}
            {selected.composer.wikidata_qid && (
              <a
                href={`https://www.wikidata.org/wiki/${selected.composer.wikidata_qid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft underline"
              >
                Wikidata
              </a>
            )}
          </div>
          {graph.edges.some((e) => e.from.composer.id === selected.composer.id || e.to.composer.id === selected.composer.id) && (
            <div className="mt-4 pt-4 border-t border-ink/10">
              <p className="text-xs font-display font-semibold uppercase tracking-wide text-ink-soft mb-2">Connections</p>
              <ul className="space-y-1.5 text-sm text-ink-soft">
                {graph.edges
                  .filter((e) => e.from.composer.id === selected.composer.id || e.to.composer.id === selected.composer.id)
                  .map((e, i) => {
                    const other = e.from.composer.id === selected.composer.id ? e.to.composer : e.from.composer;
                    return (
                      <li key={i}>
                        <span className="font-semibold text-ink">{other.name}</span> — {e.label}
                        {e.period && <span className="text-ink-soft"> ({e.period})</span>}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
