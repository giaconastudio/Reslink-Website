'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, Flag, Building2, Users } from 'lucide-react';
import { Magnetic } from '@/components/TiltCard';

type Audience = 'individuals' | 'organizations';

const paths: Record<Audience, { label: string; href: string; icon: React.ElementType }[]> = {
  individuals: [
    { label: 'Job Seekers', href: '/job-seekers', icon: Briefcase },
    { label: 'Students', href: '/students', icon: GraduationCap },
    { label: 'Veterans', href: '/veterans', icon: Flag },
  ],
  organizations: [
    { label: 'Companies', href: '/companies', icon: Building2 },
    { label: 'Recruitment Agencies', href: '/agencies', icon: Users },
    { label: 'Universities', href: '/universities', icon: GraduationCap },
  ],
};

/** Shared homepage hero — same simple, single-column shape as the job-seeker
 *  hero, with an audience picker in place of a single fixed CTA. */
export default function HomeHero() {
  const [audience, setAudience] = useState<Audience>('individuals');

  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', paddingBottom: '72px' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '50%', marginLeft: '-450px', width: '900px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(12,99,227,0.08), transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <style>{`
        .hh-inner { max-width: 900px; margin: 0 auto; padding: 130px 24px 0; text-align: center; position: relative; z-index: 1; }
        .hh-h1 {
          font-family: var(--font-phudu);
          font-size: clamp(42px, 7vw, 80px);
          font-weight: 900;
          line-height: 0.94;
          letter-spacing: -0.03em;
          color: #041635;
          margin-bottom: 22px;
        }
        @media (max-width: 520px) {
          .hh-h1 { font-size: clamp(40px, 11vw, 52px); line-height: 0.98; letter-spacing: -0.02em; }
        }
        .hh-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: #5C6070;
          line-height: 1.6;
          max-width: 520px;
          margin: 0 auto 36px;
          font-family: var(--font-body);
        }
        .hh-seg { display: inline-flex; background: #ECEEF1; border-radius: 14px; padding: 4px; gap: 2px; margin-bottom: 24px; }
        .hh-seg-btn {
          padding: 10px 22px; border-radius: 10px; border: none; background: transparent;
          cursor: pointer; font-size: 14px; font-weight: 600; color: #6B7280;
          font-family: var(--font-body); transition: color 0.18s;
        }
        .hh-seg-btn:hover:not(.active) { color: #041635; }
        .hh-seg-btn.active { background: #041635; color: #fff; font-weight: 700; box-shadow: 0 1px 4px rgba(4,22,53,0.18); }

        .hh-paths { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 48px; }
        .hh-path {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 18px; border-radius: 100px;
          border: 1.5px solid #E4E7EC; background: #fff; text-decoration: none;
          font-size: 14px; font-weight: 600; color: #041635; font-family: var(--font-body);
          transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
        }
        .hh-path:hover { border-color: #0C63E3; box-shadow: 0 6px 20px rgba(12,99,227,0.12); transform: translateY(-1px); }

        .hh-stage { max-width: 920px; margin: 0 auto; position: relative; z-index: 1; }
        .hh-frame { border-radius: 18px; overflow: hidden; border: 1px solid #E6E8EC; background: #fff; box-shadow: 0 40px 120px rgba(4,22,53,0.18), 0 8px 28px rgba(4,22,53,0.08); }
        .hh-bar { background: #F7F8FA; padding: 11px 16px; border-bottom: 1px solid #EEEEF0; display: flex; align-items: center; gap: 6px; }
        .hh-video { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 16/9; width: 100%; }

        @media (max-width: 760px) {
          .hh-inner { padding: 100px 20px 0; }
          .hh-paths { gap: 8px; }
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
          A resume you can<br />
          actually{' '}
          <span style={{ display: 'inline-block', position: 'relative' }}>
            watch
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-14px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
          </span>
          .
        </motion.h1>

        <motion.p className="hh-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          Reslink replaces the flat PDF with a short video pitch, real analytics, and one shareable link — whichever side of hiring you&apos;re on.
        </motion.p>

        {/* Audience picker */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}>
          <div className="hh-seg">
            <button className={`hh-seg-btn${audience === 'individuals' ? ' active' : ''}`} onClick={() => setAudience('individuals')}>
              For individuals
            </button>
            <button className={`hh-seg-btn${audience === 'organizations' ? ' active' : ''}`} onClick={() => setAudience('organizations')}>
              For organizations
            </button>
          </div>

          <motion.div
            key={audience}
            className="hh-paths"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {paths[audience].map(p => (
              <Link key={p.href} href={p.href} className="hh-path">
                <p.icon size={15} color="#0C63E3" strokeWidth={1.9} />
                {p.label}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Product frame — same visual language as the job-seeker hero */}
      <motion.div
        className="hh-stage"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/oliviastone" aria-label="Explore the example Reslink" style={{ display: 'block', textDecoration: 'none' }}>
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
                src="/videos/hero.mp4"
                poster="/videos/hero-poster.jpg"
                autoPlay muted loop playsInline preload="auto"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06)' }}
              />
            </div>
          </div>
        </Link>
      </motion.div>

      <div style={{ maxWidth: '920px', margin: '28px auto 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Magnetic>
          <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px', display: 'inline-flex' }}>
            Create your Reslink free <ArrowRight size={15} />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
