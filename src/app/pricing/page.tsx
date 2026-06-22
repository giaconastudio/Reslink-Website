'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ── Data ── */

const SEEKER_FREE = [
  'Create up to 2 Reslinks',
  'In-app video recording',
  'Teleprompter functionality',
  'Shareable profile link',
  'Access to the resource center',
  'Basic email support',
  'Limited Pitch AI access',
];
const SEEKER_PREMIUM = [
  'Unlimited Reslinks',
  'Upload your own custom video pitch',
  'Full Pitch AI access',
  'Application insights — see who viewed you',
  'Watch-time analytics per recruiter',
  'In-app video recording & teleprompter',
  'Access to the resource center',
  'Priority email support',
];

const COMPANY_STARTER = [
  'Post up to 10 open roles',
  'Browse & filter candidate Reslinks',
  'Watch-time analytics per candidate',
  'Shortlist and tag candidates',
  'ATS-friendly candidate exports',
  'Team collaboration (up to 5 seats)',
  'Email support',
];
const COMPANY_ENTERPRISE = [
  'Unlimited job postings',
  'Unlimited team seats',
  'Custom branded company page',
  'Priority candidate matching',
  'Dedicated account manager',
  'SSO & advanced permissions',
  'SLA-backed support',
];

const AGENCY_GROWTH = [
  'Up to 25 active candidate profiles',
  'Branded agency landing page',
  'Client-facing candidate share links',
  'Watch-time analytics',
  'Candidate pipeline management',
  'Up to 3 recruiter seats',
  'Email support',
];
const AGENCY_SCALE = [
  'Unlimited candidate profiles',
  'Unlimited recruiter seats',
  'White-label profile pages',
  'Priority candidate matching',
  'API access for ATS integrations',
  'Dedicated success manager',
  'SLA-backed priority support',
];

const TESTIMONIALS = [
  { quote: "After adding my Reslink to every application, I started getting callbacks within 48 hours. Complete game changer.", name: 'Ben Harper', role: 'Software Engineer · Amazon', initials: 'BH', color: '#4F6EF7' },
  { quote: "I landed my dream job and I genuinely believe the video resume made all the difference. Reslink let me show who I really am.", name: 'Sofia Rodriguez', role: 'Marketing Manager · Meta', initials: 'SR', color: '#A855F7' },
  { quote: "The analytics feature is unreal. I saw a senior partner watch my video three times — I reached out and got an interview the next morning.", name: 'Marcus Williams', role: 'Finance Analyst · EY', initials: 'MW', color: '#F59E0B' },
  { quote: "My recruiter said she had never seen a video resume done that well. She shared it with the entire hiring team before my first interview.", name: 'Elena Kowalski', role: 'Product Manager · Revolut', initials: 'EK', color: '#10B981' },
  { quote: "As a designer I care about how I present myself. Reslink resonated perfectly with the creative teams I was targeting. Two offers in two weeks.", name: 'Priya Patel', role: 'UX Designer · Google', initials: 'PP', color: '#EF4444' },
  { quote: "Honestly thought video resumes were gimmicky. Then I got a reply from Stripe within 24 hours of sending my Reslink. I was wrong.", name: 'Aisha Mensah', role: 'Data Scientist · Stripe', initials: 'AM', color: '#635BFF' },
];

const FAQS = [
  { q: 'Is Reslink really free?', a: 'Yes. You can create up to 2 Reslinks, record your pitch, and start sharing — completely free, no credit card required.' },
  { q: 'What does Premium unlock?', a: 'Premium gives you unlimited Reslinks, full analytics (see every recruiter who viewed you and how long they watched), and unrestricted Pitch AI access to help you script and refine your pitch.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. Cancel any time from your account settings. Your Premium access stays active until the end of the billing period.' },
  { q: 'Is the annual plan worth it?', a: 'At $58/year vs $14/month billed monthly, the annual plan saves you 67%. Most job searches wrap up in a few months — annual is the best value by far.' },
  { q: 'What happens to my Reslinks if I downgrade?', a: 'Your Reslinks stay live. If you have more than 2, they remain accessible via direct link but you\'ll need Premium to create new ones.' },
  { q: 'Do I need special equipment to record?', a: 'No. Your laptop or phone camera is all you need. Good lighting and a quiet room make the biggest difference.' },
  { q: 'How do companies or agencies get started?', a: 'Reach out via the contact form or click "Request a demo" — we\'ll walk you through setup and match you to the right plan for your team size.' },
];

