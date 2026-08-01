'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Magnetic } from '@/components/TiltCard';

/** Shared homepage hero — one clean headline, one visual, one CTA. Same
 *  restrained shape as the job-seeker hero. Audience choice lives in the
 *  compact directory below, not in the hero itself. */
export default function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 48]);

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

  return (
    <section ref={sectionRef} onMouseMove={onGlowMove} style={{ background: '#fff', position: 'relative', overflow: 'hidden', paddingBottom: '72px' }}>
      <motion.div style={{ position: 'absolute', top: '-10%', left: '50%', marginLeft: '-450px', width: '900px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(12,99,227,0.08), transparent 65%)', pointerEvents: 'none', zIndex: 0, x: sGlowX, y: sGlowY }} />

      <style>{`
        .hh-inner { max-width: 1120px; margin: 0 auto; padding: 130px 24px 0; text-align: center; position: relative; z-index: 1; }
        .hh-h1 {
          font-family: var(--font-phudu);
          font-size: clamp(42px, 8vw, 92px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: #041635;
          margin-bottom: 24px;
        }
        @media (max-width: 520px) {
          .hh-h1 { font-size: clamp(48px, 13vw, 60px); line-height: 0.96; letter-spacing: -0.02em; }
        }
        .hh-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: #5C6070;
          line-height: 1.6;
          max-width: 540px;
          margin: 0 auto 36px;
          font-family: var(--font-body);
        }
        .hh-ctas { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 18px; }
        .hh-proof { font-size: 13px; color: #9A9FA8; font-family: var(--font-body); margin-bottom: 56px; }
        .hh-proof strong { color: #5C6070; font-weight: 600; }

        .hh-stage { max-width: 920px; margin: 0 auto; position: relative; z-index: 1; }
        .hh-frame { border-radius: 18px; overflow: hidden; border: 1px solid #E6E8EC; background: #fff; box-shadow: 0 40px 120px rgba(4,22,53,0.18), 0 8px 28px rgba(4,22,53,0.08); }
        .hh-bar { background: #F7F8FA; padding: 11px 16px; border-bottom: 1px solid #EEEEF0; display: flex; align-items: center; gap: 6px; }
        .hh-video { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 16/9; width: 100%; }
        .hh-open-hint { opacity: 0; transition: opacity 0.25s ease; }
        .hh-frame-link:hover .hh-open-hint { opacity: 1; }

        @media (max-width: 760px) {
          .hh-inner { padding: 100px 20px 0; }
          .hh-proof { margin-bottom: 40px; }
          .hh-ctas { gap: 10px; }
          .hh-ctas > div { width: 100%; }
          .hh-ctas a { width: 100%; justify-content: center; box-sizing: border-box; }
          .hh-stage { padding: 0 16px; }
        }
      `}</style>

      <div className="hh-inner">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '18px', fontFamily: 'var(--font-body)' }}
        >
          Video-first hiring
        </motion.p>

        <motion.h1 className="hh-h1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          Share the resume.<br />
          <span style={{ display: 'inline-block', position: 'relative' }}>
            Meet the person.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-16px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
          </span>
        </motion.h1>

        <motion.p className="hh-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          A short video pitch bringing your resume to life. Changing the way you stand out and make a first impression.
        </motion.p>

        <motion.div className="hh-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}>
          <Magnetic>
            <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Create your Reslink free
              <ArrowRight size={14} />
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link href="#directory" className="btn-outline" style={{ fontSize: '15px', padding: '14px 26px' }}>
              Explore for your team
            </Link>
          </Magnetic>
        </motion.div>

        <motion.p className="hh-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.25 }}>
          Free to start · Takes less than 5 minutes
        </motion.p>
      </div>

      <motion.div style={{ scale: stageScale, y: stageY }}>
        <motion.div
          className="hh-stage"
          initial={{ opacity: 0, y: 60, rotateX: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: '1200px', transformOrigin: 'center bottom' }}
        >
          <Link href="/oliviastone" aria-label="Explore the example Reslink" style={{ display: 'block', textDecoration: 'none' }} className="hh-frame-link">
            <div className="hh-frame">
              <div className="hh-bar">
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
                <div style={{ flex: 1, margin: '0 12px', background: '#EAECEF', borderRadius: '6px', padding: '4px 14px', fontSize: '11px', color: '#9A9FA8', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                  reslink.io/oliviastone
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Open example <ArrowRight size={11} />
                </span>
              </div>
              <div className="hh-video">
                <video
                  ref={videoRef}
                  src="/videos/hero.mp4"
                  poster="/videos/hero-poster.jpg"
                  autoPlay muted loop playsInline preload="auto"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.06)' }}
                />
                <div className="hh-open-hint" style={{ position: 'absolute', inset: 0, background: 'rgba(4,22,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#041635', borderRadius: '100px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}>
                    Explore this example Reslink
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
