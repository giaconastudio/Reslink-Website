'use client';

import { motion } from 'framer-motion';

export default function ValueProp() {
  return (
    <section style={{ padding: '96px 0 112px', background: '#fff' }}>
      <style>{`
        @media (max-width: 860px) {
          .vp-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .vp-cards { max-width: 480px; margin: 0 auto; }
        }
        .vp-before, .vp-after { transition: transform 0.3s ease; }
        .vp-after:hover { transform: translateY(-4px); }
      `}</style>
      <div className="container">
        <div className="vp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '18px', fontFamily: 'var(--font-body)' }}>
              The problem
            </p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(38px, 4.5vw, 58px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '28px' }}>
              Recruiters spend<br /><span style={{ color: '#0C63E3' }}>7 seconds</span> on<br />your resume.
            </h2>
            <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
              A PDF can&apos;t show your energy, your confidence, or why you&apos;re exactly who they need. So it gets ignored — no matter how qualified you are.
            </p>
            <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              Reslink gives you a personal video resume page that makes recruiters stop scrolling, press play, and <em style={{ color: '#041635', fontStyle: 'italic' }}>remember your name</em>.
            </p>

            {/* Quick stat strip */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #ECEEF1' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '36px', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>3×</p>
                <p style={{ fontSize: '13px', color: '#9A9FA8', marginTop: '5px', fontFamily: 'var(--font-body)' }}>more callbacks</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '36px', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>48h</p>
                <p style={{ fontSize: '13px', color: '#9A9FA8', marginTop: '5px', fontFamily: 'var(--font-body)' }}>avg. first response</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '36px', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>Free</p>
                <p style={{ fontSize: '13px', color: '#9A9FA8', marginTop: '5px', fontFamily: 'var(--font-body)' }}>forever for seekers</p>
              </div>
            </div>
          </motion.div>

          {/* Right — before / after */}
          <motion.div
            className="vp-cards"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Before — dead PDF */}
            <div className="vp-before" style={{ borderRadius: '16px', border: '1px solid #E8EAF0', padding: '22px', background: '#FAFBFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#E8EAF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>resume_v7_final.pdf</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#C5C9D4', background: '#F0F1F4', padding: '3px 9px', borderRadius: '100px', letterSpacing: '0.04em', fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}>Before</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
                <div style={{ height: '10px', borderRadius: '5px', background: '#E5E7EB', width: '65%' }} />
                <div style={{ height: '8px', borderRadius: '5px', background: '#ECEEF1', width: '90%' }} />
                <div style={{ height: '8px', borderRadius: '5px', background: '#ECEEF1', width: '75%' }} />
                <div style={{ height: '8px', borderRadius: '5px', background: '#ECEEF1', width: '82%' }} />
                <div style={{ height: '8px', borderRadius: '5px', background: '#ECEEF1', width: '58%' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '14px', borderTop: '1px solid #ECEEF1' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#F5E4E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#E05252" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <span style={{ fontSize: '12px', color: '#B0B4BE', fontFamily: 'var(--font-body)' }}>No response after 3 weeks</span>
              </div>
            </div>

            {/* After — real Reslink profile */}
            <div className="vp-after" style={{ borderRadius: '16px', border: '2px solid #D8F950', background: '#fff', overflow: 'hidden', boxShadow: '0 16px 56px rgba(4,22,53,0.12)' }}>
              {/* Profile header */}
              <div style={{ padding: '18px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #0C63E3, #4F6EF7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-phudu)' }}>OS</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Oliver Stone</p>
                    <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Product Designer · NYC</p>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 11px', borderRadius: '100px', letterSpacing: '0.04em', fontFamily: 'var(--font-body)', textTransform: 'uppercase', flexShrink: 0 }}>With Reslink</span>
              </div>

              {/* Video thumbnail */}
              <div style={{ margin: '14px 22px', borderRadius: '10px', overflow: 'hidden', position: 'relative', aspectRatio: '16/9', background: '#060D24' }}>
                <img
                  src="/videos/hero-poster.jpg"
                  alt="Reslink video resume"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Play overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,22,53,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#041635"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', fontWeight: 600, background: 'rgba(0,0,0,0.4)', padding: '2px 7px', borderRadius: '4px' }}>0:47</span>
              </div>

              {/* Activity feed */}
              <div style={{ padding: '0 22px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 12px', background: '#F7F8FA', borderRadius: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-phudu)' }}>G</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Google Recruiter viewed you</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 0:44 of 0:47 · 1h ago</p>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3', flexShrink: 0 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '10px 12px', background: '#FAFFF0', border: '1px solid #D8F950', borderRadius: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview request received</p>
                    <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>Google · 2 days after sharing</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
