import Link from 'next/link';
import Image from 'next/image';
import { getConcertArchive, getCleanImageUrl } from '@/lib/data';
import { Urbanist } from 'next/font/google'; // Import futuristic font

// Initialize the font
const orbitron = Urbanist({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'] 
});

export const metadata = { title: 'Concert Archive' };

const FALLBACK = 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2670&auto=format&fit=crop';

export default async function ArchivePage() {
  const concerts = await getConcertArchive();
  
  // 1. Group by year (Your existing code)
  const byYear = {};
  concerts.forEach(c => { 
    const y = c._dateObj.getFullYear(); 
    if (!byYear[y]) byYear[y] = []; 
    byYear[y].push(c); 
  });
  const years = Object.keys(byYear).sort((a, b) => b - a);

  // 2. Generate Word Map Data
  const wordFrequency = {};
  
  // Words to ignore from the piece titles
  const stopWords = ['and', 'the', 'in', 'of', 'for', 'to', 'major', 'minor', 'op.', 'no.', 'symphony', 'concerto', 'sonata', 'suite', 'overture', 'from', 'concert',];
  
  concerts.forEach(c => {
    // Check if the program string exists in your data
    if (c.Programme && typeof c.Programme === 'string') {
      
      // 1. Split the entire program string by commas to isolate each performance
      const programItems = c.Programme.split(',');
      
      programItems.forEach(item => {
        // 2. Find the last dash to separate the piece from the composer
        const dashIndex = item.lastIndexOf('-');
        
        if (dashIndex !== -1) {
          // Extract and clean up the strings
          const pieceName = item.substring(0, dashIndex).trim();
          const composerName = item.substring(dashIndex + 1).trim();
          
          // --- Add the Composer Name ---
          // We use the full composer string as a single "word" so "John Williams" stays together
          if (composerName) {
            wordFrequency[composerName] = (wordFrequency[composerName] || 0) + 1;
          }

          // --- Add the Piece Words ---
          // Break the piece name down into individual words longer than 3 letters
          const pieceWords = pieceName.toLowerCase().match(/\b[a-zA-Z]{4,}\b/g) || [];
          
          pieceWords.forEach(word => {
            if (!stopWords.includes(word)) {
              // Capitalize the first letter for aesthetics
              const formattedWord = word.charAt(0).toUpperCase() + word.slice(1);
              wordFrequency[formattedWord] = (wordFrequency[formattedWord] || 0) + 1;
            }
          });
        }
      });
    }
  });

  // Sort by frequency and take the top 25 words/names
  const topWords = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 25)
    .map(([text, count]) => ({ text, count }));

  const maxCount = Math.max(...topWords.map(w => w.count), 1); // Avoid division by zero

  // SVG Data URI for a simple sine-wave pattern
  const soundWavePattern = `data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 0, 50 10 T 100 10' fill='none' stroke='white' stroke-width='2' opacity='0.5'/%3E%3C/svg%3E`;

  return (
    <div className="relative min-h-screen bg-[var(--background)] overflow-hidden pb-32 font-sans">
      
      {/* 1. Ambient Background & Dynamic Foreground Bursts */}
      <div className="fixed top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-600/20 mix-blend-screen filter blur-[150px] animate-pulse pointer-events-none z-0" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[-10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-blue-600/20 mix-blend-screen filter blur-[200px] pointer-events-none z-0" />
      <div className="fixed top-[20%] right-[10%] w-32 h-32 rounded-full bg-pink-500/40 filter blur-[40px] mix-blend-overlay animate-bounce pointer-events-none z-50" style={{ animationDuration: '6s' }} />
      
      {/* 2. Hero Section */}
      <div className="relative z-10 pt-40 pb-32 px-6 text-center max-w-5xl mx-auto">
        <p className="text-pink-500 text-sm font-black tracking-[0.7em] uppercase mb-6 drop-shadow-md">
          Our Concert History
        </p>
        <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-black mb-8 tracking-tighter mix-blend-multiply">
          Archive
        </h1>
        <p className="text-gray-600 text-xl md:text-2xl leading-relaxed mx-auto max-w-2xl font-light">
          Every performance is unique. Explore the programmes, notes, and listen to some of our performances.
        </p>
      </div>

      {/* --- NEW: Word Map Hero Section --- */}
      <div className="relative w-full max-w-4xl mx-auto py-12 px-4 border-y border-white/5 bg-white/5 backdrop-blur-sm rounded-3xl shadow-[inset_0_0_50px_rgba(255,255,255,0.05)]">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4">
            {topWords.map((word, i) => {
              // Calculate dynamic size (min 1rem, max 3.5rem based on frequency)
              const sizeScale = (word.count / maxCount);
              const fontSize = 1 + (sizeScale * 2.5);
              
              // Calculate dynamic opacity (more frequent = more solid)
              const opacity = 0.4 + (sizeScale * 0.6);

              // Deterministic color palette cycling based on index
              const colors = ['text-pink-500', 'text-cyan-400', 'text-purple-500', 'text-blue-500', 'text-gray-300'];
              const colorClass = colors[i % colors.length];

              return (
                <span 
                  key={i}
                  className={`${colorClass} ${orbitron.className} font-bold tracking-wider hover:text-white hover:scale-110 hover:opacity-100 transition-all duration-300 cursor-default mix-blend-hard-light`}
                  style={{ 
                    fontSize: `${fontSize}rem`,
                    opacity: opacity,
                    // Add subtle text shadow to the largest words to make them glow
                    textShadow: sizeScale > 0.6 ? '0 0 20px currentColor' : 'none'
                  }}
                >
                  {word.text}
                </span>
              );
            })}
          </div>
      </div>

      {/* 3. The Dynamic Timeline */}
      <div className="relative z-10 w-full">
        {years.map((year, index) => {
          const isEven = index % 2 === 0;
          const clipPathStyle = isEven 
            ? 'polygon(0 15%, 100% 0, 100% 85%, 0 100%)' 
            : 'polygon(0 0, 100% 15%, 100% 100%, 0 85%)';

          // Grab the first concert's image from this year to use as the background
          const yearBgImage = getCleanImageUrl(byYear[year][0]?.ShowImage) || FALLBACK;

          return (
            <section key={year} className="mb-40 relative">
              
              {/* Massive Diagonal Header Slice */}
              <div 
                className="w-full relative bg-gray-900 text-white py-48 md:py-64 overflow-hidden shadow-2xl flex items-center justify-center"
                style={{ clipPath: clipPathStyle }}
              >
                {/* Dynamic Photographic Background - ALIGNED WITH SLUG PAGE */}
                <Image 
                  src={yearBgImage}
                  alt={`Year ${year} highlight`}
                  fill
                  priority /* <-- ADDED: Forces immediate load, matching your slug page */
                  className="object-cover opacity-50" /* <-- CHANGED: Removed extreme blend modes so it's visible */
                  sizes="100vw"
                />
                
                {/* Dark Vignette to ensure text readability */}
                <div className="absolute inset-0 bg-gray-900/60" />

                {/* Soundwaves Overlay (40% Opacity) */}
                <div 
                  className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
                  style={{ 
                    backgroundImage: `url("${soundWavePattern}")`,
                    backgroundSize: '150px 30px',
                    backgroundRepeat: 'repeat'
                  }} 
                />
                
                {/* Year Overlay (Using Futuristic Font) */}
                <div className="relative z-10 text-center mix-blend-plus-lighter">
                  {/* Notice the orbitron.className applied here */}
                  <h2 className={`text-[10rem] md:text-[18rem] font-black leading-none tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] ${orbitron.className}`}>
                    {year}
                  </h2>
                  <p className={`text-xl md:text-3xl font-bold tracking-[1.5em] text-pink-400 mt-[-1rem] md:mt-[2rem] uppercase ${orbitron.className}`}>
                    {byYear[year].length} {byYear[year].length === 1 ? 'Concert' : 'Concerts'}
                  </p>
                </div>
              </div>

              {/* Grid of Concert Cards */}
              <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-24 md:-mt-40">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {byYear[year].map((c, i) => {
                    const cover = getCleanImageUrl(c.ShowImage) || FALLBACK;
                    const dateStr = c._dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                    
                    return (
                      <Link 
                        key={i} 
                        href={`/archive/${c.slug}`}
                        className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(236,72,153,0.3)]"
                      >
                        {/* Full Card Image */}
                        <Image 
                          src={cover} 
                          alt={c.Title} 
                          fill 
                          
                          /* 1. THE FIX: Bypass Next.js optimization for this specific site */
                          unoptimized={cover.includes('scandinavianwilderness.com')} 
                          
                          /* 2. PRO TIP: Eager-load the first 4 cards of each year, lazy-load the rest */
                          priority={i < 4} 
                          
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                        {c.photos.length > 0 && (
                          <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                            {c.photos.length} photos
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="text-pink-400 text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                              {dateStr}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                            {c.Title}
                          </h3>
                          <p className="text-white/60 text-sm font-medium tracking-wider uppercase">
                            {c.Venue}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}