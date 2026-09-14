/* Where the marketing site hands off to the product.

   Signing up and logging in both happen in the app, not here, so every
   "Get started for free" and "Log in" points at the app. Keeping the URLs in
   one place means the handoff moves with a single edit rather than a sweep
   through every hero, navbar and CTA block.

   Note this is deliberately NOT used by the flows that still live on the
   marketing site — the student and veteran waitlist and the sales demo form
   under /get-started, which the app doesn't handle yet. Those keep their
   internal hrefs. */

export const APP_SIGNUP_URL = 'https://app.reslink.io/sign-up';

/* Returning users get the app's own sign-in page. This aliased APP_SIGNUP_URL
   while the app had no dedicated login route, which meant anyone clicking
   "Log in" landed on sign-up; it has one now, so the two are separate. */
export const APP_LOGIN_URL = 'https://app.reslink.io/sign-in';

/* The affiliate programme runs on FirstPromoter, not on our own signup —
   affiliates get their dashboard, referral links and payouts there, so
   "Apply for the program" leaves the site entirely. */
export const AFFILIATE_SIGNUP_URL = 'https://reslink.firstpromoter.com';

/* Open roles live on our own Reslink company page — we hire through the
   product. Every "Careers" and "See open positions" link points here, which
   leaves the in-repo /careers page with no inbound links. */
export const CAREERS_URL = 'https://app.reslink.io/company/reslink';
