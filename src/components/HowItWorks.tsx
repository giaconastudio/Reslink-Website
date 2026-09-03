'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Per-step background — the whole card changes colour as you move through the
// steps. Dark grounds so the white text and the lime accent stay readable on
// every one; solid colours so they cross-fade smoothly.
const steps = [
  {
    num: '01',
    label: 'Create your account',
    desc: 'Just your name and email. No card, no setup.',
    bg: '#071733',
  },
  {
    num: '02',
    label: 'Upload your resume',
    desc: 'Drop in your PDF and we parse it instantly. No manual entry.',
    bg: '#9E2462',
  },
  {
    num: '03',
    label: 'Record your pitch',
    desc: 'Sixty seconds. Our teleprompter scrolls your script so you stay looking at the camera.',
    bg: '#3C6B18',
  },
  {
    num: '04',
    label: 'Share and track everything',
    desc: 'Paste your Reslink into any application, email or LinkedIn, and see every recruiter who opens it.',
    bg: '#0B44A6',
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
    const sectionTop = window.scrollY + el.getBoundingClientRect().top;
    const total = el.offsetHeight - window.innerHeight;
    // Land in the MIDDLE of the step's scroll band, not at its leading edge —
    // robust to landing a few px off, which otherwise dropped you into the
    // previous step. 'instant' (NOT 'auto') is required: globals.css sets
    // html { scroll-behavior: smooth }, and 'auto' defers to that — so the jump
    // became a long smooth scroll that got interrupted mid-way and landed short
    // (click 4 from 1 → step 2). 'instant' force-overrides the CSS and snaps
    // straight to the clicked step; the card is pinned so only the step swaps.
    window.scrollTo({ top: sectionTop + total * ((i + 0.5) / steps.length), behavior: 'instant' as ScrollBehavior });
  };

  const activeAccent = '#D7FF43';

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
          position: relative; width: 100%; max-width: 1180px; height: calc(100vh - 68px - 32px); max-height: 700px;
          border-radius: 32px; overflow: hidden;
          background: linear-gradient(160deg, #0A1E44 0%, #05173A 52%, #061A3A 100%);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          box-shadow: 0 40px 100px rgba(6,26,58,0.4);
        }
        .hiw-glow { position: absolute; top: 50%; right: 8%; transform: translateY(-50%); width: 620px; height: 620px; border-radius: 50%; background: radial-gradient(circle, rgba(20,104,232,0.18), transparent 65%); pointer-events: none; }
        .hiw-inner { width: 100%; position: relative; z-index: 1; padding: 0 56px; }
        /* Centered header, like the reference — frees the left column to fit
           all four steps without also carrying the page title inline. */
        /* vh-relative rather than a fixed px value — opens up generously on
           normal/tall viewports but automatically tightens on short ones,
           so the card never has to clip content to stay under its cap. */
        .hiw-header { text-align: center; margin-bottom: clamp(24px, 4.5vh, 40px); }
        .hiw-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--hiw-accent); margin-bottom: 10px; font-family: var(--font-body); }
        .hiw-title { font-family: var(--font-phudu); font-size: clamp(24px, 2.9vw, 40px); font-weight: 900; color: #fff; line-height: 1.0; letter-spacing: -0.035em; }
        .hiw-hl { color: #ffffff; }
        .hiw-cta { margin-top: clamp(14px, 2.5vh, 22px); }
        .hiw-grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 32px; width: 100%; align-items: center; }

        .hiw-list { display: flex; flex-direction: column; gap: clamp(16px, 3.5vh, 30px); }
        /* Monzo-style step marker — "Step" label over a big plain numeral,
           no circle/connector-line, sitting left of the title+description. */
        .hiw-row { position: relative; display: grid; grid-template-columns: 52px 1fr; gap: 18px; align-items: start; cursor: pointer; border: none; background: none; text-align: left; width: 100%; padding: 0; }
        .hiw-row-scroll { display: none; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.06); backdrop-filter: blur(8px); border: 1.5px solid rgba(215,255,67,0.45); margin: 12px auto 0; }
        .hiw-stepnum { display: flex; flex-direction: column; }
        .hiw-stepnum-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 2px; font-family: var(--font-body); transition: color 0.3s; }
        .hiw-stepnum-value { font-family: var(--font-phudu); font-size: 24px; font-weight: 900; line-height: 1; color: rgba(255,255,255,0.5); transition: color 0.3s, font-size 0.3s, transform 0.3s; }
        .hiw-row.active .hiw-stepnum-label, .hiw-row.active .hiw-stepnum-value { color: var(--hiw-accent); }
        .hiw-row.active .hiw-stepnum-value { font-size: 34px; }
        /* Hover affordance — inactive steps brighten so it's clear they're clickable */
        .hiw-row:not(.active):hover .hiw-rowcontent { opacity: 0.8 !important; }
        .hiw-row:not(.active):hover .hiw-stepnum-label, .hiw-row:not(.active):hover .hiw-stepnum-value { color: rgba(255,255,255,0.7); }
        .hiw-rowcontent { padding: 0 0 4px; border-radius: 14px; transition: opacity 0.3s, background 0.3s, padding 0.3s; }
        .hiw-rowcontent.active { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); box-shadow: inset 3px 0 0 var(--hiw-accent); padding: 12px 16px 16px; margin: -12px -16px -4px; }
        .hiw-rowlabel { font-family: var(--font-phudu); font-size: 19px; font-weight: 800; letter-spacing: -0.01em; color: #fff; line-height: 1.15; transition: color 0.3s; }
        .hiw-rowdesc { overflow: hidden; }
        .hiw-rowdesc p { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.55; font-family: var(--font-body); padding-top: 6px; max-width: 340px; }

        /* Product stage + step rail sit close together as one visual unit */
        .hiw-stage-row { display: flex; align-items: center; justify-content: center; gap: 14px; }
        /* Wide enough that object-fit:cover doesn't crop the video's own
           content off the sides — landscape-leaning, not the earlier
           narrow portrait crop that cut text and fields out of frame.
           Scaled down from an earlier oversized pass per feedback. */
        .hiw-stage { position: relative; width: 100%; max-width: 480px; border-radius: 18px; overflow: hidden; aspect-ratio: 4/3.1; background: #0B0F1A; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 34px 90px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.05); }
        .hiw-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.4s ease, transform 0.55s cubic-bezier(0.4, 0, 0.2, 1); }
        .hiw-stage-badge { position: absolute; top: 14px; left: 14px; z-index: 3; display: inline-flex; align-items: center; gap: 7px; background: rgba(11,15,26,0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); border-radius: 100px; padding: 6px 13px 6px 10px; }
        .hiw-stage-badge span { font-size: 12px; font-weight: 700; color: #fff; font-family: var(--font-body); letter-spacing: 0.02em; }

        /* Step indicator — a thin rail of dots right beside the stage */
        .hiw-rail { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
        .hiw-rail-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.18); transition: background 0.3s, height 0.3s; }
        .hiw-rail-dot.active { background: var(--hiw-accent); height: 20px; border-radius: 3px; }

        @media (max-width: 860px) {
          /* .hiw-sticky's top:68px (set in the base rule) docks it below the
             navbar; subtract that same 68px here so the card stays within
             the visible area instead of overflowing past the bottom. */
          .hiw-sticky { padding: 8px; }
          /* Height follows the content (capped to the screen) rather than
             being pinned to the full viewport. The fixed height left a big
             band of empty navy under step 4 on tall phones, and forced the
             video to be shrunk to fit a budget that was never actually
             tight — content here is ~200px shorter than the card was. */
          .hiw-card { height: auto; max-height: calc(100vh - 68px - 16px); border-radius: 22px; }
          /* Spacing is vh-relative so it opens right up on a tall phone (where
             the uncropped video leaves ~150px spare) and tightens by itself on
             short ones, instead of one hardcoded value that is either cramped
             or overflowing depending on the device. */
          .hiw-inner { padding: clamp(18px, 3vh, 34px) 16px; }
          .hiw-header { margin-bottom: clamp(14px, 2.8vh, 28px); }
          /* min-width:0 — grid items otherwise refuse to shrink below their
             content's intrinsic width and overflow the collapsed column. */
          .hiw-grid { grid-template-columns: 1fr; gap: clamp(16px, 3vh, 30px); }
          .hiw-grid > * { min-width: 0; }
          .hiw-list { gap: clamp(13px, 3.2vh, 30px); }
          .hiw-stage-row { order: -1; }
          /* Native 1600x1040 aspect — do NOT crop this. A single sampled frame
             makes the videos look like they have wide dead margins, but they
             pan and zoom: sampled across each clip's full duration, step 1
             fills x0-1596, step 3 reaches x1488 and step 4 x1352. Any
             symmetric crop tight enough to matter cuts real UI (an earlier
             1.04 framing chopped the recording panel off step 3). With
             object-fit:cover, matching the source aspect exactly means
             nothing is ever cropped.
             The cap keeps tablets sane; they hit this breakpoint too. */
          .hiw-stage { max-width: 460px; aspect-ratio: 1600 / 1040; }
          .hiw-title { font-size: 22px; }
          .hiw-cta { margin-top: 16px; padding: 11px 20px !important; font-size: 13.5px !important; }
          .hiw-eyebrow { margin-bottom: 7px; }
          .hiw-rail { display: none; }
          /* The active row grows by revealing its description, so its
             highlight stays a light tint with only horizontal bleed — it
             must not add net height that pushes content past the cap. */
          /* "Step" sits beside the numeral rather than above it here. Stacked,
             the marker was ~35px tall and set each row's height on its own —
             taller than the title next to it — which is most of what made the
             list as tall as the video. Inline, the row collapses to its
             title's height. */
          .hiw-row { grid-template-columns: 56px 1fr; gap: 12px; }
          .hiw-stepnum { flex-direction: row; align-items: baseline; gap: 5px; }
          .hiw-stepnum-label { margin-bottom: 0; }
          .hiw-rowcontent { padding-bottom: 4px; }
          .hiw-rowcontent.active { background: rgba(255,255,255,0.05); border: none; border-radius: 10px; margin: 0 -10px 0 0; padding: 0 10px 8px; }
          .hiw-stepnum-value { font-size: 21px; }
          .hiw-row.active .hiw-stepnum-value { font-size: 27px; }
          .hiw-rowlabel { font-size: 16px; }
          .hiw-rowdesc p { font-size: 13.5px; }
          /* Kept in normal flow, centred under the list. Both previous
             attempts — absolutely positioned inside the last step's row, then
             floating in the card's bottom padding — ended up drawn over step
             4's label. In flow it simply cannot overlap anything. */
          .hiw-row-scroll { display: flex; position: static; margin: clamp(12px, 2.4vh, 22px) auto 0; }
        }

        /* Phones only. The card is ~370px wide here, so width is the single
           lever for making the demo bigger — the stage breaks out of
           .hiw-inner's padding and runs the full card width. Full-bleed reads
           as a media band rather than a floating thumbnail, so the side
           radius and borders come off with it. Tablets keep the capped,
           inset stage from the rule above. */
        @media (max-width: 600px) {
          .hiw-stage-row { margin: 0 -16px; }
          .hiw-stage { max-width: none; border-radius: 0; border-left: none; border-right: none; }
          /* The in-card CTA is dropped on phones. It duplicates the "Get
             started" button in the sticky navbar, which is on screen the
             whole time this section is pinned, and reclaiming its ~50px is
             what lets the demo and the steps breathe here. */
          .hiw-cta { display: none; }
        }

        /* Short phones (SE-sized, and anything in landscape) genuinely cannot
           fit header + a large video + four steps in one screen height. The
           52vh stage cap above is width-bound at these sizes, so it doesn't
           shrink on its own — tighten the spacing and cap the stage far
           harder here, rather than letting the card clip its own content. */
        @media (max-width: 860px) and (max-height: 760px) {
          .hiw-inner { padding: 16px 20px; }
          .hiw-header { margin-bottom: 12px; }
          .hiw-title { font-size: 19px; }
          .hiw-cta { margin-top: 10px; padding: 9px 16px !important; font-size: 12.5px !important; }
          .hiw-grid { gap: 12px; }
          /* No list-gap override here — the vh clamp above already tightens
             it to ~21px at this height, and the uncropped (shorter) video
             leaves enough room to keep the steps from bunching up. */
          /* Not enough height here for the full-bleed treatment, so the stage
             stays a smaller inset panel — which means putting back the radius
             and side borders the full-bleed rule above removes. */
          .hiw-stage-row { margin: 0; }
          .hiw-stage { max-width: min(340px, 40vh); border-radius: 14px; border-left: 1px solid rgba(255,255,255,0.12); border-right: 1px solid rgba(255,255,255,0.12); }
          .hiw-rowlabel { font-size: 15px; }
          .hiw-rowdesc p { font-size: 12.5px; }
          .hiw-stepnum-value { font-size: 18px; }
          .hiw-row.active .hiw-stepnum-value { font-size: 23px; }
          .hiw-row { grid-template-columns: 38px 1fr; gap: 11px; }
        }
      `}</style>

      <div className="hiw-sticky">
        <div className="hiw-card" style={{ ['--hiw-accent' as string]: activeAccent }}>
          <div className="hiw-glow" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 65%)' }} />
          <div className="hiw-inner">
            {/* Centered header, spanning the full card width */}
            <div className="hiw-header">
              <p className="hiw-eyebrow">How it works</p>
              <h2 className="hiw-title">Five minutes, start to finish</h2>
              <Link href="/get-started" className="btn-primary hiw-cta">
                Get started for free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
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
                        <span className={`hiw-rowcontent${isActive ? ' active' : ''}`} style={{ opacity: isActive ? 1 : 0.92 }}>
                          <span className="hiw-rowlabel" style={{ color: isActive ? 'var(--hiw-accent)' : '#fff' }}>{s.label}</span>
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div className="hiw-rowdesc" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                                <p>{s.desc}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* "Keep scrolling" hint. Sits below the list as its own
                    centered element — it used to be absolutely positioned
                    inside the last step's row, where it overlapped that
                    row's label on mobile. */}
                <motion.span className="hiw-row-scroll" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.3 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={activeAccent} strokeWidth="2.8"><polyline points="6 9 12 15 18 9"/></svg>
                </motion.span>
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
                      style={{ opacity: i === active ? 1 : 0, transform: `translateY(${(i - active) * 100}%)` }}
                    />
                  ))}
                  <div className="hiw-stage-badge">
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeAccent, display: 'inline-block', transition: 'background 0.4s ease' }} />
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

          </div>
        </div>
      </div>
    </section>
  );
}
