'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Users, Zap, Search, MessageSquare, ArrowRight, Star, Plus, Minus, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

const FEATURES = [
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'See candidates before the call', body: 'Review 60-second video profiles and decide who\'s worth your time before scheduling a single interview.' },
  { icon: Search, color: '#7C3AED', bg: '#F3EEFF', title: 'Filter for real fit — fast', body: 'A two-minute video tells you more about culture fit than a two-page resume ever could. Spot the right people quickly.' },
  { icon: BarChart2, color: '#059669', bg: '#ECFDF5', title: 'Analytics on every view', body: 'Know who on your team watched which profiles, for how long, and how many times. Full visibility into your hiring pipeline.' },
  { icon: Users, color: '#D97706', bg: '#FFFBEB', title: 'Collaborate without the chaos', body: 'Share candidate Reslinks with your hiring team, leave ratings and notes, and align on decisions without endless back-and-forth.' },
  { icon: Zap, color: '#E11D48', bg: '#FFF1F2', title: 'Cut time-to-hire by up to 40%', body: 'Companies using Reslink consistently report shorter hiring cycles and better quality-of-hire — because they\'re making better decisions earlier.' },
  { icon: MessageSquare, color: '#0891B2', bg: '#ECFEFF', title: 'Integrate with your existing tools', body: 'Reslink fits into your current workflow. Candidates share their link anywhere they apply — ATS, email, or LinkedIn.' },
];

const STEPS = [
  { num: '01', title: 'Set up your company profile', desc: 'Create your organization account in minutes. Invite your hiring team and assign roles — free to get started.' },
  { num: '02', title: 'Discover or invite candidates', desc: 'Search candidates on Reslink directly, or simply ask applicants to include their Reslink link when they apply.' },
  { num: '03', title: 'Review video profiles together', desc: 'Your team watches 60-second pitches, leaves notes, and rates candidates — all in one shared dashboard.' },
  { num: '04', title: 'Move fast on the right people', desc: 'Aligned decisions, fewer wasted calls, faster offers. Reslink takes days off your hiring cycle.' },
];

const TESTIMONIALS = [
  { quote: 'We reviewed 40 Reslinks in an afternoon. Our team was aligned on a shortlist before end of day. That never happened with traditional resumes.', name: 'Sarah Mitchell', role: 'Head of Talent', company: 'Stripe', color: '#635BFF' },
  { quote: 'The video profiles completely changed how we evaluate candidates. We\'re making better hires and our time-to-hire dropped by almost a third.', name: 'Tom Bradley', role: 'VP People', company: 'HubSpot', color: '#FF7A59' },
  { quote: 'We used to spend an entire week on first-round phone screens. With Reslink we do that work in two hours. It\'s genuinely transformative.', name: 'Jenna Park', role: 'Recruiting Manager', company: 'Google', color: '#4285F4' },
  { quote: 'Candidates who come in with a Reslink are more prepared and more confident. The quality of our hires has improved noticeably.', name: 'Daniel Moore', role: 'Director of Engineering', company: 'Revolut', color: '#041635' },
  { quote: 'Our hiring managers love being able to watch profiles on their own time. No more scheduling hell for first-round calls.', name: 'Amara Osei', role: 'Talent Acquisition Lead', company: 'Meta', color: '#1877F2' },
  { quote: 'Reslink gave us a way to evaluate soft skills before the first call. That alone cut our bad hire rate significantly.', name: 'Chris Walsh', role: 'Chief People Officer', company: 'Accenture', color: '#A100FF' },
  { quote: 'We use Reslink for every role now. I can\'t imagine going back to CVs-only screening. It\'s night and day.', name: 'Laura Finch', role: 'Senior Recruiter', company: 'Amazon', color: '#FF9900' },
  { quote: 'The analytics showing who watched and for how long helped us catch a star candidate our team almost missed.', name: 'Marcus Reid', role: 'Hiring Manager', company: 'Adobe', color: '#FA0F00' },
];

