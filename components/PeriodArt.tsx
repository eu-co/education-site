import Image from "next/image";
import { getArtworkUrl } from "@/lib/artwork";

const GRADIENTS: Record<string, string> = {
  ultramarine: "from-fresco-ultramarine/70 via-fresco-plum/50 to-fresco-terracotta/40",
  terracotta: "from-fresco-terracotta/70 via-fresco-gold/50 to-fresco-rose/40",
  verdigris: "from-fresco-verdigris/70 via-fresco-ultramarine/40 to-fresco-gold/40",
};

interface Props {
  /** Filename in public/art/ — see that folder's README for the expected names. */
  filename: string;
  alt: string;
  tone?: keyof typeof GRADIENTS;
  className?: string;
}

/**
 * Drop-in hero/decorative art panel. Renders the real image the moment
 * it exists at public/art/{filename}; until then, a fresco-palette
 * gradient placeholder in the same aspect/shape so layout never jumps
 * once real artwork is added.
 */
export default function PeriodArt({ filename, alt, tone = "ultramarine", className = "" }: Props) {
  const url = getArtworkUrl(filename);

  if (url) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={url} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${GRADIENTS[tone]} ${className}`}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-16 h-16 text-paper/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    </div>
  );
}
