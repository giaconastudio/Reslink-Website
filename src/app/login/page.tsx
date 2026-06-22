'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

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
      <div style={{ minHeight: 'calc(100vh - 68px)', paddingTop: '68px', background: '#EEF1F6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <style>{`
          .login-card { display: grid; grid-template-columns: 1fr 400px; width: 100%; max-width: 860px; min-height: 520px; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 48px rgba(4,22,53,0.14); }
          .login-left { background: #041635; position: relative; overflow: hidden; }
          .login-right { background: #fff; }
          @media (max-width: 780px) { .login-card { grid-template-columns: 1fr !important; } .login-left { display: none !important; } }
          input:focus { border-color: #0C63E3 !important; }
        `}</style>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="login-card">

          {/* ── Left: Brand panel ── */}
          <div className="login-left">
            {/* Background image */}
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.18 }}
            />
            {/* Glow */}
            <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.35), transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '44px 40px' }}>
              {/* Top */}
              <div>
                <span style={{ display: 'inline-block', background: '#D8F950', color: '#041635', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '100px', padding: '4px 12px', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
                  Welcome back
                </span>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.92, marginBottom: '16px' }}>
                  Good to<br />see you<br />again.
                </h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.65, maxWidth: '280px' }}>
                  Pick up right where you left off. Your Reslink is waiting.
                </p>
              </div>

              {/* Bottom: social proof */}
              <div>
                <div style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', padding: '18px 20px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '12px' }}>
                    "I logged back in six months later and my Reslink profile had been viewed 47 times. Still working for me."
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#041635', fontFamily: 'var(--font-phudu)', flexShrink: 0 }}>JM</div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Jordan Mitchell</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Product Designer</p>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[['300+', 'interviews landed'], ['10k+', 'active users'], ['48h', 'avg. first view']].map(([val, label]) => (
                    <div key={val} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', padding: '8px 12px', flex: 1, minWidth: '80px' }}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#D8F950', lineHeight: 1, letterSpacing: '-0.02em' }}>{val}</p>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="login-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 40px' }}>
            <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: '30px', fontWeight: 900, color: '#041635', letterSpacing: '-0.03em', marginBottom: '6px' }}>Sign in</h1>
            <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '28px' }}>
              New to Reslink?{' '}
              <Link href="/get-started" style={{ color: '#0C63E3', textDecoration: 'none', fontWeight: 700 }}>Create an account</Link>
            </p>

            {/* Google SSO */}
            <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #ECEEF1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer', marginBottom: '18px', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
              <span style={{ fontSize: '12px', color: '#C4C8D0', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>or with email</span>
              <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
            </div>

            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                style={{ width: '100%', padding: '13px', background: '#0C63E3', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px', transition: 'background 0.15s, transform 0.1s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0C63E3'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                Sign in <ArrowRight size={15} />
              </button>
            </form>

            <p style={{ marginTop: '20px', fontSize: '11px', color: '#C4C8D0', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
              By signing in, you agree to our{' '}
              <Link href="#" style={{ color: '#9A9FA8', textDecoration: 'none' }}>Terms</Link> &{' '}
              <Link href="#" style={{ color: '#9A9FA8', textDecoration: 'none' }}>Privacy Policy</Link>.
            </p>
          </div>

        </motion.div>
      </div>
    </>
  );
}
