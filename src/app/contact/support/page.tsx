'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PERKS = [
  'Fast and friendly support',
  'Tailored solutions for your needs',
  'Partnership and collaboration opportunities',
];

const FAQS = [
  { q: 'Is Reslink free?', a: 'Yes — Reslink has a free tier that lets you create and share a video resume with no cost. Pro and Premium plans unlock advanced features like full analytics, multiple videos, and custom branding.' },
  { q: 'How can employers view my Reslink?', a: 'Anyone with your unique Reslink link can view your profile. You can share it anywhere — LinkedIn, email applications, or directly with recruiters.' },
  { q: 'Can I use Reslink for any type of job?', a: 'Absolutely. Reslink works for any industry or role. Whether you\'re applying for a creative role or a technical position, video resumes help you stand out.' },
  { q: 'How long should my video pitch be?', a: 'We recommend 60–90 seconds. Concise, confident, and on point. Shorter videos tend to get watched all the way through — which is what you want.' },
  { q: 'Can I edit my Reslink after sharing it?', a: 'Yes. You can update your video anytime. Your link stays the same, so anyone who previously received it will automatically see your latest version.' },
  { q: 'Will my video pitch affect ATS (Applicant Tracking System) compatibility?', a: 'Your Reslink is a supplement to your standard application, not a replacement. You still submit your traditional resume through ATS — Reslink is the extra layer that makes you memorable.' },
  { q: 'Do I need any special equipment to record my video pitch?', a: 'No special equipment needed. Your laptop webcam or smartphone camera works great. Good lighting and a quiet space are the only things that matter.' },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #ECEEF1' }}>
      <button onClick={() => setOpen(p => !p)}
        style={{ width: '100%', textAlign: 'left', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'none', border: 'none', cursor: 'pointer' }}>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{q}</p>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: open ? '#0C63E3' : '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
          <ChevronDown size={16} color={open ? '#fff' : '#9A9FA8'} style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'none' }} />
        </div>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.3s ease, opacity 0.25s ease' }}>
        <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', paddingBottom: '20px' }}>{a}</p>
      </div>
    </div>
  );
}

export default function SupportPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid rgba(255,255,255,0.15)', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#fff', outline: 'none',
    boxSizing: 'border-box', background: 'rgba(255,255,255,0.08)',
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          input:focus, textarea:focus { border-color: #D8F950 !important; }
          .support-grid { display: grid; grid-template-columns: 1fr 460px; gap: 0; align-items: stretch; }
          @media (max-width: 860px) { .support-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        {/* Hero form section */}
        <section style={{ background: '#041635', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '700px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', padding: 'clamp(64px, 9vw, 112px) 24px' }}>
            <div className="support-grid">
              {/* Left */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                style={{ paddingRight: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Support</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.93, marginBottom: '12px' }}>
                  Get in touch<br />with our team.
                </h1>
                <div style={{ width: '70px', height: '5px', background: '#D8F950', borderRadius: '3px', marginBottom: '24px' }} />
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '380px' }}>
                  We're here to help. If you have questions about our platform, need assistance, or want to explore partnership opportunities, feel free to reach out.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {PERKS.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(216,249,80,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle size={13} color="#D8F950" strokeWidth={2.5} />
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)' }}>{p}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Form card */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(28px, 4vw, 40px)' }}>
                  {sent ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                        <CheckCircle size={28} color="#041635" strokeWidth={2.5} />
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>Message sent!</h3>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>We'll get back to you within one business day.</p>
                    </div>
                  ) : (
                    <>
                      <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '4px' }}>Submit a request</h2>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginBottom: '22px' }}>Our support team will get back to you as soon as possible.</p>
                      <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>First name</label>
                            <input type="text" placeholder="Jane" value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Last name</label>
                            <input type="text" placeholder="Smith" value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} required style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
                          <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>How can we help you?</label>
                          <textarea placeholder="Describe your issue or question..." rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
                        </div>
                        <button type="submit"
                          style={{ width: '100%', padding: '13px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.15s, transform 0.1s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0C63E3'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                          Send message <ArrowRight size={15} />
                        </button>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                          By clicking submit, you consent Reslink will use the contact information you provide. You can unsubscribe anytime.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>FAQ</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', lineHeight: 0.95 }}>Frequently asked questions</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
              {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
