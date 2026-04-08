import { getComposers } from '@/lib/data';
import Link from 'next/link';
import MusicalLineage from '@/components/MusicalLineage';

export default async function ComposersPage() {
  const composers = await getComposers();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black text-[var(--ink)] mb-6 tracking-tighter">
          The Masters
        </h1>
        <p className="text-xl text-[var(--ink-muted)] font-light leading-relaxed">
          Behind every masterpiece is a mentor. Behind every genius is a legacy. Explore the connective tissue of musical history.
        </p>
      </div>

      {/* Feature 1: The Lineage Tool */}
      <div className="mb-32">
        <MusicalLineage composers={composers} />
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <Link href="/composers/map" className="group relative h-[400px] rounded-[3rem] overflow-hidden bg-slate-900 border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-transparent group-hover:scale-105 transition-transform duration-700" />
          <div className="relative p-12 flex flex-col h-full justify-between">
            <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">01</span>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Time-Travel Map</h2>
              <p className="text-white/60">Follow the masters across the globe and centuries.</p>
            </div>
          </div>
        </Link>

        <Link href="/composers/directory" className="group relative h-[400px] rounded-[3rem] overflow-hidden bg-slate-900 border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-transparent group-hover:scale-105 transition-transform duration-700" />
          <div className="relative p-12 flex flex-col h-full justify-between">
            <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">02</span>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Complete Archive</h2>
              <p className="text-white/60">Search the full repertoire of 60+ composers.</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}