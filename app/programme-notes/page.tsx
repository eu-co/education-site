import type { Metadata } from "next";
import Section from "@/components/Section";
import { programmeNotes } from "@/data/education";

export const metadata: Metadata = {
  title: "Programme Notes",
  description:
    "An archive of programme notes from past Edinburgh University Chamber Orchestra concerts, exploring the history and context of our repertoire.",
};

export default function ProgrammeNotesPage() {
  return (
    <Section title="Programme Notes" eyebrow="Understand the repertoire" accent="mint" className="pt-8">
      <p className="text-center max-w-3xl mx-auto text-lg text-ink-soft mb-16">
        Delve deeper into the music from our past performances. Here you&rsquo;ll find a growing collection of notes
        written by our members and conductors, offering insights into the works we love. Looking for a specific
        concert&rsquo;s original printed programme instead? Check the{" "}
        <a href="/archive" className="text-pop-coral underline font-semibold">Archive</a>.
      </p>
      <div className="max-w-4xl mx-auto space-y-6">
        {programmeNotes.map((note, i) => (
          <div key={`${note.id}-${i}`} className="bg-white border-2 border-ink/5 p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-display font-semibold text-ink">{note.title}</h2>
            <p className="text-ink-soft my-2 text-sm">
              From the concert on {note.date} &middot; {note.author}
            </p>
            <p className="text-lg text-ink-soft leading-relaxed mt-4">{note.excerpt}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
