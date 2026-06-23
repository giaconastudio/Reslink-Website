'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Users, Zap, Search, Briefcase, ArrowRight, Star, Plus, Minus, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

const FEATURES = [
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'Present candidates with confidence', body: 'Send clients a shortlist where every candidate has a video pitch attached. Clients see real people, not just PDFs. and they remember them.' },
  { icon: Search, color: '#7C3AED', bg: '#F3EEFF', title: 'Screen faster, place better', body: 'A 90-second Reslink replaces three rounds of phone screens. Know who\'s articulate and motivated before you ever pick up the phone.' },
  { icon: Briefcase, color: '#059669', bg: '#ECFDF5', title: 'Stand out from competing agencies', body: 'When your shortlists include video profiles and your competitors\' don\'t, clients notice. Reslink is a differentiator that wins business.' },
  { icon: BarChart2, color: '#D97706', bg: '#FFFBEB', title: 'Track candidate engagement', body: 'See when your clients view candidate Reslinks, which profiles they replay, and who they share internally. Full pipeline visibility.' },
  { icon: Users, color: '#E11D48', bg: '#FFF1F2', title: 'Manage your whole roster', body: 'One dashboard for your entire candidate pool. Tag, filter, and share profiles with specific clients in seconds.' },
  { icon: Zap, color: '#0891B2', bg: '#ECFEFF', title: 'Speed up your billing cycle', body: 'Faster client decisions mean faster placements mean faster billing. Agencies using Reslink report a 4× increase in successful placements per month.' },
];

const STEPS = [
  { num: '01', title: 'Onboard your candidate roster', desc: 'Invite your candidates to create a Reslink. Most record their profile in under 10 minutes. no tech skills needed.' },
  { num: '02', title: 'Build video-enhanced shortlists', desc: 'When a role opens, pull together a shortlist with video profiles attached. Clients can watch candidates before the first call.' },
  { num: '03', title: 'Share with clients and track views', desc: 'Send your shortlist link to the client. Know the moment they view it, which candidates they replay, and who they share internally.' },
  { num: '04', title: 'Close faster, bill sooner', desc: 'Aligned clients make faster decisions. Fewer back-and-forth calls, quicker offers, faster placements.' },
];

const TESTIMONIALS = [
  { quote: 'Our clients started choosing our shortlists over other agencies because we send Reslinks. It\'s a genuine differentiator now.', name: 'Emma Clarke', role: 'Senior Recruiter', company: 'Michael Page', color: '#0066CC' },
  { quote: 'The video profiles cut our interview-to-placement ratio almost in half. Clients already feel like they know the candidate before meeting them.', name: 'Ryan Torres', role: 'Principal Consultant', company: 'Hays', color: '#CC0000' },
  { quote: 'I used to spend two days phone screening. Now I review Reslinks in an hour. That time went back to business development.', name: 'Natalie Brooks', role: 'Recruiter', company: 'Robert Half', color: '#004B8D' },
  { quote: 'Our client retention improved significantly once we started presenting Reslink shortlists. They literally thank us for the experience.', name: 'Oliver Singh', role: 'Director', company: 'Korn Ferry', color: '#2D2D2D' },
  { quote: 'Being able to see when the client watched a video changed how I follow up. I call when I know they\'re engaged. placements went up.', name: 'Chloe Watson', role: 'Account Manager', company: 'Adecco', color: '#E30613' },
  { quote: 'Candidates who have a Reslink convert at a much higher rate. It proves they\'re serious and prepared before the first call.', name: 'David Kim', role: 'Senior Consultant', company: 'Spencer Stuart', color: '#003087' },
  { quote: 'We rolled out Reslink across our whole team and placements increased by 35% in the first quarter. The numbers don\'t lie.', name: 'Fatima Al-Hassan', role: 'Regional Director', company: 'Randstad', color: '#003082' },
  { quote: 'Clients love seeing video profiles. It elevates the whole candidate experience and makes our agency look more premium.', name: 'Tom Hartley', role: 'Managing Consultant', company: 'Kforce', color: '#0046AD' },
];

