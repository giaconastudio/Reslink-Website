'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FREE_FEATURES = [
  'Create up to 2 Reslinks',
  'In-app video recording',
  'Teleprompter functionality',
  'Access to the resource center',
  'Shareable profile link',
  'Basic email support',
  'Limited access to Reslink Pitch AI',
];

const PREMIUM_FEATURES = [
  'Unlimited Reslinks',
  'Upload your own custom video pitch',
  'Full Reslink Pitch AI access',
  'Application insights (who viewed you & when)',
  'Watch-time analytics per recruiter',
  'In-app video recording',
  'Teleprompter functionality',
  'Access to the resource center',
  'Priority email support',
];

const FAQS = [
  {
    q: 'Is Reslink really free?',
    a: 'Yes. You can create up to 2 Reslinks, record your pitch, and start sharing — completely free, no credit card required.',
  },
  {
    q: 'What does Premium unlock?',
    a: 'Premium gives you unlimited Reslinks, full analytics (see every recruiter who viewed you and how long they watched), and unrestricted Pitch AI access to help you script and refine your pitch.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. Cancel any time from your account settings. If you cancel, you keep Premium access until the end of your billing period.',
  },
  {
    q: 'Is the annual plan worth it?',
    a: 'At $58/year vs $14/month billed monthly, annual saves you 67%. Most job searches wrap up in a few months — annual is the best value.',
  },
  {
    q: 'What happens to my Reslinks if I downgrade?',
    a: 'Your Reslinks stay live. If you have more than 2, they remain accessible via direct link but you\'ll need to upgrade to create new ones.',
  },
  {
    q: 'Do I need special equipment?',
    a: 'No. Your laptop or phone camera is all you need. Good lighting and a quiet room make the biggest difference.',
  },
];

