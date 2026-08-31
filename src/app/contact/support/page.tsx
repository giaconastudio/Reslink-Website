'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TABS = [
  { id: 'help', label: 'I need help' },
  { id: 'partnerships', label: 'Partnerships' },
  { id: 'press', label: 'Press' },
];

const ANSWERED = [
  'Who can see my Reslink?',
  'Cancelling or changing plan',
  'Will a video break my ATS application?',
];


const FAQS = [
  { q: 'Is Reslink free?', a: 'Yes. Reslink has a free tier that lets you create and share a video resume at no cost. Pro and Premium plans unlock advanced analytics, multiple videos, and custom branding.' },
  { q: 'How can employers view my Reslink?', a: 'Anyone with your unique Reslink link can view your profile. Share it on LinkedIn, in email applications, or directly with recruiters.' },
  { q: 'Can I use Reslink for any type of job?', a: 'Absolutely. Reslink works for any industry or role. Whether you\'re applying for a creative or technical position, video resumes help you stand out.' },
  { q: 'How long should my video pitch be?', a: 'We recommend 60–90 seconds. Concise and confident. Shorter videos get watched all the way through. which is exactly what you want.' },
  { q: 'Can I edit my Reslink after sharing it?', a: 'Yes. You can update your video anytime. Your link stays the same, so anyone who already received it will see your latest version automatically.' },
  { q: 'Will my video pitch affect ATS compatibility?', a: 'Reslink is a supplement to your standard application, not a replacement. You still submit your traditional resume through ATS. Reslink is the extra layer that makes you memorable.' },
  { q: 'Do I need special equipment to record?', a: 'No. Your laptop webcam or smartphone camera works great. Good lighting and a quiet space make the biggest difference.' },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #ECEEF1' }}>
      <button onClick={toggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{q}</span>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open ? '#9E2462' : '#FBEAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
          {open ? <Minus size={12} color="#fff" /> : <Plus size={12} color="#5C6070" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, paddingBottom: '20px', fontFamily: 'var(--font-body)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportPage() {
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState('help');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 14px', borderRadius: '10px',
    border: '1.5px solid #E4E7EC', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#061A3A', outline: 'none',
    boxSizing: 'border-box', background: '#F6F7F9',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '10px', fontWeight: 700, color: '#9AA1AE',
    marginBottom: '6px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em',
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          input:focus, textarea:focus { border-color: #C0398A !important; background: #fff !important; }
          .support-grid { display: grid; grid-template-columns: 1fr 460px; gap: 56px; align-items: start; }
          @media (max-width: 860px) { .support-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }
        `}</style>

        {/* Hero + form */}
        <section style={{ background: 'linear-gradient(155deg, #FBEAF2 0%, #F3EBF7 52%, #ECE9F6 100%)', padding: 'clamp(56px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="support-grid">
              {/* Left */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C0398A', marginBottom: '18px', fontFamily: 'var(--font-body)' }}>Support</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 6.6vw, 78px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', lineHeight: 0.92, marginBottom: '26px' }}>
                  Talk to a<br /><span style={{ background: 'linear-gradient(#D7FF43, #D7FF43) no-repeat', backgroundSize: '100% 0.34em', backgroundPosition: '0 calc(100% - 0.08em)', padding: '0 0.05em', WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>real person.</span>
                </h1>
                <p style={{ fontSize: '16px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: '28px', maxWidth: '360px' }}>
                  We&apos;re a small team and we answer our own inbox. No ticket queue, no bot.
                </p>
                {/* avatars */}
                <div style={{ display: 'flex', marginBottom: '36px' }}>
                  {['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg'].map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={src} src={src} alt="" width={44} height={44} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '3px solid #FBEAF2', objectFit: 'cover', marginLeft: i === 0 ? 0 : '-12px', display: 'block' }} />
                  ))}
                </div>
                {/* Answered already */}
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C0398A', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>Answered already</p>
                <div style={{ maxWidth: '360px' }}>
                  {ANSWERED.map(q => (
                    <Link key={q} href="/help" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '14px 0', borderBottom: '1px solid rgba(6,26,58,0.1)', textDecoration: 'none', color: '#061A3A', fontSize: '15px', fontWeight: 500, fontFamily: 'var(--font-body)', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C0398A')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#061A3A')}>
                      {q} <ArrowRight size={15} color="#C0398A" />
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Right: Form (white card) */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(26px, 3vw, 34px)', boxShadow: '0 30px 70px rgba(158,36,98,0.14)' }}>
                  {sent ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                        <CheckCircle size={28} color="#061A3A" strokeWidth={2.5} />
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#061A3A', marginBottom: '10px' }}>Message sent!</h3>
                      <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>We&apos;ll reply to your email within one business day.</p>
                    </div>
                  ) : (
                    <>
                      {/* tabs */}
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '22px', flexWrap: 'wrap' }}>
                        {TABS.map(t => {
                          const active = tab === t.id;
                          return (
                            <button key={t.id} onClick={() => setTab(t.id)}
                              style={{ padding: '7px 15px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', background: active ? '#FBEAF5' : '#F4F5F7', color: active ? '#C0398A' : '#5C6070', transition: 'all 0.15s' }}>
                              {t.label}
                            </button>
                          );
                        })}
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em', marginBottom: '4px' }}>Send us a message</h2>
                      <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '22px' }}>The more detail the better — it saves a round trip.</p>
                      <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={labelStyle}>First name</label>
                            <input type="text" placeholder="Jane" value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} required style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Last name</label>
                            <input type="text" placeholder="Smith" value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} required style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Email</label>
                          <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>What&apos;s going on?</label>
                          <textarea placeholder="Describe the issue or question..." rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
                        </div>
                        <button type="submit"
                          style={{ width: '100%', padding: '15px', background: '#9E2462', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.15s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#831C51'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#9E2462'; }}>
                          Send message <ArrowRight size={15} />
                        </button>
                        <p style={{ fontSize: '12px', color: '#9AA1AE', fontFamily: 'var(--font-body)', textAlign: 'center' }}>We&apos;ll reply to this address. Nothing else, no lists.</p>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C0398A', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Common questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', lineHeight: 0.96 }}>Everything you need to know</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
              {FAQS.map((f, i) => (
                <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
