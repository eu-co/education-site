'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Hub', path: '/' },
  { name: 'Archive', path: '/archive' },
  { name: 'Composers', path: '/composers' },
  { name: 'Notes', path: '/programme-notes' },
  { name: 'Articles', path: '/articles' },
  { name: 'Learn', path: '/learn' },
];

export default function NavClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  }, [pathname]);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 180 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const toggle = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.classList.toggle('menu-open', next);
  };
  const close = () => { setMenuOpen(false); document.body.classList.remove('menu-open'); };

  return (
    <>
      {/* ── Header bar ────────────────────────────────────────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className={`transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-lg shadow-[0_1px_0_var(--border)]' : 'bg-transparent'
        }`}>
          <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 z-10">
              <Image
                src="/favicon/icon.png" /* Replace with the exact filename in your public folder */
                alt="EUCO Education Logo"
                width={48} /* 32px matches Tailwind's w-8 and so on*/
                height={48} /* 32px matches Tailwind's h-8 and so on*/
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <div className="leading-tight">
                <span className="font-semibold text-sm text-[var(--ink)]">EUCO</span>
                <span className="block text-[10px] tracking-[0.25em] uppercase text-[var(--ink-muted)]">Education</span>
              </div>
            </Link>

            {/* Desktop inline links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(l => (
                <Link key={l.path} href={l.path}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === l.path
                      ? 'text-[var(--accent-text)] bg-[var(--accent-soft)]'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-warm)]'
                  }`}>
                  {l.name}
                </Link>
              ))}
              <a href="https://www.eu-co.co.uk"
                className="ml-2 pl-2 border-l border-[var(--border)] px-3 py-1.5 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                Main Site ↗
              </a>
            </div>

            {/* Menu button */}
            <button onClick={toggle} aria-label="Menu"
              className="z-10 flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-white/80 backdrop-blur-sm hover:bg-[var(--bg-warm)] transition-all text-sm md:ml-3">
              <span className="hidden sm:inline text-xs font-medium tracking-wider uppercase text-[var(--ink)]">Menu</span>
              <svg className="w-4 h-4 text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* ── Floating pill (when header is hidden) ─────────────────────── */}
      <button onClick={toggle} aria-label="Menu"
        className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-lg shadow-black/8 border border-[var(--border)] hover:shadow-xl transition-all duration-300 ${
          hidden && !menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}>
        <span className="text-xs font-medium tracking-wider uppercase text-[var(--ink)]">Menu</span>
        <svg className="w-4 h-4 text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
        </svg>
      </button>

      {/* ── Full-page overlay menu ────────────────────────────────────── */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
        <button onClick={close} aria-label="Close"
          className="absolute top-5 right-5 z-10 w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--bg-warm)] transition-colors">
          <svg className="w-5 h-5 text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <Link href="/" onClick={close} className="absolute top-5 left-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold">E</div>
          <span className="font-semibold text-sm text-[var(--ink)]">EUCO Education</span>
        </Link>

        <div className="burst bg-[var(--burst-rose)] w-[300px] h-[300px] -top-[50px] -right-[80px]" />
        <div className="burst bg-[var(--burst-lavender)] w-[250px] h-[250px] bottom-[10%] -left-[60px]" />
        <div className="burst bg-[var(--burst-sky)] w-[200px] h-[200px] top-[40%] right-[10%]" />

        <nav className="relative z-10 text-center">
          {links.map(l => (
            <Link key={l.path} href={l.path} onClick={close}>{l.name}</Link>
          ))}
          <a href="https://www.eu-co.co.uk" className="!text-[var(--ink-muted)] !text-xl">
            ← Main Site
          </a>
        </nav>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
