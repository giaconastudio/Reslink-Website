'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Pause, Download, Link2, MapPin, Mail, Eye, BarChart2, CheckCircle, Sparkles, Globe, Briefcase } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EXPERIENCE = [
  { role: 'Business Development Representative', org: 'Growth-stage SaaS company', period: '2023 – Present', points: ['Booked 140+ qualified meetings in 12 months — 128% of quota', 'Top-performing BDR on a team of nine for three consecutive quarters'] },
  { role: 'Sales Associate', org: 'B2B software startup', period: '2021 – 2023', points: ['Built outbound sequences that lifted reply rates from 4% to 11%', 'Promoted to senior associate within 14 months'] },
];

const SKILLS = ['Outbound prospecting', 'Discovery calls', 'Salesforce & HubSpot', 'Cold email & sequencing', 'Objection handling', 'Pipeline management'];

export default function ExampleProfilePage() {
  const pipRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = async () => {
    const v = pipRef.current;
    if (!v) return;
    if (v.paused) {
      v.currentTime = 0;
      v.muted = false;
      try { await v.play(); } catch { v.muted = true; try { await v.play(); } catch { /* blocked */ } }
      setPlaying(!v.paused);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px', background: '#F4F6F9', minHeight: '100vh' }}>

        {/* Example banner */}
        <div style={{ background: '#D8F950', padding: '10px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>
            <Sparkles size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
            This is an example Reslink profile — exactly what recruiters see when you share your link.{' '}
            <Link href="/get-started" style={{ color: '#041635', textDecoration: 'underline', fontWeight: 800 }}>Create yours free</Link>
          </p>
        </div>

        <style>{`
          .ex-grid { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 24px; align-items: start; }
          @media (max-width: 860px) { .ex-grid { grid-template-columns: 1fr; } }
          .ex-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
          .ex-pip { position: absolute; bottom: 20px; right: 20px; width: clamp(120px, 22vw, 200px); aspect-ratio: 1; z-index: 5; }
        `}</style>

        <div style={{ maxWidth: '1020px', margin: '0 auto', padding: '32px 24px 80px' }}>

          {/* Profile header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            style={{ background: '#041635', borderRadius: '20px 20px 0 0', padding: 'clamp(24px, 4vw, 40px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '500px', height: '400px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.3), transparent 65%)', pointerEvents: 'none' }} />
            <div className="ex-header-row" style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.25)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/videos/pip-person-poster.jpg" alt="Olivia Stone" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '8px' }}>OLIVIA STONE</h1>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Business Development Representative · 5 yrs experience</p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}><MapPin size={12} /> London, UK</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}><Mail size={12} /> olivia@example.com</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}><Link2 size={12} /> /in/oliviastone</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={togglePlay} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: '#D8F950', color: '#041635', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                  {playing ? <Pause size={14} /> : <Play size={14} fill="#041635" />} {playing ? 'Pause intro' : 'Play intro'}
                </button>
                <span title="Disabled in this example" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'default' }}>
                  <Download size={14} /> Resume
                </span>
              </div>
            </div>
          </motion.div>

          {/* Resume document + floating intro PIP */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ position: 'relative', background: '#E9ECF1', padding: 'clamp(20px, 4vw, 44px)', borderBottom: '1px solid #DFE3EA' }}>

            {/* The resume "paper" */}
            <div style={{ maxWidth: '640px', margin: '0 auto', background: '#fff', borderRadius: '6px', boxShadow: '0 8px 40px rgba(4,22,53,0.12)', padding: 'clamp(24px, 4vw, 44px)' }}>
              <div style={{ textAlign: 'center', borderBottom: '1.5px solid #041635', paddingBottom: '16px', marginBottom: '20px' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: '#041635', letterSpacing: '0.01em' }}>Olivia Stone</p>
                <p style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', marginTop: '4px' }}>Business Development Representative</p>
                <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '3px' }}>London, UK · olivia@example.com · linkedin.com/in/oliviastone</p>
              </div>

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Professional experience</p>
              {EXPERIENCE.map(e => (
                <div key={e.role} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{e.role}</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{e.period}</p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#0C63E3', fontFamily: 'var(--font-body)', fontWeight: 600, margin: '2px 0 6px' }}>{e.org}</p>
                  <ul style={{ listStyle: 'disc', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {e.points.map(pt => (
                      <li key={pt} style={{ fontSize: '12px', color: '#5C6070', lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#041635', fontFamily: 'var(--font-body)', margin: '18px 0 10px' }}>Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {SKILLS.map(s => (
                  <span key={s} style={{ fontSize: '11px', fontWeight: 600, color: '#041635', background: '#F0F3F7', borderRadius: '100px', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Floating intro PIP — plays on "Play intro" */}
            <div className="ex-pip">
              <div onClick={togglePlay} style={{ width: '100%', height: '100%', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.35)', border: '3px solid #fff', cursor: 'pointer', position: 'relative' }}>
                <video ref={pipRef} src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" playsInline preload="metadata"
                  onEnded={() => setPlaying(false)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <AnimatePresence>
                  {!playing && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ position: 'absolute', inset: 0, background: 'rgba(4,22,53,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
                        <Play size={18} fill="#041635" color="#041635" style={{ marginLeft: '2px' }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(4,22,53,0.78)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                  <motion.div animate={playing ? { opacity: [1, 0.3, 1] } : { opacity: 1 }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950', flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{playing ? 'Intro playing' : '60-sec intro'}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Below-resume grid */}
          <div className="ex-grid" style={{ marginTop: '24px' }}>

            {/* Left column — about / quick facts */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
              style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8EAF0', padding: 'clamp(24px, 3.5vw, 36px)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '18px' }}>About Olivia</p>
              <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>
                Quota-beating BDR with five years in B2B SaaS. Olivia&apos;s 60-second pitch covers how she books meetings other reps can&apos;t — and why she&apos;s looking for her next team to help scale.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { icon: MapPin, label: 'Location', value: 'London, UK' },
                  { icon: Globe, label: 'Open to', value: 'Hybrid · Remote' },
                  { icon: Briefcase, label: 'Experience', value: '5 years' },
                  { icon: CheckCircle, label: 'Availability', value: '4 weeks notice' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#F0F3F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color="#0C63E3" strokeWidth={2} />
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{label}</p>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* View analytics */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.22 }}
                style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8EAF0', padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Live analytics</p>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', borderRadius: '100px', padding: '3px 9px', fontFamily: 'var(--font-body)' }}>What Olivia sees</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { icon: Eye, title: 'Recruiter viewed your profile', sub: 'Watched 1:04 of 1:12 · 2h ago' },
                    { icon: BarChart2, title: '12 profile views this week', sub: 'Up 4 from last week' },
                    { icon: CheckCircle, title: 'Resume downloaded', sub: 'Series B software company · 1d ago' },
                  ].map(({ icon: Icon, title, sub }) => (
                    <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={15} color="#0C63E3" strokeWidth={2} />
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.25 }}>{title}</p>
                        <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA card */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.3 }}
                style={{ background: '#041635', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50%', right: '-30%', width: '300px', height: '250px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.35), transparent 65%)', pointerEvents: 'none' }} />
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '10px', position: 'relative' }}>This could be you.</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '18px', position: 'relative' }}>
                  Build your own Reslink in under 5 minutes — free.
                </p>
                <Link href="/get-started" className="btn-primary" style={{ fontSize: '14px', padding: '12px 22px', background: '#D8F950', color: '#041635', position: 'relative' }}>
                  Create your Reslink <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
