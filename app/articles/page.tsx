import type { Metadata } from "next";
import Section from "@/components/Section";
import { articles } from "@/data/education";

export const metadata: Metadata = {
  title: "Articles",
  description: "In-depth explorations of specific pieces and musical topics from the EUCO Education Hub.",
};

// Ported from src/pages/education/ArticlesPage.js — same YouTube + Spotify
// embeds. This was explicitly a placeholder for a real blog feed in the
// original ("For now, we'll just display the one article") — now that
// /blog exists as a real, CMS-driven feed, worth deciding whether this
// page should fold into it rather than stay a separate single-article page.
export default function ArticlesPage() {
  const ravelArticle = articles[0];

  return (
    <Section title="Articles" eyebrow="Deep dives" accent="violet" className="pt-8">
      <div className="max-w-4xl mx-auto bg-white border-2 border-ink/5 rounded-3xl p-8 shadow-sm">
        <h2 className="text-3xl font-display font-semibold text-ink">{ravelArticle.title}</h2>
        <p className="text-ink-soft my-2">
          By {ravelArticle.author} on {ravelArticle.date}
        </p>
        <p className="text-lg text-ink-soft leading-relaxed my-6">{ravelArticle.excerpt}</p>

        <h3 className="text-xl font-display font-semibold text-ink mt-8 mb-4">Listen: Le Tombeau de Couperin - Pr&eacute;lude</h3>
        <div className="aspect-video rounded-2xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/jbLMhyR-UVQ?si=sDz9DWgtVvcO5M_-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <h3 className="text-xl font-display font-semibold text-ink mt-8 mb-4">Audio Snippet: Pr&eacute;lude</h3>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/0IJyrynPTYBy7FpWX5UXc3?utm_source=generator&theme=0"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player for Ravel's Le Tombeau de Couperin - Pr&eacute;lude"
        />
      </div>
    </Section>
  );
}
