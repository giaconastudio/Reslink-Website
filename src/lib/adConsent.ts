export type AdConsentChoice = 'granted' | 'denied';

export const AD_CONSENT_COOKIE = 'rl_ad_consent';
const COOKIE_DOMAIN = '.reslink.io';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Decides what the shared consent cookie should hold after Termly reports a state, or null to
 * leave it alone. A default state only fills a gap: www and app each report their own default,
 * and the later one must not undo a denial or an accept made on the other. An explicit choice
 * always wins.
 */
export function nextConsentCookie(
  current: AdConsentChoice | undefined,
  state: AdConsentChoice,
  explicit: boolean,
): AdConsentChoice | null {
  if (explicit) return state;
  return current === undefined ? state : null;
}

export function readAdConsentCookie(cookieString: string): AdConsentChoice | undefined {
  for (const part of cookieString.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name !== AD_CONSENT_COOKIE) continue;
    const value = rest.join('=');
    return value === 'granted' || value === 'denied' ? value : undefined;
  }
  return undefined;
}

/**
 * The parent domain shares the choice with the app. Hosts outside reslink.io (previews, localhost,
 * lookalikes such as notreslink.io) would have the cookie rejected if it named that domain, so
 * they get a host-only cookie.
 */
export function adConsentCookieDomain(hostname: string): string | undefined {
  const underReslink = hostname === 'reslink.io' || hostname.endsWith('.reslink.io');
  return underReslink ? COOKIE_DOMAIN : undefined;
}

export function writeAdConsentCookie(value: AdConsentChoice) {
  const domain = adConsentCookieDomain(window.location.hostname);
  const attributes = [
    `${AD_CONSENT_COOKIE}=${value}`,
    'Path=/',
    `Max-Age=${ONE_YEAR_SECONDS}`,
    'SameSite=Lax',
    ...(window.location.protocol === 'https:' ? ['Secure'] : []),
    ...(domain ? [`Domain=${domain}`] : []),
  ];
  document.cookie = attributes.join('; ');
}

/**
 * Reads Termly's effective advertising consent and mirrors it into the shared cookie. `explicit`
 * is true only for Termly's `consent` event; its `initialized` event reports a regional default.
 * Termly's event payloads are documented inconsistently, so the state is always read back rather
 * than taken from them. A missing state means Termly has not reported, so nothing is written.
 */
export function syncTermlyConsent(explicit: boolean) {
  const state = window.Termly?.getConsentState?.();
  if (!state) return;

  const next = nextConsentCookie(
    readAdConsentCookie(document.cookie),
    state.advertising ? 'granted' : 'denied',
    explicit,
  );
  if (next !== null) writeAdConsentCookie(next);
}
