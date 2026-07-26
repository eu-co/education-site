import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Hub",
  description:
    "Explore EUCO's educational resources, including a composer database, programme notes, articles, and information about the chamber orchestra.",
};

// Ported from src/pages/education/EducationHub.js. The original used
// react-scroll's <ScrollLink> for smooth same-page anchor navigation with a
// header-offset and scroll-spy highlighting — simplified here to plain
// anchor links with scroll-margin-top (CSS handles the header-offset part;
// scroll-spy highlighting is dropped as a minor, non-essential polish item).
const hubSections = [
  { id: "composers", title: "Composers", description: "Explore the lives and works of key composers.", path: "/composers" },
  { id: "programme-notes", title: "Programme Notes", description: "Read our notes from past concerts to learn more about the repertoire.", path: "/programme-notes" },
  { id: "learn", title: "The Chamber Orchestra", description: "Discover the history and structure of a chamber orchestra.", path: "/learn" },
  { id: "articles", title: "Articles", description: "In-depth explorations of specific pieces and musical topics.", path: "/articles" },
];

export default function EducationHub() {
  return (
    <div className="container mx-auto px-6 pb-20 pt-16 md:pt-20 md:grid md:grid-cols-3 md:gap-16">
      <aside className="md:col-span-1 md:sticky md:top-24 h-full mb-12 md:mb-0">
        <h1 className="text-4xl font-bold text-white font-display">Education Hub</h1>
        <p className="mt-4 text-gray-400">
          An ever-growing collection of resources about the music we love. We&rsquo;d love your feedback&mdash;please{" "}
          <a href="https://eu-co.co.uk/contact-us/direct" className="text-blue-400 underline hover:text-blue-300">
            get in touch
          </a>{" "}
          with any ideas.
        </p>
        <nav className="mt-8">
          <ul className="space-y-4">
            {hubSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-lg text-gray-300 hover:text-blue-400 transition-colors font-semibold cursor-pointer"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="md:col-span-2 space-y-24">
        {hubSections.map((section) => (
          <div key={section.id} id={section.id} className="p-8 rounded-lg bg-gray-800 shadow-2xl scroll-mt-24">
            <h2 className="text-3xl font-bold text-blue-400 font-display">{section.title}</h2>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">{section.description}</p>
            <Link
              href={section.path}
              className="mt-6 inline-block font-bold text-white bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-500 transition-colors"
            >
              Explore &rarr;
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
