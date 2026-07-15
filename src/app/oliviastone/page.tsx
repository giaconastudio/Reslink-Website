'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Pause, Download, Link2, MapPin, Mail, Eye, Clock, MousePointerClick, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EXPERIENCE = [
  {
    role: 'Business Development Representative', org: 'Growth-stage SaaS company', period: '2023 – Present',
    points: [
      'Booked 140+ qualified meetings in 12 months — 128% of quota',
      'Top-performing BDR on a team of nine for three consecutive quarters',
      'Sourced the two largest enterprise deals in company history ($480k combined ACV)',
      'Mentored three new hires through onboarding; all three hit ramp quota early',
    ],
  },
  {
    role: 'Sales Associate', org: 'B2B software startup', period: '2021 – 2023',
    points: [
      'Built outbound sequences that lifted reply rates from 4% to 11%',
      'Promoted to senior associate within 14 months',
      'Owned inbound qualification for 200+ leads per month at 92% SLA compliance',
    ],
  },
  {
    role: 'Account Coordinator', org: 'Marketing agency', period: '2019 – 2021',
    points: [
      'Managed renewal communications across a 40-account portfolio (96% retention)',
      'Introduced a CRM hygiene process later adopted agency-wide',
    ],
  },
];

const EDUCATION = [
  { degree: 'BA (Hons) Business Management, 2:1', school: 'University of Manchester', period: '2015 – 2018' },
];

const CERTS = ['HubSpot Sales Software Certified', 'Salesforce Trailhead Ranger', 'MEDDIC Sales Methodology'];

const SKILLS = ['Outbound prospecting', 'Discovery calls', 'Salesforce & HubSpot', 'Cold email & sequencing', 'Objection handling', 'Pipeline management'];

