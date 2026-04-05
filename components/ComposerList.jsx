'use client';

import { useState } from 'react';

export default function ComposerList({ composers }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="space-y-2">
      {composers.map(c => {
        const isOpen = openId === c.id;
        return (
          <div key={c.id} className={`rounded-xl border transition-all duration-300 ${
            isOpen
              ? 'border-[var(--color-amber-dim)] bg-[var(--color-card)]'
              : 'border-[var(--color-border)] bg-transparent hover:bg-[var(--color-card)]/50'
          }`}>
            <button
              onClick={() => setOpenId(isOpen ? null : c.id)}
              className="w-full flex items-center gap-4 p-4 md:p-5 text-left"
            >
              {/* Portrait */}
              <div className={`w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                isOpen ? 'border-[var(--color-amber)]' : 'border-[var(--color-border)]'
              }`}>
                <img
                  src={`/${c.imageUrl}`}
                  alt={c.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isOpen ? '' : 'grayscale'
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Name and dates */}
              <div className="flex-grow min-w-0">
                <h3 className={`font-['Playfair_Display'] text-lg md:text-xl transition-colors duration-300 ${
                  isOpen ? 'text-[var(--color-amber-light)]' : 'text-[var(--color-cream)]'
                }`}>
                  {c.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">{c.lifespan}</p>
              </div>

              {/* Piece count badge */}
              <span className="hidden md:block text-xs text-[var(--color-text-muted)] bg-[var(--color-parchment)] px-3 py-1 rounded-full flex-shrink-0">
                {c.piecesArray.length} works
              </span>

              {/* Chevron */}
              <svg
                className={`w-5 h-5 text-[var(--color-text-muted)] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expandable content */}
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
              <div className="accordion-inner">
                <div className="px-5 pb-5 pt-0">
                  {/* Divider */}
                  <div className="h-px bg-[var(--color-border)] mb-5" />

                  {/* Bio */}
                  <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 text-sm md:text-base">
                    {c.bio}
                  </p>

                  {/* Pieces */}
                  <div>
                    <p className="text-xs text-[var(--color-amber)] font-bold tracking-[0.2em] uppercase mb-3">
                      Key works for chamber orchestra
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                      {c.piecesArray.map((piece, i) => (
                        <p key={i} className="text-sm text-[var(--color-cream)]/80 py-1 border-b border-[var(--color-border)]/30 last:border-0">
                          {piece}
                        </p>
                      ))}
                    </div>
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
