'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: '01',
    label: 'Create & Upload',
    title: 'Build your profile in minutes.',
    desc: 'Sign up free, then drop in your existing resume. We parse it instantly — work history, skills, education — all ready to go. No manual entry.',
    color: '#D8F950',
  },
  {
    number: '02',
    label: 'Record Your Pitch',
    title: 'Say hello to your next employer.',
    desc: 'Record a 60–90 second video using our built-in recorder. Our teleprompter overlays your script so you stay on camera looking natural, not down at notes.',
    color: '#BFD7FF',
  },
  {
    number: '03',
    label: 'Share & Track',
    title: 'One link. Every opportunity.',
    desc: 'Your Reslink works everywhere — job applications, email signatures, LinkedIn. See who viewed, how long they watched, and which companies are interested.',
    color: '#C4B5FD',
  },
];

function CreateVisual({ color }: { color: string }) {
  return (
    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#9A9FA8', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>reslink.io — Create account</p>
      {[{ label: 'Full name', val: 'Oliver Stone', focus: true }, { label: 'Email', val: 'oliver@email.com', focus: false }, { label: 'Password', val: '••••••••', focus: false }].map(f => (
        <div key={f.label}>
          <p style={{ fontSize: '10px', fontWeight: 600, color: '#9A9FA8', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>{f.label}</p>
          <div style={{ border: `1.5px solid ${f.focus ? color : '#EEEEF0'}`, borderRadius: '8px', padding: '9px 12px', fontSize: '13px', color: f.focus ? '#041635' : '#C8CBD2', background: '#fff', fontFamily: 'var(--font-body)' }}>{f.val}</div>
        </div>
      ))}
      <div style={{ height: '2px', background: '#EEEEF0', borderRadius: '2px', margin: '4px 0' }} />
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#041635', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>Upload resume</p>
      <div style={{ border: `2px dashed ${color}`, borderRadius: '10px', padding: '18px', textAlign: 'center', background: color === '#D8F950' ? '#F9FFF0' : '#F5F8FF' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>Oliver_Stone_Resume.pdf</p>
        <div style={{ height: '3px', borderRadius: '2px', background: '#EEEEF0', marginTop: '8px' }}>
          <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 1.8, ease: 'easeOut', repeat: Infinity, repeatDelay: 2 }} style={{ height: '100%', borderRadius: '2px', background: color }} />
        </div>
      </div>
      <div style={{ background: color, borderRadius: '8px', padding: '11px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Continue →</div>
    </div>
  );
}

function RecordVisual({ color }: { color: string }) {
  return (
    <div style={{ padding: '20px 28px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>Record your pitch</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#EF4444', fontFamily: 'var(--font-body)' }}>REC 0:34</span>
        </div>
      </div>
      <div style={{ borderRadius: '12px', background: '#0B0F1A', aspectRatio: '4/3', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '16px', position: 'relative', overflow: 'hidden', marginBottom: '12px' }}>
        <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', top: '66px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '48px', borderRadius: '40px 40px 0 0', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(239,68,68,0.2)', borderRadius: '6px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#EF4444', fontFamily: 'var(--font-body)' }}>LIVE</span>
        </div>
        <div style={{ background: 'rgba(4,22,53,0.8)', backdropFilter: 'blur(6px)', borderTop: `1px solid ${color}33`, borderRadius: '8px', padding: '8px 12px', width: '100%' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, color: color, marginBottom: '3px', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Teleprompter</p>
          <motion.p animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>
            Hi, I&apos;m Oliver — a supply chain specialist who&apos;s reduced logistics costs by 23%...
          </motion.p>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
        </div>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EF4444', border: '3px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#fff' }} />
        </div>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#041635"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
        </div>
      </div>
    </div>
  );
}

function ShareVisual({ color }: { color: string }) {
  return (
    <div style={{ padding: '28px' }}>
      <div style={{ border: `1.5px solid ${color}`, borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', background: '#FAFAFA' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>reslink.io/oliverstone</span>
        <div style={{ background: color, borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>Copy</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {[{ label: 'LinkedIn', bg: '#0A66C2', icon: 'L' }, { label: 'Email', bg: '#041635', icon: '@' }, { label: 'Indeed', bg: '#003A9B', icon: 'I' }, { label: 'QR Code', bg: '#6B7280', icon: '⊞' }].map(c => (
          <div key={c.label} style={{ borderRadius: '8px', border: '1px solid #EEEEF0', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>{c.icon}</span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#041635', fontFamily: 'var(--font-body)' }}>{c.label}</span>
          </div>
        ))}
      </div>
      <div style={{ background: '#F7F8FA', borderRadius: '10px', padding: '14px 16px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: '#9A9FA8', marginBottom: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Activity today</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[{ v: '47', l: 'Views' }, { v: '31', l: 'Plays' }, { v: '8', l: 'Clicks' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '22px', fontWeight: 900, color: '#041635', fontFamily: 'var(--font-phudu)', lineHeight: 1 }}>{s.v}</p>
              <p style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const visuals = [
  (c: string) => <CreateVisual color={c} />,
  (c: string) => <RecordVisual color={c} />,
  (c: string) => <ShareVisual color={c} />,
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(0.999, scrolled / total));
      setActiveStep(Math.min(2, Math.floor(progress * 3)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToStep = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: section.offsetTop + (total * (i / 3)) + 10, behavior: 'smooth' });
  };

  const step = steps[activeStep];

  return (
    <div style={{ position: 'relative' }}>
      <section id="how-it-works" ref={sectionRef} style={{ height: '300vh', position: 'relative', background: '#041635' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          <div className="container">
            {/* Label + title */}
            <div style={{ marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 3.5vw, 46px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Up and running in minutes.</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
              {/* Left: step text */}
              <AnimatePresence mode="wait">
                <motion.div key={`text-${activeStep}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28 }}>
                  {/* Step indicators */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                    {steps.map((s, i) => (
                      <button key={i} onClick={() => scrollToStep(i)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '100px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: i === activeStep ? s.color : 'rgba(255,255,255,0.08)', color: i === activeStep ? '#041635' : 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                        <span style={{ fontSize: '10px', opacity: 0.6 }}>0{i + 1}</span>
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '20px' }}>{step.title}</h3>
                  <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '440px' }}>{step.desc}</p>

                  {/* Progress bar */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: '44px' }}>
                    {steps.map((s, i) => (
                      <div key={i} onClick={() => scrollToStep(i)} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= activeStep ? s.color : 'rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right: visual card */}
              <AnimatePresence mode="wait">
                <motion.div key={`card-${activeStep}`} initial={{ opacity: 0, scale: 0.96, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -18 }} transition={{ duration: 0.3 }}
                  style={{ borderRadius: '20px', background: '#fff', border: `2px solid ${step.color}`, overflow: 'hidden', boxShadow: `0 0 0 1px ${step.color}22, 0 32px 80px rgba(0,0,0,0.5)` }}>
                  {visuals[activeStep](step.color)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {activeStep < 2 && (
            <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)' }}>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Gradient bridge: dark → white */}
      <div style={{ height: '80px', background: 'linear-gradient(to bottom, #041635, #ffffff)', pointerEvents: 'none' }} />
    </div>
  );
}
