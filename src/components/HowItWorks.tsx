'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ACCENT = '#D8F950';

const steps = [
  {
    num: '01',
    label: 'Create your account',
    desc: 'Sign up free — just your name and email. No credit card, no setup fee. Your profile is ready the moment you land.',
  },
  {
    num: '02',
    label: 'Upload your resume',
    desc: 'Drop in your PDF and we parse it instantly — work history, skills, education, all pulled in automatically. No manual entry.',
  },
  {
    num: '03',
    label: 'Record your pitch',
    desc: 'Sixty seconds. Our built-in teleprompter scrolls your script on screen so you stay on camera looking natural, not down at notes.',
  },
  {
    num: '04',
    label: 'Share & track everything',
    desc: 'Paste your Reslink into any application, email, or LinkedIn. See every recruiter who opens it and every second of video watched.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Scroll → active step + continuous progress. rAF-throttled so fast touch
  // swipes (which fire far more scroll events than a mouse wheel) still
  // update the timeline fill at a smooth, consistent rate instead of jumping.
  useEffect(() => {
    let ticking = false;
    const measure = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.max(0, Math.min(0.9999, -rect.top / total));
      setProgress(p);
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    measure();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Play only the active video, restart it each time it becomes active
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const scrollToStep = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + total * (i / steps.length) + 8, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="how-it-works" style={{ position: 'relative', height: '440vh', background: '#041635' }}>
      <style>{`
        .hiw-sticky { position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
        .hiw-glow { position: absolute; top: 50%; right: 8%; transform: translateY(-50%); width: 620px; height: 620px; border-radius: 50%; background: radial-gradient(circle, rgba(12,99,227,0.18), transparent 65%); pointer-events: none; }
        .hiw-grid { display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 64px; width: 100%; align-items: center; position: relative; z-index: 1; }
        .hiw-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 14px; font-family: var(--font-body); }
        .hiw-title { font-family: var(--font-phudu); font-size: clamp(30px, 3.6vw, 50px); font-weight: 900; color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 40px; }

        .hiw-list { display: flex; flex-direction: column; }
        .hiw-row { position: relative; display: grid; grid-template-columns: 30px 1fr; gap: 16px; align-items: stretch; cursor: pointer; border: none; background: none; text-align: left; width: 100%; padding: 0; }
        .hiw-row-scroll { position: absolute; top: -10px; right: 14px; z-index: 3; display: none; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.06); backdrop-filter: blur(8px); border: 1.5px solid rgba(216,249,80,0.45); }
        .hiw-marker { display: flex; flex-direction: column; align-items: center; padding-top: 2px; }
        .hiw-dot {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-body); font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.06); border: 2px solid rgba(255,255,255,0.18);
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s, color 0.3s;
        }
        .hiw-dot.reached { background: ${ACCENT}; border-color: ${ACCENT}; color: #041635; box-shadow: 0 0 0 4px rgba(216,249,80,0.18); }
        .hiw-connector { width: 2px; flex: 1; min-height: 24px; margin: 6px 0; background: rgba(255,255,255,0.15); position: relative; overflow: hidden; }
        .hiw-connector-fill { position: absolute; top: 0; left: 0; width: 100%; background: ${ACCENT}; }
        .hiw-rowcontent { padding: 0 0 26px; transition: opacity 0.3s; }
        .hiw-rowlabel { font-family: var(--font-phudu); font-size: 20px; font-weight: 800; letter-spacing: -0.01em; color: #fff; line-height: 1.15; transition: color 0.3s; }
        .hiw-rowdesc { overflow: hidden; }
        .hiw-rowdesc p { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.6; font-family: var(--font-body); padding-top: 8px; max-width: 380px; }

        .hiw-stage { position: relative; border-radius: 18px; overflow: hidden; aspect-ratio: 20/13; background: #0B0F1A; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 40px 100px rgba(0,0,0,0.55); }
        .hiw-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease; }
        .hiw-stage-badge { position: absolute; top: 16px; left: 16px; z-index: 3; display: inline-flex; align-items: center; gap: 7px; background: rgba(11,15,26,0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); border-radius: 100px; padding: 6px 13px 6px 10px; }
        .hiw-stage-badge span { font-size: 12px; font-weight: 700; color: #fff; font-family: var(--font-body); letter-spacing: 0.02em; }

        .hiw-scrollhint { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .hiw-scrollhint span { font-size: 13px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: ${ACCENT}; font-family: var(--font-body); }
        .hiw-scrollhint-ring { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid rgba(216,249,80,0.4); display: flex; align-items: center; justify-content: center; }

        @media (max-width: 860px) {
          /* The fixed navbar sits at top:0 above everything, so a sticky child
             pinned at top:0 too gets its top edge covered by the navbar bar
             instead of docking beneath it. Offset by the navbar's height —
             but keep the full 100vh height (rather than subtracting it) so
             the centered content still gets its navy margin above it instead
             of being squeezed flush against the top with no breathing room. */
          .hiw-sticky { top: 68px; }
          .hiw-grid { grid-template-columns: 1fr; gap: 20px; padding-bottom: 64px; }
          .hiw-stage { order: -1; }
          .hiw-title { margin-bottom: 20px; font-size: 26px; }
          .hiw-eyebrow { margin-bottom: 8px; }
          .hiw-rowcontent { padding-bottom: 16px; }
          .hiw-rowlabel { font-size: 16px; }
          .hiw-rowdesc p { font-size: 13.5px; }
          /* The floating "keep scrolling" hint sits absolutely within a tall,
             centered, overflow:hidden stack — on mobile that combination made
             it unreliably visible, and attaching it to the video card put it
             somewhere that didn't read as pointing at anything useful.
             Anchor it to the last step's row instead, at the same edge
             distance as before, just lower — in line with that title. */
          .hiw-scrollhint { display: none; }
          .hiw-row-scroll { display: flex; }
        }
      `}</style>

      <div className="hiw-sticky">
        <div className="hiw-glow" />
        <div className="container">
          <div className="hiw-grid">
            {/* Left — step timeline */}
            <div>
              <p className="hiw-eyebrow">How it works</p>
              <h2 className="hiw-title">Four steps to your<br />next interview.</h2>

              <div className="hiw-list">
                {steps.map((s, i) => {
                  const isActive = i === active;
                  const reached = i <= active;
                  const connectorFill = Math.max(0, Math.min(1, progress * steps.length - i)) * 100;
                  return (
                    <button key={s.num} className="hiw-row" onClick={() => scrollToStep(i)}>
                      <span className="hiw-marker">
                        <span className={`hiw-dot${reached ? ' reached' : ''}`}>{s.num}</span>
                        {i < steps.length - 1 && (
                          <span className="hiw-connector">
                            <span className="hiw-connector-fill" style={{ height: `${connectorFill}%` }} />
                          </span>
                        )}
                      </span>
                      <span className="hiw-rowcontent" style={{ opacity: isActive ? 1 : 0.5 }}>
                        <span className="hiw-rowlabel" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div className="hiw-rowdesc" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                              <p>{s.desc}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </span>
                      {i === steps.length - 1 && (
                        <motion.span className="hiw-row-scroll" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.3 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.8"><polyline points="6 9 12 15 18 9"/></svg>
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right — pinned video stage */}
            <div className="hiw-stage">
              {steps.map((s, i) => (
                <video
                  key={s.num}
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={`/videos/step-0${i + 1}.mp4`}
                  poster={`/videos/step-0${i + 1}-poster.jpg`}
                  muted loop playsInline preload="metadata"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
              <div className="hiw-stage-badge">
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
                <span>Step {steps[active].num}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint — desktop only; mobile uses the badge anchored to the stage */}
        <div className="hiw-scrollhint">
          <span>Keep scrolling</span>
          <motion.div className="hiw-scrollhint-ring" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.3 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.6"><polyline points="6 9 12 15 18 9"/></svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
