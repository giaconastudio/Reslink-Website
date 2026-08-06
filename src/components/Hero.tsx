'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

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
        .hero-inner { max-width: 1120px; margin: 0 auto; padding: 96px 24px 0; text-align: center; position: relative; z-index: 1; }
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
        .hero-ctas { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
        .hero-proof-row {
          display: flex; align-items: center; justify-content: center; gap: 16px;
          flex-wrap: wrap; margin-bottom: 40px;
        }
        .hero-proof-sep { color: #C7CBD3; }
        .hero-proof-text { font-size: 13px; color: #9A9FA8; font-family: var(--font-body); }

        .hero-stage { max-width: 1160px; margin: 0 auto; position: relative; z-index: 1; }
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
          .hero-inner { padding: 78px 20px 0; }
          .hero-float { display: none; }
          .hero-proof-row { flex-direction: column; gap: 12px; margin-bottom: 32px; }
          .hero-proof-sep { display: none; }
          .hero-ctas { gap: 10px; }
          .hero-ctas > div { width: 100%; }
          .hero-ctas a { width: 100%; justify-content: center; box-sizing: border-box; }
          .hero-stage { padding: 0 16px; }
          .hero-pill-avatar { width: 22px !important; height: 22px !important; }
          .hero-pill { font-size: 11px !important; padding: 5px 12px 5px 6px !important; gap: 7px !important; }
        }
        @media (max-width: 400px) {
          .hero-inner { padding: 70px 16px 0; }
        }

        /* Above-the-fold entrance — plain CSS, not JS-driven.
           Framer Motion's spring/tween reveals tick via requestAnimationFrame,
           which browsers throttle hard (sometimes to a near-standstill) while
           a tab is loading in the background or hasn't taken focus yet — the
           hero could get stuck at ~2% opacity indefinitely. CSS animations are
           driven by the compositor and always resolve to their end state once
           the tab is visible again, so the very first thing visitors see can't
           get silently stuck invisible. */
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(var(--hero-reveal-y, 14px)); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-reveal { opacity: 0; animation: heroReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: var(--hero-reveal-delay, 0s); }
        @keyframes heroStageReveal {
          from { opacity: 0; transform: translateY(60px) rotateX(6deg) scale(0.96); }
          to { opacity: 1; transform: translateY(0) rotateX(0) scale(1); }
        }
        .hero-stage-reveal { opacity: 0; animation: heroStageReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards; animation-delay: 0.3s; }
        @keyframes heroFloatReveal {
          from { opacity: 0; transform: translateX(var(--hero-float-x, 0)); }
          to { opacity: 1; transform: translateX(0); }
        }
        .hero-float-reveal { opacity: 0; animation: heroFloatReveal 0.4s ease forwards; animation-delay: var(--hero-reveal-delay, 0s); }
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal, .hero-stage-reveal, .hero-float-reveal { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <div className="hero-inner">
        {/* Headline */}
        <h1 className="hero-h1 hero-reveal" style={{ ['--hero-reveal-y' as string]: '18px', ['--hero-reveal-delay' as string]: '0.05s' }}>
          <span style={{ color: '#9CA3AF' }}>Resumes get ignored.</span><br />
          Reslinks get{' '}
          <span style={{ display: 'inline-block', position: 'relative' }}>
            watched.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-16px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
          </span>
        </h1>

        {/* Subtext */}
        <p className="hero-sub hero-reveal" style={{ ['--hero-reveal-y' as string]: '14px', ['--hero-reveal-delay' as string]: '0.12s' }}>
          One link. Your video intro, your resume, your work.
        </p>

        {/* CTAs */}
        <div className="hero-ctas hero-reveal" style={{ ['--hero-reveal-y' as string]: '12px', ['--hero-reveal-delay' as string]: '0.18s' }}>
          <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
            Create your Reslink
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link href="#how-it-works" className="btn-outline" style={{ fontSize: '15px', padding: '14px 26px' }}>
            See how it works
          </Link>
        </div>

        {/* Social proof row — real faces + free-to-start line, sits under the CTAs */}
        <div className="hero-proof-row hero-reveal" style={{ ['--hero-reveal-y' as string]: '10px', ['--hero-reveal-delay' as string]: '0.24s' }}>
          <span className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#5C6070', fontSize: '13px', fontWeight: 500, padding: '7px 16px 7px 8px', borderRadius: '100px', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E7EC', boxShadow: '0 2px 8px rgba(4,22,53,0.06)' }}>
            <span style={{ display: 'flex' }}>
              {['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg', '/avatars/a4.jpg', '/avatars/a5.jpg'].map((src, i) => (
                <img key={i} src={src} alt="" width={28} height={28} className="hero-pill-avatar"
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #fff', marginLeft: i === 0 ? 0 : '-8px', objectFit: 'cover', display: 'block' }} />
              ))}
            </span>
            <span style={{ color: '#5C6070' }}><strong style={{ color: '#041635', fontWeight: 700 }}>10,000+</strong> job seekers worldwide</span>
          </span>
          <span className="hero-proof-sep">·</span>
          <span className="hero-proof-text">Free to start · Under 5 minutes</span>
        </div>
      </div>

      {/* Living product stage — perspective tilt entrance (CSS) + scroll parallax (JS, safe since it's driven by scroll position, not elapsed time) */}
      <motion.div style={{ scale: stageScale, y: stageY }}>
      <div
        className="hero-stage hero-stage-reveal"
        style={{ perspective: '1200px', transformOrigin: 'center bottom' }}
      >
        <Link href="/oliviastone" aria-label="Explore the example Reslink" style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }} className="hero-frame-link">
          <style>{`
            .hero-frame-link .hero-open-hint { opacity: 0; transition: opacity 0.25s ease; }
            .hero-frame-link:hover .hero-open-hint { opacity: 1; }
            /* No hover on touch devices, so the full-frame scrim+pill never had a
               way to show up. Rather than force it always-on (it blocks the video
               it's supposed to be advertising), leave it hidden on touch and
               instead pulse the existing "Open example" link in the browser-chrome
               bar — same affordance, without covering anything. */
            @media (hover: none) {
              .hero-frame-link .hero-open-hint { display: none; }
              .hero-open-example { animation: hero-hint-pulse 1.8s ease-in-out infinite; }
            }
            @keyframes hero-hint-pulse {
              0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(12,99,227,0.35); }
              50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(12,99,227,0); }
            }
          `}</style>
          <div className="hero-frame" style={{ position: 'relative' }}>
            <div className="hero-bar">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
              <div style={{ flex: 1, margin: '0 12px', background: '#EAECEF', borderRadius: '6px', padding: '4px 14px', fontSize: '11px', color: '#9A9FA8', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                reslink.io/oliviastone
              </div>
              <span className="hero-open-example" style={{ fontSize: '11px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px', borderRadius: '100px', padding: '4px 8px' }}>
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
                <style>{`
                  @media (hover: none) {
                    .hero-open-hint-pill { padding: 10px 16px !important; font-size: 12.5px !important; }
                  }
                `}</style>
                <span className="hero-open-hint-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#041635', borderRadius: '100px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}>
                  Explore this example Reslink
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Floating feature card — view analytics */}
        <div
          className="hero-float float-tr hero-float-reveal"
          style={{ ['--hero-float-x' as string]: '20px', ['--hero-reveal-delay' as string]: '0.85s' }}
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
        </div>

        {/* Floating feature card — watch-time tracking */}
        <div
          className="hero-float float-bl hero-float-reveal"
          style={{ ['--hero-float-x' as string]: '-20px', ['--hero-reveal-delay' as string]: '1.0s' }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Every second tracked</p>
              <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Know exactly what they watched</p>
            </div>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
