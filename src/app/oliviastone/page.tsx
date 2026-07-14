'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Pause, Download, Link2, MapPin, Mail, Eye, BarChart2, CheckCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const EXPERIENCE = [
  { role: 'Product Marketing Manager', org: 'Growth-stage SaaS company', period: '2023 – Present', points: ['Led go-to-market for two product launches that grew ARR 40%', 'Built the customer-story program from zero to 30 published case studies'] },
  { role: 'Marketing Associate', org: 'B2B analytics startup', period: '2021 – 2023', points: ['Owned lifecycle email — lifted trial-to-paid conversion 18%', 'Ran competitive intel that shaped two roadmap decisions'] },
];

const SKILLS = ['Go-to-market strategy', 'Positioning & messaging', 'Lifecycle marketing', 'Customer research', 'SQL & analytics', 'Copywriting'];

export default function ExampleProfilePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.muted = false; v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
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
        `}</style>

        <div style={{ maxWidth: '1020px', margin: '0 auto', padding: '32px 24px 80px' }}>

          {/* Profile header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            style={{ background: '#041635', borderRadius: '20px 20px 0 0', padding: 'clamp(24px, 4vw, 40px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: '500px', height: '400px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.3), transparent 65%)', pointerEvents: 'none' }} />
            <div className="ex-header-row" style={{ position: 'relative', zIndex: 1 }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '10px' }}>OLIVIA STONE</h1>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>Product Marketing Manager · 5 yrs experience</p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}><MapPin size={12} /> Austin, TX</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}><Mail size={12} /> olivia@example.com</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}><Link2 size={12} /> /in/oliviastone</span>
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

          {/* Video stage */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ position: 'relative', background: '#060D24', overflow: 'hidden', aspectRatio: '16/9', cursor: 'pointer' }} onClick={togglePlay}>
            <video ref={videoRef} src="/videos/hero.mp4" poster="/videos/hero-poster.jpg" playsInline preload="metadata"
              onEnded={() => setPlaying(false)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            {!playing && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(4,22,53,0.25)' }}>
                <motion.div whileHover={{ scale: 1.08 }} style={{ width: '76px', height: '76px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
                  <Play size={28} fill="#041635" color="#041635" style={{ marginLeft: '4px' }} />
                </motion.div>
              </div>
            )}
            <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(4,22,53,0.75)', backdropFilter: 'blur(8px)', borderRadius: '100px', padding: '5px 12px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D8F950', display: 'inline-block' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>60-second video pitch</span>
            </div>
          </motion.div>

          {/* Below-video grid */}
          <div className="ex-grid" style={{ marginTop: '24px' }}>

            {/* Left column — resume content */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
              style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8EAF0', padding: 'clamp(24px, 3.5vw, 36px)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '18px' }}>Professional experience</p>
              {EXPERIENCE.map((e) => (
                <div key={e.role} style={{ marginBottom: '26px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>{e.role}</p>
                    <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{e.period}</p>
                  </div>
                  <p style={{ fontSize: '13px', color: '#0C63E3', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '10px' }}>{e.org}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {e.points.map(pt => (
                      <li key={pt} style={{ display: 'flex', gap: '9px', fontSize: '14px', color: '#5C6070', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D8F950', flexShrink: 0, marginTop: '8px', border: '1px solid #B5D428' }} />{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', margin: '28px 0 14px' }}>Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SKILLS.map(s => (
                  <span key={s} style={{ fontSize: '12px', fontWeight: 600, color: '#041635', background: '#F0F3F7', borderRadius: '100px', padding: '6px 14px', fontFamily: 'var(--font-body)' }}>{s}</span>
                ))}
              </div>
            </motion.div>

            {/* Right column — what recruiters/owners see */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* AI score */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.2 }}
                style={{ background: '#fff', borderRadius: '16px', border: '1px solid #E8EAF0', padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Reslink AI score</p>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#0C63E3', background: '#EEF4FF', borderRadius: '100px', padding: '3px 9px', fontFamily: 'var(--font-body)' }}>What companies see</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#fff' }}>A</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#041635', lineHeight: 1 }}>92<span style={{ fontSize: '15px', color: '#9A9FA8' }}>/100</span></p>
                    <p style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '3px' }}>Video pitch · resume match · role fit</p>
                  </div>
                </div>
              </motion.div>

              {/* View analytics */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.28 }}
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
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.36 }}
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
