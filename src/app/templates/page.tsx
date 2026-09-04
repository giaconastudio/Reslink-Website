'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HERO_CHECKS = [
  { label: 'Parser-safe by default', desc: 'no columns, tables or text boxes' },
  { label: 'Three layouts', desc: 'early career, career changer, senior' },
  { label: 'Editable everywhere', desc: 'Google Docs, Word and Pages' },
];

const RESUME_CARDS = [
  {
    name: 'Alex Moreno', role: 'Junior Developer · Manchester', accent: '#1468E8',
    sections: [{ h: 'Projects', w: [70, 100, 88] }, { h: 'Education', w: [64, 92] }, { h: 'Skills', w: [82, 58] }],
    label: 'Early career', desc: 'Projects and skills first, education before experience.',
  },
  {
    name: 'Sam Okonkwo', role: 'Operations → Product · London', accent: '#D63D9D',
    sections: [{ h: 'Summary', w: [100, 76] }, { h: 'Transferable skills', w: [88, 66] }, { h: 'Experience', w: [72, 94] }],
    label: 'Career changer', desc: 'Leads with transferable skills, not job titles.',
  },
  {
    name: 'Priya Raman', role: 'Engineering Manager · Berlin', accent: '#5B7A0F',
    sections: [{ h: 'Experience', w: [92, 70, 100] }, { h: 'Selected impact', w: [66, 84] }],
    label: 'Senior', desc: 'Impact and scope up top, one page of detail below.',
  },
];

