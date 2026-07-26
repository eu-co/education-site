
"use client";

import { useState, useEffect, useRef } from "react";
import Section from "@/components/Section";

// Ported from src/pages/education/LearnPage.js — same scroll-linked
// "instruments peel away" effect, same placehold.co filler images the
// original already used (nothing to swap here, it was already a
// placeholder). ScrollingImage.js's parallax banner is simplified to a
// plain full-width image, since the scroll-linked slide-out was a minor
// visual flourish rather than the point of the page.
const instruments = [
  { name: "Flute", zIndex: 1, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Flute" },
  { name: "Viola", zIndex: 4, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Viola" },
  { name: "Clarinet", zIndex: 2, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Clarinet" },
  { name: "Oboe", zIndex: 1, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Oboe" },
  { name: "Bassoon", zIndex: 1, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Bassoon" },
  { name: "Violin", zIndex: 3, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Violin" },
  { name: "French Horn", zIndex: 1, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=French+Horn" },
  { name: "Double Bass", zIndex: 4, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Double+Bass" },
  { name: "Cello", zIndex: 5, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Cello" },
  { name: "Timpani", zIndex: 5, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Timpani" },
  { name: "Trombone", zIndex: 5, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Trombone" },
  { name: "Harp", zIndex: 5, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Harp" },
  { name: "Trumpet", zIndex: 5, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Trumpet" },
  { name: "Chamber Orchestra", zIndex: 5, img: "https://placehold.co/300x200/1a1a1a/3ab3ff?text=Chamber+Orchestra" },
];

export default function LearnPageContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = animationContainerRef.current;
      if (!container) return;
      const { top, height } = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = 1 - (top + height) / (viewportHeight + height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInstrumentStyle = (index: number): React.CSSProperties => {
    const totalInstruments = instruments.length;
    const triggerPoint = (index / (totalInstruments - 1)) * 0.8;

    if (scrollProgress < triggerPoint) {
      return { opacity: 1, transform: "translate(0, 0) rotate(0deg)" };
    }

    const animationProgress = (scrollProgress - triggerPoint) / (1 - triggerPoint);
    const opacity = 1 - animationProgress * 2;
    let transform = "";
    if (index % 4 === 0) {
      transform = `translateX(${-animationProgress * 150}%) rotate(${-animationProgress * 45}deg)`;
    } else if (index % 4 === 1) {
      transform = `translateX(${animationProgress * 150}%) rotate(${animationProgress * 45}deg)`;
    } else if (index % 4 === 2) {
      transform = `translateY(${-animationProgress * 150}%) scale(${1 - animationProgress})`;
    } else {
      transform = `translateY(${animationProgress * 150}%) scale(${1 - animationProgress})`;
    }
    return { opacity, transform };
  };

  return (
    <>
      <Section title="What is a Chamber Orchestra?" className="pt-8">
        <div className="max-w-4xl mx-auto text-center text-lg text-gray-300 leading-relaxed">
          <p>
            A chamber orchestra is a smaller orchestra, typically consisting of around 15 to 45 musicians. This
            smaller size allows for a more intimate and detailed performance, where each instrument&rsquo;s voice
            can be clearly heard.
          </p>
          <p className="mt-4">As you scroll, you&rsquo;ll see the layers of a typical chamber orchestra peel away.</p>
        </div>
      </Section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1465847899078-b29dedca9424?q=80&w=2670&auto=format&fit=crop"
        alt="The layout of a chamber orchestra"
        className="w-full h-[40vh] object-cover"
      />

      <div ref={animationContainerRef} className="relative h-[200vh] w-full">
        <div className="sticky top-1/4 h-screen">
          {instruments.map((instrument, index) =>
            index > 0 ? (
              <div
                key={instrument.name}
                className="absolute w-full h-full flex justify-center items-center transition-transform duration-100 ease-out"
                style={{ zIndex: instrument.zIndex, ...getInstrumentStyle(index) }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={instrument.img} alt={instrument.name} className="max-w-xs md:max-w-md rounded-lg shadow-2xl" />
              </div>
            ) : null
          )}
          <div className="absolute w-full h-full flex justify-center items-center" style={{ zIndex: instruments[0].zIndex }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={instruments[0].img} alt={instruments[0].name} className="max-w-xs md:max-w-md rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>

      <Section title="Much more to come soon...">
        <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed">
          <p>We are working hard to improve our website right now. Stay tuned for updates!</p>
        </div>
      </Section>
    </>
  );
}
