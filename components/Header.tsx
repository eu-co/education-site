import Link from "next/link";
import InlineSvg from "./InlineSvg";

// The original education pages had no header of their own — they relied on
// the main site's shared <Header> persisting across client-side route
// changes in the same single-page app. Now that this is a genuinely
// separate deployment (its own subdomain, its own container), that's no
// longer available, so a small header of its own is needed for
// cross-navigation back to eu-co.co.uk.
const MAIN_SITE_URL = "https://eu-co.co.uk";

const links = [
  { href: "/", label: "Education Hub" },
  { href: "/composers", label: "Composers" },
  { href: "/programme-notes", label: "Programme Notes" },
  { href: "/learn", label: "Learn" },
  { href: "/articles", label: "Articles" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href={MAIN_SITE_URL} className="flex items-center gap-3 shrink-0" aria-label="Back to eu-co.co.uk">
          <span className="h-9 w-9 text-blue-400 [&>svg]:h-full [&>svg]:w-full">
            <InlineSvg name="euco-logo" />
          </span>
          <span className="hidden sm:inline text-sm text-gray-400">&larr; eu-co.co.uk</span>
        </a>
        <nav className="flex gap-4 overflow-x-auto text-sm font-semibold">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
