'use client';

import { motion } from 'framer-motion';
import HomeFeatureRow from '@/components/HomeFeatureRow';

/** Homepage section for the organizations audience — anchored so the hero's
 *  "Learn more" link scrolls straight here. Alternating feature rows reuse
 *  each dedicated page's own visuals, rather than generic icon cards. */
export default function HomeOrganizations() {
  return (
    <section id="organizations" style={{ background: '#041635', padding: 'clamp(72px, 9vw, 108px) 24px', position: 'relative', overflow: 'hidden', scrollMarginTop: '84px' }}>
      <div style={{ position: 'absolute', top: '-10%', right: '-8%', width: '600px', height: '500px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />

      <style>{`
        .horg-inner { max-width: 1080px; margin: 0 auto; position: relative; z-index: 1; }
        .horg-head { max-width: 620px; margin: 0 auto clamp(56px, 7vw, 84px); text-align: center; }

        .hfr-row { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(36px, 5vw, 72px); align-items: center; }
        .hfr-row + .hfr-row { margin-top: clamp(56px, 7vw, 88px); }
        .hfr-row.reverse .hfr-media { order: 2; }
        .hfr-row.reverse .hfr-copy { order: 1; }
        @media (max-width: 820px) {
          .hfr-row { grid-template-columns: 1fr; }
          .hfr-row.reverse .hfr-media { order: 1; }
          .hfr-row.reverse .hfr-copy { order: 2; }
        }
        .hfr-frame { border-radius: 16px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.35); }
        .hfr-frame-dark { border: 1px solid rgba(255,255,255,0.1); }
        .hfr-bar { background: #F7F8FA; padding: 9px 13px; border-bottom: 1px solid #EEEEF0; display: flex; gap: 5px; }
        .hfr-bar-dark { background: #1C2333; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .hfr-visual { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 16/10; width: 100%; }
        .hfr-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: var(--font-body); margin-bottom: 12px; }
        .hfr-title { font-family: var(--font-phudu); font-size: clamp(24px, 2.8vw, 32px); font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; margin-bottom: 12px; }
        .hfr-desc { font-size: 15px; line-height: 1.65; font-family: var(--font-body); margin-bottom: 18px; }
        .hfr-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 700; font-family: var(--font-body); text-decoration: none; }
        .hfr-link svg { transition: transform 0.18s ease; }
        .hfr-link:hover svg { transform: translateX(3px); }
      `}</style>

      <div className="horg-inner">
        <motion.div className="horg-head" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>For organizations</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 0.96, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            See the person, not just the paper.
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Whether you&apos;re hiring, placing candidates, or preparing students for the job market, Reslink gives you video and data a resume never could.
          </p>
        </motion.div>

        <HomeFeatureRow
          dark
          tag="Companies"
          title="Screen more candidates in less time."
          desc="Every applicant is scored on video pitch, resume match, and role fit. Open your dashboard to a ranked shortlist, not a pile of applications."
          href="/companies"
          media={{ kind: 'image', src: '/feature-dashboard.png', alt: 'Reslink hiring dashboard' }}
        />
        <HomeFeatureRow
          dark
          reverse
          delay={0.08}
          tag="Recruitment agencies"
          title="Win the brief before the meeting happens."
          desc="Build shortlists like Final Round or Strong Maybes, and send clients a branded, trackable list instead of a PDF nobody opens."
          href="/agencies"
          media={{ kind: 'image', src: '/feature-lists.png', alt: 'Saved candidate lists' }}
        />
        <HomeFeatureRow
          dark
          delay={0.16}
          tag="Universities"
          title="Give every student a way to stand out."
          desc="Your career center gets real placement data and employer engagement metrics, while students get a video pitch employers actually watch."
          href="/universities"
          media={{ kind: 'video', src: '/videos/company-student.mp4' }}
        />
      </div>
    </section>
  );
}
