'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Eye, EyeOff, Briefcase, Building2, Users, GraduationCap } from 'lucide-react';
import Navbar from '@/components/Navbar';

type AccountType = 'seeker' | 'company' | 'agency' | 'university';

const ACCOUNT_TYPES = [
  { id: 'seeker' as AccountType, icon: Briefcase, label: 'Job Seeker', desc: 'Show your personality and land more interviews' },
  { id: 'company' as AccountType, icon: Building2, label: 'Company', desc: 'Hire faster with authentic, engaging video applications' },
  { id: 'agency' as AccountType, icon: Users, label: 'Recruitment Agency', desc: 'Present your candidates in a more human, memorable way' },
  { id: 'university' as AccountType, icon: GraduationCap, label: 'University', desc: 'Empower your students to launch their careers' },
];

const PANELS: Record<AccountType, {
  image: string;
  overlay: string;
  headline: string;
  sub: string;
  quote: string;
  author: string;
  role: string;
  stats?: { val: string; label: string }[];
  logos?: string[];
}> = {
  seeker: {
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1200',
    overlay: 'linear-gradient(160deg, rgba(4,22,53,0.82) 0%, rgba(12,99,227,0.70) 100%)',
    headline: 'Your story deserves\nto be heard.',
    sub: 'Stand out with a video resume that shows who you really are.',
    quote: '"Reslink got me interviews at companies that ignored my PDF résumé for months."',
    author: 'Ben Harper', role: 'Software Engineer · Amazon',
    logos: ['Amazon', 'Meta', 'Stripe', 'HubSpot', 'Adobe', 'Tesla', 'Revolut', 'EY'],
  },
  company: {
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
    overlay: 'linear-gradient(160deg, rgba(4,22,53,0.90) 0%, rgba(4,22,53,0.78) 100%)',
    headline: 'Hire people,\nnot paper.',
    sub: 'See candidates as they really are before the first call.',
    quote: '"Video pitches helped us find the right cultural fit in half the time."',
    author: 'Sarah Lopez', role: 'Head of Talent · Series B Startup',
    stats: [{ val: '5×', label: 'better hire quality' }, { val: '30%', label: 'faster time-to-hire' }, { val: '91%', label: 'hiring manager satisfaction' }],
  },
  agency: {
    image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200',
    overlay: 'linear-gradient(160deg, rgba(12,99,227,0.88) 0%, rgba(4,22,53,0.80) 100%)',
    headline: 'Place candidates\nfaster.',
    sub: 'Give clients a reason to say yes before the interview.',
    quote: '"We cut screening time by 60% and our placement rate went through the roof."',
    author: 'Maya Thompson', role: 'Principal Recruiter',
    stats: [{ val: '4×', label: 'faster placements' }, { val: '60%', label: 'less screening time' }, { val: '92%', label: 'recruiter satisfaction' }],
  },
  university: {
    image: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=1200',
    overlay: 'linear-gradient(160deg, rgba(4,22,53,0.85) 0%, rgba(55,30,120,0.75) 100%)',
    headline: 'Launch your\nstudents further.',
    sub: 'Give graduates a competitive edge before they walk the stage.',
    quote: '"Students using Reslink saw a 3× higher callback rate from employers."',
    author: 'Dr. James Okafor', role: 'Director of Career Services',
    logos: ['Columbia', 'Princeton', 'Michigan', 'Cambridge', 'GWU', 'Syracuse'],
  },
};

