import type { Metadata } from "next";
import Section from "@/components/Section";
import ComposerAccordion from "@/components/ComposerAccordion";
import ComposerMapLoader from "@/components/ComposerMapLoader";
import { getComposers } from "@/lib/directus";
import { buildComposerGraph } from "@/lib/composerGraph";

export const metadata: Metadata = {
  title: "Composer Map",
  description: "How composers met, worked, and influenced one another — plotted across time and place, alongside a full database of biographies and key repertoire.",
};

export default async function ComposersPage() {
  const composers = await getComposers();
  const sorted = [...composers].sort((a, b) => {
    const lastNameA = a.name.split(" ").pop() ?? a.name;
    const lastNameB = b.name.split(" ").pop() ?? b.name;
    return lastNameA.localeCompare(lastNameB);
  });
  const graph = buildComposerGraph(sorted);

  return (
    <>
      <Section title="Composer Map" eyebrow="How they connected" accent="sky" className="pt-8 pb-8">
        {graph.nodes.some((n) => n.birthPlace) ? (
          <>
            <ComposerMapLoader graph={graph} />
            {graph.unplaced.length > 0 && (
              <p className="text-ink-soft text-sm text-center mt-6 max-w-xl mx-auto">
                {graph.unplaced.length} composer{graph.unplaced.length === 1 ? "" : "s"} not shown on the map yet
                (no location data on file) — still listed in full below.
                See <code className="text-xs bg-ink/5 px-1.5 py-0.5 rounded">scripts/build-composer-graph.ts</code> to fill these in.
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-ink-soft">No location data yet — see scripts/build-composer-graph.ts.</p>
        )}
      </Section>

      <Section title="Every Composer" eyebrow="The full database" accent="violet" className="pt-4">
        {sorted.length > 0 ? (
          <ComposerAccordion composers={sorted} />
        ) : (
          <p className="text-center text-ink-soft">Composer entries are managed in the CMS — check back soon.</p>
        )}
      </Section>
    </>
  );
}
