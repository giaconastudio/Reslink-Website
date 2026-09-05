'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, TrendingUp, Award, BarChart2, ArrowRight, Plus, Minus, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';
import { AnimatedStat } from '@/components/CountUp';
import { TiltCard } from '@/components/TiltCard';
import CTA from '@/components/CTA';

/* ─── Features ─── */
const FEATURES = [
  {
    icon: Play, color: '#1468E8', bg: '#EEF4FF',
    title: 'Candidates that speak for themselves',
    body: 'Every candidate you represent gets a polished video pitch and a shareable Reslink profile. When your client opens the link, they see the person, not a formatted PDF.',
    stat: '4x more client engagement vs. resumes alone',
  },
  {
    icon: TrendingUp, color: '#1468E8', bg: '#EEF4FF',
    title: 'Close placements faster',
    body: 'Reslink shortlists give hiring managers immediate context. Fewer back-and-forths. Faster decisions. Better close rates. Most agencies see a measurable lift within the first placement cycle.',
    stat: '40% faster time-to-offer on shortlisted roles',
  },
  {
    icon: Award, color: '#1468E8', bg: '#EEF4FF',
    title: 'Differentiate your agency from day one',
    body: "Reslink shortlists look like nothing else in your client's inbox. They're not just another spreadsheet of names. They're a curated, branded experience that makes your agency the one they remember.",
    stat: 'Agencies using Reslink win 28% more retained mandates',
  },
  {
    icon: BarChart2, color: '#1468E8', bg: '#EEF4FF',
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
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{q}</span>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open ? '#1468E8' : '#F6F7F9', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
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

const AG_FEATURED = {
  quote: "We sent a Reslink shortlist to a new client on a retained search. They called us back in two hours and asked who else we could bring them. Nothing we've sent before has ever done that.",
  name: 'Managing Director', role: 'Early access partner', company: 'retained search firm', color: '#1468E8',
};
const AG_SIDE_QUOTES = [
  { quote: "Our close rate on shortlisted roles went up immediately. Clients make faster decisions when they've watched the candidate. Less ghosting, less uncertainty. Reslink fixed something we didn't know how to fix.", name: 'Senior Partner', role: 'Early access partner', company: 'executive search firm', color: '#D63D9D' },
  { quote: "We were competing against four other agencies on a Director of Sales search. We were the only firm that sent Reslink profiles. We won the placement and they put us on their preferred vendor list.", name: 'Agency Founder', role: 'Early access partner', company: 'boutique recruitment agency', color: '#5B7A0F' },
  { quote: 'The tracking data alone changed how we follow up. I know which candidates my client watched twice. I know who they skipped. I can coach candidates and have smarter conversations with clients.', name: 'Principal Recruiter', role: 'Early access partner', company: 'staffing agency', color: '#1468E8' },
];


function CandidateCard({ name, title, color, viewed, time, delay }: { name: string; title: string; color: string; viewed: boolean; time: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div style={{ background: '#fff', borderRadius: '14px', border: `1.5px solid ${viewed ? '#BBF7D0' : '#E8EAF0'}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: viewed ? '0 4px 20px rgba(22,163,74,0.1)' : '0 2px 8px rgba(6,26,58,0.06)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</p>
          <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1468E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
  const candidates = [
    { name: 'Sarah Mitchell', title: 'VP of Sales · 12 yrs exp.', color: '#1468E8', viewed: true, time: 'Watched 2x' },
    { name: 'Daniel Park', title: 'Director of Marketing · 8 yrs exp.', color: '#D63D9D', viewed: true, time: 'Watched 1:42' },
    { name: 'Priya Nair', title: 'Head of Growth · 6 yrs exp.', color: '#5B7A0F', viewed: false, time: '' },
    { name: 'James Weston', title: 'Enterprise AE · 10 yrs exp.', color: '#061A3A', viewed: false, time: '' },
  ];

  return (
    <>
      <Navbar />
      <style>{`
        .ag-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .ag-testi-side { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 760px) { .ag-testi-grid { grid-template-columns: 1fr !important; } .ag-testi-grid > * { min-width: 0; } }
        .ag-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .ag-feat-alt { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .ag-stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .ag-process-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        @media (max-width: 960px) {
          .ag-hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ag-feat-alt { grid-template-columns: 1fr !important; }
          /* Grid items default to min-width:auto, which refuses to shrink
             below the intrinsic width of their content — so the hero's right
             column stayed 371px wide inside a 327px column and its contents
             were clipped. min-width:0 lets them take the column's width. */
          .ag-hero-grid > *, .ag-feat-alt > * { min-width: 0; }
        }
        @media (max-width: 960px) { .ag-hero-btns { flex-direction: column !important; align-self: stretch !important; margin-bottom: 0 !important; } }
        @media (max-width: 960px) { .ag-hero-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; } }
        @media (max-width: 960px) { .ag-hero-right { overflow: hidden; max-width: 100%; } }
        @media (max-width: 960px) { .ag-hero-right > div { box-shadow: 0 8px 32px rgba(6,26,58,0.10) !important; } }
        @media (max-width: 860px) { .ag-process-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .ag-process-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .ag-stats-row { grid-template-columns: 1fr !important; } }
        @media (max-width: 860px) { .ag-hero-inline-stats { display: none !important; } }
        @media (max-width: 960px) { .ag-hero-text { text-align: center !important; align-items: center !important; } }
        @media (max-width: 960px) { .ag-hero-btns { justify-content: center !important; } }
        .ag-compare-row { display: grid; grid-template-columns: 1fr 1fr; }
        .ag-compare-mobile { display: none; }
        @media (max-width: 640px) {
          .ag-compare-desktop { display: none !important; }
          .ag-compare-mobile { display: flex !important; flex-direction: column; gap: 16px; }
        }
        @media (max-width: 480px) {
          .ag-hero-btns { flex-direction: column !important; }
          .ag-hero-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
          .ag-cta-btns { flex-direction: column !important; }
          .ag-cta-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
        }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero: split layout (background matches the pricing page) ─── */}
        <section style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF1FF 100%)', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', top: '-150px', right: '-90px', width: '540px', height: '440px', background: 'radial-gradient(ellipse at center, rgba(214,61,157,0.09), transparent 66%)', pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', top: '-110px', left: '-70px', width: '520px', height: '420px', background: 'radial-gradient(ellipse at center, rgba(20,104,232,0.08), transparent 66%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="ag-hero-grid">
              <motion.div className="ag-hero-text" style={{ display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For recruitment agencies</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.91, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Win more placements.{' '}<br className="br-desktop" />
                  <span style={{ background: 'linear-gradient(#D7FF43, #D7FF43) no-repeat', backgroundSize: '100% 0.34em', backgroundPosition: '0 calc(100% - 0.1em)', padding: '0 0.05em', WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>Faster.</span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '460px' }}>
                  Reslink gives every candidate you represent a video pitch your clients will actually remember. Shortlists that close. A presentation that no competing agency can match.
                </p>
                <div className="ag-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', background: '#061A3A', color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Schedule a demo <ArrowRight size={16} />
                  </Link>
                  <Link href="/oliviastone" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', background: '#F6F7F9', color: '#061A3A', border: '1.5px solid #E4E6EC', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    See a real Reslink
                  </Link>
                </div>
                <div className="ag-hero-inline-stats" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[['500+', 'agencies globally'], ['40%', 'faster time-to-offer'], ['28%', 'more retained mandates']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#061A3A', lineHeight: 1 }}><AnimatedStat value={v} /></p>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '4px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Shortlist UI mockup */}
              <motion.div className="ag-hero-right" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.12 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #E4E6EC', boxShadow: '0 40px 80px rgba(6,26,58,0.12)' }}>
                  <div style={{ background: '#F6F7F9', borderBottom: '1px solid #ECEEF1', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>VP of Sales · TechCorp Inc.</p>
                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Reslink Shortlist · 4 candidates · Shared 3h ago</p>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1468E8', background: '#EEF4FF', padding: '4px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>2 viewed</span>
                  </div>
                  <div style={{ background: '#FAFBFC', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {candidates.map((c, i) => <CandidateCard key={c.name} {...c} delay={0.2 + i * 0.08} />)}
                  </div>
                  <div style={{ background: '#061A3A', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D7FF43', flexShrink: 0 }} />
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

        {/* ─── Stats ─── */}
        <section style={{ background: '#061A3A', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.2), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="ag-stats-row">
              {[
                { value: '500+', label: 'agencies actively using Reslink' },
                { value: '40%', label: 'faster average time-to-offer' },
                { value: '3.8x', label: 'more client views per candidate' },
                { value: '28%', label: 'lift in retained search mandates' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#D7FF43', lineHeight: 1, letterSpacing: '-0.03em' }}><AnimatedStat value={s.value} /></p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxWidth: '130px', margin: '10px auto 0' }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How it works: grey, numbered circles (matches students/companies) ─── */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Your new process</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                From brief to placement.{' '}<br className="br-desktop" />In less time.
              </h2>
            </motion.div>
            <div className="ag-process-grid">
              {[
                { title: 'Receive the brief', desc: 'You take on a search. Business as usual. Reslink layers on top of your existing workflow with no disruption.' },
                { title: 'Candidates record their pitch', desc: 'You share a Reslink invite. Candidates record a 60–90 second video using our guided teleprompter. Most finish in under 20 minutes.' },
                { title: 'Build a Reslink shortlist', desc: 'You curate your best candidates into a branded shortlist. One link. Your agency on the cover. Sent in minutes.' },
                { title: 'Client watches. Placement closes.', desc: 'Your client watches, and you see exactly who they viewed and for how long. Follow up with data. Close faster.' },
              ].map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', padding: '28px 24px', height: '100%', boxSizing: 'border-box', boxShadow: '0 1px 3px rgba(6,26,58,0.05)' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: i === 3 ? '#D7FF43' : '#061A3A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: i === 3 ? '#061A3A' : '#fff', lineHeight: 1 }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>{step.title}</p>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features: 2x2 with impact stats ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Why agencies choose Reslink</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                The edge your agency{' '}<br className="br-desktop" />has been missing.
              </h2>
            </motion.div>
            <div className="ag-feat-alt">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <div style={{ borderRadius: '20px', border: '1.5px solid #E8EAF0', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', background: '#FAFBFC' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <f.icon size={22} color={f.color} strokeWidth={1.8} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(19px, 1.8vw, 24px)', fontWeight: 900, color: '#061A3A', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '12px' }}>{f.title}</h3>
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

        {/* ─── Compare: unified table ─── */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>The difference</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Agencies that use Reslink{' '}<br className="br-desktop" />operate differently.
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              {/* Desktop table */}
              <div className="ag-compare-desktop" style={{ borderRadius: '20px', border: '1px solid #E4E6EC', overflow: 'hidden', boxShadow: '0 4px 24px rgba(6,26,58,0.07)' }}>
                <div className="ag-compare-row">
                  <div style={{ padding: '18px 28px', background: '#F6F7F9', borderBottom: '1px solid #ECEEF1', borderRight: '1px solid #ECEEF1' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Standard agency</p>
                  </div>
                  <div style={{ padding: '18px 28px', background: '#061A3A', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D7FF43', fontFamily: 'var(--font-body)' }}>Reslink agency</p>
                  </div>
                </div>
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
                      <span style={{ fontSize: '13px', color: '#1468E8', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.55, fontWeight: 500 }}>{after}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mobile two-card layout */}
              <div className="ag-compare-mobile">
                <div style={{ borderRadius: '16px', border: '1px solid #E4E6EC', overflow: 'hidden', boxShadow: '0 2px 12px rgba(6,26,58,0.06)' }}>
                  <div style={{ padding: '14px 20px', background: '#F6F7F9', borderBottom: '1px solid #ECEEF1' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Standard agency</p>
                  </div>
                  {['Send a PDF candidate matrix to the inbox', 'Wait days to hear if anyone even opened it', 'No idea which candidates they actually looked at', 'Compete on the same terms as every other agency', 'Chase clients for feedback and updates'].map((item, i) => (
                    <div key={i} style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid #ECEEF1' : 'none', display: 'flex', alignItems: 'flex-start', gap: '10px', background: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                      <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✕</span>
                      <span style={{ fontSize: '14px', color: '#6B7280', fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(6,26,58,0.12)' }}>
                  <div style={{ padding: '14px 20px', background: '#061A3A', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D7FF43', fontFamily: 'var(--font-body)' }}>Reslink agency</p>
                  </div>
                  {['Send a branded video shortlist. One link.', 'Get view data back in hours, not days', 'See exactly who watched, and for how long', 'Win the brief before the meeting even happens', 'Follow up with real data, not guesses'].map((item, i) => (
                    <div key={i} style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', alignItems: 'flex-start', gap: '10px', background: i % 2 === 0 ? '#061A3A' : '#061C3D' }}>
                      <span style={{ fontSize: '13px', color: '#1468E8', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', lineHeight: 1.55, fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What agencies say</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#061A3A', lineHeight: 0.98 }}>
                Recruiters who switched{' '}<br className="br-desktop" />don&apos;t go back.
              </h2>
            </motion.div>
            <div className="ag-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <TiltCard max={3} style={{ background: '#061A3A', borderRadius: '20px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.25), transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '24px' }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#D7FF43" color="#D7FF43" />)}
                    </div>
                    <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: '#fff', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '32px' }}>&ldquo;{AG_FEATURED.quote}&rdquo;</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: AG_FEATURED.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{AG_FEATURED.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{AG_FEATURED.name}</p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{AG_FEATURED.role} at {AG_FEATURED.company}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
              <div className="ag-testi-side">
                {AG_SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
                    <TiltCard max={5} style={{ background: '#F6F7F9', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                          {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#D7FF43" color="#D7FF43" />)}
                        </div>
                        <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '16px' }}>&ldquo;{q.quote}&rdquo;</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: q.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{q.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{q.name}</p>
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
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: '#F6F7F9' }}>
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

        {/* ─── CTA ─── (shared component — pink-glow navy box, matches the rest of the site) */}
        <CTA
          eyebrow="For recruitment agencies"
          heading={<>Send a shortlist{' '}<br className="br-desktop" /><span>they can&apos;t forget.</span></>}
          body="Join 500+ agencies already using Reslink to close more placements and win more business."
          primaryLabel="Schedule a demo"
          primaryHref="/contact/sales"
          secondaryLabel="See a real Reslink"
          secondaryHref="/oliviastone"
          footnote="30-minute call · pricing for your roster size · no card needed"
        />

      </main>
      <Footer />
    </>
  );
}
