import { existsSync } from "fs";
import { join } from "path";

/**
 * Returns the public URL for a period-artwork file in public/art/ if it
 * actually exists, or null if it's still just a placeholder slot (see
 * public/art/README.md). Server-only (uses Node's fs) -- only call this
 * from Server Components, not "use client" ones.
 *
 * This is the same "drop a file in, it just works, no code change
 * needed" pattern used for the missing brand assets elsewhere in this
 * project -- callers should always have a CSS/gradient fallback ready
 * for the null case (see components/PeriodArt.tsx for the one already
 * wired up), never assume the file is there.
 */
export function getArtworkUrl(filename: string): string | null {
  const fullPath = join(process.cwd(), "public", "art", filename);
  return existsSync(fullPath) ? `/art/${filename}` : null;
}
