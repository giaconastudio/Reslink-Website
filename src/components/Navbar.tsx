'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown, Menu, X,
  Briefcase, Building2, Users, GraduationCap,
  BookOpen, LayoutTemplate, LifeBuoy,
  Compass, Rocket, Phone,
  ArrowRight, Zap, Flag,
} from 'lucide-react';

const solutions = [
  { label: 'Job Seekers', href: '/job-seekers', desc: 'Stand out with a video resume', icon: Briefcase, forOrg: false },
  { label: 'Students', href: '/students', desc: 'Land your first job or internship', icon: GraduationCap, forOrg: false },
  { label: 'Veterans', href: '/veterans', desc: 'Translate military skills to civilian roles', icon: Flag, forOrg: false },
  { label: 'Companies', href: '/companies', desc: 'Find top talent faster', icon: Building2, forOrg: true },
  { label: 'Recruitment Agencies', href: '/agencies', desc: 'Scale your placements', icon: Users, forOrg: true },
  { label: 'Universities', href: '/universities', desc: 'Empower your students', icon: GraduationCap, forOrg: true },
];

const resources = [
  { label: 'Blog', href: '/blog', desc: 'Tips, guides, and career advice', icon: BookOpen },
  { label: 'Free Templates', href: '/templates', desc: 'Ready-to-use video resume scripts', icon: LayoutTemplate },
  { label: 'Help Center', href: '/help', desc: 'Answers to common questions', icon: LifeBuoy },
];

const company = [
  { label: 'About Us', href: '/about', desc: 'Our mission and story', icon: Compass, badge: null },
  { label: 'Careers', href: '/careers', desc: 'Join the team', icon: Rocket, badge: "we're hiring" },
  { label: 'Contact Us', href: '/contact', desc: 'Get in touch with our team', icon: Phone, badge: null },
];

type DropdownKey = 'solutions' | 'resources' | 'company' | null;

