'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const POSTS = [
  { slug: 'video-resume-tips', tag: 'Career Tips', title: '7 things top candidates do differently in their video resume', excerpt: 'After analyzing thousands of Reslink profiles, we found the patterns that separate the callbacks from the silence.', author: 'Dominic Giacona', date: 'Jun 10, 2026', read: '5 min', color: '#0C63E3', bg: '#EEF4FF' },
  { slug: 'stand-out-to-recruiters', tag: 'Recruiting', title: 'What recruiters actually want to see (and it\'s not your GPA)', excerpt: 'We spoke to 30 hiring managers at companies ranging from early-stage startups to Fortune 500s. Here\'s what they said.', author: 'Joana Rocha', date: 'Jun 3, 2026', read: '7 min', color: '#7C3AED', bg: '#F3EEFF' },
  { slug: 'video-resume-script', tag: 'Guides', title: 'How to write a 90-second video resume script that gets responses', excerpt: 'The script is everything. Get it wrong and no amount of production quality will save you. Get it right and everything else is secondary.', author: 'Roxanne Taku', date: 'May 28, 2026', read: '6 min', color: '#059669', bg: '#ECFDF5' },
  { slug: 'agencies-video-hiring', tag: 'Recruiting', title: 'Why recruitment agencies are switching to video-first candidate profiles', excerpt: 'The agencies placing the most candidates aren\'t just using video — they\'re building their entire process around it.', author: 'Dominic Giacona', date: 'May 20, 2026', read: '4 min', color: '#D97706', bg: '#FFFBEB' },
  { slug: 'career-change-video', tag: 'Career Tips', title: 'Changing careers? Here\'s why a video resume changes everything', excerpt: 'A PDF resume forces a career-changer to explain gaps and pivots in bullet points. A video lets you reframe your whole story.', author: 'Joana Rocha', date: 'May 14, 2026', read: '5 min', color: '#E11D48', bg: '#FFF1F2' },
  { slug: 'university-career-centers', tag: 'Universities', title: 'How universities are using Reslink to get students hired faster', excerpt: 'Career centers at 12 universities are now recommending Reslink as the first step in their job-search playbook.', author: 'Roxanne Taku', date: 'May 6, 2026', read: '4 min', color: '#0891B2', bg: '#ECFEFF' },
];

const TAGS = ['All', 'Career Tips', 'Guides', 'Recruiting', 'Universities'];

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? POSTS : POSTS.filter(p => p.tag === active);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(72px, 10vw, 120px) 24px clamp(64px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Blog</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '24px' }}>
                Guides, tips &<br />career intel.
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                Everything you need to land more interviews and stand out in a crowded job market.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter + grid */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(48px, 6vw, 80px) 24px clamp(72px, 9vw, 112px)' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>

            {/* Tag filter */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {TAGS.map(t => (
                <button key={t} onClick={() => setActive(t)}
                  style={{ padding: '8px 18px', borderRadius: '100px', border: '1.5px solid', borderColor: active === t ? '#0C63E3' : '#ECEEF1', background: active === t ? '#0C63E3' : '#fff', color: active === t ? '#fff' : '#5C6070', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.15s' }}>
                  {t}
                </button>
              ))}
            </div>

            {/* Post grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="blog-grid">
              <style>{`
                .blog-grid { }
                @media (max-width: 900px) { .blog-grid { grid-template-columns: 1fr 1fr !important; } }
                @media (max-width: 600px) { .blog-grid { grid-template-columns: 1fr !important; } }
              `}</style>
              {filtered.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '28px', height: '100%', boxSizing: 'border-box', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(4,22,53,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(4,22,53,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                      <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: post.color, background: post.bg, borderRadius: '100px', padding: '3px 10px', fontFamily: 'var(--font-body)', marginBottom: '16px', letterSpacing: '0.05em' }}>{post.tag}</span>
                      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '20px', fontWeight: 900, color: '#041635', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '12px' }}>{post.title}</h3>
                      <p style={{ fontSize: '13px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>{post.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontSize: '12px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>{post.author}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{post.date}</p>
                            <span style={{ color: '#ECEEF1' }}>·</span>
                            <Clock size={10} color="#9A9FA8" />
                            <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{post.read} read</p>
                          </div>
                        </div>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: post.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ArrowRight size={14} color={post.color} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
