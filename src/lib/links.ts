/* Where the marketing site hands off to the product.

   Signing up and logging in both happen in the app, not here, so every
   "Get started for free" and "Log in" points at this one URL. Keeping it in
   one place means the handoff moves with a single edit rather than a sweep
   through every hero, navbar and CTA block.

   Note this is deliberately NOT used by the flows that still live on the
   marketing site — the student and veteran waitlist and the sales demo form
   under /get-started, which the app doesn't handle yet. Those keep their
   internal hrefs. */

export const APP_SIGNUP_URL = 'https://app.reslink.io/sign-up';

/* Log in points at the same place for now: the app's sign-up page is where
   returning users get routed on too. Split this out if the app grows a
   dedicated login route. */
export const APP_LOGIN_URL = APP_SIGNUP_URL;

/* The affiliate programme runs on FirstPromoter, not on our own signup —
   affiliates get their dashboard, referral links and payouts there, so
   "Apply for the program" leaves the site entirely. */
export const AFFILIATE_SIGNUP_URL = 'https://reslink.firstpromoter.com';

/* Open roles live on our own Reslink company page — we hire through the
   product. Every "Careers" and "See open positions" link points here, which
   leaves the in-repo /careers page with no inbound links. */
export const CAREERS_URL = 'https://app.reslink.io/company/reslink';