const FAQS = [
  { q: 'How does Reslink work for agencies?', a: 'Your candidates create a Reslink video profile, then you include their profile links in shortlists you send to clients. Clients watch the videos before deciding who to interview. saving everyone time and increasing placement rates.' },
  { q: 'Can we onboard candidates in bulk?', a: 'Yes. You can invite your entire candidate pool by email or share a sign-up link. Candidates create their own profiles and you get notified when they\'re ready.' },
  { q: 'Do clients need a Reslink account to view candidates?', a: 'No. Clients can view any Reslink profile via a shareable link without creating an account. No friction for the client experience.' },
  { q: 'Does Reslink replace our ATS?', a: 'No. Reslink sits alongside your existing ATS and candidate management tools. It adds video profiles to your current workflow without replacing anything.' },
  { q: 'How much does Reslink cost for an agency?', a: 'We offer agency plans based on team size and volume. Book a demo and we\'ll build a plan that fits your placement volume and budget.' },
  { q: 'Can I white-label Reslink for my agency?', a: 'Yes. Enterprise agency plans include custom branding options so the experience feels native to your firm. Ask about this on your demo call.' },
];

function TestiCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '24px 26px', border: '1px solid #ECEEF1', width: '320px', flexShrink: 0, boxShadow: '0 2px 12px rgba(4,22,53,0.05)' }}>
      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#D8F950" color="#D8F950" />)}
      </div>
      <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, marginBottom: '20px', fontFamily: 'var(--font-body)' }}>&ldquo;{t.quote}&rdquo;</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-phudu)' }}>
          {t.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{t.name}</p>
          <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #EEEEF0' }}>
      <button onClick={toggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{q}</span>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open ? '#0C63E3' : '#F7F8FA', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
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

export default function AgenciesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes ag-testi { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes ag-testi-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        .ag-testi-track { animation: ag-testi 28s linear infinite; display: flex; }
        .ag-testi-track-rev { animation: ag-testi-rev 34s linear infinite; display: flex; }
        .ag-testi-track:hover, .ag-testi-track-rev:hover { animation-play-state: paused; }
        .ag-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .ag-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .ag-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        .ag-problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 960px) {
          .ag-hero-grid { grid-template-columns: 1fr !important; }
          .ag-hero-img { display: none !important; }
          .ag-steps-grid { grid-template-columns: 1fr !important; }
          .ag-steps-right { display: none !important; }
          .ag-problem-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 860px) { .ag-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .ag-feat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="ag-hero-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For recruitment agencies</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                  Place more<br />candidates.<br /><span style={{ color: '#D8F950' }}>Win more clients.</span>
                </h1>
                <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '36px', maxWidth: '480px' }}>
                  Reslink helps recruitment agencies deliver stronger shortlists, impress clients, and close placements faster. all with video-first candidate profiles.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Get started free <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Talk to sales
                  </Link>
                </div>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {[['4×', 'more placements/month'], ['60%', 'faster time to offer'], ['92%', 'client satisfaction']].map(([v, l]) => (
                    <div key={l}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{v}</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div className="ag-hero-img" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Recruitment agency" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <LogoTicker />

        {/* ─── Problem section ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>The agency problem</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                PDF shortlists<br />don't win<br /><span style={{ color: '#0C63E3' }}>clients anymore.</span>
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>Every agency sends the same CVs. Reslink lets you show your clients the person, not just the paper. and that changes everything.</p>
            </motion.div>
            <div className="ag-problem-grid">
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div style={{ borderRadius: '18px', border: '1px solid #E8EAF0', padding: '28px', background: '#FAFBFC', height: '100%' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#9A9FA8', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>The old shortlist</span>
                  <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    {['Candidate A', 'Candidate B', 'Candidate C'].map((name, i) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < 2 ? '1px solid #ECEEF1' : 'none' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#5C6070', fontFamily: 'var(--font-body)' }}>{name}</p>
                          <p style={{ fontSize: '11px', color: '#B0B4BE', fontFamily: 'var(--font-body)' }}>resume.pdf · 2 pages</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {[
                    { text: 'Client can\'t tell candidates apart', red: true },
                    { text: 'Endless back-and-forth to book screens', red: true },
                    { text: 'Client picks a different agency\'s shortlist', red: true },
                  ].map(({ text, red }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: '#FEF2F2', borderRadius: '8px', marginBottom: '8px', border: '1px solid #FECACA' }}>
                      <span style={{ fontSize: '13px', color: '#EF4444', fontWeight: 700 }}>✗</span>
                      <span style={{ fontSize: '13px', color: '#DC2626', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 }}>
                <div style={{ borderRadius: '18px', border: '2px solid #D8F950', overflow: 'hidden', boxShadow: '0 16px 56px rgba(4,22,53,0.12)' }}>
                  <div style={{ background: '#041635', padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your Reslink shortlist</span>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', padding: '3px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>3 profiles</span>
                    </div>
                    {['Ben Harper', 'Sofia Rodriguez', 'Marcus Williams'].map((name, i) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ['#4F6EF7', '#A855F7', '#F59E0B'][i], display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{name[0]}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{name}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(216,249,80,0.15)', padding: '4px 10px', borderRadius: '6px' }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="#D8F950"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          <span style={{ fontSize: '11px', color: '#D8F950', fontFamily: 'var(--font-body)', fontWeight: 600 }}>0:4{i + 5}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '14px 24px', background: '#F7F8FA', borderBottom: '1px solid #ECEEF1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3' }} />
                    <p style={{ fontSize: '12px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>Client viewed all 3 profiles · 14 min ago</p>
                  </div>
                  <div style={{ padding: '14px 24px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={18} color="#16A34A" strokeWidth={2} />
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Client approved 2 candidates for interview</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translateY(-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="ag-steps-grid">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
                  <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '48px' }}>
                    From shortlist to<br />placement, faster.
                  </h2>
                </motion.div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {STEPS.map((s, i) => (
                    <motion.div key={s.num} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: '16px', padding: '20px 0', borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                        <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '28px', fontWeight: 900, color: '#D8F950', lineHeight: 1 }}>{s.num}</span>
                        <div>
                          <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '19px', fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: '6px' }}>{s.title}</p>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div className="ag-steps-right" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)', aspectRatio: '4/3' }}>
                  <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Recruitment agency team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Why Reslink for agencies</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Differentiate your<br />agency. Close faster.
              </h2>
            </motion.div>
            <div className="ag-feat-grid">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)', height: '100%' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <f.icon size={22} color={f.color} strokeWidth={1.8} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#041635', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>{f.title}</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ padding: 'clamp(64px, 8vw, 100px) 0', background: '#fff', overflow: 'hidden' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 56px', padding: '0 24px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What recruiters say</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98, marginBottom: '16px' }}>
              Agencies winning<br />more with Reslink.
            </h2>
            <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>Recruiters at top agencies use Reslink to close more placements and impress more clients.</p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '64px' }}>
            <div style={{ overflow: 'hidden' }}>
              <div className="ag-testi-track" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {doubled.map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div className="ag-testi-track-rev" style={{ display: 'flex', gap: '16px', paddingLeft: '16px' }}>
                {[...doubled].reverse().map((t, i) => <TestiCard key={i} t={t} />)}
              </div>
            </div>
          </div>
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="ag-testi-stats">
            <style>{`@media (max-width: 640px) { .ag-testi-stats { grid-template-columns: 1fr 1fr !important; } }`}</style>
            {[['4×', 'placements per month'], ['60%', 'faster to offer'], ['92%', 'client satisfaction'], ['35%', 'avg. revenue increase']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center', padding: '24px 8px', background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1' }}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</p>
                <p style={{ fontSize: '13px', color: '#5C6070', marginTop: '8px', fontFamily: 'var(--font-body)' }}>{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: '#F7F8FA' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.95 }}>Everything you need to know</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: '#041635', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Ready to place<br /><span style={{ color: '#D8F950' }}>candidates faster?</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join the agencies closing more deals with video-first shortlists.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Get started free <ArrowRight size={16} />
              </Link>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Free to start · No credit card required</p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
