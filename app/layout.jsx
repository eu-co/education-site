import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import NavClient from '@/components/NavClient';

export const metadata = {
  metadataBase: new URL('https://education.eu-co.co.uk'),
  title: { default: 'EUCO Education', template: '%s — EUCO Education' },
  description: 'Educational resources from the Edinburgh University Chamber Orchestra.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'EducationalOrganization',
          name: 'EUCO Education Hub',
          parentOrganization: { '@type': 'MusicGroup', name: 'Edinburgh University Chamber Orchestra', url: 'https://www.eu-co.co.uk' },
        })}} />

        <NavClient />
        <main>{children}</main>

        {/* Footer */}
        <footer className="relative overflow-hidden border-t border-[var(--border)] mt-24">
          <div className="burst bg-[var(--burst-peach)] w-[400px] h-[400px] -bottom-[200px] -left-[100px]" />
          <div className="burst bg-[var(--burst-sky)] w-[300px] h-[300px] -bottom-[100px] right-[10%]" />
          <div className="relative max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row justify-between gap-12">
              <div className="max-w-sm">
                <p className="font-['DM_Serif_Display'] text-xl text-[var(--ink)] mb-3">EUCO Education</p>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                  An ever-growing collection of resources about the music we love, curated by members of the Edinburgh University Chamber Orchestra.
                </p>
              </div>
              <div className="flex gap-12 text-sm">
                <div>
                  <p className="font-semibold text-[var(--ink)] mb-4">Explore</p>
                  <div className="space-y-2.5 text-[var(--ink-muted)]">
                    <Link href="/archive" className="block hover:text-[var(--accent)] transition-colors">Concert Archive</Link>
                    <Link href="/composers" className="block hover:text-[var(--accent)] transition-colors">Composers</Link>
                    <Link href="/programme-notes" className="block hover:text-[var(--accent)] transition-colors">Programme Notes</Link>
                    <Link href="/articles" className="block hover:text-[var(--accent)] transition-colors">Articles</Link>
                    <Link href="/learn" className="block hover:text-[var(--accent)] transition-colors">Learn</Link>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-[var(--ink)] mb-4">Orchestra</p>
                  <div className="space-y-2.5 text-[var(--ink-muted)]">
                    <a href="https://www.eu-co.co.uk" className="block hover:text-[var(--accent)] transition-colors">Main Site</a>
                    <a href="https://www.eu-co.co.uk/concerts" className="block hover:text-[var(--accent)] transition-colors">Concerts</a>
                    <a href="https://www.instagram.com/edunichamberorchestra/" className="block hover:text-[var(--accent)] transition-colors">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-6 border-t border-[var(--border)] text-center text-xs text-[var(--ink-muted)]">
              © {new Date().getFullYear()} Edinburgh University Chamber Orchestra
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
