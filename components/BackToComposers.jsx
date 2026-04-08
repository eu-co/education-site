import Link from 'next/link';

export default function BackToComposers() {
  return (
    <Link 
      href="/composers" 
      className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[var(--ink-muted)] hover:text-pink-500 transition-all duration-300 group mb-8"
    >
      {/* The Arrow Icon */}
      <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border)] group-hover:border-pink-500 group-hover:bg-pink-500/10 transition-all">
        <svg 
          width="16" height="16" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className="transform group-hover:-translate-x-1 transition-transform"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </span>
      Back to Composers Hub
    </Link>
  );
}