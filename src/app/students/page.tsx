'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, BarChart2, Zap, Globe, FileText, Share2, Plus, Minus, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FEATURES = [
  { icon: Zap, color: '#0C63E3', bg: '#EEF4FF', title: 'AI writes your pitch', body: 'PitchAI generates a personalized 90-second script from your resume, tailored to the internship or job you\'re targeting. No blank-page paralysis.' },
  { icon: Video, color: '#0C63E3', bg: '#EEF4FF', title: 'Teleprompter-guided recording', body: 'Record on your laptop or phone. The built-in teleprompter scrolls your script so you stay on camera looking confident, not nervous.' },
  { icon: FileText, color: '#0C63E3', bg: '#EEF4FF', title: 'Showcase what you learned', body: 'Pair your coursework, projects, and skills with a compelling video pitch. Give recruiters the full picture before they even open your resume.' },
  { icon: BarChart2, color: '#0C63E3', bg: '#EEF4FF', title: 'Know when recruiters view you', body: 'See exactly when a recruiter opens your profile, how long they watched, and how many times. Follow up with confidence and perfect timing.' },
  { icon: Globe, color: '#0C63E3', bg: '#EEF4FF', title: 'Share everywhere', body: 'Add your Reslink to LinkedIn, your email signature, and every application. One link that works on every device, every platform.' },
  { icon: Share2, color: '#0C63E3', bg: '#EEF4FF', title: 'Stand out at career fairs', body: 'Hand a recruiter your Reslink instead of a paper resume. They open it on their phone and immediately see you — video, resume, and personality all at once.' },
];

const FAQS = [
  { q: 'Do I need work experience to use Reslink?', a: 'Not at all. Reslink is built for students. Coursework, projects, clubs, volunteer work, and part-time jobs are all fair game. The video pitch lets you explain your potential in a way a resume never can.' },
  { q: 'Is Reslink free for students?', a: 'Yes. Students can create and share a full Reslink profile for free. Pro features like advanced analytics and multiple videos are available on paid plans.' },
  { q: 'How long should my video pitch be?', a: 'Aim for 60 to 90 seconds. That\'s enough time to introduce yourself, highlight two or three strengths, and express genuine interest in the role. Shorter is almost always better.' },
  { q: 'Can I use Reslink for internship applications?', a: 'Absolutely. Reslink was designed with early-career applicants in mind. A video pitch shows the enthusiasm and communication skills that internship hiring managers actually care about.' },
  { q: 'What if I\'m not comfortable on camera?', a: 'That\'s what the teleprompter is for. Your script scrolls while you record, so you never have to memorize a thing. Most students feel confident after two or three takes.' },
  { q: 'Will Reslink work alongside my standard resume?', a: 'Yes. Reslink supplements your resume, it doesn\'t replace it. You still submit your PDF through any ATS. Reslink is the extra layer that makes you memorable.' },
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

export default function StudentsPage() {
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
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>For students</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 0.91, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Your degree got you here.<br />
                <span style={{ color: '#D8F950' }}>Your Reslink gets you hired.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '560px', margin: '0 auto 36px' }}>
                Land internships and first jobs by showing recruiters who you actually are — not just a list of coursework on a PDF.
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

        {/* Why it matters */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>The problem</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                Every student has a resume.<br />Not every student has a voice.
              </h2>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '540px', margin: '0 auto' }}>
                Recruiters see hundreds of entry-level resumes that look almost identical. A Reslink lets you speak directly to the hiring manager before you even get a call.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="students-stat-grid">
              <style>{`
                .students-stat-grid { }
                @media (max-width: 760px) { .students-stat-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {[
                { stat: '3×', label: 'more recruiter callbacks', sub: 'vs. a traditional resume alone' },
                { stat: '85%', label: 'average watch-through rate', sub: 'recruiters watch almost every second' },
                { stat: '5 min', label: 'to create your first Reslink', sub: 'AI does the hard part for you' },
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

        {/* Features grid */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Everything you need</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Built for early careers.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="students-feat-grid">
              <style>{`
                .students-feat-grid { }
                @media (max-width: 860px) { .students-feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 480px) { .students-feat-grid { grid-template-columns: 1fr !important; } }
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
                Ready in under 10 minutes.
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { n: '01', title: 'Upload your resume', desc: 'Paste your resume and PitchAI instantly generates a personalized video script tailored to the roles you want.' },
                { n: '02', title: 'Record with the teleprompter', desc: 'Hit record. Your script scrolls in real time so you can look straight at the camera and stay on message.' },
                { n: '03', title: 'Share your Reslink', desc: 'Copy your unique link and drop it into every application, your LinkedIn profile, and your email signature.' },
                { n: '04', title: 'Track who\'s watching', desc: 'Get notified when a recruiter views your profile. Follow up at the exact right moment with real data behind you.' },
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }} className="students-check-grid">
              <style>{`@media (max-width: 560px) { .students-check-grid { grid-template-columns: 1fr !important; } }`}</style>
              {[
                'Video pitch (60–90 seconds)',
                'AI-generated script',
                'Resume highlights',
                'Real-time view analytics',
                'Shareable link for any platform',
                'Works on mobile and desktop',
                'Teleprompter included',
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
                Your first job<br /><span style={{ color: '#D8F950' }}>starts here.</span>
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
