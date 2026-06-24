'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: '#041635', position: 'relative', overflow: 'hidden' }}>
      {/* Glows */}
      <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-30%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(216,249,80,0.1), transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '999px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{
            fontSize: 'clamp(42px, 6.5vw, 80px)', fontWeight: 900,
            letterSpacing: '-0.035em', lineHeight: 0.92,
            color: '#fff', marginBottom: '22px',
            fontFamily: 'var(--font-phudu)',
          }}>
            Ready to<br /><span style={{ color: '#D8F950' }}>stand out?</span>
          </h2>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Get started with Reslink today. Create your personalized video resume and start landing more interviews.
          </p>
          <style>{`
            .cta-btns { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
            @media (max-width: 760px) {
              .cta-btns a { width: 100%; justify-content: center; }
            }
          `}</style>
          <div className="cta-btns">
            <a href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Get started free <ArrowRight size={15} />
            </a>
            <a href="#how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', padding: '14px 28px',
              fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.65)',
              background: 'rgba(255,255,255,0.08)', borderRadius: '8px',
              border: '1.5px solid rgba(255,255,255,0.15)', textDecoration: 'none',
              fontFamily: 'var(--font-body)',
            }}>
              See how it works
            </a>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>
            Free to start · Takes less than 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
