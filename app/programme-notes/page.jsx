import { getProgrammeNotes } from '@/lib/data';

export const metadata = {
  title: 'Programme Notes',
  description: 'An archive of programme notes from past EUCO concerts, exploring the history and context of our repertoire.',
};

export default async function ProgrammeNotesPage() {
  const notes = await getProgrammeNotes();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="text-[var(--color-amber)] text-xs font-bold tracking-[0.4em] uppercase mb-4">
          Archive
        </p>
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[var(--color-cream)] mb-4">
          Programme Notes
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed max-w-2xl">
          Delve deeper into the music from our past performances. Written by our members
          and conductors, offering insights into the works we love.
        </p>
      </div>

      {/* Notes list */}
      <div className="space-y-12">
        {notes.map((note, i) => (
          <article key={note.id || i}
            className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 md:p-10 hover:border-[var(--color-amber-dim)]/50 transition-all duration-500">

            {/* Issue number */}
            <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-xs text-[var(--color-text-muted)] font-mono">
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-[var(--color-amber)] font-semibold tracking-widest uppercase">
                {note.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-muted)]">
                by {note.author}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[var(--color-cream)] mb-6 leading-tight pr-12">
              {note.title}
            </h2>

            {/* Decorative rule */}
            <div className="w-16 h-px bg-[var(--color-amber-dim)] mb-6" />

            {/* Excerpt — styled as editorial long-form */}
            <div className="text-[var(--color-cream)]/80 leading-[1.9] text-base md:text-[17px]">
              {/* Split into paragraphs if the text is long */}
              {note.excerpt.length > 500 ? (
                <>
                  {/* Drop cap for the first letter */}
                  <p className="first-letter:text-5xl first-letter:font-['Playfair_Display'] first-letter:text-[var(--color-amber)] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8]">
                    {note.excerpt.substring(0, Math.ceil(note.excerpt.length / 2))}
                  </p>
                  <p className="mt-4">
                    {note.excerpt.substring(Math.ceil(note.excerpt.length / 2))}
                  </p>
                </>
              ) : (
                <p className="first-letter:text-5xl first-letter:font-['Playfair_Display'] first-letter:text-[var(--color-amber)] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8]">
                  {note.excerpt}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Call for contributions */}
      <div className="mt-20 text-center py-16 border-t border-[var(--color-border)]">
        <p className="font-['Playfair_Display'] text-2xl text-[var(--color-cream)] mb-4">
          Want to contribute?
        </p>
        <p className="text-[var(--color-text-muted)] max-w-lg mx-auto mb-8">
          We welcome programme notes from EUCO members, conductors, and music enthusiasts.
          Share your insights with our community.
        </p>
        <a href="https://www.eu-co.co.uk/contact-us/direct"
          className="inline-block px-8 py-3 border border-[var(--color-amber-dim)] text-[var(--color-amber)] rounded-full text-sm tracking-widest uppercase hover:bg-[var(--color-amber)] hover:text-black transition-all duration-300">
          Get in Touch
        </a>
      </div>
    </div>
  );
}
