import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getArchiveConcerts, getCleanImageUrl } from "@/lib/directus";

export const metadata: Metadata = {
  title: "Concert Archive",
  description: "Every past EUCO concert, with programme notes, posters, photos and recordings where available.",
};

// Every past concert automatically gets an archive entry here — this page
// doesn't need separate "add an archive item" work from committee, it's
// driven directly by the same "concerts" collection the main site uses.
// Whatever archive-specific fields (poster, gallery, PDF, video) have been
// filled in for a given concert just show up on its detail page; nothing
// here needs updating when a new one is added.
export default async function ArchivePage() {
  const concerts = await getArchiveConcerts();

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-pop-coral/10 text-pop-coral font-display font-semibold text-sm mb-4">
          The Archive
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink mb-4">
          Every concert, kept
        </h1>
        <p className="text-ink-soft text-lg">
          Programme notes, hand-painted posters, photos, and recordings from every EUCO concert we have on record.
        </p>
      </div>

      {concerts.length === 0 ? (
        <p className="text-center text-ink-soft">Nothing archived yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {concerts.map((concert) => {
            const date = new Date(concert.Date);
            const hasExtras = concert.PosterImage || concert.ProgrammeNotesPdf || (concert.Gallery && concert.Gallery.length > 0) || concert.VideoUrl;
            return (
              <Link
                key={concert.id}
                href={`/archive/${concert.slug}`}
                className="group block rounded-3xl overflow-hidden bg-white border-2 border-ink/5 hover:border-pop-coral/40 hover:shadow-xl transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-pop-coral/10">
                  <Image
                    src={getCleanImageUrl(concert.PosterImage || concert.Image)}
                    alt={concert.Title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {hasExtras && (
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-pop-coral text-xs font-display font-semibold px-3 py-1 rounded-full">
                      Full archive
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-display font-semibold text-pop-coral uppercase tracking-wide mb-1">
                    {date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <h2 className="text-lg font-display font-semibold text-ink leading-snug">{concert.Title}</h2>
                  {concert.Venue && <p className="text-ink-soft text-sm mt-1">{concert.Venue}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
