'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ChevronDown, UserCheck, Play, DollarSign, Settings, Users, BarChart2, GraduationCap, Briefcase } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SEEKER_CATS = [
  {
    icon: UserCheck, color: '#0C63E3', bg: '#EEF4FF',
    title: 'Getting Started',
    articles: ['How to create a Reslink account', 'Setting up your Reslink profile', 'Recording your first video resume', 'How to share your Reslink link'],
  },
  {
    icon: Play, color: '#7C3AED', bg: '#F3EEFF',
    title: 'Using Reslink',
    articles: ['How to create a video using the in-app recorder', 'Tips for using the Teleprompter feature', 'How to submit an application', 'Editing and re-recording your video'],
  },
  {
    icon: DollarSign, color: '#059669', bg: '#ECFDF5',
    title: 'Pricing & Subscriptions',
    articles: ['Free vs Premium', 'Managing your subscription or plan', 'How to upgrade or downgrade', 'Cancellation policy'],
  },
  {
    icon: BarChart2, color: '#0891B2', bg: '#ECFEFF',
    title: 'Analytics & Views',
    articles: ['Understanding your view analytics', 'How to see who viewed your profile', 'What counts as a view', 'Exporting analytics data'],
  },
  {
    icon: Settings, color: '#D97706', bg: '#FFFBEB',
    title: 'Account & Settings',
    articles: ['Changing your username or email', 'Privacy settings and profile visibility', 'Deleting your account', 'Resetting your password'],
  },
  {
    icon: Users, color: '#E11D48', bg: '#FFF1F2',
    title: 'Sharing & Privacy',
    articles: ['Controlling who can see your Reslink', 'How to disable your link', 'Sharing on LinkedIn and job boards', 'ATS compatibility FAQ'],
  },
];

const COMPANY_CATS = [
  {
    icon: Briefcase, color: '#0C63E3', bg: '#EEF4FF',
    title: 'Getting Started',
    articles: ['Creating a company account', 'Setting up your hiring workspace', 'Inviting team members', 'How to post a role with Reslink'],
  },
  {
    icon: Play, color: '#7C3AED', bg: '#F3EEFF',
    title: 'Reviewing Candidates',
    articles: ['How to view candidate Reslinks', 'Sharing candidate profiles internally', 'Rating and shortlisting candidates', 'How to download a video resume'],
  },
  {
    icon: DollarSign, color: '#059669', bg: '#ECFDF5',
    title: 'Plans & Billing',
    articles: ['Company pricing overview', 'How per-seat billing works', 'Upgrading your plan', 'Requesting an invoice'],
  },
  {
    icon: BarChart2, color: '#0891B2', bg: '#ECFEFF',
    title: 'Analytics & Reporting',
    articles: ['Candidate engagement analytics', 'Team activity reports', 'Exporting hiring data', 'Understanding funnel metrics'],
  },
  {
    icon: Settings, color: '#D97706', bg: '#FFFBEB',
    title: 'Integrations',
    articles: ['ATS integrations overview', 'LinkedIn integration', 'Connecting your HRIS', 'Webhooks and API access'],
  },
  {
    icon: GraduationCap, color: '#E11D48', bg: '#FFF1F2',
    title: 'Universities & Agencies',
    articles: ['Setting up a university account', 'Bulk student onboarding', 'Agency multi-client management', 'White-label options'],
  },
];

