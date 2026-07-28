import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Hub",
  description:
    "Explore EUCO's educational resources: a concert archive, a blog, a composer database, programme notes, articles, and information about the chamber orchestra.",
};

const hubSections = [
  { title: "Archive", description: "Every past concert — programme notes, hand-painted posters, photos, and recordings.", path: "/archive", color: "bg-pop-coral" },
  { title: "Blog", description: "Stories, composer spotlights, and behind-the-scenes writing.", path: "/blog", color: "bg-pop-sun" },
  { title: "Composers", description: "Explore the lives and works of key composers.", path: "/composers", color: "bg-pop-sky" },
  { title: "Programme Notes", description: "Notes and context on the repertoire we've performed.", path: "/programme-notes", color: "bg-pop-mint" },
  { title: "The Chamber Orchestra", description: "Discover the history and structure of a chamber orchestra.", path: "/learn", color: "bg-pop-violet" },
  { title: "Articles", description: "In-depth explorations of specific pieces and musical topics.", path: "/articles", color: "bg-pop-coral" },
];

export default function EducationHub() {
  return (
    <div className="relative overflow-hidden">
      {/* Soft decorative blobs — part of the bright, poster-like visual
          language this redesign uses throughout. */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-pop-sun/20 blob-shape blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-pop-sky/15 blob-shape blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6 pt-16 md:pt-24 pb-8 relative">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pop-coral/10 text-pop-coral font-display font-semibold text-sm mb-6">
            EUCO Education Hub
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-ink mb-6 leading-[1.05]">
            Learn, explore,<br />and look back.
          </h1>
          <p className="text-ink-soft text-lg leading-relaxed">
            An ever-growing collection of resources about the music we love. We&rsquo;d love your feedback&mdash;please{" "}
            <a href="https://eu-co.co.uk/contact-us/direct" className="text-pop-sky underline hover:text-pop-sky/70 font-semibold">
              get in touch
            </a>{" "}
            with any ideas.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hubSections.map((section) => (
            <Link
              key={section.path}
              href={section.path}
              className="group relative rounded-3xl bg-white border-2 border-ink/5 p-7 hover:border-transparent hover:shadow-2xl transition-all overflow-hidden"
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 ${section.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`} />
              <div className={`relative w-12 h-12 rounded-2xl ${section.color} mb-5`} />
              <h2 className="relative text-2xl font-display font-semibold text-ink mb-2">{section.title}</h2>
              <p className="relative text-ink-soft leading-relaxed mb-4">{section.description}</p>
              <span className="relative inline-flex items-center gap-1 font-display font-semibold text-ink group-hover:gap-2 transition-all">
                Explore <span aria-hidden>&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
