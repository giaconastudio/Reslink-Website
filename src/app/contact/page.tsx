'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageSquare, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, paddingBottom: 'clamp(64px, 8vw, 100px)' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Contact us</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                We'd love to<br />hear from you.
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                Whether you have a question, partnership idea, or just want to say hi — our team is here.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main content */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '40px', alignItems: 'start' }} className="contact-grid">
            <style>{`
              .contact-grid { }
              @media (max-width: 760px) { .contact-grid { grid-template-columns: 1fr !important; } }
            `}</style>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(28px, 4vw, 44px)', border: '1px solid #ECEEF1', boxShadow: '0 2px 16px rgba(4,22,53,0.05)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <MessageSquare size={28} color="#059669" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '28px', fontWeight: 900, color: '#041635', marginBottom: '12px' }}>Message sent!</h3>
                  <p style={{ fontSize: '15px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>We'll get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '4px' }}>Send us a message</h2>
                  {[
                    { label: 'Your name', key: 'name', type: 'text', placeholder: 'Jane Smith' },
                    { label: 'Email address', key: 'email', type: 'email', placeholder: 'jane@company.com' },
                    { label: 'Subject', key: 'subject', type: 'text', placeholder: 'What\'s this about?' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #ECEEF1', fontSize: '14px', fontFamily: 'var(--font-body)', color: '#041635', outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>Message</label>
                    <textarea
                      placeholder="Tell us more..."
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #ECEEF1', fontSize: '14px', fontFamily: 'var(--font-body)', color: '#041635', outline: 'none', resize: 'vertical', boxSizing: 'border-box', background: '#FAFAFA' }}
                    />
                  </div>
                  <button type="submit" style={{ padding: '14px 28px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#0A52C4')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#0C63E3')}>
                    Send message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info sidebar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: Mail, color: '#0C63E3', bg: '#EEF4FF', title: 'Email us', body: 'hello@reslink.io', sub: 'We reply within one business day' },
                { icon: MessageSquare, color: '#7C3AED', bg: '#F3EEFF', title: 'Live chat', body: 'Available in-app', sub: 'Mon–Fri, 9am–6pm ET' },
                { icon: Clock, color: '#059669', bg: '#ECFDF5', title: 'Response time', body: '< 24 hours', sub: 'Typically much faster' },
                { icon: MapPin, color: '#D97706', bg: '#FFFBEB', title: 'Headquarters', body: 'Remote-first', sub: 'Team across US & Europe' },
              ].map(item => (
                <div key={item.title} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '20px 22px', display: 'flex', gap: '14px', alignItems: 'flex-start', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={18} color={item.color} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{item.title}</p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: item.color, fontFamily: 'var(--font-body)', margin: '2px 0' }}>{item.body}</p>
                    <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
