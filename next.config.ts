import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Without this, next/image throws at request time (not caught by
  // `next build`, which is why this was easy to miss) for every remote
  // image the app actually uses: Directus-hosted uploads (via
  // getCleanImageUrl in lib/directus.ts), and that same function's
  // Unsplash fallback for concerts with no image yet. placehold.co is
  // also listed since data/education.ts's composer imageUrl values
  // still reference it, even though that file isn't the live data
  // source for /composers any more (see lib/directus.ts's comment).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cms.eu-co.co.uk" },
      { protocol: "http", hostname: "localhost", port: "8055" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
