'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TEAM = [
  {
    name: 'Dominic Giacona',
    initials: 'DG',
    color: '#0C63E3',
    title: 'Co-founder & CEO',
    bio: 'Dominic built Reslink after experiencing firsthand how qualified candidates get overlooked because a PDF can\'t capture who they really are. He\'s obsessed with giving every job seeker the same shot as the one with the insider referral.',
    linkedin: 'https://linkedin.com/in/dominicgiacona',
    photo: '/team/dominic.webp',
  },
  {
    name: 'Joana Rocha',
    initials: 'JR',
    color: '#7C3AED',
    title: 'Co-founder & CMO',
    bio: 'Joana brings five years of growth leadership across tech startups. At TechTalk she helped thousands of job seekers get noticed. now she\'s building the brand and community that makes Reslink the default for video-first hiring.',
    linkedin: 'https://linkedin.com/in/joanarochaa',
    photo: '/team/joana.webp',
  },
  {
    name: 'Roxanne Taku',
    initials: 'RT',
    color: '#E11D48',
    title: 'Co-founder & CRO',
    bio: 'Roxanne is a GTM and revenue leader with over five years in sales and revenue operations. She led commercial strategy at TechTalk before joining forces with Dominic and Joana to build the go-to-market engine at Reslink.',
    linkedin: 'https://linkedin.com/in/roxannetaku',
    photo: '/team/roxanne.webp',
  },
  {
    name: 'Taylor Bagwell',
    initials: 'TB',
    color: '#0891B2',
    title: 'CTO',
    bio: 'Taylor brings deep engineering expertise that helps Reslink build fast, reliable, and scalable infrastructure. His guidance shapes the technical decisions that let the team move quickly without cutting corners.',
    linkedin: null,
    photo: '/team/taylor.png',
  },
  {
    name: 'Dan London',
    initials: 'DL',
    color: '#059669',
    title: 'Executive Adviser',
    bio: 'Dan is a seasoned executive with a track record of scaling SaaS companies from early-stage to market leadership. He advises Reslink on strategy, fundraising, and building the organizational foundation for sustainable growth.',
    linkedin: null,
    photo: '/team/dan.webp',
  },
];

