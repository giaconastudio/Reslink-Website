'use client';

import Link from 'next/link';

/** Persistent audience switch shown in both the job-seeker hero and the
 *  companies hero, so a visitor can flip back and forth instead of it
 *  disappearing once they navigate. Styled as an obvious segmented
 *  switch (like an iOS toggle) so it reads as "pick one of two modes,"
 *  not as a secondary nav link. */
export default function HeroToggle({ active, dark = false }: { active: 'jobseekers' | 'companies'; dark?: boolean }) {
  const trackBg = dark ? 'rgba(255,255,255,0.08)' : '#EDEFF3';
  const trackBorder = dark ? '1px solid rgba(255,255,255,0.14)' : '1px solid #E2E4E9';
  const activeBg = dark ? '#fff' : '#041635';
  const activeColor = dark ? '#041635' : '#fff';
  const inactiveColor = dark ? 'rgba(255,255,255,0.65)' : '#5C6070';

  const segmentStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    textDecoration: 'none',
    fontWeight: 700,
    color: isActive ? activeColor : inactiveColor,
    background: isActive ? activeBg : 'transparent',
    boxShadow: isActive ? '0 2px 10px rgba(4,22,53,0.18)' : 'none',
    borderRadius: '100px',
    padding: '9px 20px',
    transition: 'color 0.2s ease, background 0.2s ease',
    whiteSpace: 'nowrap',
  });

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        background: trackBg,
        border: trackBorder,
        borderRadius: '100px',
        padding: '4px',
      }}
    >
      <Link href="/job-seekers" style={segmentStyle(active === 'jobseekers')}>For Job Seekers</Link>
      <Link href="/companies" style={segmentStyle(active === 'companies')}>For Companies</Link>
    </div>
  );
}
