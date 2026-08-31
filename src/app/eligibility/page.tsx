'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, GraduationCap, Shield, Mail, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { checkEligibility, type Kind } from '@/lib/eligibility';

type Status = 'idle' | 'checking' | 'eligible' | 'no' | 'manual' | 'error';

export default function EligibilityPage() {
  const [kind, setKind] = useState<Kind>('student');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const reset = () => { setStatus('idle'); setErrorMsg(''); };

  const check = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const verdict = checkEligibility(email, kind);
    if (verdict === 'invalid') {
      setErrorMsg('Enter a valid email address.');
      setStatus('error');
      return;
    }
    setErrorMsg('');
    setStatus('checking');
    // Brief simulated lookup so the check feels real.
    window.setTimeout(() => setStatus(verdict), 900);
  };

  const accent = '#D63D9D';
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 15px 13px 44px', borderRadius: '11px',
    border: `1.5px solid ${status === 'error' ? '#E24B4A' : '#ECEEF1'}`, fontSize: '15px',
    fontFamily: 'var(--font-body)', color: '#061A3A', outline: 'none', boxSizing: 'border-box', background: '#FAFAFA',
  };

  return (
    <>
      <Navbar />
      <style>{`
        .elig-input:focus { border-color: ${accent} !important; background: #fff !important; }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#F6F7F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '112px 24px 64px', boxSizing: 'border-box' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ width: '100%', maxWidth: '520px', background: '#fff', borderRadius: '22px', boxShadow: '0 12px 54px rgba(6,26,58,0.13)', overflow: 'hidden' }}>

          {/* Header band */}
          <div style={{ background: '#FBEAF5', padding: 'clamp(28px, 4vw, 38px) clamp(28px, 4vw, 40px) clamp(24px, 3.5vw, 30px)', textAlign: 'center', borderBottom: '1px solid #F3D9E6' }}>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 7vw, 58px)', fontWeight: 900, color: '#9E2462', letterSpacing: '-0.03em', lineHeight: 1 }}>50%</span>
              <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#9E2462', letterSpacing: '-0.02em' }}>OFF</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(24px, 3.4vw, 30px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em', margin: 0 }}>Check your discount</h1>
            <p style={{ fontSize: '14.5px', color: '#8A6577', fontFamily: 'var(--font-body)', margin: '8px auto 0', maxWidth: '380px', lineHeight: 1.55 }}>
              Students and veterans get half off Premium. Enter your email and we&apos;ll tell you right away.
            </p>
          </div>

          {/* Body */}
          <div style={{ padding: 'clamp(24px, 4vw, 34px) clamp(28px, 4vw, 40px) clamp(28px, 4vw, 38px)' }}>

            {/* Kind toggle */}
            <div style={{ display: 'inline-flex', width: '100%', background: '#F0F2F5', borderRadius: '12px', padding: '4px', gap: '4px', marginBottom: '22px', boxSizing: 'border-box' }}>
              {([
                { k: 'student' as Kind, label: 'Student', Icon: GraduationCap },
                { k: 'veteran' as Kind, label: 'Veteran', Icon: Shield },
              ]).map(({ k, label, Icon }) => (
                <button key={k} onClick={() => { setKind(k); reset(); }}
                  style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', padding: '10px', borderRadius: '9px', border: 'none', cursor: 'pointer', background: 'none', zIndex: 1 }}>
                  {kind === k && <motion.span layoutId="elig-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} style={{ position: 'absolute', inset: 0, background: '#fff', borderRadius: '9px', boxShadow: '0 2px 8px rgba(6,26,58,0.1)', zIndex: -1 }} />}
                  <Icon size={16} color={kind === k ? accent : '#8A93A3'} />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: kind === k ? '#061A3A' : '#8A93A3', fontFamily: 'var(--font-body)' }}>{label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={check}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '7px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {kind === 'student' ? 'Your student email' : 'Your email'}
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} color="#B4BAC4" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                <input className="elig-input" type="email" value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status === 'error' || status === 'no' || status === 'eligible' || status === 'manual') reset(); }}
                  placeholder={kind === 'student' ? 'you@university.ac.uk' : 'you@example.com'} style={inputStyle} />
              </div>

              <button type="submit" disabled={status === 'checking'}
                style={{ width: '100%', marginTop: '14px', padding: '14px', background: accent, color: '#fff', border: 'none', borderRadius: '11px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: status === 'checking' ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: status === 'checking' ? 0.75 : 1, transition: 'background 0.15s, opacity 0.15s' }}
                onMouseEnter={(e) => { if (status !== 'checking') (e.currentTarget as HTMLElement).style.background = '#BE2E86'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = accent; }}>
                {status === 'checking'
                  ? <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }} style={{ display: 'inline-flex' }}><Loader2 size={16} /></motion.span> Checking…</>
                  : <>Check eligibility <ArrowRight size={16} /></>}
              </button>
            </form>

            {status === 'error' && (
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#E24B4A', fontFamily: 'var(--font-body)', margin: '12px 0 0' }}>
                <AlertCircle size={14} /> {errorMsg}
              </p>
            )}

            {/* ── Results ── */}
            <AnimatePresence mode="wait">
              {status === 'eligible' && (
                <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                  style={{ marginTop: '20px', background: '#EAF3DE', border: '1px solid #CFE6AE', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#639922', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><CheckCircle size={17} color="#fff" /></span>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: '#2C4D08', fontFamily: 'var(--font-body)', margin: 0 }}>You&apos;re eligible for 50% off.</p>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#4A6321', fontFamily: 'var(--font-body)', lineHeight: 1.55, margin: '0 0 14px' }}>
                    <strong>{email.trim()}</strong> checks out as {kind === 'student' ? 'a student' : 'a service'} email. Your discount is applied automatically when you sign up — no code needed.
                  </p>
                  <Link href={`/get-started?type=${kind === 'student' ? 'student' : 'veteran'}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#061A3A', color: '#fff', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', textDecoration: 'none', padding: '11px 18px', borderRadius: '10px' }}>
                    Continue to sign up <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}

              {status === 'no' && (
                <motion.div key="no" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                  style={{ marginTop: '20px', background: '#FFF6E9', border: '1px solid #F6D9A8', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#BA7517', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><AlertCircle size={17} color="#fff" /></span>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: '#6B430A', fontFamily: 'var(--font-body)', margin: 0 }}>That doesn&apos;t look like a student email.</p>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#8A5A18', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: '0 0 6px' }}>
                    We verify with your school-issued address — usually ending in <strong>.edu</strong>, <strong>.ac.uk</strong>, or your university&apos;s domain. Try that email instead.
                  </p>
                  <button onClick={() => { setKind('veteran'); reset(); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '13.5px', fontWeight: 700, color: '#9E2462', fontFamily: 'var(--font-body)' }}>
                    Not a student? Check as a veteran →
                  </button>
                </motion.div>
              )}

              {status === 'manual' && (
                <motion.div key="manual" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                  style={{ marginTop: '20px', background: '#EAF1FF', border: '1px solid #C9DDF8', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#1468E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Shield size={16} color="#fff" /></span>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: '#0C447C', fontFamily: 'var(--font-body)', margin: 0 }}>You&apos;re still eligible — one quick step.</p>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#1B5299', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: '0 0 14px' }}>
                    That isn&apos;t a military email, so we&apos;ll confirm your service record at signup instead. It takes a minute and the 50% discount still applies.
                  </p>
                  <Link href="/get-started?type=veteran"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#061A3A', color: '#fff', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', textDecoration: 'none', padding: '11px 18px', borderRadius: '10px' }}>
                    Continue and verify <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <p style={{ fontSize: '12px', color: '#B4BAC4', fontFamily: 'var(--font-body)', textAlign: 'center', margin: '22px 0 0', lineHeight: 1.6 }}>
              We only use your email to confirm eligibility. Nothing is shared, and there&apos;s no code to remember.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
