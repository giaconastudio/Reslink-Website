'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Users, Zap, Award, GraduationCap, ArrowRight, Star, Plus, Minus, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

const FEATURES = [
  { icon: GraduationCap, color: '#0C63E3', bg: '#EEF4FF', title: 'Give students a real career edge', body: 'A Reslink video profile sets your graduates apart when they\'re competing for the same roles with the same GPA and the same resume format.' },
  { icon: Video, color: '#7C3AED', bg: '#F3EEFF', title: 'Modern career services at scale', body: 'Roll out Reslink to your entire student body with one institutional plan. Career services teams love how fast students get up and running.' },
  { icon: Award, color: '#059669', bg: '#ECFDF5', title: 'Improve graduate outcomes', body: 'Track which students have created profiles and monitor engagement from employer partners. Tie Reslink adoption to placement metrics.' },
  { icon: BarChart2, color: '#D97706', bg: '#FFFBEB', title: 'Engagement dashboards for advisors', body: 'Career advisors get visibility into which students are active, how their profiles are performing, and where to focus coaching.' },
  { icon: Users, color: '#E11D48', bg: '#FFF1F2', title: 'Connect employers to your talent', body: 'Share a curated gallery of student Reslinks directly with employer partners at career fairs, recruiting events, or via email.' },
  { icon: Zap, color: '#0891B2', bg: '#ECFEFF', title: 'Fast onboarding for any cohort', body: 'Launch with your entire graduating class in a single session. Students record their first Reslink in under 10 minutes. no tech experience needed.' },
];

const STEPS = [
  { num: '01', title: 'Set up your institution', desc: 'Create your university account and customize it with your branding. Invite your career services team in minutes.' },
  { num: '02', title: 'Onboard your students', desc: 'Send a single invitation link to your student cohort. Students sign up, upload their resume, and record their pitch in under 10 minutes.' },
  { num: '03', title: 'Connect with employers', desc: 'Share curated student Reslink galleries with your employer partners. Recruiters watch video profiles before your career fair even starts.' },
  { num: '04', title: 'Track outcomes and improve', desc: 'See placement rates, profile engagement, and student activity in your advisor dashboard. Measure what\'s working and optimize.' },
];

const TESTIMONIALS = [
  { quote: 'Our placement rate improved significantly after rolling out Reslink. Employers started requesting meetings with students before our career fair even opened.', name: 'Dr. Patricia Lee', role: 'Career Center Director', company: 'NYU', color: '#57068C' },
  { quote: 'Students who used Reslink landed interviews at twice the rate of those who didn\'t. The data speaks for itself.', name: 'James Whitmore', role: 'Associate Director, Career Services', company: 'Georgetown', color: '#003366' },
  { quote: 'I was nervous about recording a video at first. After my second take I had something I was proud of. I got three callbacks that week.', name: 'Aaliyah Johnson', role: 'Class of \'25', company: 'Michigan', color: '#00274C' },
  { quote: 'Reslink helped our grads stand out against candidates from larger schools with bigger name recognition. It levels the playing field.', name: 'Prof. Maria Santos', role: 'Career Advisor', company: 'Northeastern', color: '#CC0000' },
  { quote: 'Our employer partners love the shortlists we send now. Having video profiles changes the whole conversation before the first interview.', name: 'Kevin Park', role: 'Director of Employer Relations', company: 'USC', color: '#990000' },
  { quote: 'The platform is so intuitive that students figure it out without any training. That was a huge win for our lean career services team.', name: 'Rachel Torres', role: 'Career Coach', company: 'Penn State', color: '#1E407C' },
  { quote: 'One student told me Reslink was the reason she got her dream job. When students say that, you know you\'ve invested in the right tool.', name: 'Dr. Andre Dupont', role: 'Dean of Students', company: 'UCLA', color: '#003B5C' },
  { quote: 'The analytics dashboard showed us exactly which students were getting traction and which needed more coaching. Game-changing for our team.', name: 'Sarah Nguyen', role: 'Career Services Manager', company: 'Harvard', color: '#A51C30' },
];

const FAQS = [
  { q: 'How does Reslink work for universities?', a: 'Your institution gets a dedicated account. Students sign up, record their video profile, and share their Reslink with employers. Career advisors have a dashboard to track engagement and outcomes across the entire cohort.' },
  { q: 'Can we onboard an entire graduating class?', a: 'Yes. You send one invitation link and students sign up at their own pace. Most complete their Reslink profile in under 10 minutes. No IT setup required.' },
  { q: 'How do employers access student profiles?', a: 'You can share curated student galleries with your employer partners via a link. no account required on their end. Employers can also search for graduates on the Reslink platform directly.' },
  { q: 'Can advisors monitor student progress?', a: 'Yes. The advisor dashboard shows which students have created profiles, how many views they\'ve received, and which employer partners are engaging with your student pool.' },
  { q: 'Is there a cost to students?', a: 'No. Students always use Reslink for free. Institutional pricing covers the advisor dashboard, bulk onboarding, and employer integration features.' },
  { q: 'How do we get started?', a: 'Book a demo with our university partnerships team. We\'ll walk you through the platform, discuss your cohort size, and set up a pilot program at no cost.' },
];

function TestiCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px 26px', border: '1px solid #ECEEF1', width: '320px', flexShrink: 0, boxShadow: '0 2px 12px rgba(4,22,53,0.05)' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D8F950" color="#D8F950" />)}
      </div>
      <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>&ldquo;{t.quote}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-phudu)' }}>
          {t.name.split(' ').filter(n => !n.startsWith('Dr') && !n.startsWith('Prof')).slice(0, 2).map(n => n[0]).join('')}
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{t.name}</p>
          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

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

