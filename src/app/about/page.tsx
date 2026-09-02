'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoryTimeline from '@/components/StoryTimeline';
import CTA from '@/components/CTA';
import CandidateReel from '@/components/CandidateReel';

const TEAM = [
  {
    name: 'Dominic Giacona',
    initials: 'DG',
    color: '#1468E8',
    title: 'Co-founder & CEO',
    bio: 'Dominic built Reslink after experiencing firsthand how qualified candidates get overlooked because a PDF can\'t capture who they really are. He\'s obsessed with giving every job seeker the same shot as the one with the insider referral.',
    linkedin: 'https://www.linkedin.com/in/dominicgiacona/',
    photo: '/team/dominic.webp',
  },
  {
    name: 'Joana Rocha',
    initials: 'JR',
    color: '#7C3AED',
    title: 'Co-founder & CMO',
    bio: 'Joana brings five years of growth leadership across tech startups. At TechTalk she helped thousands of job seekers get noticed. now she\'s building the brand and community that makes Reslink the default for video-first hiring.',
    linkedin: 'https://www.linkedin.com/in/joana-rochaa/',
    photo: '/team/joana.webp',
  },
  {
    name: 'Roxanne Taku',
    initials: 'RT',
    color: '#E11D48',
    title: 'Co-founder & CRO',
    bio: 'Roxanne is a GTM and revenue leader with over five years in sales and revenue operations. She led commercial strategy at TechTalk before joining forces with Dominic and Joana to build the go-to-market engine at Reslink.',
    linkedin: 'https://www.linkedin.com/in/roxanne-taku/',
    photo: '/team/roxanne.webp',
  },
  {
    name: 'Dan London',
    initials: 'DL',
    color: '#059669',
    title: 'COO',
    bio: 'Dan is a seasoned executive with a track record of scaling SaaS companies from early-stage to market leadership. He advises Reslink on strategy, fundraising, and building the organizational foundation for sustainable growth.',
    linkedin: null,
    photo: '/team/dan-new.jpg',
  },
  {
    name: 'Taylor Bagwell',
    initials: 'TB',
    color: '#0891B2',
    title: 'CTO',
    bio: 'Taylor brings deep engineering expertise that helps Reslink build fast, reliable, and scalable infrastructure. His guidance shapes the technical decisions that let the team move quickly without cutting corners.',
    linkedin: 'https://www.linkedin.com/in/taylor-bagwell-824bba117/',
    photo: '/team/taylor-new.jpg',
  },
];

const VALUES = [
  {
    num: '01',
    title: 'Your story is your edge',
    body: 'Credentials open doors. Personality closes deals. Reslink is where who you are stops being the thing nobody asks about.',
  },
  {
    num: '02',
    title: 'Be seen, not skimmed',
    body: 'A resume gets scanned in seconds. A Reslink gets watched, and then forwarded to the person who makes the decision.',
  },
  {
    num: '03',
    title: 'Better information, both directions',
    body: 'A hiring decision made from two pages is a guess. Both sides deserve more to go on before anyone commits to an interview.',
  },
  {
    num: '04',
    title: 'Built for real stakes',
    body: 'Job searching is one of the most stressful things a person can do. Every feature we ship is built for someone who needs this to work.',
  },
];

