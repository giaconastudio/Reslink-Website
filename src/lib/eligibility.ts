// Shared discount-eligibility logic used by the standalone /eligibility page
// and the inline checker embedded in the students (and veterans) hero.

export type Kind = 'student' | 'veteran';
// 'eligible' = verified now · 'no' = not a student email · 'manual' = verify at signup
export type Verdict = 'eligible' | 'no' | 'manual' | 'invalid';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Domains we can recognise as academic on sight: .edu, .edu.au, .ac.uk,
   .ac.jp, .sch.uk and so on.

   This is a shortcut, not the definition of a student. Plenty of the world's
   universities sit on an ordinary national domain — utoronto.ca, tum.de,
   tudelft.nl, sorbonne-universite.fr, kth.se, polimi.it — and none of them
   match anything here. Failing to match must therefore never mean "not a
   student"; see checkEligibility. */
const ACADEMIC_RE = /(?:\.edu|\.edu\.[a-z]{2,3}|\.ac\.[a-z]{2,3}|\.sch\.[a-z]{2,3}|\.uni\.[a-z]{2,3})$/i;

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

export function isAcademicEmail(value: string): boolean {
  const domain = value.trim().toLowerCase().split('@')[1] || '';
  return ACADEMIC_RE.test(domain);
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
    if (ACADEMIC_RE.test(domain)) return 'eligible';
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
