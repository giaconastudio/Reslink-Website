'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Video, BarChart2, Users, Zap, Award, GraduationCap, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FEATURES = [
  { icon: GraduationCap, color: '#0C63E3', bg: '#EEF4FF', title: 'Give students a real career edge', body: 'A Reslink video profile sets your graduates apart when they\'re competing for the same roles with the same GPA and the same resume format.' },
  { icon: Video, color: '#7C3AED', bg: '#F3EEFF', title: 'Modern career services at scale', body: 'Roll out Reslink to your entire student body with one institutional plan. Career services teams love how fast students get up and running.' },
  { icon: Award, color: '#059669', bg: '#ECFDF5', title: 'Improve graduate outcomes', body: 'Track which students have created profiles and monitor engagement from employer partners. Tie Reslink adoption to placement metrics.' },
  { icon: BarChart2, color: '#D97706', bg: '#FFFBEB', title: 'Engagement dashboards for advisors', body: 'Career advisors get visibility into which students are active, how their profiles are performing, and where to focus coaching.' },
  { icon: Users, color: '#E11D48', bg: '#FFF1F2', title: 'Connect employers to your talent', body: 'Share a curated gallery of student Reslinks directly with employer partners at recruiting events, career fairs, or via email.' },
  { icon: Zap, color: '#0891B2', bg: '#ECFEFF', title: 'Fast onboarding for any cohort', body: 'Launch with your entire graduating class in a single session. Students record their first Reslink in under 10 minutes — no tech experience needed.' },
];

const STATS = [
  { val: '3×', label: 'more employer interest in student candidates' },
  { val: '78%', label: 'of students land interviews within 30 days' },
  { val: '95%', label: 'advisor satisfaction with career outcomes tracking' },
];

const LOGOS = ['Harvard', 'NYU', 'UCLA', 'Northeastern', 'USC', 'Michigan', 'Penn State', 'Georgetown'];

export default function UniversitiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(80px, 11vw, 140px) 24px clamp(80px, 10vw, 120px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For universities</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '28px' }}>
                Help your<br />students get<br /><span style={{ color: '#D8F950' }}>hired faster.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '540px', margin: '0 auto 40px' }}>
                Reslink gives university career centers a scalable, modern tool to help graduates stand out — from first-year students to your most placement-ready seniors.
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
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Why Reslink for universities</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Better outcomes.<br />Better rankings.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="uni-feat-grid">
              <style>{`
                @media (max-width: 900px) { .uni-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 600px) { .uni-feat-grid { grid-template-columns: 1fr !important; } }
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
          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }} className="uni-stats">
            <style>{`@media (max-width: 600px) { .uni-stats { grid-template-columns: 1fr !important; } }`}</style>
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
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>Empowering graduates from</p>
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
              Ready to boost<br />graduate outcomes?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginBottom: '36px' }}>Partner with Reslink to give your students a hiring advantage from day one.</p>
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
