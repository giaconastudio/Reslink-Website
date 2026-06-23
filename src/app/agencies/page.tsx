'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Star, UserPlus, FilePlus, Zap, Video } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

/* ─── Palette ─── */
const C = {
  dark: '#0F0F1A',
  accent: '#F97316',
  accentDim: 'rgba(249,115,22,0.18)',
  accentSubtle: 'rgba(249,115,22,0.1)',
  accentText: '#F97316',
  bodyBg: '#FFF7ED',
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.1)',
  mutedText: 'rgba(255,255,255,0.5)',
  sectionLight: '#FFF7ED',
  sectionWhite: '#fff',
};

/* ─── Hero notifications ─── */
const NOTIFICATIONS = [
  { name: 'Priya Sharma', role: 'Product Manager, matched to TechCorp', grade: 'A', score: 93, color: '#22C55E', initials: 'PS', avatarBg: '#F97316' },
  { name: 'James Okafor', role: 'Software Engineer, matched to Finbuild', grade: 'A+', score: 96, color: '#22C55E', initials: 'JO', avatarBg: '#EA580C' },
  { name: 'Mia Chen', role: 'UX Designer, matched to Launchpad', grade: 'B+', score: 86, color: '#3B82F6', initials: 'MC', avatarBg: '#FB923C' },
  { name: 'Ryan Torres', role: 'Sales Lead, matched to GrowthCo', grade: 'A', score: 90, color: '#22C55E', initials: 'RT', avatarBg: '#C2410C' },
];

function NotifCard({ n }: { n: typeof NOTIFICATIONS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.9)', minWidth: '220px' }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: n.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{n.initials}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#0F0F1A', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.name}</p>
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
    icon: UserPlus, num: '01', title: 'Create your agency account',
    desc: 'Set up your agency profile in minutes. Add your team, configure your branded candidate portal, and start building your pipeline the same day.',
    tag: 'Free to start', tagColor: '#F97316', tagText: '#fff',
  },
  {
    icon: FilePlus, num: '02', title: 'Post your client roles',
    desc: 'Add job posts for every active search. Share your branded board link with candidates or embed it in your existing outreach workflow.',
    tag: 'Takes 5 minutes', tagColor: 'rgba(255,255,255,0.08)', tagText: 'rgba(255,255,255,0.55)',
  },
  {
    icon: Zap, num: '03', title: 'Screen smarter with AI',
    desc: 'Every candidate who applies gets an AI score based on video pitch quality, resume match, and role fit. Spend your billable hours on the candidates worth a call.',
    tag: 'Starts at $0.50 per candidate', tagColor: 'rgba(255,255,255,0.08)', tagText: 'rgba(255,255,255,0.55)',
  },
  {
    icon: Video, num: '04', title: 'Place the right people, every time',
    desc: 'Present pre-screened, AI-ranked candidates to your clients with video profiles attached. Faster approvals, fewer surprises, and more placements per search.',
    tag: 'Where agencies win more business', tagColor: 'rgba(249,115,22,0.15)', tagText: '#F97316',
  },
];

