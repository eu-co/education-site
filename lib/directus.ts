// =============================================================================
// lib/directus.ts — content fetching for the education app
// =============================================================================
// Reads from the SAME Directus instance the main site uses. Two kinds of
// content: "concerts" is a shared collection (the main site owns the core
// fields — Title/Date/Venue/etc — this app additionally reads the
// archive-specific fields added on top: ProgrammeNotesPdf, PosterImage,
// Gallery, VideoUrl, ArchiveNotes). "blog_posts" belongs to this app only.
//
// This app uses Next.js's build-time fetch caching (default behaviour of
// `fetch` in a Server Component) rather than Astro's static-only model —
// content updates need a redeploy to appear here too, same tradeoff as the
// main site, for the same reason (no server re-fetching content per
// request in either app).
// =============================================================================

const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://localhost:8055";

export interface DirectusFile {
  id: string;
}

export interface Concert {
  id: number;
  status: string;
  Title: string;
  Date: string;
  Time?: string;
  Venue?: string;
  City?: string;
  Programme?: string;
  Description?: string;
  TicketLink?: string;
  Image?: string | null;
  ProgrammeNotesPdf?: string | null;
  PosterImage?: string | null;
  Gallery?: { directus_files_id: string }[];
  VideoUrl?: string | null;
  ArchiveNotes?: string | null;
  slug: string;
}

export interface BlogPost {
  id: number;
  status: string;
  title: string;
  slug: string;
  date: string;
  author?: string;
  excerpt?: string;
  cover_image?: string | null;
  body?: string;
  category?: string;
}

export interface Composer {
  id: number;
  name: string;
  lifespan?: string;
  image?: string | null;
  bio?: string;
  pieces?: string;
  played_by_us?: boolean;
  wikidata_qid?: string | null;
  mmkg_dbpedia_uri?: string | null;
  imslp_slug?: string | null;
}

export interface ProgrammeNoteArticle {
  id: number;
  title: string;
  concert_date?: string;
  author?: string;
  excerpt?: string;
}

export interface Article {
  id: number;
  title: string;
  author?: string;
  date?: string;
  excerpt?: string;
  youtube_url?: string;
  spotify_embed_url?: string;
}

async function fetchCollection<T>(collection: string, query = ""): Promise<T[]> {
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/${collection}?filter[status][_eq]=published&limit=-1${query}`
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    // Directus unreachable at build time — fail to empty rather than
    // crashing the build, same pattern as the main site.
    return [];
  }
}

export function getCleanImageUrl(value: string | null | undefined): string {
  if (!value) return "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?q=80&w=2670&auto=format&fit=crop";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${DIRECTUS_URL}/assets/${value}`;
}

function generateSlug(title: string, dateStr?: string): string {
  const titleSlug = (title || "concert")
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  const d = dateStr ? new Date(dateStr) : null;
  if (d && !isNaN(d.getTime())) {
    const month = d.toLocaleString("en", { month: "long" }).toLowerCase();
    return `${titleSlug}-${month}-${d.getFullYear()}`;
  }
  return titleSlug;
}

// ── Archive (past concerts, from the shared "concerts" collection) ─────────

export async function getArchiveConcerts(): Promise<Concert[]> {
  const data = await fetchCollection<Omit<Concert, "slug">>(
    "concerts",
    "&fields=*,Gallery.directus_files_id&sort=-Date"
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return data
    .filter((c) => {
      const d = new Date(c.Date);
      return !isNaN(d.getTime()) && d < today;
    })
    .map((c) => ({ ...c, slug: generateSlug(c.Title, c.Date) }));
}

export async function getArchiveConcertBySlug(slug: string): Promise<Concert | null> {
  const all = await getArchiveConcerts();
  return all.find((c) => c.slug === slug) || null;
}

// ── Blog ─────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchCollection<BlogPost>("blog_posts", "&sort=-date");
  // Same defensive pattern as concerts: if a post was saved without a slug
  // (easy to do by accident — Directus doesn't auto-generate one), fall
  // back to slugifying the title rather than crashing the whole build.
  return data.map((p) => ({
    ...p,
    slug: p.slug || generateSlug(p.title, p.date),
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// ── Composers, Programme Notes, Articles ────────────────────────────────
// Migrated from the hardcoded data/education.ts into Directus so committee
// can actually edit them — same shape the pages already expected, just a
// different source.

export async function getComposers(): Promise<Composer[]> {
  return fetchCollection<Composer>("composers", "&sort=name");
}

// The "played by us" list specifically -- shown in the archive section
// as an interactive compilation with descriptions (see
// app/archive/composers/page.tsx), separate from the full mind-map on
// /composers which includes composers pulled in from external sources
// too, not just EUCO's own repertoire.
export async function getComposersPlayedByUs(): Promise<Composer[]> {
  return fetchCollection<Composer>("composers", "&filter[played_by_us][_eq]=true&sort=name");
}

export async function getProgrammeNoteArticles(): Promise<ProgrammeNoteArticle[]> {
  return fetchCollection<ProgrammeNoteArticle>("programme_notes", "&sort=-concert_date");
}

export async function getArticles(): Promise<Article[]> {
  return fetchCollection<Article>("articles");
}
