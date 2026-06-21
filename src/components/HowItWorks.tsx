'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: '01', label: 'Create account',
    title: 'Sign up in 30 seconds.',
    desc: "Create your free Reslink profile. No credit card, no setup fee — just your name and email and you're in.",
    color: '#D8F950',
  },
  {
    number: '02', label: 'Upload resume',
    title: 'Your existing resume, supercharged.',
    desc: 'Drop your PDF and we instantly parse it to build your profile. Your work history, skills, and education — all ready to go.',
    color: '#BFD7FF',
  },
  {
    number: '03', label: 'Record pitch',
    title: 'Say hello to your next employer.',
    desc: "Record a 60–90 second video pitch using our built-in recorder or upload one you already have. Our teleprompter keeps you on track so you never lose your train of thought.",
    color: '#FFD6A5',
  },
  {
    number: '04', label: 'Share everywhere',
    title: 'One link. Infinite opportunities.',
    desc: 'Share your Reslink in job applications, email signatures, LinkedIn, or anywhere else. Track every view, every play, and every recruiter who opens your profile.',
    color: '#C4B5FD',
  },
];

function SignupVisual() {
  return (
    <div style={{ padding: '28px' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>Create your account</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[{ label: 'Full name', val: 'Oliver Stone', active: true }, { label: 'Email', val: 'oliver@email.com', active: false }, { label: 'Password', val: '••••••••', active: false }].map(f => (
          <div key={f.label}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)' }}>{f.label}</p>
            <div style={{ border: `1.5px solid ${f.active ? '#0C63E3' : '#EEEEF0'}`, borderRadius: '8px', padding: '9px 12px', fontSize: '13px', color: f.active ? '#041635' : '#C8CBD2', background: '#fff', fontFamily: 'var(--font-body)' }}>{f.val}</div>
          </div>
        ))}
        <div style={{ marginTop: '4px', background: '#D8F950', borderRadius: '8px', padding: '11px', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Create free account</div>
      </div>
    </div>
  );
}

function UploadVisual() {
  return (
    <div style={{ padding: '28px' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>Upload your resume</p>
      <div style={{ border: '2px dashed #D8F950', borderRadius: '12px', padding: '28px 20px', textAlign: 'center', background: '#F9FFF0', marginBottom: '14px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>Drop your resume here</p>
        <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>PDF, DOC, DOCX up to 10MB</p>
      </div>
      <div style={{ borderRadius: '10px', border: '1px solid #EEEEF0', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', background: '#fff' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>Oliver_Stone_Resume.pdf</p>
          <div style={{ height: '4px', borderRadius: '2px', background: '#EEEEF0', marginTop: '5px' }}>
            <motion.div animate={{ width: ['0%', '100%', '100%', '0%'] }} transition={{ duration: 2.5, ease: 'easeOut', repeat: Infinity, repeatDelay: 1 }} style={{ height: '100%', borderRadius: '2px', background: '#D8F950' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RecordVisual() {
  return (
    <div style={{ padding: '20px 28px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>Record your pitch</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#EF4444', fontFamily: 'var(--font-body)' }}>REC 0:34</span>
        </div>
      </div>
      <div style={{ borderRadius: '10px', background: '#041635', aspectRatio: '4/3', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '14px', position: 'relative', overflow: 'hidden', marginBottom: '12px' }}>
        <div style={{ position: 'absolute', top: '22px', left: '50%', transform: 'translateX(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ position: 'absolute', top: '64px', left: '50%', transform: 'translateX(-50%)', width: '76px', height: '46px', borderRadius: '38px 38px 0 0', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1 }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
          </div>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#EF4444', border: '3px solid rgba(255,255,255,0.3)' }} />
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="5" y="2" width="4" height="20"/><rect x="15" y="2" width="4" height="20"/></svg>
          </div>
        </div>
      </div>
      <div style={{ borderRadius: '8px', background: '#041635', padding: '10px 14px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, color: '#D8F950', marginBottom: '4px', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Teleprompter</p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>Hi, I&apos;m Oliver — a supply chain operations specialist with 6 years of experience optimizing global logistics...</p>
      </div>
    </div>
  );
}

function ShareVisual() {
  return (
    <div style={{ padding: '28px' }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: '#041635', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Share your Reslink</p>
      <div style={{ borderRadius: '10px', border: '1.5px solid #D8F950', padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', background: '#FDFFF0' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>reslink.io/oliverstone</span>
        <button style={{ background: '#D8F950', border: 'none', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', fontWeight: 700, color: '#041635', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Copy</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        {[{ label: 'LinkedIn', color: '#0A66C2' }, { label: 'Email', color: '#041635' }, { label: 'Indeed', color: '#2164F3' }, { label: 'QR Code', color: '#6B7280' }].map(c => (
          <div key={c.label} style={{ borderRadius: '8px', border: '1px solid #EEEEF0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: c.color, flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#041635', fontFamily: 'var(--font-body)' }}>{c.label}</span>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: '10px', background: '#F7F8FA', padding: '12px 14px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, color: '#9A9FA8', marginBottom: '8px', fontFamily: 'var(--font-body)' }}>Link activity today</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[{ v: '47', l: 'Views' }, { v: '31', l: 'Plays' }, { v: '8', l: 'Clicks' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '20px', fontWeight: 900, color: '#041635', fontFamily: 'var(--font-phudu)' }}>{s.v}</p>
              <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const visuals = [<SignupVisual key={0} />, <UploadVisual key={1} />, <RecordVisual key={2} />, <ShareVisual key={3} />];

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
      setActiveStep(Math.min(3, Math.floor(progress * 4)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToStep = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: section.offsetTop + (total * (i / 4)) + 10, behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" ref={sectionRef} style={{ height: '400vh', position: 'relative', background: '#041635' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="container">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 3.5vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>Up and running in minutes.</h2>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {steps.map((s, i) => (
                <button key={i} onClick={() => scrollToStep(i)} style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s', background: i === activeStep ? steps[activeStep].color : 'rgba(255,255,255,0.1)', color: i === activeStep ? '#041635' : 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div key={`text-${activeStep}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '56px', fontWeight: 900, color: 'rgba(255,255,255,0.07)', fontFamily: 'var(--font-phudu)', lineHeight: 1 }}>{steps[activeStep].number}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: steps[activeStep].color, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>{steps[activeStep].label}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>{steps[activeStep].title}</h3>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{steps[activeStep].desc}</p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '40px' }}>
                  {steps.map((s, i) => (
                    <div key={i} onClick={() => scrollToStep(i)} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= activeStep ? s.color : 'rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'background 0.3s' }} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`card-${activeStep}`} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.35 }} style={{ borderRadius: '20px', background: '#fff', border: `2px solid ${steps[activeStep].color}`, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}>
                {visuals[activeStep]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {activeStep < 3 && (
          <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)' }}>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
