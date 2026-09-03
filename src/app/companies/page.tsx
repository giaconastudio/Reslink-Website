'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, UserPlus, FilePlus, Zap, Video, Users, List, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnimatedStat } from '@/components/CountUp';
import LogoTicker from '@/components/LogoTicker';
import AIScreeningDemo from '@/components/AIScreeningDemo';
import { CollabDemo, PipelineDemo, JobBoardDemo } from '@/components/CompanyFeatureDemos';
import TeamReel from '@/components/TeamReel';
import AudienceStories from '@/components/AudienceStories';
import CTA from '@/components/CTA';

/* ─── Hero notifications ─── */
const NOTIFICATIONS = [
  { name: 'Zara Mitchell', role: 'Frontend Engineer Intern', grade: 'A', score: 91, color: '#22C55E', initials: 'ZM', avatarBg: '#4F6EF7' },
  { name: 'Ben Holloway', role: 'Software Engineer', grade: 'B+', score: 84, color: '#3B82F6', initials: 'BH', avatarBg: '#10B981' },
  { name: 'Aisha Mensah', role: 'Senior Product Manager', grade: 'A', score: 88, color: '#22C55E', initials: 'AM', avatarBg: '#F59E0B' },
  { name: 'Marcus Lee', role: 'Sales Development Rep', grade: 'A+', score: 95, color: '#22C55E', initials: 'ML', avatarBg: '#EF4444' },
];

