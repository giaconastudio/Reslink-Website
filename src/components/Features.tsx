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
  integrations: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  ),
};

const tabs = [
  {
    id: 'analytics',
    label: 'Analytics',
    headline: "Know exactly who's watching.",
    sub: 'Real-time data on every recruiter who viewed your profile, how long they watched, and which companies clicked through. Stop guessing. Start following up at exactly the right moment.',
    stats: [
      { val: '342', label: 'Profile views' },
      { val: '89%', label: 'Watch rate' },
      { val: '23', label: 'Recruiter contacts' },
    ],
    color: '#D8F950',
    bg: '#041635',
    visual: (
      <div style={{ width: '100%', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Top stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[{ v: '1,284', l: 'Total Views', delta: '+18% this week' }, { v: '847', l: 'Video Plays', delta: '66% play rate' }].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 12px' }}>
              <p style={{ fontSize: '22px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)', lineHeight: 1 }}>{s.v}</p>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px', fontFamily: 'var(--font-body)' }}>{s.l}</p>
              <p style={{ fontSize: '10px', color: '#D8F950', marginTop: '4px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{s.delta}</p>
            </div>
          ))}
        </div>
        {/* Watch time bar */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Avg. watch time</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#D8F950', fontFamily: 'var(--font-body)' }}>0:44 / 0:47</span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100%', width: '93%', borderRadius: '3px', background: 'linear-gradient(90deg, #0C63E3, #D8F950)' }} />
          </div>
        </div>
        {/* Location breakdown */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px 14px', flex: 1 }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>Top locations</p>
          {[{ city: 'New York, US', pct: 38 }, { city: 'London, UK', pct: 24 }, { city: 'San Francisco, US', pct: 17 }].map(l => (
            <div key={l.city} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>{l.city}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>{l.pct}%</span>
              </div>
              <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.08)' }}>
                <div style={{ height: '100%', width: `${l.pct}%`, borderRadius: '2px', background: '#0C63E3' }} />
              </div>
            </div>
          ))}
        </div>
        {/* Link clicks row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 14px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>LinkedIn link clicks</span>
          <span style={{ fontSize: '16px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>63</span>
        </div>
      </div>
    ),
  },
  {
    id: 'pitchai',
    label: 'Pitch AI',
    headline: 'Your video pitch, written in seconds.',
    sub: 'Reslink Pitch AI generates a standout video script tailored to your experience and the role you\'re applying for. Customize it, then record — no blank page, no guessing what to say.',
    color: '#0C63E3',
    bg: '#fff',
    visual: (
      <div style={{ width: '100%', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#fff' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#041635', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Reslink Pitch AI</span>
          <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 600, color: '#0C63E3', background: '#EBF0FF', padding: '2px 8px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>Free</span>
        </div>
        {/* Input: Job title */}
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Job title</p>
          <div style={{ background: '#F7F8FA', border: '1.5px solid #ECEEF1', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', color: '#041635', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            Software Engineer — Google
          </div>
        </div>
        {/* Input: Job description */}
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Job description</p>
          <div style={{ background: '#F7F8FA', border: '1.5px solid #ECEEF1', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.5, height: '52px', overflow: 'hidden' }}>
            We are looking for a Software Engineer to join our Search team. You will build scalable systems...
          </div>
        </div>
        {/* Input: Resume uploaded */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F0FFF0', border: '1.5px solid #D8F950', borderRadius: '8px', padding: '9px 12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span style={{ fontSize: '12px', color: '#16a34a', fontFamily: 'var(--font-body)', fontWeight: 600 }}>resume_oliver_stone.pdf uploaded</span>
          <svg style={{ marginLeft: 'auto' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        {/* Generate button */}
        <div style={{ background: '#041635', borderRadius: '8px', padding: '11px', textAlign: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#D8F950', fontFamily: 'var(--font-body)' }}>Generate my video script</span>
        </div>
        {/* Output preview */}
        <div style={{ background: '#F7F8FA', border: '1px solid #ECEEF1', borderRadius: '8px', padding: '10px 12px', flex: 1 }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: '#0C63E3', marginBottom: '6px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your script</p>
          <p style={{ fontSize: '12px', color: '#3A3F4C', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            "Hi, I'm Oliver. I've spent 3 years building backend systems that handle millions of requests per day. At HubSpot I cut API latency by 40%..."
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'teleprompter',
    label: 'Teleprompter',
    headline: 'Look confident. Sound confident.',
    sub: 'Write your script once. Our teleprompter scrolls it right on screen as you record — so you stay on camera, maintain eye contact, and deliver your pitch without ever glancing away.',
    color: '#D8F950',
    bg: '#0B0F1A',
    visual: (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        {/* Live camera feed — real person */}
        <video
          src="/videos/hero.mp4"
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
    id: 'integrations',
    label: 'Apply Anywhere',
    headline: 'One link. Every opportunity.',
    sub: 'Paste your Reslink into any job board, ATS, or email. It works everywhere — LinkedIn, Indeed, Greenhouse, Workday, Lever. One link, infinite reach, zero friction.',
    color: '#D8F950',
    bg: '#F7F8FA',
    visual: (
      <div style={{ width: '100%', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F7F8FA' }}>
        {/* Your link */}
        <div style={{ background: '#041635', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', flex: 1 }}>reslink.io/oliverstone</span>
          <div style={{ background: '#D8F950', borderRadius: '5px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>Copy</div>
        </div>
        {/* LinkedIn apply */}
        <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>in</span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>LinkedIn — Easy Apply</span>
          </div>
          <div style={{ background: '#F7F8FA', border: '1px solid #ECEEF1', borderRadius: '6px', padding: '7px 10px', fontSize: '11px', color: '#0C63E3', fontFamily: 'var(--font-body)' }}>
            reslink.io/oliverstone
          </div>
        </div>
        {/* Indeed apply */}
        <div style={{ background: '#fff', borderRadius: '10px', border: '1px solid #E8EAF0', padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#003A9B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '9px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>IN</span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Indeed — Application</span>
          </div>
          <div style={{ background: '#F7F8FA', border: '1px solid #ECEEF1', borderRadius: '6px', padding: '7px 10px', fontSize: '11px', color: '#0C63E3', fontFamily: 'var(--font-body)' }}>
            reslink.io/oliverstone
          </div>
        </div>
        {/* Works anywhere note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#FAFFF0', border: '1px solid #D8F950', borderRadius: '10px', marginTop: 'auto' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span style={{ fontSize: '12px', color: '#3A3F4C', fontFamily: 'var(--font-body)' }}>Works in any application field — <strong>paste it like a URL</strong></span>
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
        }
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
        @media (max-width: 768px) {
          .feat-panel {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .feat-copy { padding: 36px 28px; }
          .feat-visual { min-height: 280px; }
          .feat-tab { padding: 8px 14px; font-size: 13px; }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <motion.div className="feat-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>Built for job seekers</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            Everything you need<br />to land the role.
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="feat-tabs">
          {tabs.map((t, i) => (
            <button key={t.id} className={`feat-tab${i === active ? ' active' : ''}`} onClick={() => setActive(i)}>
              <span style={{ display: 'inline-flex' }}>{icons[t.id]}</span> {t.label}
            </button>
          ))}
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
              <a href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700, color: tab.bg === '#041635' ? '#041635' : '#041635', background: tab.color, padding: '11px 20px', borderRadius: '8px', textDecoration: 'none', width: 'fit-content', fontFamily: 'var(--font-body)', transition: 'opacity 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Try it free
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
