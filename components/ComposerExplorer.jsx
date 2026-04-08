'use client'; // This tells Next.js this component runs in the browser

import { useState, useMemo } from 'react';
import ComposerList from './ComposerList';

export default function ComposerExplorer({ initialComposers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEra, setActiveEra] = useState('All');

  const eras = ['All', 'Baroque', 'Classical', 'Romantic', '20th Century'];

  // Helper function to determine Era (moved from your old server file)
  function getEra(lifespan) {
    const birth = parseInt(lifespan);
    if (birth < 1700) return 'Baroque';
    if (birth < 1770) return 'Classical';
    if (birth < 1860) return 'Romantic';
    return '20th Century';
  }

  // useMemo re-calculates the list instantly whenever search or era changes
  const filteredComposers = useMemo(() => {
    return initialComposers.filter(c => {
      const eraMatches = activeEra === 'All' || getEra(c.lifespan) === activeEra;
      const searchMatches = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (c.bio && c.bio.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return eraMatches && searchMatches;
    });
  }, [initialComposers, searchQuery, activeEra]);

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 sticky top-4 z-20 bg-[var(--background)]/80 backdrop-blur-md p-4 rounded-2xl border border-[var(--border)]">
        
        {/* Search Input */}
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search by composer name or keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[var(--border)] rounded-full px-6 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        {/* Era Toggles */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {eras.map(era => (
            <button
              key={era}
              onClick={() => setActiveEra(era)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                activeEra === era 
                  ? 'bg-[var(--accent)] text-white shadow-md' 
                  : 'bg-white border border-[var(--border)] text-[var(--ink-muted)] hover:border-[var(--accent)]/50'
              }`}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredComposers.length === 0 ? (
        <div className="text-center py-20 text-[var(--ink-muted)]">
          <p className="text-xl">No composers found matching your criteria.</p>
          <button onClick={() => {setSearchQuery(''); setActiveEra('All')}} className="mt-4 text-[var(--accent)] hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl text-[var(--ink)] whitespace-nowrap">
              {activeEra === 'All' ? 'All Composers' : activeEra}
            </h2>
            <div className="h-px flex-1 bg-[var(--border)]" />
            <span className="text-xs font-bold text-[var(--accent)]">{filteredComposers.length} Results</span>
          </div>
          <ComposerList composers={filteredComposers} />
        </div>
      )}
    </div>
  );
}