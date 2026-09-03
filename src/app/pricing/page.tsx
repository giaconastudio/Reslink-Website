'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Star, Minus, Plus, Briefcase, Building2, Users, ShieldCheck, Globe, Lock, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Job seeker plan features ─── */
const SEEKER_FREE = [
  'Create up to 2 Reslinks',
  'In-app video recording',
  'Teleprompter functionality',
  'Shareable profile link',
  'Resource center access',
  'Limited Pitch AI access',
  'Basic email support',
];
const SEEKER_PREMIUM: { header: string | null; items: string[] }[] = [
  { header: null, items: [
    'Unlimited Reslinks',
    'Upload your own video pitch',
    'Full Pitch AI access (unlimited)',
    'In-app recording + teleprompter',
    'Resource center access',
  ] },
  { header: 'Analytics', items: [
    'Application insights: see who viewed you',
    'Watch-time analytics per recruiter',
  ] },
  { header: 'Support', items: [
    'Priority email support',
  ] },
];

/* ─── Company features by tier ─── */
type Maybe = true | false | string;
/* ─── Agency features by tier ─── */
const AGENCY_ROWS: { label: string; starter: Maybe; growth: Maybe; scale: Maybe }[] = [
  { label: 'Active candidate profiles',        starter: 'Up to 25', growth: 'Up to 100', scale: 'Unlimited' },
  { label: 'Recruiter seats',                  starter: '3 seats',  growth: '10 seats',  scale: 'Unlimited' },
  { label: 'Client-facing share links',        starter: true,       growth: true,        scale: true },
  { label: 'Watch-time analytics',             starter: true,       growth: true,        scale: true },
  { label: 'Candidate pipeline management',    starter: true,       growth: true,        scale: true },
  { label: 'Branded agency landing page',      starter: true,       growth: true,        scale: true },
  { label: 'Client shortlist branding',        starter: false,      growth: true,        scale: true },
  { label: 'White-label profile pages',        starter: false,      growth: false,       scale: true },
  { label: 'API access for ATS integrations',  starter: false,      growth: false,       scale: true },
  { label: 'Dedicated success manager',        starter: false,      growth: false,       scale: true },
  { label: 'SLA-backed priority support',      starter: false,      growth: false,       scale: true },
];

const TESTIMONIALS = [
  { quote: "After adding my Reslink to every application, I started getting callbacks within 48 hours. Complete game changer.", name: 'Software Engineer', role: 'Early access user · hired at a Fortune 500 tech co.', initials: 'SE', color: '#4F6EF7' },
  { quote: "I landed my dream job and I genuinely believe the video resume made all the difference. Reslink let me show who I really am.", name: 'Marketing Manager', role: 'Early access user · hired at a social platform', initials: 'MM', color: '#A855F7' },
  { quote: "The analytics feature is unreal. I saw a senior partner watch my video three times. I reached out and got an interview the next morning.", name: 'Finance Analyst', role: 'Early access user · hired at a Big Four firm', initials: 'FA', color: '#F59E0B' },
  { quote: "My recruiter said she had never seen a video resume done that well. She shared it with the entire hiring team before my first interview.", name: 'Product Manager', role: 'Early access user · hired at a fintech scale-up', initials: 'PM', color: '#10B981' },
  { quote: "As a designer I care about how I present myself. Reslink resonated perfectly with the creative teams I was targeting. Two offers in two weeks.", name: 'UX Designer', role: 'Early access user · two offers in two weeks', initials: 'UX', color: '#EF4444' },
  { quote: "Honestly thought video resumes were gimmicky. Then I got a reply from a top payments company within 24 hours of sending my Reslink. I was wrong.", name: 'Data Scientist', role: 'Early access user · hired in fintech', initials: 'DS', color: '#635BFF' },
];

