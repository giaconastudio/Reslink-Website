'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sparkles, Video, Link2 } from 'lucide-react';

const tabs = [
  {
    id: 'analytics',
    label: 'Insights',
    icon: BarChart3,
    headline: 'View insights on Reslink engagement.',
    sub: 'Track who views your Reslinks and understand engagement levels: watch time, link clicks, location, and more.',
    bullets: [
      'See exactly who viewed your Reslink and for how long',
      'Track clicks on your resume, portfolio, and LinkedIn',
      'Know which locations and companies are engaging most',
    ],
    bg: '#041635',
    visual: (
      <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>Performance Analytics</span>
          <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', padding: '2px 8px' }}>Last 7 days</span>
        </div>
        {/* Top 2 stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '13px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              </div>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Unique Visitors</span>
              <span style={{ marginLeft: 'auto', fontSize: '9px', color: '#D8F950', fontFamily: 'var(--font-body)', fontWeight: 700 }}>+18.2%</span>
            </div>
            <p style={{ fontSize: '26px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)', lineHeight: 1 }}>98</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '13px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Avg Watch Time</span>
              <span style={{ marginLeft: 'auto', fontSize: '9px', color: '#D8F950', fontFamily: 'var(--font-body)', fontWeight: 700 }}>+12.4%</span>
            </div>
            <p style={{ fontSize: '26px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)', lineHeight: 1 }}>52s</p>
            <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>85% completion rate</p>
          </div>
        </div>
        {/* Clicks breakdown */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </div>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Clicks</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {[
              { v: '127', l: 'Reslink', d: '+18.2%' },
              { v: '19', l: 'Badge', d: '+22.1%' },
              { v: '24', l: 'Portfolio', d: '+14.7%' },
              { v: '16', l: 'LinkedIn', d: '+9.3%' },
            ].map(c => (
              <div key={c.l} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '17px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)', lineHeight: 1 }}>{c.v}</p>
                <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{c.l}</p>
                <p style={{ fontSize: '8px', color: '#D8F950', fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: '2px' }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Top locations */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px 14px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Top Locations</span>
          </div>
          {[{ city: 'Seattle, WA', pct: 35 }, { city: 'San Francisco, CA', pct: 28 }].map(l => (
            <div key={l.city} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>{l.city}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>{l.pct}%</span>
              </div>
              <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }}>
                <div style={{ height: '100%', width: `${l.pct}%`, borderRadius: '2px', background: '#E11D48' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'pitchai',
    label: 'Pitch AI',
    icon: Sparkles,
    headline: 'Enhance your video pitch with AI.',
    sub: 'Reslink Pitch AI generates a standout video script tailored to your experience and the role you\'re applying for.',
    bullets: [
      'Generates a tailored script from your resume in seconds',
      'Rewrite it shorter, longer, more casual, or more formal in one click',
      'No blank page — start from a script built for the role you want',
    ],
    bg: '#fff',
    visual: (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        {/* Modal header — premium AI branding */}
        <div style={{ background: 'linear-gradient(135deg, #0B1120 0%, #0D1829 100%)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: 'none' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, rgba(216,249,80,0.2), rgba(216,249,80,0.08))', border: '1px solid rgba(216,249,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#D8F950"><path d="M12 1.5 L13.2 9.8 L21.5 12 L13.2 14.2 L12 22.5 L10.8 14.2 L2.5 12 L10.8 9.8 Z"/></svg>
          </div>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.06em', display: 'block', lineHeight: 1.1 }}>RESLINK AI</span>
            <span style={{ fontSize: '10px', color: '#D8F950', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.04em' }}>Script Generator</span>
          </div>
          <div style={{ marginLeft: 'auto', width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
        </div>
        {/* Generated script */}
        <div style={{ padding: '14px 18px', flex: 1, overflowY: 'hidden' }}>
          <div style={{ border: '1px solid #E8EAF0', borderRadius: '10px', padding: '14px', background: '#FAFBFC', fontSize: '12px', color: '#1A1E2A', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            <p style={{ marginBottom: '10px' }}>Hey there! My name is Alex, and I am excited to introduce myself. I have 5 years of experience as a Sales Development Rep, during which I have had the opportunity to work on a variety of exciting projects.</p>
            <p style={{ marginBottom: '10px' }}>One of my proudest achievements was leading a team of 15 and increasing sales by 51%. It was an incredible learning experience that really strengthened my leadership and strategic thinking skills.</p>
            <p>I am particularly drawn to this role because it matches my skills and career goals. I believe my background aligns well with what you are looking for.</p>
          </div>
        </div>
        {/* Action buttons 2x2 */}
        <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', marginBottom: '10px' }}>
          {[
            { icon: '✂', label: 'Shorten it' },
            { icon: '💬', label: 'Make it casual' },
            { icon: '↗', label: 'Lengthen it' },
            { icon: '📄', label: 'Make it formal' },
          ].map(b => (
            <div key={b.label} style={{ border: '1px solid #E4E7EC', borderRadius: '8px', padding: '9px 12px', fontSize: '11px', fontWeight: 600, color: '#3A3F4C', fontFamily: 'var(--font-body)', textAlign: 'center', cursor: 'pointer', background: '#fff' }}>
              {b.label}
            </div>
          ))}
        </div>
        {/* Custom input */}
        <div style={{ padding: '0 18px', marginBottom: '10px' }}>
          <div style={{ border: '1px solid #E4E7EC', borderRadius: '8px', padding: '9px 12px', fontSize: '11px', color: '#B0B4BE', fontFamily: 'var(--font-body)', background: '#FAFBFC', display: 'flex', alignItems: 'center', gap: '7px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#D8F950"><path d="M12 1.5 L13.2 9.8 L21.5 12 L13.2 14.2 L12 22.5 L10.8 14.2 L2.5 12 L10.8 9.8 Z"/></svg>
            Tell us what you want to change in the script
          </div>
        </div>
        {/* Use Script CTA */}
        <div style={{ padding: '0 18px 14px' }}>
          <div style={{ background: '#D8F950', borderRadius: '8px', padding: '11px', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#041635', fontFamily: 'var(--font-body)' }}>Use Script</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'teleprompter',
    label: 'Teleprompter',
    icon: Video,
    headline: 'Look confident. Sound confident.',
    sub: 'Capture your pitch effortlessly using our in-app teleprompter, guiding you to deliver your best performance every time.',
    bullets: [
      'Scrolls your script on screen while you record',
      'Stay looking at the camera, not down at notes',
      'Record a natural, confident take on your first or second try',
    ],
    bg: '#0B0F1A',
    visual: (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Live camera feed — real person */}
        <video
          src="/videos/pip-person-compressed.mp4"
          poster="/videos/pip-person-poster.jpg"
          autoPlay muted loop playsInline preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Dark overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,15,26,0.85) 0%, rgba(11,15,26,0.1) 50%, rgba(11,15,26,0.3) 100%)' }} />
        {/* REC badge */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', borderRadius: '6px', padding: '5px 10px', zIndex: 2 }}>
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>REC 0:41</span>
        </div>
        {/* Teleprompter overlay at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(4,22,53,0.82)', backdropFilter: 'blur(10px)', padding: '14px 18px', zIndex: 2, borderTop: '1px solid rgba(216,249,80,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950' }} />
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.12em', fontFamily: 'var(--font-body)' }}>TELEPROMPTER · 1.0x</span>
          </div>
          <div style={{ overflow: 'hidden', height: '40px' }}>
            <motion.p
              animate={{ y: [0, -40] }}
              transition={{ duration: 3.5, ease: 'linear', repeat: Infinity, repeatDelay: 1.5 }}
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}
            >
              Hi, I&apos;m Oliver. I&apos;ve spent 3 years building backend systems that handle millions of requests. At HubSpot I cut API latency by 40%...
            </motion.p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'badge',
    label: 'Apply Anywhere',
    icon: Link2,
    headline: 'Your Reslink, right inside your resume.',
    sub: 'A clickable Play Intro button is embedded directly in your resume PDF. When a recruiter opens it, one click takes them straight to your video.',
    bullets: [
      'A Play Intro button embeds directly in your resume PDF',
      'Every copy of your resume carries the badge automatically',
      'See exactly how many recruiters clicked through',
    ],
    bg: '#F7F8FA',
    visual: (
      <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F7F8FA', justifyContent: 'center' }}>
        {/* Resume PDF mockup */}
        <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E4E7EC', padding: '16px 18px', boxShadow: '0 4px 16px rgba(4,22,53,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>First &amp; Last Name</p>
              <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '3px' }}>City, State · 555-000-0000 · email@gmail.com</p>
              <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: '1px' }}>linkedin.com/in/name</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#0C63E3', borderRadius: '20px', padding: '7px 13px', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>Play Intro</span>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #F0F1F4', paddingTop: '10px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>Summary</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
              <div style={{ height: '6px', borderRadius: '3px', background: '#E9EAEC', width: '100%' }} />
              <div style={{ height: '6px', borderRadius: '3px', background: '#E9EAEC', width: '85%' }} />
              <div style={{ height: '6px', borderRadius: '3px', background: '#E9EAEC', width: '92%' }} />
            </div>
            <p style={{ fontSize: '9px', fontWeight: 700, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>Experience</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ height: '6px', borderRadius: '3px', background: '#E9EAEC', width: '100%' }} />
              <div style={{ height: '6px', borderRadius: '3px', background: '#E9EAEC', width: '78%' }} />
              <div style={{ height: '6px', borderRadius: '3px', background: '#E9EAEC', width: '88%' }} />
              <div style={{ height: '6px', borderRadius: '3px', background: '#E9EAEC', width: '70%' }} />
            </div>
          </div>
        </div>
        {/* 3 benefit tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[
            { icon: '⚡', title: 'One click', desc: 'Recruiters go straight to your Reslink from any PDF viewer' },
            { icon: '🔗', title: 'Always linked', desc: 'Every copy of your resume has the badge automatically' },
            { icon: '📊', title: 'Trackable', desc: 'See how many recruiters clicked through to your Reslink' },
          ].map(b => (
            <div key={b.title} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E4E7EC', padding: '12px 10px' }}>
              <p style={{ fontSize: '14px', marginBottom: '4px' }}>{b.icon}</p>
              <p style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>{b.title}</p>
              <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// Order must mirror `tabs` so the sidebar reads top-to-bottom in the same
// sequence as the stacked cards below it.
const FEATURE_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Track', ids: ['analytics'] },
  { label: 'Create', ids: ['pitchai', 'teleprompter'] },
  { label: 'Share', ids: ['badge'] },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scrollspy: highlight whichever feature card is currently in view.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.38;
      let current = 0;
      featureRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActiveTab(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Keep the active pill scrolled into view in the horizontally-scrolling mobile nav.
  useEffect(() => {
    navRefs.current[activeTab]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeTab]);

  const goToFeature = (i: number) => {
    const el = featureRefs.current[i];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: 'clamp(72px, 9vw, 112px) 24px', background: '#F7F8FA' }}>
      <style>{`
        .feat-inner { max-width: 1060px; margin: 0 auto; }
        .feat-layout { display: grid; grid-template-columns: 248px 1fr; gap: clamp(28px, 4vw, 52px); text-align: left; }
        .feat-nav-col { min-width: 0; }
        .feat-side-sticky { position: sticky; top: 96px; display: flex; flex-direction: column; gap: 32px; }
        .feat-side-head { }
        .feat-nav { display: flex; flex-direction: column; gap: 22px; }
        .feat-group-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #9AA1AE; font-family: var(--font-body); margin-bottom: 8px; padding-left: 14px; }
        .feat-navitem {
          position: relative; display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 11px 14px; border: none; background: transparent; border-radius: 10px;
          font-size: 15px; font-weight: 500; color: #6B7280; font-family: var(--font-body);
          cursor: pointer; text-align: left; transition: color 0.18s;
        }
        .feat-navitem > * { position: relative; z-index: 1; }
        .feat-navitem:hover:not(.active) { color: #041635; }
        .feat-navitem.active { color: #041635; font-weight: 700; }
        .feat-dot { width: 7px; height: 7px; border-radius: 50%; background: #C9CFD9; flex-shrink: 0; transition: background 0.18s; }
        .feat-navitem.active .feat-dot { background: #D8F950; box-shadow: 0 0 0 3px rgba(216,249,80,0.35); }
        .feat-card {
          background: #fff; border: 1px solid #E6E9EF; border-radius: 22px;
          padding: clamp(18px, 2.4vw, 30px);
          box-shadow: 0 2px 12px rgba(4,22,53,0.05);
        }
        .feat-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          color: #041635; font-family: var(--font-body);
          background: #F1F4F8; border-radius: 100px; padding: 6px 14px;
        }
        .feat-divider { height: 1px; background: #ECEFF4; margin: 28px 0 24px; }
        .feat-body { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .feat-visual-frame { border-radius: 14px; overflow: hidden; border: 1px solid #E2E4E9; box-shadow: 0 12px 40px rgba(4,22,53,0.1); }
        .feat-visual-bar { background: #F1F3F5; border-bottom: 1px solid #E2E4E9; padding: 9px 14px; display: flex; align-items: center; gap: 8px; }
        .feat-visual { height: 340px; overflow: hidden; }
        .feat-swipe-hint { display: none; }
        @media (max-width: 900px) {
          .feat-body { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) {
          .feat-layout { grid-template-columns: 1fr; gap: 22px; }
          .feat-nav-col { position: sticky; top: 68px; z-index: 20; background: #F7F8FA; padding: 10px 0; margin: -10px 0 0; }
          .feat-side-sticky { position: static; gap: 10px; }
          .feat-side-head h2 { display: none; }
          .feat-nav { position: static; flex-direction: row; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
          .feat-nav::-webkit-scrollbar { display: none; }
          .feat-group { display: contents; }
          .feat-group-label { display: none; }
          .feat-navitem { width: auto; white-space: nowrap; flex-shrink: 0; background: #fff; border: 1px solid #E2E4E9; padding: 9px 15px; font-size: 14px; }
          .feat-navitem.active { border-color: #041635; }
          .feat-swipe-hint { display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 16px; }
        }
      `}</style>

      <div className="feat-inner">
        <div className="feat-layout">
          {/* Mobile-only hint that the feature nav scrolls sideways */}
          <div className="feat-swipe-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            <span style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.04em' }}>Swipe to explore features</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>

          {/* Grouped sidebar nav — header sticks with it so it stays visible while cards scroll past */}
          <div className="feat-nav-col">
            <div className="feat-side-sticky">
              <motion.div className="feat-side-head" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>Everything you need to stand out</p>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 2.6vw, 32px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
                  Built for<br />job seekers.
                </h2>
              </motion.div>

              <nav className="feat-nav" aria-label="Product features">
                {FEATURE_GROUPS.map(group => (
                  <div key={group.label} className="feat-group">
                    <p className="feat-group-label">{group.label}</p>
                    {group.ids.map(id => {
                      const i = tabs.findIndex(t => t.id === id);
                      const t = tabs[i];
                      if (!t) return null;
                      const isActive = activeTab === i;
                      return (
                        <button key={t.id} ref={(el: HTMLButtonElement | null) => { navRefs.current[i] = el; }} onClick={() => goToFeature(i)} className={`feat-navitem${isActive ? ' active' : ''}`} aria-current={isActive}>
                          {isActive && <motion.span layoutId="featNavPill" transition={{ type: 'spring', stiffness: 450, damping: 38 }} style={{ position: 'absolute', inset: 0, background: '#EDF0F4', borderRadius: '10px', zIndex: 0 }} />}
                          <span className="feat-dot" />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Stacked feature cards */}
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 7vw, 96px)' }}>
            {tabs.map((t, i) => (
              <motion.div key={t.id} ref={(el: HTMLDivElement | null) => { featureRefs.current[i] = el; }} className="feat-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.4 }}>
                <span className="feat-eyebrow">
                  <t.icon size={13} strokeWidth={2.4} />
                  {t.label}
                </span>

                <div className="feat-visual-frame" style={{ marginTop: '14px' }}>
                  <div className="feat-visual-bar">
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <div style={{ background: '#fff', borderRadius: '5px', padding: '2px 14px', fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', border: '1px solid #E2E4E9' }}>app.reslink.io</div>
                    </div>
                  </div>
                  <div className="feat-visual" style={{ background: t.bg }}>
                    {t.visual}
                  </div>
                </div>

                <div className="feat-divider" />

                <div className="feat-body">
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '12px' }}>{t.headline}</h3>
                    <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{t.sub}</p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
                    {t.bullets.map((b, bi) => (
                      <motion.li key={b} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: bi * 0.08 + 0.15, duration: 0.28 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                        <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#041635', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
