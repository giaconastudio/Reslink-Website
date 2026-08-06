'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Share2, ArrowRight, Plus, Minus, Star, CheckCircle, GraduationCap, BarChart, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';
import { AnimatedStat } from '@/components/CountUp';
import { TiltCard } from '@/components/TiltCard';

/* ─── Student features (same tools as job seekers, framed for career centers) ─── */
const FEATURES = [
  { icon: Zap, color: '#0C63E3', bg: '#EEF4FF', title: 'AI writes their pitch', body: 'PitchAI generates a personalized 90-second script from a student\'s resume, tailored to the roles they\'re targeting. No blank-page paralysis.' },
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'Teleprompter-guided recording', body: 'Students record on any device. The built-in teleprompter scrolls their script line by line so they stay on camera looking natural, not down at notes.' },
  { icon: BarChart2, color: '#0C63E3', bg: '#EEF4FF', title: 'Real-time view analytics', body: 'Every student can see when a recruiter opens their profile, how long they watched, and how many times. Anxiety replaced with data.' },
  { icon: FileText, color: '#0C63E3', bg: '#EEF4FF', title: 'Resume paired with video', body: 'A Reslink profile combines their video pitch with resume highlights in one clean page. Employers get the full picture without opening attachments.' },
  { icon: Globe, color: '#0C63E3', bg: '#EEF4FF', title: 'One link, everywhere', body: 'Students add their Reslink to LinkedIn, email signatures, career fair badges, and every application. One link works on every device.' },
  { icon: Share2, color: '#0C63E3', bg: '#EEF4FF', title: 'Impossible to ignore', body: 'A video profile link in an application email stands out before the recruiter even opens the resume. Most applications look identical. Reslinks don\'t.' },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How does a university get started with Reslink?', a: 'Schools schedule a demo with our team. We walk through how Reslink fits into your existing career services, then guide your team through setup and onboarding. Most career centers have students creating Reslinks within days.' },
  { q: 'Do students need to pay to use Reslink?', a: 'No. Student profiles are free to create. Schools access Reslink through an institutional plan. Students never pay to record, share, or update their video profile.' },
  { q: 'Can Reslink be used in career fairs and workshops?', a: 'Yes. Reslink is built to integrate into your existing programs. Students can create their Reslink as part of a workshop and share it at career fairs, in applications, and on LinkedIn.' },
  { q: 'Can we use Reslink alongside our existing career platform?', a: 'Yes. Reslink does not replace your existing systems. Students add their Reslink link to any application. It works alongside every ATS and career portal.' },
  { q: 'How do we measure the impact on our career readiness program?', a: 'Your career center dashboard tracks student profile creation, employer views, application activity, and placement outcomes. We provide data for your annual employability reporting.' },
  { q: 'What does a completed student Reslink include?', a: 'A Reslink is a shareable profile with a 60-90 second video pitch, resume highlights, work samples, and view analytics. One link gives any employer a complete picture of the student.' },
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

const UNI_FEATURED = {
  quote: "Before Reslink our students were submitting PDFs no one was reading. Now employers watch their pitch before the first call. Our placement rate is up 34% in one year.",
  name: 'Director of Career Services', role: 'Pilot program', company: 'public research university', color: '#059669',
};
const UNI_SIDE_QUOTES = [
  { quote: "Employers come back to us now. They tell us our students are different. They actually know how to present themselves. Reslink made that happen.", name: 'Career Development Lead', role: 'Pilot program', company: 'state university', color: '#0C63E3' },
  { quote: "Students who were struggling to get callbacks started landing interviews once they had a video profile. It levels the playing field in a way a resume never could.", name: 'Career Counselor', role: 'Pilot program', company: 'technical institute', color: '#7C3AED' },
  { quote: 'We used to rely on word of mouth to prove our placement numbers. Now I pull a real report every semester and show exactly what our career center delivered.', name: 'VP of Student Success', role: 'Pilot program', company: 'private college', color: '#D97706' },
];

