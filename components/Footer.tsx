import InlineSvg from "./InlineSvg";

// Ported from the live CRA site's src/components/EducationFooter.js.
// react-router-dom's <Link to="/"> back to the main homepage now points at
// the actual separately-deployed main site (eu-co.co.uk) rather than an
// internal route, since this app is deployed on its own subdomain.
const MAIN_SITE_URL = "https://eu-co.co.uk";

export default function Footer() {
  return (
    <footer className="bg-black mt-16 py-8 border-t-2 border-blue-600/30">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-400 mb-4 hover:text-white transition-colors duration-300">
            Proudly sponsored by Stringers of Edinburgh:
          </h3>
          <a
            href="https://www.stringersedinburgh.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Stringers Music"
            className="inline-block text-gray-400 hover:text-white transition-colors duration-300 [&>svg]:h-12 [&>svg]:w-auto [&>svg]:mx-auto"
          >
            <InlineSvg name="stringers-logo" />
          </a>
        </div>

        <div className="flex justify-center items-center space-x-6 mb-4">
          <a
            href={MAIN_SITE_URL}
            aria-label="Back to main homepage"
            className="text-gray-400 hover:text-white transition-colors duration-300 [&>svg]:h-12 [&>svg]:w-auto"
          >
            <InlineSvg name="euco-logo" />
          </a>

          <a
            href="https://www.eusa.ed.ac.uk/activities/view/edinburgh-university-chamber-orchestra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Edinburgh University Students' Association"
            className="text-gray-400 hover:text-white transition-colors duration-300 [&>svg]:w-12 [&>svg]:h-12"
          >
            <InlineSvg name="eusa-logo" />
          </a>

          <a
            href="https://www.ed.ac.uk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="University of Edinburgh"
            className="text-gray-400 hover:text-white transition-colors duration-300 [&>svg]:h-8 [&>svg]:w-auto"
          >
            <InlineSvg name="UoE-logo" />
          </a>

          <a
            href="https://www.instagram.com/edunichamberorchestra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-400 hover:text-white transition-colors duration-300 [&>svg]:w-6 [&>svg]:h-6"
          >
            <InlineSvg name="insta" />
          </a>

          <a
            href="https://www.facebook.com/EdinburghUniversityChamberOrchestra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-400 hover:text-white transition-colors duration-300 [&>svg]:w-6 [&>svg]:h-6"
          >
            <InlineSvg name="facebook" />
          </a>
        </div>

        <p className="hover:text-white transition-colors duration-300">
          &copy; {new Date().getFullYear()} Edinburgh University Chamber Orchestra. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