const ANALYTICS = [
  { icon: Eye, title: '12 profile views this week', sub: 'Up 4 from last week' },
  { icon: Clock, title: 'Avg. watch time 0:58 of 1:12', sub: '85% of viewers finish the intro' },
  { icon: Download, title: '3 resume downloads', sub: 'Most recent: 1d ago' },
  { icon: MapPin, title: 'Top viewer locations', sub: 'London · New York · Berlin' },
  { icon: MousePointerClick, title: '9 link clicks this week', sub: 'From LinkedIn, email & applications' },
];

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
          .ex-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: start; }
          @media (max-width: 760px) { .ex-grid { grid-template-columns: 1fr; } }
          .ex-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
          .ex-resume-window { position: relative; background: #E9ECF1; padding: clamp(20px, 4vw, 44px); border-radius: 0 0 20px 20px; border: 1px solid #DFE3EA; border-top: none; }
          .ex-pip { position: absolute; top: 20px; right: 20px; width: clamp(120px, 22vw, 200px); aspect-ratio: 1; z-index: 5; }
          @media (max-width: 640px) { .ex-pip { top: 12px; right: 12px; width: clamp(104px, 32vw, 150px); } }
          .ex-resume-scroll { max-height: 760px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #C3C8D2 transparent; }
          .ex-resume-scroll::-webkit-scrollbar { width: 6px; }
          .ex-resume-scroll::-webkit-scrollbar-thumb { background: #C3C8D2; border-radius: 3px; }
          @media (max-width: 860px) { .ex-resume-scroll { max-height: 620px; } }
          @media (max-width: 640px) { .ex-resume-scroll { max-height: 520px; } }
          .ex-sidebar { display: flex; flex-direction: column; gap: 16px; }
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
                <motion.button
                  onClick={togglePlay}
                  animate={playing ? { scale: 1, boxShadow: '0 0 0 0 rgba(216,249,80,0)' } : {
                    scale: [1, 1.045, 1],
                    boxShadow: ['0 0 0 0 rgba(216,249,80,0.55)', '0 0 0 12px rgba(216,249,80,0)', '0 0 0 0 rgba(216,249,80,0)'],
                  }}
                  transition={playing ? { duration: 0.2 } : { repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: '#D8F950', color: '#041635', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                  {playing ? <Pause size={14} /> : <Play size={14} fill="#041635" />} {playing ? 'Pause intro' : 'Play intro'}
                </motion.button>
                <span title="Disabled in this example" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'default' }}>
                  <Download size={14} /> Resume
                </span>
              </div>
            </div>
          </motion.div>

          {/* Resume window (grey) + intro PIP (appears on play, upper-right) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="ex-resume-window">

            {/* The resume "paper" — scrollable */}
            <div className="ex-resume-scroll" style={{ maxWidth: '680px', margin: '0 auto', background: '#fff', borderRadius: '6px', boxShadow: '0 8px 40px rgba(4,22,53,0.12)', padding: 'clamp(24px, 4vw, 44px)' }}>
              <div style={{ textAlign: 'center', borderBottom: '1.5px solid #041635', paddingBottom: '16px', marginBottom: '20px' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: '#041635', letterSpacing: '0.01em' }}>Olivia Stone</p>
                <p style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', marginTop: '4px' }}>Business Development Representative</p>
                <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '3px' }}>London, UK · olivia@example.com · linkedin.com/in/oliviastone</p>
              </div>

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Summary</p>
              <p style={{ fontSize: '12px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '18px' }}>
                Quota-beating business development representative with five years across B2B SaaS and agency environments. Consistent top performer with a track record of building outbound systems that scale — not just hitting numbers, but improving how the whole team sells. Looking for a senior BDR or AE-track role at a product-led company.
              </p>

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

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#041635', fontFamily: 'var(--font-body)', margin: '18px 0 10px' }}>Education</p>
              {EDUCATION.map(ed => (
                <div key={ed.degree} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{ed.degree}</p>
                    <p style={{ fontSize: '12px', color: '#0C63E3', fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: '2px' }}>{ed.school}</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{ed.period}</p>
                </div>
              ))}

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#041635', fontFamily: 'var(--font-body)', margin: '18px 0 8px' }}>Certifications</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '18px' }}>
                {CERTS.map(c => (
                  <li key={c} style={{ fontSize: '12px', color: '#5C6070', lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>{c}</li>
                ))}
              </ul>

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#041635', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {SKILLS.map(s => (
                  <span key={s} style={{ fontSize: '11px', fontWeight: 600, color: '#041635', background: '#F0F3F7', borderRadius: '100px', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Floating intro PIP — upper-right, visible only while playing (stays mounted so the ref exists) */}
            <motion.div className="ex-pip"
              initial={false}
              animate={playing ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: playing ? 'auto' : 'none' }}>
              <div onClick={togglePlay} style={{ width: '100%', height: '100%', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.35)', border: '3px solid #fff', cursor: 'pointer', position: 'relative' }}>
                <video ref={pipRef} src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" playsInline preload="metadata"
                  onEnded={() => setPlaying(false)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(4,22,53,0.78)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950', flexShrink: 0 }} />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Intro playing</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Analytics + CTA, below the resume */}
          <div className="ex-grid" style={{ marginTop: '24px' }}>

            {/* Live analytics */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
              style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8EAF0', padding: 'clamp(22px, 3vw, 30px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Live analytics</p>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#041635', background: '#D8F950', borderRadius: '100px', padding: '3px 9px', fontFamily: 'var(--font-body)' }}>What Olivia sees</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {ANALYTICS.map(({ icon: Icon, title, sub }) => (
                  <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color="#0C63E3" strokeWidth={2} />
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
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.25 }}
              style={{ background: '#041635', borderRadius: '16px', padding: 'clamp(24px, 3vw, 32px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50%', right: '-30%', width: '300px', height: '250px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.35), transparent 65%)', pointerEvents: 'none' }} />
              <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '10px', position: 'relative' }}>This could be you.</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '18px', position: 'relative' }}>
                One link with your resume, your video pitch, and live analytics on everyone who views it. Build yours in under 5 minutes — free.
              </p>
              <Link href="/get-started" className="btn-primary" style={{ fontSize: '14px', padding: '12px 22px', background: '#D8F950', color: '#041635', position: 'relative' }}>
                Create your Reslink <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