export default function TemplatesPage() {
  const [form, setForm] = useState({ firstName: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          .tmpl-form-input { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1.5px solid #E8EAF0; background: #F6F7F9; font-size: 14px; font-family: var(--font-body); color: #061A3A; outline: none; box-sizing: border-box; transition: border-color 0.15s, background 0.15s; }
          .tmpl-form-input:focus { border-color: #1468E8; background: #fff; }
          .tmpl-form-input::placeholder { color: #9AA1AE; }
          .tmpl-hero-grid { display: grid; grid-template-columns: 1fr 420px; gap: clamp(40px, 6vw, 80px); align-items: center; }
          .tmpl-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .tmpl-while { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(32px, 5vw, 64px); align-items: center; }

          /* Resume card hover — lift, and the lines tint to the card accent */
          .tmpl-resume-card { transition: box-shadow 0.3s ease, border-color 0.3s ease; will-change: transform; }
          .tmpl-resume-card:hover { box-shadow: 0 30px 66px rgba(6,26,58,0.18); border-color: color-mix(in srgb, var(--accent) 42%, #ECEEF1); }
          .tmpl-line { background: #EDEFF3; height: 6px; border-radius: 3px; transition: background 0.4s ease; }
          .tmpl-resume-card:hover .tmpl-line { background: color-mix(in srgb, var(--accent) 24%, #EDEFF3); }

          @media (max-width: 900px) {
            .tmpl-hero-grid { grid-template-columns: 1fr; }
            .tmpl-cards { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
            .tmpl-while { grid-template-columns: 1fr; }
            .tmpl-while-visual { order: 1; }
          }
        `}</style>

        {/* ── Hero ── */}
        <section style={{ background: '#061A3A', padding: 'clamp(56px, 8vw, 88px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '860px', height: '620px', background: 'radial-gradient(ellipse at center, rgba(20,104,232,0.16), transparent 64%)', pointerEvents: 'none' }} />
          <div className="tmpl-hero-grid" style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '18px', fontFamily: 'var(--font-body)' }}>Free download</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(38px, 5vw, 62px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '20px' }}>
                ATS-proof<br />resume templates
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.7vw, 17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '28px', maxWidth: '420px' }}>
                Three layouts built around the formatting rules that actually trip up parsers.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '13px', marginBottom: '30px' }}>
                {HERO_CHECKS.map(c => (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#C2E532', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={12} color="#061A3A" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>{c.label} <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.55)' }}>- {c.desc}</span></span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ display: 'flex' }}>
                  {['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg', '/avatars/a4.jpg', '/avatars/a5.jpg'].map((src, i) => (
                    <img key={src} src={src} alt="" width={28} height={28} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #061A3A', marginLeft: i === 0 ? 0 : '-8px', objectFit: 'cover', display: 'block' }} />
                  ))}
                </span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>Downloaded <strong style={{ color: '#fff', fontWeight: 700 }}>12,400 times</strong> this year</span>
              </div>
            </motion.div>

            {/* Form card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(28px, 4vw, 38px)', boxShadow: '0 30px 70px rgba(0,0,0,0.3)' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '16px 0' }}>
                    <div style={{ width: '56px', height: '56px', background: '#D7FF43', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <Check size={26} color="#061A3A" strokeWidth={2.5} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em', marginBottom: '10px' }}>Check your inbox!</h3>
                    <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>We sent the templates to <strong>{form.email}</strong>. Check your spam folder if you don&apos;t see it in a minute.</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em', marginBottom: '6px', textAlign: 'center' }}>Get the templates</h3>
                    <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', textAlign: 'center', marginBottom: '22px' }}>One email, three templates, no follow-up spam.</p>
                    <input className="tmpl-form-input" type="text" placeholder="First name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} style={{ marginBottom: '10px' }} />
                    <input className="tmpl-form-input" type="email" placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ marginBottom: '16px' }} />
                    <button
                      onClick={() => { if (form.firstName && form.email) setSubmitted(true); }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.filter = 'brightness(0.94)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.filter = 'none'; }}
                      onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(0.98)'; }}
                      onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                      style={{ width: '100%', padding: '15px', background: '#D7FF43', color: '#061A3A', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-body)', cursor: 'pointer', marginBottom: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'transform 0.15s ease, filter 0.15s ease' }}>
                      Send me the templates
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                    <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', textAlign: 'center', marginBottom: '14px' }}>Arrives in about 30 seconds</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', lineHeight: 1.6, textAlign: 'center' }}>
                      We&apos;ll also send occasional job-search tips. Unsubscribe in one click. <a href="/privacy" style={{ color: '#061A3A', fontWeight: 700 }}>Privacy policy</a>.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Three templates ── */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>What you&apos;re getting</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', lineHeight: 0.96, marginBottom: '16px' }}>Three templates, three situations</h2>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.6, fontFamily: 'var(--font-body)', maxWidth: '540px', margin: '0 auto' }}>Not three colourways of the same thing. Each one solves a different problem with how your history reads.</p>
            </motion.div>

            <div className="tmpl-cards">
              {RESUME_CARDS.map((c, i) => (
                <motion.div key={c.name} className="tmpl-resume-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  style={{ ['--accent' as string]: c.accent, background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', boxShadow: '0 14px 40px rgba(6,26,58,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {/* mock resume */}
                  <div className="tmpl-resume-body" style={{ padding: '24px 24px 26px', flex: 1 }}>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{c.name}</p>
                    <p style={{ fontSize: '12px', color: '#9AA1AE', fontFamily: 'var(--font-body)', marginTop: '2px', marginBottom: '18px' }}>{c.role}</p>
                    {c.sections.map(s => (
                      <div key={s.h} style={{ marginBottom: '18px' }}>
                        <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: c.accent, fontFamily: 'var(--font-body)', marginBottom: '9px' }}>{s.h}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                          {s.w.map((w, wi) => (
                            <div key={wi} className="tmpl-line" style={{ width: `${w}%` }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* footer label — fixed height so titles/descriptions line up across all cards */}
                  <div style={{ borderTop: '1px solid #ECEEF1', background: '#FAFBFC', padding: '18px 24px', minHeight: '104px' }}>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>{c.label}</p>
                    <p style={{ fontSize: '13px', color: '#5C6070', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── While you're here ── */}
        <section style={{ background: 'linear-gradient(180deg, #FBEAF5 0%, #FCEFF7 100%)', padding: 'clamp(64px, 8vw, 100px) 24px' }}>
          <div className="tmpl-while" style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D63D9D', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>While you&apos;re here</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.3vw, 40px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: '20px' }}>A good template gets you read.<br />It won&apos;t get you remembered.</h2>
              <p style={{ fontSize: '16px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '30px', maxWidth: '460px' }}>
                These templates get you past the parser, which is worth doing. But it only puts you in the pile with <strong style={{ color: '#061A3A', fontWeight: 700 }}>the forty other people who managed it.</strong> A Reslink adds what a document can&apos;t: sixty seconds of you, and a record of who watched.
              </p>
              <Link href="/oliviastone" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#061A3A', color: '#fff', fontWeight: 700, fontSize: '15px', borderRadius: '12px', padding: '14px 26px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                See what a Reslink looks like
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </motion.div>

            {/* Reslink video card */}
            <motion.div className="tmpl-while-visual" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55 }}
              style={{ position: 'relative', height: '340px' }}>
              {/* resume paper behind */}
              <div aria-hidden style={{ position: 'absolute', top: '15%', left: '0%', width: '48%', height: '76%', background: '#fff', borderRadius: '14px', boxShadow: '0 20px 46px rgba(6,26,58,0.12)', transform: 'rotate(-5deg)', padding: '18px 16px', overflow: 'hidden' }}>
                {/* header: name + contact + rule */}
                <div style={{ textAlign: 'center', borderBottom: '1.5px solid #DDE3EE', paddingBottom: '9px', marginBottom: '11px' }}>
                  <div style={{ height: '8px', borderRadius: '4px', background: '#B9C1D2', width: '54%', margin: '0 auto 5px' }} />
                  <div style={{ height: '4px', borderRadius: '3px', background: '#E7EBF2', width: '72%', margin: '0 auto' }} />
                </div>
                {/* section blocks */}
                {[{ w: '30%', lines: [100, 94, 88] }, { w: '34%', lines: [96, 82] }, { w: '26%', lines: [90, 98, 76] }].map((sec, si) => (
                  <div key={si} style={{ marginBottom: '11px' }}>
                    <div style={{ height: '5px', borderRadius: '3px', background: '#1468E8', width: sec.w, marginBottom: '7px' }} />
                    {sec.lines.map((w, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                        <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#C7CDDA', flexShrink: 0 }} />
                        <div style={{ height: '4px', borderRadius: '3px', background: '#E7EBF2', width: `${w}%` }} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* video card (pink frame) */}
              <div style={{ position: 'absolute', top: 0, right: '2%', width: '54%', aspectRatio: '4 / 5', borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(155deg, #D63D9D 0%, #8E2467 62%, #5A1541 100%)', boxShadow: '0 26px 60px rgba(6,26,58,0.22)', border: '5px solid #fff' }}>
                <video src="/videos/cta-resume.mp4" poster="/videos/hero-cta-resume.jpg" autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(6,26,58,0.55)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: '11px', fontWeight: 700, borderRadius: '100px', padding: '5px 11px', fontFamily: 'var(--font-body)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D7FF43', display: 'inline-block' }} />Playing
                </span>
              </div>
              {/* play/+ button straddling the card edge */}
              <span style={{ position: 'absolute', top: '46%', left: '40%', zIndex: 3, width: '46px', height: '46px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 22px rgba(6,26,58,0.22)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D63D9D" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </span>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
