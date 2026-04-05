import Link from 'next/link';
import { getComposers, getProgrammeNotes, getArticles } from '@/lib/data';

export const metadata = {
  title: 'Education Hub',
  description: 'Explore the world of chamber music through our composer database, programme notes, and educational articles.',
};

export default async function HubPage() {
  const [composers, notes, articles] = await Promise.all([
    getComposers(), getProgrammeNotes(), getArticles(),
  ]);

  const featured = composers.slice(0, 4);
  const latestNote = notes[0];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Decorative amber glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[var(--color-amber)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[var(--color-amber)] text-xs font-semibold tracking-[0.4em] uppercase mb-6">
            Edinburgh University Chamber Orchestra
          </p>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-medium text-[var(--color-cream)] leading-[1.1] mb-8">
            Education<br />
            <span className="italic text-[var(--color-amber-light)]">Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed max-w-2xl mx-auto">
            An ever-growing collection of resources about the music we love &mdash;
            from composer biographies to programme notes and the history of the chamber orchestra.
          </p>
        </div>
      </section>

      {/* ── Section Grid ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Composers Card */}
          <Link href="/composers"
            className="group relative p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-amber-dim)] transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-amber)]/5 rounded-full blur-[80px] group-hover:bg-[var(--color-amber)]/10 transition-all duration-700" />
            <p className="text-[var(--color-amber)] text-xs font-bold tracking-[0.3em] uppercase mb-4 relative">
              Database
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl text-[var(--color-cream)] mb-3 relative">
              Composers
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 relative">
              Explore the lives, works, and legacies of {composers.length} composers
              whose music has graced our concerts.
            </p>
            <div className="flex -space-x-2 relative">
              {featured.map(c => (
                <div key={c.id} className="w-10 h-10 rounded-full bg-[var(--color-border)] border-2 border-[var(--color-card)] overflow-hidden">
                  <img src={`/${c.imageUrl}`} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-[var(--color-parchment)] border-2 border-[var(--color-card)] flex items-center justify-center text-xs text-[var(--color-text-muted)]">
                +{composers.length - 4}
              </div>
            </div>
            <span className="absolute bottom-8 right-8 text-[var(--color-amber-dim)] group-hover:text-[var(--color-amber)] group-hover:translate-x-1 transition-all text-xl">→</span>
          </Link>

          {/* Programme Notes Card */}
          <Link href="/programme-notes"
            className="group relative p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-amber-dim)] transition-all duration-500 overflow-hidden">
            <p className="text-[var(--color-amber)] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Archive
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl text-[var(--color-cream)] mb-3">
              Programme Notes
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
              Read insights into the works we perform, written by our members and conductors.
            </p>
            {latestNote && (
              <div className="p-4 rounded-lg bg-[var(--color-parchment)] border border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-amber-dim)] mb-1">Latest</p>
                <p className="text-sm text-[var(--color-cream)] font-medium line-clamp-1">{latestNote.title}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">by {latestNote.author}</p>
              </div>
            )}
            <span className="absolute bottom-8 right-8 text-[var(--color-amber-dim)] group-hover:text-[var(--color-amber)] group-hover:translate-x-1 transition-all text-xl">→</span>
          </Link>

          {/* Articles Card */}
          <Link href="/articles"
            className="group relative p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-amber-dim)] transition-all duration-500">
            <p className="text-[var(--color-amber)] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              In Depth
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl text-[var(--color-cream)] mb-3">
              Articles
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Deep dives into specific works, musical topics, and the stories behind the notes.
            </p>
            <span className="absolute bottom-8 right-8 text-[var(--color-amber-dim)] group-hover:text-[var(--color-amber)] group-hover:translate-x-1 transition-all text-xl">→</span>
          </Link>

          {/* Learn Card */}
          <Link href="/learn"
            className="group relative p-8 md:p-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-amber-dim)] transition-all duration-500">
            <p className="text-[var(--color-amber)] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Discover
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl text-[var(--color-cream)] mb-3">
              The Chamber Orchestra
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              What makes a chamber orchestra unique? Discover the instruments, the history, and the art of ensemble playing.
            </p>
            <span className="absolute bottom-8 right-8 text-[var(--color-amber-dim)] group-hover:text-[var(--color-amber)] group-hover:translate-x-1 transition-all text-xl">→</span>
          </Link>

        </div>
      </section>

      {/* ── Quote / Atmosphere ────────────────────────────────────────────── */}
      <section className="border-t border-b border-[var(--color-border)] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-['Playfair_Display'] text-6xl text-[var(--color-amber)]/30 leading-none">&ldquo;</span>
          <p className="font-['Playfair_Display'] text-2xl md:text-3xl italic text-[var(--color-cream)] leading-relaxed -mt-6">
            Music is the shorthand of emotion.
          </p>
          <p className="text-[var(--color-text-muted)] mt-6 text-sm tracking-widest uppercase">
            Leo Tolstoy
          </p>
        </div>
      </section>
    </>
  );
}
