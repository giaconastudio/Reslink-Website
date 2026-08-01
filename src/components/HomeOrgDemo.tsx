'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Pause, Sparkles, X, Check } from 'lucide-react';

const NOTES = [
  'Led a 3-person team through a full product redesign',
  'Specific about metrics: cites a 22% conversion lift',
  'Clear communicator, comfortable on camera',
];

/** Homepage counterpart to the job-seeker hero's clickable example Reslink.
 *  Deliberately built around a human decision, not an automated one: AI
 *  surfaces notes to read faster, a person watches the pitch and clicks
 *  Shortlist or Pass. No score, no ranking, no "AI decides" framing. */
export default function HomeOrgDemo() {
  const [playing, setPlaying] = useState(false);
  const [decision, setDecision] = useState<'pass' | 'shortlist' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  return (
    <section style={{ background: '#041635', padding: 'clamp(64px, 8vw, 96px) 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 65%)', pointerEvents: 'none' }} />

      <style>{`
        .hod-inner { max-width: 760px; margin: 0 auto; position: relative; z-index: 1; text-align: center; }
        .hod-frame {
          border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #fff;
          box-shadow: 0 30px 90px rgba(0,0,0,0.4); margin-top: clamp(32px, 4vw, 48px); text-align: left;
        }
        .hod-body { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 640px) { .hod-body { grid-template-columns: 1fr; } }
        .hod-video { position: relative; overflow: hidden; background: #060D24; aspect-ratio: 4/3; }
        .hod-play-btn {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer; padding: 0;
        }
        .hod-play-circle {
          width: 56px; height: 56px; border-radius: 50%; background: rgba(255,255,255,0.95);
          display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .hod-panel { padding: clamp(20px, 3vw, 28px); display: flex; flex-direction: column; }
        .hod-notes-head { display: inline-flex; align-items: center; gap: 6px; margin-bottom: 12px; }
        .hod-note { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: #5C6070; line-height: 1.5; font-family: var(--font-body); margin-bottom: 9px; }
        .hod-note-dot { width: 5px; height: 5px; border-radius: 50%; background: #0C63E3; flex-shrink: 0; margin-top: 6px; }
        .hod-verdicts { display: flex; gap: 8px; margin-top: auto; padding-top: 16px; }
        .hod-verdict-btn {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 14px; border-radius: 9px; font-size: 13px; font-weight: 700; font-family: var(--font-body);
          cursor: pointer; border: 1.5px solid #E4E7EC; background: #fff; color: #6B7280; transition: all 0.15s ease;
        }
        .hod-verdict-btn.shortlist.active { background: #D8F950; border-color: #D8F950; color: #041635; }
        .hod-verdict-btn.pass.active { background: #FEF2F2; border-color: #FCA5A5; color: #DC2626; }
      `}</style>

      <div className="hod-inner">
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
          For organizations
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.05 }} style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 900, color: '#fff', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: '16px' }}>
          You watch. You decide.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.1 }} style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '480px', margin: '0 auto' }}>
          AI reads the resume and surfaces a few notes worth knowing. It never scores or ranks anyone. Your team watches the pitch and makes the call, every time.
        </motion.p>

        <motion.div className="hod-frame" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hod-body">
            {/* Video */}
            <div className="hod-video">
              <video
                ref={videoRef}
                src="/videos/hero.mp4"
                poster="/videos/hero-poster.jpg"
                muted loop playsInline preload="metadata"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button className="hod-play-btn" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause pitch' : 'Play pitch'}>
                {!playing && (
                  <span className="hod-play-circle">
                    <Play size={20} color="#041635" fill="#041635" style={{ marginLeft: '3px' }} />
                  </span>
                )}
              </button>
              {playing && (
                <button
                  onClick={() => setPlaying(false)}
                  aria-label="Pause pitch"
                  style={{ position: 'absolute', bottom: '10px', right: '10px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(4,22,53,0.7)', backdropFilter: 'blur(6px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Pause size={13} color="#fff" />
                </button>
              )}
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(4,22,53,0.7)', backdropFilter: 'blur(6px)', borderRadius: '8px', padding: '5px 10px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>Olivia Stone</p>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>Business Development Rep</p>
              </div>
            </div>

            {/* AI-assisted notes + human verdict */}
            <div className="hod-panel">
              <div className="hod-notes-head">
                <Sparkles size={13} color="#0C63E3" />
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0C63E3', fontFamily: 'var(--font-body)' }}>AI notes, for your team to read</span>
              </div>
              {NOTES.map(n => (
                <div key={n} className="hod-note">
                  <span className="hod-note-dot" />
                  <span>{n}</span>
                </div>
              ))}

              <div className="hod-verdicts">
                <button
                  className={`hod-verdict-btn pass${decision === 'pass' ? ' active' : ''}`}
                  onClick={() => setDecision(d => d === 'pass' ? null : 'pass')}
                >
                  <X size={13} /> Pass
                </button>
                <button
                  className={`hod-verdict-btn shortlist${decision === 'shortlist' ? ' active' : ''}`}
                  onClick={() => setDecision(d => d === 'shortlist' ? null : 'shortlist')}
                >
                  <Check size={13} /> Shortlist
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginTop: '12px', textAlign: 'center' }}>
          Try it — click play, then Pass or Shortlist.
        </p>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '999px' }} transition={{ delay: 0.25 }} style={{ marginTop: '20px' }}>
          <Link href="/companies" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700, color: '#D8F950', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
            Explore for organizations <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
