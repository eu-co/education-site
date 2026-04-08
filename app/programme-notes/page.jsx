import Link from 'next/link';
import Image from 'next/image';
import { getConcertsWithNotes, getCleanImageUrl } from '@/lib/data';

export const metadata = { title: 'Programme Notes' };

const FALLBACK = 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2670&auto=format&fit=crop';

export default async function ProgrammeNotesPage() {
  const concerts = await getConcertsWithNotes();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-16">
        <p className="text-[var(--accent-text)] text-xs font-bold tracking-[0.4em] uppercase mb-4">Archive</p>
        <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-4">Programme Notes</h1>
        <p className="text-[var(--ink-muted)] text-lg leading-relaxed max-w-2xl">
          Delve deeper into the music from our past performances.
        </p>
      </div>

      {concerts.length === 0 ? (
        <p className="text-[var(--ink-muted)] text-center py-20">No programme notes available yet.</p>
      ) : (
        <div className="space-y-10">
          {concerts.map((concert, i) => {
            const cover = getCleanImageUrl(concert.ShowImage) || FALLBACK;
            const dateStr = concert._dateObj.toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric',
            });

            return (
              <Link key={concert.slug} href={`/programme-notes/${concert.slug}`}>
                <article className="group relative rounded-2xl border border-[var(--border)] bg-white overflow-hidden hover:shadow-lg hover:shadow-[var(--accent)]/5 hover:border-[var(--accent)]/20 transition-all duration-500 cursor-pointer">
                  {/* Subtle concert image stripe */}
                  <div className="relative h-28 md:h-36 overflow-hidden">
                    <Image
                      src={cover}
                      alt={concert.Title}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--border)] flex items-center justify-center text-xs text-[var(--ink-muted)] font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs text-[var(--accent-text)] font-semibold tracking-widest uppercase">{dateStr}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                      <span className="text-xs text-[var(--ink-muted)]">{concert.Venue}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl text-[var(--ink)] mb-4 leading-tight">{concert.Title}</h2>
                    <div className="w-16 h-px bg-[var(--accent)] mb-4" />
                    {concert.Programme && (
                      <p className="text-[var(--ink-light)] text-sm leading-relaxed line-clamp-2 mb-4">
                        {concert.Programme}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-[var(--accent-text)] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read programme notes →
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}

      <div className="mt-20 text-center py-16 border-t border-[var(--border)]">
        <p className="text-xl text-[var(--ink)] mb-4 italic font-['DM_Serif_Display']">Want to contribute?</p>
        <p className="text-[var(--ink-muted)] max-w-lg mx-auto mb-8 text-sm">
          We welcome programme notes from members, conductors, and music enthusiasts.
        </p>
        <a href="https://www.eu-co.co.uk/contact-us"
          className="inline-block px-8 py-3 border border-[var(--border)] text-[var(--ink)] rounded-full text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
          Get in touch
        </a>
      </div>
    </div>
  );
}