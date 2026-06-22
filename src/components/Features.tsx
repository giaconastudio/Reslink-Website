'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const icons: Record<string, React.ReactNode> = {
  analytics: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
  ),
  coach: (
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
    headline: 'Know exactly who’s watching.',
    sub: 'Real-time data on every recruiter who viewed your profile, how long they watched, and which companies clicked through. Stop guessing. Start following up at exactly the right moment.',
    stats: [
      { val: '342', label: 'Profile views' },
      { val: '89%', label: 'Watch rate' },
      { val: '23', label: 'Recruiter contacts' },
    ],
    color: '#D8F950',
    bg: '#041635',
    visual: (
      <div style={{ width: '100%', height: '100%', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {[{ v: '342', l: 'Views' }, { v: '189', l: 'Plays' }, { v: '47', l: 'Contacts' }].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 10px', textAlign: 'center' }}>
              <p style={{ fontSize: '24px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)', lineHeight: 1 }}>{s.v}</p>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '3px', fontFamily: 'var(--font-body)' }}>{s.l}</p>
            </div>
          ))}
        </div>
        {/* Sparkline */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', marginBottom: '8px' }}>
            {[18, 32, 24, 48, 38, 72, 55, 80, 64, 88, 62, 96].map((h, i) => (
              <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', height: `${h}%`, background: i >= 9 ? '#D8F950' : 'rgba(255,255,255,0.1)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>7 days ago</span>
            <span style={{ fontSize: '10px', color: '#D8F950', fontFamily: 'var(--font-body)' }}>Today</span>
          </div>
        </div>
        {/* Feed */}
        {[{ co: 'Amazon', a: 'Viewed profile', t: '2m ago', c: '#22c55e' }, { co: 'Meta', a: 'Watched 1:12', t: '18m ago', c: '#0C63E3' }].map(a => (
          <div key={a.co} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px 12px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: a.c }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>{a.co}</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>{a.a}</span>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'rgba(255,255,255,0.15)', fontFamily: 'var(--font-body)' }}>{a.t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'coach',
    label: 'Coach AI',
    headline: 'Your pitch coach, on demand.',
    sub: 'AI watches your video and gives you real, specific feedback — pacing, tone, content. Then helps you rewrite your intro, rehearse, and perfect your pitch before it goes live. Like having a career coach at 2am.',
    color: '#0C63E3',
    bg: '#fff',
    visual: (
      <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', background: 'linear-gradient(135deg, #041635, #0C63E3)', borderRadius: '10px', marginBottom: '4px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>Coach AI</p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Analyzing your pitch...</p>
          </div>
        </div>
        {[
          { from: 'ai', msg: 'Strong hook — your first 5 seconds are excellent. Around 0:38 your pacing dips, so speak about 10% faster there. One more thing: add a specific number to your intro.' },
          { from: 'user', msg: 'Can you rewrite my intro?' },
          { from: 'ai', msg: '“In 3 years I cut logistics costs 23% at two companies. Here’s how I’d do the same for you.”' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '88%', borderRadius: m.from === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px', padding: '10px 13px', background: m.from === 'user' ? '#041635' : '#F7F8FA', border: m.from === 'ai' ? '1px solid #EEEEF0' : 'none' }}>
              <p style={{ fontSize: '12px', color: m.from === 'user' ? '#fff' : '#041635', lineHeight: 1.55, whiteSpace: 'pre-line', fontFamily: 'var(--font-body)' }}>{m.msg}</p>
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
          <div style={{ flex: 1, background: '#F7F8FA', border: '1px solid #EEEEF0', borderRadius: '8px', padding: '9px 12px', fontSize: '12px', color: '#C8CBD2', fontFamily: 'var(--font-body)' }}>Ask Coach AI anything...</div>
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'teleprompter',
    label: 'Teleprompter',
    headline: 'Look confident. Sound confident.',
    sub: 'Write your script once. Our teleprompter scrolls it right on screen as you record — so you stay on camera, maintain eye contact, and deliver your pitch without ever glancing away.',
    color: '#FFD6A5',
    bg: '#0B0F1A',
    visual: (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Camera view */}
        <div style={{ flex: 1, position: 'relative', background: '#0B0F1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Silhouette */}
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(239,68,68,0.2)', borderRadius: '6px', padding: '4px 8px' }}>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#EF4444', fontFamily: 'var(--font-body)' }}>REC 0:41</span>
          </div>
        </div>
        {/* Teleprompter strip */}
        <div style={{ background: 'rgba(11,15,26,0.95)', backdropFilter: 'blur(8px)', padding: '14px 18px', borderTop: '1px solid rgba(255,214,165,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '7px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFD6A5' }} />
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#FFD6A5', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}>TELEPROMPTER · 1.0x</span>
          </div>
          <div style={{ overflow: 'hidden', height: '36px' }}>
            <motion.p animate={{ y: [0, -36] }} transition={{ duration: 3, ease: 'linear', repeat: Infinity, repeatDelay: 1.5 }} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              Hi, I&apos;m Oliver — a supply chain specialist who&apos;s reduced logistics costs by 23% across two companies. I&apos;d love to bring that to your team. Here&apos;s what I&apos;ve built...
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
    color: '#C4B5FD',
    bg: '#fff',
    visual: (
      <div style={{ width: '100%', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#041635', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>reslink.io/oliverstone</span>
          <div style={{ background: '#D8F950', borderRadius: '5px', padding: '3px 10px', fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Copy</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { name: 'LinkedIn', color: '#0A66C2' },
            { name: 'Indeed', color: '#003A9B' },
            { name: 'Greenhouse', color: '#24A148' },
            { name: 'Lever', color: '#3B82F6' },
            { name: 'Workday', color: '#0875E1' },
            { name: 'Ashby', color: '#111827' },
            { name: 'Gmail', color: '#EA4335' },
            { name: 'Zapier', color: '#FF4A00' },
            { name: 'Slack', color: '#4A154B' },
            { name: 'Outlook', color: '#0078D4' },
          ].map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.25 }}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#F7F8FA', borderRadius: '100px', padding: '5px 10px 5px 7px', border: '1px solid #EEEEF0' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: p.color, flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#5C6070', fontFamily: 'var(--font-body)' }}>{p.name}</span>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', background: '#F7F8FA', borderRadius: '10px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#C4B5FD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4C1D95" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <p style={{ fontSize: '12px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>Works with <strong style={{ color: '#041635' }}>any ATS</strong> — just paste your link like a URL</p>
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
