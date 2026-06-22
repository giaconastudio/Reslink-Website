'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ background: '#041635', paddingTop: '80px', paddingBottom: '0', overflow: 'hidden' }}>
      <style>{`
        .hero-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 80px 24px 0;
          text-align: center;
        }
        .hero-h1 {
          font-family: var(--font-phudu);
          font-size: clamp(52px, 9vw, 110px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 28px;
        }
        .hero-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          max-width: 520px;
          margin: 0 auto 40px;
          font-family: var(--font-body);
        }
        .hero-ctas {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .hero-proof {
          font-size: 13px;
          color: rgba(255,255,255,0.2);
          font-family: var(--font-body);
          margin-bottom: 64px;
        }
        .hero-proof span { color: rgba(255,255,255,0.35); }
        .hero-frame-wrap {
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-frame {
          border-radius: 16px 16px 0 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          border-bottom: none;
          box-shadow: 0 -8px 80px rgba(12,99,227,0.15), 0 0 0 1px rgba(255,255,255,0.06);
        }
        .hero-bar {
          background: rgba(255,255,255,0.06);
          padding: 10px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-placeholder {
          background: #060D24;
          aspect-ratio: 16/9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          position: relative;
        }
        .hero-play-btn {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #D8F950;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        .hero-play-btn:hover { transform: scale(1.08); background: #C5DE3A; }
        .hero-placeholder-label {
          font-size: 12px;
          color: rgba(255,255,255,0.15);
          font-family: var(--font-body);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        @media (max-width: 640px) {
          .hero-inner { padding: 60px 20px 0; }
        }
      `}</style>

      <motion.div className="hero-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(216,249,80,0.12)', color: '#D8F950', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(216,249,80,0.2)', fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950', display: 'inline-block' }} />
            Free for job seekers · No credit card
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          You&apos;re more<br />
          <span style={{ color: '#D8F950' }}>impressive</span><br />
          in person.
        </motion.h1>

        {/* Subhead */}
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          Recruiters spend 7 seconds on a resume. A Reslink video resume puts your face, voice, and energy front and center — so you become the candidate they actually remember.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}>
          <Link href="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '14px 26px' }}>
            Create your free Reslink
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link href="#how-it-works" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', padding: '14px 20px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
            See how it works
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.25 }}>
          Joined by <span>10,000+ job seekers</span> · Free forever
        </motion.p>

        {/* Hero animation placeholder */}
        <motion.div className="hero-frame-wrap" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}>
          <div className="hero-frame">
            {/* Browser bar */}
            <div className="hero-bar">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />
              <div style={{ flex: 1, margin: '0 12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '4px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                reslink.io/yourname
              </div>
            </div>
            {/* ↓ HERO LOOP ANIMATION — replace this div with your video/GIF */}
            <div className="hero-placeholder">
              <div className="hero-play-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#041635" style={{ marginLeft: '3px' }}><path d="M8 5v14l11-7z"/></svg>
              </div>
              <p className="hero-placeholder-label">Hero animation · coming soon</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
