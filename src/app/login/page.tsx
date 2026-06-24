'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PROOF = [
  { stat: '10,000+', label: 'job seekers on Reslink' },
  { stat: '92%', label: 'report more recruiter responses' },
  { stat: '3x', label: 'more interview callbacks on average' },
];

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid #ECEEF1', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#041635', outline: 'none',
    boxSizing: 'border-box', background: '#FAFAFA',
  };

  return (
    <>
      <Navbar />
      <style>{`
        input:focus { border-color: #0C63E3 !important; }
        .login-wrap { display: grid; grid-template-columns: 420px 1fr; width: 100%; max-width: 1040px; min-height: 600px; background: #fff; border-radius: 20px; box-shadow: 0 8px 48px rgba(4,22,53,0.13); overflow: hidden; }
        .login-left { background: #041635; padding: clamp(32px, 4vw, 48px); display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
        .login-right { background: #fff; display: flex; align-items: flex-start; justify-content: center; padding: clamp(36px, 4vw, 48px) clamp(32px, 4vw, 52px); }
        @media (max-width: 900px) {
          .login-wrap { grid-template-columns: 1fr; }
          .login-left { display: none; }
        }
      `}</style>

      <div style={{ paddingTop: '68px', background: '#F7F8FA' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px 24px 24px', boxSizing: 'border-box' }}>
        <div className="login-wrap">

          {/* ── Left: brand panel ── */}
          <div className="login-left">
            {/* Glow blobs */}
            <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(12,99,227,0.35), transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(216,249,80,0.1), transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Link href="/" style={{ display: 'inline-block', marginBottom: '32px' }}>
                <Image src="/reslink-logo.svg" alt="Reslink" width={140} height={36} style={{ height: '26px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
              </Link>

              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 3vw, 46px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Your story<br />is waiting.
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '360px', marginBottom: '28px' }}>
                Thousands of job seekers are landing more interviews. Your Reslink is how they know who you are before the first call.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {PROOF.map(p => (
                  <div key={p.stat} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(216,249,80,0.12)', border: '1px solid rgba(216,249,80,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={14} color="#D8F950" />
                    </div>
                    <p style={{ fontSize: '14px', fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.75)' }}>
                      <span style={{ fontWeight: 700, color: '#fff' }}>{p.stat}</span> {p.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom quote */}
            <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: '28px' }}>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '12px' }}>
                "I got a recruiter message within 24 hours of sharing my Reslink. It actually works."
              </p>
              <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Marcus T. · Software Engineer</p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="login-right">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: '400px' }}>

              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: '32px', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', marginBottom: '6px' }}>Welcome back.</h1>
              <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '32px' }}>
                New here?{' '}
                <Link href="/get-started" style={{ color: '#0C63E3', textDecoration: 'none', fontWeight: 700 }}>Create an account</Link>
              </p>

              {/* Google SSO */}
              <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #ECEEF1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer', marginBottom: '20px', transition: 'background 0.15s, border-color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F7F8FA'; (e.currentTarget as HTMLElement).style.borderColor = '#D0D4DC'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#ECEEF1'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
                <span style={{ fontSize: '12px', color: '#C4C8D0', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>or with email</span>
                <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
              </div>

              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '6px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
                    <Link href="#" style={{ fontSize: '12px', color: '#0C63E3', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Forgot password?</Link>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required style={{ ...inputStyle, paddingRight: '44px' }} />
                    <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      {showPw ? <EyeOff size={16} color="#9A9FA8" /> : <Eye size={16} color="#9A9FA8" />}
                    </button>
                  </div>
                </div>
                <button type="submit"
                  style={{ width: '100%', padding: '14px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px', transition: 'background 0.15s, transform 0.1s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0C63E3'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  Sign in <ArrowRight size={15} />
                </button>
              </form>

              <p style={{ marginTop: '24px', fontSize: '11px', color: '#C4C8D0', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
                By signing in, you agree to our{' '}
                <Link href="#" style={{ color: '#9A9FA8', textDecoration: 'none' }}>Terms</Link> &{' '}
                <Link href="#" style={{ color: '#9A9FA8', textDecoration: 'none' }}>Privacy Policy</Link>.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