export default function UniversitiesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes uni-testi { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes uni-testi-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .uni-testi-track { animation: uni-testi 28s linear infinite; display: flex; }
        .uni-testi-track-rev { animation: uni-testi-rev 34s linear infinite; display: flex; }
        .uni-testi-track:hover, .uni-testi-track-rev:hover { animation-play-state: paused; }
        .uni-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .uni-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .uni-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .uni-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 960px) {
          .uni-hero-grid { grid-template-columns: 1fr !important; }
          .uni-hero-img { display: none !important; }
          .uni-steps-grid { grid-template-columns: 1fr !important; }
          .uni-steps-right { display: none !important; }
          .uni-problem-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) { .uni-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .uni-feat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="uni-hero-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For universities</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Help your<br />students get<br /><span style={{ color: '#D8F950' }}>hired faster.</span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '480px' }}>
                  Reslink gives university career centers a scalable, modern tool to help graduates stand out. from first-year students to your most placement-ready seniors.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Get started free <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Talk to sales
                  </Link>
                </div>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {[['3×', 'more employer interest'], ['78%', 'land interviews in 30d'], ['95%', 'advisor satisfaction']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{v}</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div className="uni-hero-img" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=900" alt="University students" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <LogoTicker />

        {/* ─── Problem section ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>The graduate problem</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Great students.<br />Identical résumés.<br /><span style={{ color: '#0C63E3' }}>Lost opportunities.</span>
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>Your graduates are talented. But when they apply with the same resume format as everyone else, that talent is invisible. Reslink changes that.</p>
            </motion.div>
            <div className="uni-problem-grid">
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div style={{ borderRadius: '18px', border: '1px solid #E8EAF0', padding: '28px', background: '#FAFBFC', height: '100%' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Without Reslink</span>
                  <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <GraduationCap size={14} color="#9A9FA8" strokeWidth={1.8} />
                      </div>
                      <span style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Class of &lsquo;25 · 400 graduates</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
                      {[100, 88, 95, 72].map((w, i) => (
                        <div key={i} style={{ height: '8px', borderRadius: '4px', background: '#ECEEF1', width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                  {[
                    { text: 'Graduates blend into a sea of similar CVs', red: true },
                    { text: 'Career advisors can\'t track who\'s getting traction', red: true },
                    { text: 'Employers can\'t tell who\'s a culture fit from paper', red: true },
                    { text: 'Placement rates stay flat year after year', red: true },
                  ].map(({ text, red }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#FEF2F2', borderRadius: '8px', marginBottom: '8px', border: '1px solid #FECACA' }}>
                      <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 700 }}>✗</span>
                      <span style={{ fontSize: '13px', color: '#DC2626', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}>
                <div style={{ borderRadius: '18px', border: '2px solid #D8F950', overflow: 'hidden', boxShadow: '0 16px 56px rgba(4,22,53,0.12)' }}>
                  <div style={{ background: '#041635', padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>With Reslink</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>Career fair gallery</span>
                    </div>
                    {['Aaliyah Johnson · Finance', 'Marcus Reid · Engineering', 'Sofia Torres · Marketing'].map((name, i) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ['#0C63E3', '#059669', '#A855F7'][i], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{name[0]}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{name.split(' · ')[0]}</p>
                          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>{name.split(' · ')[1]}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950' }} />
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{[14, 8, 22][i]} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '14px 24px', background: '#F7F8FA', borderBottom: '1px solid #ECEEF1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3' }} />
                    <p style={{ fontSize: '12px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>Google employer viewed 12 student profiles today</p>
                  </div>
                  <div style={{ padding: '14px 24px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={18} color="#16A34A" strokeWidth={2} />
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>8 students invited to interview</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="uni-steps-grid">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
                  <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '48px' }}>
                    Better outcomes in<br />four simple steps.
                  </h2>
                </motion.div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {STEPS.map((s, i) => (
                    <motion.div key={s.num} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: '16px', padding: '20px 0', borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '28px', fontWeight: 900, color: '#D8F950', lineHeight: 1 }}>{s.num}</span>
                        <div>
                          <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '19px', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '6px' }}>{s.title}</p>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div className="uni-steps-right" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', aspectRatio: '4/3' }}>
                  <img src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=900" alt="University career fair" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Why Reslink for universities</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Better outcomes.<br />Better rankings.
              </h2>
            </motion.div>
            <div className="uni-feat-grid">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
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
        <section style={{ padding: 'clamp(64px, 8vw, 100px) 0', background: '#fff', overflow: 'hidden' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 56px', padding: '0 24px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What universities say</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98, marginBottom: '16px' }}>
              Real outcomes from<br />real institutions.
            </h2>
            <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>Career centers and students at top universities trust Reslink to improve graduate placement rates.</p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '64px' }}>
            <div style={{ overflow: 'hidden' }}>
              <div className="uni-testi-track" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {doubled.map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="uni-testi-track-rev" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {[...doubled].reverse().map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
          </div>
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="uni-testi-stats">
            <style>{`@media (max-width: 640px) { .uni-testi-stats { grid-template-columns: 1fr 1fr !important; } }`}</style>
            {[['3×', 'more employer interest'], ['78%', 'land interviews in 30d'], ['95%', 'advisor satisfaction'], ['50+', 'partner universities']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: '24px 8px', background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1' }}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</p>
                <p style={{ fontSize: '13px', color: '#5C6070', marginTop: '8px', fontFamily: 'var(--font-body)' }}>{l}</p>
              </div>
            ))}
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
              Ready to boost<br /><span style={{ color: '#D8F950' }}>graduate outcomes?</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Partner with Reslink to give your students a hiring advantage from day one.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Get started free <ArrowRight size={16} />
              </Link>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Free to start · No credit card required</p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
