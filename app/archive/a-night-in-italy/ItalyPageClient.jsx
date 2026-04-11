'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Configuration ──────────────────────────────────────────────────────────
const HERO_VIDEO_SRC = '/videos/italy-hero.mp4';
const SPOTIFY_TRACK_URI = '3aCaBL6CeYdvZkVqQTPcPp';
const HERO_IMAGE = 'https://www.holidify.com/images/cmsuploads/compressed/wallpaperflare.comwallpaper24_20231227162223.jpg';

// ─── Helpers ────────────────────────────────────────────────────────────────
const serif = { fontFamily: "'DM Serif Display', Georgia, serif" };

function Photo({ src, alt = '', className = '', aspect = 'aspect-[4/3]', priority = false }) {
  if (!src) return null;
  return (
    <div className={`w-full overflow-hidden rounded-xl ${aspect} relative ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" unoptimized priority={priority} />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="text-[#C5A55A] text-[11px] font-bold tracking-[0.5em] uppercase">{children}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

// Splits essay text into paragraphs
function EssayText({ text }) {
  return text.split('\n\n').map((para, i) => (
    <p key={i} className="text-white/65 text-[17px] leading-[1.95] mb-6 last:mb-0">{para}</p>
  ));
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function ItalyPageClient({ programme, photos, concert }) {
  const [spotifyOpen, setSpotifyOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisibleSections(prev => new Set([...prev, e.target.id]));
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const reveal = (id) => visibleSections.has(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';

  // Safely pick photos by index
  const p = (i) => photos[i] || null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <Image src={HERO_IMAGE} alt="Italian concert" fill priority className="object-cover" sizes="100vw" />
        </div>
        {HERO_VIDEO_SRC && !videoFailed && (
          <video
            ref={el => { if (el && el.paused) el.play().catch(() => {}); }}
            autoPlay muted loop playsInline
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 to-transparent" />
        <div className="absolute inset-0 mix-blend-multiply bg-[#1a0000]/30" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px' }} />

        <Link href="/archive" className="absolute top-8 left-8 z-50 flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full text-white/70 hover:text-white text-xs font-bold tracking-[0.3em] uppercase transition-all border border-white/10">
          ← Archive
        </Link>

        <div className="relative z-10 max-w-5xl px-8 md:px-16 pb-20 md:pb-28">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-[#C5A55A]" />
            <span className="text-[#C5A55A] text-[11px] font-bold tracking-[0.5em] uppercase">Edinburgh × Roma</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 tracking-tight" style={serif}>
            A Night<br /><span className="italic text-[#C5A55A]">in Italy</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
            EUCO and the Roma Tre Orchestra unite for an evening of Italian masterworks —
            from Verdi&rsquo;s tragic beauty to Respighi&rsquo;s painted canvases.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-white/40">
            <span>7 March 2026</span>
            <span className="text-white/10">|</span>
            <span>19:30</span>
            <span className="text-white/10">|</span>
            <span>Reid Concert Hall, Edinburgh</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WELCOME — with photos 0 & 1
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="welcome" data-reveal className={`relative py-28 md:py-36 transition-all duration-1000 ${reveal('welcome')}`}>
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <SectionLabel>Welcome</SectionLabel>

          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <p className="text-white/70 text-lg leading-[1.9] mb-6">
                Good evening everyone! We are delighted to welcome you to the Reid Hall for this very exciting collaboration concert between the Edinburgh University Chamber Orchestra and the Roma Tre Orchestra, sponsored by the Italian Institute of Culture in Edinburgh.
              </p>
              <p className="text-white/70 text-lg leading-[1.9]">
                We have a varied and thrilling programme for you tonight, celebrating the best of Italian music. In the first half, members of EUCO will play Verdi&rsquo;s heart-wrenching &lsquo;Prelude&rsquo; from La Traviata, followed by Respighi&rsquo;s Trittico Botticelliano, three movements inspired by the gorgeous paintings of Botticelli, before finishing with Mascagni&rsquo;s tender &lsquo;Intermezzo&rsquo; from Cavalleria Rusticana.
              </p>
              <p className="mt-8 text-[#C5A55A] text-sm font-semibold">Srishti Ramakrishnan</p>
              <p className="text-white/30 text-xs">President, Edinburgh University Chamber Orchestra</p>
            </div>
            <div className="space-y-6">
              <Photo src={p(0)} alt="Concert atmosphere" aspect="aspect-[4/3]" priority />
            </div>
          </div>

          {/* Second welcome quote + photo */}
          <div className="grid md:grid-cols-2 gap-16">
            <div className="order-2 md:order-1">
              <Photo src={p(1)} alt="Orchestras together" aspect="aspect-[4/3]" />
            </div>
            <div className="order-1 md:order-2 flex flex-col justify-center">
              <div className="border-l-2 border-[#C5A55A]/30 pl-8">
                <blockquote className="text-white/50 italic text-lg leading-[1.9]" style={serif}>
                  &ldquo;In such a night we discover the extraordinary wealth of common ground between the cultural heritage of the two countries. This is the first ever collaboration between the two university orchestras and we hope to inaugurate a long-lasting exchange.&rdquo;
                </blockquote>
                <p className="mt-6 text-[#C5A55A] text-sm font-semibold">Stefano De Angelis</p>
                <p className="text-white/30 text-xs">Director, Italian Cultural Institute in Edinburgh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FULL-BLEED PHOTO BREAK — photo 2 ══════════ */}
      {p(2) && (
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <Image src={p(2)} alt="" fill className="object-cover" sizes="100vw" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          PROGRAMME — each piece with essays and interspersed photos
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="programme" data-reveal className={`relative py-28 transition-all duration-1000 ${reveal('programme')}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8B0000]/8 blur-[200px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-10">
          <SectionLabel>Programme</SectionLabel>

          {programme.map((item, i) => {
            // Assign photos: pieces get photos 3-4, 5-6, 7-8, 9-10
            const photoA = p(3 + i * 2);
            const photoB = p(4 + i * 2);
            const isEven = i % 2 === 0;

            return (
              <div key={i} className="mb-28 last:mb-0">
                {/* Interval marker before Roma Tre's set */}
                {i === 3 && (
                  <div className="flex items-center gap-6 pb-20 mb-20 border-b border-white/5">
                    <span className="h-px flex-1 bg-[#C5A55A]/20" />
                    <span className="text-[#C5A55A]/40 text-sm tracking-[0.5em] uppercase italic" style={serif}>
                      — Intervallo —
                    </span>
                    <span className="h-px flex-1 bg-[#C5A55A]/20" />
                  </div>
                )}

                {/* Piece header */}
                <div className="flex items-start gap-6 mb-10">
                  <span className="text-[#C5A55A]/20 text-7xl md:text-8xl font-black leading-none select-none" style={serif}>
                    {i + 1}
                  </span>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase mb-3 border ${
                      item.ensemble === 'EUCO'
                        ? 'text-[#C5A55A] border-[#C5A55A]/30 bg-[#C5A55A]/5'
                        : 'text-[#E07A5F] border-[#E07A5F]/30 bg-[#E07A5F]/5'
                    }`}>
                      {item.ensemble}
                    </span>
                    <h3 className="text-3xl md:text-4xl text-white leading-tight mb-2" style={serif}>
                      {item.piece}
                    </h3>
                    <p className="text-white/40 italic">{item.composer}</p>
                  </div>
                </div>

                {/* Essay with photos woven in */}
                <div className={`grid md:grid-cols-5 gap-12 ${isEven ? '' : 'direction-rtl'}`}>
                  {/* Text column — spans 3 */}
                  <div className={`md:col-span-3 ${isEven ? '' : 'md:order-2'}`}>
                    <EssayText text={item.essay} />
                  </div>
                  {/* Photo column — spans 2 */}
                  <div className={`md:col-span-2 space-y-6 ${isEven ? '' : 'md:order-1'}`}>
                    {photoA && <Photo src={photoA} alt={item.piece} aspect="aspect-[3/4]" />}
                    {photoB && <Photo src={photoB} alt={item.piece} aspect="aspect-[4/5]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════ FULL-BLEED PHOTO BREAK — photo 11 ══════════ */}
      {p(11) && (
        <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
          <Image src={p(11)} alt="" fill className="object-cover" sizes="100vw" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
      )}

      {/* ══════════ PROGRAMME NOTES LINK ══════════ */}
      {concert?.hasProgrammeNotes && (
        <section id="notes" data-reveal className={`relative py-20 transition-all duration-1000 ${reveal('notes')}`}>
          <div className="max-w-4xl mx-auto px-8 md:px-16">
            <Link href={`/programme-notes/${concert.slug}`}
              className="group flex items-center gap-6 p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#C5A55A]/30 transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-[#C5A55A]/10 border border-[#C5A55A]/20 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5A55A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-lg text-white mb-1" style={serif}>Read the full programme notes</p>
                <p className="text-sm text-white/40">The complete printed programme as a beautifully formatted PDF</p>
              </div>
              <span className="text-[#C5A55A] text-xl group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* ══════════ PARTNERS ══════════ */}
      <section id="partners" data-reveal className={`relative py-28 border-t border-white/5 transition-all duration-1000 ${reveal('partners')}`}>
        <div className="max-w-4xl mx-auto px-8 md:px-16 text-center">
          <p className="text-white/20 text-[11px] tracking-[0.5em] uppercase mb-10">In partnership with</p>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            <div className="text-white/30 hover:text-white/60 transition-colors">
              <p className="text-lg" style={serif}>Italian Institute for Culture</p>
              <p className="text-xs text-white/20 mt-1">Edinburgh</p>
            </div>
            <span className="w-px h-8 bg-white/10 hidden md:block" />
            <div className="text-white/30 hover:text-white/60 transition-colors">
              <p className="text-lg" style={serif}>Roma Tre Orchestra</p>
              <p className="text-xs text-white/20 mt-1">Università Roma Tre</p>
            </div>
            <span className="w-px h-8 bg-white/10 hidden md:block" />
            <div className="text-white/30 hover:text-white/60 transition-colors">
              <p className="text-lg" style={serif}>EUCO</p>
              <p className="text-xs text-white/20 mt-1">University of Edinburgh</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <div className="max-w-4xl mx-auto px-8 md:px-16 pb-16 flex justify-between border-t border-white/5 pt-8">
        <Link href="/archive" className="text-white/30 hover:text-[#C5A55A] text-sm transition-colors">← Back to archive</Link>
        <a href="https://www.eu-co.co.uk/concerts" className="text-white/30 hover:text-[#C5A55A] text-sm transition-colors">Upcoming concerts →</a>
      </div>

      {/* ══════════ FLOATING SPOTIFY ══════════ */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {spotifyOpen && (
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 animate-in">
            <iframe
              src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_URI}?utm_source=generator&theme=0`}
              width="300" height="152" frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy" className="rounded-2xl"
            />
          </div>
        )}
        <button onClick={() => setSpotifyOpen(!spotifyOpen)}
          className={`group w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border ${
            spotifyOpen
              ? 'bg-[#1DB954] border-[#1DB954] text-black scale-95'
              : 'bg-[#0A0A0A]/90 backdrop-blur-xl border-white/10 text-[#1DB954] hover:border-[#1DB954]/40 hover:scale-105'
          }`}
          title={spotifyOpen ? 'Close player' : 'Listen on Spotify'}>
          {spotifyOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          )}
        </button>
      </div>

      <style jsx global>{`
        @keyframes animate-in {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-in { animation: animate-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}