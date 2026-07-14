'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    num: '01',
    label: 'Create your account',
    desc: 'Sign up free. Just your name and email. No credit card, no setup fee. Your profile is ready the moment you land.',
    color: '#D8F950',
  },
  {
    num: '02',
    label: 'Upload your resume',
    desc: 'Drop in your PDF and we parse it instantly. Work history, skills, education, all pulled in automatically. No manual entry.',
    color: '#D8F950',
  },
  {
    num: '03',
    label: 'Record your pitch',
    desc: 'Sixty seconds. Our built-in teleprompter scrolls your script on screen so you stay on camera looking natural, not down at notes.',
    color: '#D8F950',
  },
  {
    num: '04',
    label: 'Share & track everything',
    desc: 'Paste your Reslink into any application, email, or LinkedIn. See every recruiter who opens it and every second of video watched.',
    color: '#D8F950',
  },
];

/* ─── Desktop: scroll-driven (position:fixed pin) ─── */
function DesktopHIW() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<'before' | 'pinned' | 'after'>('before');

  useEffect(() => {
    const onScroll = () => {
      const el = spacerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      if (rect.top > 1) {
        setPhase('before');
      } else if (rect.bottom < window.innerHeight - 1) {
        setPhase('after');
        setActive(steps.length - 1);
      } else {
        setPhase('pinned');
        const p = Math.max(0, Math.min(0.9999, -rect.top / total));
        setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) { v.currentTime = 0; v.play().catch(() => {}); }
      else { v.pause(); }
    });
  }, [active]);

  const scrollToStep = (i: number) => {
    const el = spacerRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + total * (i / steps.length) + 8, behavior: 'smooth' });
  };

  const pinStyle: React.CSSProperties = phase === 'pinned'
    ? { position: 'fixed', top: 0, left: 0, right: 0, height: '100vh', zIndex: 5 }
    : phase === 'after'
      ? { position: 'absolute', bottom: 0, left: 0, right: 0, height: '100vh' }
      : { position: 'absolute', top: 0, left: 0, right: 0, height: '100vh' };

  return (
    <div ref={spacerRef} id="how-it-works" style={{ position: 'relative', height: '440vh', background: '#041635' }} className="hiw-desktop">
      <div style={{ ...pinStyle, background: '#041635', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Glow */}
        <div style={{ position: 'absolute', top: '50%', right: '8%', transform: 'translateY(-50%)', width: '620px', height: '620px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(12,99,227,0.18), transparent 65%)', pointerEvents: 'none' }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: '64px', width: '100%', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            {/* Left — step list */}
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 3.6vw, 50px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '40px' }}>
                Four steps to your<br />next interview.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {steps.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <button key={s.num} onClick={() => scrollToStep(i)}
                      style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: '16px', alignItems: 'start', padding: '16px 0', cursor: 'pointer', border: 'none', background: 'none', textAlign: 'left', width: '100%', opacity: isActive ? 1 : 0.45, transition: 'opacity 0.3s' }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, lineHeight: 1.1, color: isActive ? s.color : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}>{s.num}</span>
                      <span>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.01em', color: isActive ? '#fff' : 'rgba(255,255,255,0.55)', lineHeight: 1.15, transition: 'color 0.3s', display: 'block' }}>{s.label}</span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: 'hidden' }}>
                              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontFamily: 'var(--font-body)', paddingTop: '8px' }}>{s.desc}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right — video stage */}
            <div>
              <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', aspectRatio: '20/13', background: '#0B0F1A', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 100px rgba(0,0,0,0.55)' }}>
                {steps.map((s, i) => (
                  <video key={s.num} ref={(el) => { videoRefs.current[i] = el; }}
                    src={`/videos/step-0${i + 1}.mp4`} poster={`/videos/step-0${i + 1}-poster.jpg`}
                    autoPlay muted loop playsInline preload="auto"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === active ? 1 : 0, transition: 'opacity 0.5s ease' }} />
                ))}
                <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(11,15,26,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '6px 13px 6px 10px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: steps[active].color, display: 'inline-block' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>Step {steps[active].num}</span>
                </div>
              </div>
              {/* Progress dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
                {steps.map((s, i) => (
                  <button key={s.num} onClick={() => scrollToStep(i)} style={{ height: '6px', width: i === active ? '48px' : '24px', borderRadius: '3px', background: i <= active ? '#D8F950' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s ease, background 0.3s ease' }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint — bold, directional, hard to miss */}
        {active < steps.length - 1 && (
          <motion.div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(216,249,80,0.1)', border: '1px solid rgba(216,249,80,0.3)', borderRadius: '100px', padding: '7px 16px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Keep scrolling</span>
            </div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="2.5" opacity="0.5" style={{ marginTop: '-11px' }}><polyline points="6 9 12 15 18 9"/></svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── Mobile: tap stepper ─── */
function MobileHIW() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) { v.currentTime = 0; v.play().catch(() => {}); }
      else { v.pause(); }
    });
  }, [active]);

  return (
    <section id="how-it-works" style={{ background: '#041635', padding: '72px 20px 64px' }} className="hiw-mobile-section">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>How it works</p>
        <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 7vw, 40px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
          Four steps to your<br />next interview.
        </h2>
      </div>

      {/* Video */}
      <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/10', background: '#0B0F1A', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
        {steps.map((s, i) => (
          <video key={s.num} ref={(el) => { videoRefs.current[i] = el; }}
            src={`/videos/step-0${i + 1}.mp4`} poster={`/videos/step-0${i + 1}-poster.jpg`}
            autoPlay muted loop playsInline preload="auto"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === active ? 1 : 0, transition: 'opacity 0.5s ease' }} />
        ))}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3, display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(11,15,26,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '5px 12px 5px 9px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D8F950', display: 'inline-block' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>Step {steps[active].num}</span>
        </div>
      </div>

      {/* Step copy */}
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} style={{ minHeight: '90px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#D8F950' }}>{steps[active].num}</span>
            <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>{steps[active].label}</span>
          </div>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{steps[active].desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {steps.map((s, i) => (
          <button key={s.num} onClick={() => setActive(i)} style={{ height: '6px', width: i === active ? '40px' : '20px', borderRadius: '3px', background: i <= active ? '#D8F950' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.3s ease, background 0.3s ease' }} />
        ))}
      </div>

      {/* Prev / Next */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => setActive(i => Math.max(0, i - 1))} disabled={active === 0}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: active === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 600, cursor: active === 0 ? 'default' : 'pointer', fontFamily: 'var(--font-body)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Prev
        </button>
        <button onClick={() => setActive(i => Math.min(steps.length - 1, i + 1))} disabled={active === steps.length - 1}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', background: active === steps.length - 1 ? 'rgba(255,255,255,0.05)' : '#D8F950', border: 'none', color: active === steps.length - 1 ? 'rgba(255,255,255,0.2)' : '#041635', fontSize: '14px', fontWeight: 700, cursor: active === steps.length - 1 ? 'default' : 'pointer', fontFamily: 'var(--font-body)' }}>
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </section>
  );
}

/* ─── Wrapper — CSS controls which version renders ─── */
export default function HowItWorks() {
  return (
    <>
      <style>{`
        .hiw-desktop { display: block; }
        .hiw-mobile-section { display: none; }
        @media (max-width: 860px) {
          .hiw-desktop { display: none !important; }
          .hiw-mobile-section { display: block !important; }
        }
      `}</style>
      <DesktopHIW />
      <MobileHIW />
    </>
  );
}
