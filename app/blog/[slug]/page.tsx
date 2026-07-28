import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug, getCleanImageUrl } from "@/lib/directus";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto px-6 py-16 max-w-3xl">
      <Link href="/blog" className="text-pop-sun font-display font-semibold text-sm hover:underline">
        &larr; All posts
      </Link>

      <div className="mt-6 mb-8">
        <p className="text-ink-soft text-sm mb-2">
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          {post.author && ` \u2022 ${post.author}`}
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink">{post.title}</h1>
      </div>

      {post.cover_image && (
        <div className="relative w-full aspect-video mb-10 rounded-3xl overflow-hidden shadow-lg">
          <Image src={getCleanImageUrl(post.cover_image)} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {post.body && (
        <div className="prose prose-lg max-w-none text-ink-soft" dangerouslySetInnerHTML={{ __html: post.body }} />
      )}
    </article>
  );
}
