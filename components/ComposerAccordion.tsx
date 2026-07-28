"use client";

import { useState } from "react";
import type { Composer } from "@/lib/directus";
import { getCleanImageUrl } from "@/lib/directus";

export default function ComposerAccordion({ composers }: { composers: Composer[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {composers.map((composer) => {
        const isOpen = openId === composer.id;
        const pieces = composer.pieces ? composer.pieces.split("\n").filter(Boolean) : [];
        return (
          <div key={composer.id} className="bg-white border-2 border-ink/5 rounded-3xl overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : composer.id)}
              className="w-full p-6 flex items-center space-x-6 text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getCleanImageUrl(composer.image)}
                alt={composer.name}
                className="w-20 h-20 rounded-full flex-shrink-0 object-cover border-2 border-pop-sky/20"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-display font-semibold text-ink">{composer.name}</h3>
                <p className="text-ink-soft text-sm">{composer.lifespan}</p>
                <p className="text-ink-soft mt-2 hidden md:block">{composer.bio}</p>
              </div>
              <span className={`transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                <svg className="w-6 h-6 text-pop-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div className={`faq-answer ${isOpen ? "open" : ""}`}>
              <div className="p-6 pt-0">
                <p className="text-ink-soft mt-2 md:hidden">{composer.bio}</p>
                {pieces.length > 0 && (
                  <>
                    <h4 className="font-display font-semibold text-ink mt-4 mb-2">Key Works for Chamber Orchestra:</h4>
                    <ul className="list-disc list-inside text-ink-soft space-y-1">
                      {pieces.map((piece) => (
                        <li key={piece}>{piece}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
