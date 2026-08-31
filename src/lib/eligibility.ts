// Shared discount-eligibility logic used by the standalone /eligibility page
// and the inline checker embedded in the students (and veterans) hero.

export type Kind = 'student' | 'veteran';
// 'eligible' = verified now · 'no' = not a student email · 'manual' = verify at signup
export type Verdict = 'eligible' | 'no' | 'manual' | 'invalid';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Academic domains: .edu, .edu.au, .ac.uk, .ac.nz, .sch.uk, edu.xx, ac.xx …
const ACADEMIC_RE = /(?:\.edu|\.edu\.[a-z]{2,3}|\.ac\.[a-z]{2,3}|\.sch\.[a-z]{2,3})$/i;
// Military domains: army.mil, .mil.uk, mod.uk, .mod.uk
const MILITARY_RE = /(?:^|\.)(?:mil(?:\.[a-z]{2,3})?|mod\.uk)$/i;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isAcademicEmail(value: string): boolean {
  const domain = value.trim().toLowerCase().split('@')[1] || '';
  return ACADEMIC_RE.test(domain);
}

export function checkEligibility(email: string, kind: Kind): Verdict {
  const value = email.trim().toLowerCase();
  if (!EMAIL_RE.test(value)) return 'invalid';
  const domain = value.split('@')[1] || '';
  if (kind === 'student') return ACADEMIC_RE.test(domain) ? 'eligible' : 'no';
  // Veterans: an official military email verifies instantly; otherwise we
  // confirm service records at signup — still eligible either way.
  return MILITARY_RE.test(domain) ? 'eligible' : 'manual';
}
