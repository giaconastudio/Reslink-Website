'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AIScreeningDemo from '@/components/AIScreeningDemo';

/** Homepage counterpart to the job-seeker hero's clickable example Reslink —
 *  organizations get their own interactive piece to try, not just a link
 *  out. Same live AI-screening demo used on the companies page. */
export default function HomeOrgDemo() {
  return (
    <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />

      <style>{`
        .hod-inner { max-width: 720px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
        .hod-frame { border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #fff; box-shadow: 0 30px 90px rgba(0,0,0,0.4); margin-top: clamp(32px, 4vw, 48px); text-align: left; }
        .hod-bar { background: #F0F2F5; padding: 10px 14px; border-bottom: 1px solid #E6E8EC; display: flex; align-items: center; gap: 6px; }
      `}</style>

      <div className="hod-inner">
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          For organizations
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.05 }} style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 900, color: '#fff', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: '16px' }}>
          Watch candidates get ranked in real time.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.1 }} style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '480px', margin: '0 auto' }}>
          Every applicant gets scored on video pitch, resume match, and role fit, the moment they apply. This is the same live view your hiring team sees.
        </motion.p>

        <motion.div className="hod-frame" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hod-bar">
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
            <div style={{ flex: 1, margin: '0 12px', background: '#EAECEF', borderRadius: '6px', padding: '4px 14px', fontSize: '11px', color: '#9A9FA8', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
              app.reslink.io
            </div>
          </div>
          <AIScreeningDemo />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.25 }} style={{ marginTop: '28px' }}>
          <Link href="/companies" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700, color: '#D8F950', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
            Explore for organizations <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
