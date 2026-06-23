'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Star, Building2, Users, Zap, GraduationCap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

/* ─── Hero notifications ─── */
const NOTIFICATIONS = [
  { name: 'Ava Johnson', role: 'Marketing, matched to Brandify', grade: 'A', score: 92, color: '#22C55E', initials: 'AJ', avatarBg: '#4F6EF7' },
  { name: 'Leo Kim', role: 'Engineering, matched to DevCore', grade: 'A+', score: 97, color: '#22C55E', initials: 'LK', avatarBg: '#10B981' },
  { name: 'Sofia Reyes', role: 'Finance, matched to Vantage Capital', grade: 'B+', score: 88, color: '#3B82F6', initials: 'SR', avatarBg: '#F59E0B' },
  { name: 'Ethan Moore', role: 'Design, matched to Studio Nine', grade: 'A', score: 91, color: '#22C55E', initials: 'EM', avatarBg: '#EF4444' },
];

function NotifCard({ n }: { n: typeof NOTIFICATIONS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 32px rgba(4,22,53,0.2)', border: '1px solid rgba(255,255,255,0.9)', minWidth: '220px' }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: n.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{n.initials}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.name}</p>
        <p style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.role}</p>
      </div>
      <div style={{ background: n.color, borderRadius: '6px', padding: '2px 7px', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{n.grade} {n.score}</span>
      </div>
    </div>
  );
}

/* ─── Steps ─── */
const STEPS = [
  {
    icon: Building2, num: '01', title: 'Set up your career center',
    desc: 'Create your university account in minutes. Configure your branded student portal, add your career services team, and connect your employer network the same day.',
    tag: 'Free to start', tagColor: '#D8F950', tagText: '#041635',
  },
  {
    icon: Users, num: '02', title: 'Students build their profiles',
    desc: 'Students sign up, record a one-minute video pitch, and upload their resume. Their Reslink profile is ready to share with any employer in minutes.',
    tag: 'Students get started free', tagColor: 'rgba(255,255,255,0.1)', tagText: 'rgba(255,255,255,0.6)',
  },
  {
    icon: Zap, num: '03', title: 'Employers discover your talent',
    desc: 'Post roles to your branded board and let employers browse AI-screened student profiles. Top candidates rise to the surface automatically.',
    tag: 'AI screens every application', tagColor: 'rgba(255,255,255,0.1)', tagText: 'rgba(255,255,255,0.6)',
  },
  {
    icon: GraduationCap, num: '04', title: 'Track placements and outcomes',
    desc: 'See which students are getting interviews, who is landing offers, and which employers keep coming back. Real data for your annual placement report.',
    tag: 'Where career centers prove their value', tagColor: 'rgba(216,249,80,0.12)', tagText: '#D8F950',
  },
];

/* ─── Feature tabs ─── */
const FEATURE_TABS = [
  {
    id: 'screening', label: 'AI Screening',
    tagline: 'Every student gets a fair shot. Every employer gets a ranked list.',
    desc: 'AI grades every student application from A+ to F with a written breakdown of their video pitch, resume quality, and role fit. Employers spend their time on students who are genuinely ready.',
    img: '/product-applicants.webp', alt: 'AI-ranked student applicants',
    bullets: ['Students ranked A through F with full written breakdown', 'Scored on video communication, resume, and role fit', 'Employers see top candidates without sifting through hundreds'],
  },
  {
    id: 'profiles', label: 'Student Profiles',
    tagline: 'A profile that shows the whole student, not just a GPA.',
    desc: 'Each student gets a shareable Reslink profile with their video pitch, resume, work samples, and AI score attached. One link to show an employer everything.',
    img: '/product-candidate.webp', alt: 'Student profile view',
    bullets: ['Video pitch, resume, and portfolio in one profile', 'AI score and written assessment included', 'Career center team can add coaching notes privately'],
  },
  {
    id: 'pipeline', label: 'Student Pipeline',
    tagline: 'Know exactly where every student stands.',
    desc: 'Organize your students into custom lists by graduation year, major, job readiness, or whatever matters to your team. Never lose track of a student mid-search.',
    img: '/product-lists.webp', alt: 'Student pipeline management',
    bullets: ['Custom lists by major, year, or readiness tier', 'AI grade visible on every saved student profile', 'One click to a full profile and video from any list'],
  },
  {
    id: 'board', label: 'Job Board',
    tagline: 'Your university job board, powered by AI.',
    desc: 'A branded job board at reslink.io/university/yourname brings all your employer relationships and open roles into one place students actually check.',
    img: '/product-jobboard.webp', alt: 'University branded job board',
    bullets: ['Branded board with all active employer roles', 'Students apply with resume, video pitch, and profile', 'Sync roles to Indeed, LinkedIn, and ZipRecruiter'],
  },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How does Reslink work for a university career center?', a: 'Your career center sets up a university account and branded job board. Students create Reslink profiles with a video pitch and resume. Employers post roles and browse AI-screened candidates from your student body. Your team tracks placements in one dashboard.' },
  { q: 'Do students need to pay to use Reslink?', a: 'No. Student profiles are free to create. Reslink credits are only needed when employers want AI screening on applications. Students never pay to apply.' },
  { q: 'Can we use Reslink alongside our existing ATS or career platform?', a: 'Yes. Reslink does not replace your existing systems. Students add their Reslink profile link to any application. Employers use Reslink alongside their normal hiring workflow.' },
  { q: 'How do employers connect with our students through Reslink?', a: 'Employers can post roles directly to your branded board or search your student profiles. Every application comes with a video pitch and AI score, so employers move faster on the candidates they want.' },
  { q: 'What does setup look like for a university?', a: 'Most career centers are fully set up within a week. We provide a dedicated onboarding session for your team and a student launch kit to drive adoption across campus.' },
  { q: 'How does Reslink help us prove placement outcomes?', a: 'Your dashboard tracks applications, interviews, and offers across all student activity. At the end of the year you have a clean report showing placement rates, top employers, and which programs drove the most outcomes.' },
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

const FEATURED = {
  quote: 'Before Reslink our students were applying to hundreds of jobs with a PDF no one was reading. Now employers watch their pitch before the first call. Our placement rate is up 34% in one year.',
  name: 'Dr. Angela Torres', role: 'Director of Career Services', company: 'Westfield University', color: '#059669',
};
const SIDE_QUOTES = [
  { quote: 'Employers come back to us now. They tell us our students are different because they actually know how to present themselves. Reslink made that happen.', name: 'Marcus Webb', role: 'Career Development Lead', company: 'Central State University', color: '#0C63E3' },
  { quote: 'We used to rely on word of mouth to prove our placement numbers. Now I can pull a real report every semester and show exactly what our career center delivered.', name: 'Priya Desai', role: 'VP of Student Success', company: 'Northgate College', color: '#7C3AED' },
  { quote: 'Students who were struggling to get callbacks started landing interviews once they had a video profile. It levels the playing field in a way a resume never could.', name: 'James Holman', role: 'Career Counselor', company: 'Summit Institute', color: '#D97706' },
];

export default function UniversitiesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [notifA, setNotifA] = useState(0);
  const [notifB, setNotifB] = useState(2);
  const [notifVisible, setNotifVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setNotifVisible(false);
      setTimeout(() => {
        setNotifA(i => (i + 1) % NOTIFICATIONS.length);
        setNotifB(i => (i + 1) % NOTIFICATIONS.length);
        setNotifVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Navbar />
      <style>{`
        .uni-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .uni-testi-side { display: flex; flex-direction: column; gap: 16px; }
        .uni-feat-tabs { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 32px; }
        .uni-feat-tab { padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 600; border: 1.5px solid #E2E4E9; background: #fff; cursor: pointer; transition: all 0.18s; font-family: var(--font-body); color: #5C6070; }
        .uni-feat-tab.active { background: #041635; color: #fff; border-color: #041635; }
        .uni-feat-tab:hover:not(.active) { border-color: #041635; color: #041635; }
        .uni-feat-body { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        @media (max-width: 900px) {
          .uni-testi-grid { grid-template-columns: 1fr !important; }
          .uni-feat-body { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) { .uni-stats-row { grid-template-columns: 1fr !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 112px) 24px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For universities and career centers</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 7.5vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Help your students<br /><span style={{ color: '#D8F950' }}>land great jobs.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto 36px' }}>
                Reslink gives career centers a branded job board, AI-powered student profiles, and real placement data. Give your students a competitive edge from day one.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
                <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Schedule a demo <ArrowRight size={16} />
                </Link>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Start for free
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '36px', left: '-16px', zIndex: 10, pointerEvents: 'none' }}>
                <AnimatePresence mode="wait">
                  {notifVisible && (
                    <motion.div key={`a${notifA}`} initial={{ opacity: 0, x: -10, y: 6 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.32 }}>
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                        <NotifCard n={NOTIFICATIONS[notifA]} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div style={{ position: 'absolute', bottom: '56px', right: '-16px', zIndex: 10, pointerEvents: 'none' }}>
                <AnimatePresence mode="wait">
                  {notifVisible && (
                    <motion.div key={`b${notifB}`} initial={{ opacity: 0, x: 10, y: 6 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.32, delay: 0.08 }}>
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
                        <NotifCard n={NOTIFICATIONS[notifB]} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(4,22,53,0.75)', backdropFilter: 'blur(8px)', borderRadius: '100px', padding: '5px 12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>Live placements</span>
              </div>
              <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
                <div style={{ background: '#1C2333', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '5px', padding: '3px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>app.reslink.io</div>
                  </div>
                </div>
                <Image src="/product-dashboard.webp" alt="Reslink career center dashboard" width={1200} height={750} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
          </div>
        </section>

        <div style={{ background: '#F7F8FA' }}><LogoTicker /></div>

        {/* How it works */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.15), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                From setup to placement in four steps.
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {STEPS.map((s, i) => (
                <motion.div key={s.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '52px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon size={20} color="#D8F950" strokeWidth={2} />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, rgba(216,249,80,0.4), rgba(255,255,255,0.08))', marginTop: '8px', minHeight: '40px' }} />
                    )}
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px 28px', flex: 1, marginBottom: i < STEPS.length - 1 ? '16px' : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '13px', fontWeight: 900, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>STEP {s.num}</span>
                      <span style={{ padding: '2px 10px', borderRadius: '100px', background: s.tagColor, fontSize: '11px', fontWeight: 600, color: s.tagText, fontFamily: 'var(--font-body)' }}>{s.tag}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontFamily: 'var(--font-body)', margin: 0 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything your career center needs</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                Built for career centers<br />that want real results.
              </h2>
              <div className="uni-feat-tabs">
                {FEATURE_TABS.map((t, i) => (
                  <button key={t.id} onClick={() => setActiveTab(i)} className={`uni-feat-tab${activeTab === i ? ' active' : ''}`}>{t.label}</button>
                ))}
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {FEATURE_TABS.map((t, i) => activeTab === i && (
                <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} whileHover={{ scale: 1.01 }} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E4E9', boxShadow: '0 12px 40px rgba(4,22,53,0.1)', marginBottom: '36px' }}>
                    <div style={{ background: '#F1F3F5', borderBottom: '1px solid #E2E4E9', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                      </div>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <div style={{ background: '#fff', borderRadius: '5px', padding: '2px 14px', fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', border: '1px solid #E2E4E9' }}>app.reslink.io</div>
                      </div>
                    </div>
                    <div style={{ maxHeight: '380px', overflow: 'hidden' }}>
                      <Image src={t.img} alt={t.alt} width={1200} height={750} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  </motion.div>
                  <div className="uni-feat-body">
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '12px' }}>{t.tagline}</h3>
                      <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{t.desc}</p>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
                      {t.bullets.map((b, bi) => (
                        <motion.li key={b} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: bi * 0.08 + 0.15, duration: 0.28 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                          <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#041635', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="uni-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', textAlign: 'center' }}>
              {[
                { value: '34%', label: 'average increase in placement rate for career centers' },
                { value: '4x', label: 'more employer engagement with video profiles' },
                { value: '85%', label: 'of students say Reslink improved their interview rate' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(52px, 7vw, 80px)', fontWeight: 900, color: '#D8F950', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: '10px', lineHeight: 1.5, maxWidth: '180px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What career centers say</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98 }}>
                Trusted by career centers<br />that take outcomes seriously.
              </h2>
            </motion.div>
            <div className="uni-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ background: '#041635', borderRadius: '20px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '24px' }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#D8F950" color="#D8F950" />)}
                    </div>
                    <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: '#fff', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '32px' }}>&ldquo;{FEATURED.quote}&rdquo;</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: FEATURED.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{FEATURED.name.split(' ').filter((_,i) => i > 0).map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{FEATURED.name}</p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{FEATURED.role} at {FEATURED.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="uni-testi-side">
                {SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
                    <div style={{ background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: '#F7F8FA' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.95 }}>Everything you need to know</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: '#041635', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Give your students<br /><span style={{ color: '#D8F950' }}>a real advantage.</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join the career centers using Reslink to get their students hired at better companies, faster.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo <ArrowRight size={16} />
              </Link>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Start for free
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Free to start. Students always free. No credit card required.</p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
