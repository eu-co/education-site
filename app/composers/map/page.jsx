import { getComposers } from '@/lib/data';
import MapWrapper from '@/components/MapWrapper';
import BackToComposers from '@/components/BackToComposers';
export const metadata = { title: 'Musical Time-Travel Map — EUCO' };

export default async function MapPage() {
  const composers = await getComposers();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
        <BackToComposers />
      <div className="mb-12 text-center">
        <p className="text-cyan-500 text-xs font-bold tracking-[0.4em] uppercase mb-4">Interactive</p>
        <h1 className="text-5xl md:text-6xl font-black text-[var(--ink)] mb-4 tracking-tighter uppercase">
          Time-Travel Map
        </h1>
        <p className="text-[var(--ink-muted)] text-lg max-w-xl mx-auto">
          Drag the timeline to see the shifting geography of musical genius through the centuries.
        </p>
      </div>

      <MapWrapper composers={composers} />
    </div>
  );
}