function DropItem({ href, icon: Icon, label, desc, badge, onClick }: {
  href: string; icon: React.ElementType;
  label: string; desc: string; badge?: string | null; onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith('http');
  return (
    <Link href={href} onClick={onClick} {...(isExternal ? {} : {})}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#F7F8FA'; setHovered(true); }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; setHovered(false); }}
    >
      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: hovered ? '#EEF4FF' : '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}>
        <Icon size={14} color={hovered ? '#0C63E3' : '#6B7280'} strokeWidth={1.8} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#041635', lineHeight: 1.2, fontFamily: 'var(--font-body)' }}>{label}</p>
          {badge && (
            <span style={{ fontSize: '10px', fontWeight: 700, color: '#0C63E3', background: '#EEF4FF', border: '1px solid #C7DEFF', borderRadius: '100px', padding: '1px 7px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
              {badge}
            </span>
          )}
        </div>
        <p style={{ fontSize: '11px', color: '#9A9FA8', lineHeight: 1.3, fontFamily: 'var(--font-body)' }}>{desc}</p>
      </div>
    </Link>
  );
}

export default function Navbar({ dark = false, blue = false }: { dark?: boolean; blue?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [open, setOpen] = useState<DropdownKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const toggleDropdown = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(prev => prev === key ? null : key);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const isDark = dark || blue;
  const linkColor = isDark ? 'rgba(255,255,255,0.85)' : '#5C6070';
  const linkActiveColor = isDark ? '#fff' : '#041635';
  const linkHoverBg = isDark ? 'rgba(255,255,255,0.12)' : '#F7F8FA';
  const navLinkStyle = {
    fontSize: '14px', fontWeight: 500, color: linkColor, textDecoration: 'none',
    padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center',
    gap: '4px', transition: 'color 0.15s, background 0.15s', fontFamily: 'var(--font-body)',
  } as const;

  const toggleMobileSection = (key: string) =>
    setMobileExpanded(prev => prev === key ? null : key);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: blue
        ? (scrolled ? 'rgba(10,82,196,0.97)' : '#0C63E3')
        : dark
          ? (scrolled ? 'rgba(4,22,53,0.96)' : '#041635')
          : (scrolled ? 'rgba(255,255,255,0.92)' : '#fff'),
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled
        ? (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #EEEEF0')
        : '1px solid transparent',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" onClick={() => window.scrollTo(0, 0)}>
            <Image src="/reslink-og.svg" alt="Reslink" width={140} height={36} priority style={{ height: '30px', width: 'auto', filter: isDark ? 'brightness(0) invert(1)' : 'none' }} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="desktop-nav">

            {/* Solutions — mega-menu */}
            <div style={{ position: 'relative' }} onMouseEnter={() => openDropdown('solutions')} onMouseLeave={scheduleClose}>
              <button onClick={() => toggleDropdown('solutions')} style={{ fontSize: '14px', fontWeight: 500, color: open === 'solutions' ? linkActiveColor : linkColor, background: open === 'solutions' ? linkHoverBg : 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s, background 0.15s', fontFamily: 'var(--font-body)' }}>
                Solutions <ChevronDown size={13} style={{ transform: open === 'solutions' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {open === 'solutions' && (
                <div onMouseEnter={() => openDropdown('solutions')} onMouseLeave={scheduleClose} style={{ position: 'absolute', top: '100%', left: '-8px', paddingTop: '6px', zIndex: 100 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #EEEEF0', boxShadow: '0 12px 40px rgba(4,22,53,0.12), 0 2px 8px rgba(4,22,53,0.06)', padding: '16px', minWidth: '540px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', alignItems: 'start' }}>
                      <div style={{ paddingRight: '12px', borderRight: '1px solid #F3F4F6' }}>
                        <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B0B8C8', fontFamily: 'var(--font-body)', marginBottom: '6px', padding: '0 6px' }}>For individuals</p>
                        {solutions.filter(s => !s.forOrg).map(s => <DropItem key={s.href} {...s} onClick={() => setOpen(null)} />)}
                      </div>
                      <div style={{ paddingLeft: '12px' }}>
                        <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B0B8C8', fontFamily: 'var(--font-body)', marginBottom: '6px', padding: '0 6px' }}>For organizations</p>
                        {solutions.filter(s => s.forOrg).map(s => <DropItem key={s.href} {...s} onClick={() => setOpen(null)} />)}
                      </div>
                    </div>
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Used by 10,000+ professionals worldwide</p>
                      <Link href="/get-started" onClick={() => setOpen(null)} style={{ fontSize: '12px', fontWeight: 700, color: '#0C63E3', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                        Try free <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div style={{ position: 'relative' }} onMouseEnter={() => openDropdown('resources')} onMouseLeave={scheduleClose}>
              <button onClick={() => toggleDropdown('resources')} style={{ fontSize: '14px', fontWeight: 500, color: open === 'resources' ? linkActiveColor : linkColor, background: open === 'resources' ? linkHoverBg : 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s, background 0.15s', fontFamily: 'var(--font-body)' }}>
                Resources <ChevronDown size={13} style={{ transform: open === 'resources' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {open === 'resources' && (
                <div onMouseEnter={() => openDropdown('resources')} onMouseLeave={scheduleClose} style={{ position: 'absolute', top: '100%', left: '-8px', paddingTop: '6px', zIndex: 100 }}>
                <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #EEEEF0', boxShadow: '0 12px 40px rgba(4,22,53,0.12), 0 2px 8px rgba(4,22,53,0.06)', padding: '8px', minWidth: '230px' }}>
                  {resources.map(r => <DropItem key={r.href} {...r} onClick={() => setOpen(null)} />)}
                </div>
                </div>
              )}
            </div>

            {/* Company */}
            <div style={{ position: 'relative' }} onMouseEnter={() => openDropdown('company')} onMouseLeave={scheduleClose}>
              <button onClick={() => toggleDropdown('company')} style={{ fontSize: '14px', fontWeight: 500, color: open === 'company' ? linkActiveColor : linkColor, background: open === 'company' ? linkHoverBg : 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s, background 0.15s', fontFamily: 'var(--font-body)' }}>
                Company <ChevronDown size={13} style={{ transform: open === 'company' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {open === 'company' && (
                <div onMouseEnter={() => openDropdown('company')} onMouseLeave={scheduleClose} style={{ position: 'absolute', top: '100%', left: '-8px', paddingTop: '6px', zIndex: 100 }}>
                <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #EEEEF0', boxShadow: '0 12px 40px rgba(4,22,53,0.12), 0 2px 8px rgba(4,22,53,0.06)', padding: '8px', minWidth: '230px' }}>
                  {company.map(c => <DropItem key={c.href} {...c} onClick={() => setOpen(null)} />)}
                </div>
                </div>
              )}
            </div>

            <Link href="/pricing" style={navLinkStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = linkActiveColor; (e.currentTarget as HTMLElement).style.background = linkHoverBg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = linkColor; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >Pricing</Link>
          </nav>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav">
            <Link href="/login" style={{ fontSize: '14px', fontWeight: 500, color: linkColor, textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', transition: 'background 0.15s, color 0.15s', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => { (e.currentTarget.style.background = linkHoverBg); (e.currentTarget.style.color = linkActiveColor); }}
              onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); (e.currentTarget.style.color = linkColor); }}
            >Log in</Link>
            <Link href="/get-started" className="btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }}>
              Get started free
            </Link>
          </div>

          {/* Mobile: Get started + toggle */}
          <div style={{ display: 'none', alignItems: 'center', gap: '8px' }} className="mobile-toggle">
            <Link href="/get-started" className="btn-primary" style={{ padding: '8px 14px', fontSize: '13px', fontWeight: 700 }}>
              Get started
            </Link>
            <button onClick={() => { setMobileOpen(!mobileOpen); setMobileExpanded(null); }} style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: isDark ? '#fff' : '#041635', flexShrink: 0 }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — collapsible sections */}
      {mobileOpen && (
        <div style={{ background: blue ? '#0C63E3' : dark ? '#041635' : '#fff', borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #EEEEF0', padding: '8px 20px 20px', maxHeight: 'calc(100vh - 68px)', overflowY: 'auto' }}>

          {/* Solutions accordion */}
          {[
            { key: 'solutions', label: 'Solutions', items: solutions },
            { key: 'resources', label: 'Resources', items: resources },
            { key: 'company', label: 'Company', items: company },
          ].map(({ key, label, items }) => (
            <div key={key} style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #F3F4F6' }}>
              <button
                onClick={() => toggleMobileSection(key)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: isDark ? '#fff' : '#041635', fontFamily: 'var(--font-body)' }}>{label}</span>
                <ChevronDown size={16} color="#9A9FA8" style={{ transform: mobileExpanded === key ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {mobileExpanded === key && (
                <div style={{ paddingBottom: '8px' }}>
                  {key === 'solutions' ? (
                    <>
                      {[
                        { groupLabel: 'For Individuals', filtered: solutions.filter(s => !s.forOrg) },
                        { groupLabel: 'For Organizations', filtered: solutions.filter(s => s.forOrg) },
                      ].map(({ groupLabel, filtered }) => (
                        <div key={groupLabel}>
                          <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: isDark ? 'rgba(255,255,255,0.35)' : '#B0B8C8', fontFamily: 'var(--font-body)', padding: '8px 4px 4px', margin: 0 }}>{groupLabel}</p>
                          {filtered.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link key={item.href} href={item.href}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 4px', textDecoration: 'none' }}
                                onClick={() => setMobileOpen(false)}
                              >
                                <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: isDark ? 'rgba(255,255,255,0.1)' : '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <Icon size={13} color={isDark ? 'rgba(255,255,255,0.7)' : '#6B7280'} />
                                </div>
                                <span style={{ fontSize: '14px', fontWeight: 500, color: isDark ? 'rgba(255,255,255,0.85)' : '#041635', fontFamily: 'var(--font-body)' }}>{item.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </>
                  ) : (
                    items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.href} href={item.href}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 4px', textDecoration: 'none' }}
                          onClick={() => setMobileOpen(false)}
                        >
                          <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: isDark ? 'rgba(255,255,255,0.1)' : '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={13} color={isDark ? 'rgba(255,255,255,0.7)' : '#6B7280'} />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '14px', fontWeight: 500, color: isDark ? 'rgba(255,255,255,0.85)' : '#041635', fontFamily: 'var(--font-body)' }}>{item.label}</span>
                            {'badge' in item && (item as { badge?: string | null }).badge && (
                              <span style={{ fontSize: '10px', fontWeight: 700, color: '#0C63E3', background: '#EEF4FF', border: '1px solid #C7DEFF', borderRadius: '100px', padding: '1px 7px', fontFamily: 'var(--font-body)' }}>{(item as { badge?: string | null }).badge}</span>
                            )}
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          ))}

          <Link href="/pricing" style={{ display: 'block', padding: '13px 0', fontSize: '15px', fontWeight: 600, color: isDark ? '#fff' : '#041635', textDecoration: 'none', borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #F3F4F6', fontFamily: 'var(--font-body)' }} onClick={() => setMobileOpen(false)}>Pricing</Link>
          <Link href="/get-started" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }} onClick={() => setMobileOpen(false)}>Get started free</Link>
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
