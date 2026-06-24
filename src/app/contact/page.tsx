'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, HelpCircle, MessageSquare, Rocket } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OPTIONS = [
  {
    icon: Calendar,
    color: '#0C63E3',
    bg: '#EEF4FF',
    title: 'Contact Sales',
    body: 'Want to use Reslink in your hiring process? Reach out to learn about our plans and pricing.',
    cta: 'Schedule a demo',
    href: '/contact/sales',
  },
  {
    icon: HelpCircle,
    color: '#7C3AED',
    bg: '#F3EEFF',
    title: 'Visit Our Help Center',
    body: 'Find helpful articles, guides, and tutorials to make the most of your Reslink experience.',
    cta: 'Visit help center',
    href: '/help',
  },
  {
    icon: MessageSquare,
    color: '#059669',
    bg: '#ECFDF5',
    title: 'Contact Support',
    body: 'Have questions or need assistance with your account? Our support team is ready to help.',
    cta: 'Contact support',
    href: '/contact/support',
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(80px, 11vw, 140px) 24px clamp(80px, 10vw, 120px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>Support</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Need help?
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
                Have questions, feedback, or need help with platform issues?<br />We're here to assist with it all.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Option cards. overlap hero */}
        <section style={{ background: '#F7F8FA', padding: '0 24px clamp(72px, 9vw, 112px)' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', transform: 'translateY(-60px)' }} className="contact-cards">
              <style>{`
                .contact-cards { }
                @media (max-width: 760px) { .contact-cards { grid-template-columns: 1fr !important; transform: translateY(-40px) !important; } }
              `}</style>
              {OPTIONS.map((opt, i) => (
                <motion.div key={opt.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <Link href={opt.href} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid #ECEEF1', padding: '28px', boxShadow: '0 2px 16px rgba(4,22,53,0.06)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(4,22,53,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(4,22,53,0.06)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                      <div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: opt.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                          <opt.icon size={22} color={opt.color} strokeWidth={1.8} />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em', marginBottom: '10px' }}>{opt.title}</h3>
                        <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.65 }}>{opt.body}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px', color: opt.color, fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
                        {opt.cta} <ArrowUpRight size={15} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Join the team */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }}>
              <div style={{ background: '#041635', borderRadius: '20px', padding: 'clamp(36px, 5vw, 56px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }} className="join-grid">
                <style>{`@media (max-width: 640px) { .join-grid { grid-template-columns: 1fr !important; } }`}</style>
                <div>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(216,249,80,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Rocket size={20} color="#D8F950" strokeWidth={1.8} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.95 }}>Looking to join<br />our team?</h2>
                </div>
                <div>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: '24px' }}>
                    At Reslink, we're always looking for passionate, driven people to help shape the future of hiring. If you're ready to make an impact in an innovative, collaborative environment, we'd love to hear from you.
                  </p>
                  <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    See open positions <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
