"use client";

import { useState } from "react";
import type { Composer } from "@/data/education";

export default function ComposerAccordion({ composers }: { composers: Composer[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {composers.map((composer) => {
        const isOpen = openId === composer.id;
        return (
          <div key={composer.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : composer.id)}
              className="w-full p-6 flex items-center space-x-6 text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={composer.imageUrl}
                alt={composer.name}
                className="w-24 h-24 rounded-full flex-shrink-0 object-cover"
              />
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-blue-400 font-display">{composer.name}</h3>
                <p className="text-gray-400">{composer.lifespan}</p>
                <p className="text-gray-300 mt-2 hidden md:block">{composer.bio}</p>
              </div>
              <span className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                <svg className="w-8 h-8 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div className={`faq-answer ${isOpen ? "open" : ""}`}>
              <div className="p-6 pt-0">
                <p className="text-gray-300 mt-2 md:hidden">{composer.bio}</p>
                <h4 className="font-bold text-white mt-4 mb-2">Key Works for Chamber Orchestra:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {composer.pieces.map((piece) => (
                    <li key={piece}>{piece}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