export default function UniversitiesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar dark />
      <style>{`
        .uni-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .uni-testi-side { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 760px) { .uni-testi-grid { grid-template-columns: 1fr !important; } }
        .uni-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .uni-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .uni-compare-row { display: grid; grid-template-columns: 1fr 1fr; }
        .uni-compare-mobile { display: none; }
        .uni-steps-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 960px) {
          .uni-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 760px) {
          .uni-compare-desktop { display: none !important; }
          .uni-compare-mobile { display: flex !important; flex-direction: column; gap: 16px; }
        }
        @media (max-width: 760px) {
          .uni-steps-row { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .uni-steps-row { grid-template-columns: 1fr !important; }
          .uni-hero-btns { flex-direction: column !important; }
          .uni-hero-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
          .uni-cta-btn { flex-direction: column !important; align-items: stretch !important; }
          .uni-cta-btn a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
        }
        @media (max-width: 860px) { .uni-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) {
          .uni-feat-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) { .uni-stats-row { grid-template-columns: 1fr !important; } }
        @media (max-width: 960px) { .uni-hero-inline-stats { display: none !important; } }
        @media (max-width: 960px) { .uni-hero-text { text-align: center !important; align-items: center !important; } }
        @media (max-width: 960px) { .uni-hero-btns { justify-content: center !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="uni-hero-grid">
              <motion.div className="uni-hero-text" style={{ display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For universities and career centers</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 6.5vw, 84px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Equip every student<br />to <span style={{ color: '#D8F950' }}>stand out.</span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '480px' }}>
                  Reslink gives every student a video pitch, AI-powered coaching, and the analytics to know it's working. Measurable outcomes for your career center, real results for your students.
                </p>
                <div className="uni-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
                  <Link href="/get-started?type=university" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Add your school to the waitlist <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Schedule a demo
                  </Link>
                </div>
                <div className="uni-hero-inline-stats" style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                  {[['200+', 'universities onboarded'], ['34%', 'avg. placement rate lift'], ['48h', 'fastest student hire']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1 }}><AnimatedStat value={v} /></p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Coded UI mockup: student Reslink profile + view notification */}
              <motion.div className="uni-hero-visual" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(216,249,80,0.25)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
                  {/* Profile header */}
                  <div style={{ background: '#0A1F3A', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Student Reslink</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>LIVE</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/company-student-avatar.jpg" alt="Marcus Riley"
                        style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '2px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>MARCUS RILEY</p>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>Marketing · Class of 2025 · Westfield University</p>
                      </div>
                    </div>
                    {/* Video pitch */}
                    <div style={{ borderRadius: '12px', aspectRatio: '16/7', marginBottom: '16px', position: 'relative', overflow: 'hidden', background: '#000' }}>
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <video
                        src="/videos/company-student.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '10px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', background: 'rgba(0,0,0,0.45)', borderRadius: '4px', padding: '2px 6px' }}>0:47 · AI-graded pitch</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['Marketing', 'Brand Strategy', 'Content'].map(tag => (
                        <span key={tag} style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', padding: '3px 10px', fontFamily: 'var(--font-body)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  {/* Recruiter view notification */}
                  <div style={{ background: '#F7F8FA', padding: '14px 20px', borderTop: '1px solid #ECEEF1', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>G</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Google Recruiter viewed Ava&apos;s Reslink</p>
                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 0:44 of 0:47 · 2h ago</p>
                    </div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3', flexShrink: 0 }} />
                  </div>
                  <div style={{ background: '#FAFFF0', padding: '14px 20px', borderTop: '1px solid #ECEEF1', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={15} color="#041635" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview request received</p>
                      <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>Brandify · 2 days after profile shared</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <LogoTicker variant="university" />

        {/* ─── Stats ─── */}
        <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="uni-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', textAlign: 'center' }}>
              {[
                { value: '200+', label: 'universities onboarded' },
                { value: '34%', label: 'avg. placement rate increase' },
                { value: '4x', label: 'employer engagement vs. resumes' },
                { value: '85%', label: 'of students report more callbacks' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#D8F950', lineHeight: 1, letterSpacing: '-0.03em' }}><AnimatedStat value={s.value} /></p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxWidth: '140px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── What your career center gets ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 64px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>For your career center</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Measurable outcomes.<br />Provable results.
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                Reslink is not just a student tool. It gives your career center real placement data, employer engagement metrics, and the proof your program is working.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              {/* Desktop table */}
              <div className="uni-compare-desktop" style={{ borderRadius: '20px', border: '1px solid #E4E6EC', overflow: 'hidden', boxShadow: '0 4px 24px rgba(4,22,53,0.07)' }}>
                <div className="uni-compare-row">
                  <div style={{ padding: '18px 28px', background: '#F7F8FA', borderBottom: '1px solid #ECEEF1', borderRight: '1px solid #ECEEF1' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Without Reslink</p>
                  </div>
                  <div style={{ padding: '18px 28px', background: '#041635', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D8F950', fontFamily: 'var(--font-body)' }}>With Reslink</p>
                  </div>
                </div>
                {[
                  ['Students submit identical PDF resumes', 'Every student has a video pitch employers actually watch'],
                  ["No visibility into who's actually hiring", 'Dashboard shows recruiter views and engagement in real time'],
                  ['Placement data comes from self-reported surveys', 'Placement outcomes tracked automatically, no surveys needed'],
                  ['Career fairs rely on awkward cold introductions', 'Students share Reslinks at career fairs. Employers remember them'],
                  ['Hard to prove the ROI of your program', 'Annual report pulls directly from your career center dashboard'],
                ].map(([before, after], i) => (
                  <div key={i} className="uni-compare-row" style={{ borderBottom: i < 4 ? '1px solid #ECEEF1' : 'none' }}>
                    <div style={{ padding: '16px 28px', borderRight: '1px solid #ECEEF1', display: 'flex', alignItems: 'flex-start', gap: '10px', background: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                      <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✕</span>
                      <span style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>{before}</span>
                    </div>
                    <div style={{ padding: '16px 28px', display: 'flex', alignItems: 'flex-start', gap: '10px', background: i % 2 === 0 ? '#fff' : '#F8FAFF' }}>
                      <span style={{ fontSize: '13px', color: '#0C63E3', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.55, fontWeight: 500 }}>{after}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mobile two-card layout */}
              <div className="uni-compare-mobile">
                <div style={{ borderRadius: '16px', border: '1px solid #E4E6EC', overflow: 'hidden', boxShadow: '0 2px 12px rgba(4,22,53,0.06)' }}>
                  <div style={{ padding: '14px 20px', background: '#F7F8FA', borderBottom: '1px solid #ECEEF1' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Without Reslink</p>
                  </div>
                  {['Students submit identical PDF resumes', "No visibility into who's actually hiring", 'Placement data comes from self-reported surveys', 'Career fairs rely on awkward cold introductions', 'Hard to prove the ROI of your program'].map((item, i) => (
                    <div key={i} style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid #ECEEF1' : 'none', display: 'flex', alignItems: 'flex-start', gap: '10px', background: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                      <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✕</span>
                      <span style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(4,22,53,0.12)' }}>
                  <div style={{ padding: '14px 20px', background: '#041635', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D8F950', fontFamily: 'var(--font-body)' }}>With Reslink</p>
                  </div>
                  {['Every student has a video pitch employers actually watch', 'Dashboard shows recruiter views and engagement in real time', 'Placement outcomes tracked automatically, no surveys needed', 'Students share Reslinks at career fairs. Employers remember them', 'Annual report pulls directly from your career center dashboard'].map((item, i) => (
                    <div key={i} style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', alignItems: 'flex-start', gap: '10px', background: i % 2 === 0 ? '#041635' : '#061C3D' }}>
                      <span style={{ fontSize: '13px', color: '#0C63E3', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', lineHeight: 1.55, fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.18), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Up and running<br />in three steps.
              </h2>
            </motion.div>
            <div className="uni-steps-row">
              {[
                { icon: GraduationCap, num: '01', tag: 'Free consultation', tagDark: false, title: 'Schedule a demo', desc: 'Connect with our team to explore how Reslink fits into your career services, employability modules, or student success programs.' },
                { icon: Users, num: '02', tag: 'Done in days, not months', tagDark: true, title: 'Set up access for your students', desc: "We guide your team through setup and onboarding with ready-to-use resources so students can start creating within days of sign-off." },
                { icon: BarChart, num: '03', tag: 'Where outcomes are built', tagDark: false, title: 'Students create. You track results.', desc: 'Students record their pitches, get AI coaching, and share their Reslink everywhere they apply. Your dashboard shows every view, every placement.' },
              ].map((s, i) => (
                <motion.div key={s.num} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px 28px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '72px', fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, position: 'absolute', top: '12px', right: '20px' }}>#{s.num}</span>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <s.icon size={20} color="#D8F950" strokeWidth={1.8} />
                    </div>
                    <span style={{ display: 'block', padding: '3px 10px', background: i === 0 ? '#D8F950' : i === 2 ? 'rgba(216,249,80,0.12)' : 'rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '11px', fontWeight: 700, color: i === 0 ? '#041635' : i === 2 ? '#D8F950' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginBottom: '16px', width: 'fit-content' }}>{s.tag}</span>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', marginBottom: '8px' }}>STEP {s.num}</p>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '14px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── What students get: the same tools ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What your students get access to</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Every tool they need<br />to stand out and get hired.
              </h2>
            </motion.div>
            <div className="uni-feat-grid">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)', height: '100%' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <f.icon size={22} color={f.color} strokeWidth={1.8} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#041635', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>{f.title}</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>From career centers</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98 }}>
                Career centers that<br />get results.
              </h2>
            </motion.div>
            <div className="uni-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <TiltCard max={3} style={{ background: '#041635', borderRadius: '20px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '24px' }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#D8F950" color="#D8F950" />)}
                    </div>
                    <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: '#fff', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '32px' }}>&ldquo;{UNI_FEATURED.quote}&rdquo;</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: UNI_FEATURED.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{UNI_FEATURED.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{UNI_FEATURED.name}</p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{UNI_FEATURED.role} at {UNI_FEATURED.company}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
              <div className="uni-testi-side">
                {UNI_SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
                    <TiltCard max={5} style={{ background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                          {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#D8F950" color="#D8F950" />)}
                        </div>
                        <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '16px' }}>&ldquo;{q.quote}&rdquo;</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: q.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{q.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{q.name}</p>
                          <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{q.role} at {q.company}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: '#F7F8FA' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.95 }}>Everything you need to know</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: '#041635', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(216,249,80,0.07), transparent 60%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Give your students<br /><span style={{ color: '#D8F950' }}>a real advantage.</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join hundreds of universities using Reslink to get their students hired at better companies, faster.
            </p>
            <div className="uni-cta-btn" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/get-started?type=university" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Add your school to the waitlist <ArrowRight size={16} />
              </Link>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Free for students · No credit card to join the waitlist</p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
