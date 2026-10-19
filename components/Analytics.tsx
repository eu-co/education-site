"use client";

// =============================================================================
// components/Analytics.tsx -- PostHog (cookieless) + the same click tracking as
// the main site. ADD ONCE to app/layout.tsx, just before </body>:
//
//     import Analytics from "@/components/Analytics";
//     ...
//         <Analytics />
//       </body>
//
// Nothing is sent unless NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN was set at build time
// (docker-compose passes it from the same .env as the other sites). Cookieless:
// no cookies, no consent banner. See main-site/src/scripts/track.js for the
// event list; any link with data-track="event_name" data-track-xyz="value" is sent
// as that event with property xyz.
// =============================================================================
import { useEffect } from "react";
import Script from "next/script";

const TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
const PROXY = process.env.NEXT_PUBLIC_POSTHOG_PROXY_PATH;

declare global {
  interface Window {
    posthog?: any;
    eucoTrack?: (name: string, props?: Record<string, unknown>) => void;
  }
}

const snake = (s: string) => s.replace(/([A-Z])/g, "_$1").replace(/^_/, "").toLowerCase();

export default function Analytics() {
  useEffect(() => {
    const track = (name: string, props: Record<string, unknown> = {}) => {
      try {
        window.posthog?.capture(name, { path: location.pathname, ...props });
      } catch {
        /* analytics must never break the page */
      }
    };
    window.eucoTrack = track;
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const tagged = target?.closest<HTMLElement>("[data-track]");
      if (tagged) {
        const props: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(tagged.dataset)) {
          if (k.startsWith("track") && k !== "track" && v) props[snake(k.slice(5))] = v;
        }
        track(tagged.dataset.track as string, props);
        return;
      }
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (link && link.host && link.host !== location.host && /^https?:$/.test(link.protocol)) {
        track("outbound_click", { domain: link.host.replace(/^www\./, ""), link_text: (link.textContent || "").trim().slice(0, 60) || undefined });
      }
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!TOKEN) return null;
  const apiHost = HOST;
  const uiHost = PROXY ? "https://eu.posthog.com" : "";
  // Same loader as PostHog's own snippet, configured cookieless (no cookies, no profiles).
  const snippet = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init(${JSON.stringify(TOKEN)},{api_host:${PROXY ? `window.location.origin+${JSON.stringify(PROXY)}` : JSON.stringify(apiHost)},${uiHost ? `ui_host:${JSON.stringify(uiHost)},` : ""}defaults:'2026-05-30',cookieless_mode:'always',person_profiles:'never'});`;
  return <Script id="posthog-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: snippet }} />;
}
