"use client";

import dynamic from "next/dynamic";
import type { ComposerGraph } from "@/lib/composerGraph";

// Leaflet touches `window` at module-load time, which crashes during
// Next.js's server-side render/static generation -- `ssr: false` is
// only available from a Client Component, hence this thin wrapper
// rather than dynamic-importing directly from the (Server Component)
// composers page.
const ComposerMap = dynamic(() => import("./ComposerMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[32rem] rounded-[2rem] bg-paper-warm border-2 border-ink/5 animate-pulse flex items-center justify-center">
      <span className="text-ink-soft font-display">Loading the map&hellip;</span>
    </div>
  ),
});

export default function ComposerMapLoader({ graph }: { graph: ComposerGraph }) {
  return <ComposerMap graph={graph} />;
}
