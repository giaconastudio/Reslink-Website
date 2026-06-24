'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Check } from 'lucide-react';
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

const FEATURES = [
  { label: 'Quick & Simple', desc: 'Customize it in minutes' },
  { label: 'ATS-Friendly', desc: 'Passes through tracking systems' },
  { label: 'Sleek Design', desc: 'Modern, professional layout' },
];

export default function TemplatesPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          .tmpl-grid { }
          @media (max-width: 900px) { .tmpl-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 580px) { .tmpl-grid { grid-template-columns: 1fr !important; } }
          .tmpl-form-input { width: 100%; padding: 14px 16px; border-radius: 10px; border: 1.5px solid #E8EAF0; background: #F7F8FA; font-size: 14px; font-family: var(--font-body); color: #041635; outline: none; box-sizing: border-box; transition: border-color 0.15s; }
          .tmpl-form-input:focus { border-color: #0C63E3; background: #fff; }
          .tmpl-form-input::placeholder { color: #B0B5C0; }
        `}</style>

        {/* Download CTA — main hero */}
        <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '30%', width: '700px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 480px', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center', position: 'relative', zIndex: 1 }} className="tmpl-hero-grid">
            <style>{`.tmpl-hero-grid { @media (max-width: 900px) { grid-template-columns: 1fr !important; } }`}</style>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '12px' }}>
                FREE RESUME
                <span style={{ display: 'block', position: 'relative', width: 'fit-content' }}>
                  TEMPLATES
                  <img src="/vector-underline.svg" alt="" aria-hidden style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', pointerEvents: 'none' }} />
                </span>
              </h1>
              <p style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginTop: '36px', marginBottom: '28px', maxWidth: '420px' }}>
                Ready to land your dream job? Download our free, ATS-friendly resume template and create a professional resume in minutes that will impress recruiters.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {FEATURES.map(f => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(216,249,80,0.15)', border: '1px solid rgba(216,249,80,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} color="#D8F950" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>{f.label}: <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>{f.desc}</span></span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(28px, 4vw, 40px)', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ width: '56px', height: '56px', background: '#D8F950', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <Check size={26} color="#041635" strokeWidth={2.5} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '10px' }}>Check your inbox!</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>We sent the free templates to <strong>{form.email}</strong>. Check your spam folder if you don&apos;t see it within a minute.</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '6px', textAlign: 'center' }}>Download it now</h3>
                    <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', textAlign: 'center', marginBottom: '24px' }}>Fill in your details to receive the free templates</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <input className="tmpl-form-input" type="text" placeholder="First Name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                      <input className="tmpl-form-input" type="text" placeholder="Last Name" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                    </div>
                    <input className="tmpl-form-input" type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ marginBottom: '14px' }} />
                    <button
                      onClick={() => { if (form.firstName && form.email) setSubmitted(true); }}
                      style={{ width: '100%', padding: '15px', background: '#D8F950', color: '#041635', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'opacity 0.15s', marginBottom: '16px' }}>
                      Submit
                    </button>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', lineHeight: 1.65, textAlign: 'center' }}>
                      By clicking submit, you consent Reslink will use the contact information you provide to share updates about our products and services. You can unsubscribe anytime. For details, see our <a href="/privacy" style={{ color: '#041635', fontWeight: 700 }}>Privacy Policy</a>.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ / info strip */}
        <section style={{ background: '#fff', borderBottom: '1px solid #ECEEF1', padding: '20px 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <p style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
              <strong style={{ color: '#041635' }}>Frequently Asked Questions</strong> &nbsp;·&nbsp; No credit card needed &nbsp;·&nbsp; Instant email delivery &nbsp;·&nbsp; 100% free, always
            </p>
          </div>
        </section>


      </main>
      <Footer />
    </>
  );
}
