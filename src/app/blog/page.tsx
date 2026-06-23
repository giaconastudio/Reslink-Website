'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, Clock, Bookmark, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const POSTS = [
  {
    slug: 'how-to-write-sales-resume',
    tag: 'Job Search Tips', tagColor: '#0C63E3', tagBg: '#EEF4FF',
    title: 'How to Write a Sales Resume That Gets Interviews (Examples + Templates)',
    excerpt: 'Learn how to write a winning sales resume with examples, templates, and tips to showcase your achievements.',
    author: 'Sarah Johnson', authorInitials: 'SJ',
    date: 'Mar 20, 2026', read: '8 min',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: true,
  },
  {
    slug: 'how-long-should-resume-be',
    tag: 'Job Search Tips', tagColor: '#0C63E3', tagBg: '#EEF4FF',
    title: 'How Long Should a Resume Be? The Complete Guide for Job Seekers',
    excerpt: 'Learn how long a resume should be, from entry-level to executive roles, with tips, examples, and best practices.',
    author: 'Michael Chen', authorInitials: 'MC',
    date: 'Mar 18, 2026', read: '5 min',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: false,
  },
  {
    slug: 'internship-resume-guide',
    tag: 'Job Search Tips', tagColor: '#0C63E3', tagBg: '#EEF4FF',
    title: 'Internship Resume Guide: How to Write One That Lands You Interviews',
    excerpt: 'Learn how to write an internship resume that stands out. Includes examples, templates, and tips from recruiters.',
    author: 'Sarah Johnson', authorInitials: 'SJ',
    date: 'Mar 15, 2026', read: '8 min',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: false,
  },
  {
    slug: 'showcase-soft-skills',
    tag: 'Job Search Tips', tagColor: '#0C63E3', tagBg: '#EEF4FF',
    title: 'How to Showcase Soft Skills on Your Resume (With Real Examples)',
    excerpt: 'Learn the top soft skills for resumes, how to showcase them effectively, and why employers care more than ever.',
    author: 'Michael Chen', authorInitials: 'MC',
    date: 'Mar 12, 2026', read: '5 min',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: true,
  },
  {
    slug: 'best-video-resume-tools',
    tag: 'Video Resume Tips', tagColor: '#7C3AED', tagBg: '#F3EEFF',
    title: 'The Best Video Resume Tools for Job Seekers (2026 Edition)',
    excerpt: 'Discover the best video resume tools in 2026 — including Loom.com, VEED.IO, and Reslink. Learn how to choose.',
    author: 'Roxanne Taku', authorInitials: 'RT',
    date: 'Mar 10, 2026', read: '5 min',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: false,
  },
  {
    slug: 'do-video-resumes-work',
    tag: 'Video Resume Tips', tagColor: '#7C3AED', tagBg: '#F3EEFF',
    title: 'Do Video Resumes Really Increase Your Chances of Getting an Interview?',
    excerpt: 'Can a video resume help you land more interviews? See the data, psychology, and best practices behind the trend.',
    author: 'Sarah Johnson', authorInitials: 'SJ',
    date: 'Mar 8, 2026', read: '5 min',
    image: 'https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: true,
  },
  {
    slug: 'resume-mistakes',
    tag: 'Job Search Tips', tagColor: '#0C63E3', tagBg: '#EEF4FF',
    title: '10 Resume Mistakes That Are Costing You Interviews',
    excerpt: 'Avoid these common resume mistakes that hiring managers see every day. Learn what to fix and how to fix it fast.',
    author: 'Roxanne Taku', authorInitials: 'RT',
    date: 'Mar 5, 2026', read: '6 min',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: false,
  },
  {
    slug: 'create-video-resume',
    tag: 'Video Resume Tips', tagColor: '#7C3AED', tagBg: '#F3EEFF',
    title: 'How to Create a Video Resume That Actually Gets You Hired',
    excerpt: 'Step-by-step guide to creating a video resume that hiring managers love. Includes scripts, tips, and examples.',
    author: 'Michael Chen', authorInitials: 'MC',
    date: 'Mar 3, 2026', read: '10 min',
    image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: false,
  },
  {
    slug: 'analytics-dashboard',
    tag: 'Product Updates', tagColor: '#059669', tagBg: '#ECFDF5',
    title: 'Product Update: Introducing Analytics Dashboard 2.0',
    excerpt: 'Get deeper insights into your Reslink performance with our new analytics dashboard. See what\'s new.',
    author: 'Dominic Giacona', authorInitials: 'DG',
    date: 'Mar 1, 2026', read: '4 min',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=900&h=500&fit=crop',
    hot: false,
  },
];

