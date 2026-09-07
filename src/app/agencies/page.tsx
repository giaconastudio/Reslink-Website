'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, TrendingUp, Award, BarChart2, ArrowRight, Plus, Minus, Check, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';
import { AnimatedStat } from '@/components/CountUp';
import CTA from '@/components/CTA';

/* ─── Features ─── */
const FEATURES = [
  {
    icon: Play, color: '#1468E8', bg: '#EEF4FF',
    title: 'Candidates who speak for themselves',
    body: 'Every candidate you represent gets a video pitch. Your client sees the person, not a formatted PDF.',
    stat: 'Clients watch 85% of a pitch on average',
  },
  {
    icon: TrendingUp, color: '#1468E8', bg: '#EEF4FF',
    title: 'Decisions come back faster',
    body: 'Hiring managers get the context immediately. Fewer back-and-forths, quicker yes or no.',
    stat: '40% faster time-to-offer on shortlisted roles',
  },
  {
    icon: Award, color: '#1468E8', bg: '#EEF4FF',
    title: 'Nothing else in the inbox looks like it',
    body: 'Not another spreadsheet of names. A branded shortlist with your agency on the cover.',
    stat: '28% lift in retained mandates',
  },
  {
    icon: BarChart2, color: '#1468E8', bg: '#EEF4FF',
    title: 'You stop guessing',
    body: 'See which candidates your client watched, for how long, and which they skipped.',
    stat: 'Live view tracking per candidate, per client',
  },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How does pricing work for agencies?', a: 'Reslink offers agency plans based on team size and placement volume. We work with boutique firms and large multi-desk agencies. Reach out for a custom quote.' },
  { q: "What if candidates won't record one?", a: 'Most do once they see it helps them stand out. If a candidate opts out, nothing breaks - you can still shortlist them the usual way. In practice, the ones who record get noticed first.' },
  { q: 'Can clients view a shortlist without an account?', a: 'Yes. Your client just opens the link - no login, no account, no app to download. They watch on any device, and you see exactly who viewed what.' },
  { q: 'Can we brand shortlists with our own identity?', a: "Yes. Shortlists and candidate profiles can carry your agency's branding. Your client sees your name on the package that impressed them." },
  { q: 'Who owns the candidate videos?', a: 'The candidate owns their video and profile, and can reuse it across applications. You share their Reslink as part of your shortlist for as long as they are on the market with you.' },
  { q: 'Do candidates need any technical experience?', a: 'None. Our built-in teleprompter walks them line by line through their script. Most candidates record a final-quality pitch in under 20 minutes on any device.' },
  { q: 'What roles does Reslink work best for?', a: 'Reslink works across verticals. It performs especially well in sales, marketing, leadership, client-facing, and professional services roles where communication and presence are part of the job.' },
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
  stat: 'Client called back in two hours',
  name: 'Managing Director', avatar: '/avatars/ag-testi-1.jpg',
};
const AG_SIDE_QUOTES = [
  { quote: "Our close rate on shortlisted roles went up immediately. Clients make faster decisions when they've watched the candidate. Less ghosting, less uncertainty. Reslink fixed something we didn't know how to fix.", name: 'Senior Partner', avatar: '/avatars/ag-testi-2.jpg' },
  { quote: "We were competing against four other agencies on a Director of Sales search. We were the only firm that sent Reslink profiles. We won the placement and they put us on their preferred vendor list.", name: 'Agency Founder', avatar: '/avatars/ag-testi-3.jpg' },
  { quote: 'The tracking data alone changed how we follow up. I know which candidates my client watched twice. I know who they skipped. I can coach candidates and have smarter conversations with clients.', name: 'Principal Recruiter', avatar: '/avatars/ag-testi-4.jpg' },
];


