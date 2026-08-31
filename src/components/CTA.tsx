'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  /** Small uppercase label above the headline. */
  eyebrow?: string;
  /** Rendered as the headline; defaults to the job-seeker pitch. */
  heading?: React.ReactNode;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  footnote?: string;
  /** Section background behind the box. */
  sectionBg?: string;
  /** Box background (color or gradient). Defaults to the light blush. */
  boxBg?: string;
  /** Switch text/buttons to light-on-dark styling (for dark/gradient boxes). */
  onDark?: boolean;
  /** Replaces the default video card on the right. */
  visual?: React.ReactNode;
}

export default function CTA({
  eyebrow = 'Get started',
  heading,
  body = 'One link with your video intro, your resume and your work. And you see exactly who opens it.',
  primaryLabel = 'Get started for free',
  primaryHref = '/get-started',
  secondaryLabel = 'See a real Reslink',
  secondaryHref = '/oliviastone',
  footnote = 'Free to start · under 5 minutes · no card needed',
  sectionBg = '#F6F7F9',
  boxBg = 'radial-gradient(ellipse 52% 64% at 93% 0%, rgba(214,61,157,0.42), transparent 52%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)',
  onDark = true,
  visual,
}: CTAProps = {}) {
  return (
    <section style={{ padding: 'clamp(24px, 3.5vw, 44px) 24px clamp(40px, 5vw, 64px)', background: sectionBg }}>
      <style>{`
        .cta-box { max-width: 1120px; margin: 0 auto; background: #FBEAF5; border-radius: 32px; padding: clamp(30px, 3.4vw, 48px) clamp(36px, 5vw, 68px); position: relative; overflow: hidden; }
        .cta-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center; position: relative; z-index: 1; }
        .cta-h { font-family: var(--font-phudu); font-size: clamp(32px, 4.2vw, 52px); font-weight: 900; letter-spacing: -0.03em; line-height: 0.94; color: #061A3A; margin-bottom: 18px; }
        .cta-h span { color: #D63D9D; }
        .cta-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #D63D9D; margin-bottom: 16px; font-family: var(--font-body); }
        .cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .cta-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #061A3A; color: #fff; font-weight: 700; font-size: 15px; border-radius: 12px; padding: 14px 26px; font-family: var(--font-body); transition: background 0.15s ease; }
        .cta-btn-primary:hover { background: #0A234C; }
        .cta-btn-secondary { display: inline-flex; align-items: center; background: #fff; color: #061A3A; font-weight: 700; font-size: 15px; border-radius: 12px; padding: 14px 26px; font-family: var(--font-body); border: 1px solid #DCE2EC; transition: border-color 0.15s ease; }
        .cta-btn-secondary:hover { border-color: #061A3A; }
        .cta-body { font-size: 16px; color: #3A4A63; line-height: 1.6; max-width: 420px; margin-bottom: 26px; font-family: var(--font-body); }
        .cta-fine { font-size: 13px; color: #66799B; margin-top: 16px; font-family: var(--font-body); }

        .cta-box.on-dark .cta-eyebrow { color: #D7FF43; }
        .cta-box.on-dark .cta-h { color: #fff; }
        .cta-box.on-dark .cta-h span { color: #D7FF43; }
        .cta-box.on-dark .cta-body { color: rgba(255,255,255,0.78); }
        .cta-box.on-dark .cta-fine { color: rgba(255,255,255,0.62); }
        .cta-box.on-dark .cta-btn-primary { background: #D7FF43; color: #061A3A; }
        .cta-box.on-dark .cta-btn-primary:hover { background: #C2E532; }
        .cta-box.on-dark .cta-btn-secondary { background: rgba(255,255,255,0.12); color: #fff; border-color: rgba(255,255,255,0.28); }
        .cta-box.on-dark .cta-btn-secondary:hover { border-color: rgba(255,255,255,0.6); }

        .cta-cards { position: relative; height: 340px; }
        .cta-card { background: #fff; border-radius: 18px; box-shadow: 0 22px 55px rgba(6,26,58,0.16); }
        /* Video-resume card */
        .cta-card-a { position: absolute; top: 50%; left: 50%; transform: translate(-54%, -50%); width: 246px; z-index: 1; padding: 8px; }
        .cta-vid { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 3/4; background: #0B0F1A; }
        .cta-vid img, .cta-vid video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .cta-vid-dur { position: absolute; top: 11px; right: 11px; z-index: 2; font-size: 11px; font-weight: 700; color: #fff; background: rgba(6,26,58,0.55); backdrop-filter: blur(6px); border-radius: 6px; padding: 3px 8px; font-family: var(--font-body); }
        .cta-vid-tag { position: absolute; top: 11px; left: 11px; z-index: 2; font-size: 10px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #061A3A; background: #D7FF43; border-radius: 100px; padding: 4px 10px; font-family: var(--font-body); }
        .cta-vid-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px 13px 12px; background: linear-gradient(to top, rgba(6,26,58,0.9), transparent); z-index: 2; }
        .cta-vid-name { font-family: var(--font-phudu); font-weight: 800; font-size: 15px; color: #fff; letter-spacing: -0.01em; }
        .cta-vid-role { font-size: 11px; color: rgba(255,255,255,0.78); font-family: var(--font-body); margin-top: 1px; }
        /* Watch-analytics card floating over the top-right */
        .cta-card-b { position: absolute; bottom: 12px; right: -8px; width: 232px; padding: 14px 16px; z-index: 2; }
        .cta-card-b .top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .cta-note-av { width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0; background: #FF7A59; display: flex; align-items: center; justify-content: center; }
        .cta-note-av span { color: #fff; font-weight: 800; font-size: 8.5px; letter-spacing: -0.03em; font-family: var(--font-body); }
        .cta-note-t { font-size: 12.5px; font-weight: 700; color: #061A3A; font-family: var(--font-body); line-height: 1.25; }
        .cta-note-s { font-size: 11px; color: #9AA1AE; font-family: var(--font-body); margin-top: 2px; }
        .cta-note-bar { height: 6px; border-radius: 100px; background: #E7EDF6; overflow: hidden; margin-bottom: 7px; }
        .cta-note-bar > span { display: block; height: 100%; width: 87%; background: linear-gradient(90deg, #1468E8, #D63D9D); border-radius: 100px; }
        .cta-note-stat { font-size: 12px; font-weight: 700; color: #1468E8; font-family: var(--font-body); }

        @media (max-width: 820px) {
          .cta-grid { grid-template-columns: 1fr; gap: 24px; }
          .cta-cards { display: none; }
        }
      `}</style>

      <motion.div className={`cta-box${onDark ? ' on-dark' : ''}`} style={boxBg ? { background: boxBg } : undefined} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="cta-grid">
          {/* Left — copy + CTA (button matches the rest of the site) */}
          <div>
            <p className="cta-eyebrow">{eyebrow}</p>
            <h2 className="cta-h">
              {heading ?? <>Ready to stand out?</>}
            </h2>
            <p className="cta-body">{body}</p>
            <div className="cta-btns">
              <a href={primaryHref} className="cta-btn-primary">
                {primaryLabel} <ArrowRight size={15} />
              </a>
              {secondaryLabel && (
                <a href={secondaryHref} className="cta-btn-secondary">
                  {secondaryLabel}
                </a>
              )}
            </div>
            <p className="cta-fine">{footnote}</p>
          </div>

          {/* Right — custom visual, or the default video-resume card */}
          {visual ?? (
          <div className="cta-cards">
            <div className="cta-card cta-card-a">
              <div className="cta-vid">
                <video src="/videos/cta-resume.mp4" poster="/videos/pip-person-poster.jpg" autoPlay muted loop playsInline />
                <span className="cta-vid-tag">Video intro</span>
                <span className="cta-vid-dur">0:47</span>
                <div className="cta-vid-cap">
                  <p className="cta-vid-name">Daniel Chen</p>
                  <p className="cta-vid-role">Business Dev Rep · his Reslink</p>
                </div>
              </div>
            </div>

            <div className="cta-card cta-card-b">
              <div className="top">
                <span className="cta-note-av">
                  <svg width="19" height="19" viewBox="0 0 32 32" fill="none" aria-label="HubSpot">
                    <path d="M8.6 9.4 L16.5 15.8 M24 8 L20.6 13.4 M13 25 L16.4 20.4" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
                    <circle cx="18.6" cy="17.4" r="4.7" stroke="#fff" strokeWidth="3" fill="none" />
                    <circle cx="7" cy="8" r="3.1" fill="#fff" />
                    <circle cx="25" cy="6.2" r="2.5" fill="#fff" />
                    <circle cx="11.6" cy="26.4" r="3" fill="#fff" />
                  </svg>
                </span>
                <div>
                  <p className="cta-note-t">Recruiter at HubSpot viewed you</p>
                  <p className="cta-note-s">2 minutes ago</p>
                </div>
              </div>
              <div className="cta-note-bar"><span /></div>
              <p className="cta-note-stat">Watched 87% · 52s of 60s</p>
            </div>
          </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
