import InlineSvg from "./InlineSvg";

const MAIN_SITE_URL = "https://eu-co.co.uk";

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
            className="inline-block text-white/70 hover:text-pop-sun transition-colors duration-300 [&>svg]:h-12 [&>svg]:w-auto [&>svg]:mx-auto"
          >
            <InlineSvg name="stringers-logo" />
          </a>
        </div>

        <div className="flex justify-center items-center space-x-6 mb-6">
          <a
            href={MAIN_SITE_URL}
            aria-label="Back to main homepage"
            className="text-white/70 hover:text-pop-coral transition-colors duration-300 [&>svg]:h-12 [&>svg]:w-auto"
          >
            <InlineSvg name="euco-logo" />
          </a>
          <a
            href="https://www.eusa.ed.ac.uk/activities/view/edinburgh-university-chamber-orchestra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Edinburgh University Students' Association"
            className="text-white/70 hover:text-pop-sky transition-colors duration-300 [&>svg]:w-10 [&>svg]:h-10"
          >
            <InlineSvg name="eusa-logo" />
          </a>
          <a
            href="https://www.ed.ac.uk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="University of Edinburgh"
            className="text-white/70 hover:text-pop-mint transition-colors duration-300 [&>svg]:h-7 [&>svg]:w-auto"
          >
            <InlineSvg name="UoE-logo" />
          </a>
          <a
            href="https://www.instagram.com/edunichamberorchestra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/70 hover:text-pop-violet transition-colors duration-300 [&>svg]:w-6 [&>svg]:h-6"
          >
            <InlineSvg name="insta" />
          </a>
          <a
            href="https://www.facebook.com/EdinburghUniversityChamberOrchestra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/70 hover:text-pop-coral transition-colors duration-300 [&>svg]:w-6 [&>svg]:h-6"
          >
            <InlineSvg name="facebook" />
          </a>
        </div>

        <p className="text-sm">
          &copy; {new Date().getFullYear()} Edinburgh University Chamber Orchestra &mdash; Education Hub.
        </p>
      </div>
    </footer>
  );
}
