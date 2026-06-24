'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Users, Plus, Minus, Play, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FEATURES = [
  { icon: Zap, title: 'Translate military experience', body: 'PitchAI translates your service record into language civilian hiring managers immediately recognize and value.' },
  { icon: Video, title: 'Show who you are', body: 'A 90-second video pitch communicates what a resume can\'t: presence, composure, and the confidence that comes from military service.' },
  { icon: FileText, title: 'Resume + video in one link', body: 'Your Reslink pairs your video introduction with resume highlights. Hiring managers get the full picture before the first call.' },
  { icon: BarChart2, title: 'Know when employers view you', body: 'See when a recruiter opens your profile and how long they engaged. Follow up with confidence and real data.' },
  { icon: Globe, title: 'Works everywhere you apply', body: 'Add your Reslink to LinkedIn, email, and every application. One link that opens on any device.' },
  { icon: Users, title: 'Stand out from the stack', body: 'A video profile link in your application immediately separates you from hundreds of identical PDFs.' },
];

const FAQS = [
  { q: 'I\'ve never used a video resume before. Where do I start?', a: 'Upload your resume, let PitchAI generate your script, and record with our built-in teleprompter. Most veterans create their first Reslink in under 10 minutes.' },
  { q: 'How do I explain military roles to civilian employers?', a: 'PitchAI translates military experience into civilian language. Describe your role and it generates a script that frames your leadership, technical skills, and accomplishments in terms any hiring manager understands.' },
  { q: 'Is Reslink free?', a: 'Yes. Veterans can create and share a full Reslink profile for free. Pro plans unlock advanced analytics, multiple videos, and custom branding.' },
  { q: 'How long should my video be?', a: '60 to 90 seconds. That\'s enough time to introduce yourself, highlight two or three key strengths, and express interest in the role. Shorter, confident, and direct.' },
  { q: 'Will this work alongside my existing resume and LinkedIn?', a: 'Yes. Reslink supplements your standard resume. You continue submitting through any ATS. Reslink is the extra layer that makes you stand out and be remembered.' },
  { q: 'What if I\'m not confident on camera yet?', a: 'The teleprompter scrolls your script while you record. You look straight at the camera and sound prepared. Because you are.' },
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

export default function VeteransPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero — split layout */}
        <section style={{ background: '#041635', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '30%', width: '700px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', alignItems: 'stretch', minHeight: '600px' }} className="vets-hero-grid">
            <style>{`
              .vets-hero-grid { }
              @media (max-width: 860px) { .vets-hero-grid { grid-template-columns: 1fr !important; } }
              .vets-hero-img-col { }
              @media (max-width: 860px) { .vets-hero-img-col { display: none !important; } }
            `}</style>
            {/* Left: copy */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(64px, 8vw, 100px) 0 clamp(64px, 8vw, 100px)', position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For veterans</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 900, color: '#fff', lineHeight: 0.91, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                From service<br />
                <span style={{ color: '#D8F950' }}>to standout.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '440px', marginBottom: '36px' }}>
                Military skills are some of the most valuable in any workforce. Reslink helps you communicate them to civilian employers in a way a PDF never could.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Create free Reslink
                </Link>
                <Link href="/job-seekers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  See how it works
                </Link>
              </div>
            </motion.div>
            {/* Right: veteran photo */}
            <motion.div className="vets-hero-img-col" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px, 5vw, 56px) 0' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '380px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', aspectRatio: '3/4' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/military1.jpg"
                  alt="Veterans"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, rgba(4,22,53,0.72), transparent)' }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
                {/* Floating card */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.4 }}
                  style={{ position: 'absolute', bottom: '24px', left: '20px', background: '#fff', borderRadius: '14px', padding: '12px 14px', boxShadow: '0 16px 48px rgba(4,22,53,0.28)', display: 'flex', alignItems: 'center', gap: '10px', minWidth: '195px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle size={16} color="#041635" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Offer accepted</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Amazon · 8 days after sharing</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats — blue */}
        <section style={{ background: '#041635', padding: 'clamp(48px, 6vw, 72px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="vets-stats-grid">
            <style>{`@media (max-width: 640px) { .vets-stats-grid { grid-template-columns: 1fr !important; } }`}</style>
            {[
              { stat: '250K+', label: 'veterans transition annually', sub: 'to civilian employment in the US' },
              { stat: '3×', label: 'more callbacks with video', sub: 'vs. a traditional resume alone' },
              { stat: '90s', label: 'to make your case', sub: 'the avg recruiter gives a resume 7 sec' },
            ].map((s, i) => (
              <motion.div key={s.stat} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ textAlign: 'center', padding: '8px' }}>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 4.5vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '6px' }}>{s.stat}</p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-body)', marginBottom: '2px' }}>{s.label}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The translation gap — photo + copy split */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="vets-split-grid">
            <style>{`@media (max-width: 820px) { .vets-split-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(4,22,53,0.14)', aspectRatio: '4/3' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/military2.jpg"
                  alt="Veteran in professional setting"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>The challenge</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.8vw, 50px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Your experience is real.<br />The translation gap is too.
              </h2>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '20px' }}>
                Civilian recruiters often struggle to decode military titles and acronyms. A 90-second video pitch closes that gap instantly. Your leadership and presence speaks for itself.
              </p>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                Reslink&apos;s PitchAI translates your service record into a compelling civilian narrative that hiring managers immediately connect with.
              </p>
            </motion.div>
          </div>
        </section>

        {/* One link — dark navy with profile card */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 108px) 24px', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="vets-pip-grid">
            <style>{`@media (max-width: 820px) { .vets-pip-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>One link, everything</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Your Reslink is your<br /><span style={{ color: '#D8F950' }}>first impression.</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '28px' }}>
                One link combines your video pitch, service record highlights, and real-time recruiter analytics. Share it anywhere.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Military-to-civilian script translation', 'Video pitch + resume in one link', 'See when recruiters view you', 'Works on every device and platform'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color="#D8F950" strokeWidth={2} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Profile card with PIP */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} style={{ position: 'relative' }}>
              <div style={{ borderRadius: '18px', border: '2px solid #D8F950', overflow: 'hidden', boxShadow: '0 24px 72px rgba(0,0,0,0.4)' }}>
                <div style={{ background: '#0C1B3A', padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingRight: '80px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/videos/pip-person-poster.jpg"
                      alt="Veteran" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top center', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>MARCUS HAYES</p>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>Operations · US Army Veteran</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#D8F950', borderRadius: '8px', padding: '8px 14px' }}>
                      <Play size={10} color="#041635" fill="#041635" />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>Play Intro</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>Download Resume</span>
                    </div>
                  </div>
                </div>
                <div style={{ background: '#F7F8FA', padding: '12px 22px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #ECEEF1' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>A</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Amazon Recruiter viewed you</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Watched 1:12 · 2h ago</p>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3', flexShrink: 0 }} />
                </div>
                <div style={{ padding: '12px 22px', background: '#FAFFF0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle size={14} color="#041635" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Offer received</p>
                    <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'var(--font-body)' }}>Amazon · Operations Manager</p>
                  </div>
                </div>
              </div>
              {/* PIP */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '130px', height: '130px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.4)', border: '3px solid #041635' }}>
                <video src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" autoPlay muted loop playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(4,22,53,0.8)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D8F950' }} />
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.06em' }}>LIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 108px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Built for the transition</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Every tool you need.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="vets-feat-grid">
              <style>{`
                .vets-feat-grid { }
                @media (max-width: 860px) { .vets-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 480px) { .vets-feat-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', height: '100%', boxSizing: 'border-box' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <f.icon size={20} color="#0C63E3" strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>{f.title}</p>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, color: '#041635', letterSpacing: '-0.02em' }}>Common questions</h2>
            </motion.div>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px' }}>
              {FAQS.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.3), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.035em', marginBottom: '20px' }}>
                Your next mission<br /><span style={{ color: '#D8F950' }}>starts here.</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '32px' }}>
                Free to start. Takes less than 10 minutes. No credit card required.
              </p>
              <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 32px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '16px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Create your Reslink free
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