function TeamCard({ member }: { member: typeof TEAM[0] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', background: '#F0F1F3', boxShadow: '0 4px 24px rgba(6,26,58,0.18)', aspectRatio: '3/5', transform: 'translateZ(0)' }}>
      {/* Full-bleed photo — backgrounds pre-corrected to a shared warm-grey tone */}
      <img
        src={member.photo}
        alt={member.name}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />

      {/* Full-card dark backdrop when bio is open */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,26,58,0.72)', opacity: expanded ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none' }} />

      {/* Gradient overlay. always visible at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(6,26,58,0.98) 0%, rgba(6,26,58,0.75) 55%, transparent 100%)', padding: '0 20px 20px' }}>

        {/* Collapsible bio */}
        <div style={{ overflow: 'hidden', maxHeight: expanded ? '180px' : '0px', opacity: expanded ? 1 : 0, transition: 'max-height 0.35s ease, opacity 0.3s ease', marginBottom: expanded ? '14px' : '0' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{member.bio}</p>
        </div>

        {/* Name + title + buttons */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <p style={{ fontSize: '17px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{member.name}</p>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#D7FF43', fontFamily: 'var(--font-body)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{member.title}</p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <div
              onClick={() => member.linkedin && window.open(member.linkedin, '_blank', 'noopener,noreferrer')}
              style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: member.linkedin ? 'pointer' : 'default', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </div>
            <button
              onClick={() => setExpanded(p => !p)}
              style={{ width: '32px', height: '32px', borderRadius: '8px', background: expanded ? '#D7FF43' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={expanded ? '#061A3A' : '#fff'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Inset glass border — sits above photo and overlays */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.22)', pointerEvents: 'none', zIndex: 10 }} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(170deg, #FAEBF3 0%, #ECE9F6 100%)', padding: 'clamp(72px, 9vw, 120px) 24px clamp(96px, 12vw, 168px)', position: 'relative', overflow: 'hidden' }}>
          {/* Soft ambient brand tint, matching the home hero */}
          <div aria-hidden style={{ position: 'absolute', top: '-150px', right: '-120px', width: '640px', height: '520px', background: 'radial-gradient(ellipse at center, rgba(214,61,157,0.10), transparent 66%)', pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', top: '-60px', right: '180px', width: '520px', height: '460px', background: 'radial-gradient(ellipse at center, rgba(20,104,232,0.08), transparent 66%)', pointerEvents: 'none' }} />
          <style>{`
            .about-hero-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 44px; align-items: center; }
            .ah-h1 { font-family: var(--font-phudu); font-size: clamp(44px, 6.6vw, 78px); font-weight: 900; line-height: 0.92; letter-spacing: -0.03em; color: #061A3A; margin-bottom: 26px; }
            .ah-hl-half { background: linear-gradient(#D7FF43, #D7FF43) no-repeat; background-size: 100% 0.34em; background-position: 0 calc(100% - 0.1em); padding: 0 0.05em; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
            .ah-sub { font-size: clamp(16px, 2vw, 20px); color: #5C6070; line-height: 1.6; font-family: var(--font-body); max-width: 500px; margin: 0; }
            .ah-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 30px; }
            .ah-ctas .btn-outline:hover { background: transparent; }
            .ah-proof { display: flex; align-items: center; gap: 12px; margin-top: 22px; }
            .ah-proof-avatars { display: flex; }
            .ah-proof-avatars img { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #fff; display: block; object-fit: cover; }
            .ah-proof-avatars img + img { margin-left: -8px; }
            .ah-proof-text { font-size: 13px; color: #9AA1AE; font-family: var(--font-body); }
            .ah-proof-text strong { color: #061A3A; font-weight: 700; }
            .ah-quote { display: inline-block; background: #061A3A; border-radius: 15px; padding: 16px 26px; margin: 26px 0 0; }
            .ah-quote-eyebrow { font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #D7FF43; margin: 0 0 10px; }
            .ah-quote-text { font-family: var(--font-phudu); text-transform: uppercase; font-size: clamp(16px, 1.8vw, 22px); font-weight: 900; color: #fff; line-height: 1; letter-spacing: -0.01em; margin: 0; white-space: nowrap; }
            @media (max-width: 540px) { .ah-quote-text { white-space: normal; line-height: 1.2; } }
            .ah-visual { position: relative; }
            @media (max-width: 860px) {
              .about-hero-grid { grid-template-columns: 1fr; gap: 60px; }
              .ah-visual { order: 1; }
            }
          `}</style>
          <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="about-hero-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>About us</p>
                <h1 className="ah-h1">
                  Hiring is a<br />
                  <span className="ah-hl-half">human</span> decision
                </h1>
                <p className="ah-sub">
                  At Reslink, we help candidates show who they really are, and give companies a way to see it.
                </p>
                <div className="ah-ctas">
                  <a href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
                    Get started for free
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </a>
                  <a href="/oliviastone" className="btn-outline" style={{ fontSize: '15px', padding: '14px 26px' }}>
                    See a real Reslink
                  </a>
                </div>
                <div className="ah-proof">
                  <span className="ah-proof-avatars">
                    {['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg', '/avatars/a4.jpg', '/avatars/a5.jpg'].map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={src} src={src} alt="" />
                    ))}
                  </span>
                  <span className="ah-proof-text"><strong>10,000+</strong> job seekers · free to start</span>
                </div>
              </motion.div>
              <motion.div
                className="ah-visual"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.15 }}
              >
                <CandidateReel />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Mission + impact stats ── */}
        <section style={{ background: '#fff', padding: 'clamp(64px, 8vw, 104px) 24px' }}>
          <style>{`
            .ms-top { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 5vw, 80px); align-items: start; margin-bottom: clamp(40px, 5vw, 60px); }
            .ms-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .ms-stat { background: #fff; border: 1px solid #ECEEF1; border-radius: 18px; padding: clamp(24px, 3vw, 34px); box-shadow: 0 1px 8px rgba(6,26,58,0.04); }
            .ms-stat-bar { width: 34px; height: 6px; border-radius: 100px; margin-bottom: clamp(18px, 3vw, 40px); }
            .ms-stat-num { font-family: var(--font-phudu); font-size: clamp(30px, 3.6vw, 44px); font-weight: 900; color: #061A3A; line-height: 0.95; letter-spacing: -0.03em; }
            .ms-stat-label { font-size: 14px; color: #5C6070; font-family: var(--font-body); margin-top: 12px; line-height: 1.5; }
            @media (max-width: 820px) {
              .ms-top { grid-template-columns: 1fr; gap: 20px; }
              .ms-stats { grid-template-columns: 1fr; }
            }
          `}</style>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="ms-top">
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 900, color: '#061A3A', lineHeight: 1.02, letterSpacing: '-0.03em' }}>
                  A resume tells you what<br />someone did. Never<br />who they are.
                </h2>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: '#5C6070', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>
                  Energy, judgement, the way someone thinks. None of it survives a PDF. So the people who lose out aren&rsquo;t the least qualified. They just don&rsquo;t read well on paper. And the person who&rsquo;d have been brilliant in the room never gets into it.
                </p>
              </div>
            </motion.div>
            <div className="ms-stats">
              {[
                { num: '8,000+', label: 'job seekers using Reslink', bar: '#1468E8' },
                { num: '10 THOUSAND+', label: 'hours of Reslinks recorded', bar: '#C2E532' },
                { num: '16–18', label: 'average Reslinks to find the ideal applicant', bar: '#D63D9D' },
              ].map((s, i) => (
                <motion.div key={s.label} className="ms-stat"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}>
                  <div className="ms-stat-bar" style={{ background: s.bar }} />
                  <p className="ms-stat-num">{s.num}</p>
                  <p className="ms-stat-label">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Story timeline ── */}
        <StoryTimeline />

        {/* ── Values ── */}
        <section style={{ background: '#061A3A', padding: 'clamp(72px, 9vw, 112px) 24px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '820px', height: '420px', background: 'radial-gradient(ellipse at center, rgba(20,104,232,0.1), transparent 66%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ marginBottom: '56px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>What we stand for</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Four principles we<br />refuse to compromise on
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }} className="values-grid">
              <style>{`
                .values-grid { }
                @media (max-width: 640px) { .values-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {VALUES.map((v, i) => (
                <motion.div key={v.num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ padding: 'clamp(28px, 4vw, 44px)', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '14px', fontWeight: 900, color: '#D7FF43', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>{v.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '14px' }}>{v.title}</h3>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ marginBottom: '56px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>The people behind it</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Built by people who&rsquo;ve<br />been on both sides
              </h2>
            </motion.div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', maxWidth: '972px', margin: '0 auto' }} className="team-grid">
              <style>{`
                .team-grid > div { flex: 0 1 300px; }
                @media (max-width: 480px) { .team-grid > div { flex: 0 1 300px; } }
              `}</style>
              {TEAM.map((m) => <TeamCard key={m.name} member={m} />)}
            </div>
          </div>
        </section>

        {/* ── Join us (blue-gradient CTA box) ── */}
        <CTA
          sectionBg="#fff"
          boxBg="radial-gradient(ellipse 52% 64% at 93% 0%, rgba(214,61,157,0.42), transparent 52%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)"
          onDark
          eyebrow="Join the mission"
          heading={<>Come build<br />it with us</>}
          body="We're a small team solving something that affects almost everyone at some point. If that sounds like your kind of problem, we'd like to meet you."
          primaryLabel="See open positions"
          primaryHref="/careers"
          secondaryLabel=""
          footnote=""
          visual={
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 22px 55px rgba(6,26,58,0.16)', aspectRatio: '3 / 2' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/team/about-team.webp" alt="The Reslink team" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          }
        />

      </main>
      <Footer />
    </>
  );
}
