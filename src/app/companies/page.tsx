'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Star, UserPlus, FilePlus, Zap, Video, Users, List, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnimatedStat } from '@/components/CountUp';
import { TiltCard } from '@/components/TiltCard';
import LogoTicker from '@/components/LogoTicker';
import AIScreeningDemo from '@/components/AIScreeningDemo';
import HeroToggle from '@/components/HeroToggle';

/* ─── Hero notifications ─── */
const NOTIFICATIONS = [
  { name: 'Zara Mitchell', role: 'Frontend Engineer Intern', grade: 'A', score: 91, color: '#22C55E', initials: 'ZM', avatarBg: '#4F6EF7' },
  { name: 'Ben Holloway', role: 'Software Engineer', grade: 'B+', score: 84, color: '#3B82F6', initials: 'BH', avatarBg: '#10B981' },
  { name: 'Aisha Mensah', role: 'Senior Product Manager', grade: 'A', score: 88, color: '#22C55E', initials: 'AM', avatarBg: '#F59E0B' },
  { name: 'Marcus Lee', role: 'Sales Development Rep', grade: 'A+', score: 95, color: '#22C55E', initials: 'ML', avatarBg: '#EF4444' },
];

function NotifCard({ n }: { n: typeof NOTIFICATIONS[0] }) {
  return (
    <div className="co-notif-card" style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 32px rgba(4,22,53,0.2)', border: '1px solid rgba(255,255,255,0.9)', minWidth: '220px' }}>
      <div className="co-notif-avatar" style={{ width: '34px', height: '34px', borderRadius: '50%', background: n.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{n.initials}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="co-notif-name" style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.name}</p>
        <p className="co-notif-sub" style={{ fontSize: '10px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>New Reslink submitted</p>
      </div>
      <div style={{ background: n.color, borderRadius: '6px', padding: '2px 7px', flexShrink: 0 }}>
        <span className="co-notif-grade" style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{n.grade} {n.score}</span>
      </div>
    </div>
  );
}

/* ─── How it works ─── */
const STEPS = [
  {
    icon: UserPlus,
    num: '01',
    title: 'Create your account',
    desc: 'Sign up in minutes. Add your company details, invite your hiring team, and get your branded job board live the same day.',
    tag: 'Free to start',
    tagColor: '#D8F950',
    tagText: '#041635',
  },
  {
    icon: FilePlus,
    num: '02',
    title: 'Post your first role',
    desc: 'Write your job post directly in Reslink or import from your existing tools. Your public board is instantly updated and shareable anywhere.',
    tag: 'Takes 5 minutes',
    tagColor: 'rgba(255,255,255,0.1)',
    tagText: 'rgba(255,255,255,0.6)',
  },
  {
    icon: Zap,
    num: '03',
    title: 'Add Reslink Credits',
    desc: 'Credits power AI screening. Each applicant consumes one credit to generate an AI score, video pitch analysis, resume match, and role fit breakdown. No credits, no AI magic.',
    tag: 'Starts at $0.50 per applicant',
    tagColor: 'rgba(255,255,255,0.1)',
    tagText: 'rgba(255,255,255,0.6)',
  },
  {
    icon: Video,
    num: '04',
    title: 'Interview only your top picks',
    desc: 'AI ranks every applicant. Your team reviews video pitches on their own schedule, aligns on a shortlist together, and books interviews only with the people worth talking to.',
    tag: 'Where most clients save the most time',
    tagColor: 'rgba(216,249,80,0.12)',
    tagText: '#D8F950',
  },
];

/* ─── Feature tabs ─── */
const FEATURE_TABS = [
  {
    id: 'ai',
    icon: Zap,
    label: 'AI Screening',
    tagline: 'Your best candidates, ranked before you look.',
    desc: 'Reslink AI scores every applicant on video pitch quality, resume match, and role fit. Each candidate gets a grade from A+ to F with a full written breakdown. Open the dashboard to a ranked list, not a pile of applications.',
    img: '/feature-ai-screening.png',
    alt: 'AI-ranked applicants',
    bullets: ['Candidates graded A through F with full AI breakdown', 'Scored on video pitch, resume match, and role fit', 'Top picks surfaced automatically at the top of your list'],
  },
  {
    id: 'collab',
    icon: Users,
    label: 'Team Collaboration',
    tagline: 'Everyone aligned before the first interview.',
    desc: 'Every hiring manager sees the same candidate profile: resume, video, and AI score. Leave notes for your team, rate candidates, and reach consensus without a single meeting.',
    img: '/feature-team-collaboration.png',
    alt: 'Candidate profile with team notes',
    bullets: ['Shared profiles with resume, video, and AI score', 'Team notes visible to everyone reviewing the role', 'Rate candidates and build consensus quickly'],
  },
  {
    id: 'pipeline',
    icon: List,
    label: 'Pipeline and Lists',
    tagline: 'Organize candidates. Stay in control.',
    desc: 'Build custom shortlists like Final Round, Strong Maybes, or Keep Warm and move people through your process in one click. No spreadsheets, no shared docs, no chaos.',
    img: '/feature-lists.png',
    alt: 'Saved candidate lists',
    bullets: ['Custom lists for every stage of your process', 'AI grade visible on every saved candidate', 'One click back to their full profile'],
  },
  {
    id: 'board',
    icon: Globe,
    label: 'Job Board',
    tagline: 'Your brand. Your roles. One link.',
    desc: 'Every company gets a public Reslink job board at reslink.io/company/yourname. Share the link anywhere. Candidates apply with a video pitch built in and Reslink AI reviews every submission automatically.',
    img: '/feature-job-board.png',
    alt: 'Public branded job board',
    bullets: ['Branded board with all your open roles in one place', 'Candidates apply with resume, video, and more', 'Sync open roles to Indeed, LinkedIn, and ZipRecruiter'],
  },
];

/* Groups the features by where they sit in the hiring workflow (sidebar nav) */
// Order must mirror FEATURE_TABS so the sidebar matches the stacked content.
const FEATURE_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Screen', ids: ['ai'] },
  { label: 'Review', ids: ['collab', 'pipeline'] },
  { label: 'Source', ids: ['board'] },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How do companies access candidate Reslinks?', a: 'Candidates include their Reslink URL in their standard application. Your team clicks the link and watches their 60-second video pitch immediately. No account required for the hiring manager to view.' },
  { q: 'Does Reslink replace our ATS?', a: 'No. Reslink sits alongside your existing ATS. Candidates apply through your normal channels and simply attach their Reslink link. It supplements your workflow without replacing anything.' },
  { q: 'How long does onboarding take?', a: 'Most teams are up and running the same day. We provide a dedicated onboarding session and setup support. No IT involvement required.' },
  { q: 'Can we require all applicants to submit a Reslink?', a: 'Yes. You can include a Reslink prompt in your job postings or application instructions. Candidates create their profile in under 10 minutes for free.' },
  { q: 'Is there a free trial?', a: 'Yes. We offer a 14-day free trial with full access to all hiring team features. No credit card required to start.' },
  { q: 'What does enterprise pricing look like?', a: 'Plans are based on team size and hiring volume. Book a demo and we will put together a custom proposal that fits your needs and budget.' },
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

/* ─── Testimonials ─── */
const FEATURED = {
  quote: 'We reviewed 40 Reslinks in an afternoon. Our entire hiring team was aligned on a shortlist before end of day. I have not seen that happen in ten years of recruiting.',
  name: 'Head of Talent Acquisition', role: 'Early access partner', company: 'Series B fintech', color: '#635BFF',
};
const SIDE_QUOTES = [
  { quote: 'Reslink cut our first-round phone screen volume by 60%. The candidates we do call are genuinely the right ones.', name: 'VP of People', role: 'Early access partner', company: 'SaaS scale-up', color: '#FF7A59' },
  { quote: 'Our time to hire dropped by nearly a third in our first quarter using Reslink. The ROI was immediate.', name: 'Recruiting Manager', role: 'Early access partner', company: 'enterprise tech co.', color: '#4285F4' },
  { quote: 'The analytics dashboard changed how I manage my team hiring. We can see exactly where we lose candidates and why.', name: 'Talent Lead', role: 'Early access partner', company: 'consumer internet co.', color: '#1877F2' },
];

/* ─── Page ─── */
export default function CompaniesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  // Scrollspy: highlight whichever feature block is currently in view.
  useEffect(() => {
    const onScroll = () => {
      // Target line sits ~38% down the viewport; the last block whose top has
      // crossed it is the one being read.
      const line = window.innerHeight * 0.38;
      let current = 0;
      featureRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActiveTab(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goToFeature = (i: number) => {
    const el = featureRefs.current[i];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar dark />
      <style>{`
        .co-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .co-testi-side { display: flex; flex-direction: column; gap: 16px; }
        /* Sidebar feature explorer */
        /* No align-items:start — the nav column must stretch to full row height
           so the sticky nav inside it has room to travel. */
        .co-feat-layout { display: grid; grid-template-columns: 248px 1fr; gap: clamp(28px, 4vw, 52px); text-align: left; }
        .co-feat-nav-col { min-width: 0; }
        .co-feat-nav { display: flex; flex-direction: column; gap: 22px; position: sticky; top: 96px; }
        .co-feat-group-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #9AA1AE; font-family: var(--font-body); margin-bottom: 8px; padding-left: 14px; }
        .co-feat-navitem {
          position: relative; display: flex; align-items: center; gap: 10px; width: 100%;
          padding: 11px 14px; border: none; background: transparent; border-radius: 10px;
          font-size: 15px; font-weight: 500; color: #6B7280; font-family: var(--font-body);
          cursor: pointer; text-align: left; transition: color 0.18s;
        }
        .co-feat-navitem > * { position: relative; z-index: 1; }
        .co-feat-navitem:hover:not(.active) { color: #041635; }
        .co-feat-navitem.active { color: #041635; font-weight: 700; }
        .co-feat-dot { width: 7px; height: 7px; border-radius: 50%; background: #C9CFD9; flex-shrink: 0; transition: background 0.18s; }
        .co-feat-navitem.active .co-feat-dot { background: #D8F950; box-shadow: 0 0 0 3px rgba(216,249,80,0.35); }
        /* Each feature = one card so the visual and its copy read as a pair */
        .co-feat-card {
          background: #fff; border: 1px solid #E6E9EF; border-radius: 22px;
          padding: clamp(18px, 2.4vw, 30px);
          box-shadow: 0 2px 12px rgba(4,22,53,0.05);
        }
        .co-feat-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          color: #041635; font-family: var(--font-body);
          background: #F1F4F8; border-radius: 100px; padding: 6px 14px;
        }
        .co-feat-divider { height: 1px; background: #ECEFF4; margin: 28px 0 24px; }
        .co-feat-body { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        @media (max-width: 900px) {
          .co-testi-grid { grid-template-columns: 1fr !important; }
          .co-feat-body { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) {
          .co-feat-layout { grid-template-columns: 1fr; gap: 22px; }
          .co-feat-nav-col { position: sticky; top: 68px; z-index: 20; background: #F7F8FA; padding: 10px 0; margin: -10px 0 0; }
          .co-feat-nav { position: static; flex-direction: row; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
          .co-feat-nav::-webkit-scrollbar { display: none; }
          .co-feat-group { display: contents; }
          .co-feat-group-label { display: none; }
          .co-feat-navitem { width: auto; white-space: nowrap; flex-shrink: 0; background: #fff; border: 1px solid #E2E4E9; padding: 9px 15px; font-size: 14px; }
          .co-feat-navitem.active { border-color: #041635; }
        }
        .co-chip { background: #fff; border-radius: 16px; padding: 14px 18px; box-shadow: 0 16px 48px rgba(4,22,53,0.22), 0 2px 8px rgba(4,22,53,0.1); display: flex; align-items: center; gap: 14px; border: 1px solid rgba(4,22,53,0.07); white-space: nowrap; }
        @media (max-width: 640px) { .co-chip { padding: 6px 9px; gap: 6px; border-radius: 10px; box-shadow: 0 4px 16px rgba(4,22,53,0.15); } }
        .co-chip-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @media (max-width: 640px) { .co-chip-icon { width: 22px; height: 22px; border-radius: 6px; } }
        .co-chip-icon svg { width: 18px; height: 18px; }
        @media (max-width: 640px) { .co-chip-icon svg { width: 10px; height: 10px; } }
        .co-chip-title { font-size: 13px; font-weight: 700; color: #041635; font-family: var(--font-body); line-height: 1.2; }
        @media (max-width: 640px) { .co-chip-title { font-size: 9px; } }
        .co-chip-sub { font-size: 12px; color: #6B7280; font-family: var(--font-body); margin-top: 3px; }
        @media (max-width: 640px) { .co-chip-sub { display: none; } }
        .co-chip-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        @media (max-width: 640px) { .co-chip-dot { width: 5px; height: 5px; } }
        .co-chip-tl { position: absolute; top: -18px; left: -22px; z-index: 10; }
        .co-chip-br { position: absolute; bottom: -18px; right: -22px; z-index: 10; }
        @media (max-width: 640px) { .co-chip-tl { top: -8px; left: -4px; } }
        @media (max-width: 640px) { .co-chip-br { bottom: -8px; right: -4px; } }
        @media (max-width: 600px) {
          .co-stats-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .co-hero-btns { flex-direction: column !important; }
          .co-hero-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
          .co-cta-btns { flex-direction: column !important; }
          .co-cta-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
          .co-notif-card { padding: 7px 10px !important; gap: 7px !important; min-width: 160px !important; border-radius: 9px !important; }
          .co-notif-avatar { width: 26px !important; height: 26px !important; }
          .co-notif-avatar span { font-size: 9px !important; }
          .co-notif-name { font-size: 10px !important; }
          .co-notif-sub { font-size: 9px !important; }
          .co-notif-grade { font-size: 9px !important; padding: 1px 5px !important; }
        }
        .co-feat-swipe-hint { display: none; }
        @media (max-width: 768px) {
          .co-feat-swipe-hint { display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 16px; }
        }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 112px) 24px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For companies</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
                <HeroToggle active="companies" dark />
              </div>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 7.5vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Make better hiring<br />decisions, <span style={{ color: '#D8F950' }}>faster.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto 36px' }}>
                Reslink gives your hiring team dynamic video profiles so you can assess candidates, align quickly, and move on the right people before your competitors do.
              </p>
              <div className="co-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
                <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Schedule a demo <ArrowRight size={16} />
                </Link>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Sign up for free
                </Link>
              </div>
            </motion.div>

            {/* Screenshot + floating notifs */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ position: 'relative' }}>
              {/* Notification A */}
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
              {/* Notification B */}
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
              {/* Live pill */}
              <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(4,22,53,0.75)', backdropFilter: 'blur(8px)', borderRadius: '100px', padding: '5px 12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>Live applicants</span>
              </div>
              {/* Screenshot */}
              <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}>
                <div style={{ background: '#1C2333', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '5px', padding: '3px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>app.reslink.io</div>
                  </div>
                </div>
                <Image src="/feature-dashboard.png" alt="Reslink hiring dashboard" width={3840} height={1892} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Logo ticker ─── */}
        <div style={{ background: '#F7F8FA' }}><LogoTicker /></div>

        {/* ─── How it works ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.15), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Up and hiring in four steps.
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {STEPS.map((s, i) => (
                <motion.div key={s.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.1 }} style={{ display: 'flex', gap: '24px' }}>
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

        {/* ─── Features tabbed showcase ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything your team needs</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Built for how great<br />teams hire.
              </h2>
            </motion.div>

            <div className="co-feat-layout">
              {/* Mobile-only hint that the feature nav scrolls sideways */}
              <div className="co-feat-swipe-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                <span style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.04em' }}>Swipe to explore features</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
              {/* Grouped sidebar nav — wrapper stretches so the nav can stick */}
              <div className="co-feat-nav-col">
              <nav className="co-feat-nav" aria-label="Product features">
                {FEATURE_GROUPS.map(group => (
                  <div key={group.label} className="co-feat-group">
                    <p className="co-feat-group-label">{group.label}</p>
                    {group.ids.map(id => {
                      const i = FEATURE_TABS.findIndex(f => f.id === id);
                      const t = FEATURE_TABS[i];
                      if (!t) return null;
                      const isActive = activeTab === i;
                      return (
                        <button key={t.id} onClick={() => goToFeature(i)} className={`co-feat-navitem${isActive ? ' active' : ''}`} aria-current={isActive}>
                          {isActive && <motion.span layoutId="coFeatNavPill" transition={{ type: 'spring', stiffness: 450, damping: 38 }} style={{ position: 'absolute', inset: 0, background: '#EDF0F4', borderRadius: '10px', zIndex: 0 }} />}
                          <span className="co-feat-dot" />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
              </div>

              {/* Display panel — every feature stacked; sidebar tracks scroll */}
              <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 7vw, 96px)' }}>
              {FEATURE_TABS.map((t, i) => (
                <motion.div key={t.id} ref={(el: HTMLDivElement | null) => { featureRefs.current[i] = el; }} className="co-feat-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.4 }}>
                  {/* Which feature this card belongs to */}
                  <span className="co-feat-eyebrow">
                    <t.icon size={13} strokeWidth={2.4} />
                    {t.label}
                  </span>
                  {/* Screenshot — top margin keeps the -18px floating chips clear of the eyebrow */}
                  <div style={{ position: 'relative', marginTop: '14px' }}>
                    <motion.div
                      initial={{ scale: 0.97, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.01, boxShadow: '0 24px 64px rgba(4,22,53,0.16)' }}
                      style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E4E9', boxShadow: '0 12px 40px rgba(4,22,53,0.1)', cursor: 'default' }}
                    >
                      <div style={{ background: '#F1F3F5', borderBottom: '1px solid #E2E4E9', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                          {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                          <div style={{ background: '#fff', borderRadius: '5px', padding: '2px 14px', fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', border: '1px solid #E2E4E9' }}>app.reslink.io</div>
                        </div>
                      </div>
                      {t.id === 'ai' ? (
                        <AIScreeningDemo />
                      ) : (
                        <div style={{ maxHeight: '520px', overflow: 'hidden' }}>
                          <Image src={t.img} alt={t.alt} width={2880} height={1419} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                      )}
                    </motion.div>

                    {/* ── Team Collaboration overlays ── */}
                    {t.id === 'collab' && (<>
                      <motion.div key="collab-float-1" className="co-chip-tl" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut', delay: 0.75 }}>
                        <motion.div className="co-chip" initial={{ opacity: 0, y: -16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.3, duration: 0.45, ease: [0.22,1,0.36,1] }}>
                          <div className="co-chip-icon" style={{ background: '#7C3AED', borderRadius: '50%' }}>
                            <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>JP</span>
                          </div>
                          <div>
                            <p className="co-chip-title">James Park left a note</p>
                            <p className="co-chip-sub">&ldquo;Impressive — component library is legit&rdquo;</p>
                          </div>
                        </motion.div>
                      </motion.div>
                      <motion.div key="collab-float-2" className="co-chip-br" animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.0, ease: 'easeInOut', delay: 1.15 }}>
                        <motion.div className="co-chip" initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.7, duration: 0.45, ease: [0.22,1,0.36,1] }}>
                          <div className="co-chip-icon" style={{ background: '#FFF7ED', borderRadius: '50%' }}>
                            <span style={{ fontSize: '13px', fontWeight: 900, color: '#D97706', fontFamily: 'var(--font-phudu)' }}>YO</span>
                          </div>
                          <div>
                            <p className="co-chip-title">You rated 4 stars</p>
                            <p className="co-chip-sub">2 teammates also reviewed · just now</p>
                          </div>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[1,2,3,4].map(s => <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#E5E7EB" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          </div>
                        </motion.div>
                      </motion.div>
                    </>)}

                    {/* ── Pipeline overlays ── */}
                    {t.id === 'pipeline' && (<>
                      <motion.div key="pipe-float-1" className="co-chip-tl" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.9, ease: 'easeInOut', delay: 0.75 }}>
                        <motion.div className="co-chip" initial={{ opacity: 0, y: -16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.3, duration: 0.45, ease: [0.22,1,0.36,1] }}>
                          <div className="co-chip-icon" style={{ background: '#D8F950', borderRadius: '50%' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <div>
                            <p className="co-chip-title">Eleanor Chu → Final Round</p>
                            <p className="co-chip-sub">A+ · 95/100 · Senior Product Designer</p>
                          </div>
                        </motion.div>
                      </motion.div>
                      <motion.div key="pipe-float-2" className="co-chip-br" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.3, ease: 'easeInOut', delay: 1.15 }}>
                        <motion.div className="co-chip" initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.7, duration: 0.45, ease: [0.22,1,0.36,1] }}>
                          <div className="co-chip-icon" style={{ background: '#F0FDF4' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
                          </div>
                          <div>
                            <p className="co-chip-title">Final Round · 5 candidates</p>
                            <p className="co-chip-sub">3 A grades · avg score 92/100</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </>)}

                    {/* ── Job Board overlays ── */}
                    {t.id === 'board' && (<>
                      <motion.div key="board-float-1" className="co-chip-tl" animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.1, ease: 'easeInOut', delay: 0.75 }}>
                        <motion.div className="co-chip" initial={{ opacity: 0, y: -16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.3, duration: 0.45, ease: [0.22,1,0.36,1] }}>
                          <div className="co-chip-icon" style={{ background: '#EEF4FF' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="2.2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          </div>
                          <div>
                            <p className="co-chip-title">New application · Zara Mitchell</p>
                            <p className="co-chip-sub">Marketing Intern · with video pitch · just now</p>
                          </div>
                          <motion.div className="co-chip-dot" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} style={{ background: '#16A34A' }} />
                        </motion.div>
                      </motion.div>
                      <motion.div key="board-float-2" className="co-chip-br" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.7, ease: 'easeInOut', delay: 1.2 }}>
                        <motion.div className="co-chip" initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.75, duration: 0.45, ease: [0.22,1,0.36,1] }}>
                          <div className="co-chip-icon" style={{ background: '#F0FDF4' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                          </div>
                          <div>
                            <p className="co-chip-title">6 applicants this week</p>
                            <p className="co-chip-sub">Synced to LinkedIn · Indeed · ZipRecruiter</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </>)}
                  </div>

                  <div className="co-feat-divider" />

                  {/* Text content */}
                  <div className="co-feat-body">
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
              </div>{/* /display panel */}
            </div>{/* /co-feat-layout */}
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="co-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', textAlign: 'center' }}>
              {[
                { value: '5x', label: 'better hire quality vs traditional screening' },
                { value: '30%', label: 'average reduction in time to hire' },
                { value: '91%', label: 'of hiring managers say video improves decisions' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.1 }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(52px, 7vw, 80px)', fontWeight: 900, color: '#D8F950', lineHeight: 1, letterSpacing: '-0.03em' }}><AnimatedStat value={s.value} /></p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: '10px', lineHeight: 1.5, maxWidth: '180px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What hiring teams say</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98 }}>
                Trusted by the teams<br />building great companies.
              </h2>
            </motion.div>
            <div className="co-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
                <TiltCard max={3} style={{ background: '#041635', borderRadius: '20px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '24px' }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#D8F950" color="#D8F950" />)}
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
                </TiltCard>
              </motion.div>
              <div className="co-testi-side">
                {SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', marginBottom: '52px' }}>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Find the best talent<br />for your<br /><span style={{ color: '#D8F950' }}>open roles.</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join the founders and hiring teams transforming how they find great people.
            </p>
            <div className="co-cta-btns" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo <ArrowRight size={16} />
              </Link>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Sign up for free
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
