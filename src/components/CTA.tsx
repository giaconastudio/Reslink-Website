'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section style={{ padding: '88px 24px', background: '#0C1E5B' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900,
            letterSpacing: '-0.02em', lineHeight: 0.95,
            color: '#fff', marginBottom: '20px',
            fontFamily: 'var(--font-phudu)',
          }}>
            Ready to stand out?
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
            Join thousands of job seekers getting more callbacks, more interviews, and more offers — for free.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <a href="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
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
            No credit card required · Free forever
          </p>
        </motion.div>
      </div>
    </section>
  );
}
