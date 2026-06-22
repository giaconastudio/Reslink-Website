'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PERKS = [
  'Fast and friendly support from our team',
  'Tailored solutions for your hiring needs',
  'Partnership and collaboration opportunities',
  'Dedicated onboarding for your organization',
];

export default function SalesPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', roles: '', org: '', message: '', source: '' });

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid #ECEEF1', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#041635', outline: 'none',
    boxSizing: 'border-box', background: '#FAFAFA',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.roles ? '#041635' : '#9A9FA8',
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          input:focus, textarea:focus, select:focus { border-color: #0C63E3 !important; }
          .sales-grid { display: grid; grid-template-columns: 1fr 520px; gap: 56px; align-items: start; max-width: 1060px; margin: 0 auto; }
          @media (max-width: 900px) { .sales-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }
        `}</style>

        <section style={{ background: '#F7F8FA', padding: 'clamp(64px, 9vw, 112px) 24px' }}>
          <div className="sales-grid">

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Sales</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', lineHeight: 0.93, marginBottom: '12px' }}>
                Schedule a<br />Reslink demo.
              </h1>
              <div style={{ width: '80px', height: '5px', background: '#D8F950', borderRadius: '3px', marginBottom: '24px' }} />
              <p style={{ fontSize: '15px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '420px' }}>
                Sign up for a personalized demo to see how Reslink can help your business streamline your hiring process.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {PERKS.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={13} color="#0C63E3" strokeWidth={2.5} />
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{p}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(28px, 4vw, 40px)', boxShadow: '0 4px 24px rgba(4,22,53,0.08)' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <CheckCircle size={30} color="#041635" strokeWidth={2.5} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '28px', fontWeight: 900, color: '#041635', marginBottom: '10px' }}>Request received!</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.65 }}>Our sales team will reach out within one business day to schedule your demo.</p>
                  </div>
                ) : (
                  <>
                    <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '4px' }}>Schedule a demo</h2>
                    <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '24px' }}>Fill out the form below to connect with our sales experts.</p>
                    <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>First name</label>
                          <input type="text" placeholder="Jane" value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} required style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Last name</label>
                          <input type="text" placeholder="Smith" value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} required style={inputStyle} />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Business email</label>
                        <input type="email" placeholder="jane@company.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>How many roles / students will you use Reslink for?</label>
                        <select value={form.roles} onChange={e => setForm(p => ({ ...p, roles: e.target.value }))} required style={selectStyle}>
                          <option value="" disabled>Select a range</option>
                          <option>1–10</option>
                          <option>11–50</option>
                          <option>51–200</option>
                          <option>201–500</option>
                          <option>500+</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Which best describes your organization?</label>
                        <select value={form.org} onChange={e => setForm(p => ({ ...p, org: e.target.value }))} required style={{ ...selectStyle, color: form.org ? '#041635' : '#9A9FA8' }}>
                          <option value="" disabled>Select one</option>
                          <option>Company / Employer</option>
                          <option>Recruitment Agency</option>
                          <option>University / College</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>How can we help you?</label>
                        <textarea placeholder="Tell us a bit about what you're looking for..." rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>How did you hear about Reslink?</label>
                        <input type="text" placeholder="LinkedIn, Google, a friend..." value={form.source} onChange={e => setForm(p => ({ ...p, source: e.target.value }))} style={inputStyle} />
                      </div>
                      <button type="submit"
                        style={{ width: '100%', padding: '14px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px', transition: 'background 0.15s, transform 0.1s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0C63E3'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                        Submit <ArrowRight size={15} />
                      </button>
                      <p style={{ fontSize: '11px', color: '#C4C8D0', fontFamily: 'var(--font-body)', lineHeight: 1.5, textAlign: 'center' }}>
                        By clicking submit, you consent Reslink will use the contact information you provide to share updates about our products and services. You can unsubscribe anytime.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
