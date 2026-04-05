import { getComposers } from '@/lib/data';
import ComposerList from '@/components/ComposerList';

export const metadata = {
  title: 'Composer Database',
  description: 'Explore 60+ composers whose works have been performed by the Edinburgh University Chamber Orchestra.',
};

export default async function ComposersPage() {
  const composers = await getComposers();

  // Group composers by era based on birth year
  function getEra(lifespan) {
    const birth = parseInt(lifespan);
    if (birth < 1700) return 'Baroque';
    if (birth < 1770) return 'Classical';
    if (birth < 1860) return 'Romantic';
    return '20th Century';
  }

  const grouped = {};
  composers.forEach(c => {
    const era = getEra(c.lifespan);
    if (!grouped[era]) grouped[era] = [];
    grouped[era].push(c);
  });

  const eraOrder = ['Baroque', 'Classical', 'Romantic', '20th Century'];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Page header */}
      <div className="mb-16">
        <p className="text-[var(--color-amber)] text-xs font-bold tracking-[0.4em] uppercase mb-4">
          Database
        </p>
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[var(--color-cream)] mb-4">
          Composers
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed max-w-2xl">
          {composers.length} composers whose works have been performed by EUCO,
          sorted alphabetically within each era. Click any name to explore their key works.
        </p>
      </div>

      {/* Era sections */}
      {eraOrder.map(era => grouped[era] && (
        <section key={era} className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-['Playfair_Display'] text-2xl text-[var(--color-amber-light)] whitespace-nowrap">
              {era}
            </h2>
            <div className="h-px flex-1 bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-text-muted)]">
              {grouped[era].length} composers
            </span>
          </div>

          <ComposerList composers={JSON.parse(JSON.stringify(grouped[era]))} />
        </section>
      ))}
    </div>
  );
}
