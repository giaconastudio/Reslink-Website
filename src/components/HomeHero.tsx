'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Briefcase, Building2 } from 'lucide-react';

/** Shared homepage hero — headline for both audiences, then a split intro
 *  (individuals / organizations) that scrolls down to the matching section
 *  further down the page rather than linking out immediately. */
export default function HomeHero() {
  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', paddingBottom: 'clamp(48px, 6vw, 72px)' }}>
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

        /* Split intro */
        .hh-split-wrap { max-width: 1000px; margin: clamp(40px, 5vw, 56px) auto 0; position: relative; z-index: 1; padding: 0 24px; }
        .hh-split { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #ECEEF1; border-radius: 22px; overflow: hidden; box-shadow: 0 4px 24px rgba(4,22,53,0.06); }
        .hh-split-col { padding: clamp(30px, 4vw, 44px) clamp(26px, 4vw, 40px); text-align: left; }
        .hh-split-col.light { background: #fff; }
        .hh-split-col.dark { background: #041635; }
        .hh-split-icon { width: 44px; height: 44px; border-radius: 13px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .hh-split-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: var(--font-body); margin-bottom: 10px; }
        .hh-split-head { font-family: var(--font-phudu); font-size: clamp(22px, 2.6vw, 28px); font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; margin-bottom: 12px; }
        .hh-split-body { font-size: 14px; line-height: 1.65; font-family: var(--font-body); margin-bottom: 22px; }
        .hh-split-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 700; font-family: var(--font-body); text-decoration: none; }
        .hh-split-link svg { transition: transform 0.18s ease; }
        .hh-split-link:hover svg { transform: translateX(3px); }

        @media (max-width: 700px) {
          .hh-inner { padding: 100px 20px 0; }
          .hh-split { grid-template-columns: 1fr; }
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
            <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-19px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
          </span>
        </motion.h1>

        <motion.p className="hh-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
          A short video pitch bringing your resume to life. Changing the way you stand out and make a first impression.
        </motion.p>
      </div>

      {/* Split intro — individuals / organizations, each scrolling to its section below */}
      <motion.div className="hh-split-wrap" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <div className="hh-split">
          <div className="hh-split-col light">
            <div className="hh-split-icon" style={{ background: '#EEF4FF' }}>
              <Briefcase size={20} color="#0C63E3" strokeWidth={1.9} />
            </div>
            <p className="hh-split-eyebrow" style={{ color: '#9A9FA8' }}>For individuals</p>
            <h2 className="hh-split-head" style={{ color: '#041635' }}>Job seekers, students, veterans.</h2>
            <p className="hh-split-body" style={{ color: '#5C6070' }}>
              Build a free video resume that gets you noticed. AI writes the script, a teleprompter guides the take, and you see who&apos;s watching.
            </p>
            <Link href="#individuals" className="hh-split-link" style={{ color: '#0C63E3' }}>
              Learn more <ArrowRight size={14} />
            </Link>
          </div>
          <div className="hh-split-col dark">
            <div className="hh-split-icon" style={{ background: 'rgba(216,249,80,0.13)', border: '1px solid rgba(216,249,80,0.22)' }}>
              <Building2 size={20} color="#D8F950" strokeWidth={1.9} />
            </div>
            <p className="hh-split-eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>For organizations</p>
            <h2 className="hh-split-head" style={{ color: '#fff' }}>Companies, agencies, universities.</h2>
            <p className="hh-split-body" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Screen candidates in minutes, send clients branded video shortlists, and give every student a way to stand out.
            </p>
            <Link href="#organizations" className="hh-split-link" style={{ color: '#D8F950' }}>
              Learn more <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
