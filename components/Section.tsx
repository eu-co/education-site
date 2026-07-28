export default function Section({
  title,
  eyebrow,
  accent = "coral",
  children,
  className = "",
}: {
  title: string;
  eyebrow?: string;
  accent?: "coral" | "sun" | "sky" | "mint" | "violet";
  children: React.ReactNode;
  className?: string;
}) {
  const accentClasses: Record<string, string> = {
    coral: "bg-pop-coral/10 text-pop-coral",
    sun: "bg-pop-sun/15 text-ink",
    sky: "bg-pop-sky/10 text-pop-sky",
    mint: "bg-pop-mint/10 text-pop-mint",
    violet: "bg-pop-violet/10 text-pop-violet",
  };

  return (
    <div className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto">
        <div className="text-center mb-10">
          {eyebrow && (
            <span className={`inline-block px-4 py-1.5 rounded-full font-display font-semibold text-sm mb-4 ${accentClasses[accent]}`}>
              {eyebrow}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-ink">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