const INCLUDED = [
  {
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
    color: '#0C63E3', bg: '#EEF4FF',
    title: 'In-app recording',
    desc: 'Record straight in the browser — no downloads or plugins needed.',
  },
  {
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    color: '#7C3AED', bg: '#F3EEFF',
    title: 'Teleprompter',
    desc: 'Scrolling on-screen script so you stay on camera, not looking at notes.',
  },
  {
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    color: '#0891B2', bg: '#ECFEFF',
    title: 'Shareable profile',
    desc: 'One link. Drop it in any application, email, or LinkedIn message.',
  },
  {
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>,
    color: '#D97706', bg: '#FFFBEB',
    title: 'Pitch AI',
    desc: 'AI-generated scripts tailored to your experience and the role you\'re applying for.',
  },
  {
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    color: '#059669', bg: '#ECFDF5',
    title: 'Resource center',
    desc: 'Guides, templates, and tips to help you craft a pitch that lands interviews.',
  },
  {
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    color: '#E11D48', bg: '#FFF1F2',
    title: 'Global reach',
    desc: 'Works with any company, any ATS, in any country, for any role.',
  },
];

type PlanTab = 'seekers' | 'companies' | 'agencies';

/* ── Components ── */

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

/* ── Page ── */

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [planTab, setPlanTab] = useState<PlanTab>('seekers');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const premiumMonthly = annual ? 5 : 14;
  const companyMonthly = annual ? 79 : 99;
  const agencyMonthly = annual ? 149 : 189;

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* ── Hero ── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px clamp(80px, 11vw, 130px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(216,249,80,0.12)', border: '1px solid rgba(216,249,80,0.25)', borderRadius: '100px', padding: '5px 14px', marginBottom: '24px' }}>
                <Zap size={11} color="#D8F950" fill="#D8F950" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Simple pricing</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 7vw, 82px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '22px' }}>
                Start free.<br /><span style={{ color: '#D8F950' }}>Upgrade when ready.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
                Every job seeker gets a powerful free plan. Unlock unlimited reach and full analytics when you're ready to go all in.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Plan selector + cards ── */}
        <section style={{ background: '#fff', padding: '0 24px clamp(80px, 10vw, 120px)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>

            {/* Who are you? tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }}
              style={{ display: 'flex', justifyContent: 'center', padding: '36px 0 0' }}>
              <div style={{ display: 'inline-flex', background: '#F7F8FA', borderRadius: '12px', border: '1px solid #ECEEF1', padding: '4px', gap: '2px' }}>
                {([
                  { key: 'seekers', label: 'For Job Seekers' },
                  { key: 'companies', label: 'For Companies' },
                  { key: 'agencies', label: 'For Recruiters' },
                ] as { key: PlanTab; label: string }[]).map(({ key, label }) => (
                  <button key={key} onClick={() => setPlanTab(key)}
                    style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', transition: 'all 0.18s', background: planTab === key ? '#041635' : 'transparent', color: planTab === key ? '#fff' : '#5C6070', whiteSpace: 'nowrap' }}>
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Billing toggle — only for job seekers */}
            <AnimatePresence>
              {planTab === 'seekers' && (
                <motion.div key="toggle" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '28px 0 44px', overflow: 'hidden' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: annual ? '#9A9FA8' : '#041635', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>Monthly</span>
                  <button onClick={() => setAnnual(a => !a)}
                    style={{ width: '48px', height: '26px', borderRadius: '100px', background: annual ? '#0C63E3' : '#D5D8DF', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                    <div style={{ position: 'absolute', top: '3px', left: annual ? '25px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </button>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: annual ? '#041635' : '#9A9FA8', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>Annual</span>
                    {annual && (
                      <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ fontSize: '12px', fontWeight: 700, color: '#041635', background: '#D8F950', borderRadius: '100px', padding: '3px 10px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                        Save 67%
                      </motion.span>
                    )}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Padding for non-seeker tabs */}
            {planTab !== 'seekers' && <div style={{ height: '44px' }} />}

            {/* ── Job Seeker cards ── */}
            <AnimatePresence mode="wait">
              {planTab === 'seekers' && (
                <motion.div key="seekers" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="pricing-grid">

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
                    <Link href="/get-started" className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center', fontSize: '15px' }}>
                      Get started free
                    </Link>
                  </div>

                  {/* Premium */}
                  <div style={{ background: '#041635', borderRadius: '20px', border: '2px solid #D8F950', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(4,22,53,0.18)' }}>
                    <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Most popular</div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Premium</p>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 5.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>${premiumMonthly}</span>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>/month</span>
                      </div>
                      {annual
                        ? <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>Billed $58/year · <span style={{ color: '#D8F950', fontWeight: 700 }}>save $110 vs monthly</span></p>
                        : <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>Switch to annual and save 67%</p>
                      }
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px' }}>Unlimited everything. Know exactly who's watching.</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                        {SEEKER_PREMIUM.map(f => <CheckItem key={f} label={f} dark />)}
                      </ul>
                      <Link href="/signup?plan=premium" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D8F950', color: '#041635', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'opacity 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                        Get Reslink Premium
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Company cards ── */}
              {planTab === 'companies' && (
                <motion.div key="companies" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="pricing-grid">

                  <div style={{ background: '#F7F8FA', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Starter</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 5.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>${companyMonthly}</span>
                      <span style={{ fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>/month</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px' }}>For growing teams that want to hire smarter and faster.</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                      {COMPANY_STARTER.map(f => <CheckItem key={f} label={f} />)}
                    </ul>
                    <Link href="/signup?plan=company-starter" className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center', fontSize: '15px' }}>
                      Start free trial
                    </Link>
                  </div>

                  <div style={{ background: '#041635', borderRadius: '20px', border: '2px solid #D8F950', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(4,22,53,0.18)' }}>
                    <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Enterprise</div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Enterprise</p>
                      <div style={{ marginBottom: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4.5vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>Custom</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>Tailored to your hiring volume and team size</p>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px' }}>For high-volume hiring teams that need control at scale.</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                        {COMPANY_ENTERPRISE.map(f => <CheckItem key={f} label={f} dark />)}
                      </ul>
                      <Link href="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D8F950', color: '#041635', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'opacity 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                        Request a demo
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Agency cards ── */}
              {planTab === 'agencies' && (
                <motion.div key="agencies" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="pricing-grid">

                  <div style={{ background: '#F7F8FA', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Growth</p>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 5.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>${agencyMonthly}</span>
                      <span style={{ fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>/month</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px' }}>For boutique agencies building a video-first candidate pipeline.</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                      {AGENCY_GROWTH.map(f => <CheckItem key={f} label={f} />)}
                    </ul>
                    <Link href="/signup?plan=agency-growth" className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center', fontSize: '15px' }}>
                      Start free trial
                    </Link>
                  </div>

                  <div style={{ background: '#041635', borderRadius: '20px', border: '2px solid #D8F950', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(4,22,53,0.18)' }}>
                    <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Scale</div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Scale</p>
                      <div style={{ marginBottom: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4.5vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>Custom</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>Pricing based on candidate volume and team size</p>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '28px' }}>For agencies placing at scale with a full white-label experience.</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                        {AGENCY_SCALE.map(f => <CheckItem key={f} label={f} dark />)}
                      </ul>
                      <Link href="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D8F950', color: '#041635', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'opacity 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                        Request a demo
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── Included in every plan ── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Included in every plan</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Built to get<br />you hired.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="included-grid">
              {INCLUDED.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px 22px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: item.color }}>
                    {item.svg}
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 0', overflow: 'hidden' }}>
          <style>{`
            @keyframes p-testi { from { transform: translateX(0) } to { transform: translateX(-50%) } }
            .p-testi-track { display: flex; animation: p-testi 24s linear infinite; }
            .p-testi-track:hover { animation-play-state: paused; }
          `}</style>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Success stories</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              Real results from<br />real candidates.
            </h2>
          </motion.div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, #fff, transparent)', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, #fff, transparent)', zIndex: 1, pointerEvents: 'none' }} />
            <div className="p-testi-track" style={{ gap: '16px', paddingLeft: '16px' }}>
              {doubled.map((t, i) => <TestiCard key={i} t={t} />)}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 900, color: '#041635', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
                Everything you<br />need to know.
              </h2>
            </motion.div>
            <div>
              {FAQS.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04 }}
                  style={{ borderBottom: '1px solid #ECEEF1' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: openFaq === i ? '#0C63E3' : '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
                      {openFaq === i
                        ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5C6070" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      }
                    </span>
                  </button>
                  {openFaq === i && (
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, paddingBottom: '20px', fontFamily: 'var(--font-body)' }}>{faq.a}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Ready to<br /><span style={{ color: '#D8F950' }}>stand out?</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '36px' }}>
                Free to start. No credit card. Takes less than 5 minutes.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
                  Create your Reslink — free
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
                <Link href="/signup?plan=premium" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 24px', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Get Premium
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <style>{`
        .pricing-grid { }
        .included-grid { }
        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .included-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .included-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </>
  );
}
