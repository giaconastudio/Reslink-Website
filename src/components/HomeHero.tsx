'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Briefcase, Building2 } from 'lucide-react';

/** Audience-routing hero for the shared homepage — sends visitors to the
 *  job-seeker side or the organization side rather than pitching one of them. */
export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Same cursor-following glow language as the job-seeker hero.
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const sGlowX = useSpring(glowX, { stiffness: 45, damping: 20 });
  const sGlowY = useSpring(glowY, { stiffness: 45, damping: 20 });
  const onGlowMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    glowX.set((e.clientX - r.left - r.width / 2) * 0.22);
    glowY.set((e.clientY - r.top - 300) * 0.15);
  };

  return (
    <section ref={sectionRef} onMouseMove={onGlowMove} style={{ background: '#fff', position: 'relative', overflow: 'hidden', paddingBottom: 'clamp(64px, 8vw, 96px)' }}>
      <motion.div style={{ position: 'absolute', top: '-10%', left: '50%', marginLeft: '-450px', width: '900px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(12,99,227,0.08), transparent 65%)', pointerEvents: 'none', zIndex: 0, x: sGlowX, y: sGlowY }} />

      <style>{`
        .hh-inner { max-width: 1080px; margin: 0 auto; padding: 130px 24px 0; text-align: center; position: relative; z-index: 1; }
        .hh-h1 {
          font-family: var(--font-phudu);
          font-size: clamp(40px, 6.4vw, 72px);
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: -0.03em;
          color: #041635;
          margin: 0 auto 22px;
        }
        /* Forced breaks tune the desktop rag; on narrow screens the text
           reflows on its own, so suppress them to avoid orphaned lines. */
        @media (max-width: 620px) {
          .hh-h1 { font-size: clamp(38px, 10.5vw, 52px); line-height: 0.98; letter-spacing: -0.02em; }
          .hh-h1 br { display: none; }
        }
        .hh-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: #5C6070;
          line-height: 1.6;
          max-width: 560px;
          margin: 0 auto clamp(44px, 5vw, 60px);
          font-family: var(--font-body);
        }
        .hh-paths { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left; }
        @media (max-width: 820px) { .hh-paths { grid-template-columns: 1fr; } }
        .hh-card {
          display: flex; flex-direction: column;
          padding: clamp(26px, 3vw, 36px);
          border-radius: 20px;
          text-decoration: none;
          height: 100%;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .hh-card:hover { transform: translateY(-4px); }
        .hh-card-light { background: #fff; border: 1.5px solid #E4E7EC; box-shadow: 0 2px 12px rgba(4,22,53,0.05); }
        .hh-card-light:hover { border-color: #0C63E3; box-shadow: 0 18px 48px rgba(4,22,53,0.12); }
        .hh-card-dark { background: #041635; border: 1.5px solid #041635; box-shadow: 0 8px 28px rgba(4,22,53,0.18); position: relative; overflow: hidden; }
        .hh-card-dark:hover { box-shadow: 0 22px 56px rgba(4,22,53,0.28); }
        .hh-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 20px; }
        .hh-arrow { display: inline-flex; align-items: center; gap: 6px; margin-top: auto; padding-top: 24px; font-size: 14px; font-weight: 700; font-family: var(--font-body); }
        .hh-card:hover .hh-arrow svg { transform: translateX(3px); }
        .hh-arrow svg { transition: transform 0.22s ease; }
      `}</style>

      <div className="hh-inner">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '18px', fontFamily: 'var(--font-body)' }}
        >
          Video-first hiring
        </motion.p>

        <motion.h1 className="hh-h1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          Hiring works better{' '}<br />
          when people can{' '}
          <span style={{ display: 'inline-block', position: 'relative' }}>
            see
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-12px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
          </span>{' '}
          <br />each other.
        </motion.h1>

        <motion.p className="hh-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          Reslink replaces the flat PDF with a short video pitch, real analytics, and one shareable link. Whichever side of the hiring process you&apos;re on.
        </motion.p>

        <motion.div className="hh-paths" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          {/* Job seekers */}
          <Link href="/job-seekers" className="hh-card hh-card-light">
            <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Briefcase size={21} color="#0C63E3" strokeWidth={1.9} />
            </div>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#B0B8C8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>For individuals</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(25px, 3vw, 33px)', fontWeight: 900, color: '#041635', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              I&apos;m looking for a job
            </h2>
            <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
              Build a free video resume in minutes. AI writes your script, a teleprompter guides the recording, and you see exactly which recruiters watched.
            </p>
            <div className="hh-tags">
              {['Job seekers', 'Students', 'Veterans'].map(t => (
                <span key={t} style={{ fontSize: '12px', fontWeight: 600, color: '#5C6070', background: '#F4F6F9', border: '1px solid #E4E7EC', borderRadius: '100px', padding: '5px 12px', fontFamily: 'var(--font-body)' }}>{t}</span>
              ))}
            </div>
            <span className="hh-arrow" style={{ color: '#0C63E3' }}>
              Create your Reslink free <ArrowRight size={15} />
            </span>
          </Link>

          {/* Organizations */}
          <Link href="/companies" className="hh-card hh-card-dark">
            <div style={{ position: 'absolute', top: '-25%', right: '-12%', width: '420px', height: '380px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 62%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '13px', background: 'rgba(216,249,80,0.14)', border: '1px solid rgba(216,249,80,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Building2 size={21} color="#D8F950" strokeWidth={1.9} />
              </div>
              <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>For organizations</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(25px, 3vw, 33px)', fontWeight: 900, color: '#fff', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                I&apos;m hiring or placing talent
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
                Screen candidates in minutes instead of hours, send clients branded video shortlists, and track engagement with real data instead of guesswork.
              </p>
              <div className="hh-tags">
                {['Companies', 'Agencies', 'Universities'].map(t => (
                  <span key={t} style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '100px', padding: '5px 12px', fontFamily: 'var(--font-body)' }}>{t}</span>
                ))}
              </div>
              <span className="hh-arrow" style={{ color: '#D8F950' }}>
                Explore hiring solutions <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
