import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, getCleanImageUrl } from "@/lib/directus";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, composer spotlights, and behind-the-scenes writing from EUCO.",
};

const CATEGORY_COLORS: Record<string, string> = {
  "behind-the-music": "bg-pop-violet/10 text-pop-violet",
  "concert-recap": "bg-pop-coral/10 text-pop-coral",
  "composer-spotlight": "bg-pop-sky/10 text-pop-sky",
  community: "bg-pop-mint/10 text-pop-mint",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-pop-sun/15 text-ink font-display font-semibold text-sm mb-4">
          The Blog
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink mb-4">Stories from EUCO</h1>
        <p className="text-ink-soft text-lg">Behind-the-scenes writing, composer spotlights, and concert recaps.</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-ink-soft">No posts yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-3xl overflow-hidden bg-white border-2 border-ink/5 hover:border-pop-sun/50 hover:shadow-xl transition-all"
            >
              <div className="relative h-44 overflow-hidden bg-pop-sun/10">
                <Image
                  src={getCleanImageUrl(post.cover_image)}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                {post.category && (
                  <span className={`inline-block text-xs font-display font-semibold px-3 py-1 rounded-full mb-2 ${CATEGORY_COLORS[post.category] || "bg-ink/5 text-ink"}`}>
                    {post.category.replace(/-/g, " ")}
                  </span>
                )}
                <h2 className="text-lg font-display font-semibold text-ink leading-snug">{post.title}</h2>
                {post.excerpt && <p className="text-ink-soft text-sm mt-2 line-clamp-2">{post.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
