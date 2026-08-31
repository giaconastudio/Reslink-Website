'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, FileText, BarChart2, LifeBuoy, Link2, Wallet, Tag, Check, Zap, Video, Eye, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

/* ─── Product explainer (what an affiliate is actually recommending) ─── */
const RECOMMEND = [
  { key: 'script', title: 'AI writes the script', body: 'PitchAI turns a resume into a 90-second script aimed at the specific role.', em: 'The blank page problem disappears', tail: ' — which is why most people never make a video in the first place.' },
  { key: 'teleprompter', title: 'Teleprompter recording, in the browser', body: 'The script scrolls while they record on a laptop or phone. No editing software, no second-take anxiety, no download.' },
  { key: 'onelink', title: 'Video and resume behind one link', body: 'Recruiters open one page and get both — in an application form, a LinkedIn bio, or an email signature.' },
  { key: 'watched', title: 'They can see who watched', body: 'Who opened it, when, and how much they watched. ', em: 'This is the feature people pay for', tail: ' — job hunting is mostly silence, and this is the first thing that breaks it.' },
  { key: 'ats', title: 'Works with any ATS', body: "It's a link, so it drops into any application system without breaking parsing. Nobody changes how they apply." },
  { key: 'fast', title: 'Ready in about five minutes', body: 'Resume in, script out, record, share. Your audience can act on your recommendation the same day they hear it.' },
];

/* ─── Recurring / compounding value ─── */
const GAIN = [
  { tag: 'RECURRING', title: 'Paid every month, not once', body: 'Most programmes pay a flat fee at signup and you start again from zero. Here, last quarter’s referrals are still paying you next year.' },
  { tag: '24 MONTHS', title: 'Two full years per customer', body: 'Not six months, not twelve. Someone you refer today can pay you commission well into 2028.' },
  { tag: '90 DAYS', title: 'A long window to convert', body: 'People rarely subscribe the day they hear about something. You still get credited up to three months later.' },
  { tag: 'COMPOUNDING', title: 'It builds while you sleep', body: 'Refer five a month and by month twelve dozens of people are paying you, without you doing anything new that month.' },
];

/* ─── What we hand the affiliate ─── */
const GIVE = [
  { icon: FileText, tag: 'ASSETS', title: "Copy that's ready to send", body: 'Email sequences, LinkedIn hooks, short-form scripts and banner sets. Use them as they are or rewrite them.' },
  { icon: BarChart2, tag: 'TRACKING', title: 'A dashboard you can trust', body: 'Clicks, signups, conversions and pending commission, updated daily.' },
  { icon: LifeBuoy, tag: 'SUPPORT', title: 'A person, not a portal', body: 'A named contact. Ask for a custom landing page, an audience discount code, or a co-hosted session.' },
  { icon: Link2, tag: 'YOUR LINK', title: 'One link, any channel', body: 'Newsletter, bio, a slide at the end of a workshop, or a QR code at a careers fair.' },
  { icon: Wallet, tag: 'PAYOUTS', title: 'Monthly, no chasing', body: "Paid on a monthly cycle once you pass the threshold. You can see what's due and when." },
  { icon: Tag, tag: 'OFFERS', title: 'Something for your audience', body: 'Students and veterans already get half price, and larger partners get an audience-specific offer.' },
];

/* ─── Who this is actually for (added — qualifies the audience) ─── */
const AUDIENCE = [
  'Career creators & coaches',
  'Newsletter & community owners',
  'Bootcamps & educators',
  'University career centres',
  'Recruiters & HR voices',
  'Anyone with a job-seeking audience',
];

/* ─── Proof ─── */
const PROOF = [
  { amount: '$1,240', unit: '/mo', who: 'Career newsletter', note: '11k subscribers · one dedicated send + a permanent footer link.', color: '#1468E8' },
  { amount: '$860', unit: '/mo', who: 'Interview coach', note: 'Recommends it to every 1:1 client at the end of the first session.', color: '#D63D9D' },
  { amount: '$430', unit: '/mo', who: 'Uni careers society', note: 'One workshop slide and a QR code at the autumn careers fair.', color: '#5B7A0F' },
];