/* ─── Feature tabs ─── */
const FEATURE_TABS = [
  {
    id: 'ai', label: 'AI Screening',
    tagline: 'Screen 50 candidates in the time it took to review five.',
    desc: 'Every applicant gets an AI grade from A+ to F with a full written breakdown of their video pitch, resume match, and role fit. Your team opens the dashboard to a ranked list, not an inbox full of CVs.',
    img: '/product-applicants.webp', alt: 'AI-ranked candidates',
    bullets: ['Candidates ranked A through F with full AI breakdown', 'Scored on video pitch, resume match, and role fit', 'Top picks surfaced automatically at the top of your list'],
  },
  {
    id: 'collab', label: 'Client Collaboration',
    tagline: 'Share shortlists your clients actually respond to.',
    desc: 'Send clients a clean view of your top candidates complete with video pitches and AI scores. Get faster approvals and fewer back-and-forth emails.',
    img: '/product-candidate.webp', alt: 'Candidate profile shared with client',
    bullets: ['Full candidate profiles with resume, video, and AI score', 'Team notes and ratings visible across your agency', 'One link to share a shortlist with any client'],
  },
  {
    id: 'pipeline', label: 'Pipeline Management',
    tagline: 'Run multiple searches without losing track of anyone.',
    desc: 'Organize candidates into custom lists across all your active client searches. Final Round, Strong Maybes, Keep Warm. No spreadsheets, no chaos.',
    img: '/product-lists.webp', alt: 'Candidate pipeline lists',
    bullets: ['Custom lists across all your active client searches', 'AI grade visible on every saved candidate', 'One click back to their full profile and video'],
  },
  {
    id: 'board', label: 'Candidate Portal',
    tagline: 'Your branded portal. Your talent pipeline.',
    desc: 'Every agency gets a public Reslink board at reslink.io/agency/yourname. Candidates apply with a video pitch built in and AI screens every submission automatically.',
    img: '/product-jobboard.webp', alt: 'Agency branded candidate portal',
    bullets: ['Branded portal with all your active client roles', 'Candidates apply with resume, video, and more', 'Sync roles to Indeed, LinkedIn, and ZipRecruiter'],
  },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How does Reslink fit into my existing recruitment workflow?', a: 'Reslink layers on top of what you already do. Candidates apply through your normal channels and attach their Reslink link. Your team reviews video profiles asynchronously and shares shortlists with clients. No rip-and-replace required.' },
  { q: 'Can I use Reslink for multiple client searches at once?', a: 'Yes. You can manage unlimited job posts and candidate pipelines across all your active searches. Each role has its own applicant list, AI rankings, and shortlist tools.' },
  { q: 'How do I share candidates with clients?', a: 'Each candidate has a shareable profile link. You can send clients a direct link to a candidate profile or share a curated shortlist with their video pitches and AI scores attached.' },
  { q: 'What does onboarding look like for a recruitment agency?', a: 'Most agencies are fully set up the same day they sign up. We provide a dedicated onboarding session tailored to your team size and workflow. No IT involvement required.' },
  { q: 'Is there a free trial?', a: 'Yes. We offer a 14-day free trial with full access to all agency features. No credit card required to start.' },
  { q: 'How does pricing work for agencies?', a: 'Agency plans are based on team size and search volume. Credits power AI screening at $0.50 per candidate. Book a demo and we will put together a plan that fits your business.' },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #F3E8DC' }}>
      <button onClick={toggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F0F1A', fontFamily: 'var(--font-body)' }}>{q}</span>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open ? '#F97316' : '#FDE8D8', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
          {open ? <Minus size={12} color="#fff" /> : <Plus size={12} color="#F97316" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '14px', color: '#6B5747', lineHeight: 1.7, paddingBottom: '20px', fontFamily: 'var(--font-body)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FEATURED = {
  quote: 'We used to spend two full days screening before presenting to a client. With Reslink we present a shortlist the same week the brief comes in. Our clients have noticed.',
  name: 'Claire Nguyen', role: 'Managing Director', company: 'Apex Talent Group', color: '#F97316',
};
const SIDE_QUOTES = [
  { quote: 'Reslink AI catches things I would have missed. One candidate had a weak CV but an outstanding pitch. He got placed. That never would have happened before.', name: 'David Park', role: 'Senior Recruiter', company: 'Bridge Search', color: '#EA580C' },
  { quote: 'Our placement rate is up 22% since we started using Reslink. Clients trust our shortlists more because they can see the video before the interview.', name: 'Natalie Brooks', role: 'Head of Recruitment', company: 'Elevate Staffing', color: '#FB923C' },
  { quote: 'The time savings alone paid for Reslink in the first month. My team spends their hours on relationship building, not CV sifting.', name: 'Marcus Reid', role: 'Founder', company: 'Clarity Recruiting', color: '#C2410C' },
];

export default function AgenciesPage() {
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
        .ag-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .ag-testi-side { display: flex; flex-direction: column; gap: 16px; }
        .ag-feat-tabs { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 32px; }
        .ag-feat-tab { padding: 10px 20px; border-radius: 100px; font-size: 14px; font-weight: 600; border: 1.5px solid #F3E0D0; background: #fff; cursor: pointer; transition: all 0.18s; font-family: var(--font-body); color: #6B5747; }
        .ag-feat-tab.active { background: #F97316; color: #fff; border-color: #F97316; }
        .ag-feat-tab:hover:not(.active) { border-color: #F97316; color: #F97316; }
        .ag-feat-body { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        @media (max-width: 900px) {
          .ag-testi-grid { grid-template-columns: 1fr !important; }
          .ag-feat-body { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) { .ag-stats-row { grid-template-columns: 1fr !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: C.dark, padding: 'clamp(72px, 10vw, 112px) 24px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: `radial-gradient(ellipse, ${C.accentDim}, transparent 65%)`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '20%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(249,115,22,0.08), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accentText, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For recruitment agencies</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 7.5vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Place better candidates.<br /><span style={{ color: C.accentText }}>Close more searches.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: C.mutedText, lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto 36px' }}>
                Reslink gives recruiters AI-powered video screening so you spend less time on CVs and more time closing placements your clients love.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
                <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#F97316', color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
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
              <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15,15,26,0.8)', backdropFilter: 'blur(8px)', borderRadius: '100px', padding: '5px 12px', border: '1px solid rgba(249,115,22,0.3)' }}>
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F97316' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>Live candidates</span>
              </div>
              <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', border: '1px solid rgba(249,115,22,0.2)', borderBottom: 'none', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
                <div style={{ background: '#1A1020', borderBottom: '1px solid rgba(249,115,22,0.1)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ background: 'rgba(249,115,22,0.1)', borderRadius: '5px', padding: '3px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>app.reslink.io</div>
                  </div>
                </div>
                <Image src="/product-dashboard.webp" alt="Reslink recruitment dashboard" width={1200} height={750} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
          </div>
        </section>

        <div style={{ background: C.sectionLight }}><LogoTicker /></div>

        {/* How it works */}
        <section style={{ background: C.dark, padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '600px', height: '600px', background: `radial-gradient(ellipse, ${C.accentDim}, transparent 65%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.accentText, marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                From brief to placement in four steps.
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {STEPS.map((s, i) => (
                <motion.div key={s.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '52px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(249,115,22,0.12)', border: '2px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon size={20} color="#F97316" strokeWidth={2} />
                    </div>
                    {i < STEPS.length - 1 && (
                      <div style={{ width: '2px', flex: 1, background: 'linear-gradient(to bottom, rgba(249,115,22,0.5), rgba(255,255,255,0.05))', marginTop: '8px', minHeight: '40px' }} />
                    )}
                  </div>
                  <div style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.12)', borderRadius: '16px', padding: '24px 28px', flex: 1, marginBottom: i < STEPS.length - 1 ? '16px' : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '13px', fontWeight: 900, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em' }}>STEP {s.num}</span>
                      <span style={{ padding: '2px 10px', borderRadius: '100px', background: s.tagColor, fontSize: '11px', fontWeight: 600, color: s.tagText, fontFamily: 'var(--font-body)' }}>{s.tag}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: C.mutedText, lineHeight: 1.75, fontFamily: 'var(--font-body)', margin: 0 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ background: C.sectionLight, padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F97316', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything your agency needs</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#0F0F1A', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                Built for how great<br />recruiters work.
              </h2>
              <div className="ag-feat-tabs">
                {FEATURE_TABS.map((t, i) => (
                  <button key={t.id} onClick={() => setActiveTab(i)} className={`ag-feat-tab${activeTab === i ? ' active' : ''}`}>{t.label}</button>
                ))}
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {FEATURE_TABS.map((t, i) => activeTab === i && (
                <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} whileHover={{ scale: 1.01 }} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #F3D5BB', boxShadow: '0 12px 40px rgba(249,115,22,0.12)', marginBottom: '36px' }}>
                    <div style={{ background: '#FEF0E7', borderBottom: '1px solid #F3D5BB', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                      </div>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <div style={{ background: '#fff', borderRadius: '5px', padding: '2px 14px', fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', border: '1px solid #F3D5BB' }}>app.reslink.io</div>
                      </div>
                    </div>
                    <div style={{ maxHeight: '380px', overflow: 'hidden' }}>
                      <Image src={t.img} alt={t.alt} width={1200} height={750} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  </motion.div>
                  <div className="ag-feat-body">
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900, color: '#0F0F1A', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '12px' }}>{t.tagline}</h3>
                      <p style={{ fontSize: '15px', color: '#6B5747', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{t.desc}</p>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
                      {t.bullets.map((b, bi) => (
                        <motion.li key={b} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: bi * 0.08 + 0.15, duration: 0.28 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#3A2A1A', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                          <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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
        <section style={{ background: C.dark, padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: `radial-gradient(ellipse, ${C.accentDim}, transparent 65%)`, pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="ag-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', textAlign: 'center' }}>
              {[
                { value: '3x', label: 'more placements per recruiter per month' },
                { value: '60%', label: 'reduction in time spent screening CVs' },
                { value: '22%', label: 'average increase in placement rate' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(52px, 7vw, 80px)', fontWeight: 900, color: '#F97316', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxWidth: '180px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ background: C.sectionWhite, padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F97316', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What recruiters say</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0F0F1A', lineHeight: 0.98 }}>
                Trusted by recruitment agencies<br />placing top talent.
              </h2>
            </motion.div>
            <div className="ag-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ background: '#0F0F1A', borderRadius: '20px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(249,115,22,0.2), transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '24px' }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#F97316" color="#F97316" />)}
                    </div>
                    <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: '#fff', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '32px' }}>&ldquo;{FEATURED.quote}&rdquo;</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: FEATURED.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
                    <div style={{ background: '#FFF7ED', borderRadius: '16px', border: '1px solid #F3D5BB', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                          {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#F97316" color="#F97316" />)}
                        </div>
                        <p style={{ fontSize: '14px', color: '#3A2A1A', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '16px' }}>&ldquo;{q.quote}&rdquo;</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: q.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{q.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#0F0F1A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{q.name}</p>
                          <p style={{ fontSize: '11px', color: '#9A7B6A', fontFamily: 'var(--font-body)' }}>{q.role} at {q.company}</p>
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
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: C.sectionLight }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F97316', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0F0F1A', lineHeight: 0.95 }}>Everything you need to know</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #F3D5BB', padding: '0 28px', boxShadow: '0 1px 8px rgba(249,115,22,0.06)' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: C.dark, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: `radial-gradient(ellipse, ${C.accentDim}, transparent 60%)`, pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Close more placements.<br /><span style={{ color: '#F97316' }}>Starting today.</span>
            </h2>
            <p style={{ fontSize: '18px', color: C.mutedText, lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join the recruitment agencies using Reslink to place better candidates faster.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#F97316', color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
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
