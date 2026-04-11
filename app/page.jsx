import Link from 'next/link';
import { getComposers, getArticles, getConcertArchive } from '@/lib/data';

export const metadata = { title: 'Education Hub' };

export default async function HubPage() {
  const [composers, notes, archive] = await Promise.all([
    getComposers(), getArticles(), getConcertArchive(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        <div className="burst bg-[var(--burst-lavender)] w-[500px] h-[500px] top-[-50px] -left-[100px]" />
        <div className="burst bg-[var(--burst-peach)] w-[400px] h-[400px] bottom-0 right-[-80px]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-[var(--accent-text)] text-xs font-semibold tracking-[0.4em] uppercase mb-6">
            Edinburgh University Chamber Orchestra
          </p>
          <h1 className="text-5xl md:text-7xl text-[var(--ink)] leading-[1.1] mb-8">
            Education<br /><em className="text-[var(--accent)]">Hub</em>
          </h1>
          <p className="text-lg text-[var(--ink-light)] leading-relaxed max-w-2xl mx-auto">
            An ever-growing collection of resources about the music we love &mdash;
            from composer biographies to our full concert archive.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Archive - full width */}
          <Link href="/archive"
            className="group relative p-8 md:p-10 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-500 md:col-span-2">
            <div className="burst bg-[var(--burst-mint)] w-[300px] h-[300px] -top-[80px] -right-[80px] opacity-40" />
            <div className="flex flex-col md:flex-row md:items-center gap-6 relative">
              <div className="flex-grow">
                <p className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-3">New</p>
                <h2 className="text-3xl text-[var(--ink)] mb-3">Concert Archive</h2>
                <p className="text-[var(--ink-muted)] leading-relaxed">
                  Browse {archive.length} past performances with programmes, notes, and gallery photos.
                </p>
              </div>
              <span className="text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all text-xl">→</span>
            </div>
          </Link>

          {/* Composers */}
          <Link href="/composers"
            className="group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-500">
            <p className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-3">Database</p>
            <h2 className="text-2xl text-[var(--ink)] mb-2">Composers</h2>
            <p className="text-[var(--ink-muted)] text-sm leading-relaxed mb-5">
              {composers.length} composers whose music has graced our concerts.
            </p>
            <div className="flex -space-x-2">
              {composers.slice(0, 4).map(c => (
                <div key={c.id} className="w-9 h-9 rounded-full bg-[var(--bg-warm)] border-2 border-[var(--bg-card)] overflow-hidden">
                  <img src={`/${c.imageUrl}`} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
              <div className="w-9 h-9 rounded-full bg-[var(--bg-warm)] border-2 border-[var(--bg-card)] flex items-center justify-center text-[10px] text-[var(--ink-muted)]">
                +{composers.length - 4}
              </div>
            </div>
            <span className="absolute bottom-8 right-8 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all text-xl">→</span>
          </Link>

          {/* Programme Notes */}
          <Link href="/programme-notes"
            className="group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-500">
            <p className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-3">Archive</p>
            <h2 className="text-2xl text-[var(--ink)] mb-2">Programme Notes</h2>
            <p className="text-[var(--ink-muted)] text-sm leading-relaxed mb-4">
              Insights into the works we perform.
            </p>
            {notes[0] && (
              <div className="p-3 rounded-lg bg-[var(--bg-warm)] border border-[var(--border)]">
                <p className="text-[10px] text-[var(--accent-text)] mb-1">Latest</p>
                <p className="text-sm text-[var(--ink)] font-medium line-clamp-1">{notes[0].title}</p>
              </div>
            )}
            <span className="absolute bottom-8 right-8 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all text-xl">→</span>
          </Link>

          {/* Articles */}
          <Link href="/articles"
            className="group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-500">
            <p className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-3">In depth</p>
            <h2 className="text-2xl text-[var(--ink)] mb-2">Articles</h2>
            <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
              Deep dives into specific works and the stories behind the notes.
            </p>
            <span className="absolute bottom-8 right-8 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all text-xl">→</span>
          </Link>

          {/* Learn */}
          <Link href="/learn"
            className="group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-500">
            <p className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-3">Discover</p>
            <h2 className="text-2xl text-[var(--ink)] mb-2">The Chamber Orchestra</h2>
            <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
              What makes it unique? The instruments, the history, the art.
            </p>
            <span className="absolute bottom-8 right-8 text-[var(--ink-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all text-xl">→</span>
          </Link>
        </div>
      </section>

      {/* Quote */}
      <section className="border-t border-b border-[var(--border)] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-6xl text-[var(--accent)]/20 leading-none font-['DM_Serif_Display']">&ldquo;</span>
          <p className="text-2xl md:text-3xl italic text-[var(--ink)] leading-relaxed -mt-6 font-['DM_Serif_Display']">
            Music is the shorthand of emotion.
          </p>
          <p className="text-[var(--ink-muted)] mt-6 text-sm tracking-widest uppercase">Leo Tolstoy</p>
        </div>
      </section>
    </>
  );
}
