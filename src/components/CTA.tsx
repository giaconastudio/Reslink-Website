'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section style={{ padding: '80px 24px', background: '#0B1437' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#fff', lineHeight: 1.12, marginBottom: '16px' }}>
            Ready to stand out?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: '36px' }}>
            Join thousands of job seekers getting more callbacks, more interviews, and more offers — for free.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <a href="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '14px 26px' }}>
              Get started free <ArrowRight size={15} />
            </a>
            <a href="#how-it-works" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 26px', fontSize: '15px', fontWeight: 600,
              color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.08)',
              borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.15)',
              textDecoration: 'none', transition: 'background 0.15s ease',
            }}>
              See how it works
            </a>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
            No credit card required · Free forever
          </p>
        </motion.div>
      </div>
    </section>
  );
}
