'use client';

import { useState } from 'react';
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
const SEEKER_PREMIUM = [
  'Unlimited Reslinks',
  'Upload your own video pitch',
  'Full Pitch AI access (unlimited)',
  'Application insights: see who viewed you',
  'Watch-time analytics per recruiter',
  'In-app recording + teleprompter',
  'Resource center access',
  'Priority email support',
];

/* ─── Company features by tier ─── */
type Maybe = true | false | string;
const COMPANY_ROWS: { label: string; trial: Maybe; growth: Maybe; enterprise: Maybe }[] = [
  { label: 'Open job postings',              trial: 'Up to 5',  growth: 'Up to 25',  enterprise: 'Unlimited' },
  { label: 'Team seats',                     trial: '2 seats',  growth: '10 seats',  enterprise: 'Unlimited' },
  { label: 'Browse candidate Reslinks',      trial: true,       growth: true,        enterprise: true },
  { label: 'Watch-time analytics',           trial: true,       growth: true,        enterprise: true },
  { label: 'Shortlist & tag candidates',     trial: true,       growth: true,        enterprise: true },
  { label: 'ATS-friendly candidate exports', trial: false,      growth: true,        enterprise: true },
  { label: 'Custom branded company page',    trial: false,      growth: true,        enterprise: true },
  { label: 'Priority candidate matching',    trial: false,      growth: false,       enterprise: true },
  { label: 'SSO & advanced permissions',     trial: false,      growth: false,       enterprise: true },
  { label: 'Dedicated account manager',      trial: false,      growth: false,       enterprise: true },
  { label: 'SLA-backed support',             trial: false,      growth: false,       enterprise: true },
  { label: 'API access',                     trial: false,      growth: false,       enterprise: true },
];

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
  { quote: "After adding my Reslink to every application, I started getting callbacks within 48 hours. Complete game changer.", name: 'Ben Harper', role: 'Software Engineer · Amazon', initials: 'BH', color: '#4F6EF7' },
  { quote: "I landed my dream job and I genuinely believe the video resume made all the difference. Reslink let me show who I really am.", name: 'Sofia Rodriguez', role: 'Marketing Manager · Meta', initials: 'SR', color: '#A855F7' },
  { quote: "The analytics feature is unreal. I saw a senior partner watch my video three times. I reached out and got an interview the next morning.", name: 'Marcus Williams', role: 'Finance Analyst · EY', initials: 'MW', color: '#F59E0B' },
  { quote: "My recruiter said she had never seen a video resume done that well. She shared it with the entire hiring team before my first interview.", name: 'Elena Kowalski', role: 'Product Manager · Revolut', initials: 'EK', color: '#10B981' },
  { quote: "As a designer I care about how I present myself. Reslink resonated perfectly with the creative teams I was targeting. Two offers in two weeks.", name: 'Priya Patel', role: 'UX Designer · Google', initials: 'PP', color: '#EF4444' },
  { quote: "Honestly thought video resumes were gimmicky. Then I got a reply from Stripe within 24 hours of sending my Reslink. I was wrong.", name: 'Aisha Mensah', role: 'Data Scientist · Stripe', initials: 'AM', color: '#635BFF' },
];

const FAQS = [
  { q: 'Is Reslink really free?', a: 'Yes. You can create up to 2 Reslinks, record your pitch, and start sharing. Completely free. No credit card required.' },
  { q: 'What does Premium unlock?', a: 'Premium gives you unlimited Reslinks, full analytics (see every recruiter who viewed you and how long they watched), and unrestricted Pitch AI access to help you script and refine your pitch.' },
  { q: 'What is the quarterly plan?', a: "The quarterly plan is $29 billed every 3 months, that's $10/month, a 29% saving over monthly. Most job searches wrap up within a quarter, making it the most practical option for active candidates." },
  { q: 'Is the annual plan worth it?', a: 'At $58/year vs $14/month billed monthly, the annual plan saves you over 64%. If you want unlimited access for the long haul it is the best value.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. Cancel any time from your account settings. Your Premium access stays active until the end of the billing period, no matter which cycle you chose.' },
  { q: 'What happens to my Reslinks if I downgrade?', a: "Your Reslinks stay live. If you have more than 2, they remain accessible via direct link but you'll need Premium to create new ones." },
  { q: 'How do companies get started?', a: "Start a 14-day free trial directly from this page. No credit card needed. For Enterprise plans, click 'Request a demo' and we'll get back to you within one business day." },
  { q: 'How does agency pricing work?', a: 'Agency plans are based on active candidate profiles and recruiter seats. You can start on the Starter plan and upgrade as your team grows. Scale plans are priced based on volume. Reach out for a custom quote.' },
  { q: 'Do you offer a free trial for companies and agencies?', a: 'Companies get a 14-day free trial on the Growth plan with no credit card required. Agency trials are available on request.' },
];

