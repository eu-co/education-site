# Renaissance artwork placeholders

Real Michelangelo/Caravaggio/Raphael (and similar) images weren't included
here — the brief mentioned the real folder is too large to hand over yet.
Everything that uses period artwork currently falls back to a generated
CSS gradient placeholder in the fresco palette (see globals.css's
`.blob-shape`/`.fresco-rule` and each component's own fallback) rather
than a broken image, so the site works and looks intentional today.

## Drop real images in here once you have them

Expected filenames (any component that references one will pick it up
automatically the moment the file exists — no code changes needed):

- `hero-michelangelo.jpg` — homepage hero background/accent
- `hero-caravaggio.jpg` — composers/education section accent
- `hero-raphael.jpg` — archive section accent
- `texture-fresco.jpg` — a subtle repeatable background texture (optional)

All of these are firmly public domain (the artists died 350-500+ years
ago) — high-resolution photographic reproductions are freely available
from museum collections and Wikimedia Commons; the Web Gallery of Art
(wga.hu) and Wikimedia Commons' own category pages for each artist are
good starting points. Crediting the source museum/collection in this
file once you've picked specific images is good practice even though
it's not legally required for public domain 2D reproductions.

## Sizing

Save at a reasonable web size (under ~500KB, ideally WebP or a
well-compressed JPEG) — Next.js's `<Image>` component (already used
throughout this app) will handle responsive sizing/optimisation from
there automatically once you point a `src` at one of these.
