'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Eye, EyeOff, Briefcase, Building2, Users, GraduationCap } from 'lucide-react';

type AccountType = 'seeker' | 'company' | 'agency' | 'university';

const ACCOUNT_TYPES = [
  { id: 'seeker' as AccountType, icon: Briefcase, label: 'Job Seeker', desc: 'Show your personality and land more interviews' },
  { id: 'company' as AccountType, icon: Building2, label: 'Company', desc: 'Hire faster with authentic, engaging video applications' },
  { id: 'agency' as AccountType, icon: Users, label: 'Recruitment Agency', desc: 'Present your candidates in a more human, memorable way' },
  { id: 'university' as AccountType, icon: GraduationCap, label: 'University', desc: 'Empower your students to launch their careers' },
];

const RIGHT_PANEL: Record<AccountType, {
  bg: string; textColor: string; statColor: string;
  quote: string; author: string; role: string;
  tagline: string;
  stats?: { val: string; label: string }[];
  logos?: string[];
}> = {
  seeker: {
    bg: '#F7F8FA', textColor: '#041635', statColor: '#0C63E3',
    quote: '"Using Reslink gave me the confidence to present myself in a way that words alone couldn\'t. My video pitch landed me interviews at top companies, and within weeks, I had a job offer."',
    author: 'Ben Harper', role: 'Software Engineer · Amazon',
    tagline: 'Over 300+ candidates have landed interviews globally through Reslink',
    logos: ['Amazon', 'Meta', 'EY', 'Revolut', 'Stripe', 'HubSpot', 'Adobe', 'Tesla'],
  },
  company: {
    bg: '#041635', textColor: '#fff', statColor: '#D8F950',
    quote: '"The insights from video pitches helped us select candidates who truly fit our company culture. Reslink is a game changer."',
    author: 'Sarah Lopez', role: 'Talent Acquisition Lead',
    tagline: 'Join leading companies transforming their hiring process with Reslink',
    stats: [{ val: '5X', label: 'more cost-effective for hiring the right candidates' }, { val: '30%', label: 'faster time-to-hire with Reslink video resumes' }, { val: '91%', label: 'of hiring managers say Reslink videos improve fit' }],
  },
  agency: {
    bg: '#0C63E3', textColor: '#fff', statColor: '#D8F950',
    quote: '"Reslink gave our clients a clearer sense of candidate fit. We reduced screening calls and improved placement speed."',
    author: 'Maya Thompson', role: 'Principal Recruiter',
    tagline: 'Join leading agencies transforming their recruiting process with Reslink',
    stats: [{ val: '4X', label: 'faster candidate placements' }, { val: '60%', label: 'less time spent on screening calls' }, { val: '92%', label: 'recruiter satisfaction with Reslink' }],
  },
  university: {
    bg: '#F7F8FA', textColor: '#041635', statColor: '#0C63E3',
    quote: '"Our students who used Reslink saw a 3× higher callback rate. It\'s become a core part of our career center playbook."',
    author: 'Dr. James Okafor', role: 'Director of Career Services',
    tagline: 'Students at leading universities are already using Reslink to showcase their story',
    logos: ['Columbia', 'Syracuse', 'GWU', 'Princeton', 'Michigan', 'Cambridge'],
  },
};

