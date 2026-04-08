import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getConcertArchive, getConcertBySlug, getCleanImageUrl } from '@/lib/data';
import ConcertGallery from '@/components/ConcertGallery';

const FALLBACK = 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2670&auto=format&fit=crop';

export async function generateStaticParams() {
  return (await getConcertArchive()).map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = await getConcertBySlug(slug);
  if (!c) return { title: 'Not Found' };
  return { title: `${c.Title} — Archive`, description: `${c.Title} at ${c.Venue}, ${c.Date}` };
}

export default async function ConcertArchivePage({ params }) {
  const { slug } = await params;
  const concert = await getConcertBySlug(slug);
  if (!concert) notFound();

  const { Title, Date: dateStr, Programme, Description, Venue, ShowImage, photos, hasProgrammeNotes } = concert;
  const cover = getCleanImageUrl(ShowImage) || FALLBACK;
  const d = concert._dateObj;
  const fullDate = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const programmeList = Programme ? Programme.split(',').map(s => s.trim()) : [];

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <Image src={cover} alt={Title} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-white/30" />
        <div className="burst bg-[var(--burst-lavender)] w-[400px] h-[400px] bottom-[-100px] left-[-80px] opacity-60" />
        <Link href="/archive"
          className="absolute top-6 left-6 z-10 flex items-center gap-2 text-sm text-[var(--ink-light)] bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--border)] hover:text-[var(--ink)] transition-colors">
          ← Archive
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 max-w-4xl">
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--accent-text)] bg-[var(--accent-soft)] border border-[var(--accent)]/20 rounded-full mb-5">
            Archived concert
          </span>
          <h1 className="text-4xl md:text-5xl text-[var(--ink)] leading-tight mb-4">{Title}</h1>
          <div className="flex flex-wrap gap-3 text-[var(--ink-light)] text-base">
            <span>{fullDate}</span>
            <span className="text-[var(--border)]">·</span>
            <span>{Venue}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Programme */}
        {programmeList.length > 0 && (
          <section className="mb-14">
            <h2 className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-6">Programme</h2>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
              <ul className="space-y-4">
                {programmeList.map((piece, i) => (
                  <li key={i} className="flex items-start gap-4 border-b border-[var(--border)]/50 last:border-0 pb-4 last:pb-0">
                    <span className="text-[var(--accent)] text-sm font-mono mt-0.5 w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-lg italic text-[var(--ink-light)]">{piece}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Description */}
        {Description && (
          <section className="mb-14">
            <h2 className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-6">About</h2>
            <p className="text-[var(--ink-light)] text-lg leading-[1.9]">{Description}</p>
          </section>
        )}

        {/* Programme Notes */}
        {hasProgrammeNotes && (
          <section className="mb-14">
            <h2 className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-6">Programme notes</h2>
            <Link
              href={`/programme-notes/${concert.slug}`}
              className="group flex items-center gap-6 rounded-2xl border border-[var(--border)] bg-white p-8 md:p-10 hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-lg text-[var(--ink)] mb-1">Read the programme notes</p>
                <p className="text-sm text-[var(--ink-muted)]">Written notes exploring the music performed at this concert</p>
              </div>
              <span className="text-[var(--accent-text)] text-xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </section>
        )}

        {/* Gallery */}
        {photos.length > 0 && (
          <section className="mb-14">
            <h2 className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-6">Gallery</h2>
            <ConcertGallery photos={photos} title={Title} />
          </section>
        )}

        {/* Venue */}
        <section className="mb-14">
          <h2 className="text-[var(--accent-text)] text-xs font-bold tracking-[0.3em] uppercase mb-6">Venue</h2>
          <div className="rounded-2xl border border-[var(--border)] bg-white overflow-hidden">
            <div className="p-6">
              <p className="text-xl font-semibold text-[var(--ink)]">{Venue}</p>
              <p className="text-[var(--ink-muted)]">Edinburgh, Scotland</p>
            </div>
            {Venue?.includes('Reid') && (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2234!2d-3.1858!3d55.9468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887c7843fdb2547%3A0x9b2e5b8f7e9c2f3a!2sReid%20Concert%20Hall!5e0!3m2!1sen!2suk"
                width="100%" height="220" style={{ border: 0 }}
                allowFullScreen loading="lazy" title={`Map of ${Venue}`} />
            )}
          </div>
        </section>

        <div className="flex justify-between pt-8 border-t border-[var(--border)]">
          <Link href="/archive" className="text-[var(--accent)] hover:text-[var(--accent-text)] transition-colors">← Back to archive</Link>
          <a href="https://www.eu-co.co.uk/concerts" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">Upcoming concerts →</a>
        </div>
      </div>
    </article>
  );
}