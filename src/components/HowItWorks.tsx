'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    tag: 'Sign up',
    label: 'Create your account',
    desc: 'Sign up free. Just your name and email. No credit card, no setup fee. Your profile is ready the moment you land.',
  },
  {
    num: '02',
    tag: 'Import',
    label: 'Upload your resume',
    desc: 'Drop in your PDF and we parse it instantly. Work history, skills, education, all pulled in automatically. No manual entry.',
  },
  {
    num: '03',
    tag: 'Record',
    label: 'Record your pitch',
    desc: 'Sixty seconds. Our built-in teleprompter scrolls your script on screen so you stay on camera looking natural, not down at notes.',
  },
  {
    num: '04',
    tag: 'Share',
    label: 'Share & track everything',
    desc: 'Paste your Reslink into any application, email, or LinkedIn. See every recruiter who opens it and every second of video watched.',
  },
];

const STICKY_BASE = 90;
const STICKY_STEP = 16;

function StepCard({ step, index, active }: { step: typeof steps[0]; index: number; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only the currently topmost (stacked-over) card plays its video — the rest stay paused.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  // Alternate the navy shade so a card sliding over the previous one is clearly a separate card.
  const cardBg = index % 2 === 0 ? '#041635' : '#0A2352';

  return (
    <div
      className="hiw-card-wrap"
      data-hiw-index={index}
      style={{ position: 'sticky', top: `calc(${STICKY_BASE}px + ${index} * ${STICKY_STEP}px)`, marginBottom: '28px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hiw-card"
        style={{ background: cardBg }}
      >
        <div className="hiw-card-glow" />
        <div className="hiw-card-inner">
          {/* Text */}
          <div className="hiw-card-text">
            <div className="hiw-card-labels">
              <span className="hiw-step">Step {step.num}</span>
              <span className="hiw-chip">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#041635', display: 'inline-block' }} />
                {step.tag}
              </span>
            </div>
            <h3 className="hiw-card-title">{step.label}</h3>
            <p className="hiw-card-desc">{step.desc}</p>
          </div>
          {/* Video */}
          <div className="hiw-card-media">
            <video
              ref={videoRef}
              src={`/videos/step-${step.num}.mp4`}
              poster={`/videos/step-${step.num}-poster.jpg`}
              muted loop playsInline preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Figure out which single card is currently "on top" of the stack and only play that one's video.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const compute = () => {
      const wraps = section.querySelectorAll<HTMLDivElement>('.hiw-card-wrap');
      let current = 0;
      // A card counts as "on top" once its top has scrolled up near the sticky trigger
      // zone. Works for the staggered sticky stack on desktop and for normal flow on
      // mobile (where sticky is disabled) since both cases pass the same threshold as
      // the card reaches the top of the viewport.
      wraps.forEach((wrap, i) => {
        const top = wrap.getBoundingClientRect().top;
        if (top <= STICKY_BASE + STICKY_STEP * steps.length) current = i;
      });
      setActive(current);
    };

    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} style={{ background: '#F4F6F9', padding: 'clamp(64px, 8vw, 110px) 24px clamp(48px, 6vw, 80px)' }}>
      <style>{`
        .hiw-inner { max-width: 1080px; margin: 0 auto; }
        .hiw-card {
          position: relative;
          border-radius: 26px;
          padding: clamp(26px, 3.5vw, 52px);
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 -6px 24px rgba(0,0,0,0.28), 0 30px 80px rgba(4,22,53,0.28);
          min-height: 380px;
        }
        .hiw-card-glow {
          position: absolute; top: -30%; right: -8%;
          width: 560px; height: 480px;
          background: radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 62%);
          pointer-events: none;
        }
        .hiw-card-inner {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr 1.08fr; gap: clamp(28px, 4vw, 56px); align-items: center;
        }
        .hiw-card-labels { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
        .hiw-step {
          font-family: var(--font-phudu); font-size: 15px; font-weight: 900;
          color: rgba(255,255,255,0.85); letter-spacing: 0.02em;
          border: 1.5px solid rgba(255,255,255,0.25); border-radius: 100px; padding: 5px 14px;
        }
        .hiw-chip {
          display: inline-flex; align-items: center; gap: 7px;
          background: #D8F950; color: #041635; font-size: 12px; font-weight: 800;
          letter-spacing: 0.06em; text-transform: uppercase; border-radius: 100px;
          padding: 6px 14px; font-family: var(--font-body);
        }
        .hiw-card-title {
          font-family: var(--font-phudu); font-size: clamp(28px, 3.4vw, 44px); font-weight: 900;
          color: #fff; line-height: 0.98; letter-spacing: -0.03em; margin-bottom: 16px;
        }
        .hiw-card-desc {
          font-size: clamp(15px, 1.6vw, 17px); color: rgba(255,255,255,0.55); line-height: 1.65;
          font-family: var(--font-body); max-width: 440px;
        }
        .hiw-card-media {
          position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 16/11;
          border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 24px 60px rgba(0,0,0,0.4); background: #0B0F1A;
        }
        @media (max-width: 760px) {
          .hiw-card-wrap { position: static !important; margin-bottom: 20px !important; }
          .hiw-card-inner { grid-template-columns: 1fr; gap: 24px; }
          .hiw-card-media { order: -1; }
        }
      `}</style>

      <div className="hiw-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 64px)' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(34px, 5vw, 58px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            Four steps to your<br />next interview.
          </h2>
        </motion.div>

        {steps.map((s, i) => (
          <StepCard key={s.num} step={s} index={i} active={i === active} />
        ))}
      </div>
    </section>
  );
}
