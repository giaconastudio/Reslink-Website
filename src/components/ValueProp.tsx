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
        .vp-after { transition: transform 0.3s ease; }
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
            <div style={{ borderRadius: '16px', border: '1px solid #E8EAF0', padding: '22px', background: '#FAFBFC' }}>
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

            {/* After — real Reslink profile mockup */}
            <div className="vp-after" style={{ borderRadius: '16px', border: '2px solid #D8F950', overflow: 'hidden', boxShadow: '0 16px 56px rgba(4,22,53,0.12)' }}>
              {/* Dark navy profile header */}
              <div style={{ background: '#041635', padding: '20px 22px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                    {/* Circular headshot placeholder */}
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #0C63E3 0%, #4F6EF7 100%)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.15)' }}>
                      <span style={{ fontSize: '18px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>OS</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em' }}>OLIVER STONE</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px', flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                          Business Dev Rep
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          London, UK
                        </span>
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.05em', fontFamily: 'var(--font-body)', textTransform: 'uppercase', flexShrink: 0 }}>With Reslink</span>
                </div>
                {/* CTAs */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#D8F950', borderRadius: '7px', padding: '8px 14px', cursor: 'pointer' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#041635"><path d="M8 5v14l11-7z"/></svg>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Play Intro</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '7px', padding: '8px 14px', cursor: 'pointer' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>Download Resume</span>
                  </div>
                </div>
              </div>

              {/* Resume document peek */}
              <div style={{ background: '#fff', padding: '16px 20px', borderBottom: '1px solid #ECEEF1' }}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Oliver Stone</p>
                  <p style={{ fontSize: '11px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>Business Development Representative</p>
                  <p style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>London, UK · LinkedIn</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ height: '7px', borderRadius: '4px', background: '#F3F4F6', width: '100%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#F3F4F6', width: '88%' }} />
                  <div style={{ height: '7px', borderRadius: '4px', background: '#F3F4F6', width: '94%' }} />
                </div>
              </div>

              {/* Interview notification */}
              <div style={{ padding: '12px 20px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '9px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview request received</p>
                  <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>HubSpot · 2 days after sharing</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
