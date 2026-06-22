'use client';

import { motion } from 'framer-motion';
import { Download, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TEMPLATES = [
  { title: 'The Confident Closer', tag: 'Sales', desc: 'A punchy 90-second script built for SDRs and AEs who know how to sell themselves.', color: '#0C63E3', bg: '#EEF4FF', downloads: '4.2k', stars: 4.9 },
  { title: 'The Technical Expert', tag: 'Engineering', desc: 'Structured to highlight your stack, your impact, and your approach to complex problems.', color: '#7C3AED', bg: '#F3EEFF', downloads: '3.8k', stars: 4.8 },
  { title: 'The Creative Storyteller', tag: 'Design & Marketing', desc: 'For designers, marketers, and brand strategists who lead with vision and personality.', color: '#D97706', bg: '#FFFBEB', downloads: '3.1k', stars: 4.9 },
  { title: 'The Career Pivot', tag: 'Career Change', desc: 'Reframes your background as an asset, not a liability. Perfect for industry switchers.', color: '#059669', bg: '#ECFDF5', downloads: '5.7k', stars: 4.7 },
  { title: 'The Recent Graduate', tag: 'Entry Level', desc: 'Lead with energy and potential. Shows you\'re ready even when you\'re just getting started.', color: '#E11D48', bg: '#FFF1F2', downloads: '6.3k', stars: 4.8 },
  { title: 'The Executive', tag: 'Leadership', desc: 'Built for senior-level professionals. Communicates gravitas, vision, and track record.', color: '#0891B2', bg: '#ECFEFF', downloads: '2.4k', stars: 4.9 },
];

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px clamp(64px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Free templates</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Scripts that get<br />you callbacks.
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                Battle-tested video resume scripts, free to download. Edit in minutes, record with Reslink.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Templates grid */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(56px, 7vw, 88px) 24px clamp(72px, 9vw, 112px)' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="tmpl-grid">
              <style>{`
                .tmpl-grid { }
                @media (max-width: 900px) { .tmpl-grid { grid-template-columns: 1fr 1fr !important; } }
                @media (max-width: 580px) { .tmpl-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {TEMPLATES.map((t, i) => (
                <motion.div key={t.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '28px', height: '100%', boxSizing: 'border-box', boxShadow: '0 1px 8px rgba(4,22,53,0.04)', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: t.color, background: t.bg, borderRadius: '100px', padding: '3px 10px', fontFamily: 'var(--font-body)', marginBottom: '16px', letterSpacing: '0.05em' }}>{t.tag}</span>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#041635', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>{t.title}</h3>
                    <p style={{ fontSize: '13px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '24px', flex: 1 }}>{t.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Star size={12} fill="#D8F950" color="#D8F950" />
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{t.stars}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Download size={12} color="#9A9FA8" />
                          <span style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{t.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <button style={{ width: '100%', padding: '12px', background: t.bg, color: t.color, border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'background 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      onMouseEnter={e => (e.currentTarget.style.background = t.color) && (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = t.bg; (e.currentTarget as HTMLElement).style.color = t.color; }}>
                      <Download size={14} />
                      Download free
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
