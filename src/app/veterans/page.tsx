'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Users, Plus, Minus, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FEATURES = [
  { icon: Zap, color: '#0C63E3', bg: '#EEF4FF', title: 'Translate your military skills', body: 'PitchAI helps you reframe your military experience — leadership, discipline, mission execution — into language civilian hiring managers immediately recognize and value.' },
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'Show who you are on camera', body: 'A 90-second video pitch communicates what a resume can\'t: presence, composure, and the confidence that comes from military service. Recruiters remember faces, not bullet points.' },
  { icon: FileText, color: '#0C63E3', bg: '#EEF4FF', title: 'Resume and video in one link', body: 'Your Reslink pairs your video introduction with resume highlights in one clean, shareable profile. Hiring managers get the complete picture before the first call.' },
  { icon: BarChart2, color: '#0C63E3', bg: '#EEF4FF', title: 'Know when employers view you', body: 'See exactly when a recruiter opens your profile, how long they engaged, and how many times. Follow up with the timing and confidence of a briefing, not a guess.' },
  { icon: Globe, color: '#0C63E3', bg: '#EEF4FF', title: 'Works everywhere you apply', body: 'Add your Reslink to LinkedIn, your email, and every application. One link that opens on any device and takes any recruiter straight to you.' },
  { icon: Users, color: '#0C63E3', bg: '#EEF4FF', title: 'Stand out from the stack', body: 'Civilian applicant pools are crowded. A video profile link in an application immediately separates you from hundreds of identical PDFs — before the recruiter reads a single line.' },
];

const FAQS = [
  { q: 'I\'ve never used a video resume before. Where do I start?', a: 'Reslink makes it simple. Upload your resume, let PitchAI generate your script, and record with our built-in teleprompter. Most veterans create their first Reslink in under 10 minutes.' },
  { q: 'How do I explain military roles to civilian employers?', a: 'PitchAI is trained to translate military experience into civilian language. You describe your role and it generates a script that frames your leadership, technical skills, and accomplishments in terms any hiring manager understands.' },
  { q: 'Is Reslink free?', a: 'Yes. Veterans can create and share a full Reslink profile for free. Pro plans unlock advanced analytics, multiple videos, and custom branding.' },
  { q: 'How long should my video be?', a: '60 to 90 seconds. That\'s enough time to introduce yourself, highlight two or three key strengths, and express interest in the role. Shorter, confident, and direct — the same way you\'d brief a commander.' },
  { q: 'Will this work alongside my existing resume and LinkedIn?', a: 'Yes. Reslink supplements your standard resume, never replaces it. You continue submitting through any ATS. Reslink is the extra layer that makes you stand out and be remembered.' },
  { q: 'What if I\'m not confident on camera yet?', a: 'The teleprompter scrolls your script while you record, so you never have to memorize a line. You look straight at the camera, and you sound prepared — because you are.' },
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
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(80px, 10vw, 128px) 24px clamp(72px, 9vw, 112px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For veterans</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 0.91, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                You served with distinction.<br />
                <span style={{ color: '#D8F950' }}>Now let the civilian world see it.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '580px', margin: '0 auto 36px' }}>
                Military skills are some of the most valuable in any workforce. Reslink helps you communicate them to civilian employers in a way a PDF never could.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  Create your Reslink free
                </Link>
                <Link href="/job-seekers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  See how it works
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The challenge */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>The challenge</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Your experience is real.<br />The translation gap is too.
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto' }}>
                Civilian recruiters often struggle to decode military titles and acronyms. A 90-second video pitch closes that gap instantly — your leadership, your communication, your presence speaks for itself.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="vets-stat-grid">
              <style>{`
                .vets-stat-grid { }
                @media (max-width: 760px) { .vets-stat-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {[
                { stat: '250K+', label: 'veterans transition annually', sub: 'to civilian employment in the US' },
                { stat: '3×', label: 'more callbacks with video', sub: 'vs. a traditional resume alone' },
                { stat: '90s', label: 'to make your case', sub: 'the average recruiter gives a resume 7 seconds' },
              ].map(s => (
                <motion.div key={s.stat} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '28px 24px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '8px' }}>{s.stat}</p>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>{s.label}</p>
                    <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{s.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Built for the transition</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Every tool you need.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="vets-feat-grid">
              <style>{`
                .vets-feat-grid { }
                @media (max-width: 860px) { .vets-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 480px) { .vets-feat-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                  <div style={{ background: '#F7F8FA', borderRadius: '16px', padding: '24px', height: '100%', boxSizing: 'border-box' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <f.icon size={20} color={f.color} strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>{f.title}</p>
                    <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{f.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '52px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Mission briefing in four steps.
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { n: '01', title: 'Upload your resume or service record', desc: 'Add your background and PitchAI instantly generates a script that translates your military role into civilian-friendly language.' },
                { n: '02', title: 'Record with the teleprompter', desc: 'The script scrolls as you record. You stay on camera, composed, and on message — no memorization required.' },
                { n: '03', title: 'Share your Reslink everywhere', desc: 'Drop your link into every application, your LinkedIn profile, and your email signature. One link, every opportunity.' },
                { n: '04', title: 'Follow up with data', desc: 'Know exactly when a recruiter views your profile and for how long. Follow up at the right moment with the right information.' },
              ].map((step, i) => (
                <motion.div key={step.n} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px 28px', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '28px', fontWeight: 900, color: '#0C63E3', lineHeight: 1, flexShrink: 0 }}>{step.n}</span>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '6px' }}>{step.title}</p>
                      <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What you get</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 4vw, 50px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '36px' }}>
                Everything in one link.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }} className="vets-check-grid">
              <style>{`@media (max-width: 560px) { .vets-check-grid { grid-template-columns: 1fr !important; } }`}</style>
              {[
                'Military-to-civilian script translation',
                'AI-generated video pitch',
                'Built-in teleprompter',
                'Resume highlights alongside video',
                'Real-time recruiter view analytics',
                'Shareable link for any platform',
                'Works on mobile and desktop',
                'Free to start',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#F7F8FA', borderRadius: '10px', padding: '12px 16px' }}>
                  <CheckCircle size={16} color="#0C63E3" strokeWidth={2} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#041635', fontFamily: 'var(--font-body)' }}>{item}</span>
                </div>
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
