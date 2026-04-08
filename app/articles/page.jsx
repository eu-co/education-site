import { getArticles } from '@/lib/data';

export const metadata = { title: 'Articles' };

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-16">
        <p className="text-[var(--accent-text)] text-xs font-bold tracking-[0.4em] uppercase mb-4">In depth</p>
        <h1 className="text-4xl md:text-5xl text-[var(--ink)] mb-4">Articles</h1>
        <p className="text-[var(--ink-muted)] text-lg leading-relaxed max-w-2xl">
          Deep dives into the music, the history, and the stories behind the notes.
        </p>
      </div>

      <div className="space-y-16">
        {articles.map((a, i) => (
          <article key={a.id || i}>
            {i > 0 && <div className="h-px bg-[var(--border)] mb-16" />}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)] text-xs font-semibold tracking-widest uppercase">Article</span>
              <span className="text-xs text-[var(--ink-muted)]">{a.date}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
              <span className="text-xs text-[var(--ink-muted)]">by {a.author}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-[var(--ink)] mb-8 leading-tight">{a.title}</h2>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-8 md:p-10">
              <p className="text-[var(--ink-light)] leading-[1.9] text-base md:text-[17px] mb-10 first-letter:text-5xl first-letter:font-['DM_Serif_Display'] first-letter:text-[var(--accent)] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8]">
                {a.excerpt}
              </p>
              {a.youtubeEmbed && (
                <div className="mb-8">
                  <p className="text-xs text-[var(--accent-text)] font-bold tracking-[0.2em] uppercase mb-4">Watch</p>
                  <div className="aspect-video rounded-xl overflow-hidden border border-[var(--border)]">
                    <iframe className="w-full h-full" src={a.youtubeEmbed} title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen loading="lazy" />
                  </div>
                </div>
              )}
              {a.spotifyEmbed && (
                <div>
                  <p className="text-xs text-[var(--accent-text)] font-bold tracking-[0.2em] uppercase mb-4">Listen</p>
                  <iframe className="rounded-xl" src={a.spotifyEmbed} width="100%" height="152"
                    frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy" title="Spotify" />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {articles.length <= 1 && (
        <div className="mt-20 text-center py-16 border-t border-[var(--border)]">
          <p className="text-xl text-[var(--ink)] mb-3 italic font-['DM_Serif_Display']">More articles coming soon</p>
          <p className="text-[var(--ink-muted)] text-sm">Check back for explorations of the music we perform.</p>
        </div>
      )}
    </div>
  );
}
