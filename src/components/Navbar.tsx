'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

const solutions = [
  { label: 'Job Seekers', href: '/job-seekers', desc: 'Stand out with a video resume' },
  { label: 'Companies', href: '/companies', desc: 'Find top talent faster' },
  { label: 'Recruitment Agencies', href: '/agencies', desc: 'Scale your placements' },
  { label: 'Universities', href: '/universities', desc: 'Empower your students' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Light hero: keep the bar white; just add a hairline border once scrolled.
  const onDark = false;
  const linkColor = '#5C6070';
  const linkHover = '#041635';
  const linkHoverBg = '#F7F8FA';
  const navLinkStyle = { fontSize: '14px', fontWeight: 500, color: linkColor, textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s, background 0.15s', fontFamily: 'var(--font-body)' } as const;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: '#fff',
      borderBottom: scrolled ? '1px solid #EEEEF0' : '1px solid transparent',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/"><Image src="/reslink-logo.png" alt="Reslink" width={140} height={36} priority style={{ height: '30px', width: 'auto', filter: onDark ? 'brightness(0) invert(1)' : 'none', transition: 'filter 0.2s' }} /></Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {/* Solutions dropdown */}
            <div style={{ position: 'relative' }}
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button style={{ ...navLinkStyle, background: 'none', border: 'none', cursor: 'pointer' }}>
                Solutions <ChevronDown size={13} style={{ transform: solutionsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
              </button>
              {solutionsOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '4px', width: '240px', background: '#fff', borderRadius: '12px', border: '1px solid #EEEEF0', boxShadow: '0 8px 32px rgba(4,22,53,0.1)', padding: '8px', zIndex: 100 }}>
                  {solutions.map(s => (
                    <Link key={s.href} href={s.href} style={{ display: 'flex', flexDirection: 'column', padding: '10px 12px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#041635' }}>{s.label}</span>
                      <span style={{ fontSize: '12px', color: '#9A9FA8', marginTop: '2px' }}>{s.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[['Resources', '/resources'], ['Company', '/company'], ['Pricing', '/pricing']].map(([label, href]) => (
              <Link key={href} href={href} style={navLinkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = linkHover; (e.currentTarget as HTMLElement).style.background = linkHoverBg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = linkColor; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >{label}</Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
            <Link href="/login" style={{ fontSize: '14px', fontWeight: 600, color: onDark ? '#fff' : '#041635', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', transition: 'background 0.15s, color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = linkHoverBg)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >Log in</Link>
            <Link href="/signup" className="btn-primary" style={{ padding: '10px 18px', fontSize: '14px' }}>
              Get started free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: (onDark && !mobileOpen) ? '#fff' : '#041635' }} className="mobile-toggle">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #EEEEF0', padding: '12px 24px 20px' }}>
          {solutions.map(s => <Link key={s.href} href={s.href} style={{ display: 'block', padding: '10px 0', fontSize: '15px', fontWeight: 500, color: '#041635', textDecoration: 'none', borderBottom: '1px solid #F7F8FA' }} onClick={() => setMobileOpen(false)}>{s.label}</Link>)}
          {[['Pricing', '/pricing'], ['Company', '/company']].map(([l, h]) => <Link key={h} href={h} style={{ display: 'block', padding: '10px 0', fontSize: '15px', fontWeight: 500, color: '#041635', textDecoration: 'none', borderBottom: '1px solid #F7F8FA' }} onClick={() => setMobileOpen(false)}>{l}</Link>)}
          <Link href="/signup" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }} onClick={() => setMobileOpen(false)}>Get started free</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
