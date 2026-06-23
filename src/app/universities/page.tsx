'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Star, Users, Zap, BarChart2, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

/* ─── Value props ─── */
const VALUE_PROPS = [
  { icon: Users, title: 'Get students hired faster', desc: 'Give students the tools to create video pitches that grab employer attention and convert applications into interviews.' },
  { icon: BarChart2, title: 'Enhance your employability outcomes', desc: "Strengthen your university's career-readiness metrics with an innovative, scalable tool trusted by schools worldwide." },
  { icon: Zap, title: 'Teach communication that lands', desc: 'Students learn how to talk about their story, strengths, and goals through authentic video pitches.' },
  { icon: Share2, title: 'Seamlessly integrate into your programs', desc: 'Reslink fits easily into existing career services, employability modules, and workshops. No complex setup required.' },
];

/* ─── How it works ─── */
const STEPS = [
  {
    num: '01', title: 'Schedule a demo',
    desc: 'Connect with our team to explore how Reslink can enhance your existing career services, employability modules, or student success programs.',
    tag: 'Free consultation',
  },
  {
    num: '02', title: 'Set up access for your students',
    desc: "We'll guide your team through setup and onboarding, providing ready-to-use resources so students can start creating within days.",
    tag: 'Done in days',
  },
  {
    num: '03', title: 'Students create and share their Reslinks',
    desc: 'Students record authentic video pitches, get real-time AI feedback on clarity and confidence, and showcase their videos in portfolios, internship applications, and career fairs.',
    tag: 'Where outcomes happen',
  },
];

/* ─── Student features ─── */
const FEATURES = [
  {
    label: 'PitchAI',
    tagline: 'Create powerful video pitches in seconds.',
    desc: 'Students create authentic video introductions that bring their skills and personality to life, with built-in AI tools to write, shorten, and tailor their pitch to any role.',
    img: '/product-candidate.webp', alt: 'Reslink PitchAI script editor',
    bullets: ['AI writes and refines the script for any role', 'Shorten, lengthen, or adjust tone in one click', 'Students sound like themselves, not a template'],
  },
  {
    label: 'Guided Teleprompter',
    tagline: 'Record seamlessly with a guided teleprompter.',
    desc: 'The in-app teleprompter walks students through every line, helping them deliver polished, confident pitches without memorizing a script.',
    img: '/product-dashboard.webp', alt: 'Reslink teleprompter recording view',
    bullets: ['Adjustable speed and font size', 'Countdown timer and real-time recording', 'Multiple takes until they nail it'],
  },
  {
    label: 'Progress Tracking',
    tagline: 'Track progress and engagement over time.',
    desc: "Students can monitor who's viewed their Reslink and see how their clarity and delivery improve over time. Career centers get a full picture of student engagement.",
    img: '/product-lists.webp', alt: 'Student engagement tracking dashboard',
    bullets: ['See who viewed their profile and when', 'Track improvement across multiple recordings', 'Career center dashboard for program outcomes'],
  },
  {
    label: 'Platform Integrations',
    tagline: 'Integrate with every platform students already use.',
    desc: 'Reslinks integrate seamlessly with job boards, career platforms, and LinkedIn, making it easy for students to attach their video profile to any application.',
    img: '/product-jobboard.webp', alt: 'Reslink job board and platform integrations',
    bullets: ['Sync to Indeed, LinkedIn, and ZipRecruiter', 'Share a single link on any application', 'Works alongside your existing ATS and portals'],
  },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How does a university get started with Reslink?', a: 'Schools schedule a demo with our team. We walk through how Reslink fits into your existing career services, then guide your team through setup and onboarding. Most career centers have students creating Reslinks within days.' },
  { q: 'Do students need to pay to use Reslink?', a: 'No. Student profiles are free to create. Schools access Reslink through an institutional plan. Students never pay to record, share, or update their video profile.' },
  { q: 'Can Reslink be used in career fairs and employability workshops?', a: 'Yes. Reslink is built to integrate into your existing programs. Students can create their Reslink as part of a workshop and share it at career fairs, in applications, and on LinkedIn.' },
  { q: 'How does the AI feedback work for students?', a: "PitchAI writes and refines students' video pitch scripts based on their role and background. After recording, students get feedback on clarity and confidence. Each take helps them improve." },
  { q: 'What does a Reslink profile include?', a: 'A Reslink is a shareable profile with a video pitch, resume, work samples, and an AI score. One link gives any employer or graduate school a complete picture of the student.' },
  { q: 'How do we measure the impact on our career readiness program?', a: 'Your career center dashboard tracks student profile creation, employer views, application activity, and placement outcomes. We provide data for your annual employability reporting.' },
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
  name: 'Dr. Angela Torres', role: 'Director of Career Services', company: 'Westfield University',
};
const SIDE_QUOTES = [
  { quote: 'Employers come back to us now. They tell us our students are different because they actually know how to present themselves. Reslink made that happen.', name: 'Marcus Webb', role: 'Career Development Lead', company: 'Central State University', color: '#0C63E3' },
  { quote: 'Students who were struggling to get callbacks started landing interviews once they had a video profile. It levels the playing field in a way a resume never could.', name: 'James Holman', role: 'Career Counselor', company: 'Summit Institute', color: '#7C3AED' },
  { quote: 'We used to rely on word of mouth to prove our placement numbers. Now I can pull a real report every semester and show exactly what our career center delivered.', name: 'Priya Desai', role: 'VP of Student Success', company: 'Northgate College', color: '#D97706' },
];

