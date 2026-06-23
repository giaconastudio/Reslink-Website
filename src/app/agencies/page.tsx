'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Star, UserPlus, FilePlus, Zap, Video, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

/* ─── Cycling candidate cards ─── */
const CANDIDATES = [
  { name: 'Priya Sharma', role: 'Product Manager', grade: 'A', score: 93, initials: 'PS', avatarBg: '#4F6EF7', matched: 'TechCorp' },
  { name: 'James Okafor', role: 'Software Engineer', grade: 'A+', score: 96, initials: 'JO', avatarBg: '#10B981', matched: 'Finbuild' },
  { name: 'Mia Chen', role: 'UX Designer', grade: 'B+', score: 86, initials: 'MC', avatarBg: '#F59E0B', matched: 'Launchpad' },
  { name: 'Ryan Torres', role: 'Sales Lead', grade: 'A', score: 90, initials: 'RT', avatarBg: '#EF4444', matched: 'GrowthCo' },
];

/* ─── Steps ─── */
const STEPS = [
  { icon: UserPlus, num: '01', title: 'Create your agency account', desc: 'Set up in minutes. Add your team and configure your branded candidate portal the same day.' },
  { icon: FilePlus, num: '02', title: 'Post your client roles', desc: 'Add job posts for every active search. Share your branded board or embed it in your outreach.' },
  { icon: Zap, num: '03', title: 'AI screens every applicant', desc: 'Each candidate gets an A through F grade with a full written breakdown. No more inbox triage.' },
  { icon: Video, num: '04', title: 'Present and place with confidence', desc: 'Share AI-ranked shortlists with clients. Video profiles included. Faster approvals, more placements.' },
];

/* ─── Feature blocks ─── */
const FEATURES = [
  {
    label: 'AI Screening',
    tagline: 'Screen 50 candidates in the time it took to review five.',
    desc: 'Every applicant gets an AI grade from A+ to F with a full written breakdown of their video pitch, resume match, and role fit. Your team opens the dashboard to a ranked list, not an inbox full of CVs.',
    img: '/product-applicants.webp', alt: 'AI-ranked candidates',
    bullets: ['Candidates ranked A through F automatically', 'Scored on video pitch, resume, and role fit', 'Top picks surfaced at the top of your list'],
  },
  {
    label: 'Client Collaboration',
    tagline: 'Share shortlists your clients actually respond to.',
    desc: 'Send clients a clean view of your top candidates complete with video pitches and AI scores. Get faster approvals and fewer back-and-forth emails on every search.',
    img: '/product-candidate.webp', alt: 'Candidate profile shared with client',
    bullets: ['Full profiles with resume, video, and AI score', 'Team notes visible across your whole agency', 'One link to share any shortlist with a client'],
  },
  {
    label: 'Pipeline Management',
    tagline: 'Run every search without losing track of anyone.',
    desc: 'Organize candidates into custom lists across all your active client searches. Final Round, Strong Maybes, Keep Warm. No spreadsheets.',
    img: '/product-lists.webp', alt: 'Candidate pipeline',
    bullets: ['Custom lists across all active searches', 'AI grade visible on every saved candidate', 'One click back to their full profile and video'],
  },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How does Reslink fit into my existing recruitment workflow?', a: 'Reslink layers on top of what you already do. Candidates apply through your normal channels and attach their Reslink link. Your team reviews video profiles asynchronously and shares shortlists with clients. No rip-and-replace required.' },
  { q: 'Can I use Reslink for multiple client searches at once?', a: 'Yes. You can manage unlimited job posts and candidate pipelines across all your active searches. Each role has its own applicant list, AI rankings, and shortlist tools.' },
  { q: 'How do I share candidates with clients?', a: 'Each candidate has a shareable profile link. You can send clients a direct link to a candidate profile or share a curated shortlist with video pitches and AI scores attached.' },
  { q: 'What does onboarding look like for a recruitment agency?', a: 'Most agencies are fully set up the same day they sign up. We provide a dedicated onboarding session tailored to your team size and workflow. No IT involvement required.' },
  { q: 'Is there a free trial?', a: 'Yes. We offer a 14-day free trial with full access to all agency features. No credit card required to start.' },
  { q: 'How does pricing work for agencies?', a: 'Agency plans are based on team size and search volume. Credits power AI screening at $0.50 per candidate. Book a demo and we will put together a plan that fits your business.' },
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
  quote: 'We used to spend two full days screening before presenting to a client. With Reslink we present a shortlist the same week the brief comes in. Our clients have noticed.',
  name: 'Claire Nguyen', role: 'Managing Director', company: 'Apex Talent Group',
};
const SIDE_QUOTES = [
  { quote: 'Reslink AI catches things I would have missed. One candidate had a weak CV but an outstanding pitch. He got placed. That never would have happened before.', name: 'David Park', role: 'Senior Recruiter', company: 'Bridge Search', color: '#059669' },
  { quote: 'Our placement rate is up 22% since we started using Reslink. Clients trust our shortlists more because they can see the video before the interview.', name: 'Natalie Brooks', role: 'Head of Recruitment', company: 'Elevate Staffing', color: '#7C3AED' },
  { quote: 'The time savings alone paid for Reslink in the first month. My team spends their hours on relationship building, not CV sifting.', name: 'Marcus Reid', role: 'Founder', company: 'Clarity Recruiting', color: '#D97706' },
];

