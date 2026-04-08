import { notFound } from 'next/navigation';
import { getConcertsWithNotes, getProgrammeBySlug } from '@/lib/data';
import Link from 'next/link';
import ProgrammeReader from '@/components/ProgrammeReader';

export async function generateStaticParams() {
  const concerts = await getConcertsWithNotes();
  return concerts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const concert = await getProgrammeBySlug(slug);
  if (!concert) return { title: 'Not Found' };
  return { title: `${concert.Title} — Programme Notes` };
}

export default async function ProgrammeSlugPage({ params }) {
  const { slug } = await params;
  const concert = await getProgrammeBySlug(slug);

  if (!concert) notFound();

  return (
    <article className="min-h-screen bg-white">
      {/* Back button floating over the dark cover header */}
      <div className="absolute top-8 left-8 z-50">
        <Link 
          href="/programme-notes" 
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold tracking-widest uppercase transition-all"
        >
          ← Back
        </Link>
      </div>

      {/* PDF Reader — cover hero + content pages */}
      <ProgrammeReader pdfUrl={concert.programmeNotesPdfUrl} title={concert.Title} />
      
      {/* Footer link back to the concert archive page */}
      <div className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <Link
          href={`/archive/${concert.slug}`}
          className="inline-flex items-center gap-2 text-sm text-[var(--accent-text)] hover:text-[var(--accent)] transition-colors"
        >
          View full concert page for {concert.Title} →
        </Link>
      </div>
    </article>
  );
}