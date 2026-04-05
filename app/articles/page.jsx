import { getArticles } from '@/lib/data';

export const metadata = {
  title: 'Articles',
  description: 'In-depth explorations of specific pieces and musical topics from EUCO.',
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="text-[var(--color-amber)] text-xs font-bold tracking-[0.4em] uppercase mb-4">
          In Depth
        </p>
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[var(--color-cream)] mb-4">
          Articles
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed max-w-2xl">
          Deep dives into the music, the history, and the stories behind the notes.
        </p>
      </div>

      {/* Articles */}
      <div className="space-y-20">
        {articles.map((article, i) => (
          <article key={article.id || i} className="relative">

            {/* Decorative line */}
            {i > 0 && <div className="absolute -top-10 left-0 right-0 h-px bg-[var(--color-border)]" />}

            {/* Meta bar */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-[var(--color-amber)]/10 text-[var(--color-amber)] text-xs font-semibold tracking-widest uppercase">
                Article
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {article.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
              <span className="text-xs text-[var(--color-text-muted)]">
                by {article.author}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[var(--color-cream)] mb-8 leading-tight">
              {article.title}
            </h2>

            {/* Body */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 md:p-10">
              <p className="text-[var(--color-cream)]/80 leading-[1.9] text-base md:text-[17px] mb-10 first-letter:text-5xl first-letter:font-['Playfair_Display'] first-letter:text-[var(--color-amber)] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8]">
                {article.excerpt}
              </p>

              {/* YouTube embed */}
              {article.youtubeEmbed && (
                <div className="mb-8">
                  <p className="text-xs text-[var(--color-amber)] font-bold tracking-[0.2em] uppercase mb-4">
                    Watch the Performance
                  </p>
                  <div className="aspect-video rounded-xl overflow-hidden border border-[var(--color-border)]">
                    <iframe
                      className="w-full h-full"
                      src={article.youtubeEmbed}
                      title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* Spotify embed */}
              {article.spotifyEmbed && (
                <div>
                  <p className="text-xs text-[var(--color-amber)] font-bold tracking-[0.2em] uppercase mb-4">
                    Listen
                  </p>
                  <iframe
                    className="rounded-xl"
                    src={article.spotifyEmbed}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Player"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Empty state / More coming */}
      {articles.length <= 1 && (
        <div className="mt-20 text-center py-16 border-t border-[var(--color-border)]">
          <p className="font-['Playfair_Display'] text-xl text-[var(--color-cream)] mb-3 italic">
            More articles coming soon
          </p>
          <p className="text-[var(--color-text-muted)] text-sm">
            We are working on new content. Check back for explorations of the music we perform.
          </p>
        </div>
      )}
    </div>
  );
}