function RightSide({ type }: { type: AccountType }) {
  const p = PANELS[type];
  return (
    <AnimatePresence mode="wait">
      <motion.div key={type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
        style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Photo */}
        <img src={p.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        {/* Color overlay */}
        <div style={{ position: 'absolute', inset: 0, background: p.overlay }} />
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 44px' }}>
          {/* Top: headline */}
          <div>
            <span style={{ display: 'inline-block', background: '#D8F950', color: '#041635', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '100px', padding: '4px 12px', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
              {ACCOUNT_TYPES.find(t => t.id === type)!.label}
            </span>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 3.8vw, 54px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.95, whiteSpace: 'pre-line', marginBottom: '16px' }}>
              {p.headline}
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', lineHeight: 1.6, maxWidth: '340px' }}>{p.sub}</p>
          </div>

          {/* Bottom: testimonial + proof */}
          <div>
            {/* Quote */}
            <div style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.15)', padding: '20px 22px', marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '14px' }}>{p.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: '#041635', fontFamily: 'var(--font-phudu)', flexShrink: 0 }}>
                  {p.author.split(' ').map(w => w[0]).join('')}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{p.author}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{p.role}</p>
                </div>
              </div>
            </div>

            {/* Stats or logos */}
            {p.stats ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {p.stats.map(s => (
                  <div key={s.val} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#D8F950', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.val}</p>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '4px', lineHeight: 1.4 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginRight: '4px' }}>Trusted at</span>
                {p.logos!.map(logo => (
                  <span key={logo} style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-phudu)', letterSpacing: '-0.01em' }}>{logo}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GetStartedPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<AccountType>('seeker');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' });

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid #ECEEF1', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#041635', outline: 'none',
    boxSizing: 'border-box', background: '#FAFAFA', transition: 'border-color 0.15s',
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '68px', height: '100vh', display: 'flex', overflow: 'hidden' }} className="gs-page">
        <style>{`
          .gs-page { }
          .gs-left { width: 45%; min-width: 360px; overflow-y: auto; }
          .gs-right-col { flex: 1; }
          @media (max-width: 780px) { .gs-right-col { display: none !important; } .gs-left { width: 100% !important; min-width: 0 !important; } }
          .gs-type-btn:hover { background: #F0F4FF !important; }
          input:focus { border-color: #0C63E3 !important; }
        `}</style>

        {/* ── LEFT PANEL ── */}
        <div className="gs-left" style={{ background: '#fff', borderRight: '1px solid #ECEEF1', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">

            {/* Step 1 */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 52px)' }}>

                <div style={{ marginBottom: '32px' }}>
                  <Link href="/">
                    <Image src="/reslink-logo.svg" alt="Reslink" width={130} height={32} style={{ height: '26px', width: 'auto', marginBottom: '36px', display: 'block' }} />
                  </Link>
                  <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '10px' }}>Create an account</h1>
                  <p style={{ fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>What best describes you?</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                  {ACCOUNT_TYPES.map(({ id, icon: Icon, label, desc }) => {
                    const active = selectedType === id;
                    return (
                      <button key={id} onClick={() => setSelectedType(id)} className="gs-type-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '14px', border: active ? '2px solid #0C63E3' : '2px solid #ECEEF1', background: active ? '#EEF4FF' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: active ? '#0C63E3' : '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}>
                          <Icon size={18} color={active ? '#fff' : '#9A9FA8'} strokeWidth={1.8} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: active ? '#0C63E3' : '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{label}</p>
                          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '3px', lineHeight: 1.3 }}>{desc}</p>
                        </div>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: active ? 'none' : '2px solid #ECEEF1', background: active ? '#0C63E3' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                          {active && <CheckCircle size={14} color="#fff" strokeWidth={2.5} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button onClick={() => setStep(2)}
                  style={{ width: '100%', padding: '14px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.15s, transform 0.1s', marginBottom: '16px' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0C63E3'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  Continue <ArrowRight size={16} />
                </button>

                <p style={{ textAlign: 'center', fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>
                  Already have an account?{' '}
                  <Link href="/login" style={{ color: '#0C63E3', textDecoration: 'none', fontWeight: 700 }}>Log in</Link>
                </p>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.3 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 52px)' }}>

                <Link href="/">
                  <Image src="/reslink-logo.svg" alt="Reslink" width={130} height={32} style={{ height: '26px', width: 'auto', marginBottom: '36px', display: 'block' }} />
                </Link>

                {/* Account type pill */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EEF4FF', borderRadius: '100px', padding: '5px 12px', marginBottom: '16px', width: 'fit-content' }}>
                  {(() => { const t = ACCOUNT_TYPES.find(t => t.id === selectedType)!; const Icon = t.icon; return <><Icon size={12} color="#0C63E3" /><span style={{ fontSize: '12px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>{t.label}</span></>; })()}
                </div>

                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', marginBottom: '6px' }}>Your details</h2>
                <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '24px' }}>You're almost in. Fill in the details below.</p>

                {/* Google SSO */}
                <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #ECEEF1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer', marginBottom: '18px', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
                  <span style={{ fontSize: '12px', color: '#C4C8D0', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>or continue with email</span>
                  <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
                </div>

                <form onSubmit={e => { e.preventDefault(); setStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#5C6070', marginBottom: '6px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full name</label>
                      <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#5C6070', marginBottom: '6px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                      <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#5C6070', marginBottom: '6px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reslink username</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#BEC3CC', fontFamily: 'var(--font-body)', pointerEvents: 'none' }}>reslink.io/</span>
                      <input type="text" placeholder="yourname" value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))} required style={{ ...inputStyle, paddingLeft: '92px' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#5C6070', marginBottom: '6px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required minLength={8} style={{ ...inputStyle, paddingRight: '44px' }} />
                      <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        {showPw ? <EyeOff size={16} color="#9A9FA8" /> : <Eye size={16} color="#9A9FA8" />}
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    <button type="button" onClick={() => setStep(1)}
                      style={{ flex: 1, padding: '12px', background: '#F7F8FA', color: '#5C6070', border: '1.5px solid #ECEEF1', borderRadius: '10px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                      Back
                    </button>
                    <button type="submit"
                      style={{ flex: 2, padding: '12px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#0A52C4')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#0C63E3')}>
                      Create my Reslink <ArrowRight size={14} />
                    </button>
                  </div>
                </form>

                <p style={{ marginTop: '16px', fontSize: '11px', color: '#C4C8D0', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
                  By signing up you agree to our{' '}
                  <Link href="#" style={{ color: '#9A9FA8', textDecoration: 'none' }}>Terms</Link> &{' '}
                  <Link href="#" style={{ color: '#9A9FA8', textDecoration: 'none' }}>Privacy Policy</Link>.
                </p>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 52px)' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <CheckCircle size={36} color="#041635" strokeWidth={2.5} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', marginBottom: '12px' }}>You're in.</h2>
                <p style={{ fontSize: '15px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '320px' }}>
                  Welcome, {form.name.split(' ')[0] || 'there'}. Time to build something that gets you noticed.
                </p>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#0C63E3', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Start building <ArrowRight size={14} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="gs-right-col">
          <RightSide type={selectedType} />
        </div>
      </div>
    </>
  );
}
