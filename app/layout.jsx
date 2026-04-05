import './globals.css';

export const metadata = {
  metadataBase: new URL('https://education.eu-co.co.uk'),
  title: { default: 'EUCO Education', template: '%s — EUCO Education' },
  description: 'Educational resources from the Edinburgh University Chamber Orchestra. Explore composers, programme notes, and the world of chamber music.',
  openGraph: { type: 'website', locale: 'en_GB', siteName: 'EUCO Education Hub' },
  other: { 'geo.region': 'GB-SCT', 'geo.placename': 'Edinburgh' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'EUCO Education Hub',
            parentOrganization: { '@type': 'MusicGroup', name: 'Edinburgh University Chamber Orchestra', url: 'https://www.eu-co.co.uk' },
            areaServed: { '@type': 'Place', name: 'Edinburgh, Scotland' },
          })}}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// ── Header ──────────────────────────────────────────────────────────────────

import Link from 'next/link';
import NavClient from '@/components/NavClient';

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-warm-black)]/95 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-[var(--color-amber)] flex items-center justify-center text-[var(--color-amber)] text-xs font-bold tracking-widest group-hover:bg-[var(--color-amber)] group-hover:text-black transition-all duration-300">
            E
          </div>
          <div className="leading-tight">
            <span className="text-[var(--color-cream)] font-semibold text-sm tracking-wide">EUCO</span>
            <span className="block text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">Education</span>
          </div>
        </Link>
        <NavClient />
      </nav>
    </header>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <p className="font-['Playfair_Display'] text-xl text-[var(--color-cream)] mb-3">EUCO Education</p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            An ever-growing collection of resources about the music we love, curated by members of the Edinburgh University Chamber Orchestra.
          </p>
        </div>
        <div className="flex gap-12 text-sm">
          <div>
            <p className="text-[var(--color-amber)] font-semibold tracking-widest uppercase text-xs mb-4">Explore</p>
            <div className="space-y-2 text-[var(--color-text-muted)]">
              <Link href="/composers" className="block hover:text-[var(--color-cream)] transition-colors">Composers</Link>
              <Link href="/programme-notes" className="block hover:text-[var(--color-cream)] transition-colors">Programme Notes</Link>
              <Link href="/articles" className="block hover:text-[var(--color-cream)] transition-colors">Articles</Link>
              <Link href="/learn" className="block hover:text-[var(--color-cream)] transition-colors">Learn</Link>
            </div>
          </div>
          <div>
            <p className="text-[var(--color-amber)] font-semibold tracking-widest uppercase text-xs mb-4">Orchestra</p>
            <div className="space-y-2 text-[var(--color-text-muted)]">
              <a href="https://www.eu-co.co.uk" className="block hover:text-[var(--color-cream)] transition-colors">Main Site</a>
              <a href="https://www.eu-co.co.uk/concerts/upcoming" className="block hover:text-[var(--color-cream)] transition-colors">Concerts</a>
              <a href="https://www.instagram.com/edunichamberorchestra/" className="block hover:text-[var(--color-cream)] transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-6 text-center text-xs text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} Edinburgh University Chamber Orchestra
      </div>
    </footer>
  );
}
