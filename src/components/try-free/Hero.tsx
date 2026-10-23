'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Mail, Globe, Link2, Pause, Download } from 'lucide-react';
import { APP_SIGNUP_URL } from '@/lib/links';

const LIME_HIGHLIGHT = {
  background: 'linear-gradient(#D7FF43, #D7FF43) no-repeat',
  backgroundSize: '100% 0.34em',
  backgroundPosition: '0 calc(100% - 0.1em)',
  padding: '0 0.05em',
  WebkitBoxDecorationBreak: 'clone',
  boxDecorationBreak: 'clone',
} as const;

const EXPERTISE = ['Business development', 'Territory expansion', 'Account management', 'Cold calling', 'Data analysis', 'Salesforce'];
const AVATARS = ['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg', '/avatars/a4.jpg', '/avatars/a5.jpg'];

export default function Hero() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #FBF0F6 0%, #F6F8FC 45%, #EAF1FF 100%)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .tf-hero-grid { max-width: 1120px; margin: 0 auto; padding: clamp(64px, 8vw, 100px) 24px; display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(28px, 4vw, 56px); align-items: center; min-height: 600px; }
        .tf-hero-text { display: flex; flex-direction: column; }
        .tf-h1 { font-family: var(--font-phudu); font-size: clamp(52px, 5.4vw, 76px); font-weight: 900; line-height: 0.95; letter-spacing: -0.03em; color: #061A3A; margin-bottom: 24px; }
        .tf-sub { font-size: clamp(15px, 1.6vw, 17px); color: #5C6070; line-height: 1.7; max-width: 440px; margin: 0 0 36px; font-family: var(--font-body); }
        .tf-fine { font-size: 13px; color: #9AA1AE; font-family: var(--font-body); margin-top: 16px; }
        .tf-proof { display: flex; align-items: center; gap: 12px; margin-top: 26px; }
        .tf-proof-avatars { display: flex; }
        .tf-proof-avatars img { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #fff; object-fit: cover; margin-left: -9px; }
        .tf-proof-avatars img:first-child { margin-left: 0; }

        /* ── Resume card ── */
        .tf-visual { position: relative; }
        .tf-card { position: relative; background: #fff; border-radius: 22px; box-shadow: 0 34px 90px rgba(6,26,58,0.18); border: 1px solid #ECEEF1; transform: translateX(40px); }
        .tf-card-head { position: relative; border-radius: 22px 22px 0 0; overflow: hidden; padding: 18px 24px; background: radial-gradient(ellipse 55% 120% at 97% 0%, rgba(124,58,214,0.42), transparent 55%), linear-gradient(135deg, #0A2049 0%, #0A1430 100%); }
        .tf-head-row { display: flex; align-items: center; gap: 15px; position: relative; z-index: 1; }
        .tf-avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 2px solid rgba(255,255,255,0.18); }
        .tf-head-info { min-width: 0; }
        .tf-name { font-family: var(--font-phudu); font-size: 22px; font-weight: 900; color: #fff; letter-spacing: -0.01em; line-height: 1.0; text-transform: uppercase; }
        .tf-role { font-size: 13px; color: rgba(255,255,255,0.74); font-family: var(--font-body); margin-top: 3px; }
        .tf-meta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 7px; }
        .tf-meta span { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: rgba(255,255,255,0.5); font-family: var(--font-body); }
        .tf-meta svg { color: rgba(255,255,255,0.4); }
        .tf-links { display: flex; gap: 8px; margin-top: 10px; }
        .tf-link-pill { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); color: #fff; font-size: 12px; font-weight: 600; border-radius: 100px; padding: 6px 13px; font-family: var(--font-body); }
        .tf-head-btns { display: flex; gap: 10px; margin-left: auto; flex-shrink: 0; align-self: flex-start; }
        .tf-btn-lime { display: inline-flex; align-items: center; gap: 6px; background: #D7FF43; color: #061A3A; font-size: 13px; font-weight: 700; border-radius: 10px; padding: 10px 16px; font-family: var(--font-body); white-space: nowrap; }
        .tf-btn-dark { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85); font-size: 13px; font-weight: 600; border-radius: 10px; padding: 10px 16px; font-family: var(--font-body); white-space: nowrap; border: 1px solid rgba(255,255,255,0.16); }

        .tf-body { padding: 16px 24px 18px; position: relative; }
        .tf-eyebrow { font-size: 10.5px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #1468E8; font-family: var(--font-body); margin-bottom: 6px; }
        .tf-summary { font-size: 13px; color: #5C6070; line-height: 1.55; font-family: var(--font-body); margin: 0 0 14px; max-width: 480px; }
        .tf-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 14px; }
        .tf-tag { font-size: 11.5px; font-weight: 600; color: #3A4658; background: #F1F3F7; border: 1px solid #E7EAF0; border-radius: 100px; padding: 5px 12px; font-family: var(--font-body); }
        .tf-exp-row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin-bottom: 6px; }
        .tf-exp-co { font-size: 15px; font-weight: 800; color: #061A3A; font-family: var(--font-body); }
        .tf-exp-date { font-size: 11px; color: #9AA1AE; font-family: var(--font-mono, ui-monospace, monospace); white-space: nowrap; }
        .tf-exp-pts { list-style: disc; padding-left: 18px; margin: 0; display: flex; flex-direction: column; gap: 6px; }
        .tf-exp-pts li { font-size: 12.5px; color: #5C6070; line-height: 1.5; font-family: var(--font-body); }

        /* Floating video PiP */
        .tf-pip { position: absolute; top: 96px; right: -18px; width: 118px; height: 150px; border-radius: 14px; overflow: hidden; box-shadow: 0 18px 44px rgba(0,0,0,0.3); border: 3px solid #fff; z-index: 3; background: #0B0F1A; }
        .tf-pip video { width: 100%; height: 100%; object-fit: cover; }
        .tf-pip-tag { position: absolute; left: 7px; bottom: 7px; display: inline-flex; align-items: center; gap: 5px; background: rgba(6,20,44,0.78); color: #fff; font-size: 9.5px; font-weight: 600; border-radius: 100px; padding: 3px 8px 3px 6px; font-family: var(--font-body); }
        .tf-pip-dot { width: 6px; height: 6px; border-radius: 50%; background: #D7FF43; }

        /* Floating notification */
        .tf-note { position: absolute; bottom: -28px; right: -16px; width: 306px; background: #fff; border-radius: 16px; box-shadow: 0 24px 58px rgba(6,26,58,0.2); border: 1px solid #EEF0F3; padding: 15px 17px; z-index: 4; }
        .tf-note-top { display: flex; align-items: center; gap: 11px; margin-bottom: 12px; }
        .tf-note-av { width: 38px; height: 38px; border-radius: 50%; background: #635BFF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .tf-note-av span { color: #fff; font-weight: 800; font-size: 10px; font-family: var(--font-body); letter-spacing: -0.03em; }
        .tf-note-t { font-size: 13px; font-weight: 700; color: #061A3A; font-family: var(--font-body); line-height: 1.3; }
        .tf-note-s { font-size: 11.5px; color: #9AA1AE; font-family: var(--font-body); margin-top: 3px; }
        .tf-note-bar { height: 6px; border-radius: 100px; background: #E7EDF6; overflow: hidden; margin-bottom: 8px; }
        .tf-note-bar > span { display: block; height: 100%; width: 87%; background: linear-gradient(90deg, #1468E8, #D63D9D); border-radius: 100px; }
        .tf-note-stat { font-size: 12.5px; font-weight: 700; color: #1468E8; font-family: var(--font-body); }

        @media (max-width: 920px) {
          .tf-hero-grid { grid-template-columns: 1fr; gap: 36px; text-align: center; min-height: 0; padding: clamp(44px, 7vw, 68px) 24px clamp(40px, 7vw, 60px); }
          .tf-hero-text { align-items: center; }
          .tf-sub { max-width: 440px; }
          .tf-proof { justify-content: center; }
          .tf-visual { max-width: 520px; margin: 0 auto; width: 100%; }
          /* The desktop scale() leaves an empty layout box around the card
             (a big gap once stacked); render it full size on mobile. */
          /* The grid centres text on mobile for the left column; the card keeps
             its own left alignment (name, role, summary) like on desktop. */
          .tf-card { transform: none; text-align: left; }
        }
        @media (max-width: 600px) {
          .tf-h1 { font-size: clamp(56px, 15vw, 66px); }
          .tf-head-btns { display: none; }
          .tf-pip { width: 92px; height: 118px; top: 78px; right: -8px; }
          .tf-note { right: 0; left: 0; margin: 0 auto; width: calc(100% - 24px); bottom: -30px; }
        }
      `}</style>

      <div className="tf-hero-grid">
        {/* ── Left: copy ── */}
        <motion.div className="tf-hero-text" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="tf-h1">
            Get more<br />interviews,{' '}
            <span style={LIME_HIGHLIGHT}>faster</span>
          </h1>
          <p className="tf-sub">Add a 60-second video to every application, and find out who actually watched.</p>
          <div>
            <Link href={APP_SIGNUP_URL} className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Create your free Reslink
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </div>
          <p className="tf-fine">Free to start · under 5 minutes · no card needed</p>
          <div className="tf-proof">
            <div className="tf-proof-avatars">
              {AVATARS.map(a => (/* eslint-disable-next-line @next/next/no-img-element */ <img key={a} src={a} alt="" />))}
            </div>
            <span style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}><b style={{ color: '#061A3A', fontWeight: 700 }}>8,000+</b> job seekers</span>
          </div>
        </motion.div>

        {/* ── Right: Olivia Stone video resume card ── */}
        <motion.div className="tf-visual" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}>
          <div className="tf-card">
            <div className="tf-card-head">
              <div className="tf-head-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="tf-avatar" src="/videos/pip-person-poster.jpg" alt="Olivia Stone" />
                <div className="tf-head-info">
                  <p className="tf-name">Olivia Stone</p>
                  <p className="tf-role">Business Development Representative</p>
                  <div className="tf-meta">
                    <span><MapPin size={12} /> London, UK</span>
                    <span><Mail size={12} /> olivia@example.com</span>
                  </div>
                  <div className="tf-links">
                    <span className="tf-link-pill"><Globe size={12} /> Portfolio</span>
                    <span className="tf-link-pill"><Link2 size={12} /> LinkedIn</span>
                  </div>
                </div>
                <div className="tf-head-btns">
                  <span className="tf-btn-lime"><Pause size={12} fill="#061A3A" strokeWidth={0} /> Pause intro</span>
                  <span className="tf-btn-dark"><Download size={12} /> Resume</span>
                </div>
              </div>
            </div>

            <div className="tf-body">
              <p className="tf-eyebrow">Summary</p>
              <p className="tf-summary">Business development representative with two years in prospecting, closing and project management. Builds repeatable outbound processes and likes the deals nobody else wants to touch.</p>

              <p className="tf-eyebrow">Areas of expertise</p>
              <div className="tf-tags">
                {EXPERTISE.map(t => <span key={t} className="tf-tag">{t}</span>)}
              </div>

              <p className="tf-eyebrow">Experience</p>
              <div className="tf-exp-row">
                <span className="tf-exp-co">HubSpot</span>
                <span className="tf-exp-date">Jan 2020 – Jan 2023</span>
              </div>
              <ul className="tf-exp-pts">
                <li>Launched three product lines into untapped markets, generating £1.5M in six months.</li>
                <li>Changed the pricing approach, lifting average deal size across the team.</li>
              </ul>
            </div>

            {/* Video intro, playing */}
            <div className="tf-pip">
              <video src="/videos/pip-person-compressed.mp4" poster="/videos/pip-person-poster.jpg" autoPlay muted loop playsInline preload="metadata" />
              <span className="tf-pip-tag"><span className="tf-pip-dot" /> Intro playing</span>
            </div>

            {/* Watched notification */}
            <motion.div className="tf-note" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}>
              <div className="tf-note-top">
                <span className="tf-note-av"><span>stripe</span></span>
                <div>
                  <p className="tf-note-t">Recruiter at Stripe opened your Reslink</p>
                  <p className="tf-note-s">2 minutes ago</p>
                </div>
              </div>
              <div className="tf-note-bar"><span /></div>
              <p className="tf-note-stat">Watched 87% · 52s of 60s</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
