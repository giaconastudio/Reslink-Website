'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, BarChart2 } from 'lucide-react';

/** Slim dark band routing hiring teams to the B2B side of the product. */
export default function B2BBand() {
  return (
    <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '700px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
      <style>{`
        .b2b-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(40px, 5vw, 72px); align-items: center; }
        @media (max-width: 860px) {
          .b2b-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .b2b-btns a { width: 100%; justify-content: center; box-sizing: border-box; }
          .b2b-btns { flex-direction: column; }
        }
      `}</style>
      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="b2b-grid">
          {/* Left — pitch */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>For hiring teams</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '18px' }}>
              Hiring? See the person<br /><span style={{ color: '#D8F950' }}>behind every application.</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '28px' }}>
              Reslink gives companies, agencies, and universities AI-scored video profiles, shared team reviews, and a branded job board — so you interview only the candidates worth your time.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {[
                { icon: Zap, text: 'Every applicant scored and ranked by AI' },
                { icon: Users, text: 'Your whole team reviews the same profile' },
                { icon: BarChart2, text: 'Watch-time analytics on every candidate' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'rgba(216,249,80,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={13} color="#D8F950" strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>{text}</span>
                </div>
              ))}
            </div>
            <div className="b2b-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/companies" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px', background: '#D8F950', color: '#041635' }}>
                See Reslink for companies <ArrowRight size={15} />
              </Link>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.15)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Talk to sales
              </Link>
            </div>
          </motion.div>

          {/* Right — dashboard shot */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 32px 90px rgba(0,0,0,0.45)' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '5px', padding: '2px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>app.reslink.io</div>
                </div>
              </div>
              <div style={{ maxHeight: '380px', overflow: 'hidden' }}>
                <Image src="/feature-dashboard.png" alt="Reslink hiring dashboard" width={3840} height={1892} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