const FAQS = [
  { q: 'How do companies access Reslink?', a: 'Companies sign up for a free account and can immediately start browsing candidate profiles or invite applicants to share their Reslink link as part of the application process.' },
  { q: 'Can we require candidates to submit a Reslink?', a: 'Yes. You can include your Reslink intake link in your job postings or application instructions. Candidates record and share in minutes.' },
  { q: 'Does Reslink work with our existing ATS?', a: 'Yes. Reslink is a supplement to your existing workflow. Candidates share their link alongside their standard application — it works with all ATS platforms.' },
  { q: 'How long does onboarding take for a hiring team?', a: 'Most teams are reviewing candidates on the same day they sign up. We offer onboarding support for larger organizations.' },
  { q: 'Is there a limit to how many candidates we can view?', a: 'Free plans include access to candidate profiles on the platform. Paid plans remove limits and add team analytics, notes, and collaboration features.' },
  { q: 'What support is included?', a: 'All paid plans include email support and access to our help center. Enterprise plans include priority support and a dedicated account manager.' },
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

export default function CompaniesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes co-testi { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes co-testi-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .co-testi-track { animation: co-testi 28s linear infinite; display: flex; }
        .co-testi-track-rev { animation: co-testi-rev 34s linear infinite; display: flex; }
        .co-testi-track:hover, .co-testi-track-rev:hover { animation-play-state: paused; }
        .co-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .co-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .co-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .co-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 960px) {
          .co-hero-grid { grid-template-columns: 1fr !important; }
          .co-hero-img { display: none !important; }
          .co-steps-grid { grid-template-columns: 1fr !important; }
          .co-steps-right { display: none !important; }
          .co-problem-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) { .co-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .co-feat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="co-hero-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For companies</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Stop reading<br />résumés. Start<br /><span style={{ color: '#D8F950' }}>seeing people.</span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '480px' }}>
                  Reslink gives your hiring team a faster, smarter way to find candidates worth interviewing — before the first call is ever scheduled.
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
                  {[['5×', 'better hire quality'], ['30%', 'faster time-to-hire'], ['91%', 'manager satisfaction']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{v}</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div className="co-hero-img" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Hiring team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>The hiring problem</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                200 CVs. Six<br />seconds each. Zero<br /><span style={{ color: '#0C63E3' }}>signal.</span>
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>Traditional hiring is slow, biased by formatting, and misses great candidates. Reslink shows you the person, not the paper.</p>
            </motion.div>
            <div className="co-problem-grid">
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div style={{ borderRadius: '18px', border: '1px solid #E8EAF0', padding: '28px', background: '#FAFBFC', height: '100%' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>The old way</span>
                  <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ECEEF1' }} />
                      <span style={{ fontSize: '12px', color: '#B0B4BE', fontFamily: 'var(--font-body)' }}>Application #1 of 200+</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
                      {[100, 88, 95, 72, 83, 90, 77].map((w, i) => (
                        <div key={i} style={{ height: '8px', borderRadius: '4px', background: '#ECEEF1', width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                  {[
                    { icon: '✗', text: 'Spend weeks reviewing identical PDFs', red: true },
                    { icon: '✗', text: 'Phone screens that waste everyone\'s time', red: true },
                    { icon: '✗', text: 'Miss great candidates lost in formatting', red: true },
                    { icon: '✗', text: 'Team misaligned — endless back-and-forth', red: true },
                  ].map(({ icon, text, red }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#FEF2F2', borderRadius: '8px', marginBottom: '8px', border: '1px solid #FECACA' }}>
                      <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 700 }}>{icon}</span>
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
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>3 candidates shortlisted</span>
                    </div>
                    {['Ben Harper — Software Engineer', 'Aisha Mensah — Data Scientist', 'Luca Romano — Sales Rep'].map((name, i) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ['#4F6EF7', '#635BFF', '#FF7A59'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{name[0]}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{name.split(' — ')[0]}</p>
                          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>{name.split(' — ')[1]}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>0:4{i + 2}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '16px 24px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={20} color="#16A34A" strokeWidth={2} />
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Shortlist approved by whole team</p>
                      <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>3 interviews booked · same afternoon</p>
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
            <div className="co-steps-grid">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
                  <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '48px' }}>
                    Better hires in<br />four simple steps.
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
              <motion.div className="co-steps-right" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', aspectRatio: '4/3' }}>
                  <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Hiring team reviewing candidates" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Why Reslink for hiring</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Hire better.<br />Move faster.
              </h2>
            </motion.div>
            <div className="co-feat-grid">
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
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What hiring teams say</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98, marginBottom: '16px' }}>
              Trusted by hiring<br />teams everywhere.
            </h2>
            <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>Companies of all sizes use Reslink to find better candidates, faster.</p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '64px' }}>
            <div style={{ overflow: 'hidden' }}>
              <div className="co-testi-track" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {doubled.map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="co-testi-track-rev" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {[...doubled].reverse().map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
          </div>
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="co-testi-stats">
            <style>{`@media (max-width: 640px) { .co-testi-stats { grid-template-columns: 1fr 1fr !important; } }`}</style>
            {[['5×', 'better hire quality'], ['30%', 'faster time-to-hire'], ['91%', 'manager satisfaction'], ['48h', 'avg. to shortlist']].map(([v, l]) => (
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
              Ready to upgrade<br /><span style={{ color: '#D8F950' }}>your hiring?</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join the companies finding better candidates, faster.
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
