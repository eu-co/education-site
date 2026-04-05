export const metadata = {
  title: 'What is a Chamber Orchestra?',
  description: 'Discover the structure, history, and instruments of a chamber orchestra.',
};

const instrumentFamilies = [
  {
    name: 'Strings',
    instruments: ['Violin I', 'Violin II', 'Viola', 'Cello', 'Double Bass'],
    description: 'The backbone of the orchestra. Strings provide the harmonic foundation and carry the majority of melodic material in chamber repertoire.',
    count: '~20 players',
  },
  {
    name: 'Woodwinds',
    instruments: ['Flute', 'Oboe', 'Clarinet', 'Bassoon'],
    description: 'Colour and character. Each woodwind has a distinctive voice that adds texture and solo brilliance. In chamber works, they are often featured prominently.',
    count: '~8 players',
  },
  {
    name: 'Brass',
    instruments: ['French Horn', 'Trumpet', 'Trombone'],
    description: 'Power and warmth. Used more sparingly in chamber music than in full symphony orchestras, lending weight to climactic moments.',
    count: '~5 players',
  },
  {
    name: 'Percussion & Harp',
    instruments: ['Timpani', 'Harp', 'Various percussion'],
    description: 'Rhythm, colour, and atmosphere. From the thunderous timpani to the ethereal harp, these instruments punctuate and transform the orchestral sound.',
    count: '~3 players',
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="text-[var(--color-amber)] text-xs font-bold tracking-[0.4em] uppercase mb-4">
          Discover
        </p>
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[var(--color-cream)] mb-4">
          The Chamber Orchestra
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed max-w-2xl">
          Smaller than a symphony orchestra, larger than a chamber ensemble &mdash;
          the chamber orchestra occupies a unique and expressive middle ground.
        </p>
      </div>

      {/* What is it */}
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 md:p-10 mb-12">
        <h2 className="font-['Playfair_Display'] text-2xl text-[var(--color-amber-light)] mb-6">
          What makes it different?
        </h2>
        <div className="text-[var(--color-cream)]/80 leading-[1.9] space-y-4 text-base md:text-[17px]">
          <p>
            A chamber orchestra typically consists of around 25 to 45 musicians. This smaller
            size &mdash; compared to the 80-100 players of a full symphony orchestra &mdash; creates
            a more intimate and transparent sound where each instrument&apos;s voice can be clearly heard.
          </p>
          <p>
            The repertoire spans three centuries, from Bach&apos;s Brandenburg Concertos through Mozart
            and Haydn&apos;s symphonies to 20th-century works by Britten, Barber, and Stravinsky.
            Many of the greatest works in classical music were written for forces this size.
          </p>
          <p>
            At EUCO, our chamber orchestra draws from students across the University of Edinburgh.
            We rehearse weekly and perform two main concerts per season, working with a different
            professional conductor each term.
          </p>
        </div>
      </section>

      {/* Size comparison */}
      <section className="mb-16">
        <h2 className="font-['Playfair_Display'] text-2xl text-[var(--color-cream)] mb-8">
          How does it compare?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'String Quartet', size: '4', desc: 'Pure chamber music' },
            { label: 'Chamber Orchestra', size: '25–45', desc: 'The EUCO sweet spot', highlight: true },
            { label: 'Symphony Orchestra', size: '80–100', desc: 'Full orchestral forces' },
          ].map(item => (
            <div key={item.label}
              className={`rounded-xl p-6 text-center border transition-all ${
                item.highlight
                  ? 'border-[var(--color-amber-dim)] bg-[var(--color-amber)]/5'
                  : 'border-[var(--color-border)] bg-[var(--color-card)]'
              }`}>
              <p className={`text-4xl font-['Playfair_Display'] mb-2 ${
                item.highlight ? 'text-[var(--color-amber)]' : 'text-[var(--color-cream)]'
              }`}>
                {item.size}
              </p>
              <p className="text-sm text-[var(--color-cream)] font-semibold mb-1">{item.label}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instrument families */}
      <section className="mb-16">
        <h2 className="font-['Playfair_Display'] text-2xl text-[var(--color-cream)] mb-8">
          The instrument families
        </h2>
        <div className="space-y-4">
          {instrumentFamilies.map((family, i) => (
            <div key={family.name}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl text-[var(--color-amber-light)] mb-1">
                    {family.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">{family.count}</p>
                </div>
                <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-parchment)] px-3 py-1 rounded-full">
                  Section {i + 1}
                </span>
              </div>
              <p className="text-[var(--color-cream)]/70 leading-relaxed text-sm mb-4">
                {family.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {family.instruments.map(inst => (
                  <span key={inst}
                    className="px-3 py-1 rounded-full text-xs border border-[var(--color-border)] text-[var(--color-cream)]/60">
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="text-center py-16 border-t border-[var(--color-border)]">
        <p className="font-['Playfair_Display'] text-xl text-[var(--color-cream)] mb-3 italic">
          More content coming soon
        </p>
        <p className="text-[var(--color-text-muted)] text-sm max-w-lg mx-auto">
          We are building interactive guides to orchestral seating, listening exercises,
          and video introductions to each instrument family. Stay tuned.
        </p>
      </section>
    </div>
  );
}