function NotifCard({ n }: { n: typeof NOTIFICATIONS[0] }) {
  return (
    <div className="co-notif-card" style={{ background: '#fff', borderRadius: '12px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 32px rgba(6,26,58,0.2)', border: '1px solid rgba(255,255,255,0.9)', minWidth: '220px' }}>
      <div className="co-notif-avatar" style={{ width: '34px', height: '34px', borderRadius: '50%', background: n.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{n.initials}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="co-notif-name" style={{ fontSize: '12px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.name}</p>
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
    tagColor: 'rgba(255,255,255,0.1)',
    tagText: 'rgba(255,255,255,0.6)',
  },
  {
    icon: FilePlus,
    num: '02',
    title: 'Post your first role',
    desc: 'Write your job post directly in Reslink or import from your existing tools. Your public board is instantly updated and shareable anywhere.',
    tag: '5 minutes',
    tagColor: 'rgba(255,255,255,0.1)',
    tagText: 'rgba(255,255,255,0.6)',
  },
  {
    icon: Zap,
    num: '03',
    title: 'Add Reslink Credits',
    desc: 'Credits power AI screening. Each applicant consumes one credit to generate an AI score, video pitch analysis, resume match, and role fit breakdown. No credits, no AI magic.',
    tag: 'From $0.50 per applicant',
    tagColor: 'rgba(255,255,255,0.1)',
    tagText: 'rgba(255,255,255,0.6)',
  },
  {
    icon: Video,
    num: '04',
    title: 'Interview only your top picks',
    desc: 'AI ranks every applicant. Your team reviews video pitches on their own schedule, aligns on a shortlist together, and books interviews only with the people worth talking to.',
    tag: 'Biggest time saving',
    tagColor: '#D7FF43',
    tagText: '#061A3A',
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
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{q}</span>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open ? '#1468E8' : '#EAF1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
          {open ? <Minus size={12} color="#fff" /> : <Plus size={12} color="#1468E8" />}
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
  quote: "We reviewed 40 Reslinks in an afternoon. Our whole hiring team was aligned on a shortlist before end of day. I haven't seen that happen in ten years of recruiting.",
  stat: '40 candidates reviewed in one afternoon',
  name: 'Head of Talent Acquisition', sub: 'Series B fintech · 40 hires a year',
  avatar: 'radial-gradient(circle at 32% 28%, #F5A8D6, #D63D9D)',
};
const SIDE_QUOTES = [
  { quote: 'Reslink cut our first-round phone screen volume by 60%. The candidates we do call are genuinely the right ones.', name: 'VP of People', sub: 'SaaS scale-up', avatar: 'radial-gradient(circle at 32% 28%, #8FB4FF, #4F6EF7)' },
  { quote: 'Our time to hire dropped by nearly a third in the first quarter. The ROI was immediate.', name: 'Recruiting Manager', sub: 'Enterprise tech', avatar: 'radial-gradient(circle at 32% 28%, #F0A0D0, #D63D9D)' },
  { quote: 'The analytics changed how I manage my team. We can see exactly where we lose candidates, and why.', name: 'Talent Lead', sub: 'Consumer internet', avatar: 'radial-gradient(circle at 32% 28%, #C3DD7E, #8BA353)' },
];

/* Candidate scorecard shown in the CTA — the recruiter's-eye view: a video
   intro, an AI role-fit score, graded signals, and Pass / Shortlist actions. */
function CandidateScorecard() {
  const metrics = [
    { label: 'Outbound experience', value: 'Strong', pct: 92, color: '#5B7A0F' },
    { label: 'Quota history', value: '128%', pct: 72, color: '#1468E8' },
    { label: 'Communication', value: 'Excellent', pct: 96, color: '#D63D9D' },
  ];
  return (
    <div className="cs-wrap">
      <style>{`
        .cs-wrap { width: 100%; max-width: 380px; margin: 0 auto; }
        .cs-card { background: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 24px 60px rgba(6,26,58,0.22); }
        .cs-vid { position: relative; height: 184px; background: #C74FA0; overflow: hidden; }
        .cs-vid video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .cs-tag { position: absolute; top: 12px; left: 12px; background: #D7FF43; color: #061A3A; font-family: var(--font-body); font-weight: 800; font-size: 10px; letter-spacing: 0.05em; text-transform: uppercase; padding: 4px 10px; border-radius: 100px; }
        .cs-dur { position: absolute; top: 12px; right: 12px; background: rgba(6,26,58,0.55); backdrop-filter: blur(6px); color: #fff; font-family: var(--font-body); font-weight: 700; font-size: 11px; padding: 3px 9px; border-radius: 8px; }
        .cs-body { padding: 16px 20px 18px; }
        .cs-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
        .cs-name { font-family: var(--font-body); font-weight: 800; font-size: 16px; color: #061A3A; letter-spacing: -0.01em; }
        .cs-role { font-family: var(--font-body); font-size: 12px; color: #8A93A3; margin-top: 2px; }
        .cs-fit { text-align: right; flex-shrink: 0; }
        .cs-fit-num { font-family: var(--font-phudu); font-weight: 900; font-size: 30px; line-height: 0.9; color: #4F6B15; letter-spacing: -0.02em; }
        .cs-fit-lbl { font-family: var(--font-body); font-size: 11px; color: #8A93A3; margin-top: 2px; }
        .cs-metric { margin-bottom: 11px; }
        .cs-metric-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
        .cs-metric-label { font-family: var(--font-body); font-size: 13px; color: #6B7480; }
        .cs-metric-val { font-family: var(--font-body); font-size: 13px; font-weight: 800; color: #061A3A; }
        .cs-track { height: 6px; border-radius: 100px; background: #EDEFF3; overflow: hidden; }
        .cs-fill { height: 100%; border-radius: 100px; }
        .cs-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
        .cs-pass { background: #F1F3F6; color: #3A4250; font-family: var(--font-body); font-weight: 700; font-size: 14px; border: none; border-radius: 11px; padding: 12px 0; cursor: pointer; transition: background 0.15s ease; }
        .cs-pass:hover { background: #E7EAEF; }
        .cs-short { background: #D7FF43; color: #061A3A; font-family: var(--font-body); font-weight: 800; font-size: 14px; border: none; border-radius: 11px; padding: 12px 0; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; transition: background 0.15s ease; }
        .cs-short:hover { background: #C2E532; }
      `}</style>
      <motion.div className="cs-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <div className="cs-vid">
          <video src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" autoPlay muted loop playsInline style={{ objectPosition: '50% 18%' }} />
          <span className="cs-tag">Video intro</span>
          <span className="cs-dur">0:47</span>
        </div>
        <div className="cs-body">
          <div className="cs-head">
            <div>
              <p className="cs-name">Olivia Stone</p>
              <p className="cs-role">Business Dev Rep · 5 yrs</p>
            </div>
            <div className="cs-fit">
              <p className="cs-fit-num">94</p>
              <p className="cs-fit-lbl">role fit</p>
            </div>
          </div>
          {metrics.map((m, i) => (
            <div className="cs-metric" key={m.label}>
              <div className="cs-metric-top">
                <span className="cs-metric-label">{m.label}</span>
                <span className="cs-metric-val">{m.value}</span>
              </div>
              <div className="cs-track">
                <motion.div className="cs-fill" style={{ background: m.color }} initial={{ width: 0 }} whileInView={{ width: `${m.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: 'easeOut' }} />
              </div>
            </div>
          ))}
          <div className="cs-btns">
            <button className="cs-pass">Pass</button>
            <button className="cs-short">Shortlist <ArrowRight size={15} /></button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Page ─── */
export default function CompaniesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  // Keep the active pill scrolled into view in the horizontally-scrolling mobile nav.
  useEffect(() => {
    navRefs.current[activeTab]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeTab]);

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
        .co-feat-navitem:hover:not(.active) { color: #061A3A; }
        .co-feat-navitem.active { color: #061A3A; font-weight: 700; }
        .co-feat-dot { width: 7px; height: 7px; border-radius: 50%; background: #C9CFD9; flex-shrink: 0; transition: background 0.18s; }
        .co-feat-navitem.active .co-feat-dot { background: #D7FF43; box-shadow: 0 0 0 3px rgba(215,255,67,0.35); }
        /* Each feature = one card so the visual and its copy read as a pair */
        .co-feat-card {
          background: #fff; border: 1px solid #E6E9EF; border-radius: 22px;
          padding: clamp(18px, 2.4vw, 30px);
          box-shadow: 0 2px 12px rgba(6,26,58,0.05);
        }
        .co-feat-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 16px;
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
          color: #061A3A; font-family: var(--font-body);
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
          .co-feat-nav-col { position: sticky; top: 68px; z-index: 20; background: #F6F7F9; padding: 10px 0; margin: -10px 0 0; }
          .co-feat-nav { position: static; flex-direction: row; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
          .co-feat-nav::-webkit-scrollbar { display: none; }
          .co-feat-group { display: contents; }
          .co-feat-group-label { display: none; }
          .co-feat-navitem { width: auto; white-space: nowrap; flex-shrink: 0; background: #fff; border: 1px solid #E2E4E9; padding: 9px 15px; font-size: 14px; }
          .co-feat-navitem.active { border-color: #061A3A; }
        }
        .co-chip { background: #fff; border-radius: 16px; padding: 14px 18px; box-shadow: 0 16px 48px rgba(6,26,58,0.22), 0 2px 8px rgba(6,26,58,0.1); display: flex; align-items: center; gap: 14px; border: 1px solid rgba(6,26,58,0.07); white-space: nowrap; }
        @media (max-width: 640px) { .co-chip { padding: 6px 9px; gap: 6px; border-radius: 10px; box-shadow: 0 4px 16px rgba(6,26,58,0.15); } }
        .co-chip-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        @media (max-width: 640px) { .co-chip-icon { width: 22px; height: 22px; border-radius: 6px; } }
        .co-chip-icon svg { width: 18px; height: 18px; }
        @media (max-width: 640px) { .co-chip-icon svg { width: 10px; height: 10px; } }
        .co-chip-title { font-size: 13px; font-weight: 700; color: #061A3A; font-family: var(--font-body); line-height: 1.2; }
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
        <section style={{ background: '#061A3A', padding: 'clamp(48px, 6vw, 76px) 24px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.22), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For companies</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 7.5vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Make better hiring{' '}<br className="br-desktop" />decisions, <span style={{ color: '#D7FF43' }}>faster.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto 36px' }}>
                Ten thousand people have already stopped being a PDF.
              </p>
              <div className="co-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
                <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D7FF43', color: '#061A3A', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Schedule a demo <ArrowRight size={16} />
                </Link>
                <Link href="/get-started?type=company" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Sign up for free
                </Link>
              </div>
            </motion.div>

            {/* People reel */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ paddingBottom: 'clamp(56px, 8vw, 96px)' }}>
              <TeamReel />
            </motion.div>
          </div>
        </section>

        {/* ─── Logo ticker ─── */}
        <div style={{ background: '#F6F7F9' }}><LogoTicker /></div>

        {/* ─── How it works ─── */}
        <section style={{ background: '#061A3A', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-12%', right: '-8%', width: '620px', height: '620px', background: 'radial-gradient(ellipse, rgba(214,61,157,0.16), transparent 62%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Up and hiring in four steps.
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {STEPS.map((s, i) => {
                const isLast = i === STEPS.length - 1;
                return (
                <motion.div key={s.num} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '52px' }}>
                    {/* Numbered node — the final step is filled lime to flag the payoff */}
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: isLast ? '#D7FF43' : 'rgba(255,255,255,0.05)', border: isLast ? 'none' : '1.5px solid rgba(255,255,255,0.18)', boxShadow: isLast ? '0 0 0 6px rgba(215,255,67,0.12)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: isLast ? '#061A3A' : '#fff', lineHeight: 1 }}>{i + 1}</span>
                    </div>
                    {!isLast && (
                      <div style={{ width: '2px', flex: 1, background: 'rgba(255,255,255,0.1)', marginTop: '8px', minHeight: '40px' }} />
                    )}
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px 28px', flex: 1, marginBottom: i < STEPS.length - 1 ? '16px' : 0 }}>
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

        {/* ─── Features tabbed showcase ─── */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything your team needs</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Built for how great{' '}<br className="br-desktop" />teams hire.
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
                        <button key={t.id} ref={(el: HTMLButtonElement | null) => { navRefs.current[i] = el; }} onClick={() => goToFeature(i)} className={`co-feat-navitem${isActive ? ' active' : ''}`} aria-current={isActive}>
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
                <motion.div key={t.id} ref={(el: HTMLDivElement | null) => { featureRefs.current[i] = el; }} className="co-feat-card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.4 }}>
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
                      whileHover={{ scale: 1.01, boxShadow: '0 24px 64px rgba(6,26,58,0.16)' }}
                      style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E4E9', boxShadow: '0 12px 40px rgba(6,26,58,0.1)', cursor: 'default' }}
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
                      ) : t.id === 'collab' ? (
                        <CollabDemo active={activeTab === i} />
                      ) : t.id === 'pipeline' ? (
                        <PipelineDemo active={activeTab === i} />
                      ) : t.id === 'board' ? (
                        <JobBoardDemo active={activeTab === i} />
                      ) : (
                        <div style={{ maxHeight: '520px', overflow: 'hidden' }}>
                          <Image src={t.img} alt={t.alt} width={2880} height={1419} quality={100} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                      )}
                    </motion.div>
                  </div>

                  <div className="co-feat-divider" />

                  {/* Text content */}
                  <div className="co-feat-body">
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900, color: '#061A3A', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '12px' }}>{t.tagline}</h3>
                      <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{t.desc}</p>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
                      {t.bullets.map((b, bi) => (
                        <motion.li key={b} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: bi * 0.08 + 0.15, duration: 0.28 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: '#3A3F4C', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                          <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#061A3A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D7FF43" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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
        <section style={{ background: '#061A3A', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.2), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="co-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', textAlign: 'center' }}>
              {[
                { value: '5x', label: 'better hire quality vs traditional screening' },
                { value: '30%', label: 'average reduction in time to hire' },
                { value: '91%', label: 'of hiring managers say video improves decisions' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(52px, 7vw, 80px)', fontWeight: 900, color: '#D7FF43', lineHeight: 1, letterSpacing: '-0.03em' }}><AnimatedStat value={s.value} /></p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: '10px', lineHeight: 1.5, maxWidth: '180px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Not a company hiring directly? Route to agencies/universities ─── */}
        <AudienceStories variant="b2b" />

        {/* ─── Testimonials ─── */}
        <section style={{ background: '#FBEEF5', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D63D9D', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What hiring teams say</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#061A3A', lineHeight: 0.98, marginBottom: '16px' }}>
                Trusted by the teams{' '}<br className="br-desktop" />building great companies.
              </h2>
              <p style={{ fontSize: '16px', color: '#8A7A85', fontFamily: 'var(--font-body)' }}>All early-access partners. Titles shown with permission.</p>
            </motion.div>
            <div className="co-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ background: '#061A3A', borderRadius: '24px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '-15%', right: '-12%', width: '440px', height: '440px', background: 'radial-gradient(ellipse, rgba(170,72,214,0.34), transparent 62%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: 'clamp(20px, 2.3vw, 27px)', color: '#fff', lineHeight: 1.45, fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '26px' }}>&ldquo;{FEATURED.quote}&rdquo;</p>
                    <span style={{ display: 'inline-block', background: '#D7FF43', color: '#061A3A', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', padding: '8px 16px', borderRadius: '100px' }}>{FEATURED.stat}</span>
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '28px 0 22px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: FEATURED.avatar, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{FEATURED.name}</p>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{FEATURED.sub}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="co-testi-side">
                {SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
                    <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid #F3DCEA', padding: '26px 28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(214,61,157,0.06)' }}>
                      <p style={{ fontSize: '15px', color: '#2A3242', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '20px' }}>&ldquo;{q.quote}&rdquo;</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: q.avatar, flexShrink: 0 }} />
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
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: '#fff' }}>
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

        {/* ─── CTA ─── (shared component — left copy + video-resume card, pink-glow navy box) */}
        <CTA
          eyebrow="Get started"
          heading={<>Ready to hire better?</>}
          body="See every applicant's video pitch, AI score, and role fit before you spend a minute on interviews."
          primaryLabel="Schedule a demo"
          primaryHref="/contact/sales"
          secondaryLabel="Sign up for free"
          secondaryHref="/get-started?type=company"
          footnote="Free to start · 14-day trial · no card needed"
          sectionBg="#fff"
          visual={<CandidateScorecard />}
        />

      </main>
      <Footer />
    </>
  );
}
