'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const icons: Record<string, React.ReactNode> = {
  analytics: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  ),
  pitchai: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
  ),
  teleprompter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
  ),
  badge: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  ),
};

const tabs = [
  {
    id: 'analytics',
    label: 'Insights',
    headline: 'View insights on Reslink engagement.',
    sub: 'Track who views your Reslinks and understand engagement levels — watch time, link clicks, location, and more — so you can refine your approach and follow up at exactly the right moment.',
    stats: [
      { val: '342', label: 'Profile views' },
      { val: '89%', label: 'Watch rate' },
      { val: '23', label: 'Recruiter contacts' },
    ],
    color: '#D8F950',
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
    headline: 'Enhance your video pitch with AI.',
    sub: 'Reslink Pitch AI generates a standout video script tailored to your experience and the role you\'re applying for. Customize it, then record — no blank page, no guessing what to say.',
    color: '#0C63E3',
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
    headline: 'Look confident. Sound confident.',
    sub: 'Capture your pitch effortlessly using our in-app teleprompter, guiding you to deliver your best performance every time — no notes, no nerves.',
    color: '#D8F950',
    bg: '#0B0F1A',
    visual: (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Live camera feed — real person */}
        <video
          src="/videos/pip-person-compressed.mp4"
          poster="/videos/pip-person-poster.jpg"
          autoPlay muted loop playsInline
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
              Hi, I&apos;m Oliver — I&apos;ve spent 3 years building backend systems that handle millions of requests. At HubSpot I cut API latency by 40%...
            </motion.p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'badge',
    label: 'Apply Anywhere',
    headline: 'Your Reslink, right inside your resume.',
    sub: 'A clickable Play Intro button is embedded directly in your resume PDF. When a recruiter opens it, one click takes them straight to your video — no copying URLs, no manual work.',
    color: '#D8F950',
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

export default function Features() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section style={{ padding: '100px 0', background: '#fff' }}>
      <style>{`
        .feat-header { text-align: center; margin-bottom: 48px; }
        .feat-tabs {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
        }
        .feat-tabs::-webkit-scrollbar { display: none; }
        .feat-tab {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 20px;
          border-radius: 100px;
          border: 1.5px solid #E4E7EC;
          background: #F7F8FA;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #5C6070;
          font-family: var(--font-body);
          transition: all 0.2s;
          white-space: nowrap;
        }
        .feat-tab.active {
          background: #041635;
          border-color: #041635;
          color: #fff;
        }
        .feat-panel {
          border-radius: 20px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 480px;
          box-shadow: 0 16px 60px rgba(4,22,53,0.1);
        }
        .feat-copy {
          padding: 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .feat-visual {
          display: flex;
          overflow: hidden;
        }
        .feat-tabs-fade { display: none; }
        @media (max-width: 768px) {
          .feat-panel { grid-template-columns: 1fr; min-height: auto; }
          .feat-visual { order: -1; min-height: 300px; }
          .feat-copy { padding: 28px 24px 32px; }
          .feat-tab { padding: 8px 14px; font-size: 13px; white-space: nowrap; }
          .feat-header { margin-bottom: 28px; }
          .feat-tabs { justify-content: flex-start; flex-wrap: nowrap; padding-left: 0; gap: 6px; margin-bottom: 24px; }
          .feat-tabs-fade { display: block; position: absolute; right: 0; top: 0; bottom: 4px; width: 64px; background: linear-gradient(to right, transparent, #fff 70%); pointer-events: none; }
        }
        @media (max-width: 480px) {
          .feat-visual { min-height: 260px; }
          .feat-copy { padding: 24px 20px 28px; }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <motion.div className="feat-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>Everything you need to stand out</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '14px' }}>
            Built for<br />job seekers.
          </h2>
          <a href="/job-seekers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#0C63E3', textDecoration: 'none', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            See everything Reslink can do for job seekers
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </motion.div>

        {/* Tabs */}
        <div style={{ position: 'relative' }}>
          <div className="feat-tabs">
            {tabs.map((t, i) => (
              <button key={t.id} className={`feat-tab${i === active ? ' active' : ''}`} onClick={() => setActive(i)}>
                <span style={{ display: 'inline-flex' }}>{icons[t.id]}</span> {t.label}
              </button>
            ))}
          </div>
          <div className="feat-tabs-fade" />
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div key={tab.id} className="feat-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            {/* Copy */}
            <div className="feat-copy" style={{ background: tab.bg === '#041635' ? '#041635' : '#fff' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: `${tab.color}18`, borderRadius: '100px', padding: '5px 12px', width: 'fit-content', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: tab.color === '#FFD6A5' ? '#B45309' : tab.bg === '#041635' ? tab.color : '#0C63E3', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>{tab.label}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 900, color: tab.bg === '#041635' ? '#fff' : '#041635', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '18px' }}>
                {tab.headline}
              </h3>
              <p style={{ fontSize: '16px', color: tab.bg === '#041635' ? 'rgba(255,255,255,0.45)' : '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '32px' }}>
                {tab.sub}
              </p>
              <a href={tab.href || '/get-started'} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700, color: '#fff', background: '#0C63E3', padding: '11px 20px', borderRadius: '8px', textDecoration: 'none', width: 'fit-content', fontFamily: 'var(--font-body)', transition: 'opacity 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                {tab.ctaLabel || 'Try it free'}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>

            {/* Visual */}
            <div className="feat-visual" style={{ background: tab.bg }}>
              {tab.visual}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
