export const MUSEUM_TITLE = "NET//HISTORY — 30 Years of the Web in One Scroll";

export const MUSEUM_DESCRIPTION =
  "An interactive journey through the visual evolution of the web, from early documents and personal homepages to feeds, mobile interfaces, AI, and whatever comes next.";

export const MUSEUM_SHARE_ALT =
  "NET//HISTORY — 30 years of the web in one scroll. An interactive museum.";

export const museumShareSize = {
  width: 1200,
  height: 630,
} as const;

export function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return explicit;
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) {
    return `https://${vercel}`;
  }
  return "http://localhost:3000";
}
