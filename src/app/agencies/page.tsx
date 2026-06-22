'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Video, BarChart2, Users, Zap, Search, Briefcase, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FEATURES = [
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'Present candidates with confidence', body: 'Send clients a shortlist where every candidate has a video pitch attached. Clients see real people, not just PDFs — and they remember them.' },
  { icon: Search, color: '#7C3AED', bg: '#F3EEFF', title: 'Screen faster, place better', body: 'A 90-second Reslink replaces three rounds of phone screens. Know who\'s articulate, professional, and motivated before you ever pick up the phone.' },
  { icon: Briefcase, color: '#059669', bg: '#ECFDF5', title: 'Stand out from competing agencies', body: 'When your shortlists include video profiles and your competitors\' don\'t, clients notice. Reslink is a differentiator that wins business.' },
  { icon: BarChart2, color: '#D97706', bg: '#FFFBEB', title: 'Track candidate engagement', body: 'See when your clients view candidate Reslinks, which profiles they replay, and who they share internally. Full pipeline visibility.' },
  { icon: Users, color: '#E11D48', bg: '#FFF1F2', title: 'Manage your whole roster', body: 'One dashboard for your entire candidate pool. Tag, filter, and share profiles with specific clients in seconds.' },
  { icon: Zap, color: '#0891B2', bg: '#ECFEFF', title: 'Speed up your billing cycle', body: 'Faster client decisions mean faster placements mean faster billing. Agencies using Reslink report a 4× increase in successful placements per month.' },
];

const STATS = [
  { val: '4×', label: 'more successful placements per month' },
  { val: '60%', label: 'reduction in time from shortlist to offer' },
  { val: '92%', label: 'of agency clients say video shortlists improve decisions' },
];

const LOGOS = ['Hays', 'Michael Page', 'Robert Half', 'Kforce', 'Randstad', 'Spencer Stuart', 'Adecco', 'Korn Ferry'];

export default function AgenciesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(80px, 11vw, 140px) 24px clamp(80px, 10vw, 120px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For recruitment agencies</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '28px' }}>
                Place more<br />candidates.<br /><span style={{ color: '#D8F950' }}>Win more clients.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '540px', margin: '0 auto 40px' }}>
                Reslink helps recruitment agencies deliver stronger shortlists, impress clients, and close placements faster — all with video-first candidate profiles.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Get started free <ArrowRight size={16} />
                </Link>
                <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Talk to sales
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Why Reslink for agencies</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Differentiate your<br />agency. Close faster.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="ag-feat-grid">
              <style>{`
                @media (max-width: 900px) { .ag-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 600px) { .ag-feat-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)', height: '100%' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <f.icon size={22} color={f.color} strokeWidth={1.8} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#041635', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>{f.title}</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: '#fff', padding: 'clamp(56px, 7vw, 80px) 24px', borderTop: '1px solid #ECEEF1', borderBottom: '1px solid #ECEEF1' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }} className="ag-stats">
            <style>{`@media (max-width: 600px) { .ag-stats { grid-template-columns: 1fr !important; } }`}</style>
            {STATS.map(({ val, label }) => (
              <div key={val}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>{val}</p>
                <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '10px', lineHeight: 1.5, maxWidth: '180px', margin: '10px auto 0' }}>{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Logo strip */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(40px, 5vw, 60px) 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>Used by recruiters placing talent at</p>
            <div style={{ display: 'flex', gap: '12px 36px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              {LOGOS.map(co => (
                <span key={co} style={{ fontSize: '16px', fontWeight: 800, color: '#C8CCD4', fontFamily: 'var(--font-phudu)', letterSpacing: '-0.02em' }}>{co}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 108px) 24px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
              Ready to place<br />candidates faster?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginBottom: '36px' }}>Join the agencies closing more deals with video-first shortlists.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Get started free <ArrowRight size={16} />
              </Link>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
