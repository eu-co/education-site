import type { Metadata } from "next";
import Section from "@/components/Section";
import ComposerAccordion from "@/components/ComposerAccordion";
import { getComposers } from "@/lib/directus";

export const metadata: Metadata = {
  title: "Composers",
  description: "A database of composers whose works EUCO has performed, with biographies and key repertoire.",
};

export default async function ComposersPage() {
  const composers = await getComposers();
  const sorted = [...composers].sort((a, b) => {
    const lastNameA = a.name.split(" ").pop() ?? a.name;
    const lastNameB = b.name.split(" ").pop() ?? b.name;
    return lastNameA.localeCompare(lastNameB);
  });

  return (
    <Section title="Composer Database" eyebrow="Meet the composers" accent="sky" className="pt-8">
      {sorted.length > 0 ? (
        <ComposerAccordion composers={sorted} />
      ) : (
        <p className="text-center text-ink-soft">Composer entries are managed in the CMS — check back soon.</p>
      )}
    </Section>
  );
}
