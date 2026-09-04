'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Share2, ArrowRight, Plus, Minus, CheckCircle, Check, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';
import { AnimatedStat } from '@/components/CountUp';
import { TiltCard } from '@/components/TiltCard';
import CTA from '@/components/CTA';

/* ─── Student features (same tools as job seekers, framed for career centers) ─── */
const FEATURES = [
  { icon: Zap, color: '#1468E8', bg: '#EEF4FF', title: 'AI writes their pitch', body: 'PitchAI generates a personalized 90-second script from a student\'s resume, tailored to the roles they\'re targeting. No blank-page paralysis.' },
  { icon: Video, color: '#1468E8', bg: '#EEF4FF', title: 'Teleprompter-guided recording', body: 'Students record on any device. The built-in teleprompter scrolls their script line by line so they stay on camera looking natural, not down at notes.' },
  { icon: BarChart2, color: '#1468E8', bg: '#EEF4FF', title: 'Real-time view analytics', body: 'Every student can see when a recruiter opens their profile, how long they watched, and how many times. Anxiety replaced with data.' },
  { icon: FileText, color: '#1468E8', bg: '#EEF4FF', title: 'Resume paired with video', body: 'A Reslink profile combines their video pitch with resume highlights in one clean page. Employers get the full picture without opening attachments.' },
  { icon: Globe, color: '#1468E8', bg: '#EEF4FF', title: 'One link, everywhere', body: 'Students add their Reslink to LinkedIn, email signatures, career fair badges, and every application. One link works on every device.' },
  { icon: Share2, color: '#1468E8', bg: '#EEF4FF', title: 'Impossible to ignore', body: 'A video profile link in an application email stands out before the recruiter even opens the resume. Most applications look identical. Reslinks don\'t.' },
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

const UNI_FEATURED = {
  quote: "Before Reslink our students were submitting PDFs no one was reading. Now employers watch their pitch before the first call. Our placement rate is up 34% in one year.",
  stat: 'Placement rate up 34% in one year',
  name: 'Director of Career Services', sub: 'Pilot program at public research university',
  avatar: '/avatars/a1.jpg',
};
const UNI_SIDE_QUOTES = [
  { quote: "Employers come back to us now. They tell us our students are different. They actually know how to present themselves. Reslink made that happen.", name: 'Career Development Lead', sub: 'Pilot program at state university', avatar: '/avatars/a2.jpg' },
  { quote: "Students who were struggling to get callbacks started landing interviews once they had a video profile. It levels the playing field in a way a resume never could.", name: 'Career Counselor', sub: 'Pilot program at technical institute', avatar: '/avatars/a3.jpg' },
  { quote: 'We used to rely on word of mouth to prove our placement numbers. Now I pull a real report every semester and show exactly what our career center delivered.', name: 'VP of Student Success', sub: 'Pilot program at private college', avatar: '/avatars/a4.jpg' },
];

/* ─── How it works steps (canonical numbered-node list, matches companies) ─── */
const UNI_STEPS = [
  { num: '01', tag: 'Free consultation', tagColor: '#EAF1FF', tagText: '#1468E8', title: 'Schedule a demo', desc: 'Connect with our team to explore how Reslink fits into your career services, employability modules, or student success programs.' },
  { num: '02', tag: 'Done in days, not months', tagColor: '#EAF3DE', tagText: '#3B6D11', title: 'Set up access for your students', desc: 'We guide your team through setup and onboarding with ready-to-use resources so students can start creating within days of sign-off.' },
  { num: '03', tag: 'Where outcomes are built', tagColor: '#FBEAF5', tagText: '#9E2462', title: 'Students create. You track results.', desc: 'Students record their pitches, get AI coaching, and share their Reslink everywhere they apply. Your dashboard shows every view, every placement.' },
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
        .uni-hero-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 44px; align-items: center; }
        .uni-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .uni-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: stretch; }
        .uni-steps-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 960px) {
          .uni-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 760px) {
          .uni-compare { grid-template-columns: 1fr !important; gap: 16px !important; }
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
        <section style={{ background: '#061A3A', padding: 'clamp(48px, 6vw, 76px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="uni-hero-grid">
              <motion.div className="uni-hero-text" style={{ display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For universities and career centers</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 6.6vw, 78px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '26px' }}>
                  Get more of your{' '}<br className="br-desktop" />students <span style={{ color: '#D7FF43' }}>hired</span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '500px' }}>
                  Graduates all look the same on paper. A video pitch is what makes one of them memorable.
                </p>
                <div className="uni-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D7FF43', color: '#061A3A', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'transform 0.15s ease, filter 0.15s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.filter = 'brightness(0.94)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.filter = 'none'; }}>
                    Schedule a demo <ArrowRight size={16} />
                  </Link>
                  <Link href="/oliviastone" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'background 0.15s ease, border-color 0.15s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}>
                    See a student Reslink
                  </Link>
                </div>
              </motion.div>

              {/* Coded UI mockup: student Reslink profile + view notification */}
              <motion.div className="uni-hero-visual" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(215,255,67,0.25)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
                  {/* Profile header */}
                  <div style={{ background: '#0A1F3A', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Student Reslink</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#061A3A', background: '#D7FF43', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>LIVE</span>
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
                        poster="/videos/company-student-poster.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
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
                  <div style={{ background: '#F6F7F9', padding: '14px 20px', borderTop: '1px solid #ECEEF1', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#1468E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>G</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Google Recruiter viewed Ava&apos;s Reslink</p>
                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 0:44 of 0:47 · 2h ago</p>
                    </div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1468E8', flexShrink: 0 }} />
                  </div>
                  <div style={{ background: '#FAFFF0', padding: '14px 20px', borderTop: '1px solid #ECEEF1', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={15} color="#061A3A" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview request received</p>
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
        <section style={{ background: '#FBEEF5', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="uni-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', textAlign: 'center' }}>
              {[
                { value: '200+', label: 'universities onboarded' },
                { value: '34%', label: 'avg. placement rate increase' },
                { value: '4x', label: 'employer engagement vs. resumes' },
                { value: '85%', label: 'of students report more callbacks' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#061A3A', lineHeight: 1, letterSpacing: '-0.03em' }}><AnimatedStat value={s.value} /></p>
                  <p style={{ fontSize: '13px', color: '#8A7A85', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxWidth: '140px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── What your career center gets ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 64px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>For your career center</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Finally, numbers you{' '}<br className="br-desktop" />didn&apos;t have to chase
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                Real placement data, employer engagement metrics,{' '}<br className="br-desktop" />and the proof your program is working.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="uni-compare">
              {/* Without Reslink — muted card */}
              <div style={{ background: '#F6F7F9', border: '1px solid #ECEEF1', borderRadius: '22px', padding: 'clamp(24px, 3vw, 34px)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '22px' }}>Without Reslink</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {[
                    'Students submit identical PDF resumes',
                    "No visibility into who's actually hiring",
                    'Placement data comes from self-reported surveys',
                    'Career fairs rely on awkward cold introductions',
                    'Hard to prove the ROI of your program',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#E4E7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <X size={12} color="#9AA1AE" strokeWidth={3} />
                      </span>
                      <span style={{ fontSize: '14.5px', color: '#6B7280', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* With Reslink — elevated navy card, CTA-style blue + pink glow */}
              <div style={{ position: 'relative', background: 'radial-gradient(ellipse 58% 62% at 94% 0%, rgba(214,61,157,0.38), transparent 55%), radial-gradient(ellipse 60% 60% at 4% 100%, rgba(20,104,232,0.32), transparent 55%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)', border: '2px solid #D7FF43', borderRadius: '22px', padding: 'clamp(24px, 3vw, 34px)', overflow: 'hidden', boxShadow: '0 26px 60px rgba(6,26,58,0.22)' }}>
                <p style={{ position: 'relative', zIndex: 1, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '22px' }}>With Reslink</p>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {[
                    'Every student has a video pitch employers actually watch',
                    'Dashboard shows recruiter views and engagement in real time',
                    'Placement outcomes tracked automatically, no surveys needed',
                    'Students share Reslinks at career fairs. Employers remember them',
                    'Annual report pulls directly from your career center dashboard',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <Check size={12} color="#061A3A" strokeWidth={3} />
                      </span>
                      <span style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-body)', lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section style={{ background: '#061A3A', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.18), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Up and running{' '}<br className="br-desktop" />in three steps.
              </h2>
            </motion.div>
            <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
              {UNI_STEPS.map((s, i) => {
                const isLast = i === UNI_STEPS.length - 1;
                return (
                  <motion.div key={s.num} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '52px' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: isLast ? '#D7FF43' : 'rgba(255,255,255,0.05)', border: isLast ? 'none' : '1.5px solid rgba(255,255,255,0.18)', boxShadow: isLast ? '0 0 0 6px rgba(215,255,67,0.12)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="step-num" style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: isLast ? '#061A3A' : '#fff', lineHeight: 1 }}>{i + 1}</span>
                      </div>
                      {!isLast && <div style={{ width: '2px', flex: 1, background: 'rgba(255,255,255,0.1)', marginTop: '8px', minHeight: '40px' }} />}
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px 28px', flex: 1, marginBottom: isLast ? 0 : '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '13px', fontWeight: 900, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>STEP {s.num}</span>
                        <span style={{ padding: '3px 12px', borderRadius: '100px', background: s.tagColor, fontSize: '11px', fontWeight: 700, color: s.tagText, fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.tag}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '10px' }}>{s.title}</h3>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontFamily: 'var(--font-body)', margin: 0 }}>{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── What students get: the same tools ─── */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What your students get access to</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Every tool they need{' '}<br className="br-desktop" />to stand out and get hired.
              </h2>
            </motion.div>
            <div className="uni-feat-grid">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '28px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)', height: '100%' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <f.icon size={22} color={f.color} strokeWidth={1.8} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#061A3A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>{f.title}</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ background: '#EEF4FF', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>From career centers</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#061A3A', lineHeight: 0.98, marginBottom: '16px' }}>
                Career centers that{' '}<br className="br-desktop" />get results.
              </h2>
              <p style={{ fontSize: '16px', color: '#7A85A0', fontFamily: 'var(--font-body)' }}>All pilot partners. Titles shown with permission.</p>
            </motion.div>
            <div className="uni-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ background: 'radial-gradient(ellipse 58% 62% at 94% 0%, rgba(214,61,157,0.34), transparent 55%), radial-gradient(ellipse 60% 60% at 4% 100%, rgba(20,104,232,0.3), transparent 55%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)', borderRadius: '24px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: 'clamp(20px, 2.3vw, 27px)', color: '#fff', lineHeight: 1.45, fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '26px' }}>&ldquo;{UNI_FEATURED.quote}&rdquo;</p>
                    <span style={{ display: 'inline-block', background: '#D7FF43', color: '#061A3A', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', padding: '8px 16px', borderRadius: '100px' }}>{UNI_FEATURED.stat}</span>
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '28px 0 22px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={UNI_FEATURED.avatar} alt="" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{UNI_FEATURED.name}</p>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{UNI_FEATURED.sub}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="uni-testi-side">
                {UNI_SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
                    <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid #DCE8FB', padding: '26px 28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(20,104,232,0.06)' }}>
                      <p style={{ fontSize: '15px', color: '#2A3242', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '20px' }}>&ldquo;{q.quote}&rdquo;</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={q.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{q.name}</p>
                          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{q.sub}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: '#F6F7F9' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#061A3A', lineHeight: 0.95 }}>Everything you need to know</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── (shared component — pink-glow navy box, matches the rest of the site) */}
        <CTA
          eyebrow="For universities and career centers"
          heading={<>Give your students{' '}<br className="br-desktop" /><span>a real advantage.</span></>}
          body="Join hundreds of universities using Reslink to get their students hired at better companies, faster."
          primaryLabel="Add your school to the waitlist"
          primaryHref="/get-started?type=university"
          secondaryLabel="Schedule a demo"
          secondaryHref="/contact/sales"
          footnote="Free for students · No credit card to join the waitlist"
        />

      </main>
      <Footer />
    </>
  );
}