const LOGOS = ['Google', 'Amazon', 'Meta', 'Stripe', 'Revolut', 'HubSpot', 'Netflix', 'LinkedIn', 'Apple', 'Shopify'];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const monthlyPrice = 14;
  const annualMonthly = Math.round(5800 / 12 / 100);
  const displayPrice = annual ? annualMonthly : monthlyPrice;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* ── Hero ── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px clamp(80px, 11vw, 130px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(216,249,80,0.08), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(216,249,80,0.12)', border: '1px solid rgba(216,249,80,0.25)', borderRadius: '100px', padding: '5px 14px', marginBottom: '24px' }}>
                <Zap size={11} color="#D8F950" fill="#D8F950" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Simple pricing</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '22px' }}>
                Start free.<br /><span style={{ color: '#D8F950' }}>Upgrade when ready.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto' }}>
                Every job seeker gets a powerful free plan. Unlock unlimited reach and full analytics when you're ready to go all in.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Toggle + Cards ── */}
        <section style={{ background: '#fff', padding: '0 24px clamp(80px, 10vw, 120px)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* Billing toggle */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '28px 0 48px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: annual ? '#9A9FA8' : '#041635', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>Monthly</span>
              <button
                onClick={() => setAnnual(a => !a)}
                style={{ width: '48px', height: '26px', borderRadius: '100px', background: annual ? '#0C63E3' : '#D5D8DF', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: '3px', left: annual ? '25px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </button>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: annual ? '#041635' : '#9A9FA8', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>Annual</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', background: '#D8F950', borderRadius: '100px', padding: '2px 10px', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Save 67%</span>
              </span>
            </motion.div>

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="pricing-grid">
              <style>{`
                .pricing-grid { }
                @media (max-width: 640px) { .pricing-grid { grid-template-columns: 1fr !important; } }
              `}</style>

              {/* Free */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
                style={{ background: '#F7F8FA', borderRadius: '20px', border: '1px solid #ECEEF1', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '28px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Free</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 6vw, 58px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>$0</span>
                    <span style={{ fontSize: '14px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>/month</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                    Everything you need to get started — no credit card required.
                  </p>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1 }}>
                  {FREE_FEATURES.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <Check size={10} color="#5C6070" strokeWidth={2.5} />
                      </div>
                      <span style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.45 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className="btn-outline" style={{ textAlign: 'center', justifyContent: 'center', fontSize: '15px' }}>
                  Get started free
                </Link>
              </motion.div>

              {/* Premium */}
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
                style={{ background: '#041635', borderRadius: '20px', border: '2px solid #D8F950', padding: 'clamp(28px, 4vw, 40px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 80px rgba(4,22,53,0.18)' }}>
                {/* Glow */}
                <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />

                {/* Most popular badge */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Most popular
                </div>

                <div style={{ marginBottom: '28px', position: 'relative', zIndex: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Premium</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 6vw, 58px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>${displayPrice}</span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>/month</span>
                  </div>
                  {annual && (
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>
                      Billed $58/year — save $110 vs monthly
                    </p>
                  )}
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                    Unlimited everything. Analytics to know exactly who's watching.
                  </p>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px', flex: 1, position: 'relative', zIndex: 1 }}>
                  {PREMIUM_FEATURES.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(216,249,80,0.15)', border: '1px solid rgba(216,249,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <Check size={10} color="#D8F950" strokeWidth={2.5} />
                      </div>
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', lineHeight: 1.45 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup?plan=premium" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#D8F950', color: '#041635', fontWeight: 700, fontSize: '15px', padding: '14px 24px', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'opacity 0.15s', position: 'relative', zIndex: 1 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  Get Reslink Premium
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Social proof strip ── */}
        <section style={{ background: '#041635', padding: '48px 24px', textAlign: 'center', overflow: 'hidden' }}>
          <p style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.3)', marginBottom: '24px', fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>
            300+ candidates have landed interviews globally through Reslink
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px 36px' }}>
            {LOGOS.map(co => (
              <span key={co} style={{ fontSize: '15px', fontWeight: 700, color: 'rgba(255,255,255,0.18)', letterSpacing: '-0.02em', fontFamily: 'var(--font-body)' }}>{co}</span>
            ))}
          </div>
        </section>

        {/* ── What's included in every plan ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>
                Included in every plan
              </p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Built to get you hired.
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="included-grid">
              <style>{`
                .included-grid { }
                @media (max-width: 720px) { .included-grid { grid-template-columns: 1fr 1fr !important; } }
                @media (max-width: 480px) { .included-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {[
                { icon: '🎥', title: 'In-app recording', desc: 'Record straight in the browser — no software needed.' },
                { icon: '📜', title: 'Teleprompter', desc: 'Built-in scrolling script so you stay on camera, not on notes.' },
                { icon: '🔗', title: 'Shareable profile', desc: 'One link. Drop it in any application, email, or LinkedIn.' },
                { icon: '📚', title: 'Resource center', desc: 'Guides, templates, and tips to help you craft a standout pitch.' },
                { icon: '🤖', title: 'Pitch AI access', desc: 'AI-generated scripts tailored to your experience and target role.' },
                { icon: '🌍', title: 'Global reach', desc: 'Works with any company, in any country, for any role.' },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{ background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px 22px' }}>
                  <p style={{ fontSize: '22px', marginBottom: '10px' }}>{item.icon}</p>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>FAQ</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 900, color: '#041635', lineHeight: 0.96, letterSpacing: '-0.03em' }}>
                Everything you<br />need to know.
              </h2>
            </motion.div>

            <div>
              {FAQS.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }}
                  style={{ borderBottom: '1px solid #ECEEF1' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: openFaq === i ? '#0C63E3' : '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={openFaq === i ? '#fff' : '#5C6070'} strokeWidth="2.5">
                        {openFaq === i
                          ? <><line x1="5" y1="12" x2="19" y2="12" /></>
                          : <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>
                        }
                      </svg>
                    </span>
                  </button>
                  {openFaq === i && (
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, paddingBottom: '20px', fontFamily: 'var(--font-body)' }}>
                      {faq.a}
                    </p>
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
                <Link href="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
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
      <Footer />
    </>
  );
}
