'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { POSTS } from '../data';

/** Slugify a heading into a stable anchor id for the table of contents. */
const toId = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = POSTS.find(p => p.slug === slug);
  const related = POSTS.filter(p => p.slug !== slug && p.tag === post?.tag).slice(0, 3);

  // Table-of-contents scroll spy — highlight the section currently in view.
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    if (!post) return;
    const ids = post.body.filter(b => b.type === 'h2').map(b => toId(b.text));
    if (!ids.length) return;
    const onScroll = () => {
      const threshold = 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [post, slug]);

  if (!post) {
    return (
      <>
        <Navbar dark />
        <main style={{ paddingTop: '68px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: '48px', fontWeight: 900, color: '#061A3A' }}>Article not found</h1>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', color: '#1468E8', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              <ArrowLeft size={14} /> Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          .article-body h2 { font-family: var(--font-phudu); font-size: clamp(22px, 2.8vw, 30px); font-weight: 900; color: #061A3A; letter-spacing: -0.02em; line-height: 1.1; margin: 40px 0 16px; scroll-margin-top: 96px; }
          .toc-link { display: block; font-size: 13px; font-weight: 600; color: #5C6070; font-family: var(--font-body); text-decoration: none; line-height: 1.4; padding: 7px 0 7px 16px; border-left: 2px solid transparent; margin-left: -2px; transition: color 0.15s, border-color 0.15s; }
          .toc-link:hover { color: #1468E8; border-left-color: rgba(20,104,232,0.4); }
          .toc-link.active { color: #1468E8; font-weight: 700; border-left-color: #1468E8; }
          .toc-news-input::placeholder { color: rgba(255,255,255,0.4); }
          .toc-news-input:focus { outline: none; border-color: rgba(255,255,255,0.35) !important; }
          .article-body p { font-size: 17px; color: #3D4452; line-height: 1.8; font-family: var(--font-body); margin: 0 0 20px; }
          .article-body .callout { background: #EEF4FF; border-left: 4px solid #1468E8; border-radius: 0 12px 12px 0; padding: 16px 20px; margin: 28px 0; }
          .article-body .callout p { font-size: 15px; color: #1468E8; font-weight: 600; margin: 0; line-height: 1.65; }
          .blog-card { border-radius: 18px !important; box-shadow: 0 1px 8px rgba(6,26,58,0.04) !important; transition: box-shadow 0.25s ease, transform 0.25s ease; }
          .blog-card:hover { box-shadow: 0 12px 36px rgba(6,26,58,0.10) !important; transform: translateY(-2px); }
          .blog-card-img { transition: transform 0.4s ease; }
          .blog-card:hover .blog-card-img { transform: scale(1.04); }
        `}</style>

        {/* Hero */}
        <section style={{ background: '#061A3A', padding: 'clamp(56px, 7vw, 88px) 24px clamp(0px, 0px, 0px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, textDecoration: 'none', marginBottom: '28px', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D7FF43')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                <ArrowLeft size={16} /> Back to Blog
              </Link>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {post.hot && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#D7FF43', color: '#061A3A', fontSize: '11px', fontWeight: 800, borderRadius: '100px', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>
                    <TrendingUp size={9} strokeWidth={2.5} /> Trending
                  </span>
                )}
                <span style={{ fontSize: '11px', fontWeight: 700, color: post.tagColor, background: post.tagBg, borderRadius: '100px', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>{post.tag}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '24px' }}>{post.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{post.author}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{post.date}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.4)' }}>
                  <Clock size={12} />
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}>{post.read} read</span>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Hero image */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ maxWidth: '900px', margin: '40px auto 0', borderRadius: '20px 20px 0 0', overflow: 'hidden', height: 'clamp(240px, 35vw, 440px)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.imageFull} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </motion.div>
        </section>

        {/* Article */}
        <section style={{ background: '#fff', padding: 'clamp(48px, 6vw, 72px) 24px' }}>
          <div style={{ maxWidth: '940px', margin: '0 auto', display: 'grid', gridTemplateColumns: '230px 1fr', gap: '56px', alignItems: 'start' }} className="article-layout">
            <style>{`
              @media (max-width: 860px) { .article-layout { grid-template-columns: 1fr !important; } .article-sidebar { display: none !important; } }
            `}</style>

            {/* Body */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <div className="article-body">
                {post.body.map((block, i) => {
                  if (block.type === 'h2') return <h2 key={i} id={toId(block.text)}>{block.text}</h2>;
                  if (block.type === 'callout') return (
                    <div key={i} className="callout">
                      <p>{block.text}</p>
                    </div>
                  );
                  return <p key={i}>{block.text}</p>;
                })}
              </div>

              {/* CTA */}
              <div style={{ background: 'radial-gradient(ellipse 60% 90% at 92% 0%, rgba(214,61,157,0.4), transparent 55%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)', borderRadius: '20px', padding: 'clamp(28px, 4vw, 40px)', marginTop: '48px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Stand out instantly</p>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                    Put what you learned into action.
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.65, marginBottom: '20px' }}>
                    Create your free Reslink in under 10 minutes. No credit card required.
                  </p>
                  <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#D7FF43', color: '#061A3A', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Create your free Reslink <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Sidebar — table of contents + newsletter */}
            <aside className="article-sidebar" style={{ position: 'sticky', top: '100px', order: -1 }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '14px' }}>On this page</p>
              <nav style={{ borderLeft: '2px solid #ECEEF1', marginBottom: '28px' }}>
                {post.body.filter(b => b.type === 'h2').map((b, i) => (
                  <a key={i} href={`#${toId(b.text)}`} className={`toc-link${activeId === toId(b.text) ? ' active' : ''}`}>{b.text}</a>
                ))}
              </nav>

              {/* Newsletter box */}
              <div style={{ background: 'radial-gradient(ellipse 80% 70% at 90% 0%, rgba(214,61,157,0.4), transparent 60%), linear-gradient(150deg, #071B3D 0%, #05142C 100%)', borderRadius: '16px', padding: '22px 20px' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '8px' }}>Newsletter</p>
                <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '19px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 0.98, marginBottom: '8px' }}>Stay in the loop</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '14px' }}>Weekly job-search tips, straight to your inbox.</p>
                <input type="email" placeholder="Your email" className="toc-news-input" style={{ width: '100%', padding: '10px 12px', borderRadius: '9px', border: '1.5px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: '13px', fontFamily: 'var(--font-body)', boxSizing: 'border-box', outline: 'none', marginBottom: '8px' }} />
                <button style={{ width: '100%', padding: '11px', background: '#D7FF43', color: '#061A3A', border: 'none', borderRadius: '9px', fontSize: '13px', fontWeight: 800, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>Subscribe</button>
              </div>
            </aside>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section style={{ background: '#F6F7F9', borderTop: '1px solid #ECEEF1', padding: 'clamp(56px, 7vw, 88px) 24px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '24px' }}>
                More in {post.tag}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="related-grid">
                <style>{`@media (max-width: 760px) { .related-grid { grid-template-columns: 1fr !important; } } @media (min-width: 500px) and (max-width: 760px) { .related-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
                {related.map((p, i) => (
                  <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                    <Link href={`/blog/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div className="blog-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', overflow: 'hidden', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
                        <div style={{ height: '160px', overflow: 'hidden' }}>
                          <img className="blog-card-img" src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '16px 18px 18px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: p.tagColor, background: p.tagBg, borderRadius: '100px', padding: '2px 8px', fontFamily: 'var(--font-body)', display: 'inline-block', marginBottom: '8px' }}>{p.tag}</span>
                          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 800, color: '#061A3A', lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: '6px' }}>{p.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{p.date}</span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1468E8', fontFamily: 'var(--font-body)' }}>Read →</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
