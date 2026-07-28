import Link from "next/link";
import InlineSvg from "./InlineSvg";

const MAIN_SITE_URL = "https://eu-co.co.uk";

const links = [
  { href: "/", label: "Hub", color: "text-ink" },
  { href: "/archive", label: "Archive", color: "text-pop-coral" },
  { href: "/blog", label: "Blog", color: "text-pop-sun" },
  { href: "/composers", label: "Composers", color: "text-pop-sky" },
  { href: "/programme-notes", label: "Programme Notes", color: "text-pop-mint" },
  { href: "/learn", label: "Learn", color: "text-pop-violet" },
  { href: "/articles", label: "Articles", color: "text-pop-coral" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-ink/5 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href={MAIN_SITE_URL} className="flex items-center gap-2 shrink-0 group" aria-label="Back to eu-co.co.uk">
          <span className="h-9 w-9 text-ink group-hover:text-pop-coral transition-colors [&>svg]:h-full [&>svg]:w-full">
            <InlineSvg name="euco-logo" />
          </span>
          <span className="hidden sm:inline text-xs text-ink-soft font-semibold">&larr; eu-co.co.uk</span>
        </a>
        <nav className="flex gap-1 sm:gap-2 overflow-x-auto text-sm font-display font-semibold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors hover:bg-paper-warm ${link.color}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
