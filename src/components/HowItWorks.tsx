'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    label: 'Create your account',
    title: 'Up and running in 30 seconds.',
    desc: 'Sign up free — just your name and email. No credit card, no setup fee. Your profile is ready to build the moment you land.',
  },
  {
    num: '02',
    label: 'Upload your resume',
    title: 'Your existing resume, supercharged.',
    desc: 'Drop in your PDF and we parse it instantly — work history, skills, education, all pulled in automatically. No manual entry.',
  },
  {
    num: '03',
    label: 'Record your pitch',
    title: 'Say hello to your next employer.',
    desc: '60 seconds. Our built-in teleprompter scrolls your script right on screen so you stay on camera looking natural, not down at notes.',
  },
  {
    num: '04',
    label: 'Share & track everything',
    title: 'One link. Infinite reach.',
    desc: 'Paste your Reslink into any job application, email, or LinkedIn. See every recruiter who opens it, every second of video watched.',
  },
];

const accentColors = ['#D8F950', '#BFD7FF', '#FFD6A5', '#C4B5FD'];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#F7F8FA', padding: '100px 0' }}>
      <style>{`
        .hiw-header {
          text-align: center;
          margin-bottom: 72px;
        }
        .hiw-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0C63E3;
          margin-bottom: 14px;
          font-family: var(--font-body);
        }
        .hiw-title {
          font-family: var(--font-phudu);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 900;
          color: #041635;
          line-height: 0.95;
          letter-spacing: -0.03em;
        }
        .hiw-steps {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .hiw-step {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          padding: 64px 0;
          border-top: 1px solid #E4E7EC;
        }
        .hiw-step:last-child { border-bottom: 1px solid #E4E7EC; }
        .hiw-step.reverse .hiw-step-visual { order: -1; }
        .hiw-step-num {
          font-family: var(--font-phudu);
          font-size: 120px;
          font-weight: 900;
          line-height: 1;
          color: #E4E8EE;
          letter-spacing: -0.04em;
          margin-bottom: -16px;
        }
        .hiw-step-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 12px;
          font-family: var(--font-body);
        }
        .hiw-step-heading {
          font-family: var(--font-phudu);
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 900;
          color: #041635;
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .hiw-step-desc {
          font-size: 16px;
          color: #5C6070;
          line-height: 1.7;
          font-family: var(--font-body);
          max-width: 400px;
        }
        .hiw-step-visual {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #E4E7EC;
          box-shadow: 0 12px 40px rgba(4,22,53,0.07);
          aspect-ratio: 20/13;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative;
        }
        .hiw-placeholder-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hiw-placeholder-text {
          font-size: 12px;
          color: #C8CBD2;
          font-family: var(--font-body);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        @media (max-width: 768px) {
          .hiw-step {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 48px 0;
          }
          .hiw-step.reverse .hiw-step-visual { order: 0; }
          .hiw-step-num { font-size: 80px; margin-bottom: -10px; }
          .hiw-step-visual { aspect-ratio: 20/13; }
        }
      `}</style>

      <div className="container">
        <motion.div className="hiw-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="hiw-label">How it works</p>
          <h2 className="hiw-title">Four steps to your<br />next interview.</h2>
        </motion.div>

        <div className="hiw-steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className={`hiw-step${i % 2 === 1 ? ' reverse' : ''}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              {/* Text side */}
              <div>
                <div className="hiw-step-num">{step.num}</div>
                <p className="hiw-step-label" style={{ color: accentColors[i] }}>
                  {step.label}
                </p>
                <h3 className="hiw-step-heading">{step.title}</h3>
                <p className="hiw-step-desc">{step.desc}</p>
              </div>

              {/* Step animation */}
              <div className="hiw-step-visual" style={{ background: '#0B0F1A' }}>
                <video
                  src={`/videos/step-0${i + 1}.mp4`}
                  poster={`/videos/step-0${i + 1}-poster.jpg`}
                  autoPlay muted loop playsInline preload="metadata"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', bottom: '12px', left: '16px', fontSize: '11px', fontWeight: 700, color: accentColors[i], letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', zIndex: 2, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>Step {i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
