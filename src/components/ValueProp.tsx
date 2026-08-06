'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Runs on mount rather than gating on useInView/IntersectionObserver — that
// observer callback can sit queued on the main thread indefinitely until a
// genuine user interaction forces the browser to prioritize it, which showed
// up in production as every stat here stuck at 0 forever.
function CountUp({ end, suffix, duration = 1.4 }: { end: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

// One accent per card — blue, lime, and the new magenta, plus a navy card to
// close the row (matches the trust-strip pattern: blue for action, lime for
// the payoff, magenta as the warm human layer).
const STATS = [
  {
    tone: 'blue', end: 3, unitSuffix: '×', label: 'more recruiter callbacks',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="13" width="4" height="8" rx="1" fill="var(--blue-light)" opacity="0.45" />
        <rect x="10" y="9" width="4" height="12" rx="1" fill="var(--blue-light)" opacity="0.7" />
        <rect x="17" y="4" width="4" height="17" rx="1" fill="var(--blue-light)" />
      </svg>
    ),
  },
  {
    tone: 'lime', end: 48, unitSuffix: 'h', label: 'average time to first response',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M4 16a8 8 0 1 1 16 0" stroke="var(--accent-dark)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="19" cy="16" r="1.6" fill="var(--accent-dark)" />
      </svg>
    ),
  },
  {
    tone: 'magenta', end: 85, unitSuffix: '%', label: 'average video watch-through',
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="var(--magenta)" strokeOpacity="0.25" strokeWidth="2.5" />
        <path d="M12 4a8 8 0 0 1 7.4 11" stroke="var(--magenta)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tone: 'navy', end: 5, unitSuffix: ' min', label: 'to create your first Reslink',
    icon: (
      <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
        {[0, 1, 2, 3, 4].map(i => (
          <circle key={i} cx={6 + i * 13} cy="6" r="5" fill="var(--accent)" opacity={1 - i * 0.14} />
        ))}
      </svg>
    ),
  },
] as const;