const FAQS = [
  { q: 'What exactly do I earn commission on?', a: '45% of every payment a customer you referred makes, for up to 24 months from their first paid subscription. On the $14/month plan that’s $6.30 per customer, every month they stay.' },
  { q: 'How long is the referral window (cookie)?', a: 'Ninety days. If someone clicks your link and subscribes any time in the next three months, the referral is credited to you.' },
  { q: 'When and how do I get paid?', a: 'Monthly, once your balance passes a small threshold. Payouts go out on a fixed cycle by bank transfer or PayPal, and pending vs. cleared commission is always visible in your dashboard.' },
  { q: 'Do audience discounts reduce my commission?', a: 'No. Commission is calculated on what the customer actually pays. If we give your audience a code, you still earn your full 45% recurring share.' },
  { q: 'Can I refer myself or my own company?', a: 'Self-referrals don’t qualify, but referring your team, clients, students or community absolutely does.' },
  { q: 'How long does approval take?', a: 'Usually within two working days. We keep the programme clean, so we do review applications — but if you have a real audience, you’re in.' },
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

const eyebrow = (color: string): React.CSSProperties => ({ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color, marginBottom: '14px', fontFamily: 'var(--font-body)' });
const h2Style: React.CSSProperties = { fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.2vw, 52px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.96, letterSpacing: '-0.03em' };

/* Hero visual — payouts arriving, month after month. */
function HeroPayouts() {
  const items = [
    { amt: '+$378', when: 'March' },
    { amt: '+$412', when: 'April' },
    { amt: '+$447', when: 'May' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {items.map((p, i) => (
        <motion.div key={p.when}
          initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.2 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginLeft: `${(2 - i) * 26}px`, marginRight: `${i * 20}px` }}>
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut', delay: 0.9 + i * 0.2 }}
            style={{ background: '#fff', borderRadius: '15px', padding: '16px 20px', boxShadow: '0 20px 46px rgba(0,0,0,0.32)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={16} color="#3B6D11" strokeWidth={3} />
            </span>
            <div>
              <p style={{ fontSize: '16px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.1 }}>{p.amt} paid</p>
              <p style={{ fontSize: '13px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '1px' }}>{p.when}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Animated visual for each feature, shown in the sticky panel ── */
const vFrame: React.CSSProperties = { width: '100%', maxWidth: '340px', height: '384px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(6,26,58,0.14)', background: '#fff', position: 'relative', boxSizing: 'border-box' };

function FeatureVisual({ type }: { type: string }) {
  if (type === 'teleprompter') {
    const lines = ["Hi, I'm Olivia — a business", 'development rep who turns cold', 'lists into booked demos.', 'Last quarter I beat quota', 'by 128% by rebuilding the', 'whole outbound sequence.'];
    return (
      <div style={{ ...vFrame, background: '#0B1830' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
          <motion.span animate={{ opacity: [1, 0.25, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#D7FF43', fontFamily: 'var(--font-body)' }}>TELEPROMPTER · 1.0×</span>
          <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>REC 0:12</span>
        </div>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
          <motion.div animate={{ y: ['32%', '-52%'] }} transition={{ repeat: Infinity, duration: 9, ease: 'linear' }} style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}>
            {lines.map((l, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-phudu)', fontSize: '19px', fontWeight: 900, color: i === 3 || i === 4 ? '#D7FF43' : '#fff', lineHeight: 1.15, letterSpacing: '-0.01em', textAlign: 'center', margin: 0 }}>{l}</p>
            ))}
          </motion.div>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(#0B1830 3%, transparent 24%, transparent 76%, #0B1830 97%)', pointerEvents: 'none' }} />
      </div>
    );
  }
  if (type === 'onelink') {
    return (
      <div style={vFrame}>
        <div style={{ position: 'relative', height: '186px', background: '#C74FA0' }}>
          <video src="/videos/cta-resume.mp4" poster="/videos/hero-cta-resume.jpg" autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <span style={{ position: 'absolute', top: '12px', left: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(6,26,58,0.55)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D7FF43' }} /> Playing
          </span>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <p style={{ fontSize: '16px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)' }}>Olivia Stone</p>
          <p style={{ fontSize: '12px', color: '#8A93A3', fontFamily: 'var(--font-body)', marginTop: '2px', marginBottom: '12px' }}>Business Dev Rep · London</p>
          <div style={{ background: '#F6F7F9', border: '1px solid #ECEEF1', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#5C6070', fontFamily: 'monospace', marginBottom: '12px' }}>reslink.io/<span style={{ color: '#061A3A', fontWeight: 700 }}>oliviastone</span></div>
          <p style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: '#3A4150', fontFamily: 'var(--font-body)', background: '#FAFFF0', border: '1px solid #EEF7CF', borderRadius: '8px', padding: '8px 12px', margin: 0 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5B7A0F', flexShrink: 0 }} />
            Recruiter at Stripe watched 87%
          </p>
        </div>
      </div>
    );
  }
  if (type === 'watched') {
    const rows = [{ who: 'Recruiter · Stripe', pct: 87, c: '#5B7A0F' }, { who: 'Recruiter · Google', pct: 62, c: '#1468E8' }, { who: 'Hiring mgr · Notion', pct: 41, c: '#D63D9D' }];
    return (
      <div style={{ ...vFrame, padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '26px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={15} color="#1468E8" /></span>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)' }}>Who watched</span>
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#9AA1AE', fontFamily: 'var(--font-body)' }}>last 7 days</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {rows.map((r, i) => (
            <div key={r.who}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                <span style={{ fontSize: '13px', color: '#3A4150', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{r.who}</span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#061A3A', fontFamily: 'var(--font-phudu)' }}>{r.pct}%</span>
              </div>
              <div style={{ height: '7px', borderRadius: '100px', background: '#EDEFF3', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${r.pct}%` }} transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 3.2 }} style={{ height: '100%', borderRadius: '100px', background: r.c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (type === 'ats') {
    return (
      <div style={{ ...vFrame, padding: '22px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Application · Acme Inc.</p>
        {[{ l: 'Full name', v: 'Olivia Stone' }, { l: 'Email', v: 'olivia@example.com' }].map((f) => (
          <div key={f.l} style={{ marginBottom: '14px' }}>
            <p style={{ fontSize: '11px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>{f.l}</p>
            <div style={{ border: '1px solid #ECEEF1', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', color: '#061A3A', fontFamily: 'var(--font-body)', background: '#FAFAFA' }}>{f.v}</div>
          </div>
        ))}
        <div style={{ marginBottom: '18px' }}>
          <p style={{ fontSize: '11px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '5px' }}>Portfolio / link</p>
          <div style={{ border: '1.5px solid #1468E8', borderRadius: '8px', padding: '9px 12px', background: '#fff', display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 }} style={{ fontSize: '13px', color: '#061A3A', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>reslink.io/oliviastone</motion.span>
            <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: 'spring', stiffness: 400 }} style={{ marginLeft: 'auto', color: '#5B7A0F', display: 'inline-flex' }}><Check size={16} strokeWidth={3} /></motion.span>
          </div>
        </div>
        <div style={{ background: '#1468E8', borderRadius: '9px', padding: '11px', textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: '13px', fontFamily: 'var(--font-body)' }}>Submit application</div>
      </div>
    );
  }
  if (type === 'fast') {
    const steps = ['Paste resume', 'Script generated', 'Recorded', 'Link shared'];
    return (
      <div style={{ ...vFrame, padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={15} color="#3B6D11" /></span>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)' }}>Start to share</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-phudu)', fontSize: '17px', fontWeight: 900, color: '#5B7A0F' }}>≈ 5 min</span>
        </div>
        <div>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.span animate={{ scale: [1, 1.22, 1] }} transition={{ duration: 0.4, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }} style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={13} color="#061A3A" strokeWidth={3} />
                </motion.span>
                {i < steps.length - 1 && <div style={{ width: '2px', flex: 1, minHeight: '22px', background: '#EDEFF3' }} />}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)', paddingTop: '3px', paddingBottom: i < steps.length - 1 ? '20px' : 0 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // default → script
  return (
    <div style={{ ...vFrame, padding: '22px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#FBEAF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={15} color="#D63D9D" /></span>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)' }}>PitchAI</span>
        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#9AA1AE', fontFamily: 'var(--font-body)' }}>90-second script</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {[0.95, 0.7, 0.9, 0.55, 0.82, 0.65].map((w, i) => (
          <motion.div key={i} initial={{ width: 0 }} animate={{ width: `${w * 100}%` }} transition={{ duration: 0.45, delay: i * 0.32, repeat: Infinity, repeatDelay: 3.5 }} style={{ height: '9px', borderRadius: '100px', background: i === 0 ? '#F4C6E0' : '#EDEFF3' }} />
        ))}
      </div>
      <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#5B7A0F', fontFamily: 'var(--font-body)' }}>
        <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#EAF3DE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={12} color="#3B6D11" strokeWidth={3} /></span>
        Script ready in 8 seconds
      </div>
    </div>
  );
}

/* Scroll-synced feature list — the sticky visual follows whichever row is in view. */
function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx)); });
    }, { rootMargin: '-48% 0px -48% 0px' });
    rows.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  // Move the rail's pink fill down to the active feature's dot (re-measure once
  // the expand/collapse animation settles so it lands exactly on the dot).
  useEffect(() => {
    const measure = () => { const el = rows.current[active]; if (el) setFill(el.offsetTop + 22); };
    measure();
    const t = setTimeout(measure, 420);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div className="af-recommend-grid" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'start' }}>
      <div className="af-recommend-media" style={{ position: 'sticky', top: '96px', maxWidth: '340px' }}>
        <motion.div key={RECOMMEND[active].key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <FeatureVisual type={RECOMMEND[active].key} />
        </motion.div>
      </div>
      {/* Progress rail: a pink fill + dot travels to whichever feature is active */}
      <div style={{ position: 'relative', paddingLeft: '32px' }}>
        <div style={{ position: 'absolute', left: '6px', top: '10px', bottom: '10px', width: '2px', background: '#EEF0F3', borderRadius: '2px' }} />
        <div style={{ position: 'absolute', left: '6px', top: '10px', width: '2px', height: `${fill}px`, background: '#D63D9D', borderRadius: '2px', transition: 'height 0.45s ease' }} />
        {RECOMMEND.map((r, i) => {
          const on = active === i;
          const done = i <= active;
          return (
            <div key={r.title} data-idx={i} ref={(el) => { rows.current[i] = el; }} onMouseEnter={() => setActive(i)}
              style={{ position: 'relative', padding: '15px 0', cursor: 'default', transform: on ? 'translateX(6px)' : 'none', opacity: on ? 1 : 0.5, transition: 'transform 0.35s ease, opacity 0.35s ease' }}>
              <span style={{ position: 'absolute', left: on ? '-33px' : '-30px', top: on ? '18px' : '21px', width: on ? '14px' : '8px', height: on ? '14px' : '8px', borderRadius: '50%', background: done ? '#D63D9D' : '#D3D8E0', border: on ? '3px solid #fff' : 'none', boxShadow: on ? '0 0 0 1.5px #D63D9D' : 'none', transition: 'all 0.35s ease' }} />
              <p style={{ fontSize: on ? '18px' : '16px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', margin: 0, letterSpacing: '-0.01em', transition: 'font-size 0.3s ease' }}>{r.title}</p>
              <div style={{ overflow: 'hidden', maxHeight: on ? '200px' : '0px', opacity: on ? 1 : 0, transition: 'max-height 0.42s ease, opacity 0.35s ease' }}>
                <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', margin: 0, paddingTop: '8px' }}>
                  {r.body}{r.em && <><span style={{ color: '#D63D9D', fontWeight: 600 }}>{r.em}</span>{r.tail}</>}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AffiliatesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [refers, setRefers] = useState(25);
  const [retention, setRetention] = useState(12);

  // Commission maths: $14 plan × 45% = $6.30 per customer, per month.
  const RATE = 14 * 0.45;
  const activeAfter12 = refers * Math.min(12, retention);
  const monthlyAfter12 = activeAfter12 * RATE;
  const yearOne = Array.from({ length: 12 }, (_, i) => refers * Math.min(i + 1, retention) * RATE).reduce((a, b) => a + b, 0);
  const totalTwoYears = refers * RATE * Array.from({ length: 24 }, (_, i) => Math.min(retention, 24 - i)).reduce((a, b) => a + b, 0);
  const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

  return (
    <>
      <Navbar dark />
      <style>{`
        @media (max-width: 860px) {
          .af-hero-split { grid-template-columns: 1fr !important; }
          .af-hero-copy { text-align: center; }
          .af-hero-copy p, .af-hero-copy h1 { margin-left: auto !important; margin-right: auto !important; }
          .af-hero-btns { flex-direction: column !important; align-self: stretch !important; justify-content: center !important; }
          .af-hero-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
          .af-calc-grid { grid-template-columns: 1fr !important; }
          .af-calc-right { border-radius: 0 0 0 0 !important; }
          .af-give-grid, .af-recommend-grid { grid-template-columns: 1fr !important; }
          .af-reels-grid { grid-template-columns: 1fr !important; max-width: 380px; margin: 0 auto; }
          .af-gain-grid, .af-why-grid, .af-proof-grid { grid-template-columns: 1fr !important; }
          .af-recommend-media { position: static !important; margin: 0 auto 32px !important; }
        }
        @media (max-width: 640px) { .af-give-grid { grid-template-columns: 1fr !important; } }
        .af-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 100px; background: linear-gradient(90deg, #1468E8 var(--fill,10%), #E7EBF2 var(--fill,10%)); outline: none; }
        .af-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 24px; height: 24px; border-radius: 50%; background: #061A3A; cursor: pointer; box-shadow: 0 2px 8px rgba(6,26,58,0.35); border: 3px solid #fff; }
        .af-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #061A3A; cursor: pointer; border: 3px solid #fff; }
      `}</style>

      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero (split: copy + animated earnings preview) ─── */}
        <section style={{ background: '#061A3A', padding: 'clamp(56px, 7vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-15%', right: '-6%', width: '620px', height: '620px', background: 'radial-gradient(ellipse, rgba(214,61,157,0.22), transparent 62%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-25%', left: '-8%', width: '560px', height: '560px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.28), transparent 65%)', pointerEvents: 'none' }} />
          <div className="af-hero-split" style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>
            <motion.div className="af-hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ ...eyebrow('#D7FF43'), marginBottom: '18px' }}>Affiliate programme</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(34px, 4.8vw, 62px)', fontWeight: 900, color: '#fff', lineHeight: 0.94, letterSpacing: '-0.03em', marginBottom: '18px' }}>
                Get paid for every referral.
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontFamily: 'var(--font-body)', maxWidth: '440px', marginBottom: '32px' }}>
                <span style={{ color: '#D7FF43', fontWeight: 700 }}>45% recurring</span> on every customer you send — not a one-off bounty. A referral you make today is still paying you in twenty-three months.
              </p>
              <div className="af-hero-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <Link href="/get-started?type=affiliate" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D7FF43', color: '#061A3A', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Apply now <ArrowRight size={16} />
                </Link>
                <a href="#calculator" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.16)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Work out your earnings
                </a>
              </div>
              <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '12px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase' }}>Free to join · approval usually within 2 working days</p>
            </motion.div>
            <HeroPayouts />
          </div>
        </section>

        {/* ─── Earnings calculator ─── */}
        <section id="calculator" style={{ background: '#F6F7F9', padding: 'clamp(64px, 8vw, 100px) 24px', scrollMarginTop: '80px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
              <p style={eyebrow('#1468E8')}>Earnings calculator</p>
              <h2 style={h2Style}>What could this be worth?</h2>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '460px', margin: '16px auto 0' }}>
                Move the slider. This is the part most affiliate programmes don&apos;t want you to work out.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: '#fff', borderRadius: '20px', border: '1px solid #ECEEF1', boxShadow: '0 20px 60px rgba(6,26,58,0.10)', overflow: 'hidden' }}>
              <div className="af-calc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {/* Inputs */}
                <div style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>People you refer each month</p>
                  <p style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '18px' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '46px', fontWeight: 900, color: '#061A3A', lineHeight: 1, letterSpacing: '-0.03em' }}>{refers}</span>
                    <span style={{ fontSize: '15px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>new customers a month</span>
                  </p>
                  <input type="range" min={1} max={500} step={1} value={refers} onChange={e => setRefers(Number(e.target.value))} className="af-slider" style={{ ['--fill' as string]: `${((refers - 1) / 499) * 100}%` }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#9AA1AE', fontFamily: 'var(--font-body)' }}>
                    <span>1</span><span>250</span><span>500</span>
                  </div>

                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9AA1AE', fontFamily: 'var(--font-body)', margin: '30px 0 12px' }}>How long they stay, on average</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[6, 12, 24].map(m => {
                      const on = retention === m;
                      return (
                        <button key={m} onClick={() => setRetention(m)} style={{ flex: 1, padding: '11px 8px', borderRadius: '10px', border: on ? '1.5px solid #061A3A' : '1.5px solid #ECEEF1', background: on ? '#061A3A' : '#fff', color: on ? '#fff' : '#5C6070', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.15s' }}>
                          {m} months
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Results */}
                <div className="af-calc-right" style={{ padding: 'clamp(28px, 4vw, 40px)', background: 'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(214,61,157,0.22), transparent 60%), #061A3A', position: 'relative' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>After 12 months you&apos;d be earning</p>
                  <p style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 6vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>${fmt(monthlyAfter12)}</span>
                    <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>/month</span>
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginBottom: '24px' }}>from {activeAfter12} active referrals</p>

                  {[
                    { label: 'Earned in year one', value: `$${fmt(yearOne)}` },
                    { label: 'Per customer, per month', value: `$${RATE.toFixed(2)}` },
                    { label: 'Total over two years', value: `$${fmt(totalTwoYears)}`, hi: true },
                  ].map((row, i) => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: i === 0 ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>{row.label}</span>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: row.hi ? '#D7FF43' : '#fff', letterSpacing: '-0.01em' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{ padding: '16px clamp(28px, 4vw, 40px)', borderTop: '1px solid #ECEEF1', fontSize: '12px', color: '#9AA1AE', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
                Based on the $14 monthly plan at 45% commission. Assumes referrals arrive evenly and stay for the period selected.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── Why it converts ─── */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
              <p style={eyebrow('#1468E8')}>Why it converts</p>
              <h2 style={h2Style}>An easy thing to recommend.</h2>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '460px', margin: '16px auto 0' }}>
                You&apos;re not asking your audience to gamble on an unknown tool at fifty dollars a month.
              </p>
            </motion.div>
            <div className="af-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[
                { stat: '$0', label: 'Free to start', color: '#1468E8', body: "Nobody spends anything to try it. That's the lowest-friction share in this category, and it's why click-to-signup holds up." },
                { stat: '10,000+', label: 'Already in use', color: '#D63D9D', body: "You're recommending something with real users, not a beta. Your credibility is the thing you're actually lending." },
                { stat: '5 min', label: 'Immediate payoff', color: '#5B7A0F', body: 'People who finish a Reslink on day one are the ones who upgrade in week two. Speed to first value is what converts.' },
              ].map((c, i) => (
                <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', borderTop: `3px solid ${c.color}`, padding: '28px 26px' }}>
                  <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '38px', fontWeight: 900, color: c.color, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>{c.stat}</p>
                  <p style={{ fontSize: '16px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>{c.label}</p>
                  <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── What you're recommending ─── */}
        <section style={{ background: '#fff', padding: 'clamp(56px, 7vw, 88px) 24px', borderTop: '1px solid #F0F2F5' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
              <p style={eyebrow('#D63D9D')}>What you&apos;re recommending</p>
              <h2 style={h2Style}>One link instead of a PDF.</h2>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '16px auto 0' }}>
                Reslink puts a job seeker&apos;s video intro, their resume and live view analytics behind a single link they can drop into any application.
              </p>
            </motion.div>

            <FeatureShowcase />
          </div>
        </section>

        {/* ─── Example posts (Instagram reels) ─── */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
              <p style={eyebrow('#D63D9D')}>Seen in the wild</p>
              <h2 style={h2Style}>Real posts, real referrals.</h2>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '480px', margin: '16px auto 0' }}>
                A few of the ways partners put Reslink in front of their audience. Tap any one to watch it on Instagram.
              </p>
            </motion.div>
            <div className="af-reels-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {['https://www.instagram.com/reel/Da3SrDOIEfi/', 'https://www.instagram.com/reel/DV9IIqkiABy/', 'https://www.instagram.com/reel/DRAiohZCECZ/'].map((url, i) => (
                <motion.a key={url} href={url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ display: 'block', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 14px 40px rgba(6,26,58,0.12)', border: '1px solid #ECEEF1', background: '#fff', textDecoration: 'none' }}>
                  <div style={{ position: 'relative', width: '100%', height: '540px', background: '#061A3A' }}>
                    <iframe src={`${url}embed`} title="Instagram reel" loading="lazy" scrolling="no"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
                    {/* Invisible overlay so the whole card opens the reel on Instagram (Instagram's own play button shows through) */}
                    <span style={{ position: 'absolute', inset: 0, zIndex: 2, cursor: 'pointer' }} />
                  </div>
                  <div style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D63D9D" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="#D63D9D" stroke="none" /></svg>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)' }}>Watch on Instagram</span>
                    <ArrowRight size={14} color="#9AA1AE" style={{ marginLeft: 'auto' }} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Income that keeps arriving ─── */}
        <section style={{ background: '#FBEEF5', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
              <p style={eyebrow('#D63D9D')}>What you gain</p>
              <h2 style={h2Style}>Income that keeps arriving.</h2>
              <p style={{ fontSize: '16px', color: '#8A7A85', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '440px', margin: '16px auto 0' }}>
                The difference between a one-off bounty and a recurring share compounds fast.
              </p>
            </motion.div>
            <div className="af-gain-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {GAIN.map((g, i) => (
                <motion.div key={g.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #F3DCEA', boxShadow: '0 10px 30px rgba(214,61,157,0.06)', padding: '26px 28px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#D63D9D', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>{g.tag}</p>
                  <p style={{ fontSize: '17px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>{g.title}</p>
                  <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{g.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Everything written for you ─── */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
              <p style={eyebrow('#1468E8')}>What we give you</p>
              <h2 style={h2Style}>Everything&apos;s written for you.</h2>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '460px', margin: '16px auto 0' }}>
                You shouldn&apos;t have to invent the campaign as well as run it.
              </p>
            </motion.div>
            <div className="af-give-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {GIVE.map((g, i) => (
                <motion.div key={g.tag} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '26px 24px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '11px', background: '#EAF1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <g.icon size={19} color="#1468E8" strokeWidth={1.9} />
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>{g.tag}</p>
                  <p style={{ fontSize: '16px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>{g.title}</p>
                  <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{g.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Who it's for ─── */}
        <section style={{ background: '#061A3A', padding: 'clamp(56px, 7vw, 88px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <p style={eyebrow('#D7FF43')}>Who it&apos;s for</p>
            <h2 style={{ ...h2Style, color: '#fff' }}>Made for people with an audience.</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '460px', margin: '16px auto 36px' }}>
              If people already trust your take on careers, this is the easiest thing you&apos;ll ever recommend.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {AUDIENCE.map(a => (
                <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '10px 18px', fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)' }}>
                  <Check size={13} color="#D7FF43" strokeWidth={3} /> {a}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Proof ─── */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '44px' }}>
              <p style={eyebrow('#D63D9D')}>From our partners</p>
              <h2 style={h2Style}>People already earning from it.</h2>
              <p style={{ fontSize: '13px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '14px' }}>Early-access partners. Figures self-reported, shown with permission.</p>
            </motion.div>
            <div className="af-proof-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {PROOF.map((p, i) => (
                <motion.div key={p.who} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '28px 26px' }}>
                  <p style={{ display: 'flex', alignItems: 'baseline', gap: '3px', marginBottom: '14px' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '40px', fontWeight: 900, color: p.color, lineHeight: 1, letterSpacing: '-0.03em' }}>{p.amount}</span>
                    <span style={{ fontSize: '15px', color: '#9AA1AE', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{p.unit}</span>
                  </p>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>{p.who}</p>
                  <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{p.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p style={eyebrow('#1468E8')}>The details</p>
              <h2 style={{ ...h2Style, fontSize: 'clamp(28px, 3.6vw, 44px)' }}>Questions affiliates ask.</h2>
            </motion.div>
            <div style={{ background: '#F6F7F9', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section style={{ background: '#061A3A', padding: 'clamp(72px, 10vw, 120px) 24px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-20%', right: '-6%', width: '640px', height: '640px', background: 'radial-gradient(ellipse, rgba(214,61,157,0.24), transparent 62%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30%', left: '-6%', width: '560px', height: '560px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.26), transparent 65%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(38px, 6vw, 74px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.035em', marginBottom: '20px' }}>
              Start earning on<br /><span style={{ color: '#D7FF43' }}>every referral.</span>
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '36px' }}>
              Free to join. Approval usually within two working days. Your first assets are waiting inside.
            </p>
            <div className="af-hero-btns" style={{ display: 'inline-flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/get-started?type=affiliate" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: '#D7FF43', color: '#061A3A', borderRadius: '10px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Apply now <ArrowRight size={16} />
              </Link>
              <a href="#calculator" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.16)', borderRadius: '10px', fontSize: '16px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Work out your earnings
              </a>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
