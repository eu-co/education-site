'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Hub', path: '/' },
  { name: 'Composers', path: '/composers' },
  { name: 'Programme Notes', path: '/programme-notes' },
  { name: 'Articles', path: '/articles' },
  { name: 'Learn', path: '/learn' },
];

export default function NavClient() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-1">
        {links.map(l => (
          <Link key={l.path} href={l.path}
            className={`px-3 py-1.5 rounded text-sm transition-all duration-200 ${
              pathname === l.path
                ? 'text-[var(--color-amber)] bg-[var(--color-amber)]/10'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-cream)]'
            }`}>
            {l.name}
          </Link>
        ))}
        <a href="https://www.eu-co.co.uk" className="ml-3 pl-3 border-l border-[var(--color-border)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-cream)] transition-colors">
          ← Main Site
        </a>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-[var(--color-cream)] p-1" aria-label="Menu">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 8h16M4 16h16'} />
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--color-warm-black)] border-b border-[var(--color-border)] p-6 space-y-3">
          {links.map(l => (
            <Link key={l.path} href={l.path}
              className={`block py-2 text-sm ${pathname === l.path ? 'text-[var(--color-amber)]' : 'text-[var(--color-text-muted)]'}`}>
              {l.name}
            </Link>
          ))}
          <a href="https://www.eu-co.co.uk" className="block py-2 text-sm text-[var(--color-text-muted)] border-t border-[var(--color-border)] mt-3 pt-4">
            ← Back to main site
          </a>
        </div>
      )}
    </>
  );
}
