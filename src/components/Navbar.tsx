'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, Briefcase, Building2, Users, GraduationCap, ArrowRight, Zap } from 'lucide-react';

const solutions = [
  {
    label: 'Job Seekers',
    href: '/job-seekers',
    desc: 'Stand out with a video resume',
    icon: Briefcase,
    color: '#0C63E3',
    bg: '#EEF4FF',
  },
  {
    label: 'Companies',
    href: '/companies',
    desc: 'Find top talent faster',
    icon: Building2,
    color: '#7C3AED',
    bg: '#F3EEFF',
  },
  {
    label: 'Recruitment Agencies',
    href: '/agencies',
    desc: 'Scale your placements',
    icon: Users,
    color: '#0891B2',
    bg: '#ECFEFF',
  },
  {
    label: 'Universities',
    href: '/universities',
    desc: 'Empower your students',
    icon: GraduationCap,
    color: '#059669',
    bg: '#ECFDF5',
  },
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

  const linkColor = '#5C6070';
  const linkHoverBg = '#F7F8FA';
  const navLinkStyle = {
    fontSize: '14px',
    fontWeight: 500,
    color: linkColor,
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'color 0.15s, background 0.15s',
    fontFamily: 'var(--font-body)',
  } as const;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.92)' : '#fff',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #EEEEF0' : '1px solid transparent',
      transition: 'background 0.2s, border-color 0.2s, backdrop-filter 0.2s',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/">
            <Image src="/reslink-logo.png" alt="Reslink" width={140} height={36} priority style={{ height: '30px', width: 'auto' }} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="desktop-nav">
            {/* Solutions mega menu */}
            <div style={{ position: 'relative' }}
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button style={{ ...navLinkStyle, background: solutionsOpen ? linkHoverBg : 'none', border: 'none', cursor: 'pointer', color: solutionsOpen ? '#041635' : linkColor }}>
                Solutions
                <ChevronDown size={13} style={{ transform: solutionsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {solutionsOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', left: '-12px',
                  width: '480px', background: '#fff', borderRadius: '16px',
                  border: '1px solid #EEEEF0',
                  boxShadow: '0 20px 60px rgba(4,22,53,0.12), 0 4px 16px rgba(4,22,53,0.06)',
                  padding: '16px', zIndex: 100,
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px',
                }}>
                  {solutions.map(s => {
                    const Icon = s.icon;
                    return (
                      <Link key={s.href} href={s.href}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={17} color={s.color} strokeWidth={2} />
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#041635', lineHeight: 1.3, fontFamily: 'var(--font-body)' }}>{s.label}</p>
                          <p style={{ fontSize: '12px', color: '#9A9FA8', marginTop: '2px', lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                        </div>
                      </Link>
                    );
                  })}

                  {/* Featured callout */}
                  <div style={{ gridColumn: '1 / -1', marginTop: '4px', background: 'linear-gradient(135deg, #041635 0%, #0C2B6E 100%)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(216,249,80,0.15)', border: '1px solid rgba(216,249,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={13} color="#D8F950" fill="#D8F950" />
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>New: Pitch AI</p>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Generate your video script in seconds</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: '#D8F950', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                      Try it free <ArrowRight size={11} color="#D8F950" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {[['Resources', '/resources'], ['Company', '/company'], ['Pricing', '/pricing']].map(([label, href]) => (
              <Link key={href} href={href} style={navLinkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#041635'; (e.currentTarget as HTMLElement).style.background = linkHoverBg; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = linkColor; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >{label}</Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav">
            <Link href="/login" style={{ fontSize: '14px', fontWeight: 500, color: '#5C6070', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', transition: 'background 0.15s, color 0.15s', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => { (e.currentTarget.style.background = linkHoverBg); (e.currentTarget.style.color = '#041635'); }}
              onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); (e.currentTarget.style.color = '#5C6070'); }}
            >Log in</Link>
            <Link href="/signup" className="btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }}>
              Get started free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#041635' }} className="mobile-toggle">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #EEEEF0', padding: '12px 24px 20px' }}>
          {solutions.map(s => {
            const Icon = s.icon;
            return (
              <Link key={s.href} href={s.href}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #F7F8FA', textDecoration: 'none' }}
                onClick={() => setMobileOpen(false)}
              >
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={15} color={s.color} />
                </div>
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#041635', fontFamily: 'var(--font-body)' }}>{s.label}</span>
              </Link>
            );
          })}
          {[['Resources', '/resources'], ['Pricing', '/pricing'], ['Company', '/company']].map(([l, h]) => (
            <Link key={h} href={h} style={{ display: 'block', padding: '10px 0', fontSize: '15px', fontWeight: 500, color: '#041635', textDecoration: 'none', borderBottom: '1px solid #F7F8FA', fontFamily: 'var(--font-body)' }} onClick={() => setMobileOpen(false)}>{l}</Link>
          ))}
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
