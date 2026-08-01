'use client';

import { motion } from 'framer-motion';
import HomeFeatureRow from '@/components/HomeFeatureRow';

/** Homepage section for the individuals audience — anchored so the hero's
 *  "Learn more" link scrolls straight here. Alternating feature rows reuse
 *  each dedicated page's own hero video, rather than generic icon cards. */
export default function HomeIndividuals() {
  return (
    <section id="individuals" style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px', scrollMarginTop: '84px' }}>
      <style>{`
        .hin-inner { max-width: 1080px; margin: 0 auto; }
        .hin-head { max-width: 620px; margin: 0 auto clamp(56px, 7vw, 84px); text-align: center; }

        .hfr-row { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(36px, 5vw, 72px); align-items: center; }
        .hfr-row + .hfr-row { margin-top: clamp(56px, 7vw, 88px); }
        .hfr-row.reverse .hfr-media { order: 2; }
        .hfr-row.reverse .hfr-copy { order: 1; }
        @media (max-width: 820px) {
          .hfr-row { grid-template-columns: 1fr; }
          .hfr-row.reverse .hfr-media { order: 1; }
          .hfr-row.reverse .hfr-copy { order: 2; }
        }
        .hfr-frame { border-radius: 16px; overflow: hidden; border: 1px solid #E6E8EC; background: #fff; box-shadow: 0 24px 64px rgba(4,22,53,0.12), 0 6px 20px rgba(4,22,53,0.06); }
        .hfr-bar { background: #F7F8FA; padding: 9px 13px; border-bottom: 1px solid #EEEEF0; display: flex; gap: 5px; }
        .hfr-visual { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 16/10; width: 100%; }
        .hfr-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; font-family: var(--font-body); margin-bottom: 12px; }
        .hfr-title { font-family: var(--font-phudu); font-size: clamp(24px, 2.8vw, 32px); font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; margin-bottom: 12px; }
        .hfr-desc { font-size: 15px; line-height: 1.65; font-family: var(--font-body); margin-bottom: 18px; }
        .hfr-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 700; font-family: var(--font-body); text-decoration: none; }
        .hfr-link svg { transition: transform 0.18s ease; }
        .hfr-link:hover svg { transform: translateX(3px); }
      `}</style>

      <div className="hin-inner">
        <motion.div className="hin-head" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>For individuals</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 0.96, letterSpacing: '-0.03em', marginBottom: '20px' }}>
            Stand out before<br />you even walk in.
          </h2>
          <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            A Reslink pairs your resume with a short video pitch, so recruiters see who you are before the first call, not after.
          </p>
        </motion.div>

        <HomeFeatureRow
          tag="Job seekers"
          title="Stand out in a stack of identical resumes."
          desc="A 60-second video pitch, an AI-written script, and a built-in teleprompter turn your resume into an introduction employers actually remember."
          href="/job-seekers"
          media={{ kind: 'video', src: '/videos/hero.mp4', poster: '/videos/hero-poster.jpg' }}
        />
        <HomeFeatureRow
          reverse
          delay={0.08}
          tag="Students"
          title="Land your first role without years of experience."
          desc="No work history yet? A video pitch lets you sell your potential, your projects, and your drive in a way a blank resume never could."
          href="/students"
          media={{ kind: 'video', src: '/videos/student.mp4' }}
        />
        <HomeFeatureRow
          delay={0.16}
          tag="Veterans"
          title="Translate your service into civilian language."
          desc="Show recruiters the leadership and skills behind your military title, in your own words, before they ever open your resume."
          href="/veterans"
          media={{ kind: 'video', src: '/videos/military.mp4' }}
        />
      </div>
    </section>
  );
}
