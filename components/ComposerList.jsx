'use client';
import { useState } from 'react';

export default function ComposerList({ composers }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="space-y-2">
      {composers.map(c => {
        const isOpen = openId === c.id;
        return (
          <div key={c.id} className={`rounded-2xl border transition-all duration-300 ${
            isOpen ? 'border-[var(--accent)]/20 bg-[var(--accent-soft)]' : 'border-[var(--border)] bg-white hover:bg-[var(--bg-warm)]'
          }`}>
            <button onClick={() => setOpenId(isOpen ? null : c.id)}
              className="w-full flex items-center gap-4 p-4 md:p-5 text-left">
              <div className={`w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 transition-all ${
                isOpen ? 'border-[var(--accent)]' : 'border-[var(--border)]'
              }`}>
                <img src={`/${c.imageUrl}`} alt={c.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${isOpen ? '' : 'grayscale'}`} loading="lazy" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className={`text-lg md:text-xl transition-colors ${isOpen ? 'text-[var(--accent-text)]' : 'text-[var(--ink)]'}`}>
                  {c.name}
                </h3>
                <p className="text-sm text-[var(--ink-muted)]">{c.lifespan}</p>
              </div>
              <span className="hidden md:block text-xs text-[var(--ink-muted)] bg-[var(--bg-warm)] px-3 py-1 rounded-full flex-shrink-0">
                {c.piecesArray.length} works
              </span>
              <svg className={`w-5 h-5 text-[var(--ink-muted)] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
              <div className="accordion-inner">
                <div className="px-5 pb-5 pt-0">
                  <div className="h-px bg-[var(--border)] mb-5" />
                  <p className="text-[var(--ink-light)] leading-relaxed mb-6 text-sm md:text-base">{c.bio}</p>
                  <p className="text-xs text-[var(--accent-text)] font-bold tracking-[0.2em] uppercase mb-3">Key works</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                    {c.piecesArray.map((piece, i) => (
                      <p key={i} className="text-sm text-[var(--ink-light)] py-1 border-b border-[var(--border)]/50 last:border-0">{piece}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
