'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, Flag, Building2, Users } from 'lucide-react';
import { Magnetic } from '@/components/TiltCard';

const individualPaths = [
  { label: 'Job Seekers', href: '/job-seekers', icon: Briefcase },
  { label: 'Students', href: '/students', icon: GraduationCap },
  { label: 'Veterans', href: '/veterans', icon: Flag },
];

const organizationPaths = [
  { label: 'Companies', href: '/companies', icon: Building2 },
  { label: 'Recruitment Agencies', href: '/agencies', icon: Users },
  { label: 'Universities', href: '/universities', icon: GraduationCap },
];

function PathCell({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link href={href} className="hh-cell">
      <span className="hh-cell-icon"><Icon size={16} color="#0C63E3" strokeWidth={1.9} /></span>
      <span className="hh-cell-label">{label}</span>
      <ArrowRight size={15} className="hh-cell-arrow" />
    </Link>
  );
}

/** Shared homepage hero — same simple, single-column shape as the job-seeker
 *  hero. The example Reslink comes first (framed as valuable to both a
 *  candidate and a hiring team), then a single directory table underneath
 *  lets visitors pick their path. */
export default function HomeHero() {
  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', paddingBottom: 'clamp(64px, 8vw, 96px)' }}>
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
          margin: 0 auto 44px;
          font-family: var(--font-body);
        }

        .hh-stage { max-width: 920px; margin: 0 auto; position: relative; z-index: 1; }
        .hh-stage-caption {
          font-size: 13px; font-weight: 700; letter-spacing: 0.04em; color: #5C6070;
          font-family: var(--font-body); text-align: center; margin-bottom: 14px;
        }
        .hh-frame { border-radius: 18px; overflow: hidden; border: 1px solid #E6E8EC; background: #fff; box-shadow: 0 40px 120px rgba(4,22,53,0.18), 0 8px 28px rgba(4,22,53,0.08); position: relative; }
        .hh-bar { background: #F7F8FA; padding: 11px 16px; border-bottom: 1px solid #EEEEF0; display: flex; align-items: center; gap: 6px; }
        .hh-video { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 16/9; width: 100%; }
        .hh-open-hint { opacity: 0; transition: opacity 0.25s ease; }
        .hh-frame-link:hover .hh-open-hint { opacity: 1; }
        .hh-view-link {
          display: none; align-items: center; justify-content: center; gap: 6px;
          margin-top: 16px; font-size: 13px; font-weight: 700; color: #0C63E3;
          font-family: var(--font-body); text-decoration: none;
        }

        /* Path table */
        .hh-table-wrap { max-width: 920px; margin: clamp(48px, 6vw, 68px) auto 0; }
        .hh-table-eyebrow { text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #0C63E3; font-family: var(--font-body); margin-bottom: 12px; }
        .hh-table-head { text-align: center; font-family: var(--font-phudu); font-size: clamp(24px, 3vw, 32px); font-weight: 900; color: #041635; letter-spacing: -0.02em; margin-bottom: 24px; }
        .hh-table {
          display: grid; grid-template-columns: 1fr 1fr;
          border-radius: 20px; border: 1px solid #E4E6EC; overflow: hidden;
          box-shadow: 0 4px 24px rgba(4,22,53,0.07); background: #fff;
        }
        .hh-table-header {
          padding: 16px 24px; background: #F7F8FA; border-bottom: 1px solid #ECEEF1;
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em;
          color: #6B7280; font-family: var(--font-body);
        }
        .hh-table-header:nth-child(1) { border-right: 1px solid #ECEEF1; }
        .hh-cell {
          display: flex; align-items: center; gap: 11px; padding: 15px 24px;
          text-decoration: none; transition: background 0.15s ease;
          border-bottom: 1px solid #ECEEF1;
        }
        .hh-cell:nth-child(odd) { border-right: 1px solid #ECEEF1; }
        .hh-cell:hover { background: #F8FAFF; }
        .hh-cell:last-child, .hh-cell:nth-last-child(2) { border-bottom: none; }
        .hh-cell-icon { width: 30px; height: 30px; border-radius: 9px; background: #EEF4FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .hh-cell-label { flex: 1; font-size: 14px; font-weight: 700; color: #041635; font-family: var(--font-body); text-align: left; }
        .hh-cell-arrow { color: #C7CCD6; flex-shrink: 0; transition: transform 0.18s ease, color 0.18s ease; }
        .hh-cell:hover .hh-cell-arrow { color: #0C63E3; transform: translateX(3px); }

        @media (max-width: 700px) {
          .hh-inner { padding: 100px 20px 0; }
          .hh-stage { padding: 0 16px; }
          .hh-frame-link:hover .hh-open-hint { opacity: 0; }
          .hh-view-link { display: inline-flex; }

          /* Reflow the row-major grid into two grouped lists: all of
             "For individuals" first, then all of "For organizations". */
          .hh-table { grid-template-columns: 1fr; }
          .hh-table-header, .hh-cell { border-right: none !important; }
          .hh-table-header:nth-child(1) { order: 0; }
          .hh-cell:nth-child(3) { order: 1; }
          .hh-cell:nth-child(5) { order: 2; }
          .hh-cell:nth-child(7) { order: 3; }
          .hh-table-header:nth-child(2) { order: 4; border-top: 1px solid #ECEEF1; }
          .hh-cell:nth-child(4) { order: 5; }
          .hh-cell:nth-child(6) { order: 6; }
          .hh-cell:nth-child(8) { order: 7; }
          .hh-cell:nth-last-child(2) { border-bottom: 1px solid #ECEEF1; }
          .hh-cell:last-child { border-bottom: none; }
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
          Don&apos;t read it.<br />
          <span style={{ display: 'inline-block', position: 'relative' }}>
            Watch it.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-14px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
          </span>
        </motion.h1>

        <motion.p className="hh-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          Reslink replaces the flat resume PDF with a short video pitch, real analytics, and one shareable link, whichever side of hiring you&apos;re on.
        </motion.p>
      </div>

      {/* Product frame — appeals to both a candidate applying and a team hiring */}
      <motion.div
        className="hh-stage"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hh-stage-caption">See what applying and hiring can look like now.</p>
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
                src="/videos/hero.mp4"
                poster="/videos/hero-poster.jpg"
                autoPlay muted loop playsInline preload="auto"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06)' }}
              />
              <div className="hh-open-hint" style={{ position: 'absolute', inset: 0, background: 'rgba(4,22,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#041635', borderRadius: '100px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}>
                  View this example Reslink <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/oliviastone" className="hh-view-link">
          View this example Reslink <ArrowRight size={13} />
        </Link>

        {/* Path table */}
        <div className="hh-table-wrap">
          <p className="hh-table-eyebrow">Get started</p>
          <h2 className="hh-table-head">Pick where you fit.</h2>
          <div className="hh-table">
            <div className="hh-table-header">For individuals</div>
            <div className="hh-table-header">For organizations</div>
            {individualPaths.flatMap((ip, i) => [
              <PathCell key={ip.href} {...ip} />,
              <PathCell key={organizationPaths[i].href} {...organizationPaths[i]} />,
            ])}
          </div>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Magnetic>
            <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px', display: 'inline-flex' }}>
              Create your Reslink free <ArrowRight size={15} />
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
