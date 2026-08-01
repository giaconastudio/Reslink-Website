'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Briefcase, GraduationCap, Flag } from 'lucide-react';

const items = [
  { label: 'Job Seekers', href: '/job-seekers', desc: 'Stand out in a stack of identical resumes with a 60-second video pitch.', icon: Briefcase },
  { label: 'Students', href: '/students', desc: 'Land your first role or internship without years of experience to lean on.', icon: GraduationCap },
  { label: 'Veterans', href: '/veterans', desc: 'Translate military experience into language civilian recruiters understand.', icon: Flag },
];

/** Homepage section for the individuals audience — anchored so the hero's
 *  "Learn more" link scrolls straight here. */
export default function HomeIndividuals() {
  return (
    <section id="individuals" style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px', scrollMarginTop: '84px' }}>
      <style>{`
        .hin-inner { max-width: 1080px; margin: 0 auto; }
        .hin-grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: clamp(36px, 5vw, 64px); align-items: center; margin-bottom: clamp(56px, 7vw, 84px); }
        @media (max-width: 880px) { .hin-grid { grid-template-columns: 1fr; } }
        .hin-frame { border-radius: 18px; overflow: hidden; border: 1px solid #E6E8EC; background: #fff; box-shadow: 0 30px 90px rgba(4,22,53,0.16), 0 6px 22px rgba(4,22,53,0.07); text-decoration: none; display: block; position: relative; }
        .hin-bar { background: #F7F8FA; padding: 11px 16px; border-bottom: 1px solid #EEEEF0; display: flex; align-items: center; gap: 6px; }
        .hin-video { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 16/10; width: 100%; }
        .hin-open-hint { opacity: 0; transition: opacity 0.25s ease; }
        .hin-frame:hover .hin-open-hint { opacity: 1; }
        .hin-view-link { display: none; align-items: center; justify-content: center; gap: 6px; margin-top: 14px; font-size: 13px; font-weight: 700; color: #0C63E3; font-family: var(--font-body); text-decoration: none; }
        @media (max-width: 880px) {
          .hin-frame:hover .hin-open-hint { opacity: 0; }
          .hin-view-link { display: inline-flex; }
        }

        .hin-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        @media (max-width: 760px) { .hin-cards { grid-template-columns: 1fr; } }
        .hin-card { display: flex; flex-direction: column; height: 100%; padding: 26px; border-radius: 16px; text-decoration: none; background: #FAFBFC; border: 1px solid #E8EAF0; transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease; }
        .hin-card:hover { transform: translateY(-3px); border-color: #0C63E3; box-shadow: 0 16px 40px rgba(4,22,53,0.10); }
        .hin-icon { width: 42px; height: 42px; border-radius: 12px; background: #EEF4FF; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
        .hin-link { display: inline-flex; align-items: center; gap: 5px; margin-top: 20px; font-size: 13px; font-weight: 700; font-family: var(--font-body); color: #0C63E3; }
        .hin-card:hover .hin-link svg { transform: translateX(3px); }
        .hin-link svg { transition: transform 0.22s ease; }
      `}</style>

      <div className="hin-inner">
        <div className="hin-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>For individuals</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 0.96, letterSpacing: '-0.03em', marginBottom: '20px' }}>
              Stand out before<br />you even walk in.
            </h2>
            <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              A Reslink pairs your resume with a short video pitch, so recruiters see who you are before the first call, not after.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <Link href="/oliviastone" className="hin-frame" aria-label="Explore an example Reslink">
              <div className="hin-bar">
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
              <div className="hin-video">
                <video
                  src="/videos/hero.mp4"
                  poster="/videos/hero-poster.jpg"
                  autoPlay muted loop playsInline preload="metadata"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06)' }}
                />
                <div className="hin-open-hint" style={{ position: 'absolute', inset: 0, background: 'rgba(4,22,53,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#041635', borderRadius: '100px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}>
                    View this example Reslink <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/oliviastone" className="hin-view-link">
              View this example Reslink <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        <div className="hin-cards">
          {items.map((item, i) => (
            <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.07 }}>
              <Link href={item.href} className="hin-card">
                <div className="hin-icon"><item.icon size={19} color="#0C63E3" strokeWidth={1.9} /></div>
                <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '9px', color: '#041635' }}>{item.label}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.65, fontFamily: 'var(--font-body)', color: '#5C6070', flex: 1 }}>{item.desc}</p>
                <span className="hin-link">Learn more <ArrowRight size={13} /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