export default function AgenciesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveCard(i => (i + 1) % CANDIDATES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Navbar />
      <style>{`
        .ag-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .ag-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .ag-testi-side { display: flex; flex-direction: column; gap: 16px; }
        .ag-steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .ag-feat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .ag-feat-row.flip { direction: rtl; }
        .ag-feat-row.flip > * { direction: ltr; }
        @media (max-width: 900px) {
          .ag-hero { grid-template-columns: 1fr !important; gap: 40px; }
          .ag-testi-grid { grid-template-columns: 1fr !important; }
          .ag-steps-grid { grid-template-columns: 1fr 1fr !important; }
          .ag-feat-row { grid-template-columns: 1fr !important; }
          .ag-feat-row.flip { direction: ltr; }
        }
        @media (max-width: 600px) {
          .ag-steps-grid { grid-template-columns: 1fr !important; }
          .ag-stats-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero: light split layout ─── */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 9vw, 100px) 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="ag-hero">
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For recruitment agencies</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 5.5vw, 80px)', fontWeight: 900, color: '#041635', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Place better candidates.<br /><span style={{ color: '#0C63E3' }}>Close more searches.</span>
                </h1>
                <p style={{ fontSize: 'clamp(15px, 1.4vw, 17px)', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: '36px' }}>
                  Reslink gives recruiters AI-powered video screening so you spend less time on CVs and more time closing placements your clients love.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
                  <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#041635', color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Schedule a demo <ArrowRight size={16} />
                  </Link>
                  <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#F7F8FA', color: '#041635', border: '1.5px solid #E2E4E9', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Start for free
                  </Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['AI screens every applicant automatically', 'Video profiles included with every shortlist', 'Place 3x more candidates per recruiter per month'].map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle2 size={16} color="#0C63E3" strokeWidth={2} />
                      <span style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ position: 'relative' }}>
                {/* Dashboard screenshot */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E4E9', boxShadow: '0 24px 80px rgba(4,22,53,0.12)' }}>
                  <div style={{ background: '#F1F3F5', borderBottom: '1px solid #E2E4E9', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <div style={{ background: '#fff', borderRadius: '5px', padding: '2px 14px', fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', border: '1px solid #E2E4E9' }}>app.reslink.io</div>
                    </div>
                  </div>
                  <Image src="/product-applicants.webp" alt="AI-ranked applicant list" width={900} height={560} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
                {/* Cycling candidate card */}
                <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '220px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeCard} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }} style={{ background: '#fff', borderRadius: '14px', padding: '14px', boxShadow: '0 12px 40px rgba(4,22,53,0.14)', border: '1px solid #E2E4E9' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: CANDIDATES[activeCard].avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{CANDIDATES[activeCard].initials}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{CANDIDATES[activeCard].name}</p>
                          <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{CANDIDATES[activeCard].role}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>AI Score</span>
                        <div style={{ background: '#22C55E', borderRadius: '6px', padding: '2px 8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{CANDIDATES[activeCard].grade} {CANDIDATES[activeCard].score}</span>
                        </div>
                      </div>
                      <div style={{ marginTop: '8px', padding: '6px 8px', background: '#F0F5FF', borderRadius: '6px' }}>
                        <p style={{ fontSize: '11px', color: '#0C63E3', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Matched to {CANDIDATES[activeCard].matched}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Live badge */}
                <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(4,22,53,0.8)', backdropFilter: 'blur(8px)', borderRadius: '100px', padding: '5px 12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>Live candidates</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div style={{ background: '#F7F8FA' }}><LogoTicker /></div>

        {/* ─── How it works: 4-card grid on light bg ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                From brief to placement<br />in four steps.
              </h2>
            </motion.div>
            <div className="ag-steps-grid">
              {STEPS.map((s, i) => (
                <motion.div key={s.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E2E4E9', padding: '28px 24px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: 'var(--font-phudu)', fontSize: '48px', fontWeight: 900, color: '#F0F2F5', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#041635', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <s.icon size={20} color="#D8F950" strokeWidth={2} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#041635', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '13px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features: alternating L/R blocks on white ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '72px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything your agency needs</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Built for how great<br />recruiters work.
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {FEATURES.map((f, i) => (
                <motion.div key={f.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <div className={`ag-feat-row${i % 2 === 1 ? ' flip' : ''}`}>
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
                    <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E4E9', boxShadow: '0 16px 48px rgba(4,22,53,0.09)' }}>
                      <div style={{ background: '#F1F3F5', borderBottom: '1px solid #E2E4E9', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
                        </div>
                      </div>
                      <Image src={f.img} alt={f.alt} width={900} height={560} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Stats: dark navy ─── */}
        <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="ag-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', textAlign: 'center' }}>
              {[
                { value: '3x', label: 'more placements per recruiter per month' },
                { value: '60%', label: 'reduction in time spent screening CVs' },
                { value: '22%', label: 'average increase in placement rate' },
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
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What recruiters say</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98 }}>
                Trusted by agencies<br />placing top talent.
              </h2>
            </motion.div>
            <div className="ag-testi-grid">
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
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{FEATURED.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{FEATURED.name}</p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{FEATURED.role} at {FEATURED.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="ag-testi-side">
                {SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: '#fff' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.95 }}>Everything you need to know</h2>
            </motion.div>
            <div style={{ background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: '#041635', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Close more placements.<br /><span style={{ color: '#D8F950' }}>Starting today.</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join the recruitment agencies using Reslink to place better candidates faster.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo <ArrowRight size={16} />
              </Link>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Start for free
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Free to start. 14-day trial. No credit card required.</p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