export default function ValueProp() {
  const pipRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = pipRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section style={{ padding: '96px 0 112px', background: '#fff' }}>
      <style>{`
        .vp-compare { display: grid; grid-template-columns: 1fr 1.55fr; gap: 16px; align-items: stretch; }
        .vp-before-col { height: 100%; }
        .vp-before-card { height: 100%; display: flex; flex-direction: column; }
        .vp-timeline { margin-top: auto; }
        /* Stretch to match the before card's full height (its timeline can
           run longer or shorter depending on content) instead of leaving
           invisible slack below the card's own border. */
        .vp-after { height: 100%; display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .vp-after:hover { transform: translateY(-3px); box-shadow: 0 24px 72px rgba(4,22,53,0.16) !important; }
        .vp-after-last { flex: 1; }
        /* Stats — tinted cards, one accent per card */
        .vp-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 56px; }
        .vp-stat-card { border-radius: 20px; padding: 28px 24px 24px; display: flex; flex-direction: column; }
        .vp-stat-icon { height: 34px; display: flex; align-items: center; margin-bottom: 22px; }
        .vp-stat-number { font-family: var(--font-phudu); font-size: clamp(30px, 3.2vw, 38px); font-weight: 900; line-height: 1; letter-spacing: -0.03em; display: flex; align-items: baseline; gap: 2px; }
        .vp-stat-unit { font-size: 0.5em; font-weight: 700; }
        .vp-stat-label { font-size: 13px; margin-top: 10px; font-family: var(--font-body); line-height: 1.4; }
        .vp-stat-blue { background: var(--blue-xlight); }
        .vp-stat-blue .vp-stat-number { color: var(--blue-light); }
        .vp-stat-blue .vp-stat-label { color: #5C6070; }
        .vp-stat-lime { background: #FAFEE8; }
        .vp-stat-lime .vp-stat-number { color: var(--navy); }
        .vp-stat-lime .vp-stat-label { color: #5C6070; }
        .vp-stat-magenta { background: var(--magenta-light); }
        .vp-stat-magenta .vp-stat-number { color: var(--magenta); }
        .vp-stat-magenta .vp-stat-label { color: #5C6070; }
        .vp-stat-navy { background: var(--navy); }
        .vp-stat-navy .vp-stat-number { color: #fff; }
        .vp-stat-navy .vp-stat-label { color: rgba(255,255,255,0.55); }
        .vp-stats-caption { text-align: center; font-size: 13px; color: #9A9FA8; font-family: var(--font-body); margin-top: 24px; }

        /* Before-card timeline — replaces the single "no response" alert with
           a real applied → followed up → nothing sequence. */
        .vp-timeline { display: flex; flex-direction: column; }
        .vp-timeline-row { display: grid; grid-template-columns: 20px 1fr; gap: 12px; }
        .vp-timeline-marker { display: flex; flex-direction: column; align-items: center; }
        .vp-timeline-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #C7CBD3; background: #fff; flex-shrink: 0; }
        .vp-timeline-dot.done { border-color: #9A9FA8; background: #E8EAF0; }
        .vp-timeline-connector { width: 2px; flex: 1; min-height: 28px; background: #E5E7EB; margin: 3px 0; }
        .vp-timeline-content { display: flex; flex-direction: column; gap: 3px; padding-bottom: 20px; }
        .vp-timeline-label { font-size: 13px; font-weight: 700; color: #3A3F4C; font-family: var(--font-body); }
        .vp-timeline-label.faded { font-weight: 500; font-style: italic; color: #B0B4BE; }
        .vp-timeline-meta { font-size: 11px; color: #B0B4BE; font-family: var(--font-mono, monospace); }

        @media (max-width: 760px) {
          .vp-compare { grid-template-columns: 1fr; }
          .vp-before-col { order: 2; }
          .vp-stats-grid { grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 40px; }
          .vp-stat-card { padding: 20px 18px 18px; border-radius: 16px; }
          .vp-stat-icon { height: 28px; margin-bottom: 16px; }
          .vp-pip { top: -12px !important; right: -12px !important; width: 88px !important; height: 88px !important; border-radius: 12px !important; }
          .vp-header-row { padding-right: 108px !important; }
          .vp-with-reslink { display: none !important; }
          .vp-pip-label { display: none !important; }
        }
      `}</style>
      <div className="container">

        {/* Centered headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Before vs. after
          </p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4.8vw, 60px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '24px' }}>
            From ignored<br /><span style={{ color: '#0C63E3' }}>to interview.</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            A static PDF cannot attract attention, share with one click, or show who you actually are. A Reslink does all three. And lands interviews faster.
          </p>
        </motion.div>

        {/* Side-by-side comparison */}
        <div className="vp-compare">

          {/* Before */}
          <motion.div
            className="vp-before-col"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="vp-before-card" style={{ borderRadius: '18px', border: '1px solid #E8EAF0', padding: '24px', background: '#FAFBFC' }}>
              {/* Label */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Before</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: '#E8EAF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <span style={{ fontSize: '12px', color: '#B0B4BE', fontFamily: 'var(--font-body)' }}>resume_v7_final.pdf</span>
                </div>
              </div>

              {/* Realistic plain-resume content */}
              <div style={{ background: '#fff', border: '1px solid #ECEEF1', borderRadius: '8px', padding: '20px 22px', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '10px', marginBottom: '12px' }}>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 700, color: '#3A3F4C' }}>Olivia Stone</p>
                  <p style={{ fontSize: '11px', color: '#7A7F8A', fontFamily: 'var(--font-body)', marginTop: '3px' }}>Business Development Representative</p>
                  <p style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>London, UK · olivia@example.com · +44 7xxx xxx xxx</p>
                </div>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8F9A', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>Experience</p>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#4A4F5A', fontFamily: 'var(--font-body)' }}>Business Development Representative</p>
                <p style={{ fontSize: '10px', color: '#8A8F9A', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>Growth-stage SaaS company · 2023–Present</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '15px', margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <li style={{ fontSize: '10px', color: '#8A8F9A', lineHeight: 1.45, fontFamily: 'var(--font-body)' }}>Booked 140+ qualified meetings — 128% of quota</li>
                  <li style={{ fontSize: '10px', color: '#8A8F9A', lineHeight: 1.45, fontFamily: 'var(--font-body)' }}>Top-performing BDR for three consecutive quarters</li>
                </ul>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8F9A', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>Education</p>
                <p style={{ fontSize: '10px', color: '#8A8F9A', fontFamily: 'var(--font-body)' }}>BA Business Management · University of Manchester</p>
              </div>

              {/* Outcome — timeline of what actually happens after sending a plain PDF */}
              <div className="vp-timeline">
                {[
                  { label: 'Applied', meta: '14 Feb, 09:12', done: true },
                  { label: 'Followed up', meta: '28 Feb, 17:40', done: true },
                  { label: 'and then nothing', meta: null, done: false },
                ].map((t, i, arr) => (
                  <div key={t.label} className="vp-timeline-row">
                    <span className="vp-timeline-marker">
                      <span className={`vp-timeline-dot${t.done ? ' done' : ''}`} />
                      {i < arr.length - 1 && <span className="vp-timeline-connector" />}
                    </span>
                    <span className="vp-timeline-content">
                      <span className={`vp-timeline-label${t.done ? '' : ' faded'}`}>{t.label}</span>
                      {t.meta && <span className="vp-timeline-meta">{t.meta}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* After — Reslink profile */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{ position: 'relative' }}
          >
            <div className="vp-after" style={{ borderRadius: '18px', border: '2px solid #D8F950', overflow: 'hidden', boxShadow: '0 16px 56px rgba(4,22,53,0.12)' }}>

              {/* With Reslink label */}
              <div className="vp-with-reslink" style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 5, fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 11px', borderRadius: '100px', letterSpacing: '0.05em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                With Reslink
              </div>

              {/* Dark navy profile header */}
              <div style={{ background: '#041635', padding: '22px 24px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', paddingRight: '90px' }} className="vp-header-row">
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/videos/pip-person-poster.jpg" alt="Olivia Stone" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.01em' }}>OLIVIA STONE</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Business Dev Rep</span>
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>·</span>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>London, UK</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#D8F950', borderRadius: '8px', padding: '9px 16px', cursor: 'pointer' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#041635"><path d="M8 5v14l11-7z"/></svg>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Play Intro</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '9px 16px', cursor: 'pointer' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>Download Resume</span>
                  </div>
                </div>
              </div>

              {/* Resume document peek — realistic so it's clearly a resume */}
              <div style={{ background: '#fff', padding: '16px 24px 18px', borderBottom: '1px solid #F0F1F4' }}>
                <span style={{ display: 'inline-block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0C63E3', background: '#EEF4FF', borderRadius: '100px', padding: '2px 9px', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>Resume</span>
                <div style={{ textAlign: 'center', borderBottom: '1px solid #EDEFF2', paddingBottom: '9px', marginBottom: '10px' }}>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, color: '#041635' }}>Olivia Stone</p>
                  <p style={{ fontSize: '11px', color: '#5C6070', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Business Development Representative</p>
                  <p style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>London, UK · olivia@example.com · LinkedIn</p>
                </div>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8F9A', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>Experience</p>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Business Development Representative</p>
                <p style={{ fontSize: '10px', color: '#0C63E3', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: '3px' }}>Growth-stage SaaS company · 2023–Present</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '15px', margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <li style={{ fontSize: '10px', color: '#5C6070', lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>Booked 140+ qualified meetings — 128% of quota</li>
                  <li style={{ fontSize: '10px', color: '#5C6070', lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>Top-performing BDR for three consecutive quarters</li>
                </ul>
              </div>

              {/* Recruiter activity */}
              <div style={{ background: '#F7F8FA', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #F0F1F4' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>G</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Google Recruiter viewed you</p>
                  <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 0:44 of 0:47 · 1h ago</p>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3', flexShrink: 0 }} />
              </div>

              {/* Interview booked — grows to absorb any extra height so the
                  card always fills its full stretched column height */}
              <div className="vp-after-last" style={{ padding: '14px 24px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview request received</p>
                  <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>HubSpot · 2 days after sharing</p>
                </div>
              </div>
            </div>

            {/* PiP video — outside overflow:hidden card so it can hang over the right edge */}
            <div className="vp-pip" style={{ position: 'absolute', top: '90px', right: '-22px', width: '172px', height: '172px', zIndex: 10 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.36)' }}>
                <video ref={pipRef} src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" autoPlay muted loop playsInline preload="auto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="vp-pip-label" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(4,22,53,0.78)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950', flexShrink: 0 }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Intro playing</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip — tinted cards, one accent per card (blue / lime / magenta / navy) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="vp-stats-grid">
            {STATS.map(s => (
              <div key={s.label} className={`vp-stat-card vp-stat-${s.tone}`}>
                <div className="vp-stat-icon">{s.icon}</div>
                <p className="vp-stat-number">
                  <CountUp end={s.end} suffix="" /><span className="vp-stat-unit">{s.unitSuffix}</span>
                </p>
                <p className="vp-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="vp-stats-caption">Based on 10,000+ Reslinks created · updated 2026</p>
        </motion.div>

      </div>
    </section>
  );
}