const TAGS = ['All', 'Product Updates', 'Video Resume Tips', 'Job Search Tips'];

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('Newest');
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = POSTS.filter(p => {
    const matchTag = active === 'All' || p.tag === active;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  const featured = filtered.slice(0, 2);
  const rest = filtered.slice(2);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          .blog-search-input::placeholder { color: rgba(255,255,255,0.35); }
          .blog-search-input:focus { outline: none; border-color: rgba(255,255,255,0.4) !important; }
          .blog-tag-btn:hover { background: rgba(255,255,255,0.12) !important; }
          .blog-card-img { transition: transform 0.4s ease; }
          .blog-card:hover .blog-card-img { transform: scale(1.04); }
          .blog-card { transition: box-shadow 0.2s, transform 0.2s; }
          .blog-card:hover { box-shadow: 0 12px 36px rgba(4,22,53,0.12) !important; transform: translateY(-2px); }
          .sort-btn:hover { background: #F7F8FA !important; }
          @media (max-width: 700px) { .featured-grid { grid-template-columns: 1fr !important; } .all-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 960px) { .all-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>

        {/* Hero / Search */}
        <section style={{ background: '#041635', padding: 'clamp(60px, 8vw, 100px) 24px clamp(48px, 6vw, 72px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '14px', fontFamily: 'var(--font-body)' }}>Blog</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 0.93, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                Guides, tips &<br />career intel.
              </h1>

              {/* Search bar */}
              <div style={{ position: 'relative', maxWidth: '520px', margin: '0 auto' }}>
                <Search size={16} color="rgba(255,255,255,0.45)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  className="blog-search-input"
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', color: '#fff', fontSize: '14px', fontFamily: 'var(--font-body)', boxSizing: 'border-box' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter bar */}
        <section style={{ background: '#fff', borderBottom: '1px solid #ECEEF1', padding: '0 24px', position: 'sticky', top: '68px', zIndex: 10 }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', padding: '14px 0' }}>
              {TAGS.map((t, i) => (
                <button key={t} onClick={() => setActive(t)}
                  style={{ padding: '7px 16px', borderRadius: '100px', border: '1.5px solid', borderColor: active === t ? '#0C63E3' : '#ECEEF1', background: active === t ? '#0C63E3' : '#fff', color: active === t ? '#fff' : '#5C6070', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {t}
                  <span style={{ fontSize: '11px', fontWeight: 700, background: active === t ? 'rgba(255,255,255,0.2)' : '#F0F2F5', color: active === t ? '#fff' : '#9A9FA8', borderRadius: '100px', padding: '1px 7px' }}>
                    {t === 'All' ? POSTS.length : POSTS.filter(p => p.tag === t).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button className="sort-btn" onClick={() => setSortOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: '1.5px solid #ECEEF1', background: '#fff', fontSize: '13px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <SlidersHorizontal size={13} color="#9A9FA8" />
                Sort: {sort}
                <ChevronDown size={12} color="#9A9FA8" />
              </button>
              {sortOpen && (
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', background: '#fff', border: '1px solid #ECEEF1', borderRadius: '10px', boxShadow: '0 8px 24px rgba(4,22,53,0.10)', zIndex: 20, minWidth: '140px', overflow: 'hidden' }}>
                  {['Newest', 'Oldest', 'Most Popular'].map(s => (
                    <button key={s} onClick={() => { setSort(s); setSortOpen(false); }}
                      style={{ display: 'block', width: '100%', padding: '10px 16px', background: sort === s ? '#EEF4FF' : '#fff', border: 'none', textAlign: 'left', fontSize: '13px', fontWeight: sort === s ? 700 : 500, color: sort === s ? '#0C63E3' : '#041635', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ background: '#F7F8FA', padding: 'clamp(40px, 5vw, 64px) 24px clamp(72px, 9vw, 112px)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#9A9FA8', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                No articles found. Try a different search.
              </div>
            ) : (
              <>
                {/* Featured */}
                {featured.length > 0 && (
                  <>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ display: 'inline-flex', width: '18px', height: '18px', background: '#D8F950', borderRadius: '4px', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={10} color="#041635" strokeWidth={2.5} />
                      </span>
                      Featured Articles
                    </p>
                    <div className="featured-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px' }}>
                      {featured.map((post, i) => (
                        <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                          <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                            <div className="blog-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', overflow: 'hidden', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
                              {/* Image */}
                              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                <img className="blog-card-img" src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                                  {post.hot && (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#D8F950', color: '#041635', fontSize: '11px', fontWeight: 800, borderRadius: '100px', padding: '3px 10px', fontFamily: 'var(--font-body)' }}>
                                      <TrendingUp size={9} strokeWidth={2.5} /> Trending
                                    </span>
                                  )}
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(4,22,53,0.55)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '11px', fontWeight: 600, borderRadius: '100px', padding: '3px 10px', fontFamily: 'var(--font-body)' }}>
                                    <Clock size={9} /> {post.read} read
                                  </span>
                                </div>
                                <button style={{ position: 'absolute', top: '12px', right: '12px', width: '30px', height: '30px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                  <Bookmark size={13} color="#041635" />
                                </button>
                              </div>
                              {/* Body */}
                              <div style={{ padding: '20px 22px 22px' }}>
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                  <span style={{ fontSize: '11px', fontWeight: 700, color: post.tagColor, background: post.tagBg, borderRadius: '100px', padding: '3px 10px', fontFamily: 'var(--font-body)' }}>Job Seeker</span>
                                  <span style={{ fontSize: '11px', fontWeight: 700, color: post.tagColor, background: post.tagBg, borderRadius: '100px', padding: '3px 10px', fontFamily: 'var(--font-body)' }}>{post.tag}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '19px', fontWeight: 900, color: '#041635', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '10px' }}>{post.title}</h3>
                                <p style={{ fontSize: '13px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '18px' }}>{post.excerpt}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-phudu)', flexShrink: 0 }}>{post.authorInitials}</div>
                                    <div>
                                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.1 }}>{post.author}</p>
                                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{post.date}</p>
                                    </div>
                                  </div>
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '8px 16px', background: '#0C63E3', color: '#fff', borderRadius: '8px', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
                                    Read More <span style={{ fontSize: '13px' }}>↗</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}

                {/* All articles */}
                {rest.length > 0 && (
                  <>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
                      All Articles
                      <span style={{ marginLeft: '8px', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>— {rest.length} article{rest.length !== 1 ? 's' : ''} found</span>
                    </p>
                    <div className="all-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                      {rest.map((post, i) => (
                        <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                          <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                            <div className="blog-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', overflow: 'hidden', boxShadow: '0 1px 8px rgba(4,22,53,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                              {/* Image */}
                              <div style={{ height: '170px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                                <img className="blog-card-img" src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px' }}>
                                  {post.hot && (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#D8F950', color: '#041635', fontSize: '10px', fontWeight: 800, borderRadius: '100px', padding: '2px 8px', fontFamily: 'var(--font-body)' }}>
                                      <TrendingUp size={8} strokeWidth={2.5} /> Hot
                                    </span>
                                  )}
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(4,22,53,0.55)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '10px', fontWeight: 600, borderRadius: '100px', padding: '2px 8px', fontFamily: 'var(--font-body)' }}>
                                    <Clock size={8} /> {post.read} read
                                  </span>
                                </div>
                                <button style={{ position: 'absolute', top: '10px', right: '10px', width: '26px', height: '26px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                  <Bookmark size={11} color="#041635" />
                                </button>
                              </div>
                              {/* Body */}
                              <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                  <span style={{ fontSize: '10px', fontWeight: 700, color: post.tagColor, background: post.tagBg, borderRadius: '100px', padding: '2px 8px', fontFamily: 'var(--font-body)' }}>Job Seeker</span>
                                  <span style={{ fontSize: '10px', fontWeight: 700, color: post.tagColor, background: post.tagBg, borderRadius: '100px', padding: '2px 8px', fontFamily: 'var(--font-body)' }}>{post.tag}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '16px', fontWeight: 900, color: '#041635', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '8px', flex: 1 }}>{post.title}</h3>
                                <p style={{ fontSize: '12px', color: '#5C6070', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '14px' }}>{post.excerpt.length > 90 ? post.excerpt.slice(0, 90) + '...' : post.excerpt}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-phudu)', flexShrink: 0 }}>{post.authorInitials}</div>
                                    <div>
                                      <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                          <span style={{ fontSize: '9px', color: '#DCDFE6' }}>&#9632;</span> {post.date}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>
                                    Read <span>›</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section style={{ background: 'linear-gradient(135deg, #0C63E3 0%, #041635 100%)', padding: 'clamp(56px, 7vw, 88px) 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '540px', margin: '0 auto' }}>
            <div style={{ width: '52px', height: '52px', background: '#D8F950', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '22px' }}>✦</div>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '14px' }}>Stay Updated</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', lineHeight: 1.65, marginBottom: '28px' }}>
              Get the latest job search tips, video resume strategies, and product updates delivered to your inbox every week.
            </p>
            <div style={{ display: 'flex', gap: '8px', maxWidth: '420px', margin: '0 auto' }}>
              <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '13px 16px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px', fontFamily: 'var(--font-body)', outline: 'none' }} />
              <button style={{ padding: '13px 22px', background: '#D8F950', color: '#041635', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 800, fontFamily: 'var(--font-body)', cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe</button>
            </div>
            <p style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>Join 10,000+ job seekers already subscribed. Unsubscribe anytime.</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
