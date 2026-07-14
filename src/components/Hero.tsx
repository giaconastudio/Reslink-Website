'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { Magnetic } from '@/components/TiltCard';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll parallax — product frame recedes slightly as you scroll past
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  // Cursor-following glow
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const sGlowX = useSpring(glowX, { stiffness: 45, damping: 20 });
  const sGlowY = useSpring(glowY, { stiffness: 45, damping: 20 });
  const onGlowMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    glowX.set((e.clientX - r.left - r.width / 2) * 0.22);
    glowY.set((e.clientY - r.top - 300) * 0.15);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handler = () => { v.currentTime = 7; };
    v.addEventListener('loadedmetadata', handler);
    return () => v.removeEventListener('loadedmetadata', handler);
  }, []);

  return (
    <section ref={sectionRef} onMouseMove={onGlowMove} style={{ background: '#fff', position: 'relative', overflow: 'hidden', paddingBottom: '72px' }}>
      <motion.div style={{ position: 'absolute', top: '-10%', left: '50%', marginLeft: '-450px', width: '900px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(12,99,227,0.08), transparent 65%)', pointerEvents: 'none', zIndex: 0, x: sGlowX, y: sGlowY }} />

      <style>{`
        .hero-inner { max-width: 1120px; margin: 0 auto; padding: 130px 24px 0; text-align: center; position: relative; z-index: 1; }
        .hero-h1 {
          font-family: var(--font-phudu);
          font-size: clamp(42px, 8vw, 92px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: #041635;
          margin-bottom: 24px;
        }
        @media (max-width: 520px) {
          .hero-h1 { font-size: clamp(48px, 13vw, 60px); line-height: 0.96; letter-spacing: -0.02em; }
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
        .hero-proof { font-size: 13px; color: #9A9FA8; font-family: var(--font-body); margin-bottom: 56px; }
        .hero-proof strong { color: #5C6070; font-weight: 600; }

        .hero-stage { max-width: 920px; margin: 0 auto; position: relative; z-index: 1; }
        .hero-frame {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #E6E8EC;
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
          .hero-inner { padding: 100px 20px 0; }
          .hero-float { display: none; }
          .hero-proof { margin-bottom: 40px; }
          .hero-ctas { gap: 10px; }
          .hero-ctas > div { width: 100%; }
          .hero-ctas a { width: 100%; justify-content: center; box-sizing: border-box; }
          .hero-stage { padding: 0 16px; }
          .hero-pill-avatar { width: 22px !important; height: 22px !important; }
          .hero-pill { font-size: 11px !important; padding: 5px 12px 5px 6px !important; gap: 7px !important; }
        }
        @media (max-width: 400px) {
          .hero-inner { padding: 90px 16px 0; }
        }
      `}</style>

      <div className="hero-inner">
        {/* Social proof pill — real faces, no stat repetition */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <span className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#5C6070', fontSize: '13px', fontWeight: 500, padding: '7px 16px 7px 8px', borderRadius: '100px', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E7EC', boxShadow: '0 2px 8px rgba(4,22,53,0.06)' }}>
            <span style={{ display: 'flex' }}>
              {['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg', '/avatars/a4.jpg', '/avatars/a5.jpg'].map((src, i) => (
                <img key={i} src={src} alt="" width={28} height={28} className="hero-pill-avatar"
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #fff', marginLeft: i === 0 ? 0 : '-8px', objectFit: 'cover', display: 'block' }} />
              ))}
            </span>
            <span style={{ color: '#5C6070' }}><strong style={{ color: '#041635', fontWeight: 700 }}>10,000+</strong> job seekers worldwide</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          Your resume,<br />
          but{' '}
          <span style={{ display: 'inline-block', position: 'relative' }}>
            better
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-16px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          Stand out and land more interviews with a personalized video resume that builds instant connections with recruiters.
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}>
          <Magnetic>
            <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Create your Reslink
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link href="#how-it-works" className="btn-outline" style={{ fontSize: '15px', padding: '14px 26px' }}>
              See how it works
            </Link>
          </Magnetic>
        </motion.div>

        <motion.p className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.25 }}>
          Free to start · Takes less than 5 minutes
        </motion.p>
      </div>

      {/* Living product stage — perspective tilt entrance + scroll parallax */}
      <motion.div style={{ scale: stageScale, y: stageY }}>
      <motion.div
        className="hero-stage"
        initial={{ opacity: 0, y: 60, rotateX: 6, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: '1200px', transformOrigin: 'center bottom' }}
      >
        <Link href="/oliviastone" aria-label="Open the example Reslink profile" style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }} className="hero-frame-link">
          <style>{`
            .hero-frame-link .hero-open-hint { opacity: 0; transition: opacity 0.25s ease; }
            .hero-frame-link:hover .hero-open-hint { opacity: 1; }
          `}</style>
          <div className="hero-frame" style={{ position: 'relative' }}>
            <div className="hero-bar">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
              <div style={{ flex: 1, margin: '0 12px', background: '#EAECEF', borderRadius: '6px', padding: '4px 14px', fontSize: '11px', color: '#9A9FA8', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                reslink.io/oliviastone
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                Open example
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </div>

            <div className="hero-video">
              <video
                ref={videoRef}
                src="/videos/hero.mp4"
                poster="/videos/hero-poster.jpg"
                autoPlay muted loop playsInline preload="auto"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.06)' }}
              />
              <div className="hero-open-hint" style={{ position: 'absolute', inset: 0, background: 'rgba(4,22,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#041635', borderRadius: '100px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}>
                  Explore this example profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Floating feature card — view analytics */}
        <motion.div
          className="hero-float float-tr"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.85, duration: 0.4 }}
        >
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }} style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: '190px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>See who viewed you</p>
              <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Live in your dashboard</p>
            </div>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3', flexShrink: 0 }} />
          </motion.div>
        </motion.div>

        {/* Floating feature card — watch-time tracking */}
        <motion.div className="hero-float float-bl" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0, duration: 0.4 }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Every second tracked</p>
              <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Know exactly what they watched</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      </motion.div>
    </section>
  );
}