function RightPanel({ type }: { type: AccountType }) {
  const p = RIGHT_PANEL[type];
  const dark = p.bg === '#041635' || p.bg === '#0C63E3';
  return (
    <motion.div key={type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
      style={{ background: p.bg, borderRadius: '0 20px 20px 0', padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100%' }}>

      {/* Quote block */}
      <div>
        <div style={{ background: dark ? 'rgba(255,255,255,0.08)' : '#fff', borderRadius: '14px', padding: '24px', marginBottom: '24px', border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ECEEF1' }}>
          <p style={{ fontSize: '16px', fontWeight: 600, color: p.textColor, lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '20px', opacity: dark ? 1 : 0.85 }}>{p.quote}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #ECEEF1', paddingTop: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: dark ? 'rgba(255,255,255,0.15)' : '#E5EEFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px', fontWeight: 700, color: dark ? '#fff' : '#0C63E3', fontFamily: 'var(--font-phudu)' }}>
              {p.author.split(' ').map(w => w[0]).join('')}
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 700, color: p.textColor, fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{p.author}</p>
              <p style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.5)' : '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{p.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div>
        <p style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,0.55)' : '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '18px' }}>{p.tagline}</p>
        {p.stats ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {p.stats.map(s => (
              <div key={s.val}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '28px', fontWeight: 900, color: p.statColor, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.val}</p>
                <p style={{ fontSize: '11px', color: dark ? 'rgba(255,255,255,0.5)' : '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '4px', lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }}>
            {p.logos!.map(logo => (
              <span key={logo} style={{ fontSize: '13px', fontWeight: 700, color: dark ? 'rgba(255,255,255,0.35)' : '#BEC3CC', fontFamily: 'var(--font-phudu)', letterSpacing: '-0.01em' }}>{logo}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function GetStartedPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<AccountType>('seeker');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' });

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1.5px solid #ECEEF1', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#041635', outline: 'none',
    boxSizing: 'border-box', background: '#FAFAFA',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F0F2F5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      {/* Top bar */}
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <Link href="/">
          <Image src="/reslink-og.svg" alt="Reslink" width={140} height={36} style={{ height: '28px', width: 'auto' }} />
        </Link>
        <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>
          Already have an account? <Link href="/login" style={{ color: '#0C63E3', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>

      <AnimatePresence mode="wait">

        {/* ── Step 1: Account type selector ── */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
            style={{ width: '100%', maxWidth: '900px', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 32px rgba(4,22,53,0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', minHeight: '540px' }}
            className="gs-grid">
            <style>{`
              .gs-grid { }
              @media (max-width: 700px) { .gs-grid { grid-template-columns: 1fr !important; } .gs-right { display: none !important; } }
            `}</style>

            {/* Left: selector */}
            <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '8px' }}>Create an account</h1>
                <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px' }}>Making hiring more human and memorable through video, for job seekers, companies, recruiters, and universities</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {ACCOUNT_TYPES.map(({ id, icon: Icon, label, desc }) => {
                    const active = selectedType === id;
                    return (
                      <button key={id} onClick={() => setSelectedType(id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '12px', border: active ? '1.5px solid #0C63E3' : '1.5px solid transparent', background: active ? '#EEF4FF' : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%' }}
                        onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#F7F8FA'; }}
                        onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: active ? '#0C63E3' : '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}>
                          <Icon size={16} color={active ? '#fff' : '#9A9FA8'} strokeWidth={1.8} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: active ? '#0C63E3' : '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{label}</p>
                          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px', lineHeight: 1.3 }}>{desc}</p>
                        </div>
                        {active && <ArrowRight size={16} color="#0C63E3" style={{ flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <button onClick={() => setStep(2)}
                  style={{ width: '100%', padding: '13px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0A52C4')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0C63E3')}>
                  Create account <ArrowRight size={16} />
                </button>
                <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>
                  Already have an account? <Link href="/login" style={{ color: '#0C63E3', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
                </p>
              </div>
            </div>

            {/* Right: dynamic panel */}
            <div className="gs-right">
              <RightPanel type={selectedType} />
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Account details ── */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
            style={{ width: '100%', maxWidth: '520px' }}>
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(28px, 4vw, 44px)', boxShadow: '0 4px 24px rgba(4,22,53,0.08)' }}>

              {/* Account type badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EEF4FF', borderRadius: '100px', padding: '4px 12px', marginBottom: '20px' }}>
                {(() => { const t = ACCOUNT_TYPES.find(t => t.id === selectedType)!; const Icon = t.icon; return <><Icon size={12} color="#0C63E3" /><span style={{ fontSize: '12px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>{t.label}</span></>; })()}
              </div>

              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '6px' }}>Your details</h2>
              <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '24px' }}>Fill in your info to create your Reslink account.</p>

              {/* Google SSO */}
              <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #ECEEF1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer', marginBottom: '20px', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
                <span style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>or fill in your details</span>
                <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
              </div>

              <form onSubmit={e => { e.preventDefault(); setStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>Full name</label>
                    <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>Email</label>
                    <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>Reslink username</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)', pointerEvents: 'none' }}>reslink.io/</span>
                    <input type="text" placeholder="yourname" value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))} required style={{ ...inputStyle, paddingLeft: '92px' }} />
                  </div>
                  <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '5px' }}>Letters, numbers, and hyphens only.</p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required minLength={8} style={{ ...inputStyle, paddingRight: '44px' }} />
                    <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      {showPw ? <EyeOff size={16} color="#9A9FA8" /> : <Eye size={16} color="#9A9FA8" />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
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
            </div>
            <p style={{ marginTop: '14px', fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
              By signing up you agree to our <Link href="#" style={{ color: '#5C6070', textDecoration: 'none' }}>Terms</Link> and <Link href="#" style={{ color: '#5C6070', textDecoration: 'none' }}>Privacy Policy</Link>.
            </p>
          </motion.div>
        )}

        {/* ── Step 3: All set ── */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={40} color="#059669" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', marginBottom: '14px' }}>You're all set.</h2>
            <p style={{ fontSize: '16px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.65, marginBottom: '36px' }}>
              Welcome to Reslink, {form.name.split(' ')[0] || 'there'}. Time to build something that gets you noticed.
            </p>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', background: '#0C63E3', color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
              Start building your Reslink <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
