'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown, Menu, X,
  Briefcase, Building2, Users, GraduationCap,
  BookOpen, LayoutTemplate, LifeBuoy,
  Info, Rocket, Phone,
  ArrowRight, Zap,
} from 'lucide-react';

const solutions = [
  { label: 'Job Seekers', href: 'https://reslink-website.vercel.app', desc: 'Stand out with a video resume', icon: Briefcase, color: '#0C63E3', bg: '#EEF4FF' },
  { label: 'Companies', href: '/companies', desc: 'Find top talent faster', icon: Building2, color: '#7C3AED', bg: '#F3EEFF' },
  { label: 'Recruitment Agencies', href: '/agencies', desc: 'Scale your placements', icon: Users, color: '#0891B2', bg: '#ECFEFF' },
  { label: 'Universities', href: '/universities', desc: 'Empower your students', icon: GraduationCap, color: '#059669', bg: '#ECFDF5' },
];

const resources = [
  { label: 'Blog', href: '/blog', desc: 'Tips, guides, and career advice', icon: BookOpen, color: '#D97706', bg: '#FFFBEB' },
  { label: 'Free Templates', href: '/templates', desc: 'Ready-to-use video resume scripts', icon: LayoutTemplate, color: '#0C63E3', bg: '#EEF4FF' },
  { label: 'Help Center', href: '/help', desc: 'Answers to common questions', icon: LifeBuoy, color: '#059669', bg: '#ECFDF5' },
];

const company = [
  { label: 'About Us', href: '/about', desc: 'Our mission and story', icon: Info, color: '#5C6070', bg: '#F7F8FA', badge: null },
  { label: 'Careers', href: '/careers', desc: 'Join the team', icon: Rocket, color: '#7C3AED', bg: '#F3EEFF', badge: "we're hiring" },
  { label: 'Contact Us', href: '/contact', desc: 'Get in touch with our team', icon: Phone, color: '#0891B2', bg: '#ECFEFF', badge: null },
];

type DropdownKey = 'solutions' | 'resources' | 'company' | null;

