'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Pause, Download, MapPin, Mail, Eye, Clock, MousePointerClick, Globe } from 'lucide-react';

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
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

const ANALYTICS_TILES = [
  { icon: Eye, value: '12', label: 'Profile views', sub: 'this week · up 4' },
  { icon: Clock, value: '0:58', label: 'Avg. watch time', sub: '85% finish it' },
  { icon: Download, value: '3', label: 'CV downloads', sub: 'latest 1d ago' },
  { icon: MousePointerClick, value: '9', label: 'Link clicks', sub: 'this week' },
];

export default function ExampleProfilePage() {
  const pipRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Autoplay the intro (muted) as soon as the page opens — browsers only allow
  // autoplay without a click when the video is muted.
  useEffect(() => {
    const v = pipRef.current;
    if (!v) return;
    v.muted = true;
    v.play().then(() => setPlaying(true)).catch(() => { /* autoplay blocked */ });
  }, []);

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

        {/* Example banner — a pill on desktop, a compact card once it wraps */}
        <div style={{ padding: 'clamp(16px, 3vw, 28px) 24px 0', textAlign: 'center' }}>
          <div className="ex-banner" style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', justifyContent: 'center', background: '#fff', borderRadius: '100px', padding: '7px 8px 7px 20px', boxShadow: '0 6px 24px rgba(6,26,58,0.08)' }}>
            <p className="ex-banner-text" style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: '9px', lineHeight: 1.4, margin: 0, textAlign: 'left' }}>
              <motion.span className="ex-banner-dot" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#5B7A0F', flexShrink: 0 }} />
              <span><strong style={{ color: '#061A3A', fontWeight: 700 }}>Example Reslink.</strong> This is exactly what recruiters see.</span>
            </p>
            <Link href="/get-started" className="ex-banner-cta" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#061A3A', color: '#fff', fontSize: '12.5px', fontWeight: 700, borderRadius: '100px', padding: '9px 18px', textDecoration: 'none', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Create yours <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <style>{`
          /* The pill shape only works while text and button sit on one line.
             It used to wrap at this width while keeping the 100px radius,
             which turned it into a tall white lozenge with the button
             stranded underneath. Below 720px it becomes a normal card:
             stacked, squared-off, full width, with a full-width CTA. */
          /* !important throughout: the banner's radius, padding, gap and
             align-items are set as inline styles on the element, which would
             otherwise win over this rule. */
          @media (max-width: 720px) {
            .ex-banner {
              display: flex !important; flex-direction: column; align-items: stretch !important;
              gap: 12px !important; width: 100%;
              border-radius: 16px !important; padding: 14px 16px !important;
            }
            .ex-banner-text { font-size: 13.5px !important; align-items: flex-start !important; }
            /* The dot is a flex sibling of the (now 2-line) text. align-items
               flex-start puts its top edge at the top of the whole text block
               — i.e. the top of line 1's line-box, not the visual middle of
               that line's glyphs — which read as floating above "Example
               Reslink" rather than beside it. Nudge it down to the centre of
               a ~19px line (13.5px font * 1.4 line-height). */
            .ex-banner-dot { margin-top: 6px; }
            .ex-banner-cta { width: 100%; padding: 11px 18px !important; font-size: 13.5px !important; }
          }
          .ex-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: stretch; }
          @media (max-width: 760px) { .ex-grid { grid-template-columns: 1fr; } }
          .ex-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
          @media (max-width: 620px) {
            .ex-header-row { flex-direction: column; align-items: stretch; gap: 20px; }
            .ex-header-identity { flex-direction: column; align-items: center; text-align: center; gap: 12px; }
            .ex-header-name h1 { font-size: 30px !important; }
            .ex-header-contacts { justify-content: center; }
            .ex-header-links { justify-content: center; }
            .ex-header-role { display: flex; flex-direction: column; }
            .ex-header-sep { display: none; }
            .ex-header-yrs { display: block; margin-top: 2px; }
            .ex-header-actions { width: 100%; }
            .ex-header-actions > * { flex: 1; }
          }
          .ex-resume-window { position: relative; background: #E9ECF1; padding: clamp(20px, 4vw, 44px); border-radius: 0 0 20px 20px; border: 1px solid #DFE3EA; border-top: none; }
          @media (max-width: 620px) { .ex-resume-window { padding: 16px 12px; } }
          /* Desktop: pinned to the top-right corner of the resume window,
             overlapping its padding — a fixed decoration, not scroll-aware. */
          .ex-pip-wrap { z-index: 5; }
          .ex-pip { position: absolute; top: 20px; right: 20px; width: clamp(120px, 22vw, 200px); aspect-ratio: 1; }
          /* Mobile: a true sticky picture-in-picture. .ex-pip-wrap spans the
             full height of .ex-resume-window (its start = top of the resume,
             its end = bottom of the resume), so the sticky child inside it can
             only stick for exactly that span — it starts docked at the top of
             the resume, then once you've scrolled far enough that its natural
             position would go off the bottom of the screen, it sticks near the
             bottom of the viewport, and it leaves with the resume once the
             wrap's own bottom edge scrolls above the sticky offset. No JS, no
             opacity-fade "vanish": it just scrolls away as part of the layout,
             like any other content leaving the screen.
             Two earlier attempts got this wrong: sticky-with-a-negative-margin
             overlaid the resume but rode up over the navbar once scrolled past
             (fixed by z-index below, this time round); fixed-to-viewport kept
             it on screen through unrelated sections entirely. */
          @media (max-width: 640px) {
            .ex-pip-wrap { position: absolute; inset: 0; padding: 16px 12px; pointer-events: none; }
            /* A bottom offset on position:sticky only clamps an element whose
               flow position would drop below that line — the guard a
               bottom-resting element needs when scrolling up. This element
               rests near the top of a tall container, so scrolling down only
               ever moves its flow position further above that line: with
               bottom alone, sticky never engaged and it just scrolled with
               the page (confirmed by measuring its top track scrollY 1:1,
               with zero clamping at any point).
               A top offset is what actually holds while scrolling down, so
               the visually-near-the-bottom placement comes from computing
               that top offset as (screen height minus box minus gap) instead. */
            .ex-pip {
              position: sticky;
              top: calc(100vh - 116px - 14px - env(safe-area-inset-bottom, 0px));
              bottom: auto; right: auto;
              width: 116px; height: 116px; margin-left: auto; pointer-events: auto;
              display: block;
            }
          }
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
            style={{ background: 'radial-gradient(ellipse 75% 95% at 92% 0%, rgba(168,72,214,0.42), transparent 55%), linear-gradient(140deg, #0A1E48 0%, #06122B 100%)', borderRadius: '20px 20px 0 0', padding: 'clamp(24px, 4vw, 40px)', position: 'relative', overflow: 'hidden' }}>
            <div className="ex-header-row" style={{ position: 'relative', zIndex: 1 }}>
              <div className="ex-header-identity" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div className="ex-header-avatar" style={{ width: '140px', height: '140px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.25)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/videos/pip-person-poster.jpg" alt="Olivia Stone" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                </div>
                <div className="ex-header-name">
                  <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '8px' }}>OLIVIA STONE</h1>
                  <p className="ex-header-role" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>
                    Business Development Representative
                  </p>
                  <div className="ex-header-contacts" style={{ display: 'flex', gap: '6px 16px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}><MapPin size={12} /> London, UK</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}><Mail size={12} /> olivia@example.com</span>
                  </div>
                  <div className="ex-header-links" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                    <a href="https://oliviastone.design" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                      <Globe size={14} /> Portfolio
                    </a>
                    <a href="https://linkedin.com/in/oliviastone" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', textDecoration: 'none' }}>
                      <LinkedinIcon size={14} /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <div className="ex-header-actions" style={{ display: 'flex', gap: '10px' }}>
                <motion.button
                  onClick={togglePlay}
                  animate={playing ? { scale: 1, boxShadow: '0 0 0 0 rgba(215,255,67,0)' } : {
                    scale: [1, 1.045, 1],
                    boxShadow: ['0 0 0 0 rgba(215,255,67,0.55)', '0 0 0 12px rgba(215,255,67,0)', '0 0 0 0 rgba(215,255,67,0)'],
                  }}
                  transition={playing ? { duration: 0.2 } : { repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 22px', background: '#D7FF43', color: '#061A3A', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                  {playing ? <Pause size={14} /> : <Play size={14} fill="#061A3A" />} {playing ? 'Pause intro' : 'Play intro'}
                </motion.button>
                <span title="Disabled in this example" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 22px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'default' }}>
                  <Download size={14} /> Resume
                </span>
              </div>
            </div>
          </motion.div>

          {/* Resume window (grey) + intro PIP (appears on play, upper-right) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="ex-resume-window">

            {/* The resume "paper" — scrollable */}
            <div className="ex-resume-scroll" style={{ maxWidth: '860px', margin: '0 auto', background: '#fff', borderRadius: '6px', boxShadow: '0 8px 40px rgba(6,26,58,0.12)', padding: 'clamp(28px, 4.5vw, 56px)' }}>
              <div style={{ textAlign: 'center', borderBottom: '1.5px solid #061A3A', paddingBottom: '16px', marginBottom: '20px' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: '#061A3A', letterSpacing: '0.01em' }}>Olivia Stone</p>
                <p style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', marginTop: '4px' }}>Business Development Representative</p>
                <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '3px' }}>London, UK · olivia@example.com · linkedin.com/in/oliviastone</p>
              </div>

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Summary</p>
              <p style={{ fontSize: '12px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '18px' }}>
                Quota-beating business development representative with five years across B2B SaaS and agency environments. Consistent top performer with a track record of building outbound systems that scale — not just hitting numbers, but improving how the whole team sells. Looking for a senior BDR or AE-track role at a product-led company.
              </p>

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Professional experience</p>
              {EXPERIENCE.map(e => (
                <div key={e.role} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{e.role}</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{e.period}</p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#1468E8', fontFamily: 'var(--font-body)', fontWeight: 600, margin: '2px 0 6px' }}>{e.org}</p>
                  <ul style={{ listStyle: 'disc', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {e.points.map(pt => (
                      <li key={pt} style={{ fontSize: '12px', color: '#5C6070', lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#061A3A', fontFamily: 'var(--font-body)', margin: '18px 0 10px' }}>Education</p>
              {EDUCATION.map(ed => (
                <div key={ed.degree} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{ed.degree}</p>
                    <p style={{ fontSize: '12px', color: '#1468E8', fontFamily: 'var(--font-body)', fontWeight: 600, marginTop: '2px' }}>{ed.school}</p>
                  </div>
                  <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{ed.period}</p>
                </div>
              ))}

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#061A3A', fontFamily: 'var(--font-body)', margin: '18px 0 8px' }}>Certifications</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '18px' }}>
                {CERTS.map(c => (
                  <li key={c} style={{ fontSize: '12px', color: '#5C6070', lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>{c}</li>
                ))}
              </ul>

              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {SKILLS.map(s => (
                  <span key={s} style={{ fontSize: '11px', fontWeight: 600, color: '#061A3A', background: '#F0F3F7', borderRadius: '100px', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Floating intro PIP — visible only while playing (stays mounted
                so the ref exists). Wrapped so mobile can make it sticky
                within the resume's own height without affecting desktop,
                where it's a plain absolute corner decoration. */}
            <div className="ex-pip-wrap">
              <motion.div className="ex-pip"
                initial={false}
                animate={playing ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: playing ? 'auto' : 'none' }}>
                <div onClick={togglePlay} style={{ width: '100%', height: '100%', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.35)', border: '3px solid #fff', cursor: 'pointer', position: 'relative' }}>
                  <video ref={pipRef} src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" playsInline preload="metadata"
                    onEnded={() => setPlaying(false)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(6,26,58,0.78)', backdropFilter: 'blur(6px)', borderRadius: '100px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D7FF43', flexShrink: 0 }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Intro playing</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Analytics + CTA, below the resume */}
          <div className="ex-grid" style={{ marginTop: '24px' }}>

            {/* Live analytics */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '16px', border: '1px solid #E8EAF0', padding: 'clamp(22px, 3vw, 30px)' }}>
              {/* Header with prominent "what Olivia sees" cue */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A', display: 'inline-block', boxShadow: '0 0 0 3px rgba(22,163,74,0.15)' }} />
                  <p style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#061A3A', fontFamily: 'var(--font-body)' }}>Live analytics</p>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#C0398A', background: '#FBEAF5', borderRadius: '100px', padding: '5px 11px', fontFamily: 'var(--font-body)' }}>
                  <Eye size={12} strokeWidth={2.5} /> Only Olivia sees this
                </span>
              </div>

              {/* 2×2 stat tiles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                {ANALYTICS_TILES.map(({ value, label, sub }) => (
                  <div key={label} style={{ background: '#F7F9FC', border: '1px solid #EDF0F5', borderRadius: '12px', padding: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#061A3A', lineHeight: 1, letterSpacing: '-0.02em', display: 'block', marginBottom: '8px' }}>{value}</span>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{label}</p>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '1px' }}>{sub}</p>
                  </div>
                ))}
              </div>

              {/* Locations bar */}
              <div style={{ background: '#F7F9FC', border: '1px solid #EDF0F5', borderRadius: '12px', padding: '14px 16px', marginTop: 'auto' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>Top viewer locations</p>
                <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '2px' }}>London · New York · Berlin</p>
              </div>
            </motion.div>

            {/* CTA card — matches analytics height */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.25 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'radial-gradient(ellipse 75% 95% at 92% 0%, rgba(168,72,214,0.42), transparent 55%), linear-gradient(140deg, #0A1E48 0%, #06122B 100%)', borderRadius: '16px', padding: 'clamp(26px, 3.2vw, 38px)', position: 'relative', overflow: 'hidden' }}>
              <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3.4vw, 34px)', fontWeight: 900, color: '#fff', lineHeight: 0.98, letterSpacing: '-0.02em', marginBottom: '14px', position: 'relative' }}>This could<br />be you.</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '24px', position: 'relative' }}>
                One link with your resume, your video pitch, and live analytics on everyone who views it.
              </p>
              <Link href="/get-started" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px', fontWeight: 800, padding: '17px 26px', background: '#D7FF43', color: '#061A3A', borderRadius: '12px', textDecoration: 'none', fontFamily: 'var(--font-body)', position: 'relative', width: '100%', boxSizing: 'border-box' }}>
                Create your Reslink <ArrowRight size={15} />
              </Link>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', textAlign: 'center', marginTop: '12px', position: 'relative' }}>Free · under 5 minutes</p>
            </motion.div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
