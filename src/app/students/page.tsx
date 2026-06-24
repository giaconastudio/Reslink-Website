'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Share2, Plus, Minus, Play, CheckCircle, Eye } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

const FEATURES = [
  { icon: Zap, title: 'AI writes your pitch', body: 'PitchAI generates a personalized 90-second script from your resume, tailored to the internship or job you\'re targeting.' },
  { icon: Video, title: 'Teleprompter recording', body: 'Record on your laptop or phone. The built-in teleprompter scrolls your script so you stay confident on camera.' },
  { icon: FileText, title: 'Showcase your coursework', body: 'Pair your projects and skills with a video pitch. Give recruiters the full picture before they open your resume.' },
  { icon: BarChart2, title: 'Track recruiter views', body: 'See exactly when a recruiter opens your profile and how long they watched. Follow up with perfect timing.' },
  { icon: Globe, title: 'Share everywhere', body: 'Add your Reslink to LinkedIn, email, and every application. One link on every device, every platform.' },
  { icon: Share2, title: 'Stand out at career fairs', body: 'Hand a recruiter your Reslink instead of paper. They open it on their phone and see you immediately.' },
];

const FAQS = [
  { q: 'Do I need work experience to use Reslink?', a: 'Not at all. Coursework, projects, clubs, volunteer work, and part-time jobs are all fair game. The video pitch lets you explain your potential in a way a resume never can.' },
  { q: 'Is Reslink free for students?', a: 'Yes. Students can create and share a full Reslink profile for free. Pro features like advanced analytics and multiple videos are available on paid plans.' },
  { q: 'How long should my video pitch be?', a: 'Aim for 60 to 90 seconds. That\'s enough time to introduce yourself, highlight two or three strengths, and express genuine interest in the role.' },
  { q: 'Can I use Reslink for internship applications?', a: 'Absolutely. A video pitch shows the enthusiasm and communication skills that internship hiring managers actually care about.' },
  { q: 'What if I\'m not comfortable on camera?', a: 'That\'s what the teleprompter is for. Your script scrolls while you record, so you never have to memorize a thing. Most students feel confident after two or three takes.' },
  { q: 'Will Reslink work alongside my standard resume?', a: 'Yes. Reslink supplements your resume, it doesn\'t replace it. You still submit your PDF through any ATS. Reslink is the extra layer that makes you memorable.' },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #EEEEF0' }}>
      <button onClick={toggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{q}</span>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open ? '#0C63E3' : '#F7F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
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

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero — split layout */}
        <section style={{ background: '#041635', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '700px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'stretch', minHeight: '600px' }} className="students-hero-grid">
            <style>{`
              @media (max-width: 860px) { .students-hero-grid { grid-template-columns: 1fr !important; } }
              @media (max-width: 860px) { .students-hero-chip-ext { display: none !important; } }
              @media (max-width: 860px) { .students-hero-img-col { padding: 0 0 40px !important; } }
              @media (max-width: 480px) { .students-hero-btns { flex-direction: column !important; } }
              @media (max-width: 480px) { .students-hero-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; } }
              @media (max-width: 480px) { .students-hero-section-inner { padding-top: 48px !important; padding-bottom: 24px !important; } }
              @media (max-width: 480px) { .students-cta-btn { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; } }
              @media (max-width: 480px) { .students-faq-box { padding: 0 16px !important; } }
              @media (max-width: 820px) { .students-pip-pip { top: 12px !important; right: 12px !important; width: 100px !important; height: 100px !important; } }
            `}</style>
            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="students-hero-section-inner" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(64px, 8vw, 100px) 0 clamp(64px, 8vw, 100px)', position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For students</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Be the candidate<br />
                <span style={{ color: '#D8F950' }}>they remember.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '440px', marginBottom: '36px' }}>
                Land internships and first jobs by showing recruiters who you actually are. Not just a list of coursework on a PDF.
              </p>
              <div className="students-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Create free Reslink
                </Link>
                <Link href="/job-seekers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  See how it works
                </Link>
              </div>

              {/* Student discount callout */}
              <div style={{ marginTop: '20px', display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: '10px', background: 'rgba(216,249,80,0.08)', border: '1px solid rgba(216,249,80,0.2)', borderRadius: '10px', padding: '10px 16px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(216,249,80,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="2.2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#D8F950', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Student pricing: $20/year <span style={{ fontWeight: 500, color: 'rgba(216,249,80,0.6)', fontSize: '12px' }}>— 66% off the annual plan</span></p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Sign up with your .edu email to claim</p>
                </div>
              </div>
            </motion.div>
            {/* Right: student photo */}
            <motion.div className="students-hero-img-col" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px, 5vw, 56px) 0' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                {/* Glow blob behind card */}
                <div style={{ position: 'absolute', top: '10%', left: '-8%', right: '15%', bottom: '10%', background: 'radial-gradient(ellipse, rgba(12,99,227,0.38), transparent 70%)', filter: 'blur(52px)', pointerEvents: 'none', zIndex: 0 }} />
                {/* Photo card */}
                <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', aspectRatio: '3/4', zIndex: 1 }}>
                  <video src="/videos/student.mp4" autoPlay muted loop playsInline preload="auto"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(4,22,53,0.72), transparent)' }} />
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
                  {/* Bottom-left chip */}
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.4 }}
                    style={{ position: 'absolute', bottom: '24px', left: '20px', background: '#fff', borderRadius: '14px', padding: '12px 14px', boxShadow: '0 16px 48px rgba(4,22,53,0.28)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '195px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={16} color="#041635" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview booked</p>
                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Google · 2 days after sharing</p>
                    </div>
                  </motion.div>
                </div>
                {/* Top-right external chip */}
                <motion.div className="students-hero-chip-ext" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0, duration: 0.4 }}
                  style={{ position: 'absolute', top: '-14px', right: '-20px', zIndex: 3, background: '#0A1F45', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '10px 14px', boxShadow: '0 12px 36px rgba(4,22,53,0.45)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '168px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(216,249,80,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Eye size={13} color="#D8F950" />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Profile viewed</p>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>LinkedIn Recruiter · Just now</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats — dark navy */}
        <section style={{ background: '#041635', padding: 'clamp(48px, 6vw, 72px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="students-stats-grid">
            <style>{`@media (max-width: 640px) { .students-stats-grid { grid-template-columns: 1fr !important; } }`}</style>
            {[
              { stat: '3×', label: 'more recruiter callbacks', sub: 'vs. a traditional resume' },
              { stat: '85%', label: 'avg. video watch rate', sub: 'recruiters watch almost every second' },
              { stat: '5 min', label: 'to your first Reslink', sub: 'AI does the hard part' },
            ].map((s, i) => (
              <motion.div key={s.stat} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ textAlign: 'center', padding: '8px' }}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 4.5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '6px' }}>{s.stat}</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-body)', marginBottom: '2px' }}>{s.label}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* University logo ticker — sits directly below stats */}
        <LogoTicker variant="university" />

        {/* How it works — white */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Ready in under 10 minutes.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="students-steps-grid">
              <style>{`
                .students-steps-grid { }
                @media (max-width: 760px) { .students-steps-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 480px) { .students-steps-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {[
                { n: '01', title: 'Upload your resume', desc: 'Paste your resume and PitchAI generates a script tailored to the roles you want.' },
                { n: '02', title: 'Record with teleprompter', desc: 'Your script scrolls as you record. Stay on camera and on message.' },
                { n: '03', title: 'Share your link', desc: 'Drop your Reslink into every application, LinkedIn, and your email signature.' },
                { n: '04', title: 'Track who watches', desc: 'Get notified when recruiters view you. Follow up at the exact right moment.' },
              ].map((step, i) => (
                <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div style={{ background: '#F7F8FA', borderRadius: '16px', padding: '24px', height: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', bottom: '-8px', right: '12px', fontFamily: 'var(--font-phudu)', fontSize: '80px', fontWeight: 900, color: '#041635', opacity: 0.04, lineHeight: 1, userSelect: 'none' }}>{step.n}</div>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '28px', fontWeight: 900, color: '#0C63E3', lineHeight: 1, display: 'block', marginBottom: '14px' }}>{step.n}</span>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>{step.title}</p>
                    <p style={{ fontSize: '13px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* See it in action — dark navy with profile card + PIP */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 108px) 24px', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="students-pip-grid">
            <style>{`@media (max-width: 820px) { .students-pip-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>One link, everything</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Your Reslink is your<br /><span style={{ color: '#D8F950' }}>first impression.</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '28px' }}>
                One link combines your video pitch, resume highlights, and real-time view analytics. Share it anywhere and know exactly who watched.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Video pitch + resume in one link', 'See when recruiters view you', 'Works on every device and platform', 'Free to start, takes under 10 minutes'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color="#D8F950" strokeWidth={2} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Right: profile card with PIP */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5, delay: 0.1 }} style={{ position: 'relative' }}>
              <div style={{ borderRadius: '18px', border: '2px solid #D8F950', overflow: 'hidden', boxShadow: '0 24px 72px rgba(0,0,0,0.4)' }}>
                {/* Profile header */}
                <div style={{ background: '#0C1B3A', padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingRight: '80px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/student-avatar.jpg" alt="Student"
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top center', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>ZARA JOHNSON</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Marketing · Class of 2025</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#D8F950', borderRadius: '8px', padding: '8px 14px' }}>
                      <Play size={10} color="#041635" fill="#041635" />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Play Intro</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>Download Resume</span>
                    </div>
                  </div>
                </div>
                {/* Recruiter activity */}
                <div style={{ background: '#F7F8FA', padding: '12px 22px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #ECEEF1' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>G</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Google Recruiter viewed you</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 0:44 · 1h ago</p>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3', flexShrink: 0 }} />
                </div>
                {/* Interview booked */}
                <div style={{ padding: '12px 22px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle size={14} color="#041635" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview request received</p>
                    <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>Meta · 2 days after sharing</p>
                  </div>
                </div>
              </div>
              {/* PIP */}
              <div className="students-pip-pip" style={{ position: 'absolute', top: '-20px', right: '-20px', width: '130px', height: '130px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.4)', border: '3px solid #041635' }}>
                <video src="/videos/student.mp4" autoPlay muted loop playsInline preload="auto"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(4,22,53,0.8)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D8F950' }} />
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.06em' }}>LIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features — light */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything you need</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Built for early careers.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="students-feat-grid">
              <style>{`
                .students-feat-grid { }
                @media (max-width: 860px) { .students-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 480px) { .students-feat-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', height: '100%', boxSizing: 'border-box' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <f.icon size={20} color="#0C63E3" strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>{f.title}</p>
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em' }}>Common questions</h2>
            </motion.div>
            <div className="students-faq-box" style={{ background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.3), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.035em', marginBottom: '20px' }}>
                Your first job<br /><span style={{ color: '#D8F950' }}>starts here.</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '32px' }}>
                Free to start. Takes less than 10 minutes. No credit card required.
              </p>
              <Link href="/get-started" className="students-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Create your Reslink free
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