function DropItem({ href, icon: Icon, color, bg, label, desc, badge, onClick }: {
  href: string; icon: React.ElementType; color: string; bg: string;
  label: string; desc: string; badge?: string | null; onClick?: () => void;
}) {
  const isExternal = href.startsWith('http');
  return (
    <Link href={href} onClick={onClick} {...(isExternal ? {} : {})}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 10px', borderRadius: '8px', textDecoration: 'none', transition: 'background 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={14} color={color} strokeWidth={1.8} />
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [open, setOpen] = useState<DropdownKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const linkColor = '#5C6070';
  const linkHoverBg = '#F7F8FA';
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
      background: scrolled ? 'rgba(255,255,255,0.92)' : '#fff',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #EEEEF0' : '1px solid transparent',
      transition: 'background 0.2s, border-color 0.2s',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/">
            <Image src="/reslink-og.svg" alt="Reslink" width={140} height={36} priority style={{ height: '30px', width: 'auto' }} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="desktop-nav">

            {/* Solutions */}
            <div style={{ position: 'relative' }} onMouseEnter={() => openDropdown('solutions')} onMouseLeave={scheduleClose}>
              <button style={{ fontSize: '14px', fontWeight: 500, color: open === 'solutions' ? '#041635' : linkColor, background: open === 'solutions' ? linkHoverBg : 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s, background 0.15s', fontFamily: 'var(--font-body)' }}>
                Solutions <ChevronDown size={13} style={{ transform: open === 'solutions' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {open === 'solutions' && (
                <div onMouseEnter={() => openDropdown('solutions')} onMouseLeave={scheduleClose} style={{ position: 'absolute', top: '100%', left: '-8px', paddingTop: '6px', zIndex: 100 }}>
                <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #EEEEF0', boxShadow: '0 8px 30px rgba(4,22,53,0.1), 0 2px 8px rgba(4,22,53,0.06)', padding: '8px', minWidth: '240px' }}>
                  {solutions.map(s => <DropItem key={s.href} {...s} />)}
                  {/* Compact Pitch AI callout */}
                  <div style={{ marginTop: '6px', background: 'linear-gradient(135deg, #041635, #0C2B6E)', borderRadius: '8px', padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(216,249,80,0.15)', border: '1px solid rgba(216,249,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Zap size={11} color="#D8F950" fill="#D8F950" />
                      </div>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>New: Pitch AI</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 600, color: '#D8F950', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                      Try it <ArrowRight size={10} color="#D8F950" />
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div style={{ position: 'relative' }} onMouseEnter={() => openDropdown('resources')} onMouseLeave={scheduleClose}>
              <button style={{ fontSize: '14px', fontWeight: 500, color: open === 'resources' ? '#041635' : linkColor, background: open === 'resources' ? linkHoverBg : 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s, background 0.15s', fontFamily: 'var(--font-body)' }}>
                Resources <ChevronDown size={13} style={{ transform: open === 'resources' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {open === 'resources' && (
                <div onMouseEnter={() => openDropdown('resources')} onMouseLeave={scheduleClose} style={{ position: 'absolute', top: '100%', left: '-8px', paddingTop: '6px', zIndex: 100 }}>
                <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #EEEEF0', boxShadow: '0 8px 30px rgba(4,22,53,0.1), 0 2px 8px rgba(4,22,53,0.06)', padding: '8px', minWidth: '220px' }}>
                  {resources.map(r => <DropItem key={r.href} {...r} />)}
                </div>
                </div>
              )}
            </div>

            {/* Company */}
            <div style={{ position: 'relative' }} onMouseEnter={() => openDropdown('company')} onMouseLeave={scheduleClose}>
              <button style={{ fontSize: '14px', fontWeight: 500, color: open === 'company' ? '#041635' : linkColor, background: open === 'company' ? linkHoverBg : 'none', border: 'none', cursor: 'pointer', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s, background 0.15s', fontFamily: 'var(--font-body)' }}>
                Company <ChevronDown size={13} style={{ transform: open === 'company' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {open === 'company' && (
                <div onMouseEnter={() => openDropdown('company')} onMouseLeave={scheduleClose} style={{ position: 'absolute', top: '100%', left: '-8px', paddingTop: '6px', zIndex: 100 }}>
                <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #EEEEF0', boxShadow: '0 8px 30px rgba(4,22,53,0.1), 0 2px 8px rgba(4,22,53,0.06)', padding: '8px', minWidth: '220px' }}>
                  {company.map(c => <DropItem key={c.href} {...c} />)}
                </div>
                </div>
              )}
            </div>

            <Link href="/pricing" style={navLinkStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#041635'; (e.currentTarget as HTMLElement).style.background = linkHoverBg; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = linkColor; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >Pricing</Link>
          </nav>

          {/* Right CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-nav">
            <Link href="/login" style={{ fontSize: '14px', fontWeight: 500, color: '#5C6070', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', transition: 'background 0.15s, color 0.15s', fontFamily: 'var(--font-body)' }}
              onMouseEnter={e => { (e.currentTarget.style.background = linkHoverBg); (e.currentTarget.style.color = '#041635'); }}
              onMouseLeave={e => { (e.currentTarget.style.background = 'transparent'); (e.currentTarget.style.color = '#5C6070'); }}
            >Log in</Link>
            <Link href="/get-started" className="btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }}>
              Get started free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => { setMobileOpen(!mobileOpen); setMobileExpanded(null); }} style={{ display: 'none', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#041635' }} className="mobile-toggle">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — collapsible sections */}
      {mobileOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #EEEEF0', padding: '8px 20px 20px', maxHeight: '80vh', overflowY: 'auto' }}>

          {/* Solutions accordion */}
          {[
            { key: 'solutions', label: 'Solutions', items: solutions },
            { key: 'resources', label: 'Resources', items: resources },
            { key: 'company', label: 'Company', items: company },
          ].map(({ key, label, items }) => (
            <div key={key} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <button
                onClick={() => toggleMobileSection(key)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '13px 0', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{label}</span>
                <ChevronDown size={16} color="#9A9FA8" style={{ transform: mobileExpanded === key ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {mobileExpanded === key && (
                <div style={{ paddingBottom: '8px' }}>
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 4px', textDecoration: 'none' }}
                        onClick={() => setMobileOpen(false)}
                      >
                        <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={13} color={item.color} />
                        </div>
                        <div>
                          <span style={{ fontSize: '14px', fontWeight: 500, color: '#041635', fontFamily: 'var(--font-body)', display: 'block' }}>{item.label}</span>
                          {'badge' in item && (item as { badge?: string | null }).badge && (
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#0C63E3', background: '#EEF4FF', border: '1px solid #C7DEFF', borderRadius: '100px', padding: '1px 7px', fontFamily: 'var(--font-body)', marginLeft: '6px' }}>{(item as { badge?: string | null }).badge}</span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <Link href="/pricing" style={{ display: 'block', padding: '13px 0', fontSize: '15px', fontWeight: 600, color: '#041635', textDecoration: 'none', borderBottom: '1px solid #F3F4F6', fontFamily: 'var(--font-body)' }} onClick={() => setMobileOpen(false)}>Pricing</Link>
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
