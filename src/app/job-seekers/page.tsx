'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Share2, ArrowRight, Star, Plus, Minus, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

/* ─── Features ─── */
const FEATURES = [
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'Record in minutes', body: 'Our teleprompter guides you word by word. No memorization, no nervousness. Just your best take.' },
  { icon: BarChart2, color: '#7C3AED', bg: '#F3EEFF', title: 'See who\'s watching', body: 'Know when recruiters view your profile, how long they watch, and how many times. No more sending into the void.' },
  { icon: Zap, color: '#D97706', bg: '#FFFBEB', title: 'AI-powered script', body: 'Paste your resume and get a personalized 90-second script tailored to the roles you\'re targeting.' },
  { icon: Globe, color: '#059669', bg: '#ECFDF5', title: 'One link. Everywhere.', body: 'Share your Reslink on LinkedIn, in email, or anywhere you apply. It works on every device.' },
  { icon: FileText, color: '#E11D48', bg: '#FFF1F2', title: 'Your resume, but alive', body: 'Reslink pairs your video pitch with your resume highlights in one clean profile. Recruiters get the full picture instantly.' },
  { icon: Share2, color: '#0891B2', bg: '#ECFEFF', title: 'Stand out in any inbox', body: 'Most applications look identical. A Reslink link in your email or cover letter is impossible to ignore.' },
];

/* ─── Steps ─── */
const STEPS = [
  { num: '01', title: 'Create your free account', desc: 'Sign up in under a minute. no credit card, no setup fees. Your profile is ready the moment you land.' },
  { num: '02', title: 'Upload your resume', desc: 'Drop in your PDF and we parse it instantly. work history, skills, education pulled in automatically.' },
  { num: '03', title: 'Record your 60-second pitch', desc: 'Our built-in teleprompter scrolls your script so you stay on camera looking natural, not down at notes.' },
  { num: '04', title: 'Share and track everything', desc: 'Paste your Reslink anywhere you apply. See every recruiter who opens it and every second of video watched.' },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { quote: 'After adding my Reslink to every application, I started getting callbacks within 48 hours. Complete game changer.', name: 'Ben Harper', role: 'Software Engineer', company: 'Amazon', color: '#4F6EF7' },
  { quote: 'I landed my dream job and I genuinely believe the video resume made all the difference. Reslink let me show who I really am.', name: 'Sofia Rodriguez', role: 'Marketing Manager', company: 'Meta', color: '#A855F7' },
  { quote: 'The analytics feature is unreal. I saw a senior partner watch my video three times. I reached out and got an interview the next morning.', name: 'Marcus Williams', role: 'Finance Analyst', company: 'EY', color: '#F59E0B' },
  { quote: 'My recruiter said she had never seen a video resume done that well. She shared it with the entire hiring team before my first interview.', name: 'Elena Kowalski', role: 'Product Manager', company: 'Revolut', color: '#10B981' },
  { quote: 'As a designer I care about how I present myself. Reslink resonated perfectly with the creative teams I was targeting. Two offers in two weeks.', name: 'Priya Patel', role: 'UX Designer', company: 'Google', color: '#EF4444' },
  { quote: 'I was hesitant about putting a video online, but it made it so easy. Within a week I had three recruiter calls lined up.', name: 'James Chen', role: 'Supply Chain Analyst', company: 'Tesla', color: '#041635' },
  { quote: 'Honestly thought video resumes were gimmicky. Then I got a reply from Stripe within 24 hours of sending my Reslink. I was wrong.', name: 'Aisha Mensah', role: 'Data Scientist', company: 'Stripe', color: '#635BFF' },
  { quote: 'The teleprompter made recording so natural. I didn\'t have to memorise anything. I recorded a great take on my second try.', name: 'Luca Romano', role: 'Sales Development Rep', company: 'HubSpot', color: '#FF7A59' },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'Is Reslink free?', a: 'Yes. Creating a job seeker account and building your video resume is completely free. Premium plans add advanced analytics and features for power users.' },
  { q: 'How long should my video pitch be?', a: 'We recommend 60–90 seconds. A tight, confident pitch that respects the recruiter\'s time performs significantly better than a long one.' },
  { q: 'Can I use Reslink for any type of job?', a: 'Absolutely. Reslink works across all industries. tech, finance, marketing, creative, operations, and more.' },
  { q: 'Will my video pitch affect ATS compatibility?', a: 'No. Your traditional resume is still uploaded alongside your video. Reslink supplements your PDF. it works with all ATS systems.' },
  { q: 'Do I need special equipment to record my video?', a: 'No. Your laptop or phone camera is all you need. Good lighting and a quiet room make the biggest difference.' },
  { q: 'Can I edit my Reslink after sharing it?', a: 'Yes. You can update your video anytime. Your link stays the same, so anyone who already received it will see your latest version automatically.' },
  { q: 'Can companies search for candidates on Reslink?', a: 'Yes. Companies and recruiters can discover and search candidate profiles directly on the platform.' },
];

/* ─── Sub-components ─── */
function TestiCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px 26px', border: '1px solid #ECEEF1', width: '320px', flexShrink: 0, boxShadow: '0 2px 12px rgba(4,22,53,0.05)' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D8F950" color="#D8F950" />)}
      </div>
      <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>&ldquo;{t.quote}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-phudu)' }}>
          {t.name.split(' ').map(n => n[0]).join('')}
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

