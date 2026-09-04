'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import DemoRequestForm from '@/components/DemoRequestForm';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

const CHECKS = [
  'Walkthrough built around your open roles',
  'ATS compatibility checked live',
  'Pricing for your team size, no follow-up chase',
];

const STATS = [
  { num: '30 min', label: 'typical call length' },
  { num: '< 1 day', label: 'to get booked in' },
  { num: '10,000+', label: 'candidates on Reslink' },
];


const FAQS = [
  { q: 'Do we have to pay to get started?', a: 'No. You can start with a free trial and explore Reslink with your team before committing to a plan. We only talk pricing once you know it is a fit.' },
  { q: 'Is Reslink compatible with our existing ATS?', a: 'Yes. Reslink integrates with most major ATS platforms. Candidates can include their Reslink link as part of their standard application, so it fits right into your existing workflow.' },
  { q: 'Do candidates need an account to apply?', a: 'Candidates create a free Reslink to record their intro and share their link, but they can send it to you however you already receive applications - no account or login needed on your side.' },
  { q: 'What happens to candidate data?', a: 'Candidate data stays private and is only visible to the team members you invite. We never sell it or share it with third parties, and each candidate controls exactly what they include in their Reslink.' },
  { q: 'How long does onboarding take?', a: 'Most teams are up and running within a day. We provide a dedicated onboarding session and setup support to make sure everything works for your workflow.' },
  { q: 'Do you offer custom pricing for large organizations?', a: 'Absolutely. For teams with enterprise-scale hiring needs, we offer custom plans. Reach out and we\'ll build something that works for your volume and budget.' },
  { q: 'What support is included?', a: 'All paid plans include email support and access to our help center. Enterprise plans include priority support, a dedicated account manager, and regular check-in calls.' },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #ECEEF1' }}>
      <button onClick={toggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
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

export default function SalesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          input:focus, textarea:focus, select:focus { border-color: #1468E8 !important; background: #fff !important; }
          .sales-grid { display: grid; grid-template-columns: 1fr 460px; gap: 56px; align-items: center; }
          @media (max-width: 860px) { .sales-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }
        `}</style>

        {/* Hero + form */}
        <section style={{ background: '#061A3A', padding: 'clamp(64px, 9vw, 104px) 24px', position: 'relative', overflow: 'hidden' }}>
          {/* blue glow */}
          <div aria-hidden style={{ position: 'absolute', top: '-25%', right: '-8%', width: '620px', height: '620px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.30), transparent 62%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="sales-grid">
              {/* Left */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>For companies</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 6.6vw, 78px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.92, marginBottom: '26px' }}>
                  Schedule a{' '}<br className="br-desktop" />Reslink demo
                </h1>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: '30px', maxWidth: '400px' }}>
                  Thirty minutes, your roles, your process. We&apos;ll show you what candidates look like when you can see them.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '34px' }}>
                  {CHECKS.map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#1468E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={12} color="#fff" strokeWidth={3} />
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.82)', fontFamily: 'var(--font-body)' }}>{c}</p>
                    </div>
                  ))}
                </div>
                {/* Stats */}
                <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 44px)', flexWrap: 'wrap', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {STATS.map(s => (
                    <div key={s.label}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.num}</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '5px' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Form (white card) */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div style={{ background: '#fff', borderRadius: '18px', padding: 'clamp(26px, 3vw, 34px)', boxShadow: '0 30px 70px rgba(0,0,0,0.30)' }}>
                  <DemoRequestForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Logo bar */}
        <LogoTicker />

        {/* FAQ */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', lineHeight: 0.96 }}>Before you book</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
              {FAQS.map((f, i) => (
                <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