const SHORTLIST = [
  { name: 'Sarah Mitchell', title: 'VP of Sales · 12 yrs exp.', color: '#1468E8', time: '0:47' },
  { name: 'Daniel Park', title: 'Director of Marketing · 8 yrs exp.', color: '#D63D9D', time: '1:42' },
  { name: 'Priya Nair', title: 'Head of Growth · 6 yrs exp.', color: '#5B7A0F', time: '1:05' },
  { name: 'James Weston', title: 'Enterprise AE · 10 yrs exp.', color: '#061A3A', time: '0:58' },
];
const STEP_MS = 2400;

/* Self-playing shortlist demo (same idea as the companies-page feature demos):
   a client works down the shortlist in real time — the highlight moves from
   row to row with a filling progress bar, rows flip from pending → watching →
   watched, and the live bar at the bottom narrates who they're on. */
function AnimatedShortlist() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % SHORTLIST.length), STEP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div style={{ background: '#F6F7F9', borderBottom: '1px solid #ECEEF1', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>VP of Sales · TechCorp Inc.</p>
          <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Reslink Shortlist · 4 candidates · Shared 3h ago</p>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: '#16A34A', background: '#E7F8ED', padding: '4px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>
          <motion.span animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
          Live
        </span>
      </div>

      <div style={{ background: '#FAFBFC', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {SHORTLIST.map((c, i) => {
          const status = i < active ? 'watched' : i === active ? 'watching' : 'pending';
          const borderColor = status === 'watching' ? '#16A34A' : status === 'watched' ? '#BBF7D0' : '#E8EAF0';
          const shadow = status === 'watching' ? '0 6px 22px rgba(22,163,74,0.16)' : status === 'watched' ? '0 4px 20px rgba(22,163,74,0.08)' : '0 2px 8px rgba(6,26,58,0.06)';
          return (
            <div key={c.name} style={{ position: 'relative', background: '#fff', borderRadius: '14px', border: `1.5px solid ${borderColor}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: shadow, overflow: 'hidden', transition: 'border-color 0.4s ease, box-shadow 0.4s ease' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{c.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</p>
                <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {status === 'pending' && (
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1468E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '7px solid #fff', marginLeft: '2px' }} />
                  </div>
                )}
                {status === 'watching' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', fontFamily: 'var(--font-body)' }}>Watching</span>
                  </div>
                )}
                {status === 'watched' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', fontFamily: 'var(--font-body)' }}>Watched {c.time}</span>
                  </div>
                )}
              </div>
              {status === 'watching' && (
                <motion.div key={active} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: STEP_MS / 1000, ease: 'linear' }} style={{ position: 'absolute', left: 0, bottom: 0, height: '3px', background: '#16A34A' }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ background: '#061A3A', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D7FF43', flexShrink: 0 }} />
        <motion.p key={active} initial={{ opacity: 0.35, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', flex: 1 }}>
          <span style={{ color: '#fff', fontWeight: 700 }}>TechCorp hiring manager</span>{' '}is watching {SHORTLIST[active].name.split(' ')[0]}&apos;s pitch
        </motion.p>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', flexShrink: 0 }}>now</span>
      </div>
    </>
  );
}

export default function AgenciesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <style>{`
        .ag-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .ag-testi-side { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 760px) { .ag-testi-grid { grid-template-columns: 1fr !important; } .ag-testi-grid > * { min-width: 0; } }
        .ag-hero-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 44px; align-items: center; }
        .ag-hero-shift { transform: translateX(40px); }
        @media (max-width: 960px) { .ag-hero-shift { transform: none; } }
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
        @media (max-width: 960px) { .ag-hero-card { box-shadow: 0 8px 32px rgba(6,26,58,0.10) !important; } }
        @media (max-width: 860px) { .ag-process-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 860px) { .ag-process-line { display: none !important; } }
        @media (max-width: 480px) { .ag-process-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .ag-stats-row { grid-template-columns: 1fr !important; } }
        @media (max-width: 860px) { .ag-hero-inline-stats { display: none !important; } }
        @media (max-width: 960px) { .ag-hero-text { text-align: center !important; align-items: center !important; } }
        @media (max-width: 960px) { .ag-hero-btns { justify-content: center !important; } }
        .ag-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: stretch; }
        @media (max-width: 640px) { .ag-compare { grid-template-columns: 1fr !important; gap: 16px !important; } }
        @media (max-width: 480px) {
          .ag-hero-btns { flex-direction: column !important; }
          .ag-hero-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
          .ag-cta-btns { flex-direction: column !important; }
          .ag-cta-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
        }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero: split layout (background matches the pricing page) ─── */}
        <section style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF1FF 100%)', padding: 'clamp(72px, 9vw, 120px) 24px clamp(96px, 12vw, 168px)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', top: '-150px', right: '-90px', width: '540px', height: '440px', background: 'radial-gradient(ellipse at center, rgba(214,61,157,0.09), transparent 66%)', pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', top: '-110px', left: '-70px', width: '520px', height: '420px', background: 'radial-gradient(ellipse at center, rgba(20,104,232,0.08), transparent 66%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="ag-hero-grid">
              <motion.div className="ag-hero-text" style={{ display: 'flex', flexDirection: 'column' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For recruitment agencies</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 6.6vw, 78px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '26px' }}>
                  Send more{' '}<br className="br-desktop" />
                  than a <span style={{ background: 'linear-gradient(#D7FF43, #D7FF43) no-repeat', backgroundSize: '100% 0.34em', backgroundPosition: '0 calc(100% - 0.1em)', padding: '0 0.05em', WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>resume</span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '460px' }}>
                  Every candidate you represent gets a video pitch. Your client sees the person, not another PDF, and you see exactly who they watched.
                </p>
                <div className="ag-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', background: '#061A3A', color: '#fff', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'transform 0.15s ease, filter 0.15s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.18)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'none'; }}>
                    Schedule a demo <ArrowRight size={16} />
                  </Link>
                  <Link href="/oliviastone" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', background: '#F6F7F9', color: '#061A3A', border: '1.5px solid #E4E6EC', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'background 0.15s ease, border-color 0.15s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#EAF1FF'; e.currentTarget.style.borderColor = '#C9D6EE'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#F6F7F9'; e.currentTarget.style.borderColor = '#E4E6EC'; }}>
                    See a real Reslink
                  </Link>
                </div>
                <div className="ag-hero-inline-stats" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[['40%', 'faster time-to-offer'], ['28%', 'more retained mandates'], ['2 hrs', 'to first client response']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#061A3A', lineHeight: 1 }}><AnimatedStat value={v} /></p>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '4px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Shortlist UI mockup */}
              <motion.div className="ag-hero-right" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.12 }}>
               <div className="ag-hero-shift">
                <div className="ag-hero-card" style={{ borderRadius: '20px', overflow: 'hidden', border: '1.5px solid #E4E6EC', boxShadow: '0 40px 80px rgba(6,26,58,0.12)' }}>
                  <AnimatedShortlist />
                </div>
               </div>
              </motion.div>
            </div>
          </div>
        </section>

        <LogoTicker />

        {/* ─── How it works: grey, numbered circles (matches students/companies) ─── */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Your new process</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                How it fits into{' '}<br className="br-desktop" />what you already do
              </h2>
            </motion.div>
            <div style={{ position: 'relative' }}>
            {/* Dotted connector running behind the cards, through the number badges */}
            <div className="ag-process-line" aria-hidden style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', borderTop: '2px dotted #1468E8', zIndex: 0 }} />
            <div className="ag-process-grid" style={{ position: 'relative', zIndex: 1 }}>
              {[
                { title: 'Receive the brief', desc: 'Business as usual. Reslink sits on top of your workflow.' },
                { title: 'Candidates record', desc: 'You send an invite. Most finish in under twenty minutes.' },
                { title: 'Build your shortlist', desc: 'Your best candidates, one branded link.' },
                { title: 'Client watches', desc: 'You see who they opened, and for how long.' },
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
          </div>
        </section>

        {/* ─── Features: 2x2 with impact stats ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px clamp(40px, 5vw, 60px)' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Why agencies choose Reslink</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                The part your{' '}<br className="br-desktop" />competitors don&apos;t have
              </h2>
            </motion.div>
            <div className="ag-feat-alt">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <div style={{ borderRadius: '20px', border: '1.5px solid #F3DCEA', padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', background: '#FBEEF5' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F7DAEA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                      <f.icon size={22} color="#C0398A" strokeWidth={1.8} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(19px, 1.8vw, 24px)', fontWeight: 900, color: '#061A3A', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '12px' }}>{f.title}</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)', flex: 1, marginBottom: '20px' }}>{f.body}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#061A3A', borderRadius: '8px' }}>
                      <TrendingUp size={13} color="#D7FF43" strokeWidth={2} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>{f.stat}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Compare: two branded cards (matches the universities page) ─── */}
        <section style={{ background: '#fff', padding: 'clamp(40px, 5vw, 60px) 24px clamp(64px, 8vw, 96px)' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>The difference</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Same brief.{' '}<br className="br-desktop" />Different submission.
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="ag-compare">
              {/* Standard agency — muted card */}
              <div style={{ background: '#F6F7F9', border: '1px solid #ECEEF1', borderRadius: '22px', padding: 'clamp(24px, 3vw, 34px)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '22px' }}>Standard agency</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {[
                    'A PDF candidate matrix in the inbox',
                    'Days of silence after you submit',
                    'No idea which candidates they read',
                    'The same submission as four other firms',
                    'Chase clients for feedback',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#E4E7EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <X size={12} color="#9AA1AE" strokeWidth={3} />
                      </span>
                      <span style={{ fontSize: '14.5px', color: '#6B7280', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reslink agency — elevated navy card, CTA-style blue + pink glow */}
              <div style={{ position: 'relative', background: 'radial-gradient(ellipse 58% 62% at 94% 0%, rgba(214,61,157,0.38), transparent 55%), radial-gradient(ellipse 60% 60% at 4% 100%, rgba(20,104,232,0.32), transparent 55%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)', border: '2px solid #D7FF43', borderRadius: '22px', padding: 'clamp(24px, 3vw, 34px)', overflow: 'hidden', boxShadow: '0 26px 60px rgba(6,26,58,0.22)' }}>
                <p style={{ position: 'relative', zIndex: 1, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '22px' }}>Reslink agency</p>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {[
                    'A branded video shortlist. One link.',
                    'View data back in hours, not days',
                    'See exactly who watched, and for how long',
                    'The only one they can actually watch',
                    'Follow up with data, not guesses',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <Check size={12} color="#061A3A" strokeWidth={3} />
                      </span>
                      <span style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-body)', lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Testimonials (matches the universities page) ─── */}
        <section style={{ background: '#EEF4FF', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What agencies say</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#061A3A', lineHeight: 0.98 }}>
                What changed for them
              </h2>
            </motion.div>
            <div className="ag-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ background: 'radial-gradient(ellipse 58% 62% at 94% 0%, rgba(214,61,157,0.34), transparent 55%), radial-gradient(ellipse 60% 60% at 4% 100%, rgba(20,104,232,0.3), transparent 55%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)', borderRadius: '24px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontSize: 'clamp(20px, 2.3vw, 27px)', color: '#fff', lineHeight: 1.45, fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '26px' }}>&ldquo;{AG_FEATURED.quote}&rdquo;</p>
                    <span style={{ display: 'inline-block', background: '#D7FF43', color: '#061A3A', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', padding: '8px 16px', borderRadius: '100px' }}>{AG_FEATURED.stat}</span>
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '28px 0 22px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={AG_FEATURED.avatar} alt="" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{AG_FEATURED.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="ag-testi-side">
                {AG_SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
                    <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid #DCE8FB', padding: '26px 28px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', boxShadow: '0 10px 30px rgba(20,104,232,0.06)' }}>
                      <p style={{ fontSize: '15px', color: '#2A3242', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '20px' }}>&ldquo;{q.quote}&rdquo;</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={q.avatar} alt="" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{q.name}</p>
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
          heading={<>Send a shortlist{' '}<br className="br-desktop" /><span>they can&apos;t forget</span></>}
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
