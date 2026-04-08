import { getComposers } from '@/lib/data';
// If @/ alias isn't working, use: ../../../components/ComposerExplorer
import ComposerExplorer from '@/components/ComposerExplorer'; 
import BackToComposers from '@/components/BackToComposers';

export const metadata = { title: 'Composer Directory — EUCO' };

export default async function DirectoryPage() {
  const composers = await getComposers();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
        <BackToComposers />
      <div className="mb-12">
        <p className="text-pink-500 text-xs font-bold tracking-[0.4em] uppercase mb-4">Database</p>
        <h1 className="text-5xl font-black text-[var(--ink)] mb-4 tracking-tighter">
          The Archive
        </h1>
        <p className="text-[var(--ink-muted)] text-xl max-w-2xl font-light">
          A complete searchable database of every composer performed by the orchestra.
        </p>
      </div>
      
      <ComposerExplorer initialComposers={composers} />
    </div>
  );
}