export default function UniversitiesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <>
      <Navbar />
      <style>{`
        .uni-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .uni-testi-side { display: flex; flex-direction: column; gap: 16px; }
        .uni-value-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .uni-feat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .uni-feat-row.flip { direction: rtl; }
        .uni-feat-row.flip > * { direction: ltr; }
        .uni-steps-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) {
          .uni-testi-grid { grid-template-columns: 1fr !important; }
          .uni-value-grid { grid-template-columns: 1fr !important; }
          .uni-feat-row { grid-template-columns: 1fr !important; }
          .uni-feat-row.flip { direction: ltr; }
          .uni-steps-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) { .uni-stats-row { grid-template-columns: 1fr !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(80px, 11vw, 128px) 24px clamp(64px, 8vw, 96px)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '800px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For universities and career centers</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(52px, 8vw, 108px)', fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: '28px' }}>
                Empower your students<br /><span style={{ color: '#D8F950' }}>to stand out.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '540px', margin: '0 auto 40px' }}>
                Help your students build confidence, sharpen communication skills, and land their dream roles — all through video.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Add your school to the waitlist <ArrowRight size={16} />
                </Link>
                <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Schedule a demo
                </Link>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>Join hundreds of universities helping students stand out with Reslink</p>
            </motion.div>
          </div>
        </section>

        <div style={{ background: '#F7F8FA' }}><LogoTicker /></div>

        {/* ─── Elevate your career readiness program ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What you get</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                Elevate your career readiness program.
              </h2>
              <p style={{ fontSize: '16px', color: '#5C6070', fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
                Prepare your students for career success with industry-standard tools tailored to help them land their dream job.
              </p>
            </motion.div>
            <div className="uni-value-grid">
              {VALUE_PROPS.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '28px', background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1', height: '100%' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#041635', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <v.icon size={22} color="#D8F950" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '8px', lineHeight: 1.1 }}>{v.title}</h3>
                      <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{v.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How it works: 3 steps on dark navy ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.18), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Here&apos;s how Reslink works<br />for universities.
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', maxWidth: '480px', margin: '16px auto 0', lineHeight: 1.65 }}>
                Reslink makes it easy for schools to bring video-based career readiness to their students through a simple three-step setup.
              </p>
            </motion.div>
            <div className="uni-steps-row">
              {STEPS.map((s, i) => (
                <motion.div key={s.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px 28px', height: '100%', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '52px', fontWeight: 900, color: 'rgba(255,255,255,0.06)', lineHeight: 1, position: 'absolute', top: '20px', right: '24px' }}>#{s.num}</span>
                      <span style={{ display: 'inline-block', padding: '3px 12px', background: i === 0 ? '#D8F950' : i === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(216,249,80,0.12)', borderRadius: '100px', fontSize: '11px', fontWeight: 700, color: i === 0 ? '#041635' : i === 1 ? 'rgba(255,255,255,0.55)' : '#D8F950', fontFamily: 'var(--font-body)' }}>{s.tag}</span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '12px', fontWeight: 900, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', marginBottom: '8px' }}>STEP {s.num}</p>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '14px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Student features: alternating blocks ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '72px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Built for student success</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                Everything students need<br />to communicate and get hired.
              </h2>
              <p style={{ fontSize: '16px', color: '#5C6070', fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>
                Give your students tools to communicate confidently, build standout video profiles, and develop career-ready skills — all in one place.
              </p>
            </motion.div>

            {/* Feature tab pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
              {FEATURES.map((f, i) => (
                <button key={f.label} onClick={() => setActiveFeature(i)} style={{ padding: '9px 20px', borderRadius: '100px', fontSize: '14px', fontWeight: 600, border: `1.5px solid ${activeFeature === i ? '#041635' : '#E2E4E9'}`, background: activeFeature === i ? '#041635' : '#fff', color: activeFeature === i ? '#fff' : '#5C6070', cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--font-body)' }}>{f.label}</button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {FEATURES.map((f, i) => activeFeature === i && (
                <motion.div key={f.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <div className="uni-feat-row">
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>{f.label}</p>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '16px' }}>{f.tagline}</h3>
                      <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: '28px' }}>{f.desc}</p>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {f.bullets.map(b => (
                          <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#041635', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#D8F950" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E4E9', boxShadow: '0 16px 48px rgba(4,22,53,0.1)' }}>
                      <div style={{ background: '#F1F3F5', borderBottom: '1px solid #E2E4E9', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                          <div style={{ background: '#fff', borderRadius: '5px', padding: '2px 12px', fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', border: '1px solid #E2E4E9' }}>app.reslink.io</div>
                        </div>
                      </div>
                      <Image src={f.img} alt={f.alt} width={900} height={560} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="uni-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', textAlign: 'center' }}>
              {[
                { value: '34%', label: 'average increase in placement rate for career centers' },
                { value: '4x', label: 'more employer engagement with video profiles vs. resumes' },
                { value: '85%', label: 'of students say Reslink improved their interview rate' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(52px, 7vw, 80px)', fontWeight: 900, color: '#D8F950', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxWidth: '180px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
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
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{FEATURED.name.split(' ').filter((_, i) => i > 0).map(n => n[0]).join('')}</span>
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

        {/* ─── FAQ ─── */}
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

        {/* ─── CTA ─── */}
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
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Add your school to the waitlist <ArrowRight size={16} />
              </Link>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Free for students. No credit card required to join the waitlist.</p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
