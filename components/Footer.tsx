import InlineSvg from "./InlineSvg";

const MAIN_SITE_URL = "https://eu-co.co.uk";

// "Powered by paolo.org.uk" credit -- same wording/URL as every other EUCO site
// (main site, ticketing, ticket PDFs and email). Backend copy: app/credit.py.
const CREDIT = { prefix: "Powered by", label: "paolo.org.uk", url: "https://paolo.org.uk" };

export default function Footer() {
  return (
    <footer className="bg-ink mt-16 py-10 rounded-t-[3rem]">
      <div className="container mx-auto px-6 text-center text-white/70">
        <div className="mb-8">
          <h3 className="font-display font-semibold text-white mb-4">
            Proudly sponsored by Stringers of Edinburgh
          </h3>
          <a
            href="https://www.stringersedinburgh.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stringers Music"
            className="inline-block text-white/70 hover:text-pop-sun transition-colors duration-300"
          >
            <InlineSvg name="stringers-logo" className="block [&>svg]:h-12 [&>svg]:w-auto [&>svg]:mx-auto" />
          </a>
        </div>

        <div className="flex justify-center items-center space-x-6 mb-6">
          <a
            href={MAIN_SITE_URL}
            aria-label="Back to main homepage"
            className="text-white/70 hover:text-pop-coral transition-colors duration-300"
          >
            <InlineSvg name="euco-logo" className="block [&>svg]:h-12 [&>svg]:w-auto" />
          </a>
          <a
            href="https://www.eusa.ed.ac.uk/activities/view/edinburgh-university-chamber-orchestra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Edinburgh University Students' Association"
            className="text-white/70 hover:text-pop-sky transition-colors duration-300"
          >
            <InlineSvg name="eusa-logo" className="block [&>svg]:w-10 [&>svg]:h-10" />
          </a>
          <a
            href="https://www.ed.ac.uk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="University of Edinburgh"
            className="text-white/70 hover:text-pop-mint transition-colors duration-300"
          >
            <InlineSvg name="UoE-logo" className="block [&>svg]:h-7 [&>svg]:w-auto" />
          </a>
          <a
            href="https://www.instagram.com/edunichamberorchestra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/70 hover:text-pop-violet transition-colors duration-300"
          >
            <InlineSvg name="insta" className="block [&>svg]:w-6 [&>svg]:h-6" />
          </a>
          <a
            href="https://www.facebook.com/EdinburghUniversityChamberOrchestra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/70 hover:text-pop-coral transition-colors duration-300"
          >
            <InlineSvg name="facebook" className="block [&>svg]:w-6 [&>svg]:h-6" />
          </a>
        </div>

        <p className="text-sm">
          &copy; {new Date().getFullYear()} Edinburgh University Chamber Orchestra &mdash; Education Hub.
        </p>

        <a
          href={CREDIT.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${CREDIT.prefix} ${CREDIT.label}`}
          className="group mt-4 inline-flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          <span>{CREDIT.prefix}</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-white/70 group-hover:text-pop-coral transition-colors">
            {/* Spins on hover like the logo marks on the other EUCO sites; Tailwind utilities
                so this file needs no extra CSS. Motion is switched off for reduced-motion users. */}
            <InlineSvg
              name="paolo-mark"
              className="block h-4 w-4 [&>svg]:h-full [&>svg]:w-full transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.8] group-hover:rotate-[360deg] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0"
            />
            {CREDIT.label}
          </span>
        </a>
      </div>
    </footer>
  );
}
