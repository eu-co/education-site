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
    <Section title="Programme Notes Archive" className="pt-8">
      <p className="text-center max-w-3xl mx-auto text-lg text-gray-300 mb-16">
        Delve deeper into the music from our past performances. Here you&rsquo;ll find a growing collection of notes
        written by our members and conductors, offering insights into the works we love.
      </p>
      <div className="max-w-4xl mx-auto space-y-8">
        {programmeNotes.map((note, i) => (
          <div key={`${note.id}-${i}`} className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-400 font-display">{note.title}</h2>
            <p className="text-gray-400 my-2">
              From the concert on {note.date} &middot; {note.author}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">{note.excerpt}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
