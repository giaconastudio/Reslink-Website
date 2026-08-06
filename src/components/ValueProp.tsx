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
        .vp-compare { display: grid; grid-template-columns: 1fr 1.55fr; gap: 16px; align-items: start; }
        .vp-after { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .vp-after:hover { transform: translateY(-3px); box-shadow: 0 24px 72px rgba(4,22,53,0.16) !important; }
        .vp-stats { display: flex; justify-content: center; gap: 64px; margin-top: 56px; padding-top: 48px; border-top: 1px solid #ECEEF1; flex-wrap: wrap; }
        @media (max-width: 760px) {
          .vp-compare { grid-template-columns: 1fr; }
          .vp-before-col { order: 2; }
          .vp-stats { gap: 0; display: grid; grid-template-columns: 1fr 1fr; }
          .vp-stat-item { padding: 24px 16px; border-bottom: 1px solid #ECEEF1; }
          .vp-stat-item:nth-child(odd) { border-right: 1px solid #ECEEF1; }
          .vp-pip { top: -12px !important; right: -12px !important; width: 88px !important; height: 88px !important; border-radius: 12px !important; }
          .vp-header-row { padding-right: 108px !important; }
          .vp-with-reslink { display: none !important; }
          .vp-pip-label { display: none !important; }
        }
        @media (min-width: 761px) {
          .vp-stat-item { text-align: center; }
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
            <div style={{ borderRadius: '18px', border: '1px solid #E8EAF0', padding: '24px', background: '#FAFBFC', height: '100%' }}>
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

              {/* Outcome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 14px', background: '#FEF2F2', borderRadius: '10px', border: '1px solid #FECACA' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <span style={{ fontSize: '12px', color: '#DC2626', fontFamily: 'var(--font-body)', fontWeight: 500 }}>No response after 3 weeks</span>
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

              {/* Interview booked */}
              <div style={{ padding: '14px 24px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
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

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="vp-stats"
        >
          {[
            { end: 3, suffix: '×', label: 'more recruiter callbacks' },
            { end: 48, suffix: 'h', label: 'avg. time to first response' },
            { end: 85, suffix: '%', label: 'avg. video watch-through rate' },
            { end: 5, suffix: ' min', label: 'to create your first Reslink' },
          ].map(s => (
            <div key={s.label} className="vp-stat-item">
              <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 38px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p style={{ fontSize: '13px', color: '#9A9FA8', marginTop: '6px', fontFamily: 'var(--font-body)' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
