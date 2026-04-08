'use client';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

function Lightbox({ photos, index, onClose, onNext, onPrev }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onNext(); if (e.key === 'ArrowLeft') onPrev(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div className="absolute top-6 left-6 text-white/50 text-sm font-mono">{index + 1} / {photos.length}</div>
      <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4" onClick={e => e.stopPropagation()}>
        <Image src={photos[index]} alt={`Photo ${index + 1}`} fill sizes="100vw" className="object-contain" priority />
      </div>
      {photos.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}
    </div>
  );
}

function GalleryImage({ src, alt, className, onClick }) {
  return (
    <button onClick={onClick} className={`relative overflow-hidden rounded-2xl group cursor-pointer border border-[var(--border)] ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/5 transition-colors duration-500" />
      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </button>
  );
}

export default function ConcertGallery({ photos, title }) {
  const [idx, setIdx] = useState(null);
  const open = useCallback((i) => setIdx(i), []);
  const close = useCallback(() => setIdx(null), []);
  const next = useCallback(() => setIdx(i => (i + 1) % photos.length), [photos.length]);
  const prev = useCallback(() => setIdx(i => (i - 1 + photos.length) % photos.length), [photos.length]);

  if (!photos.length) return null;
  const alt = (i) => `${title} — photo ${i + 1}`;

  const layouts = {
    1: <GalleryImage src={photos[0]} alt={alt(0)} className="h-[400px] w-full" onClick={() => open(0)} />,
    2: <div className="grid grid-cols-2 gap-3">{photos.map((s, i) => <GalleryImage key={i} src={s} alt={alt(i)} className="h-[300px]" onClick={() => open(i)} />)}</div>,
    3: <div className="grid grid-cols-2 gap-3"><GalleryImage src={photos[0]} alt={alt(0)} className="h-[380px] col-span-2 md:col-span-1 md:row-span-2" onClick={() => open(0)} /><GalleryImage src={photos[1]} alt={alt(1)} className="h-[185px]" onClick={() => open(1)} /><GalleryImage src={photos[2]} alt={alt(2)} className="h-[185px]" onClick={() => open(2)} /></div>,
    4: <div className="grid grid-cols-2 gap-3">{photos.map((s, i) => <GalleryImage key={i} src={s} alt={alt(i)} className="h-[230px]" onClick={() => open(i)} />)}</div>,
    5: <div className="grid grid-cols-4 gap-3"><GalleryImage src={photos[0]} alt={alt(0)} className="h-[300px] col-span-4 md:col-span-2 md:row-span-2" onClick={() => open(0)} />{photos.slice(1).map((s, i) => <GalleryImage key={i+1} src={s} alt={alt(i+1)} className="h-[145px] col-span-2 md:col-span-1" onClick={() => open(i+1)} />)}</div>,
    6: <div className="grid grid-cols-4 gap-3"><GalleryImage src={photos[0]} alt={alt(0)} className="h-[320px] col-span-4 md:col-span-2" onClick={() => open(0)} /><GalleryImage src={photos[1]} alt={alt(1)} className="h-[320px] col-span-4 md:col-span-2" onClick={() => open(1)} />{photos.slice(2).map((s, i) => <GalleryImage key={i+2} src={s} alt={alt(i+2)} className="h-[170px] col-span-2 md:col-span-1" onClick={() => open(i+2)} />)}</div>,
  };

  return (
    <>
      {layouts[Math.min(photos.length, 6)]}
      {idx !== null && <Lightbox photos={photos} index={idx} onClose={close} onNext={next} onPrev={prev} />}
    </>
  );
}
