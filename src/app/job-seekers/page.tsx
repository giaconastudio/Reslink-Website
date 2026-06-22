'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Share2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FEATURES = [
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'Record in minutes', body: 'Our teleprompter guides you word by word. No memorization, no nervousness. Just your best take.' },
  { icon: BarChart2, color: '#7C3AED', bg: '#F3EEFF', title: 'See who\'s watching', body: 'Know when recruiters view your profile, how long they watch, and how many times. No more sending into the void.' },
  { icon: Zap, color: '#D97706', bg: '#FFFBEB', title: 'AI-powered script', body: 'Paste your resume and get a personalized 90-second script tailored to the roles you\'re targeting.' },
  { icon: Globe, color: '#059669', bg: '#ECFDF5', title: 'One link. Everywhere.', body: 'Share your Reslink on LinkedIn, in email, or anywhere you apply. It works on every device.' },
  { icon: FileText, color: '#E11D48', bg: '#FFF1F2', title: 'Your resume, but alive', body: 'Reslink pairs your video pitch with your resume highlights in one clean profile. Recruiters get the full picture instantly.' },
  { icon: Share2, color: '#0891B2', bg: '#ECFEFF', title: 'Stand out in any inbox', body: 'Most applications look identical. A Reslink link in your email signature or cover letter is impossible to ignore.' },
];

const STATS = [
  { val: '300+', label: 'interviews landed globally' },
  { val: '10k+', label: 'active job seekers on Reslink' },
  { val: '48h', label: 'fastest interview booked after signup' },
];

const LOGOS = ['Amazon', 'Google', 'Meta', 'Stripe', 'HubSpot', 'Revolut', 'Adobe', 'Accenture'];

export default function JobSeekersPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(80px, 11vw, 140px) 24px clamp(80px, 10vw, 120px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For job seekers</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '28px' }}>
                Stop blending in.<br /><span style={{ color: '#D8F950' }}>Start standing out.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '540px', margin: '0 auto 40px' }}>
                A video resume that shows recruiters who you really are — your energy, your clarity, your drive. Not just another PDF.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Build my Reslink free <ArrowRight size={16} />
                </Link>
                <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  See free templates
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything you need</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Built for the<br />job seeker.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="js-feat-grid">
              <style>{`
                @media (max-width: 900px) { .js-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 600px) { .js-feat-grid { grid-template-columns: 1fr !important; } }
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
          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }} className="js-stats">
            <style>{`@media (max-width: 600px) { .js-stats { grid-template-columns: 1fr !important; } }`}</style>
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
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>Over 300+ candidates have landed jobs at</p>
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
              Ready to stand out?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginBottom: '36px' }}>It takes less than 10 minutes to build your first Reslink.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Get started free <ArrowRight size={16} />
              </Link>
              <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                See free templates
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
