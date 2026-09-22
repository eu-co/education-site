import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import ComposerAccordion from "@/components/ComposerAccordion";
import { getComposersPlayedByUs } from "@/lib/directus";

export const metadata: Metadata = {
  title: "Composers We've Played",
  description: "Every composer EUCO has performed, with biographies and the specific chamber-orchestra repertoire we've played.",
};

// Deliberately separate from /composers (the full mind-map of every
// composer the education site knows about, EUCO-performed or not) --
// this is specifically the archival record of what WE have actually
// played, which is why it lives under /archive rather than as a filter
// on the main composers page. See lib/directus.ts's
// getComposersPlayedByUs() and the played_by_us field's own note in
// schema-snapshot.yaml.
export default async function ComposersPlayedByUsPage() {
  const composers = await getComposersPlayedByUs();
  const sorted = [...composers].sort((a, b) => {
    const lastNameA = a.name.split(" ").pop() ?? a.name;
    const lastNameB = b.name.split(" ").pop() ?? b.name;
    return lastNameA.localeCompare(lastNameB);
  });

  return (
    <>
      <div className="container mx-auto px-6 pt-10">
        <Link href="/archive" className="text-fresco-terracotta font-display font-semibold text-sm hover:underline">
          &larr; Back to the Archive
        </Link>
      </div>
      <Section title="Composers We've Played" eyebrow="From the Archive" accent="coral" className="pt-6">
        <p className="text-ink-soft text-lg text-center max-w-2xl mx-auto -mt-6 mb-12">
          Every composer whose work EUCO has actually performed, with the specific pieces we've played listed
          under each entry. Looking for the wider picture — how these composers connected to one another, and
          who else is out there? Head to the full <Link href="/composers" className="text-fresco-ultramarine underline font-semibold">composer map</Link>.
        </p>
        {sorted.length > 0 ? (
          <ComposerAccordion composers={sorted} />
        ) : (
          <p className="text-center text-ink-soft">
            Nothing here yet — run the seed script (see scripts/seed-composers.ts) to populate this from our
            repertoire history.
          </p>
        )}
      </Section>
    </>
  );
}
