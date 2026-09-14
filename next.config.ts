import type { NextConfig } from "next";

// The product app moved to app.reslink.io and this site took over reslink.io.
// Everything below is a URL that used to work on the apex and now 404s here.
// These live in code rather than as Cloudflare Redirect Rules so they apply on
// both reslink.io and www.reslink.io (Vercel canonicalises the apex to www, and
// the host-scoped edge rules missed the www variant), and so the path list is
// reviewable in a PR.
const APP = "https://app.reslink.io";

// Product paths — these belong to the app, not the marketing site. Several are
// URLs users shared with each other, so they must keep resolving indefinitely.
const productRedirects = [
  // Public reslink share links. /reslink/:id is the legacy form; the app
  // redirects it on to /r/:handle/:slug itself. /r/ can never be retired:
  // badged CVs bake `${APP_FRONT_URL}/r/...?src=badge` into the printed PDF,
  // so every CV generated before the move carries a hardcoded apex URL.
  { source: "/r/:path*", destination: `${APP}/r/:path*` },
  { source: "/reslink/:id", destination: `${APP}/reslink/:id` },

  // Also shared by users: company pages and application links. NOTE the
  // singular /company/ is the product; the plural /companies is a marketing
  // page this site serves, and must not be redirected.
  { source: "/company/:name", destination: `${APP}/company/:name` },
  { source: "/application/:id", destination: `${APP}/application/:id` },

  // Signed-in surfaces. Bookmarks rather than shared links, but they were
  // reachable on the apex for years. (/password is the in-app reset screen —
  // reset emails send a code, not a link, so nothing external points here.)
  { source: "/dashboard", destination: `${APP}/dashboard` },
  { source: "/settings", destination: `${APP}/settings` },
  { source: "/profile", destination: `${APP}/profile` },
  { source: "/billing", destination: `${APP}/billing` },
  { source: "/home", destination: `${APP}/home` },
  { source: "/create/:path*", destination: `${APP}/create/:path*` },
  { source: "/record-video", destination: `${APP}/record-video` },
  { source: "/deactivated-reslink", destination: `${APP}/deactivated-reslink` },
  { source: "/sign-in", destination: `${APP}/sign-in` },
  { source: "/sign-up", destination: `${APP}/sign-up` },
  { source: "/password", destination: `${APP}/password` },
];

// Deliberately NOT redirected: /auth/socialite/callback. The API builds that
// URL fresh from APP_FRONT_URL on every OAuth round-trip, and that value is
// already app.reslink.io — so nothing durable points at the apex version. The
// only exposure was a flow in flight during the cutover itself.

// Marketing pages that survived the move but changed slug. Redirected to
// preserve inbound links and search ranking.
const renamedMarketingRedirects = [
  { source: "/privacy-policy", destination: "/privacy" },
  { source: "/terms-of-service", destination: "/terms" },
  { source: "/help-center", destination: "/help" },
  { source: "/contact-sales", destination: "/contact/sales" },
  { source: "/contact-support", destination: "/contact/support" },
  { source: "/resume-templates", destination: "/templates" },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [...productRedirects, ...renamedMarketingRedirects].map((r) => ({
      ...r,
      permanent: true,
    }));
  },
};

export default nextConfig;