const VALUES = [
  {
    num: '01',
    title: 'Your story is your edge',
    body: 'Credentials open doors. Personality closes deals. Reslink is where who you are becomes your greatest competitive advantage.',
  },
  {
    num: '02',
    title: 'Be seen, not skimmed',
    body: 'A resume gets scanned in seconds. A Reslink gets watched, remembered, and shared. We give your story the stage it deserves.',
  },
  {
    num: '03',
    title: 'Connection over credentials',
    body: 'The best hire is rarely the most impressive resume. We believe authentic human connection should drive every hiring decision.',
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
    <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', background: '#fff', boxShadow: '0 4px 24px rgba(4,22,53,0.18)', aspectRatio: '3/4', transform: 'translateZ(0)' }}>
      {/* Full-bleed photo */}
      <img
        src={member.photo}
        alt={member.name}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />

      {/* Full-card dark backdrop when bio is open */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,22,53,0.72)', opacity: expanded ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none' }} />

      {/* Gradient overlay. always visible at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(4,22,53,0.98) 0%, rgba(4,22,53,0.75) 55%, transparent 100%)', padding: '0 20px 20px' }}>

        {/* Collapsible bio */}
        <div style={{ overflow: 'hidden', maxHeight: expanded ? '180px' : '0px', opacity: expanded ? 1 : 0, transition: 'max-height 0.35s ease, opacity 0.3s ease', marginBottom: expanded ? '14px' : '0' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{member.bio}</p>
        </div>

        {/* Name + title + buttons */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px' }}>
          <div>
            <p style={{ fontSize: '17px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{member.name}</p>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#D8F950', fontFamily: 'var(--font-body)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{member.title}</p>
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
              style={{ width: '32px', height: '32px', borderRadius: '8px', background: expanded ? '#D8F950' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={expanded ? '#041635' : '#fff'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
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
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>

        {/* ── Hero ── */}
        <section style={{ background: '#041635', padding: 'clamp(80px, 11vw, 140px) 24px clamp(80px, 11vw, 130px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '700px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.28), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(ellipse, rgba(216,249,80,0.07), transparent 60%)', pointerEvents: 'none' }} />
          <style>{`
            .about-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
            .about-hero-img { border-radius: 20px; overflow: hidden; }
            @media (max-width: 760px) {
              .about-hero-grid { grid-template-columns: 1fr; gap: 40px; }
              .about-hero-img { order: -1; }
            }
          `}</style>
          <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="about-hero-grid">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>Our story</p>
                <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 4.8vw, 66px)', fontWeight: 900, color: '#fff', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                  You're more<br />
                  <span style={{ color: '#D8F950' }}>than a PDF.</span>
                </h1>
                <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '40px' }}>
                  Reslink exists because a PDF has never been able to capture what makes a person worth hiring. We built the platform that finally changes that.
                </p>
                <div style={{ display: 'flex', gap: '16px 32px', flexWrap: 'wrap' }}>
                  {[['10,000+', 'active job seekers'], ['300+', 'interviews landed globally'], ['50+', 'countries represented']].map(([val, label]) => (
                    <div key={label}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>{val}</p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginTop: '4px' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="about-hero-img"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.15 }}
              >
                <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
                  <img
                    src="/team/about-team.webp"
                    alt="Reslink team"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '20px', boxSizing: 'border-box' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.22)', pointerEvents: 'none' }} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Origin story ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }} className="about-story-grid">
              <style>{`
                .about-story-grid { }
                @media (max-width: 768px) { .about-story-grid { grid-template-columns: 1fr !important; } }
              `}</style>

              {/* Left. big pull quote */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.55 }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>Why we exist</p>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 900, color: '#041635', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                  The best candidates<br />were getting<br /><span style={{ color: '#041635', display: 'inline-block', position: 'relative' }}>
                    overlooked.
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/vector-underline.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: 'auto', pointerEvents: 'none' }} />
                  </span>
                </h2>
                <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
                  In 2024, Dominic was applying to jobs and watching qualified people. himself included. get passed over because their resume didn't capture who they actually were. Not their energy. Not their clarity. Not their drive. Just keywords on a page.
                </p>
              </motion.div>

              {/* Right. narrative */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.55, delay: 0.1 }}>
                <div style={{ background: '#041635', borderRadius: '20px', padding: 'clamp(28px, 4vw, 44px)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(12,99,227,0.25), transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D8F950' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Founded 2024</span>
                    </div>
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontFamily: 'var(--font-body)', marginBottom: '20px' }}>
                      He built the first version of Reslink with one goal: let candidates show up as themselves. Within months, the platform attracted thousands of job seekers who were done being reduced to bullet points.
                    </p>
                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '20px 0' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0C63E3' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#9BB8FF', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>The team forms. 2025</span>
                    </div>
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
                      In 2025, Roxanne and Joana, founders of TechTalk, a company focused on getting candidates noticed, joined forces with Dominic. Their combined expertise in recruitment, GTM, and marketing turned Reslink into the platform it is today: the place where job seekers become unforgettable.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Mission statement ── */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.55 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '24px', fontFamily: 'var(--font-body)' }}>Our mission</p>
              <blockquote style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#041635', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                &ldquo;Every person has a story.<br />We exist to make sure it gets told.&rdquo;
              </blockquote>
              <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: '620px', margin: '0 auto' }}>
                Behind every resume is a person with a real story: a reason they care, a problem they've solved, a version of themselves that no bullet point could ever capture. Reslink was built to change that.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Values ── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 9vw, 112px) 24px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '500px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.2), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }}
              style={{ marginBottom: '56px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>What we stand for</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Four principles we<br />refuse to compromise on.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }} className="values-grid">
              <style>{`
                .values-grid { }
                @media (max-width: 640px) { .values-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {VALUES.map((v, i) => (
                <motion.div key={v.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ padding: 'clamp(28px, 4vw, 44px)', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-phudu)', fontSize: '14px', fontWeight: 900, color: '#D8F950', letterSpacing: '0.08em', display: 'block', marginBottom: '16px' }}>{v.num}</span>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '14px' }}>{v.title}</h3>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section style={{ background: '#fff', padding: 'clamp(72px, 9vw, 112px) 24px' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }}
              style={{ marginBottom: '56px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>The people behind it</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 900, color: '#041635', lineHeight: 0.93, letterSpacing: '-0.03em' }}>
                Built by people who've<br />felt the problem firsthand.
              </h2>
            </motion.div>

            {/* Top row: 3 founders */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }} className="team-founders-grid">
              <style>{`
                .team-founders-grid { }
                .team-bottom-grid { }
                @media (max-width: 768px) {
                  .team-founders-grid { grid-template-columns: 1fr 1fr !important; }
                  .team-bottom-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 480px) {
                  .team-founders-grid { grid-template-columns: 1fr !important; }
                  .team-bottom-grid { grid-template-columns: 1fr !important; }
                }
              `}</style>
              {TEAM.slice(0, 3).map((m) => <TeamCard key={m.name} member={m} />)}
            </div>

            {/* Bottom row: CTO + adviser — centered 2-col */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '760px', margin: '0 auto' }} className="team-bottom-grid">
              {TEAM.slice(3).map((m) => <TeamCard key={m.name} member={m} />)}
            </div>
          </div>
        </section>

        {/* ── Join us ── */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.25), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '999px' }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>Join the mission</p>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 6.5vw, 76px)', fontWeight: 900, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '22px' }}>
                Be part of<br /><span style={{ color: '#D8F950' }}>the story.</span>
              </h2>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: '40px' }}>
                Whether you're a job seeker ready to stand out, a company looking to hire better, or someone who wants to build with us. there's a place for you here.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/get-started" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
                  Create your Reslink. free
                  <ArrowRight size={15} />
                </Link>
                <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                  We&apos;re hiring →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
