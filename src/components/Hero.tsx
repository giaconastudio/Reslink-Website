'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

const EXPERIENCE = [
  {
    org: 'Meridian Logistics', period: 'Nov 2015 – Present',
    points: [
      'Cut ERP implementation cost 15.5% in six months on a mid-market retail rollout.',
      'Standardised logistics across 5 countries and 21 distribution centres, reducing overhead 8%.',
      'Led a strategic project with German retailers, saving $1.2M a year in transportation.',
    ],
  },
  {
    org: 'Global Retail Group', period: '2012 – 2015',
    points: [
      'Built demand-forecasting models that cut stockouts 22% across 3 regional warehouses.',
      'Owned the monthly S&OP cycle for a $40M product portfolio.',
    ],
  },
];

const SKILLS = ['SAP APO', 'Six Sigma', 'Demand planning', 'MRP', 'Forecasting', 'S&OP'];
const LANGUAGES = ['English', 'French'];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll parallax — product frame recedes slightly as you scroll past
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  // Vertical parallax only — no scroll-driven scale, which rasterises the card
  // layer and softens the button/text as you scroll.
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

  // The hero video card autoplays muted/looping. If the file isn't present yet
  // the pink gradient + placeholder figure behind it shows through instead.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section ref={sectionRef} onMouseMove={onGlowMove} style={{ background: '#fff', position: 'relative', overflow: 'hidden', paddingBottom: '72px' }}>
      <motion.div style={{ position: 'absolute', top: '-10%', left: '50%', marginLeft: '-450px', width: '900px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(20,104,232,0.08), transparent 65%)', pointerEvents: 'none', zIndex: 0, x: sGlowX, y: sGlowY }} />

      <style>{`
        .hero-inner { max-width: 1120px; margin: 0 auto; padding: 120px 24px 0; text-align: center; position: relative; z-index: 1; }
        .hero-h1 {
          font-family: var(--font-phudu);
          font-size: clamp(42px, 8vw, 92px);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: #061A3A;
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
          display: flex; align-items: center; justify-content: center; gap: 20px;
          flex-wrap: wrap; margin-bottom: 40px;
        }
        .hero-proof-sep { color: #C7CBD3; }
        .hero-proof-text { font-size: 13px; color: #9A9FA8; font-family: var(--font-body); }

        .hero-cosell { display: flex; justify-content: center; margin-bottom: 40px; }
        .hero-cosell-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13.5px; color: #8A93A3; font-family: var(--font-body);
          text-decoration: none; transition: color 0.15s ease;
        }
        .hero-cosell-link strong { color: #061A3A; font-weight: 700; }
        .hero-cosell-link:hover, .hero-cosell-link:hover strong { color: #1468E8; }

        .hero-cobanner { display: flex; justify-content: center; margin-bottom: 40px; }
        .hero-cobanner-inner {
          display: inline-flex; align-items: center; gap: 14px; max-width: 100%;
          background: #fff; border: 1.5px solid #E4E7EC; border-radius: 100px;
          padding: 6px 6px 6px 18px; box-shadow: 0 2px 10px rgba(6,26,58,0.06);
        }
        .hero-cobanner-text { font-size: 14px; font-family: var(--font-body); color: #5C6070; white-space: nowrap; }
        .hero-cobanner-btn {
          display: inline-flex; align-items: center; gap: 7px; flex-shrink: 0;
          background: #061A3A; color: #fff; font-size: 13px; font-weight: 700;
          font-family: var(--font-body); text-decoration: none; border-radius: 100px; padding: 9px 16px;
          transition: background 0.15s ease;
        }
        .hero-cobanner-btn:hover { background: #0A234C; }
        @media (max-width: 520px) {
          .hero-cobanner-inner { flex-direction: column; gap: 10px; border-radius: 18px; padding: 14px 16px; }
          .hero-cobanner-text { white-space: normal; text-align: center; }
        }

        .hero-stage { max-width: 1120px; margin: 0 auto; position: relative; z-index: 1; }
        /* Dark navy outer frame — overflow visible so the recruiter notification
           can spill past the bottom-right edge without being clipped. */
        .hero-frame {
          border-radius: clamp(20px, 2.6vw, 28px);
          overflow: visible;
          border: 1px solid rgba(255,255,255,0.06);
          background: #061A3A;
          padding: clamp(16px, 2.2vw, 24px);
          box-shadow: 0 40px 120px rgba(6,26,58,0.28), 0 8px 28px rgba(6,26,58,0.12);
        }

        .hero-split { display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.25fr); gap: clamp(14px, 1.8vw, 22px); align-items: stretch; }
        @media (max-width: 760px) { .hero-split { grid-template-columns: 1fr; gap: 16px; } }

        /* Video card (left) — height driven by the resume so both stay equal
           and there's no blank space on the right. */
        .hero-videocard {
          position: relative; border-radius: 16px; overflow: hidden;
          min-height: 300px;
          background: linear-gradient(150deg, #FF54BE 0%, #D01F92 52%, #A61680 100%);
          box-shadow: 0 20px 50px rgba(180,20,120,0.25);
        }
        .hero-videocard video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; transform: scale(1.18); display: block; }
        .hero-playing {
          position: absolute; top: 16px; left: 16px; z-index: 3;
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(6,26,58,0.55); backdrop-filter: blur(6px);
          border-radius: 100px; padding: 6px 13px 6px 11px;
        }
        .hero-playing-dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; }
        .hero-playing-txt { font-size: 12px; font-weight: 700; color: #fff; font-family: var(--font-body); letter-spacing: 0.02em; }
        .hero-vc-overlay {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 4;
          padding: 18px 16px 16px; display: flex; flex-direction: column; gap: 12px;
          background: linear-gradient(to top, rgba(80,10,55,0.7), transparent);
        }
        .hero-vc-caption { font-size: 14px; font-weight: 600; color: #fff; font-family: var(--font-body); line-height: 1.35; text-shadow: 0 1px 8px rgba(0,0,0,0.35); }
        .hero-vc-btn {
          align-self: flex-start; display: inline-flex; align-items: center; gap: 8px;
          background: #D7FF43; color: #061A3A; border-radius: 100px; padding: 9px 18px;
          font-size: 13px; font-weight: 700; font-family: var(--font-body); text-decoration: none;
          box-shadow: 0 6px 20px rgba(6,26,58,0.22);
        }
        .hero-vc-progress { height: 4px; border-radius: 100px; background: rgba(255,255,255,0.35); overflow: hidden; }
        .hero-vc-progress > span { display: block; height: 100%; width: 34%; background: #fff; border-radius: 100px; }

        /* Resume (right) — white card */
        .hero-resume-card { background: #fff; border-radius: 16px; padding: clamp(20px, 2.4vw, 30px); overflow: hidden; }
        .hero-resume { display: grid; grid-template-columns: 1.4fr 0.6fr; gap: clamp(18px, 2.4vw, 30px); text-align: left; align-content: start; }
        .hero-resume-aside { border-left: 1px solid #EBEDF1; padding-left: clamp(16px, 2vw, 26px); }
        @media (max-width: 480px) { .hero-resume { grid-template-columns: 1fr; gap: 16px; } .hero-resume-aside { border-left: none; padding-left: 0; } }
        .hero-resume-name { font-family: var(--font-phudu); font-size: clamp(24px, 3.4vw, 32px); font-weight: 900; color: #1468E8; letter-spacing: -0.02em; line-height: 1; }
        .hero-resume-role { font-size: 14px; color: #5C6070; font-family: var(--font-body); margin-top: 8px; }
        .hero-resume-h { font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #1468E8; font-family: var(--font-body); }
        .hero-resume-org { font-size: 13.5px; font-family: var(--font-body); margin: 14px 0 8px; }
        .hero-resume-org b { color: #061A3A; font-weight: 700; }
        .hero-resume-org span { color: #9A9FA8; }
        .hero-resume-pts { list-style: disc; padding-left: 18px; display: flex; flex-direction: column; gap: 7px; }
        .hero-resume-pts li { font-size: 12.5px; color: #5C6070; line-height: 1.5; font-family: var(--font-body); }
        .hero-chip { display: inline-block; font-size: 11.5px; font-weight: 600; color: #061A3A; border: 1px solid #E4E7EC; border-radius: 100px; padding: 5px 12px; font-family: var(--font-body); }
        .hero-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 10px; }

        /* Floating "recruiter opened" notification */
        .hero-notif {
          position: absolute; right: -14px; bottom: -26px; z-index: 6;
          width: 320px; max-width: 78vw;
          background: #fff; border: 1px solid #EEEEF0; border-radius: 16px;
          box-shadow: 0 24px 60px rgba(6,26,58,0.18); padding: 16px 18px;
        }
        .hero-notif-top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; }
        .hero-notif-av { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; background: #635BFF; display: flex; align-items: center; justify-content: center; }
        .hero-notif-av span { color: #fff; font-weight: 800; font-size: 10px; letter-spacing: -0.03em; font-family: var(--font-body); }
        .hero-notif-title { font-size: 14px; font-weight: 700; color: #061A3A; font-family: var(--font-body); line-height: 1.3; }
        .hero-notif-time { font-size: 12px; color: #9A9FA8; font-family: var(--font-body); margin-top: 3px; }
        .hero-notif-bar { height: 6px; border-radius: 100px; background: #EAF0FB; overflow: hidden; margin-bottom: 8px; }
        .hero-notif-bar > span { display: block; height: 100%; width: 87%; background: linear-gradient(90deg, #1468E8, #D63D9D); border-radius: 100px; }
        .hero-notif-stat { font-size: 12.5px; font-weight: 700; color: #1468E8; font-family: var(--font-body); }
        @media (max-width: 760px) {
          .hero-inner { padding: 96px 20px 0; }
          .hero-proof-row { flex-direction: column; gap: 14px; margin-bottom: 32px; }
          .hero-ctas { gap: 10px; }
          .hero-ctas > div { width: 100%; }
          .hero-ctas a { width: 100%; justify-content: center; box-sizing: border-box; }
          .hero-stage { padding: 0 16px; }
          .hero-notif { position: static; width: 100%; max-width: 100%; margin-top: 18px; }
          .hero-pill-avatar { width: 22px !important; height: 22px !important; }
          .hero-pill { font-size: 11px !important; padding: 5px 12px 5px 6px !important; gap: 7px !important; }
        }
        @media (max-width: 400px) {
          .hero-inner { padding: 84px 16px 0; }
        }

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
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal, .hero-stage-reveal { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <div className="hero-inner">
        {/* Headline */}
        <h1 className="hero-h1 hero-reveal" style={{ ['--hero-reveal-y' as string]: '18px', ['--hero-reveal-delay' as string]: '0.05s' }}>
          <span style={{ color: '#9CA3AF' }}>Resumes get ignored.</span>{' '}<br className="br-desktop" />
          Reslinks get{' '}
          <span style={{ background: 'linear-gradient(#D7FF43, #D7FF43) no-repeat', backgroundSize: '100% 0.34em', backgroundPosition: '0 calc(100% - 0.1em)', padding: '0 0.05em', WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>watched.</span>
        </h1>

        {/* Subtext */}
        <p className="hero-sub hero-reveal" style={{ ['--hero-reveal-y' as string]: '14px', ['--hero-reveal-delay' as string]: '0.12s' }}>
          One link. Your video intro, your resume, your work.
        </p>

        {/* CTAs */}
        <div className="hero-ctas hero-reveal" style={{ ['--hero-reveal-y' as string]: '12px', ['--hero-reveal-delay' as string]: '0.18s' }}>
          <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
            Get started for free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link href="/oliviastone" className="btn-outline" style={{ fontSize: '15px', padding: '14px 26px' }}>
            See a real Reslink
          </Link>
        </div>

        {/* Social proof row */}
        <div className="hero-proof-row hero-reveal" style={{ ['--hero-reveal-y' as string]: '10px', ['--hero-reveal-delay' as string]: '0.24s' }}>
          <span className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#5C6070', fontSize: '13px', fontWeight: 500, padding: '7px 16px 7px 8px', borderRadius: '100px', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E7EC', boxShadow: '0 2px 8px rgba(6,26,58,0.06)' }}>
            <span style={{ display: 'flex' }}>
              {['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg', '/avatars/a4.jpg', '/avatars/a5.jpg'].map((src, i) => (
                <img key={i} src={src} alt="" width={28} height={28} className="hero-pill-avatar"
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #fff', marginLeft: i === 0 ? 0 : '-8px', objectFit: 'cover', display: 'block' }} />
              ))}
            </span>
            <span><strong style={{ color: '#061A3A', fontWeight: 700 }}>10,000+</strong> job seekers</span>
          </span>
          <Link href="/companies" className="hero-cosell-link">
            <strong>Hiring?</strong> See how teams screen with Reslink
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>

      {/* Living product stage — split card: video (left) + resume (right) */}
      <motion.div style={{ y: stageY }}>
      <div className="hero-stage hero-stage-reveal" style={{ perspective: '1200px', transformOrigin: 'center bottom' }}>
        <div className="hero-frame" style={{ position: 'relative' }}>
            <div className="hero-split">
              {/* Video card */}
              <div className="hero-videocard">
                <video
                  ref={videoRef}
                  src="/videos/hero-pink.mp4"
                  autoPlay muted loop playsInline preload="auto"
                />
                <span className="hero-playing">
                  <motion.span className="hero-playing-dot" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} />
                  <span className="hero-playing-txt">Playing</span>
                </span>
                <div className="hero-vc-overlay">
                  <p className="hero-vc-caption">&ldquo;Ten years making supply chains actually work&hellip;&rdquo;</p>
                  <Link href="/oliviastone" className="hero-vc-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4" /></svg>
                    See a real Reslink
                  </Link>
                  <div className="hero-vc-progress"><span /></div>
                </div>
              </div>

              {/* Resume */}
              <div className="hero-resume-card">
                <div className="hero-resume">
                  <div>
                    <p className="hero-resume-name">Amara Okafor</p>
                    <p className="hero-resume-role">Planning and Supply Chain Specialist · New York</p>
                    <p className="hero-resume-h" style={{ marginTop: '22px' }}>Work experience</p>
                    {EXPERIENCE.map(job => (
                      <div key={job.org} style={{ marginBottom: '14px' }}>
                        <p className="hero-resume-org"><b>{job.org}</b> <span>· {job.period}</span></p>
                        <ul className="hero-resume-pts">
                          {job.points.map(pt => <li key={pt}>{pt}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="hero-resume-aside">
                    <p className="hero-resume-h">Skills</p>
                    <div className="hero-chips">
                      {SKILLS.map(s => <span key={s} className="hero-chip">{s}</span>)}
                    </div>
                    <p className="hero-resume-h" style={{ marginTop: '20px' }}>Languages</p>
                    <div className="hero-chips">
                      {LANGUAGES.map(l => <span key={l} className="hero-chip">{l}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Floating recruiter notification */}
          <motion.div className="hero-notif" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}>
            <div className="hero-notif-top">
              <span className="hero-notif-av"><span>stripe</span></span>
              <div>
                <p className="hero-notif-title">Recruiter at Stripe opened your Reslink</p>
                <p className="hero-notif-time">2 minutes ago</p>
              </div>
            </div>
            <div className="hero-notif-bar"><span /></div>
            <p className="hero-notif-stat">Watched 87% · 52s of 60s</p>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
