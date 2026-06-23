'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ end, suffix, duration = 1.4 }: { end: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ValueProp() {
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
          .vp-pip { top: 20px !important; right: 0px !important; width: 100px !important; height: 100px !important; border-radius: 14px !important; }
        }
        @media (min-width: 761px) {
          .vp-stat-item { text-align: center; }
        }
      `}</style>
      <div className="container">

        {/* Centered headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            Your resume, but better
          </p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4.8vw, 60px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '24px' }}>
            Stand out before<br />you even get<br /><span style={{ color: '#0C63E3' }}>the interview.</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            A static PDF cannot attract recruiters instantly, share with a single click, or personalize your pitch. A Reslink does all three — and lands interviews faster.
          </p>
        </motion.div>

        {/* Side-by-side comparison */}
        <div className="vp-compare">

          {/* Before */}
          <motion.div
            className="vp-before-col"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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

              {/* Fake resume content */}
              <div style={{ marginBottom: '20px' }}>
                {/* Name + title */}
                <div style={{ height: '14px', borderRadius: '6px', background: '#B8BCC8', width: '52%', marginBottom: '7px' }} />
                <div style={{ height: '9px', borderRadius: '5px', background: '#D0D4DC', width: '68%', marginBottom: '4px' }} />
                <div style={{ height: '8px', borderRadius: '5px', background: '#D8DBE3', width: '80%', marginBottom: '16px' }} />
                {/* Experience section */}
                <div style={{ height: '7px', borderRadius: '3px', background: '#C4C8D4', width: '30%', marginBottom: '8px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  <div style={{ height: '7px', borderRadius: '4px', background: '#DDE0E8', width: '100%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#DDE0E8', width: '91%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#DDE0E8', width: '97%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#DDE0E8', width: '76%' }} />
                </div>
                {/* Education section */}
                <div style={{ height: '7px', borderRadius: '3px', background: '#C4C8D4', width: '26%', marginBottom: '8px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  <div style={{ height: '7px', borderRadius: '4px', background: '#DDE0E8', width: '88%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#DDE0E8', width: '62%' }} />
                </div>
                {/* Skills section */}
                <div style={{ height: '7px', borderRadius: '3px', background: '#C4C8D4', width: '20%', marginBottom: '8px' }} />
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[48, 56, 40, 52, 44].map((w, i) => (
                    <div key={i} style={{ height: '20px', borderRadius: '4px', background: '#DDE0E8', width: `${w}px` }} />
                  ))}
                </div>
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
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{ position: 'relative' }}
          >
            <div className="vp-after" style={{ borderRadius: '18px', border: '2px solid #D8F950', overflow: 'hidden', boxShadow: '0 16px 56px rgba(4,22,53,0.12)' }}>

              {/* With Reslink label */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 5, fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 11px', borderRadius: '100px', letterSpacing: '0.05em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>
                With Reslink
              </div>

              {/* Dark navy profile header */}
              <div style={{ background: '#041635', padding: '22px 24px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', paddingRight: '90px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #0C63E3, #4F6EF7)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.15)' }}>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>OS</span>
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

              {/* Resume document peek */}
              <div style={{ background: '#fff', padding: '18px 24px', borderBottom: '1px solid #F0F1F4' }}>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Olivia Stone</p>
                  <p style={{ fontSize: '12px', color: '#5C6070', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Business Development Representative</p>
                  <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>London, UK · +44xxxx · LinkedIn</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                  <div style={{ height: '7px', borderRadius: '4px', background: '#F3F4F6', width: '100%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#F3F4F6', width: '90%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#F3F4F6', width: '96%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#F3F4F6', width: '82%' }} />
                </div>
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
            <div className="vp-pip" style={{ position: 'absolute', top: '22px', right: '-22px', width: '172px', height: '172px', zIndex: 10 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.36)' }}>
                <video src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(4,22,53,0.78)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950', flexShrink: 0 }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Intro playing</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
