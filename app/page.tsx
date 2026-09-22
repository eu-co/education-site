import Link from "next/link";
import type { Metadata } from "next";
import PeriodArt from "@/components/PeriodArt";

export const metadata: Metadata = {
  title: "Education Hub",
  description:
    "Explore EUCO's educational resources: a concert archive, a composer map, a blog, programme notes, articles, and information about the chamber orchestra.",
};

// Everything else in the app hangs off these two: the Archive (concerts,
// posters, recordings, and the composers we've actually played) and the
// composer map (the wider, ever-growing picture of who these composers
// were, how they connected, and what they wrote — not limited to our
// own repertoire). Redesigned as a dashboard specifically so landing
// here feels like opening an app's home screen, not scrolling a list of
// links — see the two large PRIMARY_SECTIONS tiles below vs. the
// smaller secondary row underneath.
const PRIMARY_SECTIONS = [
  {
    title: "The Archive",
    description: "Every past concert, kept — programme notes, hand-painted posters, photos, and recordings. Plus every composer we've actually played.",
    path: "/archive",
    art: "hero-raphael.jpg",
    tone: "terracotta" as const,
  },
  {
    title: "Composer Map",
    description: "How composers met, worked, and influenced one another — plotted across time and place, from our own repertoire outward.",
    path: "/composers",
    art: "hero-caravaggio.jpg",
    tone: "ultramarine" as const,
  },
];

const SECONDARY_SECTIONS = [
  { title: "Blog", description: "Stories and behind-the-scenes writing.", path: "/blog" },
  { title: "Programme Notes", description: "Notes on repertoire we've performed.", path: "/programme-notes" },
  { title: "The Chamber Orchestra", description: "What a chamber orchestra actually is.", path: "/learn" },
  { title: "Articles", description: "Deep dives into specific pieces.", path: "/articles" },
];

export default function EducationHub() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-fresco-gold/20 blob-shape blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-fresco-ultramarine/15 blob-shape blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6 pt-16 md:pt-24 pb-10 relative">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pop-coral/10 text-pop-coral font-display font-semibold text-sm mb-6">
            EUCO Education Hub
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-ink mb-4 leading-[1.05]">
            Learn, explore,<br />and look back.
          </h1>
          <div className="fresco-rule w-20 mb-6" />
          <p className="text-ink-soft text-lg leading-relaxed">
            An ever-growing collection of resources about the music we love. We&rsquo;d love your feedback&mdash;please{" "}
            <a href="https://eu-co.co.uk/contact-us/direct" className="text-fresco-ultramarine underline hover:text-fresco-ultramarine/70 font-semibold">
              get in touch
            </a>{" "}
            with any ideas.
          </p>
        </div>
      </div>

      {/* Primary dashboard tiles -- the two things this app is actually
          for, given real visual weight rather than sitting in a 6-up grid
          alongside everything else. */}
      <div className="container mx-auto px-6 pb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRIMARY_SECTIONS.map((section) => (
            <Link
              key={section.path}
              href={section.path}
              className="group relative rounded-[2rem] overflow-hidden bg-white border-2 border-ink/5 hover:border-transparent hover:shadow-2xl transition-all"
            >
              <PeriodArt filename={section.art} alt="" tone={section.tone} className="h-48 w-full" />
              <div className="p-8">
                <h2 className="text-3xl font-display font-semibold text-ink mb-2">{section.title}</h2>
                <p className="text-ink-soft leading-relaxed mb-5">{section.description}</p>
                <span className="inline-flex items-center gap-1 font-display font-semibold text-ink group-hover:gap-2.5 transition-all">
                  Explore <span aria-hidden>&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Secondary row -- still one click away, just not competing for
          the same visual weight as the two primary sections above. */}
      <div className="container mx-auto px-6 pb-24 relative">
        <p className="text-xs font-display font-semibold text-ink-soft uppercase tracking-wide mb-4">More to explore</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECONDARY_SECTIONS.map((section) => (
            <Link
              key={section.path}
              href={section.path}
              className="group rounded-2xl bg-white border-2 border-ink/5 p-5 hover:border-fresco-gold/40 hover:shadow-lg transition-all"
            >
              <h3 className="font-display font-semibold text-ink mb-1">{section.title}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
