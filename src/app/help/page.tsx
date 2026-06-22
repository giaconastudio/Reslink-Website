'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Video, CreditCard, Settings, Users, BarChart2, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CATEGORIES = [
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'Recording & Video', count: 12 },
  { icon: CreditCard, color: '#7C3AED', bg: '#F3EEFF', title: 'Billing & Plans', count: 8 },
  { icon: Settings, color: '#D97706', bg: '#FFFBEB', title: 'Account & Settings', count: 10 },
  { icon: Users, color: '#059669', bg: '#ECFDF5', title: 'Sharing & Privacy', count: 7 },
  { icon: BarChart2, color: '#0891B2', bg: '#ECFEFF', title: 'Analytics', count: 6 },
  { icon: Shield, color: '#E11D48', bg: '#FFF1F2', title: 'Security', count: 5 },
];

const FAQS = [
  { q: 'How long can my video resume be?', a: 'We recommend 60–90 seconds. You can record up to 3 minutes, but shorter videos tend to perform better with recruiters.' },
  { q: 'Can I re-record my video as many times as I want?', a: 'Yes. You can re-record and update your video anytime. Your Reslink link stays the same, so any previously shared links will always show your latest version.' },
  { q: 'Who can see my Reslink profile?', a: 'Only people you share the link with can view your profile. You control visibility and can disable the link at any time.' },
  { q: 'How do I know if someone viewed my profile?', a: 'Pro and Premium plans include view analytics — you\'ll see when your profile was viewed, how long they watched, and how many times.' },
  { q: 'Does Reslink work on mobile?', a: 'Yes. You can record, edit, and share your Reslink entirely from your phone. Our mobile experience is fully optimized.' },
  { q: 'What\'s the difference between Free and Pro?', a: 'Free gives you one video resume with basic analytics. Pro unlocks multiple videos, full analytics, custom branding, and priority support.' },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #ECEEF1' }}>
      <button onClick={() => setOpen(p => !p)}
        style={{ width: '100%', textAlign: 'left', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'none', border: 'none', cursor: 'pointer' }}>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{q}</p>
        <ChevronDown size={18} color="#9A9FA8" style={{ flexShrink: 0, transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.3s ease, opacity 0.25s ease' }}>
        <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', paddingBottom: '20px' }}>{a}</p>
      </div>
    </div>
  );
}

export default function HelpPage() {
  const [query, setQuery] = useState('');
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero + search */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px clamp(64px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Help center</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                How can we<br />help you?
              </h1>
              <div style={{ position: 'relative' }}>
                <Search size={18} color="#9A9FA8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', backdropFilter: 'blur(8px)' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(56px, 7vw, 88px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '28px' }}>Browse by category</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '64px' }} className="help-cat-grid">
              <style>{`
                .help-cat-grid { }
                @media (max-width: 760px) { .help-cat-grid { grid-template-columns: 1fr 1fr !important; } }
                @media (max-width: 480px) { .help-cat-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {CATEGORIES.map((cat, i) => (
                <motion.div key={cat.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', cursor: 'pointer', transition: 'box-shadow 0.15s', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(4,22,53,0.09)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(4,22,53,0.04)'}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                      <cat.icon size={20} color={cat.color} strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>{cat.title}</p>
                    <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{cat.count} articles</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ */}
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '8px' }}>Frequently asked questions</h2>
              <p style={{ fontSize: '15px', color: '#5C6070', fontFamily: 'var(--font-body)', marginBottom: '32px' }}>Can't find your answer? <a href="/contact" style={{ color: '#0C63E3', textDecoration: 'none', fontWeight: 600 }}>Contact us</a> — we reply fast.</p>
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
                {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
