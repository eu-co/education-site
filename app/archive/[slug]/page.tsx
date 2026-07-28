import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArchiveConcerts, getArchiveConcertBySlug, getCleanImageUrl } from "@/lib/directus";

export async function generateStaticParams() {
  const concerts = await getArchiveConcerts();
  return concerts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const concert = await getArchiveConcertBySlug(slug);
  if (!concert) return { title: "Not found" };
  return {
    title: concert.Title,
    description: concert.Description || concert.ArchiveNotes || `Archive materials for ${concert.Title}.`,
  };
}

// Extracts a YouTube video ID from any common URL shape, for embedding
// rather than just linking out. Falls back to a plain link for anything
// else (Vimeo, unrecognised formats) rather than guessing.
function getYouTubeEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default async function ArchiveConcertPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concert = await getArchiveConcertBySlug(slug);
  if (!concert) notFound();

  const date = new Date(concert.Date);
  const programmeItems = concert.Programme
    ? concert.Programme.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const embedUrl = getYouTubeEmbedUrl(concert.VideoUrl);
  const gallery = concert.Gallery || [];

  return (
    <article className="container mx-auto px-6 py-16 max-w-4xl">
      <Link href="/archive" className="text-pop-coral font-display font-semibold text-sm hover:underline">
        &larr; All archived concerts
      </Link>

      <div className="mt-6 mb-10">
        <p className="text-pop-coral font-display font-semibold uppercase tracking-wide text-sm mb-2">
          {date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          {concert.Time && ` \u2022 ${concert.Time}`}
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink mb-2">{concert.Title}</h1>
        {concert.Venue && <p className="text-ink-soft text-lg">{concert.Venue}{concert.City && `, ${concert.City}`}</p>}
      </div>

      {concert.PosterImage && (
        <div className="relative w-full aspect-[3/4] max-w-md mx-auto mb-10 rounded-3xl overflow-hidden shadow-xl rotate-1">
          <Image src={getCleanImageUrl(concert.PosterImage)} alt={`${concert.Title} poster`} fill className="object-cover" />
        </div>
      )}

      {concert.Description && <p className="text-ink-soft text-lg leading-relaxed mb-8">{concert.Description}</p>}

      {programmeItems.length > 0 && (
        <div className="bg-pop-sun/10 border-2 border-pop-sun/20 rounded-3xl p-6 mb-8">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-ink mb-4">Programme</h2>
          <ul className="space-y-2">
            {programmeItems.map((piece) => <li key={piece} className="text-ink">{piece}</li>)}
          </ul>
        </div>
      )}

      {concert.ProgrammeNotesPdf && (
        <a
          href={getCleanImageUrl(concert.ProgrammeNotesPdf)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-pop-mint text-white font-display font-semibold rounded-full hover:opacity-90 transition-opacity mb-8"
        >
          Read the full programme notes (PDF)
        </a>
      )}

      {embedUrl && (
        <div className="mb-8">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-ink-soft mb-3">Recording</h2>
          <div className="aspect-video rounded-3xl overflow-hidden shadow-lg">
            <iframe src={embedUrl} className="w-full h-full" allowFullScreen title={`${concert.Title} recording`} />
          </div>
        </div>
      )}
      {!embedUrl && concert.VideoUrl && (
        <a href={concert.VideoUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-pop-sky underline mb-8">
          Watch the recording &rarr;
        </a>
      )}

      {gallery.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-ink-soft mb-3">Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.map((g) => (
              <div key={g.directus_files_id} className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src={getCleanImageUrl(g.directus_files_id)} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {concert.ArchiveNotes && (
        <div className="prose prose-lg max-w-none text-ink-soft mb-8" dangerouslySetInnerHTML={{ __html: concert.ArchiveNotes }} />
      )}

      {concert.TicketLink && (
        <p className="text-sm text-ink-soft mt-10 pt-6 border-t border-ink/10">
          Ticket link from the original listing: <a href={concert.TicketLink} className="text-pop-sky underline">{concert.TicketLink}</a>
        </p>
      )}
    </article>
  );
}
