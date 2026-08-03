'use client';

import Link from 'next/link';

/** Persistent audience switch shown in both the job-seeker hero and the
 *  companies hero, so a visitor can flip back and forth instead of it
 *  disappearing once they navigate. Deliberately not pill-shaped — the
 *  social-proof pill above it already owns that shape on this page. */
export default function HeroToggle({ active, dark = false }: { active: 'jobseekers' | 'companies'; dark?: boolean }) {
  const activeColor = dark ? '#fff' : '#041635';
  const inactiveColor = dark ? 'rgba(255,255,255,0.4)' : '#9A9FA8';
  const underline = dark ? '#D8F950' : '#0C63E3';

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    textDecoration: 'none',
    fontWeight: isActive ? 700 : 500,
    color: isActive ? activeColor : inactiveColor,
    borderBottom: isActive ? `2px solid ${underline}` : '2px solid transparent',
    paddingBottom: '5px',
    transition: 'color 0.15s ease',
  });

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '28px' }}>
      <Link href="/job-seekers" style={tabStyle(active === 'jobseekers')}>For Job Seekers</Link>
      <Link href="/companies" style={tabStyle(active === 'companies')}>For Companies</Link>
    </div>
  );
}