const FAQS = [
  { q: 'Is Reslink free?', a: 'Yes — Reslink has a free tier that lets you create and share a video resume at no cost. Pro and Premium plans unlock advanced analytics, multiple videos, and custom branding.' },
  { q: 'How can employers view my Reslink?', a: 'Anyone with your unique Reslink link can view your profile. Share it on LinkedIn, in email applications, or directly with recruiters.' },
  { q: 'Can I use Reslink for any type of job?', a: 'Absolutely. Reslink works for any industry or role. Whether you\'re applying for a creative or technical position, video resumes help you stand out.' },
  { q: 'How long should my video pitch be?', a: 'We recommend 60–90 seconds. Concise and confident. Shorter videos get watched all the way through — which is exactly what you want.' },
  { q: 'Can I edit my Reslink after sharing it?', a: 'Yes. You can update your video anytime. Your link stays the same, so anyone who already received it will see your latest version automatically.' },
  { q: 'Will my video pitch affect ATS compatibility?', a: 'Reslink is a supplement to your standard application, not a replacement. You still submit your traditional resume through ATS — Reslink is the extra layer that makes you memorable.' },
  { q: 'Do I need special equipment to record?', a: 'No. Your laptop webcam or smartphone camera works great. Good lighting and a quiet space make the biggest difference.' },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #ECEEF1' }}>
      <button onClick={() => setOpen(p => !p)}
        style={{ width: '100%', textAlign: 'left', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', background: 'none', border: 'none', cursor: 'pointer' }}>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{q}</p>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: open ? '#0C63E3' : '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
          <ChevronDown size={16} color={open ? '#fff' : '#9A9FA8'} style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'none' }} />
        </div>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? '200px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.3s ease, opacity 0.25s ease' }}>
        <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', paddingBottom: '20px' }}>{a}</p>
      </div>
    </div>
  );
}

export default function HelpPage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'seeker' | 'company'>('seeker');
  const cats = tab === 'seeker' ? SEEKER_CATS : COMPANY_CATS;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero + search */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px clamp(64px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 7vw, 84px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '12px' }}>
                Help Center
              </h1>
              <div style={{ width: '100px', height: '5px', background: '#D8F950', borderRadius: '3px', margin: '0 auto 28px' }} />
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '32px' }}>
                Explore our FAQs, tutorials, and other helpful resources to find the answers you're looking for.
              </p>
              <div style={{ position: 'relative' }}>
                <Search size={18} color="#9A9FA8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input type="text" placeholder="Search for answers..." value={query} onChange={e => setQuery(e.target.value)}
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', backdropFilter: 'blur(8px)' }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(56px, 7vw, 88px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>

            {/* Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
              <div style={{ background: '#ECEEF1', borderRadius: '12px', padding: '4px', display: 'flex', gap: '2px' }}>
                {[{ id: 'seeker', label: 'For Job Seekers' }, { id: 'company', label: 'For Companies' }].map(t => (
                  <button key={t.id} onClick={() => setTab(t.id as 'seeker' | 'company')}
                    style={{ padding: '10px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'all 0.2s', background: tab === t.id ? '#0C63E3' : 'transparent', color: tab === t.id ? '#fff' : '#9A9FA8' }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '64px' }} className="help-cat-grid">
                <style>{`
                  .help-cat-grid { }
                  @media (max-width: 760px) { .help-cat-grid { grid-template-columns: 1fr 1fr !important; } }
                  @media (max-width: 480px) { .help-cat-grid { grid-template-columns: 1fr !important; } }
                `}</style>
                {cats.map((cat, i) => (
                  <motion.div key={cat.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.04 }}>
                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)', transition: 'box-shadow 0.15s, transform 0.15s', cursor: 'pointer' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(4,22,53,0.09)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(4,22,53,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                        <cat.icon size={20} color={cat.color} strokeWidth={1.8} />
                      </div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>{cat.title}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {cat.articles.map(a => (
                          <Link key={a} href="#" style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', textDecoration: 'none', lineHeight: 1.4, transition: 'color 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#0C63E3')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#5C6070')}>
                            {a}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>FAQ</p>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '10px' }}>Frequently asked questions</h2>
                <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>
                  Can't find what you need?{' '}
                  <Link href="/contact/support" style={{ color: '#0C63E3', textDecoration: 'none', fontWeight: 600 }}>Contact support</Link> — we reply fast.
                </p>
              </div>
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
                {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