/* ─── Page ─── */
export default function JobSeekersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes js-testi { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes js-testi-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .js-testi-track { animation: js-testi 28s linear infinite; display: flex; }
        .js-testi-track-rev { animation: js-testi-rev 34s linear infinite; display: flex; }
        .js-testi-track:hover, .js-testi-track-rev:hover { animation-play-state: paused; }
        .js-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .js-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .js-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .js-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 960px) {
          .js-hero-grid { grid-template-columns: 1fr !important; }
          .js-hero-img { display: none !important; }
          .js-steps-grid { grid-template-columns: 1fr !important; }
          .js-steps-right { display: none !important; }
          .js-problem-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) { .js-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .js-feat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="js-hero-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For job seekers</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Stop blending in.<br /><span style={{ color: '#D8F950' }}>Start standing out.</span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '480px' }}>
                  A video resume that shows recruiters who you really are. your energy, your clarity, your drive. Not just another PDF.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Build my Reslink free <ArrowRight size={16} />
                  </Link>
                  <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    See free templates
                  </Link>
                </div>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {[['300+', 'interviews landed'], ['10k+', 'active users'], ['48h', 'fastest hire']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{v}</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div className="js-hero-img" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Job seeker" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Logo ticker ─── */}
        <LogoTicker />

        {/* ─── Problem section ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Your resume, but better</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Stand out before<br />you even get<br /><span style={{ color: '#0C63E3' }}>the interview.</span>
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>A static PDF can't show your personality or passion. A Reslink does. and lands interviews faster.</p>
            </motion.div>
            <div className="js-problem-grid">
              {/* Before */}
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div style={{ borderRadius: '18px', border: '1px solid #E8EAF0', padding: '28px', background: '#FAFBFC', height: '100%' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>The old way</span>
                  <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: '#E8EAF0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      </div>
                      <span style={{ fontSize: '12px', color: '#B0B4BE', fontFamily: 'var(--font-body)' }}>resume_final_v7.pdf</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {[100, 88, 95, 72, 83].map((w, i) => (
                        <div key={i} style={{ height: '8px', borderRadius: '4px', background: '#ECEEF1', width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                  {[
                    { icon: '✗', text: 'Looks identical to 200 other applicants', red: true },
                    { icon: '✗', text: 'Recruiters spend 6 seconds on average', red: true },
                    { icon: '✗', text: 'No response after 3 weeks', red: true },
                  ].map(({ icon, text, red }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: red ? '#FEF2F2' : '#F0FDF4', borderRadius: '8px', marginBottom: '8px', border: `1px solid ${red ? '#FECACA' : '#BBF7D0'}` }}>
                      <span style={{ fontSize: '13px', color: red ? '#EF4444' : '#16A34A', fontWeight: 700 }}>{icon}</span>
                      <span style={{ fontSize: '13px', color: red ? '#DC2626' : '#15803D', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* After */}
              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}>
                <div style={{ borderRadius: '18px', border: '2px solid #D8F950', overflow: 'hidden', boxShadow: '0 16px 56px rgba(4,22,53,0.12)' }}>
                  <div style={{ background: '#041635', padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>With Reslink</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>LIVE</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0C63E3, #4F6EF7)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.15)' }}>
                        <span style={{ fontSize: '16px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>OS</span>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#fff' }}>OLIVIA STONE</p>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Business Dev Rep · London, UK</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '16px 24px', background: '#F7F8FA', borderBottom: '1px solid #ECEEF1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>G</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Google Recruiter viewed your Reslink</p>
                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 0:44 of 0:47 · 1h ago</p>
                    </div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3' }} />
                  </div>
                  <div style={{ padding: '16px 24px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle size={14} color="#041635" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Interview request received</p>
                      <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>HubSpot · 2 days after sharing</p>
                    </div>
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
            <div className="js-steps-grid">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
                  <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '48px' }}>
                    Four steps to your<br />next interview.
                  </h2>
                </motion.div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
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
              <motion.div className="js-steps-right" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', aspectRatio: '4/3' }}>
                  <img src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Recording a video resume" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything you need</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Built for the<br />job seeker.
              </h2>
            </motion.div>
            <div className="js-feat-grid">
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
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Success stories</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98, marginBottom: '16px' }}>
              Real results from<br />real candidates.
            </h2>
            <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>Over 10,000 job seekers have used Reslink to stand out and land interviews.</p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '64px' }}>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <div className="js-testi-track" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {doubled.map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <div className="js-testi-track-rev" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {[...doubled].reverse().map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
          </div>
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="js-testi-stats">
            <style>{`@media (max-width: 640px) { .js-testi-stats { grid-template-columns: 1fr 1fr !important; } }`}</style>
            {[['10k+', 'Active job seekers'], ['92%', 'Would recommend Reslink'], ['24h', 'Fastest interview booked'], ['50+', 'Countries represented']].map(([v, l]) => (
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
          <div style={{ position: 'absolute', bottom: '-30%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(216,249,80,0.08), transparent 60%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Ready to<br /><span style={{ color: '#D8F950' }}>stand out?</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              It takes less than 10 minutes to build your first Reslink. Free to start, no credit card required.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Get started free <ArrowRight size={16} />
              </Link>
              <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                See free templates
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Free to start · Takes less than 5 minutes</p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