type PlanTab = 'seekers' | 'companies' | 'agencies';
type BillingCycle = 'monthly' | 'quarterly' | 'annual';

function CheckItem({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(216,249,80,0.15)' : '#ECEEF1', border: dark ? '1px solid rgba(216,249,80,0.3)' : 'none' }}>
        <Check size={10} color={dark ? '#D8F950' : '#5C6070'} strokeWidth={2.5} />
      </div>
      <span style={{ fontSize: '14px', color: dark ? 'rgba(255,255,255,0.7)' : '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.45 }}>{label}</span>
    </li>
  );
}

function FeatureCell({ value, tier = 'base' }: { value: Maybe; tier?: 'base' | 'mid' | 'top' }) {
  const cfg = {
    base: { bg: '#ECEEF1', check: '#6B7280', xBg: '#ECEEF1', xColor: '#9A9FA8', text: '#5C6070' },
    mid:  { bg: '#EEF4FF', check: '#0C63E3', xBg: '#DDE8FF', xColor: '#7AAAE8', text: '#0C63E3' },
    top:  { bg: '#D8F950', check: '#041635', xBg: '#E8F08A', xColor: '#7A9010', text: '#041635' },
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
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>{value}</span>
    </div>
  );
  return <p style={{ fontSize: '13px', fontWeight: 600, color: cfg.text, fontFamily: 'var(--font-body)', textAlign: 'center' }}>{value}</p>;
}

function TestiCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px 26px', border: '1px solid #ECEEF1', width: '340px', flexShrink: 0, boxShadow: '0 2px 12px rgba(4,22,53,0.05)' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D8F950" color="#D8F950" />)}
      </div>
      <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>&ldquo;{t.quote}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-phudu)' }}>{t.initials}</div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{t.name}</p>
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
    { key: 'seekers' as PlanTab, Icon: Briefcase, label: 'Job Seekers', desc: 'Build and share your video profile' },
    { key: 'companies' as PlanTab, Icon: Building2, label: 'Companies', desc: 'Hire smarter with video-first candidates' },
    { key: 'agencies' as PlanTab, Icon: Users, label: 'Recruitment Agencies', desc: 'Win more placements, faster' },
  ];

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes p-testi { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .p-testi-track { display: flex; animation: p-testi 26s linear infinite; }
        .p-testi-track:hover { animation-play-state: paused; }
        .pricing-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
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
          .audience-card { flex-direction: column !important; align-items: center !important; padding: 10px 6px !important; border-radius: 12px !important; gap: 6px !important; text-align: center !important; }
          .audience-card-icon { width: 28px !important; height: 28px !important; border-radius: 8px !important; }
          .audience-card-label { font-size: 11px !important; line-height: 1.25 !important; word-break: normal !important; overflow-wrap: break-word !important; }
          .audience-card-desc { display: none !important; }
          .billing-seg { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; width: 100% !important; }
          .billing-seg button { padding: 9px 6px !important; font-size: 12px !important; justify-content: center !important; }
          .billing-badge { display: none !important; }
        }
        @media (max-width: 480px) {
          .pricing-cta-btns { flex-direction: column !important; }
          .pricing-cta-btns a { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
        }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(216,249,80,0.12)', border: '1px solid rgba(216,249,80,0.25)', borderRadius: '100px', padding: '5px 14px', marginBottom: '24px' }}>
                <Zap size={11} color="#D8F950" fill="#D8F950" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Simple pricing</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 7vw, 82px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '22px' }}>
                Start free.<br /><span style={{ color: '#D8F950' }}>Upgrade when ready.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '48px' }}>
                Job seekers get a powerful free plan. Companies and agencies get tools built to close faster and hire smarter.
              </p>
            </motion.div>

            {/* ─── Audience selector cards (in hero, overlapping into white) ─── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}>
              <div className="audience-grid" style={{ marginBottom: '-1px', position: 'relative', zIndex: 2 }}>
                {AUDIENCE.map(({ key, Icon, label, desc }) => {
                  const active = planTab === key;
                  return (
                    <button key={key} onClick={() => setPlanTab(key)} className="audience-card" style={{
                      background: active ? '#fff' : 'rgba(255,255,255,0.05)',
                      border: active ? '2px solid #fff' : '1.5px solid rgba(255,255,255,0.1)',
                      borderBottom: active ? '2px solid #fff' : '1.5px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px 16px 0 0',
                      padding: '20px 20px 24px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      position: 'relative',
                    }}>
                      {active && <div style={{ position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '4px', background: '#fff' }} />}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="audience-card-icon" style={{ width: '36px', height: '36px', borderRadius: '10px', background: active ? '#EEF4FF' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={17} color={active ? '#0C63E3' : 'rgba(255,255,255,0.5)'} strokeWidth={1.8} />
                        </div>
                        <span className="audience-card-label" style={{ fontFamily: 'var(--font-phudu)', fontSize: '17px', fontWeight: 900, color: active ? '#041635' : '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{label}</span>
                      </div>
                      <p className="audience-card-desc" style={{ fontSize: '12px', color: active ? '#5C6070' : 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{desc}</p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Plans section ─── */}
        <section style={{ background: '#fff', padding: '0 24px clamp(80px, 10vw, 120px)' }}>
          <div style={{ maxWidth: '1020px', margin: '0 auto' }}>

            <AnimatePresence mode="wait">

              {/* ─── Job Seeker plans ─── */}
              {planTab === 'seekers' && (
                <motion.div key="seekers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>

                  {/* Billing cycle */}
                  <div style={{ padding: '32px 0 28px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em' }}>For Job Seekers</p>
                    <p style={{ fontSize: '15px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '6px', marginBottom: '24px' }}>Free to start. Upgrade when you want full analytics and unlimited reach.</p>
                    <div className="billing-seg" style={{ display: 'inline-flex', background: '#F0F2F5', borderRadius: '14px', border: '1px solid #ECEEF1', padding: '4px', gap: '3px' }}>
                      {([
                        { key: 'monthly' as BillingCycle, label: 'Monthly' },
                        { key: 'quarterly' as BillingCycle, label: 'Quarterly', badge: 'Save 29%' },
                        { key: 'annual' as BillingCycle, label: 'Annual', badge: 'Save 64%' },
                      ]).map(({ key, label, badge }) => (
                        <button key={key} onClick={() => setBilling(key)}
                          style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.15s', background: billing === key ? '#041635' : 'transparent', color: billing === key ? '#fff' : '#5C6070', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: billing === key ? '0 2px 8px rgba(4,22,53,0.18)' : 'none' }}>
                          {label}
                          {badge && (
                            <span className="billing-badge" style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', background: billing === key ? '#D8F950' : '#E0E3EA', color: billing === key ? '#041635' : '#9A9FA8', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>{badge}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pricing-grid-2">

                    {/* Free */}
                    <div style={{ background: '#F7F8FA', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Free</p>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 5.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>$0</span>
                        <span style={{ fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>/month</span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px' }}>Everything you need to get started. No credit card.</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                        {SEEKER_FREE.map(f => <CheckItem key={f} label={f} />)}
                      </ul>
                      <Link href="/get-started" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#041635', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E6EC' }}>
                        Get started free
                      </Link>
                    </div>

                    {/* Premium */}
                    <div style={{ background: '#041635', borderRadius: '20px', border: '2px solid #D8F950', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(4,22,53,0.18)' }}>
                      <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Most popular</div>
                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Premium</p>
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
                            {seekerBilledLine}{seekerSaveLabel && <span style={{ color: '#D8F950', fontWeight: 700 }}> · {seekerSaveLabel}</span>}
                          </p>
                        )}
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px', marginTop: '6px' }}>Unlimited everything. Know exactly who&apos;s watching.</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                          {SEEKER_PREMIUM.map(f => <CheckItem key={f} label={f} dark />)}
                        </ul>
                        <Link href="/signup?plan=premium" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D8F950', color: '#041635', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                          Get Reslink Premium
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Trust row — no emojis */}
                  <div style={{ marginTop: '20px', background: '#F7F8FA', borderRadius: '12px', border: '1px solid #ECEEF1', padding: '16px 24px', display: 'flex', gap: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                </motion.div>
              )}

              {/* ─── Company plans ─── */}
              {planTab === 'companies' && (
                <motion.div key="companies" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>

                  <div style={{ padding: '32px 0 28px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em' }}>For Companies</p>
                    <p style={{ fontSize: '15px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '6px' }}>Start with a 14-day free trial. No credit card required.</p>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <div className="billing-seg" style={{ display: 'inline-flex', background: '#F0F2F5', borderRadius: '14px', border: '1px solid #ECEEF1', padding: '4px', gap: '3px' }}>
                        {([
                          { key: 'monthly' as BillingCycle, label: 'Monthly' },
                          { key: 'quarterly' as BillingCycle, label: 'Quarterly', badge: 'Save 16%' },
                          { key: 'annual' as BillingCycle, label: 'Annual', badge: 'Save 23%' },
                        ]).map(({ key, label, badge }) => (
                          <button key={key} onClick={() => setCompanyBilling(key)}
                            style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.15s', background: companyBilling === key ? '#041635' : 'transparent', color: companyBilling === key ? '#fff' : '#5C6070', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: companyBilling === key ? '0 2px 8px rgba(4,22,53,0.18)' : 'none' }}>
                            {label}
                            {badge && <span className="billing-badge" style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', background: companyBilling === key ? '#D8F950' : '#E0E3EA', color: companyBilling === key ? '#041635' : '#9A9FA8' }}>{badge}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pricing-grid-3">

                    {/* Free Trial */}
                    <div style={{ background: '#F7F8FA', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Free Trial</p>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>$0</span>
                        <span style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '7px' }}>/14 days</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>No credit card required</p>
                      <div style={{ borderTop: '1px solid #ECEEF1', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {['Up to 5 job postings', '2 team seats', 'Browse candidate Reslinks', 'Watch-time analytics', 'Shortlist candidates'].map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={12} color="#9A9FA8" strokeWidth={2.5} />
                            <span style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/signup?plan=company-trial" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#041635', fontWeight: 700, fontSize: '14px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E6EC' }}>
                        Start free trial
                      </Link>
                    </div>

                    {/* Growth — featured */}
                    <div style={{ background: '#041635', borderRadius: '20px', border: '2px solid #D8F950', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(4,22,53,0.18)', transform: 'scale(1.025)', transformOrigin: 'center' }} className="featured-scale">
                      <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Most popular</div>
                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Growth</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                          <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>${companyPrice}</span>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '7px' }}>/month</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
                          {companyBilledLine ? <>{companyBilledLine} · <span style={{ color: '#D8F950', fontWeight: 700 }}>{companySaveLabel}</span></> : 'Billed monthly'}
                        </p>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                          {['Up to 25 job postings', '10 team seats', 'Browse candidate Reslinks', 'Watch-time analytics', 'Shortlist & tag candidates', 'ATS-friendly exports', 'Custom branded company page', 'Priority email support'].map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: 'rgba(216,249,80,0.15)', border: '1px solid rgba(216,249,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Check size={8} color="#D8F950" strokeWidth={2.5} />
                              </div>
                              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <Link href="/signup?plan=company-growth" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D8F950', color: '#041635', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                          Get started
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      </div>
                    </div>

                    {/* Enterprise */}
                    <div style={{ background: '#F7F8FA', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Enterprise</p>
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 3.5vw, 42px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>Custom</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Tailored to your hiring volume</p>
                      <div style={{ borderTop: '1px solid #ECEEF1', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {['Everything in Growth', 'Unlimited job postings', 'Unlimited team seats', 'Priority candidate matching', 'SSO & advanced permissions', 'Dedicated account manager', 'SLA-backed support', 'API access'].map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={12} color={f === 'Everything in Growth' ? '#0C63E3' : '#9A9FA8'} strokeWidth={2.5} />
                            <span style={{ fontSize: '13px', color: f === 'Everything in Growth' ? '#0C63E3' : '#5C6070', fontFamily: 'var(--font-body)', fontWeight: f === 'Everything in Growth' ? 700 : 400 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/contact/sales" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#041635', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                        Request a demo
                      </Link>
                    </div>
                  </div>

                  {/* Feature comparison table */}
                  <div style={{ marginTop: '40px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', textAlign: 'center' }}>Full feature comparison</p>
                    <div className="feat-table-wrap"><div className="feat-table-inner" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: '#F7F8FA', padding: '12px 24px', borderBottom: '1px solid #E8EAF0' }}>
                        <p style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Feature</p>
                        {['Free Trial', 'Growth', 'Enterprise'].map(h => (
                          <p key={h} style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>{h}</p>
                        ))}
                      </div>
                      {COMPANY_ROWS.map((row, i) => (
                        <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 24px', borderBottom: i < COMPANY_ROWS.length - 1 ? '1px solid #F0F2F5' : 'none', background: i % 2 === 0 ? '#fff' : '#FAFBFC', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', color: '#3A3F4C', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{row.label}</span>
                          <FeatureCell value={row.trial} tier="base" />
                          <FeatureCell value={row.growth} tier="mid" />
                          <FeatureCell value={row.enterprise} tier="top" />
                        </div>
                      ))}
                    </div></div>
                  </div>

                  <div style={{ marginTop: '16px', background: '#EEF4FF', borderRadius: '10px', border: '1px solid #C7DEFF', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Zap size={14} color="#0C63E3" strokeWidth={2} />
                      <p style={{ fontSize: '13px', color: '#1D4ED8', fontFamily: 'var(--font-body)' }}>
                        <strong>14-day free trial on the Growth plan.</strong> No credit card required. Not sure which plan fits? We will walk you through it.
                      </p>
                    </div>
                    <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#0C63E3', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Schedule a demo →
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* ─── Agency plans ─── */}
              {planTab === 'agencies' && (
                <motion.div key="agencies" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>

                  <div style={{ padding: '32px 0 28px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em' }}>For Recruitment Agencies</p>
                    <p style={{ fontSize: '15px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '6px' }}>Priced by candidate volume and recruiter seats. Scales with your team.</p>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <div className="billing-seg" style={{ display: 'inline-flex', background: '#F0F2F5', borderRadius: '14px', border: '1px solid #ECEEF1', padding: '4px', gap: '3px' }}>
                        {([
                          { key: 'monthly' as BillingCycle, label: 'Monthly' },
                          { key: 'quarterly' as BillingCycle, label: 'Quarterly', badge: 'Save 16%' },
                          { key: 'annual' as BillingCycle, label: 'Annual', badge: 'Save 20%' },
                        ]).map(({ key, label, badge }) => (
                          <button key={key} onClick={() => setAgencyBilling(key)}
                            style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.15s', background: agencyBilling === key ? '#041635' : 'transparent', color: agencyBilling === key ? '#fff' : '#5C6070', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: agencyBilling === key ? '0 2px 8px rgba(4,22,53,0.18)' : 'none' }}>
                            {label}
                            {badge && <span className="billing-badge" style={{ fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', background: agencyBilling === key ? '#D8F950' : '#E0E3EA', color: agencyBilling === key ? '#041635' : '#9A9FA8' }}>{badge}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pricing-grid-3">

                    {/* Starter */}
                    <div style={{ background: '#F7F8FA', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Starter</p>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>$99</span>
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
                      <Link href="/signup?plan=agency-starter" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fff', color: '#041635', fontWeight: 700, fontSize: '14px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', border: '1.5px solid #E4E6EC' }}>
                        Start free trial
                      </Link>
                    </div>

                    {/* Growth — featured */}
                    <div style={{ background: '#041635', borderRadius: '20px', border: '2px solid #D8F950', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(4,22,53,0.18)', transform: 'scale(1.025)', transformOrigin: 'center' }} className="featured-scale">
                      <div style={{ position: 'absolute', top: '-30%', right: '-15%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 10px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Most popular</div>
                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Growth</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                          <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>${agencyPrice}</span>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '7px' }}>/month</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
                          {agencyBilledLine ? <>{agencyBilledLine} · <span style={{ color: '#D8F950', fontWeight: 700 }}>{agencySaveLabel}</span></> : 'Billed monthly'}
                        </p>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                          {['Up to 100 active profiles', '10 recruiter seats', 'Client-facing share links', 'Watch-time analytics', 'Pipeline management', 'Branded landing page', 'Client shortlist branding', 'Priority support'].map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: 'rgba(216,249,80,0.15)', border: '1px solid rgba(216,249,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Check size={8} color="#D8F950" strokeWidth={2.5} />
                              </div>
                              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <Link href="/signup?plan=agency-growth" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D8F950', color: '#041635', fontWeight: 700, fontSize: '14px', padding: '13px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                          Get started
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      </div>
                    </div>

                    {/* Scale */}
                    <div style={{ background: '#F7F8FA', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Scale</p>
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 3.5vw, 42px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>Custom</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Priced by candidate volume</p>
                      <div style={{ borderTop: '1px solid #ECEEF1', paddingTop: '18px', marginBottom: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {['Everything in Growth', 'Unlimited candidate profiles', 'Unlimited recruiter seats', 'White-label profile pages', 'API access for ATS integrations', 'Dedicated success manager', 'SLA-backed priority support'].map(f => (
                          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={12} color={f === 'Everything in Growth' ? '#0C63E3' : '#9A9FA8'} strokeWidth={2.5} />
                            <span style={{ fontSize: '13px', color: f === 'Everything in Growth' ? '#0C63E3' : '#5C6070', fontFamily: 'var(--font-body)', fontWeight: f === 'Everything in Growth' ? 700 : 400 }}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/contact/sales" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#041635', color: '#fff', fontWeight: 700, fontSize: '14px', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                        Talk to sales
                      </Link>
                    </div>
                  </div>

                  {/* Feature comparison table */}
                  <div style={{ marginTop: '40px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', textAlign: 'center' }}>Full feature comparison</p>
                    <div className="feat-table-wrap"><div className="feat-table-inner" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: '#F7F8FA', padding: '12px 24px', borderBottom: '1px solid #E8EAF0' }}>
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
                      <Zap size={14} color="#0C63E3" strokeWidth={2} />
                      <p style={{ fontSize: '13px', color: '#1D4ED8', fontFamily: 'var(--font-body)' }}>
                        <strong>Not sure which plan fits?</strong> We will walk you through the right fit for your team size and placement volume.
                      </p>
                    </div>
                    <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#0C63E3', color: '#fff', borderRadius: '8px', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      Schedule a demo →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 0', overflow: 'hidden' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}
            style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Success stories</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              Real results from<br />real candidates.
            </h2>
          </motion.div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, #F7F8FA, transparent)', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, #F7F8FA, transparent)', zIndex: 1, pointerEvents: 'none' }} />
            <div className="p-testi-track" style={{ gap: '16px', paddingLeft: '16px' }}>
              {doubled.map((t, i) => <TestiCard key={i} t={t} />)}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}
              style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
                Everything you need to know
              </h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid #ECEEF1' : 'none' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: openFaq === i ? '#0C63E3' : '#F7F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
                      {openFaq === i ? <Minus size={12} color="#fff" strokeWidth={2.5} /> : <Plus size={12} color="#5C6070" strokeWidth={2.5} />}
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
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Ready to<br /><span style={{ color: '#D8F950' }}>stand out?</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '36px' }}>
                Free to start. No credit card. Takes less than 5 minutes.
              </p>
              <div className="pricing-cta-btns" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
                  Create your Reslink
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
                <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 24px', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Talk to sales
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
