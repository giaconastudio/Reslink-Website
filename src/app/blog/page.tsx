'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { POSTS } from './data';

const CATS: { key: string; label: string; color: string | null; activeBg: string; activeText: string }[] = [
  { key: 'All', label: 'All', color: null, activeBg: '#061A3A', activeText: '#fff' },
  { key: 'Job Search Tips', label: 'Job search', color: '#1468E8', activeBg: '#1468E8', activeText: '#fff' },
  { key: 'Video Resume Tips', label: 'Video resumes', color: '#C0398A', activeBg: '#C0398A', activeText: '#fff' },
  { key: 'Product Updates', label: 'Product', color: '#5B7A0F', activeBg: '#D7FF43', activeText: '#061A3A' },
];

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const PER_PAGE = 7;

  const filtered = POSTS.filter(p => {
    const matchTag = active === 'All' || p.tag === active;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  // Reset to the first page whenever the filter or search changes.
  useEffect(() => setPage(1), [active, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pagePosts = filtered.slice((page - 1) * PER_PAGE, (page - 1) * PER_PAGE + PER_PAGE);
  // The large featured card only appears on the first page; other pages are all grid.
  const featured = page === 1 ? pagePosts[0] : null;
  const rest = page === 1 ? pagePosts.slice(1) : pagePosts;

  const goToPage = (n: number) => {
    setPage(n);
    if (contentRef.current) {
      const y = contentRef.current.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          .blog-search-input::placeholder { color: rgba(255,255,255,0.35); }
          .blog-search-input:focus { outline: none; border-color: rgba(255,255,255,0.4) !important; }
          .blog-card-img { transition: transform 0.4s ease; }
          .blog-card:hover .blog-card-img { transform: scale(1.04); }
          .blog-card { border-radius: 18px !important; box-shadow: 0 1px 8px rgba(6,26,58,0.04) !important; transition: box-shadow 0.25s ease, transform 0.25s ease; }
          .blog-card:hover { box-shadow: 0 12px 36px rgba(6,26,58,0.10) !important; transform: translateY(-2px); }
          .tag-featured { font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #061A3A; background: #D7FF43; border-radius: 100px; padding: 4px 11px; font-family: var(--font-body); white-space: nowrap; }
          .tag-cat { font-size: 10px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 100px; padding: 4px 11px; font-family: var(--font-body); white-space: nowrap; }
          @media (max-width: 700px) { .featured-grid { grid-template-columns: 1fr !important; } .all-grid { grid-template-columns: 1fr !important; } .feat-card { grid-template-columns: 1fr !important; } }
          @media (max-width: 960px) { .all-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>

        {/* Hero / Search */}
        <section style={{ background: '#061A3A', padding: 'clamp(72px, 9vw, 110px) 24px clamp(56px, 7vw, 80px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '700px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.18), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D7FF43', marginBottom: '18px', fontFamily: 'var(--font-body)' }}>The Reslink Blog</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: '0' }}>
                Getting seen,<br />Getting <span style={{ color: '#D7FF43' }}>hired.</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginTop: '40px', marginBottom: '36px', maxWidth: '560px', margin: '40px auto 36px' }}>
                Learn what will get you hired.
              </p>

              {/* Search bar */}
              <div style={{ position: 'relative', maxWidth: '560px', margin: '0 auto' }}>
                <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center', zIndex: 2 }}>
                  <Search size={17} color="rgba(255,255,255,0.4)" />
                </span>
                <input
                  className="blog-search-input"
                  type="text"
                  placeholder="Search on Blog..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '17px 18px 17px 50px', borderRadius: '14px', border: '1.5px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', color: '#fff', fontSize: '15px', fontFamily: 'var(--font-body)', boxSizing: 'border-box', outline: 'none' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter bar — centered category pills */}
        <section style={{ background: '#F6F7F9', padding: '44px 24px 32px', position: 'sticky', top: '68px', zIndex: 10 }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', background: '#ECEEF1', borderRadius: '14px', padding: '5px' }}>
              {CATS.map(cat => {
                const isActive = active === cat.key;
                return (
                  <button key={cat.key} onClick={() => setActive(cat.key)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 18px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'background 0.2s, color 0.2s', background: isActive ? cat.activeBg : 'transparent', color: isActive ? cat.activeText : '#061A3A', whiteSpace: 'nowrap' }}>
                    {cat.color && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: isActive ? cat.activeText : cat.color, flexShrink: 0 }} />}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(12px, 1.5vw, 20px) 24px clamp(40px, 5vw, 56px)' }}>
          <div ref={contentRef} style={{ maxWidth: '1100px', margin: '0 auto' }}>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#9A9FA8', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
                No articles found. Try a different search.
              </div>
            ) : (
              <>
                {/* Featured */}
                {featured && (
                  <>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: '48px' }}>
                      <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div className="blog-card feat-card" style={{ background: '#fff', borderRadius: '20px', border: '1px solid #ECEEF1', overflow: 'hidden', boxShadow: '0 1px 8px rgba(6,26,58,0.04)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                          <div style={{ position: 'relative', margin: '16px', borderRadius: '14px', overflow: 'hidden', minHeight: '236px' }}>
                            <img className="blog-card-img" src={featured.image} alt={featured.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: 'clamp(20px, 2.6vw, 36px) clamp(24px, 3vw, 40px) clamp(20px, 2.6vw, 36px) 4px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
                              <span className="tag-featured">Featured</span>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}><Clock size={12} /> {featured.read} read</span>
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(22px, 2.6vw, 30px)', fontWeight: 800, color: '#061A3A', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '12px' }}>{featured.title}</h3>
                            <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>{featured.excerpt}</p>
                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                              <span style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{featured.date}</span>
                              <span className="tag-cat" style={{ color: featured.tagColor, background: featured.tagBg }}>{featured.tag}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </>
                )}

                {/* All articles */}
                {rest.length > 0 && (
                  <>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
                      All Articles
                    </p>
                    <div className="all-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                      {rest.map((post, i) => (
                        <motion.div key={post.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }}>
                          <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                            <div className="blog-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', overflow: 'hidden', boxShadow: '0 1px 8px rgba(6,26,58,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                              <div style={{ height: '190px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                                <img className="blog-card-img" src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <span style={{ position: 'absolute', top: '12px', left: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(6,26,58,0.6)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '10px', fontWeight: 600, borderRadius: '100px', padding: '3px 9px', fontFamily: 'var(--font-body)' }}>
                                  <Clock size={8} /> {post.read}
                                </span>
                              </div>
                              <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 800, color: '#061A3A', lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: '10px' }}>{post.title}</h3>
                                <p style={{ fontSize: '13.5px', color: '#5C6070', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '18px' }}>{post.excerpt.length > 110 ? post.excerpt.slice(0, 110) + '...' : post.excerpt}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: '10px' }}>
                                  <span style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{post.date}</span>
                                  <span className="tag-cat" style={{ color: post.tagColor, background: post.tagBg }}>{post.tag}</span>
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

            {/* Pagination */}
            {filtered.length > 0 && totalPages > 1 && (
              <div style={{ borderTop: '1px solid #ECEEF1', marginTop: '48px', paddingTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <button onClick={() => goToPage(Math.max(1, page - 1))} disabled={page === 1}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: page === 1 ? 'default' : 'pointer', color: page === 1 ? '#C7CBD3' : '#061A3A', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
                  <ArrowLeft size={16} /> Previous
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
                    const isActive = n === page;
                    return (
                      <button key={n} onClick={() => goToPage(n)}
                        style={{ minWidth: '36px', height: '36px', padding: '0 10px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: isActive ? '#D7FF43' : 'transparent', color: isActive ? '#061A3A' : '#5C6070', fontSize: '14px', fontWeight: isActive ? 800 : 600, fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                        {n}
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => goToPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: page === totalPages ? 'default' : 'pointer', color: page === totalPages ? '#C7CBD3' : '#061A3A', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
                  Next <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section style={{ background: '#F6F7F9', padding: '0 24px clamp(64px, 8vw, 96px)' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto', background: 'radial-gradient(ellipse 55% 90% at 92% 10%, rgba(214,61,157,0.34), transparent 55%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)', borderRadius: '28px', padding: 'clamp(36px, 5vw, 56px) clamp(32px, 5vw, 60px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(28px, 5vw, 56px)', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <div style={{ flex: '1 1 320px' }}>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3.4vw, 40px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.98, marginBottom: '12px' }}>Stay Updated</h2>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', lineHeight: 1.6, maxWidth: '440px' }}>
                  Get the latest job search tips, video resume strategies, and product updates delivered to your inbox every week.
                </p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <input type="email" placeholder="example@mail.com" style={{ width: '300px', maxWidth: '100%', padding: '15px 18px', borderRadius: '12px', border: 'none', background: '#fff', color: '#061A3A', fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none' }} />
                  <button style={{ padding: '15px 28px', background: '#D7FF43', color: '#061A3A', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-body)', cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe</button>
                </div>
                <p style={{ marginTop: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Join 10,000+ job seekers already subscribed.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
