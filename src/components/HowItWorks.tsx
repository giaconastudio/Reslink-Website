'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    num: '01',
    label: 'Create your account',
    title: 'Up and running in 30 seconds.',
    desc: 'Sign up free — just your name and email. No credit card, no setup fee. Your profile is ready the moment you land.',
    color: '#D8F950',
  },
  {
    num: '02',
    label: 'Upload your resume',
    title: 'Your existing resume, supercharged.',
    desc: 'Drop in your PDF and we parse it instantly — work history, skills, education, all pulled in automatically. No manual entry.',
    color: '#D8F950',
  },
  {
    num: '03',
    label: 'Record your pitch',
    title: 'Say hello to your next employer.',
    desc: 'Sixty seconds. Our built-in teleprompter scrolls your script on screen so you stay on camera looking natural, not down at notes.',
    color: '#D8F950',
  },
  {
    num: '04',
    label: 'Share & track everything',
    title: 'One link. Infinite reach.',
    desc: 'Paste your Reslink into any application, email, or LinkedIn. See every recruiter who opens it and every second of video watched.',
    color: '#D8F950',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Desktop: scroll-driven step
  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.max(0, Math.min(0.9999, -rect.top / total));
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  // Mobile: manual only — no auto-advance

  // Play only the active video in the visible layout
  useEffect(() => {
    const refs = isMobile ? mobileVideoRefs.current : desktopVideoRefs.current;
    refs.forEach((v, i) => {
      if (!v) return;
      if (i === active) { v.currentTime = 0; v.play().catch(() => {}); }
      else { v.pause(); }
    });
  }, [active, isMobile]);

  const scrollToStep = (i: number) => {
    if (isMobile) { setActive(i); return; }
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + total * (i / steps.length) + 8, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{ position: 'relative', height: isMobile ? 'auto' : '440vh', background: '#041635' }}
    >
      <style>{`
        .hiw-sticky { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; overflow: hidden; }
        .hiw-glow { position: absolute; top: 50%; right: 8%; transform: translateY(-50%); width: 620px; height: 620px; border-radius: 50%; background: radial-gradient(circle, rgba(12,99,227,0.18), transparent 65%); pointer-events: none; }
        .hiw-grid { display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 64px; width: 100%; align-items: center; position: relative; z-index: 1; }
        .hiw-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #D8F950; margin-bottom: 14px; font-family: var(--font-body); }
        .hiw-title { font-family: var(--font-phudu); font-size: clamp(30px, 3.6vw, 50px); font-weight: 900; color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 40px; }
        .hiw-list { display: flex; flex-direction: column; }
        .hiw-row { display: grid; grid-template-columns: 44px 1fr; gap: 16px; align-items: start; padding: 16px 0; cursor: pointer; border: none; background: none; text-align: left; width: 100%; transition: opacity 0.3s; }
        .hiw-rownum { font-family: var(--font-phudu); font-size: 22px; font-weight: 900; line-height: 1.1; transition: color 0.3s; }
        .hiw-rowlabel { font-family: var(--font-phudu); font-size: 20px; font-weight: 800; letter-spacing: -0.01em; color: #fff; line-height: 1.15; transition: color 0.3s; }
        .hiw-rowdesc { overflow: hidden; }
        .hiw-rowdesc p { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.6; font-family: var(--font-body); padding-top: 8px; }

        .hiw-stage { position: relative; border-radius: 18px; overflow: hidden; aspect-ratio: 20/13; background: #0B0F1A; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 40px 100px rgba(0,0,0,0.55); }
        .hiw-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease; }
        .hiw-stage-badge { position: absolute; top: 16px; left: 16px; z-index: 3; display: inline-flex; align-items: center; gap: 7px; background: rgba(11,15,26,0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); border-radius: 100px; padding: 6px 13px 6px 10px; }
        .hiw-stage-badge span { font-size: 12px; font-weight: 700; color: #fff; font-family: var(--font-body); letter-spacing: 0.02em; }

        /* Mobile stepper layout */
        .hiw-mobile { display: none; padding: 72px 20px 64px; }
        .hiw-mob-stage { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 16/10; background: #0B0F1A; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; }
        .hiw-mob-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s ease; }
        .hiw-mob-copy { min-height: 120px; }
        .hiw-mob-dots { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }

        @media (max-width: 860px) {
          .hiw-sticky { display: none; }
          .hiw-mobile { display: block; }
        }
      `}</style>

      {/* ── Desktop: scroll-driven sticky ── */}
      <div className="hiw-sticky">
        <div className="hiw-glow" />
        <div className="container">
          <div className="hiw-grid">
            <div>
              <p className="hiw-eyebrow">How it works</p>
              <h2 className="hiw-title">Four steps to your<br />next interview.</h2>
              <div className="hiw-list">
                {steps.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button key={s.num} className="hiw-row" onClick={() => scrollToStep(i)} style={{ opacity: isActive ? 1 : 0.5 }}>
                      <span className="hiw-rownum" style={{ color: isActive ? s.color : 'rgba(255,255,255,0.3)' }}>{s.num}</span>
                      <span>
                        <span className="hiw-rowlabel" style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}>{s.label}</span>
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
            </div>

            <div>
              <div className="hiw-stage">
                {steps.map((s, i) => (
                  <video key={s.num} ref={(el) => { desktopVideoRefs.current[i] = el; }} src={`/videos/step-0${i + 1}.mp4`} poster={`/videos/step-0${i + 1}-poster.jpg`} muted loop playsInline preload="metadata" style={{ opacity: i === active ? 1 : 0 }} />
                ))}
                <div className="hiw-stage-badge">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: steps[active].color, display: 'inline-block' }} />
                  <span>Step {steps[active].num}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
                {steps.map((s, i) => (
                  <button key={s.num} onClick={() => scrollToStep(i)} style={{ height: '6px', width: i === active ? '48px' : '24px', borderRadius: '3px', background: i <= active ? '#D8F950' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s ease, background 0.3s ease' }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {active < steps.length - 1 && (
          <motion.div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Scroll to explore</span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" style={{ marginTop: '-8px' }}><polyline points="6 9 12 15 18 9"/></svg>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ── Mobile: tap-through stepper ── */}
      <div className="hiw-mobile">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>How it works</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em' }}>Four steps to your<br />next interview.</h2>
        </div>

        {/* Video stage */}
        <div className="hiw-mob-stage">
          {steps.map((s, i) => (
            <video key={s.num} ref={(el) => { mobileVideoRefs.current[i] = el; }} src={`/videos/step-0${i + 1}.mp4`} poster={`/videos/step-0${i + 1}-poster.jpg`} muted loop playsInline preload="metadata" style={{ opacity: i === active ? 1 : 0 }} />
          ))}
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(11,15,26,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '5px 12px 5px 9px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D8F950', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>Step {steps[active].num}</span>
          </div>
        </div>

        {/* Step copy */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="hiw-mob-copy"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#D8F950' }}>{steps[active].num}</span>
              <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>{steps[active].label}</span>
            </div>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{steps[active].desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots + nav */}
        <div className="hiw-mob-dots">
          {steps.map((s, i) => (
            <button key={s.num} onClick={() => setActive(i)} style={{ height: '6px', width: i === active ? '40px' : '20px', borderRadius: '3px', background: i <= active ? '#D8F950' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s ease, background 0.3s ease' }} />
          ))}
        </div>

        {/* Prev / Next */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={() => setActive(i => Math.max(0, i - 1))} disabled={active === 0} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: active === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 600, cursor: active === 0 ? 'default' : 'pointer', fontFamily: 'var(--font-body)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Prev
          </button>
          <button onClick={() => setActive(i => Math.min(steps.length - 1, i + 1))} disabled={active === steps.length - 1} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', background: active === steps.length - 1 ? 'rgba(255,255,255,0.05)' : '#D8F950', border: 'none', color: active === steps.length - 1 ? 'rgba(255,255,255,0.2)' : '#041635', fontSize: '14px', fontWeight: 700, cursor: active === steps.length - 1 ? 'default' : 'pointer', fontFamily: 'var(--font-body)' }}>
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
