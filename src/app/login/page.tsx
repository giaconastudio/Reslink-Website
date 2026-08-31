'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid #ECEEF1', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#061A3A', outline: 'none',
    boxSizing: 'border-box', background: '#FAFAFA',
  };

  return (
    <>
      <Navbar />
      <style>{`
        input:focus { border-color: #1468E8 !important; }
        .login-wrap { width: 100%; max-width: 460px; background: #fff; border-radius: 20px; box-shadow: 0 8px 48px rgba(6,26,58,0.13); overflow: hidden; }
        .login-right { background: #fff; display: flex; justify-content: center; padding: clamp(36px, 6vw, 52px) clamp(28px, 6vw, 48px); }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#F6F7F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '108px 24px 48px', boxSizing: 'border-box' }}>
        <div className="login-wrap">

          {/* ── Sign-in form (centred, no side panel) ── */}
          <div className="login-right">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: '100%', maxWidth: '400px' }}>

              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: '32px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', marginBottom: '6px', textAlign: 'center' }}>Welcome back.</h1>
              <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '32px', textAlign: 'center' }}>
                New here?{' '}
                <Link href="/get-started" style={{ color: '#1468E8', textDecoration: 'none', fontWeight: 700 }}>Create an account</Link>
              </p>

              {/* Google SSO */}
              <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #ECEEF1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)', cursor: 'pointer', marginBottom: '20px', transition: 'background 0.15s, border-color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F6F7F9'; (e.currentTarget as HTMLElement).style.borderColor = '#D0D4DC'; }}
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
                    <Link href="#" style={{ fontSize: '12px', color: '#1468E8', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Forgot password?</Link>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required style={{ ...inputStyle, paddingRight: '44px' }} />
                    <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      {showPw ? <EyeOff size={16} color="#9A9FA8" /> : <Eye size={16} color="#9A9FA8" />}
                    </button>
                  </div>
                </div>
                <button type="submit"
                  style={{ width: '100%', padding: '14px', background: '#1468E8', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px', transition: 'background 0.15s, transform 0.1s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1468E8'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
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
      <Footer />
    </>
  );
}
