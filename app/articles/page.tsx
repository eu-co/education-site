import type { Metadata } from "next";
import Section from "@/components/Section";
import { getArticles } from "@/lib/directus";

export const metadata: Metadata = {
  title: "Articles",
  description: "In-depth explorations of specific pieces and musical topics from the EUCO Education Hub.",
};

// Note: this section pre-dates /blog and was always described as a
// placeholder for "a real blog feed, eventually" in the original source.
// Now that /blog exists as a real CMS-driven feed, worth deciding whether
// these should just become blog posts instead of a separate collection —
// left as its own thing for now since that's a content decision, not a
// technical one.
export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <Section title="Articles" eyebrow="Deep dives" accent="violet" className="pt-8">
      {articles.length === 0 ? (
        <p className="text-center text-ink-soft">Articles are managed in the CMS — check back soon.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-10">
          {articles.map((article) => (
            <div key={article.id} className="bg-white border-2 border-ink/5 rounded-3xl p-8 shadow-sm">
              <h2 className="text-3xl font-display font-semibold text-ink">{article.title}</h2>
              <p className="text-ink-soft my-2">
                By {article.author} on {article.date}
              </p>
              <p className="text-lg text-ink-soft leading-relaxed my-6">{article.excerpt}</p>

              {article.youtube_url && (
                <>
                  <h3 className="text-xl font-display font-semibold text-ink mt-8 mb-4">Listen</h3>
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={article.youtube_url}
                      title={`${article.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </>
              )}

              {article.spotify_embed_url && (
                <>
                  <h3 className="text-xl font-display font-semibold text-ink mt-8 mb-4">Audio Snippet</h3>
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src={article.spotify_embed_url}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`${article.title} audio`}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
