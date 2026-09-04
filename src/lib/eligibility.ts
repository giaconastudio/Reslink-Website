// Shared discount-eligibility logic used by the standalone /eligibility page
// and the inline checker embedded in the students (and veterans) hero.

export type Kind = 'student' | 'veteran';
// 'eligible' = verified now · 'no' = not a student email · 'manual' = verify at signup
export type Verdict = 'eligible' | 'no' | 'manual' | 'invalid';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Academic suffixes we can confirm on sight, per the country list we work
   from. A suffix here means "eligible immediately"; nothing else does.

   Deliberately an explicit list, not a .edu.xx / .ac.xx wildcard — the
   wildcard matches suffixes that no country actually issues, which is how
   addresses that aren't academic at all end up being waved through. */
const ACADEMIC_SUFFIXES = [
  '.edu',                                     // United States
  '.ac.uk',                                   // United Kingdom
  '.edu.au', '.ac.nz',                        // Australia, New Zealand
  '.ac.in', '.edu.in',                        // India
  '.edu.pk', '.edu.bd', '.ac.bd', '.ac.lk',   // Pakistan, Bangladesh, Sri Lanka
  '.edu.sg', '.edu.my', '.edu.hk',            // Singapore, Malaysia, Hong Kong
  '.edu.cn', '.edu.tw', '.ac.jp', '.ac.kr',   // China, Taiwan, Japan, South Korea
  '.ac.id', '.ac.th', '.edu.vn', '.edu.ph',   // Indonesia, Thailand, Vietnam, Philippines
  '.ac.za', '.ac.ke', '.edu.ng', '.edu.gh',   // South Africa, Kenya, Nigeria, Ghana
  '.ac.ug', '.ac.tz', '.ac.zw',               // Uganda, Tanzania, Zimbabwe
  '.edu.eg', '.edu.sa', '.ac.ae', '.ac.il',   // Egypt, Saudi Arabia, UAE, Israel
  '.edu.tr',                                  // Turkey
  '.edu.mx', '.edu.ar', '.edu.co', '.edu.pe', // Mexico, Argentina, Colombia, Peru
  '.ac.be', '.ac.at',                         // Belgium, Austria (not universal there)
];

/* Countries with no academic suffix at all — Canada, Ireland, Brazil, Chile,
   Spain, France, Germany, Italy, the Netherlands, Switzerland, the Nordics,
   Poland, Czechia, Portugal — put their universities on ordinary national
   domains (utoronto.ca, tum.de, tudelft.nl, polimi.it). Those can't be
   confirmed from the address, so they go to manual review rather than being
   either waved through or turned away. */

// Military domains: army.mil, .mil.uk, mod.uk, .mod.uk
const MILITARY_RE = /(?:^|\.)(?:mil(?:\.[a-z]{2,3})?|mod\.uk)$/i;

/* Consumer mailbox providers. These are the only addresses we're confident
   are *not* institutional, so they're the only ones that get a straight no.
   Anything else unrecognised is assumed to be a school's own domain and sent
   down the manual-verification path. */
const CONSUMER_PROVIDERS = new Set([
  'gmail', 'googlemail', 'yahoo', 'ymail', 'rocketmail',
  'hotmail', 'outlook', 'live', 'msn', 'passport',
  'icloud', 'me', 'mac', 'aol',
  'proton', 'protonmail', 'pm', 'tutanota', 'fastmail', 'hushmail',
  'gmx', 'web', 'mail', 'email', 'inbox', 'zoho', 'yandex',
  'qq', '163', '126', 'sina', 'naver', 'daum', 'hanmail', 'rediffmail',
  'orange', 'wanadoo', 'laposte', 'free', 't-online', 'libero', 'virgilio',
  'bol', 'uol', 'terra', 'seznam', 'wp', 'onet', 'o2', 'abv', 'bigpond',
]);

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

function isAcademicDomain(domain: string): boolean {
  return ACADEMIC_SUFFIXES.some(suffix => domain.endsWith(suffix));
}

export function isAcademicEmail(value: string): boolean {
  const domain = value.trim().toLowerCase().split('@')[1] || '';
  return isAcademicDomain(domain);
}

function isConsumerEmail(domain: string): boolean {
  return CONSUMER_PROVIDERS.has(domain.split('.')[0]);
}

export function checkEligibility(email: string, kind: Kind): Verdict {
  const value = email.trim().toLowerCase();
  if (!EMAIL_RE.test(value)) return 'invalid';
  const domain = value.split('@')[1] || '';

  if (kind === 'student') {
    // Recognisably academic — confirm on the spot.
    if (isAcademicDomain(domain)) return 'eligible';
    // A personal mailbox is the one case we can fairly turn away.
    if (isConsumerEmail(domain)) return 'no';
    /* Anything else is most likely the institution's own domain, which is how
       most of the world outside the .edu/.ac.uk conventions looks. Send it to
       manual verification rather than telling a real student they don't
       qualify. */
    return 'manual';
  }

  // Veterans: an official military email verifies instantly; otherwise we
  // confirm service records at signup — still eligible either way.
  return MILITARY_RE.test(domain) ? 'eligible' : 'manual';
}
