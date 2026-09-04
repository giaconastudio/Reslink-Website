'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Share2, Plus, Minus, Play, CheckCircle, Eye, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { checkEligibility } from '@/lib/eligibility';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnimatedStat } from '@/components/CountUp';
import LogoTicker from '@/components/LogoTicker';
import CTA from '@/components/CTA';

const FEATURES = [
  { icon: Zap, title: 'Enhance your pitch with AI', body: 'Paste the job description and get a script written from your own experience.' },
  { icon: Video, title: 'Read your script while you record', body: 'The teleprompter scrolls on screen, so you stay looking at the camera.' },
  { icon: BarChart2, title: 'See who watched, and for how long', body: 'Every recruiter who opened it, their watch time, and what they clicked.' },
  { icon: FileText, title: 'Show more than a resume', body: 'Add your coursework, portfolio and side projects alongside your CV.' },
  { icon: Play, title: 'Put a Play button in your resume', body: 'One click from the PDF takes a recruiter straight to your video.' },
  { icon: Share2, title: 'Skip the paper CV at careers fairs', body: 'Hand over a link. They open it on their phone and see you.' },
];

const FAQS = [
  { q: 'Do I need work experience to use Reslink?', a: 'Not at all. Coursework, projects, clubs, volunteer work and part-time jobs are all fair game. A video pitch lets you show your potential in a way a resume never can.' },
  { q: 'Is Reslink free for students?', a: 'Yes. You can create and share a full Reslink profile for free. Pro features like advanced analytics are on paid plans, and they\'re half price with a valid .edu address.' },
  { q: 'What if I\'m not comfortable on camera?', a: 'That\'s what the teleprompter is for. Your script scrolls on screen while you record, so you never have to memorise a thing. Most students feel natural after a take or two.' },
  { q: 'Will recruiters take a video seriously?', a: 'They already do. A 60-second intro tells a recruiter more about you than a page of bullet points, and Reslink shows you exactly who watched, so you know it\'s landing.' },
  { q: 'Will Reslink work alongside my standard resume?', a: 'Yes. Reslink supplements your resume, it doesn\'t replace it. You still submit your PDF, and Reslink is the extra layer that makes you memorable.' },
  { q: 'Will it affect ATS compatibility?', a: 'No. Your traditional resume is still what you upload, so it parses like any other PDF. Reslink is a link you add on top, and it works with every ATS.' },
  { q: 'How long should my video be?', a: 'Aim for 60 to 90 seconds. That\'s enough to introduce yourself, highlight two or three strengths, and show genuine interest in the role.' },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #EEEEF0' }}>
      <button onClick={toggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{q}</span>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open ? '#1468E8' : '#F6F7F9', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
          {open ? <Minus size={12} color="#fff" /> : <Plus size={12} color="#5C6070" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, paddingBottom: '20px', fontFamily: 'var(--font-body)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StudentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chkEmail, setChkEmail] = useState('');
  const [chkStatus, setChkStatus] = useState<'idle' | 'checking' | 'eligible' | 'no' | 'error'>('idle');

  const runChk = (e: React.FormEvent) => {
    e.preventDefault();
    const verdict = checkEligibility(chkEmail, 'student');
    if (verdict === 'invalid') { setChkStatus('error'); return; }
    setChkStatus('checking');
    window.setTimeout(() => setChkStatus(verdict === 'eligible' ? 'eligible' : 'no'), 850);
  };

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero — split layout */}
        <section style={{ background: '#061A3A', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '700px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'stretch', minHeight: '600px' }} className="students-hero-grid">
            <style>{`
              @media (max-width: 860px) { .students-hero-grid { grid-template-columns: 1fr !important; } }
              @media (max-width: 860px) { .students-hero-chip-ext { display: none !important; } }
              @media (max-width: 860px) { .students-hero-img-col { padding: 0 0 40px !important; } }
              @media (max-width: 860px) { .students-hero-section-inner { text-align: center !important; align-items: center !important; } }
              @media (max-width: 860px) { .students-hero-btns { flex-direction: column !important; align-self: stretch !important; } }
              @media (max-width: 860px) { .students-hero-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; } }
              @media (max-width: 860px) { .students-hero-discount { display: block !important; align-self: stretch !important; } }
              /* The banner reads "50% off" beside two lines of terms. Side by
                 side in ~330px the number crowds the text into a narrow
                 column, so on phones it sits above the terms instead. */
              @media (max-width: 640px) {
                .students-discount-head { flex-direction: column !important; align-items: center !important; gap: 12px !important; text-align: center; }
                /* A 32px "50% off" alone on its own line read as an orphaned
                   figure. As a lime chip above full-width terms it reads as a
                   deliberate lockup, and matches the pill used on veterans. */
                .students-discount-num {
                  display: inline-block; font-size: 20px !important; letter-spacing: 0.04em !important;
                  text-transform: uppercase; background: #D7FF43; color: #061A3A !important;
                  border-radius: 100px; padding: 9px 20px; line-height: 1 !important;
                }
                /* Button matches the input's width rather than its own label. */
                .students-elig-form { flex-direction: column !important; flex-wrap: nowrap !important; }
                .students-elig-form > div { flex: 1 1 auto !important; width: 100% !important; box-sizing: border-box !important; }
                .students-elig-btn { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
              }
              @media (max-width: 480px) { .students-hero-section-inner { padding-top: 48px !important; padding-bottom: 24px !important; } }
              @media (max-width: 480px) { .students-cta-btn { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; } }
              @media (max-width: 480px) { .students-faq-box { padding: 0 16px !important; } }
              @media (max-width: 820px) { .students-pip-pip { top: -22px !important; right: -10px !important; width: 100px !important; height: 100px !important; } }
            `}</style>
            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="students-hero-section-inner" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(64px, 8vw, 100px) 0 clamp(64px, 8vw, 100px)', position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For students</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 4vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Be the candidate{' '}<br className="br-desktop" />
                <span style={{ color: '#D7FF43' }}>they remember</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '440px', marginBottom: '36px' }}>
                Land internships and first jobs by showing recruiters who you actually are, not just a list of coursework.
              </p>
              <div className="students-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/get-started?type=student" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#D7FF43', color: '#061A3A', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Get started for free
                </Link>
                <Link href="/oliviastone" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  See a real Reslink
                </Link>
              </div>

              {/* Student pricing banner + inline eligibility checker */}
              <div className="students-hero-discount" style={{ marginTop: '30px', paddingTop: '26px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'block' }}>
                <div className="students-discount-head" style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '16px' }}>
                  <span className="students-discount-num" style={{ fontFamily: 'var(--font-phudu)', fontWeight: 900, fontSize: '38px', color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', whiteSpace: 'nowrap', flexShrink: 0 }}>50% off</span>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#D7FF43', fontFamily: 'var(--font-body)', lineHeight: 1.3, margin: 0 }}>$29/year with a valid .edu address</p>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>Email verification coming soon — discount applied manually until then</p>
                  </div>
                </div>

                <form onSubmit={runChk} className="students-elig-form" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '440px' }}>
                  <div style={{ position: 'relative', flex: '1 1 200px', display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '10px', border: chkStatus === 'error' ? '1.5px solid #F0997B' : '1.5px solid transparent', padding: '0 12px' }}>
                    <Mail size={16} color="#8A93A3" style={{ flexShrink: 0 }} />
                    <input type="email" value={chkEmail}
                      onChange={(e) => { setChkEmail(e.target.value); if (chkStatus !== 'idle') setChkStatus('idle'); }}
                      placeholder="you@university.ac.uk"
                      style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', padding: '12px 8px', fontSize: '14px', color: '#061A3A', fontFamily: 'var(--font-body)' }} />
                  </div>
                  <button type="submit" disabled={chkStatus === 'checking'} className="students-elig-btn"
                    style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '12px 20px', background: '#D63D9D', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: chkStatus === 'checking' ? 'default' : 'pointer', opacity: chkStatus === 'checking' ? 0.75 : 1 }}>
                    {chkStatus === 'checking'
                      ? <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }} style={{ display: 'inline-flex' }}><Loader2 size={15} /></motion.span> Checking</>
                      : <>Check eligibility <ArrowRight size={15} /></>}
                  </button>
                </form>

                {chkStatus === 'error' && (
                  <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#F0997B', fontFamily: 'var(--font-body)', margin: '10px 0 0' }}>
                    <AlertCircle size={14} /> Enter a valid email address.
                  </p>
                )}

                {chkStatus === 'eligible' && (
                  <motion.div key="s-ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ marginTop: '12px', maxWidth: '440px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(215,255,67,0.12)', border: '1px solid rgba(215,255,67,0.35)', borderRadius: '10px', padding: '11px 14px' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><CheckCircle size={14} color="#061A3A" strokeWidth={2.5} /></span>
                    <p style={{ fontSize: '13.5px', color: '#fff', fontFamily: 'var(--font-body)', margin: 0, lineHeight: 1.45 }}>
                      You&apos;re eligible — 50% off applies when you sign up below.
                    </p>
                  </motion.div>
                )}

                {chkStatus === 'no' && (
                  <motion.div key="s-no" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ marginTop: '12px', maxWidth: '440px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '10px', padding: '11px 14px' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(240,153,123,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><AlertCircle size={14} color="#F0997B" /></span>
                    <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)', margin: 0, lineHeight: 1.45 }}>
                      Use your school email (ending in <strong style={{ color: '#fff' }}>.edu</strong> or <strong style={{ color: '#fff' }}>.ac.uk</strong>) so we can confirm your discount.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
            {/* Right: student photo */}
            <motion.div className="students-hero-img-col" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px, 5vw, 56px) 0' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                {/* Glow blob behind card */}
                <div style={{ position: 'absolute', top: '10%', left: '-8%', right: '15%', bottom: '10%', background: 'radial-gradient(ellipse, rgba(20,104,232,0.38), transparent 70%)', filter: 'blur(52px)', pointerEvents: 'none', zIndex: 0 }} />
                {/* Photo card */}
                <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', aspectRatio: '3/4', zIndex: 1 }}>
                  <video src="/videos/student-hero.mp4" autoPlay muted loop playsInline preload="auto"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(6,26,58,0.72), transparent)' }} />
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
                  {/* Bottom-left chip */}
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.4 }}
                    style={{ position: 'absolute', bottom: '24px', left: '20px', background: '#fff', border: '1px solid #EEF0F3', borderRadius: '14px', padding: '12px 14px', boxShadow: '0 16px 40px rgba(6,26,58,0.20)', display: 'flex', alignItems: 'center', gap: '11px', minWidth: '196px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={17} color="#061A3A" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.25 }}>Interview booked</p>
                      <p style={{ fontSize: '11px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '1px' }}>Google · 2 days after sharing</p>
                    </div>
                  </motion.div>
                </div>
                {/* Top-right external chip */}
                <motion.div className="students-hero-chip-ext" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0, duration: 0.4 }}
                  style={{ position: 'absolute', top: '-14px', right: '-20px', zIndex: 3, background: '#fff', border: '1px solid #EEF0F3', borderRadius: '14px', padding: '11px 14px', boxShadow: '0 16px 40px rgba(6,26,58,0.20)', display: 'flex', alignItems: 'center', gap: '11px', minWidth: '178px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: '#1468E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Eye size={15} color="#fff" strokeWidth={2} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.25 }}>Profile viewed</p>
                    <p style={{ fontSize: '10.5px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '1px' }}>LinkedIn Recruiter · Just now</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats — dark navy */}
        <section style={{ background: '#061A3A', padding: 'clamp(48px, 6vw, 72px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="students-stats-grid">
            <style>{`@media (max-width: 640px) { .students-stats-grid { grid-template-columns: 1fr !important; } }`}</style>
            {[
              { stat: '3×', label: 'more recruiter callbacks', sub: 'vs. a traditional resume' },
              { stat: '85%', label: 'avg. video watch rate', sub: 'recruiters watch almost every second' },
              { stat: '5 min', label: 'to your first Reslink', sub: 'AI does the hard part' },
            ].map((s, i) => (
              <motion.div key={s.stat} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ textAlign: 'center', padding: '8px' }}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 4.5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '6px' }}><AnimatedStat value={s.stat} /></p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-body)', marginBottom: '2px' }}>{s.label}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* University logo ticker — sits directly below stats */}
        <LogoTicker variant="university" />

        {/* How it works — grey */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Ready in under five minutes
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="students-steps-grid">
              <style>{`
                .students-steps-grid { }
                @media (max-width: 760px) { .students-steps-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 480px) { .students-steps-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {[
                { n: '01', title: 'Upload your resume', desc: 'PitchAI turns it into a script for the role you\'re going for.' },
                { n: '02', title: 'Record the video', desc: 'Your script scrolls on screen while you record. Just read it.' },
                { n: '03', title: 'Share your link', desc: 'Add it to your applications, LinkedIn and email signature.' },
                { n: '04', title: 'Track who watches', desc: 'Get notified the moment a recruiter opens it.' },
              ].map((step, i) => (
                <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', padding: '28px 24px', height: '100%', boxSizing: 'border-box', boxShadow: '0 1px 3px rgba(6,26,58,0.05)' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: i === 3 ? '#D7FF43' : '#061A3A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <span className="step-num" style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: i === 3 ? '#061A3A' : '#fff', lineHeight: 1 }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>{step.title}</p>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* See it in action — dark navy with profile card + PIP */}
        <section style={{ background: '#061A3A', padding: 'clamp(72px, 9vw, 108px) 24px', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="students-pip-grid">
            <style>{`@media (max-width: 820px) { .students-pip-grid { grid-template-columns: 1fr !important; gap: 40px !important; } .students-pip-grid > * { min-width: 0; } }`}</style>
            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything in one link</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Your Reslink is your{' '}<br className="br-desktop" /><span style={{ color: '#D7FF43' }}>first impression</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '28px' }}>
                A recruiter looking at a graduate resume sees a degree, a summer job and a list of software. Your Reslink shows them the person who did all that.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['What you worked on, not just where', 'Why you want this specific job', 'Proof that they watched, and for how long'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={18} color="#061A3A" fill="#D7FF43" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Right: profile card with PIP */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ position: 'relative' }}>
              <div style={{ borderRadius: '18px', border: '2px solid #D7FF43', overflow: 'hidden', boxShadow: '0 24px 72px rgba(0,0,0,0.4)' }}>
                {/* Profile header */}
                <div style={{ background: '#0C1B3A', padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingRight: '80px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/student-avatar-2.jpg" alt="Zara Johnson"
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 20%', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>ZARA JOHNSON</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Marketing · Class of 2025</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#D7FF43', borderRadius: '8px', padding: '8px 14px' }}>
                      <Play size={10} color="#061A3A" fill="#061A3A" />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)' }}>Play Intro</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>Download Resume</span>
                    </div>
                  </div>
                </div>
                {/* Resume document peek — realistic so it's clearly a resume */}
                <div style={{ background: '#fff', padding: '14px 22px 16px', borderBottom: '1px solid #F0F1F4' }}>
                  <span style={{ display: 'inline-block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1468E8', background: '#EEF4FF', borderRadius: '100px', padding: '2px 9px', marginBottom: '9px', fontFamily: 'var(--font-body)' }}>Resume</span>
                  <div style={{ textAlign: 'center', borderBottom: '1px solid #EDEFF2', paddingBottom: '8px', marginBottom: '9px' }}>
                    <p style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 700, color: '#061A3A' }}>Zara Johnson</p>
                    <p style={{ fontSize: '10.5px', color: '#5C6070', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Marketing · Class of 2025</p>
                    <p style={{ fontSize: '9.5px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Ann Arbor, MI · zara@example.edu · LinkedIn</p>
                  </div>
                  <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8F9A', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>Experience</p>
                  <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)' }}>Marketing Intern</p>
                  <p style={{ fontSize: '9.5px', color: '#1468E8', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: '3px' }}>Regional D2C Brand · Summer 2024</p>
                  <ul style={{ listStyle: 'disc', paddingLeft: '15px', margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <li style={{ fontSize: '9.5px', color: '#5C6070', lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>Ran a campus ambassador campaign — 40% lift in sign-ups</li>
                    <li style={{ fontSize: '9.5px', color: '#5C6070', lineHeight: 1.4, fontFamily: 'var(--font-body)' }}>Managed content calendar across 3 social channels</li>
                  </ul>
                </div>

                {/* Recruiter activity */}
                <div style={{ background: '#F6F7F9', padding: '12px 22px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #ECEEF1' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#1468E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>G</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Google Recruiter viewed you</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 0:44 · 1h ago</p>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1468E8', flexShrink: 0 }} />
                </div>
                {/* Interview booked */}
                <div style={{ padding: '12px 22px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle size={14} color="#061A3A" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview request received</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Meta · 2 days after sharing</p>
                  </div>
                </div>
              </div>
              {/* PIP */}
              <div className="students-pip-pip" style={{ position: 'absolute', top: '-20px', right: '-20px', width: '130px', height: '130px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.4)', border: '3px solid #061A3A' }}>
                <video src="/videos/student-hero.mp4" autoPlay muted loop playsInline preload="auto"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(6,26,58,0.8)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D7FF43' }} />
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.06em' }}>LIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features — pink */}
        <section style={{ background: '#FBEEF5', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D63D9D', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything you need</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Built for early careers
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="students-feat-grid">
              <style>{`
                .students-feat-grid { }
                @media (max-width: 860px) { .students-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 480px) { .students-feat-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #F3DCEA', padding: '24px', height: '100%', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(214,61,157,0.06)' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FBEAF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <f.icon size={20} color="#D63D9D" strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>{f.title}</p>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em' }}>What students ask us</h2>
            </motion.div>
            <div className="students-faq-box" style={{ background: '#F6F7F9', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* CTA — shared component, matches the home page */}
        <CTA primaryHref="/get-started?type=student" />

      </main>
      <Footer />
    </>
  );
}
