'use client';

import { motion } from 'framer-motion';

export default function ValueProp() {
  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left — problem/solution */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '20px' }}>
              The problem
            </p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '24px' }}>
              Your resume looks exactly like everyone else&apos;s.
            </h2>
            <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, marginBottom: '24px' }}>
              Recruiters spend an average of <strong style={{ color: '#041635' }}>7 seconds</strong> on a resume. You have the skills. You have the experience. But a PDF can&apos;t show your personality, your drive, or why you&apos;re the one they should call.
            </p>
            <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7 }}>
              Reslink fixes that. A video resume puts a face and a voice to your name — so recruiters remember <em>you</em>, not just a page of bullet points.
            </p>
          </motion.div>

          {/* Right — before/after */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {/* Before */}
            <div style={{ borderRadius: '14px', border: '1px solid #EEEEF0', padding: '20px 24px', background: '#FAFAFA', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '11px', fontWeight: 600, color: '#9A9FA8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Before</div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#9A9FA8', marginBottom: '12px' }}>Traditional Resume</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                {[70, 90, 55, 95, 80, 88, 72].map((w, i) => (
                  <div key={i} style={{ height: i < 3 ? '10px' : '8px', borderRadius: '4px', background: i < 3 ? '#E5E7EB' : '#EEEEF0', width: `${w}%` }} />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#EEEEF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <span style={{ fontSize: '12px', color: '#9A9FA8' }}>No response after 3 weeks</span>
              </div>
            </div>

            {/* After */}
            <div style={{ borderRadius: '14px', border: '2px solid #D8F950', padding: '20px 24px', background: '#fff', position: 'relative', boxShadow: '0 8px 32px rgba(4,22,53,0.08)' }}>
              <div style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '11px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '3px 10px', borderRadius: '100px', letterSpacing: '0.04em' }}>With Reslink</div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#0C63E3', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>reslink.io/firstlast</p>
              <div style={{ borderRadius: '8px', background: '#041635', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', position: 'relative' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#041635"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <span style={{ position: 'absolute', bottom: '7px', right: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>0:47</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#041635' }}>Interview request received — 2 days later</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
