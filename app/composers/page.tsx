import type { Metadata } from "next";
import Section from "@/components/Section";
import ComposerAccordion from "@/components/ComposerAccordion";
import { composers } from "@/data/education";

export const metadata: Metadata = {
  title: "Composers",
  description: "A database of composers whose works EUCO has performed, with biographies and key repertoire.",
};

export default function ComposersPage() {
  const sorted = [...composers].sort((a, b) => {
    const lastNameA = a.name.split(" ").pop() ?? a.name;
    const lastNameB = b.name.split(" ").pop() ?? b.name;
    return lastNameA.localeCompare(lastNameB);
  });

  return (
    <Section title="Composer Database" eyebrow="Meet the composers" accent="sky" className="pt-8">
      <ComposerAccordion composers={sorted} />
    </Section>
  );
}
