import fs from "fs";
import path from "path";

/**
 * Reads an SVG file from assets/logos at build/render time and inlines its
 * markup directly, rather than referencing it via <img>. This matters
 * because these logos use fill="currentColor" for tinting (hover states
 * etc.) — an <img>-referenced SVG can't pick up page CSS colour at all, it
 * would just render whatever colour is baked into the file (effectively
 * invisible black-on-black here). This is a React Server Component only —
 * fs access doesn't work in Client Components.
 */
export default function InlineSvg({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const filePath = path.join(process.cwd(), "assets", "logos", `${name}.svg`);
  const svg = fs.readFileSync(filePath, "utf8");
  return <span className={className} dangerouslySetInnerHTML={{ __html: svg }} />;
}
