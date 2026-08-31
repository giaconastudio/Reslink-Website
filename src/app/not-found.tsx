import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Page not found · Reslink',
};

export default function NotFound() {
  return (
    <>
      <Navbar dark />
      <main style={{ background: '#061A3A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.22), transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '560px' }}>
          <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(90px, 18vw, 160px)', fontWeight: 900, color: '#D7FF43', lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '8px' }}>404</p>
          <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '18px' }}>
            This page didn&apos;t make the shortlist.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '36px' }}>
            The link you followed may be broken, or the page may have moved. Let&apos;s get you back on track.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Back to home
            </Link>
            <Link href="/help" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,0.15)', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
              Visit the help center
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
