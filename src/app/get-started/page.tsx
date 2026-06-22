'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';

const PLANS = [
  { id: 'free', name: 'Free', price: '$0', period: '/mo', features: ['1 video resume', 'Basic analytics', 'Reslink profile link', 'Mobile recording'], color: '#5C6070' },
  { id: 'pro', name: 'Pro', price: '$14', period: '/mo', features: ['Unlimited video resumes', 'Full analytics + view tracking', 'Custom branding', 'Teleprompter', 'Priority support'], color: '#0C63E3', highlight: true },
  { id: 'premium', name: 'Premium', price: '$29', period: '/mo', features: ['Everything in Pro', 'AI script suggestions', 'Advanced A/B testing', 'Team collaboration', 'Dedicated onboarding'], color: '#7C3AED' },
];

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FA', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>

      {/* Logo */}
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 40px' }}>
        <Link href="/">
          <Image src="/reslink-og.svg" alt="Reslink" width={140} height={36} style={{ height: '28px', width: 'auto' }} />
        </Link>
        <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>
          Already have an account? <Link href="/login" style={{ color: '#0C63E3', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: s <= step ? '#0C63E3' : '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
              {s < step ? <CheckCircle size={16} color="#fff" fill="#fff" /> : <span style={{ fontSize: '12px', fontWeight: 700, color: s <= step ? '#fff' : '#9A9FA8', fontFamily: 'var(--font-body)' }}>{s}</span>}
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: s <= step ? '#041635' : '#9A9FA8', fontFamily: 'var(--font-body)' }}>{['Choose plan', 'Create account', 'All set!'][s - 1]}</span>
            {s < 3 && <div style={{ width: '40px', height: '2px', background: s < step ? '#0C63E3' : '#ECEEF1', borderRadius: '1px', transition: 'background 0.2s' }} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* Step 1 — Choose plan */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            style={{ width: '100%', maxWidth: '900px' }}>
            <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', textAlign: 'center', marginBottom: '8px' }}>Pick your plan.</h1>
            <p style={{ fontSize: '15px', color: '#9A9FA8', fontFamily: 'var(--font-body)', textAlign: 'center', marginBottom: '36px' }}>You can upgrade or downgrade at any time.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }} className="gs-plan-grid">
              <style>{`
                .gs-plan-grid { }
                @media (max-width: 680px) { .gs-plan-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {PLANS.map(plan => (
                <div key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                  style={{ background: '#fff', borderRadius: '16px', border: `2px solid ${selectedPlan === plan.id ? plan.color : '#ECEEF1'}`, padding: '28px', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s', boxShadow: selectedPlan === plan.id ? `0 0 0 4px ${plan.color}18` : 'none', position: 'relative' }}>
                  {plan.highlight && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#0C63E3', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 12px', borderRadius: '100px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Most popular</div>}
                  <p style={{ fontSize: '14px', fontWeight: 700, color: plan.color, fontFamily: 'var(--font-body)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{plan.name}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '36px', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em' }}>{plan.price}</span>
                    <span style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{plan.period}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <CheckCircle size={14} color={plan.color} style={{ flexShrink: 0, marginTop: '1px' }} />
                        <span style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setStep(2)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0A52C4')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0C63E3')}>
                Continue with {PLANS.find(p => p.id === selectedPlan)?.name} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Create account */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            style={{ width: '100%', maxWidth: '440px' }}>
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(28px, 4vw, 44px)', boxShadow: '0 4px 24px rgba(4,22,53,0.07)' }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '20px' }}>Create your account</h2>

              {/* Google */}
              <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #ECEEF1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer', marginBottom: '18px', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
                <span style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>or with email</span>
                <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
              </div>

              <form onSubmit={e => { e.preventDefault(); setStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Full name', key: 'name', type: 'text', placeholder: 'Jane Smith' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'jane@example.com' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} required
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #ECEEF1', fontSize: '14px', fontFamily: 'var(--font-body)', color: '#041635', outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '6px', fontFamily: 'var(--font-body)' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required minLength={8}
                      style={{ width: '100%', padding: '11px 44px 11px 14px', borderRadius: '10px', border: '1.5px solid #ECEEF1', fontSize: '14px', fontFamily: 'var(--font-body)', color: '#041635', outline: 'none', boxSizing: 'border-box', background: '#FAFAFA' }} />
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
                    Create account <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            </div>
            <p style={{ marginTop: '16px', fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
              By signing up, you agree to our <Link href="#" style={{ color: '#5C6070', textDecoration: 'none' }}>Terms</Link> and <Link href="#" style={{ color: '#5C6070', textDecoration: 'none' }}>Privacy Policy</Link>.
            </p>
          </motion.div>
        )}

        {/* Step 3 — Done */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            style={{ textAlign: 'center', maxWidth: '480px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={40} color="#059669" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', marginBottom: '14px' }}>You're all set.</h2>
            <p style={{ fontSize: '16px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.65, marginBottom: '36px' }}>
              Your account is ready. Time to build a Reslink that gets you noticed.
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
