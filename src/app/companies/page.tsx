'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoTicker from '@/components/LogoTicker';

/* ─── FAQs ─── */
const FAQS = [
  { q: 'How do companies access candidate Reslinks?', a: 'Candidates include their Reslink URL in their standard application. Your team clicks the link and watches their 60-second video pitch immediately — no account required for the hiring manager to view.' },
  { q: 'Does Reslink replace our ATS?', a: 'No. Reslink sits alongside your existing ATS. Candidates apply through your normal channels and simply attach their Reslink link. It supplements your workflow without replacing anything.' },
  { q: 'How long does onboarding take?', a: 'Most teams are up and running the same day. We provide a dedicated onboarding session and setup support. No IT involvement required.' },
  { q: 'Can we require all applicants to submit a Reslink?', a: 'Yes. You can include a Reslink prompt in your job postings or application instructions. Candidates create their profile in under 10 minutes for free.' },
  { q: 'Is there a free trial?', a: 'Yes. We offer a 14-day free trial with full access to all hiring team features. No credit card required to start.' },
  { q: 'What does enterprise pricing look like?', a: 'Enterprise plans are based on team size and hiring volume. Book a demo and we\'ll put together a custom proposal that fits your needs and budget.' },
];

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

/* ─── Browser frame wrapper ─── */
function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E4E9', boxShadow: '0 24px 64px rgba(4,22,53,0.12)' }}>
      <div style={{ background: '#F1F3F5', borderBottom: '1px solid #E2E4E9', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {['#FF5F57', '#FFBD2E', '#28CA41'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '5px', padding: '3px 14px', fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', border: '1px solid #E2E4E9' }}>app.reslink.io</div>
        </div>
      </div>
      <Image src={src} alt={alt} width={1200} height={750} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  );
}

/* ─── Testimonials ─── */
const FEATURED = {
  quote: 'We reviewed 40 Reslinks in an afternoon. Our entire hiring team was aligned on a shortlist before end of day. I haven\'t seen that happen in ten years of recruiting.',
  name: 'Sarah Mitchell',
  role: 'Head of Talent Acquisition',
  company: 'Stripe',
  color: '#635BFF',
};

const SIDE_QUOTES = [
  { quote: 'Reslink cut our first-round phone screen volume by 60%. The candidates we do call are genuinely the right ones.', name: 'Tom Bradley', role: 'VP People', company: 'HubSpot', color: '#FF7A59' },
  { quote: 'Our time-to-hire dropped by nearly a third in our first quarter using Reslink. The ROI was immediate.', name: 'Jenna Park', role: 'Recruiting Manager', company: 'Google', color: '#4285F4' },
  { quote: 'The analytics dashboard changed how I manage my team\'s hiring. We can see exactly where we lose candidates and why.', name: 'Amara Osei', role: 'Talent Lead', company: 'Meta', color: '#1877F2' },
];

/* ─── Page ─── */
export default function CompaniesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <style>{`
        .co-feat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .co-feat-row.reverse { direction: rtl; }
        .co-feat-row.reverse > * { direction: ltr; }
        .co-steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .co-testi-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: stretch; }
        .co-testi-side { display: flex; flex-direction: column; gap: 16px; }
        @media (max-width: 900px) {
          .co-feat-row { grid-template-columns: 1fr !important; direction: ltr !important; }
          .co-feat-row.reverse { direction: ltr !important; }
          .co-steps-grid { grid-template-columns: 1fr !important; }
          .co-testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <main style={{ paddingTop: '68px' }}>

        {/* ─── Hero ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 112px) 24px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For companies</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 7.5vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Make better hiring<br />decisions, <span style={{ color: '#D8F950' }}>faster.</span>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '520px', margin: '0 auto 36px' }}>
                Reslink gives your hiring team dynamic video profiles so you can assess candidates, align quickly, and move on the right people — before your competitors do.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' }}>
                <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Schedule a demo <ArrowRight size={16} />
                </Link>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Sign up for free
                </Link>
              </div>
            </motion.div>
            {/* Hero screenshot */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <BrowserFrame src="/product-dashboard.webp" alt="Reslink hiring dashboard" />
            </motion.div>
          </div>
        </section>

        {/* ─── Logo ticker ─── */}
        <LogoTicker />

        {/* ─── How it works ─── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 112px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: '-10%', left: '40%', width: '700px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.18), transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Better hires in four steps.
              </h2>
            </motion.div>
            <div className="co-steps-grid">
              {[
                { num: '01', title: 'Post your role, prompt video applications', desc: 'Add a Reslink prompt to your job posting. Candidates record a 60-second video pitch alongside their standard application — no friction, no extra tools.' },
                { num: '02', title: 'Your team reviews profiles asynchronously', desc: 'Hiring managers watch video profiles in their own time. No scheduling required. Filter, rate, and note candidates directly in the Reslink dashboard.' },
                { num: '03', title: 'Collaborate and align on a shortlist', desc: 'Share profiles with your full hiring panel. Collect ratings and comments from everyone before a single interview is booked.' },
                { num: '04', title: 'Interview only the right candidates', desc: 'By the time you book a first-round interview, your whole team has already seen and approved the candidate. Fewer surprises, faster decisions.' },
              ].map((s, i) => (
                <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div style={{ padding: '28px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '40px', fontWeight: 900, color: '#D8F950', lineHeight: 1, display: 'block', marginBottom: '16px' }}>{s.num}</span>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Feature blocks ─── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '80px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything your team needs</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em' }}>
                Built for how great<br />teams hire.
              </h2>
            </motion.div>

            {/* Feature 1 — AI ranking */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '96px' }}>
              <div className="co-feat-row">
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>AI-powered screening</p>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '16px' }}>Your top candidates, ranked before you look.</h3>
                  <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>Reslink AI scores every applicant on video pitch quality, resume match, and role fit — so your team opens the dashboard to a ranked list, not a pile. No more digging for the good ones.</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['AI grades every candidate A–F with a full breakdown', 'Ranked by video pitch, resume match, and role fit', 'Top picks surfaced automatically at the top'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>
                        <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <BrowserFrame src="/product-applicants.webp" alt="AI-ranked applicants view" />
              </div>
            </motion.div>

            {/* Feature 2 — Team notes / candidate view */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '96px' }}>
              <div className="co-feat-row reverse">
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Team collaboration</p>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '16px' }}>Your whole team. One view. Zero scheduling.</h3>
                  <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>Every hiring manager sees the same candidate profile — resume, video, and AI score — and can leave notes for the team. Alignment happens before the first interview, not after the fifth.</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Shared candidate profiles with full resume + video', 'Team notes visible to everyone on the role', 'Rate candidates and save to shortlists'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>
                        <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <BrowserFrame src="/product-candidate.webp" alt="Candidate profile with team notes" />
              </div>
            </motion.div>

            {/* Feature 3 — Saved lists */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '96px' }}>
              <div className="co-feat-row">
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Pipeline management</p>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '16px' }}>Build shortlists. Organize your pipeline.</h3>
                  <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>Create custom candidate lists — Final Round, Strong Maybes, Keep Warm — and move people through your process with a click. No spreadsheets, no shared docs, no chaos.</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Custom named lists for any stage of your process', 'AI grade visible on every saved candidate', 'One-click view back to their full profile'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>
                        <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <BrowserFrame src="/product-lists.webp" alt="Saved candidate lists" />
              </div>
            </motion.div>

            {/* Feature 4 — Public job board */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="co-feat-row reverse">
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Public job board</p>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: '#041635', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '16px' }}>Your own branded job board. Ready in minutes.</h3>
                  <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>Every company gets a public Reslink job board at reslink.io/company/yourname. Share the link anywhere. Candidates apply with a video pitch built in — and Reslink AI reviews every submission.</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['Branded board with all your open roles in one place', 'Candidates apply with resume, video, and more', 'Sync open roles to Indeed, LinkedIn & ZipRecruiter'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>
                        <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0C63E3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <BrowserFrame src="/product-jobboard.webp" alt="Company public job board" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What hiring teams say</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.98 }}>
                Trusted by talent teams<br />at the world's best companies.
              </h2>
            </motion.div>
            <div className="co-testi-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div style={{ background: '#041635', borderRadius: '20px', padding: 'clamp(32px, 4vw, 48px)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '24px' }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#D8F950" color="#D8F950" />)}
                    </div>
                    <p style={{ fontSize: 'clamp(17px, 2vw, 22px)', color: '#fff', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '32px' }}>
                      &ldquo;{FEATURED.quote}&rdquo;
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: FEATURED.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{FEATURED.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{FEATURED.name}</p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{FEATURED.role} · {FEATURED.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="co-testi-side">
                {SIDE_QUOTES.map((q, i) => (
                  <motion.div key={q.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ flex: 1 }}>
                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                          {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#D8F950" color="#D8F950" />)}
                        </div>
                        <p style={{ fontSize: '14px', color: '#3A3F4C', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '16px' }}>&ldquo;{q.quote}&rdquo;</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: q.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{q.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{q.name}</p>
                          <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{q.role} · {q.company}</p>
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
        <section style={{ padding: 'clamp(64px, 8vw, 96px) 24px', background: '#fff' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Frequently asked questions</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#041635', lineHeight: 0.95 }}>Everything you need to know</h2>
            </motion.div>
            <div style={{ background: '#F7F8FA', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: 'clamp(72px, 10vw, 120px) 24px', background: '#041635', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 0.92, color: '#fff', marginBottom: '20px' }}>
              Find the best talent<br />for your<br /><span style={{ color: '#D8F950' }}>open roles.</span>
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '40px', fontFamily: 'var(--font-body)' }}>
              Join leading companies transforming their hiring with Reslink.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              <Link href="/contact/sales" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Schedule a demo <ArrowRight size={16} />
              </Link>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 28px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Sign up for free
              </Link>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Free to start · 14-day trial · No credit card required</p>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
