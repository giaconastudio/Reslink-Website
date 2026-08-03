'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    tag: 'Step 01 — Sign up',
    label: 'Create your account',
    desc: 'Sign up free in under a minute. Just your name and email — no credit card, no setup fee. Your profile is ready the moment you land.',
    bullets: [
      'Free forever to create and share your first Reslink',
      'No credit card required to get started',
      'Your profile is live in under 60 seconds',
    ],
  },
  {
    num: '02',
    tag: 'Step 02 — Import',
    label: 'Upload your resume',
    desc: 'Drop in your PDF and we parse it instantly — work history, skills, and education all pulled in automatically.',
    bullets: [
      'Parses your existing resume in seconds',
      'No manual re-typing of your work history',
      'Edit anything before you go live',
    ],
  },
  {
    num: '03',
    tag: 'Step 03 — Record',
    label: 'Record your pitch',
    desc: 'Sixty seconds is all it takes. Our built-in teleprompter scrolls your script on screen so you stay on camera, not looking down at notes.',
    bullets: [
      'Built-in teleprompter keeps you on camera',
      'Re-record as many takes as you need',
      'Reslink AI can write your script for you',
    ],
  },
  {
    num: '04',
    tag: 'Step 04 — Share',
    label: 'Share & track everything',
    desc: 'Paste your Reslink into any application, email, or LinkedIn message. See every recruiter who opens it and every second they watch.',
    bullets: [
      'Works anywhere a link or PDF does',
      'See who viewed it and for how long',
      'Know the moment a recruiter engages',
    ],
  },
];

function StepRow({ step, index }: { step: typeof steps[0]; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      className="hiw-row"
      style={{ flexDirection: reversed ? 'row-reverse' : 'row' }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hiw-panel">
        <span className="hiw-tag">{step.tag}</span>
        <h3 className="hiw-title">{step.label}</h3>
        <p className="hiw-desc">{step.desc}</p>
        <ul className="hiw-checklist">
          {step.bullets.map(b => (
            <li key={b}>
              <span className="hiw-check">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              {b}
            </li>
          ))}
        </ul>
        <a href="/get-started" className="hiw-cta">Get started</a>
      </div>

      <div className="hiw-media">
        <div className="hiw-media-bar">
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
          </div>
        </div>
        <video
          src={`/videos/step-${step.num}.mp4`}
          poster={`/videos/step-${step.num}-poster.jpg`}
          autoPlay muted loop playsInline preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#F4F6F9', padding: 'clamp(64px, 8vw, 110px) 24px clamp(48px, 6vw, 80px)' }}>
      <style>{`
        .hiw-inner { max-width: 1080px; margin: 0 auto; }

        .hiw-row {
          display: flex; align-items: center; gap: clamp(28px, 4vw, 60px);
          margin-bottom: clamp(28px, 4vw, 48px);
        }
        .hiw-panel {
          flex: 1; min-width: 0; background: #fff; border: 1px solid #E6E9EF; border-radius: 24px;
          padding: clamp(28px, 3.2vw, 44px);
        }
        .hiw-tag {
          display: inline-block; font-size: 13px; font-weight: 700; color: #0C63E3;
          font-family: var(--font-body); margin-bottom: 16px;
        }
        .hiw-title {
          font-family: var(--font-phudu); font-size: clamp(26px, 2.8vw, 36px); font-weight: 900;
          color: #041635; line-height: 1.02; letter-spacing: -0.03em; margin-bottom: 14px;
        }
        .hiw-desc {
          font-size: 15px; color: #5C6070; line-height: 1.65; font-family: var(--font-body);
          margin-bottom: 22px; max-width: 440px;
        }
        .hiw-checklist { list-style: none; padding: 0; margin: 0 0 26px; display: flex; flex-direction: column; gap: 13px; }
        .hiw-checklist li {
          display: flex; align-items: flex-start; gap: 11px; font-size: 14.5px; color: #041635;
          font-family: var(--font-body); line-height: 1.5;
        }
        .hiw-check {
          width: 19px; height: 19px; border-radius: 50%; background: #16A34A;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
        }
        .hiw-cta {
          display: inline-flex; align-items: center; justify-content: center;
          background: #041635; color: #fff; font-size: 14.5px; font-weight: 700;
          font-family: var(--font-body); text-decoration: none; border-radius: 100px; padding: 12px 26px;
        }

        .hiw-media {
          flex: 1; min-width: 0; border-radius: 16px; overflow: hidden; aspect-ratio: 16/11;
          border: 1px solid #E2E4E9; box-shadow: 0 20px 50px rgba(4,22,53,0.12); background: #0B0F1A;
        }
        .hiw-media-bar { background: #F1F3F5; border-bottom: 1px solid #E2E4E9; padding: 9px 14px; }

        @media (max-width: 760px) {
          .hiw-row { flex-direction: column !important; gap: 20px; }
          .hiw-panel { padding: 26px; }
          .hiw-media { width: 100%; }
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
          <StepRow key={s.num} step={s} index={i} />
        ))}
      </div>
    </section>
  );
}
