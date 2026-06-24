'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, TrendingUp, Users, Clock, Award, BarChart2, CheckCircle, ArrowRight, Plus, Minus, Star, Briefcase, Zap, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

/* ─── Features ─── */
const FEATURES = [
  {
    icon: Play, color: '#0C63E3', bg: '#EEF4FF',
    title: 'Candidates that speak for themselves',
    body: 'Every candidate you represent gets a polished video pitch and a shareable Reslink profile. When your client opens the link, they see the person, not a formatted PDF.',
    stat: '4x more client engagement vs. resumes alone',
  },
  {
    icon: TrendingUp, color: '#0C63E3', bg: '#EEF4FF',
    title: 'Close placements faster',
    body: 'Reslink shortlists give hiring managers immediate context. Fewer back-and-forths. Faster decisions. Better close rates. Most agencies see a measurable lift within the first placement cycle.',
    stat: '40% faster time-to-offer on shortlisted roles',
  },
  {
    icon: Award, color: '#0C63E3', bg: '#EEF4FF',
    title: 'Differentiate your agency from day one',
    body: "Reslink shortlists look like nothing else in your client's inbox. They're not just another spreadsheet of names. They're a curated, branded experience that makes your agency the one they remember.",
    stat: 'Agencies using Reslink win 28% more retained mandates',
  },
  {
    icon: BarChart2, color: '#0C63E3', bg: '#EEF4FF',
    title: "Know what's actually working",
    body: "Your dashboard shows which candidates clients are watching, for how long, and how many times. Real engagement data, not silence. Follow up at exactly the right moment.",
    stat: 'Real-time view tracking per candidate, per client',
  },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: "How does Reslink fit into an agency's existing workflow?", a: 'Reslink layers on top of your current process. Candidates create their video profiles with our teleprompter-guided recorder. You curate a shortlist and share a branded link with your client. No new ATS required, no process overhaul.' },
  { q: "Can we brand our Reslink shortlists with our agency's identity?", a: "Yes. Shortlists and candidate profiles can carry your agency's branding. Your client sees your name on the package that impressed them." },
  { q: 'Do candidates need any technical experience to record a Reslink?', a: 'None. Our built-in teleprompter walks them line by line through their script. Most candidates record a final-quality pitch in under 20 minutes on any device.' },
  { q: 'What roles does Reslink work best for?', a: 'Reslink works across verticals. It performs especially well in sales, marketing, leadership, client-facing, and professional services roles where communication and presence are part of the job.' },
  { q: 'How does pricing work for agencies?', a: 'Reslink offers agency plans based on team size and placement volume. We work with boutique firms and large multi-desk agencies. Reach out for a custom quote.' },
  { q: 'Can we share candidate profiles directly with our clients?', a: 'Yes. Every Reslink is a shareable link. You curate a shortlist and send one clean URL. Your client watches, we track it, and you follow up with data.' },
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

const TESTIMONIALS = [
  { quote: "We sent a Reslink shortlist to a new client on a retained search. They called us back in two hours and asked who else we could bring them. Nothing we've sent before has ever done that.", name: 'Rachel Kim', role: 'Managing Director', company: 'Vantage Talent Group', color: '#0C63E3' },
  { quote: "Our close rate on shortlisted roles went up immediately. Clients make faster decisions when they've watched the candidate. Less ghosting, less uncertainty. Reslink fixed something we didn't know how to fix.", name: 'Marcus Bell', role: 'Senior Partner', company: 'Apex Search', color: '#7C3AED' },
  { quote: "We were competing against four other agencies on a Director of Sales search. We were the only firm that sent Reslink profiles. We won the placement and they put us on their preferred vendor list.", name: 'Lena Osei', role: 'Founder', company: 'Meridian Recruitment', color: '#059669' },
  { quote: 'The tracking data alone changed how we follow up. I know which candidates my client watched twice. I know who they skipped. I can coach candidates and have smarter conversations with clients.', name: 'Jason Torres', role: 'Principal Recruiter', company: 'Clearline Staffing', color: '#D97706' },
];

function TestiCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px 26px', border: '1px solid #ECEEF1', width: '340px', flexShrink: 0, boxShadow: '0 2px 12px rgba(4,22,53,0.05)' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D8F950" color="#D8F950" />)}
      </div>
      <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>&ldquo;{t.quote}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-phudu)' }}>
          {t.name.split(' ').filter((_, i) => i > 0).map(n => n[0]).join('')}
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{t.name}</p>
          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function CandidateCard({ name, title, color, viewed, time, delay }: { name: string; title: string; color: string; viewed: boolean; time: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div style={{ background: '#fff', borderRadius: '14px', border: `1.5px solid ${viewed ? '#BBF7D0' : '#E8EAF0'}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: viewed ? '0 4px 20px rgba(22,163,74,0.1)' : '0 2px 8px rgba(4,22,53,0.06)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</p>
          <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '7px solid #fff', marginLeft: '2px' }} />
          </div>
          {viewed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', fontFamily: 'var(--font-body)' }}>{time}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AgenciesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  const candidates = [
    { name: 'Sarah Mitchell', title: 'VP of Sales · 12 yrs exp.', color: '#0C63E3', viewed: true, time: 'Watched 2x' },
    { name: 'Daniel Park', title: 'Director of Marketing · 8 yrs exp.', color: '#7C3AED', viewed: true, time: 'Watched 1:42' },
    { name: 'Priya Nair', title: 'Head of Growth · 6 yrs exp.', color: '#059669', viewed: false, time: '' },
    { name: 'James Weston', title: 'Enterprise AE · 10 yrs exp.', color: '#D97706', viewed: false, time: '' },
  ];

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes ag-testi { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes ag-testi-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .ag-testi-track { animation: ag-testi 30s linear infinite; display: flex; }
        .ag-testi-track-rev { animation: ag-testi-rev 36s linear infinite; display: flex; }
        .ag-testi-track:hover, .ag-testi-track-rev:hover { animation-play-state: paused; }
        .ag-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .ag-feat-alt { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .ag-stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .ag-process-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        @media (max-width: 960px) {
          .ag-hero-grid { grid-template-columns: 1fr !important; }
          .ag-hero-right { display: none !important; }
          .ag-feat-alt { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) { .ag-process-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .ag-process-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 560px) { .ag-stats-row { grid-template-columns: 1fr 1fr !important; } }
        .ag-compare-row { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 640px) { .ag-compare-row { grid-template-columns: 1fr !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero: white split layout ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px', borderBottom: '1px solid #F0F2F5' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <div className="ag-hero-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For recruitment agencies</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 80px)', fontWeight: 900, color: '#041635', lineHeight: 0.91, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Win more placements.<br /><span style={{ color: '#041635', display: 'inline-block', position: 'relative' }}>
                    Faster.
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-16px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
                  </span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '460px' }}>
                  Reslink gives every candidate you represent a video pitch your clients will actually remember. Shortlists that close. A presentation that no competing agency can match.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
                  <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#041635', color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Get started free <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#F7F8FA', color: '#041635', border: '1.5px solid #E4E6EC', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Talk to sales
                  </Link>
                </div>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[['500+', 'agencies globally'], ['40%', 'faster time-to-offer'], ['28%', 'more retained mandates']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#041635', lineHeight: 1 }}>{v}</p>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '4px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Shortlist UI mockup */}
              <motion.div className="ag-hero-right" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.12 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #E4E6EC', boxShadow: '0 40px 80px rgba(4,22,53,0.12)' }}>
                  <div style={{ background: '#F7F8FA', borderBottom: '1px solid #ECEEF1', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>VP of Sales · TechCorp Inc.</p>
                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Reslink Shortlist · 4 candidates · Shared 3h ago</p>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#0C63E3', background: '#EEF4FF', padding: '4px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>2 viewed</span>
                  </div>
                  <div style={{ background: '#FAFBFC', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {candidates.map((c, i) => <CandidateCard key={c.name} {...c} delay={0.2 + i * 0.08} />)}
                  </div>
                  <div style={{ background: '#041635', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D8F950', flexShrink: 0 }} />
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', flex: 1 }}>
                      <span style={{ color: '#fff', fontWeight: 700 }}>TechCorp hiring manager</span> watched Sarah&apos;s pitch twice
                    </p>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', flexShrink: 0 }}>12m ago</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <LogoTicker />

        {/* ─── Process: step cards ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Your new process</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                From brief to placement.<br />In less time.
              </h2>
            </motion.div>
            <div className="ag-process-grid">
              {[
                { icon: Briefcase, title: 'Receive the brief', desc: 'You take on a search. Business as usual. Reslink layers on top of your existing workflow with no disruption.' },
                { icon: Zap, title: 'Candidates record their pitch', desc: 'You share a Reslink invite. Candidates record a 60–90 second video using our guided teleprompter. Most finish in under 20 minutes.' },
                { icon: Target, title: 'Build a Reslink shortlist', desc: 'You curate your best candidates into a branded shortlist. One link. Your agency on the cover. Sent in minutes.' },
                { icon: CheckCircle, title: 'Client watches. Placement closes.', desc: 'Your client watches, and you see exactly who they viewed and for how long. Follow up with data. Close faster.' },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.1 }}>
                  <div style={{ background: '#041635', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', padding: '28px 24px', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                    {/* Decorative large number */}
                    <div style={{ position: 'absolute', bottom: '-16px', right: '10px', fontFamily: 'var(--font-phudu)', fontSize: '100px', fontWeight: 900, color: '#fff', opacity: 0.05, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
                      {/* Icon + step number */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <step.icon size={22} color="#D8F950" strokeWidth={1.8} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '32px', fontWeight: 900, color: '#D8F950', lineHeight: 1 }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(17px, 1.6vw, 21px)', fontWeight: 900, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '10px' }}>{step.title}</h3>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', flex: 1 }}>{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features: 2x2 with impact stats ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Why agencies choose Reslink</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                The edge your agency<br />has been missing.
              </h2>
            </motion.div>
            <div className="ag-feat-alt">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.08 }}>
                  <div style={{ borderRadius: '20px', border: '1.5px solid #E8EAF0', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFBFC' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <f.icon size={22} color={f.color} strokeWidth={1.8} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(19px, 1.8vw, 24px)', fontWeight: 900, color: '#041635', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '12px' }}>{f.title}</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)', flex: 1, marginBottom: '20px' }}>{f.body}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: f.bg, borderRadius: '8px', borderLeft: `3px solid ${f.color}` }}>
                      <TrendingUp size={13} color={f.color} strokeWidth={2} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: f.color, fontFamily: 'var(--font-body)' }}>{f.stat}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="ag-stats-row">
              {[
                { value: '500+', label: 'agencies actively using Reslink' },
                { value: '40%', label: 'faster average time-to-offer' },
                { value: '3.8x', label: 'more client views per candidate' },
                { value: '28%', label: 'lift in retained search mandates' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: i * 0.08 }} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#D8F950', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxWidth: '130px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Compare: unified table ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>The difference</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Agencies that use Reslink<br />operate differently.
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.08 }}>
              <div style={{ borderRadius: '20px', border: '1px solid #E4E6EC', overflow: 'hidden', boxShadow: '0 4px 24px rgba(4,22,53,0.07)' }}>
                {/* Header */}
                <div className="ag-compare-row">
                  <div style={{ padding: '18px 28px', background: '#F7F8FA', borderBottom: '1px solid #ECEEF1', borderRight: '1px solid #ECEEF1' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Standard agency</p>
                  </div>
                  <div style={{ padding: '18px 28px', background: '#041635', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D8F950', fontFamily: 'var(--font-body)' }}>Reslink agency</p>
                  </div>
                </div>
                {/* Rows */}
                {[
                  ['Send a PDF candidate matrix to the inbox', 'Send a branded video shortlist. One link.'],
                  ['Wait days to hear if anyone even opened it', 'Get view data back in hours, not days'],
                  ['No idea which candidates they actually looked at', 'See exactly who watched, and for how long'],
                  ['Compete on the same terms as every other agency', 'Win the brief before the meeting even happens'],
                  ['Chase clients for feedback and updates', 'Follow up with real data, not guesses'],
                ].map(([before, after], i) => (
                  <div key={i} className="ag-compare-row" style={{ borderBottom: i < 4 ? '1px solid #ECEEF1' : 'none' }}>
                    <div style={{ padding: '16px 28px', borderRight: '1px solid #ECEEF1', display: 'flex', alignItems: 'flex-start', gap: '10px', background: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                      <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✕</span>
                      <span style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>{before}</span>
                    </div>
                    <div style={{ padding: '16px 28px', display: 'flex', alignItems: 'flex-start', gap: '10px', background: i % 2 === 0 ? '#fff' : '#F8FAFF' }}>
                      <span style={{ fontSize: '13px', color: '#0C63E3', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.55, fontWeight: 500 }}>{after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ padding: 'clamp(64px, 8vw, 100px) 0', background: '#fff', overflow: 'hidden' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 56px', padding: '0 24px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What agencies say</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98 }}>
              Recruiters who switched<br />don&apos;t go back.
            </h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            <div style={{ overflow: 'hidden' }}>
              <div className="ag-testi-track" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {doubled.map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="ag-testi-track-rev" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {[...doubled].reverse().map((t, i) => <TestiCard key={i} t={t} />)}
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
          <div style={{ position: 'absolute', top: '-20%', right: '10%', width: '600px', height: '500px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30%', left: '10%', width: '500px', height: '400px', background: 'radial-gradient(ellipse, rgba(216,249,80,0.08), transparent 60%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Send a shortlist<br /><span style={{ color: '#D8F950' }}>they can&apos;t forget.</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join 500+ agencies already using Reslink to close more placements and win more business.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Get started free <ArrowRight size={16} />
              </Link>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Talk to sales
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
