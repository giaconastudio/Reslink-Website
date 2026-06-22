'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handler = () => { v.currentTime = 7; };
    v.addEventListener('loadedmetadata', handler);
    return () => v.removeEventListener('loadedmetadata', handler);
  }, []);

  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Soft brand glow behind the product */}
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(12,99,227,0.08), transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <style>{`
        .hero-inner { max-width: 1120px; margin: 0 auto; padding: 130px 24px 0; text-align: center; position: relative; z-index: 1; }
        .hero-h1 {
          font-family: var(--font-phudu);
          font-size: clamp(46px, 8vw, 92px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: #041635;
          margin-bottom: 24px;
        }
        .hero-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: #5C6070;
          line-height: 1.6;
          max-width: 540px;
          margin: 0 auto 36px;
          font-family: var(--font-body);
        }
        .hero-ctas { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 18px; }
        .hero-proof { font-size: 13px; color: #9A9FA8; font-family: var(--font-body); margin-bottom: 72px; }
        .hero-proof strong { color: #5C6070; font-weight: 600; }

        .hero-stage { max-width: 920px; margin: 0 auto; position: relative; z-index: 1; }
        .hero-frame {
          border-radius: 18px 18px 0 0;
          overflow: hidden;
          border: 1px solid #E6E8EC;
          border-bottom: none;
          background: #fff;
          box-shadow: 0 40px 120px rgba(4,22,53,0.18), 0 8px 28px rgba(4,22,53,0.08);
        }
        .hero-bar { background: #F7F8FA; padding: 11px 16px; border-bottom: 1px solid #EEEEF0; display: flex; align-items: center; gap: 6px; }
        .hero-video {
          position: relative;
          overflow: hidden;
          background: #060D24;
          aspect-ratio: 16/9;
          width: 100%;
        }
        .hero-float {
          position: absolute; background: #fff; border-radius: 14px;
          box-shadow: 0 16px 40px rgba(4,22,53,0.14); border: 1px solid #EEEEF0;
          padding: 12px 14px; z-index: 3;
        }
        .float-tr { top: 64px; right: -28px; }
        .float-bl { bottom: 70px; left: -34px; }

        @media (max-width: 760px) {
          .hero-inner { padding: 104px 20px 0; }
          .hero-float { display: none; }
        }
      `}</style>

      <div className="hero-inner">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '26px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EBF0FF', color: '#0C63E3', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '100px', fontFamily: 'var(--font-body)', letterSpacing: '0.01em' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0C63E3', display: 'inline-block' }} />
            Free for job seekers · No credit card
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          You&apos;re more <span style={{ color: '#0C63E3' }}>impressive</span><br />in person.
        </motion.h1>

        {/* Subhead */}
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          Reslink helps you stand out and land more interviews by creating personalized video resumes that build honest connections with recruiters.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}>
          <Link href="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '14px 26px' }}>
            Create your free Reslink
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link href="#how-it-works" className="btn-outline" style={{ fontSize: '15px', padding: '14px 26px' }}>
            See how it works
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.25 }}>
          Over <strong>10,000 candidates</strong> have landed interviews globally through Reslink
        </motion.p>
      </div>

      {/* Living product stage */}
      <motion.div className="hero-stage" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}>
        <div className="hero-frame">
          {/* Browser bar */}
          <div className="hero-bar">
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
            <div style={{ flex: 1, margin: '0 12px', background: '#EAECEF', borderRadius: '6px', padding: '4px 14px', fontSize: '11px', color: '#9A9FA8', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
              reslink.io/oliverstone
            </div>
          </div>

          {/* Full-bleed hero loop */}
          <div className="hero-video">
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              poster="/videos/hero-poster.jpg"
              autoPlay muted loop playsInline preload="auto"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Floating live card — recruiter activity */}
        <motion.div className="hero-float float-tr" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.4 }}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-phudu)' }}>M</span>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Meta just viewed you</p>
              <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 1:12 · 2m ago</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating live card — interview booked */}
        <motion.div className="hero-float float-bl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.4 }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview booked</p>
              <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Amazon · 2 days later</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