const FAQS = [
  { group: 'personal', q: 'Is the free plan free forever?', a: 'Yes, forever. The free plan lets you create up to 2 Reslinks, record your pitch and share your link, with no credit card and no trial clock ticking.' },
  { group: 'personal', q: 'What does Premium unlock?', a: 'Premium gives you unlimited Reslinks, full analytics (see every recruiter who viewed you and how long they watched), and unrestricted Pitch AI access to help you script and refine your pitch.' },
  { group: 'personal', q: 'Do I need a card to start?', a: 'No. The free plan needs no card at all. You only add a payment method if and when you decide to upgrade to Premium.' },
  { group: 'personal', q: 'Can I cancel anytime?', a: 'Absolutely. Cancel any time from your account settings. Your Premium access stays active until the end of the billing period, no matter which cycle you chose.' },
  { group: 'personal', q: 'What happens to my Reslinks if I downgrade?', a: "Your Reslinks stay live. If you have more than 2, they remain accessible via direct link but you'll need Premium to create new ones." },
  { group: 'personal', q: 'How does the student and veteran discount work?', a: 'Students and veterans get 50% off Premium. Verify with your student email or your service email (through ID.me) after signup - no code needed, and the discount applies automatically.' },
  { group: 'business', q: 'How does company pricing work?', a: 'Companies start with a 14-day free trial on the Growth plan, no card required. Paid plans scale with your open job postings and team seats, and Enterprise is tailored to your hiring volume - just request a demo.' },
  { group: 'business', q: 'What are Reslink Credits, and what happens if I run out?', a: 'Credits power AI screening. Each applicant you screen uses one credit to generate an AI score, video pitch analysis, resume match and role-fit breakdown, from $0.50 per applicant. If you run out, AI screening simply pauses - your postings and candidates stay put - and you can top up any time to switch it back on.' },
  { group: 'business', q: 'Do you offer invoicing or annual contracts?', a: 'Yes. Growth and Enterprise plans can be billed annually, and Enterprise customers can pay by invoice with custom contract terms. Talk to sales and we will set it up.' },
];

type PlanTab = 'seekers' | 'companies' | 'agencies';
type BillingCycle = 'monthly' | 'quarterly' | 'annual';

function CheckItem({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, marginTop: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? '#C2E532' : '#EAF1FF' }}>
        <Check size={11} color={dark ? '#061A3A' : '#1468E8'} strokeWidth={3} />
      </div>
      <span style={{ fontSize: '14px', color: dark ? 'rgba(255,255,255,0.82)' : '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.45 }}>{label}</span>
    </li>
  );
}

function FeatureCell({ value, tier = 'base' }: { value: Maybe; tier?: 'base' | 'mid' | 'top' }) {
  const cfg = {
    base: { bg: '#ECEEF1', check: '#6B7280', xBg: '#ECEEF1', xColor: '#9A9FA8', text: '#5C6070' },
    mid:  { bg: '#EEF4FF', check: '#1468E8', xBg: '#DDE8FF', xColor: '#7AAAE8', text: '#1468E8' },
    top:  { bg: '#D7FF43', check: '#061A3A', xBg: '#E8F08A', xColor: '#7A9010', text: '#061A3A' },
  }[tier];
  if (value === true) return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Check size={11} color={cfg.check} strokeWidth={2.5} />
      </div>
    </div>
  );
  if (value === false) return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: cfg.xBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <X size={10} color={cfg.xColor} strokeWidth={2} />
      </div>
    </div>
  );
  if (tier === 'top') return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#061A3A', background: '#D7FF43', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>{value}</span>
    </div>
  );
  return <p style={{ fontSize: '13px', fontWeight: 600, color: cfg.text, fontFamily: 'var(--font-body)', textAlign: 'center' }}>{value}</p>;
}

function TestiCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px 26px', border: '1px solid #ECEEF1', width: '340px', flexShrink: 0, boxShadow: '0 2px 12px rgba(6,26,58,0.05)' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D7FF43" color="#D7FF43" />)}
      </div>
      <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>&ldquo;{t.quote}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-phudu)' }}>{t.initials}</div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{t.name}</p>
          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('annual');
  const [companyBilling, setCompanyBilling] = useState<BillingCycle>('annual');
  const [agencyBilling, setAgencyBilling] = useState<BillingCycle>('annual');
  const [planTab, setPlanTab] = useState<PlanTab>('seekers');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  const seekerPrice = billing === 'monthly' ? 14 : billing === 'quarterly' ? 10 : 5;
  const seekerBilledLine =
    billing === 'quarterly' ? 'Billed $29 every 3 months' :
    billing === 'annual' ? 'Billed $58 per year' : null;
  const seekerSaveLabel =
    billing === 'quarterly' ? 'Save 29%' :
    billing === 'annual' ? 'Save 64%' : null;

  const companyPrice = companyBilling === 'monthly' ? 129 : companyBilling === 'quarterly' ? 109 : 99;
  const companyBilledLine =
    companyBilling === 'quarterly' ? 'Billed $327 every 3 months' :
    companyBilling === 'annual' ? 'Billed $1,188 per year' : null;
  const companySaveLabel =
    companyBilling === 'quarterly' ? 'Save 16%' :
    companyBilling === 'annual' ? 'Save 23%' : null;

  const agencyPrice = agencyBilling === 'monthly' ? 249 : agencyBilling === 'quarterly' ? 209 : 199;
  const agencyBilledLine =
    agencyBilling === 'quarterly' ? 'Billed $627 every 3 months' :
    agencyBilling === 'annual' ? 'Billed $2,388 per year' : null;
  const agencySaveLabel =
    agencyBilling === 'quarterly' ? 'Save 16%' :
    agencyBilling === 'annual' ? 'Save 20%' : null;

  const AUDIENCE = [
    { key: 'seekers' as PlanTab, Icon: Briefcase, label: 'For individuals', desc: 'Build and share your video profile' },
    { key: 'companies' as PlanTab, Icon: Building2, label: 'For businesses', desc: 'Hire smarter with video-first candidates' },
  ];

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes p-testi { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .p-testi-track { display: flex; animation: p-testi 26s linear infinite; }
        .p-testi-track:hover { animation-play-state: paused; }
        .pricing-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .pr-cta { transition: transform 0.15s ease, filter 0.15s ease; }
        .pr-cta:hover { transform: translateY(-1px); filter: brightness(0.94); }
        .pr-cta:active { transform: translateY(0) scale(0.97); }
        .pr-cta-outline { transition: border-color 0.15s ease, background 0.15s ease, transform 0.1s ease; }
        .pr-cta-outline:hover { border-color: #061A3A !important; }
        .pr-cta-outline:active { transform: scale(0.97); }
        .pricing-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .audience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .feat-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 16px; border: 1px solid #E8EAF0; }
        .feat-table-wrap::-webkit-scrollbar { height: 4px; }
        .feat-table-wrap::-webkit-scrollbar-thumb { background: #CBD0DA; border-radius: 2px; }
        .feat-table-inner { min-width: 520px; }
        @media (max-width: 860px) {
          .pricing-grid-3 { grid-template-columns: 1fr !important; }
          .pricing-grid-2 { grid-template-columns: 1fr !important; }
          .featured-scale { transform: none !important; }
        }
        @media (max-width: 560px) {
          .audience-grid { gap: 6px !important; }
          .audience-card { flex-direction: column !important; align-items: center !important; padding: 14px 8px !important; border-radius: 12px 12px 0 0 !important; gap: 6px !important; text-align: center !important; }
          .audience-card-icon { width: 32px !important; height: 32px !important; border-radius: 8px !important; }
          .audience-card-label { font-size: 11px !important; line-height: 1.25 !important; word-break: normal !important; overflow-wrap: break-word !important; }
          .audience-card-desc { display: none !important; }
          .billing-seg { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; width: 100% !important; }
          .billing-seg button { padding: 10px 4px !important; font-size: 11px !important; justify-content: center !important; flex-direction: column !important; gap: 3px !important; min-height: 54px !important; }
          .billing-badge { display: inline-block !important; font-size: 9px !important; padding: 2px 5px !important; }
        }
        @media (max-width: 480px) {
          .pricing-cta-btns { flex-direction: column !important; }
          .pricing-cta-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
        }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF1FF 100%)', padding: 'clamp(48px, 6vw, 76px) 24px clamp(44px, 5vw, 60px)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', top: '-150px', right: '-90px', width: '540px', height: '440px', background: 'radial-gradient(ellipse at center, rgba(214,61,157,0.09), transparent 66%)', pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', top: '-110px', left: '-70px', width: '520px', height: '420px', background: 'radial-gradient(ellipse at center, rgba(20,104,232,0.08), transparent 66%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '18px', fontFamily: 'var(--font-body)' }}>Simple pricing</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 8vw, 92px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.94, letterSpacing: '-0.03em', marginBottom: '40px' }}>
                Start for free,{' '}<br className="br-desktop" />
                Upgrade for <span style={{ background: 'linear-gradient(#D7FF43, #D7FF43) no-repeat', backgroundSize: '100% 0.34em', backgroundPosition: '0 calc(100% - 0.1em)', padding: '0 0.05em', WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>unlimited</span>
              </h1>
            </motion.div>

            {/* ─── Audience selector — segmented pill ─── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
              <div style={{ display: 'inline-flex', background: '#fff', border: '1px solid #E4E7EC', borderRadius: '100px', padding: '5px', gap: '4px', boxShadow: '0 2px 12px rgba(6,26,58,0.06)', maxWidth: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                {AUDIENCE.map(({ key, label }) => {
                  const active = planTab === key;
                  return (
                    <button key={key} onClick={() => setPlanTab(key)} style={{
                      padding: '10px 24px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                      fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.15s', whiteSpace: 'nowrap',
                      background: active ? '#1468E8' : 'transparent', color: active ? '#fff' : '#5C6070',
                    }}>{label}</button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Plans section ─── */}
        <section style={{ background: '#fff', padding: 'clamp(20px, 3vw, 36px) 24px clamp(80px, 10vw, 120px)' }}>
          <div style={{ maxWidth: '1020px', margin: '0 auto' }}>

            <AnimatePresence mode="wait">

              {/* ─── Job Seeker plans ─── */}
              {planTab === 'seekers' && (
                <motion.div key="seekers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>

                  {/* Billing cycle */}
                  <div style={{ padding: '8px 0 24px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em' }}>For individuals</p>
                    <p style={{ fontSize: '15px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '6px', marginBottom: '24px' }}>Free to start. Upgrade when you want full analytics and unlimited reach.</p>
                    <div className="billing-seg" style={{ display: 'inline-flex', background: '#F0F2F5', borderRadius: '100px', border: '1px solid #ECEEF1', padding: '4px', gap: '3px' }}>
                      {([
                        { key: 'monthly' as BillingCycle, label: 'Monthly' },
                        { key: 'quarterly' as BillingCycle, label: 'Quarterly', badge: 'Save 29%' },
                        { key: 'annual' as BillingCycle, label: 'Annual', badge: 'Save 64%' },
                      ]).map(({ key, label, badge }) => (
                        <button key={key} onClick={() => setBilling(key)}
                          style={{ padding: '10px 22px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.15s', background: billing === key ? '#061A3A' : 'transparent', color: billing === key ? '#fff' : '#5C6070', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: billing === key ? '0 2px 8px rgba(6,26,58,0.18)' : 'none' }}>
                          {label}
                          {badge && (
                            <span className="billing-badge" style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', background: billing === key ? '#D7FF43' : '#E0E3EA', color: billing === key ? '#061A3A' : '#9A9FA8', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>{badge}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pricing-grid-2">

                    {/* Free */}
                    <div style={{ background: '#F6F7F9', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Free</p>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 5.5vw, 56px)', fontWeight: 900, color: '#061A3A', lineHeight: 1, letterSpacing: '-0.03em' }}>$0</span>
                        <span style={{ fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>/month</span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px' }}>Everything you need to get started. No credit card.</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                        {SEEKER_FREE.map(f => <CheckItem key={f} label={f} />)}
                      </ul>
                      <Link href="/get-started" className="pr-cta-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#061A3A', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E6EC' }}>
                        Get started free
                      </Link>
                    </div>

                    {/* Premium */}
                    <div style={{ background: '#061A3A', borderRadius: '20px', border: '2px solid #D7FF43', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(6,26,58,0.18)', boxSizing: 'border-box' }}>
                      <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(214,61,157,0.24), transparent 62%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '10px', fontWeight: 700, color: '#061A3A', background: '#D7FF43', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Most popular</div>
                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Premium</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                          <AnimatePresence mode="wait">
                            <motion.span key={seekerPrice} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }}
                              style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 5.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', display: 'block' }}>
                              ${seekerPrice}
                            </motion.span>
                          </AnimatePresence>
                          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>/month</span>
                        </div>
                        {seekerBilledLine && (
                          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>
                            {seekerBilledLine}{seekerSaveLabel && <span style={{ color: '#D7FF43', fontWeight: 700 }}> · {seekerSaveLabel}</span>}
                          </p>
                        )}
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px', marginTop: '6px' }}>Unlimited everything. Know exactly who&apos;s watching.</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                          {SEEKER_PREMIUM.flatMap((group, gi) => [
                            ...(group.header ? [
                              <li key={`h${gi}`} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '6px' }}>{group.header}</li>,
                            ] : []),
                            ...group.items.map(f => <CheckItem key={f} label={f} dark />),
                          ])}
                        </ul>
                        <Link href="/signup?plan=premium" className="pr-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D7FF43', color: '#061A3A', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                          Get Reslink Premium
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Trust row — no emojis */}
                  <div style={{ marginTop: '20px', background: '#F6F7F9', borderRadius: '12px', border: '1px solid #ECEEF1', padding: '16px 24px', display: 'flex', gap: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {([
                      { Icon: RefreshCw, text: 'Cancel anytime' },
                      { Icon: Lock, text: 'Secure checkout' },
                      { Icon: Globe, text: 'Works with every ATS globally' },
                      { Icon: ShieldCheck, text: 'Free plan always available' },
                    ] as { Icon: React.ElementType; text: string }[]).map(({ Icon, text }) => (
                      <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <Icon size={13} color="#9A9FA8" strokeWidth={1.8} />
                        <span style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Students & veterans discount */}
                  <div style={{ marginTop: '16px', background: '#FBEAF5', borderRadius: '16px', border: '1px solid #F3D9E6', padding: 'clamp(20px, 3vw, 28px) clamp(24px, 3.5vw, 36px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 360px', minWidth: 0 }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 900, color: '#9E2462', letterSpacing: '-0.03em', lineHeight: 1, flexShrink: 0 }}>50%</span>
                      <div>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.3 }}>off for students and veterans</p>
                        <p style={{ fontSize: '13.5px', color: '#8A6577', fontFamily: 'var(--font-body)', marginTop: '3px' }}>Verify with your student or service email after signup. No code needed.</p>
                      </div>
                    </div>
                    <Link href="/eligibility" style={{ fontSize: '14px', fontWeight: 700, color: '#9E2462', fontFamily: 'var(--font-body)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                      See if you qualify
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* ─── Company plans ─── */}
              {planTab === 'companies' && (
                <motion.div key="companies" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>

                  <div style={{ padding: '8px 0 24px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em' }}>For businesses</p>
                    <p style={{ fontSize: '15px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '6px' }}>Free to sign up. Pay when you need more postings and seats.</p>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <div className="billing-seg" style={{ display: 'inline-flex', background: '#F0F2F5', borderRadius: '100px', border: '1px solid #ECEEF1', padding: '4px', gap: '3px' }}>
                        {([
                          { key: 'monthly' as BillingCycle, label: 'Monthly' },
                          { key: 'quarterly' as BillingCycle, label: 'Quarterly', badge: 'Save 16%' },
                          { key: 'annual' as BillingCycle, label: 'Annual', badge: 'Save 23%' },
                        ]).map(({ key, label, badge }) => (
                          <button key={key} onClick={() => setCompanyBilling(key)}
                            style={{ padding: '10px 22px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.15s', background: companyBilling === key ? '#061A3A' : 'transparent', color: companyBilling === key ? '#fff' : '#5C6070', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: companyBilling === key ? '0 2px 8px rgba(6,26,58,0.18)' : 'none' }}>
                            {label}
                            {badge && <span className="billing-badge" style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', background: companyBilling === key ? '#D7FF43' : '#E0E3EA', color: companyBilling === key ? '#061A3A' : '#9A9FA8' }}>{badge}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pricing-grid-3">

                    {/* Free */}
                    <div style={{ background: '#F6F7F9', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Free</p>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#061A3A', lineHeight: 1, letterSpacing: '-0.03em' }}>$0</span>
                        <span style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '7px' }}>/month</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>No credit card required</p>
                      <div style={{ borderTop: '1px solid #ECEEF1', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {['1 job post', 'Branded job board', 'Access to resource center', 'Email support'].map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={12} color="#9A9FA8" strokeWidth={2.5} />
                            <span style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/signup?plan=company-free" className="pr-cta-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#061A3A', fontWeight: 700, fontSize: '14px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E6EC' }}>
                        Sign up free
                      </Link>
                    </div>

                    {/* Growth — featured */}
                    <div style={{ background: '#061A3A', borderRadius: '20px', border: '2px solid #D7FF43', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(6,26,58,0.18)', transform: 'scale(1.025)', transformOrigin: 'center' }} className="featured-scale">
                      <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(214,61,157,0.26), transparent 62%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 700, color: '#061A3A', background: '#D7FF43', padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Most popular</div>
                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Growth</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                          <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>${companyPrice}</span>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '7px' }}>/month</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
                          {companyBilledLine ? <>{companyBilledLine} · <span style={{ color: '#D7FF43', fontWeight: 700 }}>{companySaveLabel}</span></> : 'Billed monthly'}
                        </p>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                          {['10 job postings', '100 Reslink credits/month', 'Branded job board', 'Ability to add notes on candidates', 'Full access to candidate profiles', 'Access to resource center', 'Priority email support'].map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#C2E532', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Check size={10} color="#061A3A" strokeWidth={3} />
                              </div>
                              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <Link href="/signup?plan=company-growth" className="pr-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D7FF43', color: '#061A3A', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                          Get started
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      </div>
                    </div>

                    {/* Enterprise */}
                    <div style={{ background: '#F6F7F9', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Enterprise</p>
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 3.5vw, 42px)', fontWeight: 900, color: '#061A3A', lineHeight: 1, letterSpacing: '-0.03em' }}>Custom</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Tailored to your hiring volume</p>
                      <div style={{ borderTop: '1px solid #ECEEF1', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {['Everything in Growth', 'Custom credit packages available', 'Unlimited job postings', 'Dedicated account manager'].map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={12} color={f === 'Everything in Growth' ? '#1468E8' : '#9A9FA8'} strokeWidth={2.5} />
                            <span style={{ fontSize: '13px', color: f === 'Everything in Growth' ? '#1468E8' : '#5C6070', fontFamily: 'var(--font-body)', fontWeight: f === 'Everything in Growth' ? 700 : 400 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/contact/sales" className="pr-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#061A3A', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                        Request a demo
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─── Agency plans ─── */}
              {planTab === 'agencies' && (
                <motion.div key="agencies" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>

                  <div style={{ padding: '8px 0 24px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em' }}>For Recruitment Agencies</p>
                    <p style={{ fontSize: '15px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '6px' }}>Priced by candidate volume and recruiter seats. Scales with your team.</p>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <div className="billing-seg" style={{ display: 'inline-flex', background: '#F0F2F5', borderRadius: '100px', border: '1px solid #ECEEF1', padding: '4px', gap: '3px' }}>
                        {([
                          { key: 'monthly' as BillingCycle, label: 'Monthly' },
                          { key: 'quarterly' as BillingCycle, label: 'Quarterly', badge: 'Save 16%' },
                          { key: 'annual' as BillingCycle, label: 'Annual', badge: 'Save 20%' },
                        ]).map(({ key, label, badge }) => (
                          <button key={key} onClick={() => setAgencyBilling(key)}
                            style={{ padding: '10px 22px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.15s', background: agencyBilling === key ? '#061A3A' : 'transparent', color: agencyBilling === key ? '#fff' : '#5C6070', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: agencyBilling === key ? '0 2px 8px rgba(6,26,58,0.18)' : 'none' }}>
                            {label}
                            {badge && <span className="billing-badge" style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', background: agencyBilling === key ? '#D7FF43' : '#E0E3EA', color: agencyBilling === key ? '#061A3A' : '#9A9FA8' }}>{badge}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pricing-grid-3">

                    {/* Starter */}
                    <div style={{ background: '#F6F7F9', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Starter</p>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#061A3A', lineHeight: 1, letterSpacing: '-0.03em' }}>$99</span>
                        <span style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '7px' }}>/month</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Billed annually ($79/mo)</p>
                      <div style={{ borderTop: '1px solid #ECEEF1', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {['Up to 25 active profiles', '3 recruiter seats', 'Client-facing share links', 'Watch-time analytics', 'Pipeline management', 'Branded landing page'].map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={12} color="#9A9FA8" strokeWidth={2.5} />
                            <span style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/signup?plan=agency-starter" className="pr-cta-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#061A3A', fontWeight: 700, fontSize: '14px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E6EC' }}>
                        Start free trial
                      </Link>
                    </div>

                    {/* Growth — featured */}
                    <div style={{ background: '#061A3A', borderRadius: '20px', border: '2px solid #D7FF43', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(6,26,58,0.18)', transform: 'scale(1.025)', transformOrigin: 'center' }} className="featured-scale">
                      <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(214,61,157,0.26), transparent 62%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 700, color: '#061A3A', background: '#D7FF43', padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Most popular</div>
                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Growth</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                          <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>${agencyPrice}</span>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '7px' }}>/month</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
                          {agencyBilledLine ? <>{agencyBilledLine} · <span style={{ color: '#D7FF43', fontWeight: 700 }}>{agencySaveLabel}</span></> : 'Billed monthly'}
                        </p>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                          {['Up to 100 active profiles', '10 recruiter seats', 'Client-facing share links', 'Watch-time analytics', 'Pipeline management', 'Branded landing page', 'Client shortlist branding', 'Priority support'].map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#C2E532', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Check size={10} color="#061A3A" strokeWidth={3} />
                              </div>
                              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <Link href="/signup?plan=agency-growth" className="pr-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D7FF43', color: '#061A3A', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                          Get started
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      </div>
                    </div>

                    {/* Scale */}
                    <div style={{ background: '#F6F7F9', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Scale</p>
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 3.5vw, 42px)', fontWeight: 900, color: '#061A3A', lineHeight: 1, letterSpacing: '-0.03em' }}>Custom</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Priced by candidate volume</p>
                      <div style={{ borderTop: '1px solid #ECEEF1', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {['Everything in Growth', 'Unlimited candidate profiles', 'Unlimited recruiter seats', 'White-label profile pages', 'API access for ATS integrations', 'Dedicated success manager', 'SLA-backed priority support'].map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={12} color={f === 'Everything in Growth' ? '#1468E8' : '#9A9FA8'} strokeWidth={2.5} />
                            <span style={{ fontSize: '13px', color: f === 'Everything in Growth' ? '#1468E8' : '#5C6070', fontFamily: 'var(--font-body)', fontWeight: f === 'Everything in Growth' ? 700 : 400 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/contact/sales" className="pr-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#061A3A', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                        Talk to sales
                      </Link>
                    </div>
                  </div>

                  {/* Feature comparison table */}
                  <div style={{ marginTop: '40px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', textAlign: 'center' }}>Full feature comparison</p>
                    <div className="feat-table-wrap"><div className="feat-table-inner" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: '#F6F7F9', padding: '12px 24px', borderBottom: '1px solid #E8EAF0' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Feature</p>
                        {['Starter', 'Growth', 'Scale'].map(h => (
                          <p key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>{h}</p>
                        ))}
                      </div>
                      {AGENCY_ROWS.map((row, i) => (
                        <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: i < AGENCY_ROWS.length - 1 ? '1px solid #F0F2F5' : 'none', background: i % 2 === 0 ? '#fff' : '#FAFBFC', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', color: '#3A3F4C', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{row.label}</span>
                          <FeatureCell value={row.starter} tier="base" />
                          <FeatureCell value={row.growth} tier="mid" />
                          <FeatureCell value={row.scale} tier="top" />
                        </div>
                      ))}
                    </div></div>
                  </div>

                  <div style={{ marginTop: '16px', background: '#EEF4FF', borderRadius: '10px', border: '1px solid #C7DEFF', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Zap size={14} color="#1468E8" strokeWidth={2} />
                      <p style={{ fontSize: '13px', color: '#1D4ED8', fontFamily: 'var(--font-body)' }}>
                        <strong>Not sure which plan fits?</strong> We will walk you through the right fit for your team size and placement volume.
                      </p>
                    </div>
                    <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#1468E8', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Schedule a demo →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
                Before you pick a plan
              </h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
              {FAQS.map((faq, i) => (
                <Fragment key={i}>
                {faq.group === 'business' && FAQS[i - 1]?.group !== 'business' && (
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', padding: '28px 0 6px', borderTop: '1px solid #ECEEF1' }}>For businesses</p>
                )}
                <div style={{ borderBottom: i < FAQS.length - 1 ? '1px solid #ECEEF1' : 'none' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: openFaq === i ? '#1468E8' : '#EAF1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
                      {openFaq === i ? <Minus size={12} color="#fff" strokeWidth={2.5} /> : <Plus size={12} color="#1468E8" strokeWidth={2.5} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                        <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, paddingBottom: '20px', fontFamily: 'var(--font-body)' }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
