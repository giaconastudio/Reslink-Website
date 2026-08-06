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

  // Scroll → active step. rAF-throttled so fast touch swipes (which fire far
  // more scroll events than a mouse wheel) still update at a smooth rate.
  useEffect(() => {
    let ticking = false;
    const measure = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.max(0, Math.min(0.9999, -rect.top / total));
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
    <section ref={sectionRef} id="how-it-works" style={{ position: 'relative', height: '440vh', background: '#F5F7FA' }}>
      <style>{`
        /* Card-contained, not full-bleed — the navy lives on an inset,
           rounded card sitting on a light page, matching the reference. */
        /* top:68px docks the sticky pin below the fixed navbar (also 68px
           tall) instead of underneath it — without this the navbar painted
           over the card's top edge every time the section pinned. */
        .hiw-sticky { position: sticky; top: 68px; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 16px; }
        /* Centered rather than top-anchored — anchoring to the top left an
           uneven, sometimes very large gap at the bottom on taller screens
           since the content block is shorter than the card's max-height.
           Centering balances the slack evenly on any screen height. */
        .hiw-card {
          position: relative; width: 100%; max-width: 1180px; height: calc(100vh - 68px - 32px); max-height: 640px;
          border-radius: 32px; background: #041635; overflow: hidden;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          box-shadow: 0 40px 100px rgba(4,22,53,0.35);
        }
        .hiw-glow { position: absolute; top: 50%; right: 8%; transform: translateY(-50%); width: 620px; height: 620px; border-radius: 50%; background: radial-gradient(circle, rgba(12,99,227,0.18), transparent 65%); pointer-events: none; }
        .hiw-inner { width: 100%; position: relative; z-index: 1; padding: 0 56px; }
        /* Centered header, like the reference — frees the left column to fit
           all four steps without also carrying the page title inline. */
        .hiw-header { text-align: center; margin-bottom: 40px; }
        .hiw-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 8px; font-family: var(--font-body); }
        .hiw-title { font-family: var(--font-phudu); font-size: clamp(22px, 2.4vw, 32px); font-weight: 900; color: #fff; line-height: 1.02; letter-spacing: -0.03em; }
        .hiw-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 32px; width: 100%; align-items: center; }

        .hiw-list { display: flex; flex-direction: column; gap: 24px; }
        /* Monzo-style step marker — "Step" label over a big plain numeral,
           no circle/connector-line, sitting left of the title+description. */
        .hiw-row { position: relative; display: grid; grid-template-columns: 52px 1fr; gap: 18px; align-items: start; cursor: pointer; border: none; background: none; text-align: left; width: 100%; padding: 0; }
        .hiw-row-scroll { position: absolute; top: -10px; right: 14px; z-index: 3; display: none; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.06); backdrop-filter: blur(8px); border: 1.5px solid rgba(216,249,80,0.45); }
        .hiw-stepnum { display: flex; flex-direction: column; }
        .hiw-stepnum-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 2px; font-family: var(--font-body); transition: color 0.3s; }
        .hiw-stepnum-value { font-family: var(--font-phudu); font-size: 24px; font-weight: 900; line-height: 1; color: rgba(255,255,255,0.35); transition: color 0.3s; }
        .hiw-row.active .hiw-stepnum-label, .hiw-row.active .hiw-stepnum-value { color: ${ACCENT}; }
        .hiw-rowcontent { padding: 0 0 4px; border-radius: 14px; transition: opacity 0.3s, background 0.3s, padding 0.3s; }
        .hiw-rowcontent.active { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); padding: 12px 14px 16px; margin: -12px -14px -4px; }
        .hiw-rowlabel { font-family: var(--font-phudu); font-size: 17px; font-weight: 800; letter-spacing: -0.01em; color: #fff; line-height: 1.15; transition: color 0.3s; }
        .hiw-rowdesc { overflow: hidden; }
        .hiw-rowdesc p { font-size: 13.5px; color: rgba(255,255,255,0.5); line-height: 1.55; font-family: var(--font-body); padding-top: 6px; max-width: 340px; }

        /* Product stage + step rail sit close together as one visual unit */
        .hiw-stage-row { display: flex; align-items: center; justify-content: center; gap: 14px; }
        /* Wide enough that object-fit:cover doesn't crop the video's own
           content off the sides — landscape-leaning, not the earlier
           narrow portrait crop that cut text and fields out of frame.
           Scaled down from an earlier oversized pass per feedback. */
        .hiw-stage { position: relative; width: 100%; max-width: 480px; border-radius: 16px; overflow: hidden; aspect-ratio: 4/3.1; background: #0B0F1A; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .hiw-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease; }
        .hiw-stage-badge { position: absolute; top: 14px; left: 14px; z-index: 3; display: inline-flex; align-items: center; gap: 7px; background: rgba(11,15,26,0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); border-radius: 100px; padding: 6px 13px 6px 10px; }
        .hiw-stage-badge span { font-size: 12px; font-weight: 700; color: #fff; font-family: var(--font-body); letter-spacing: 0.02em; }

        /* Step indicator — a thin rail of dots right beside the stage */
        .hiw-rail { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
        .hiw-rail-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.18); transition: background 0.3s, height 0.3s; }
        .hiw-rail-dot.active { background: ${ACCENT}; height: 20px; border-radius: 3px; }

        /* In normal flow (not absolutely positioned) so it always sits below
           the actual content instead of overlapping it when the video makes
           the centered block taller than expected. */
        .hiw-scrollhint { width: 100%; margin-top: 48px; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .hiw-scrollhint span { font-size: 13px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: ${ACCENT}; font-family: var(--font-body); }
        .hiw-scrollhint-ring { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid rgba(216,249,80,0.4); display: flex; align-items: center; justify-content: center; }

        @media (max-width: 860px) {
          /* .hiw-sticky's top:68px (set in the base rule) docks it below the
             navbar; subtract that same 68px here so the card's own height
             stays within the visible area instead of overflowing past the
             bottom of the screen. */
          .hiw-sticky { padding: 12px; }
          .hiw-card { height: calc(100vh - 68px - 24px); max-height: none; border-radius: 22px; }
          .hiw-inner { padding: 0 20px 40px; }
          .hiw-header { margin-bottom: 12px; }
          .hiw-grid { grid-template-columns: 1fr; gap: 12px; }
          .hiw-list { gap: 8px; }
          .hiw-stage-row { order: -1; }
          .hiw-stage { max-width: 200px; }
          .hiw-title { font-size: 20px; }
          .hiw-eyebrow { margin-bottom: 6px; }
          .hiw-rail { display: none; }
          /* Mobile's vertical budget is razor-thin (title + 4 steps + video
             stacked in one screen-height card) — the active-step highlight
             must not add any net height here, only a background tint, or
             content overflows the fixed-height card and gets clipped by its
             overflow:hidden. No extra vertical padding, just horizontal bleed. */
          .hiw-rowcontent { padding-bottom: 4px; }
          .hiw-rowcontent.active { background: rgba(255,255,255,0.05); border: none; border-radius: 10px; margin: 0 -10px 0 0; padding: 0 10px 8px; }
          .hiw-stepnum-value { font-size: 22px; }
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
        <div className="hiw-card">
          <div className="hiw-glow" />
          <div className="hiw-inner">
            {/* Centered header, spanning the full card width */}
            <div className="hiw-header">
              <p className="hiw-eyebrow">How it works</p>
              <h2 className="hiw-title">Four steps to your next interview.</h2>
            </div>

            <div className="hiw-grid">
              {/* Left — step timeline */}
              <div>
                <div className="hiw-list">
                  {steps.map((s, i) => {
                    const isActive = i === active;
                    return (
                      <button key={s.num} className={`hiw-row${isActive ? ' active' : ''}`} onClick={() => scrollToStep(i)}>
                        {/* Monzo-style marker: a small "Step" label over a
                            plain big numeral — no circle, no connector line. */}
                        <span className="hiw-stepnum">
                          <span className="hiw-stepnum-label">Step</span>
                          <span className="hiw-stepnum-value">{i + 1}</span>
                        </span>
                        {/* Active step stands out in its own highlighted card,
                            like Monzo's "step 1" panel — inactive steps stay
                            as plain, dimmed title-only rows. */}
                        <span className={`hiw-rowcontent${isActive ? ' active' : ''}`} style={{ opacity: isActive ? 1 : 0.5 }}>
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

              {/* Right — pinned video stage, with the step rail sitting right beside it */}
              <div className="hiw-stage-row">
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
                <div className="hiw-rail">
                  {steps.map((s, i) => (
                    <span key={s.num} className={`hiw-rail-dot${i === active ? ' active' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll hint — desktop only; mobile uses the badge anchored to
                the stage. In normal flow now, so it can never overlap the
                video above it regardless of how tall the content gets. */}
            <div className="hiw-scrollhint">
              <span>Keep scrolling</span>
              <motion.div className="hiw-scrollhint-ring" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.3 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.6"><polyline points="6 9 12 15 18 9"/></svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
