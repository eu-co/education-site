export const metadata = { title: 'What is a Chamber Orchestra?' };

const families = [
  { name: 'Strings', instruments: ['Violin I', 'Violin II', 'Viola', 'Cello', 'Double Bass'], desc: 'The backbone. Strings carry the majority of melodic material.', count: '~20' },
  { name: 'Woodwinds', instruments: ['Flute', 'Oboe', 'Clarinet', 'Bassoon'], desc: 'Colour and character. Each has a distinctive voice.', count: '~8' },
  { name: 'Brass', instruments: ['French Horn', 'Trumpet', 'Trombone'], desc: 'Power and warmth, lending weight to climactic moments.', count: '~5' },
  { name: 'Percussion & Harp', instruments: ['Timpani', 'Harp', 'Various'], desc: 'Rhythm, colour, and atmosphere.', count: '~3' },
];

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-16 relative">
        <div className="burst bg-[var(--burst-mint)] w-[400px] h-[400px] -top-[100px] -right-[80px]" />
        <p className="text-[var(--accent-text)] text-xs font-bold tracking-[0.4em] uppercase mb-4 relative">Discover</p>
        <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-4 relative">The Chamber Orchestra</h1>
        <p className="text-[var(--ink-muted)] text-lg leading-relaxed max-w-2xl relative">
          Smaller than a symphony, larger than a chamber ensemble &mdash; a unique and expressive middle ground.
        </p>
      </div>

      {/* What is it */}
      <section className="rounded-2xl border border-[var(--border)] bg-white p-8 md:p-10 mb-12">
        <h2 className="text-2xl text-[var(--accent)] mb-6">What makes it different?</h2>
        <div className="text-[var(--ink-light)] leading-[1.9] space-y-4">
          <p>A chamber orchestra typically consists of 25 to 45 musicians, creating a more intimate and transparent sound where each instrument&apos;s voice can be clearly heard.</p>
          <p>The repertoire spans three centuries, from Bach&apos;s Brandenburg Concertos through Mozart and Haydn to Britten, Barber, and Stravinsky.</p>
        </div>
      </section>

      {/* Size comparison */}
      <section className="mb-16">
        <h2 className="text-2xl text-[var(--ink)] mb-8">How does it compare?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'String Quartet', size: '4', desc: 'Pure chamber music' },
            { label: 'Chamber Orchestra', size: '25–45', desc: 'The EUCO sweet spot', hl: true },
            { label: 'Symphony Orchestra', size: '80–100', desc: 'Full orchestral forces' },
          ].map(item => (
            <div key={item.label} className={`rounded-2xl p-6 text-center border transition-all ${
              item.hl ? 'border-[var(--accent)]/20 bg-[var(--accent-soft)]' : 'border-[var(--border)] bg-white'
            }`}>
              <p className={`text-4xl mb-2 font-['DM_Serif_Display'] ${item.hl ? 'text-[var(--accent)]' : 'text-[var(--ink)]'}`}>{item.size}</p>
              <p className="text-sm text-[var(--ink)] font-semibold mb-1">{item.label}</p>
              <p className="text-xs text-[var(--ink-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instrument families */}
      <section className="mb-16">
        <h2 className="text-2xl text-[var(--ink)] mb-8">The instrument families</h2>
        <div className="space-y-4">
          {families.map((f, i) => (
            <div key={f.name} className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl text-[var(--accent)]">{f.name}</h3>
                  <p className="text-xs text-[var(--ink-muted)]">{f.count} players</p>
                </div>
                <span className="text-xs text-[var(--ink-muted)] bg-[var(--bg-warm)] px-3 py-1 rounded-full">Section {i + 1}</span>
              </div>
              <p className="text-[var(--ink-light)] text-sm leading-relaxed mb-4">{f.desc}</p>
              <div className="flex flex-wrap gap-2">
                {f.instruments.map(inst => (
                  <span key={inst} className="px-3 py-1 rounded-full text-xs border border-[var(--border)] text-[var(--ink-muted)]">{inst}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-16 border-t border-[var(--border)]">
        <p className="text-xl text-[var(--ink)] mb-3 italic font-['DM_Serif_Display']">More content coming soon</p>
        <p className="text-[var(--ink-muted)] text-sm max-w-lg mx-auto">
          Interactive guides to orchestral seating, listening exercises, and video introductions.
        </p>
      </section>
    </div>
  );
}
