'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Eye } from 'lucide-react';

const NOTIFICATIONS = [
  { name: 'Zara Mitchell', role: 'Frontend Engineer Intern', grade: 'A', score: 91, color: '#22C55E', initials: 'ZM', avatarBg: '#4F6EF7' },
  { name: 'Ben Holloway', role: 'Software Engineer', grade: 'B+', score: 84, color: '#3B82F6', initials: 'BH', avatarBg: '#10B981' },
  { name: 'Marcus Lee', role: 'Sales Development Rep', grade: 'A+', score: 95, color: '#22C55E', initials: 'ML', avatarBg: '#EF4444' },
];

/** Shared homepage hero — headline, then a genuinely full-bleed split: the
 *  individuals side reuses the job-seeker hero's video, the organizations
 *  side reuses the companies-page dashboard + live-applicant notification,
 *  so this isn't three generic icon blocks but the real product on both
 *  sides. Each "Learn more" scrolls to the matching section below. */
export default function HomeHero() {
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setNotifVisible(false);
      setTimeout(() => {
        setNotifIndex(i => (i + 1) % NOTIFICATIONS.length);
        setNotifVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const notif = NOTIFICATIONS[notifIndex];

  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
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
          margin: 0 auto 56px;
          font-family: var(--font-body);
        }

        /* Full-bleed split */
        .hh-split { display: grid; grid-template-columns: 1fr 1fr; }
        .hh-panel { padding: clamp(40px, 5vw, 64px) clamp(28px, 6vw, 72px) clamp(56px, 7vw, 88px); position: relative; overflow: hidden; }
        .hh-panel.light { background: #F7F8FA; }
        .hh-panel.dark { background: #041635; }
        .hh-panel-inner { max-width: 460px; margin: 0 auto; position: relative; z-index: 1; }
        .hh-panel-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--font-body); margin-bottom: 12px; }
        .hh-panel-head { font-family: var(--font-phudu); font-size: clamp(26px, 3vw, 34px); font-weight: 900; letter-spacing: -0.02em; line-height: 1.02; margin-bottom: 14px; }
        .hh-panel-body { font-size: 15px; line-height: 1.65; font-family: var(--font-body); margin-bottom: 20px; }
        .hh-panel-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 700; font-family: var(--font-body); text-decoration: none; margin-bottom: clamp(28px, 4vw, 40px); }
        .hh-panel-link svg { transition: transform 0.18s ease; }
        .hh-panel-link:hover svg { transform: translateX(3px); }

        .hh-visual { position: relative; }
        .hh-vid-frame { border-radius: 14px; overflow: hidden; border: 1px solid #E6E8EC; background: #fff; box-shadow: 0 30px 80px rgba(4,22,53,0.16), 0 6px 20px rgba(4,22,53,0.06); }
        .hh-vid-bar { background: #F0F2F5; padding: 8px 12px; border-bottom: 1px solid #E6E8EC; display: flex; gap: 5px; }
        .hh-vid { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 16/10; width: 100%; }
        .hh-float-card {
          position: absolute; background: #fff; border-radius: 12px; box-shadow: 0 14px 36px rgba(4,22,53,0.16);
          border: 1px solid #EEEEF0; padding: 10px 13px; z-index: 3; display: flex; align-items: center; gap: 8px;
        }

        .hh-dash-frame { border-radius: 12px 12px 0 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); border-bottom: none; box-shadow: 0 30px 80px rgba(0,0,0,0.45); }
        .hh-dash-bar { background: #1C2333; border-bottom: 1px solid rgba(255,255,255,0.07); padding: 8px 12px; display: flex; align-items: center; gap: 6px; }
        .hh-notif-card { background: #fff; border-radius: 11px; padding: 8px 12px; display: flex; align-items: center; gap: 8px; box-shadow: 0 10px 28px rgba(4,22,53,0.22); border: 1px solid rgba(255,255,255,0.9); min-width: 190px; position: absolute; top: -18px; right: -14px; z-index: 3; }
        .hh-live-pill { position: absolute; top: 10px; left: 10px; z-index: 3; display: flex; align-items: center; gap: 6px; background: rgba(4,22,53,0.75); backdrop-filter: blur(8px); border-radius: 100px; padding: 4px 10px; border: 1px solid rgba(255,255,255,0.1); }

        @media (max-width: 900px) {
          .hh-split { grid-template-columns: 1fr; }
          .hh-panel { padding: 44px 24px 56px; }
          .hh-notif-card { display: none; }
        }
        @media (max-width: 700px) {
          .hh-inner { padding: 100px 20px 0; }
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

      {/* Full-bleed split — individuals left, organizations right */}
      <div className="hh-split">
        {/* Individuals */}
        <motion.div className="hh-panel light" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hh-panel-inner">
            <p className="hh-panel-eyebrow" style={{ color: '#0C63E3' }}>For individuals</p>
            <h2 className="hh-panel-head" style={{ color: '#041635' }}>Job seekers, students, veterans.</h2>
            <p className="hh-panel-body" style={{ color: '#5C6070' }}>
              Build a free video resume that gets you noticed. AI writes the script, a teleprompter guides the take.
            </p>
            <Link href="#individuals" className="hh-panel-link" style={{ color: '#0C63E3' }}>
              Learn more <ArrowRight size={14} />
            </Link>

            <div className="hh-visual">
              <div className="hh-vid-frame">
                <div className="hh-vid-bar">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
                </div>
                <div className="hh-vid">
                  <video
                    src="/videos/hero.mp4"
                    poster="/videos/hero-poster.jpg"
                    autoPlay muted loop playsInline preload="auto"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.06)' }}
                  />
                </div>
              </div>
              <motion.div className="hh-float-card" style={{ bottom: '-16px', left: '-16px' }} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Eye size={13} color="#0C63E3" />
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Google Recruiter viewed you</p>
                  <p style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Every second tracked</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Organizations */}
        <motion.div className="hh-panel dark" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '420px', height: '380px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
          <div className="hh-panel-inner">
            <p className="hh-panel-eyebrow" style={{ color: 'rgba(255,255,255,0.4)' }}>For organizations</p>
            <h2 className="hh-panel-head" style={{ color: '#fff' }}>Companies, agencies, universities.</h2>
            <p className="hh-panel-body" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Screen candidates in minutes, send clients branded video shortlists, and give every student a way to stand out.
            </p>
            <Link href="#organizations" className="hh-panel-link" style={{ color: '#D8F950' }}>
              Learn more <ArrowRight size={14} />
            </Link>

            <div className="hh-visual">
              <div className="hh-live-pill">
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>Live applicants</span>
              </div>
              <AnimatePresence mode="wait">
                {notifVisible && (
                  <motion.div
                    key={notifIndex}
                    className="hh-notif-card"
                    initial={{ opacity: 0, x: 10, y: 6 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: notif.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{notif.initials}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{notif.name}</p>
                      <p style={{ fontSize: '9px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>New Reslink submitted</p>
                    </div>
                    <div style={{ background: notif.color, borderRadius: '6px', padding: '2px 6px', flexShrink: 0 }}>
                      <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{notif.grade}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="hh-dash-frame">
                <div className="hh-dash-bar">
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
                  </div>
                </div>
                <Image src="/feature-dashboard.png" alt="Reslink hiring dashboard" width={920} height={454} quality={90} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
