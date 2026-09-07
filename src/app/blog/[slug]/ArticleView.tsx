'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StructuredText, { collectHeadings } from '@/components/StructuredText';
import type { Post } from '../queries';

export default function ArticleView({ post, related }: { post: Post; related: Post[] }) {
  const headings = collectHeadings(post.document);

  // Table-of-contents scroll spy — highlight the section currently in view.
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    if (!headings.length) return;
    const ids = headings.map(h => h.id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          .article-body h2 { font-family: var(--font-phudu); font-size: clamp(24px, 2.9vw, 32px); font-weight: 900; color: #061A3A; letter-spacing: -0.02em; line-height: 1.12; margin: 52px 0 18px; scroll-margin-top: 96px; }
          .article-body h3 { font-family: var(--font-body); font-size: clamp(19px, 2.2vw, 22px); font-weight: 800; color: #0C2140; letter-spacing: -0.01em; line-height: 1.3; margin: 38px 0 12px; }
          .article-body h4 { font-family: var(--font-body); font-size: 17px; font-weight: 800; color: #0C2140; line-height: 1.35; margin: 28px 0 10px; }
          .toc-link { display: block; font-size: 13px; font-weight: 600; color: #5C6070; font-family: var(--font-body); text-decoration: none; line-height: 1.4; padding: 7px 0 7px 16px; border-left: 2px solid transparent; margin-left: -2px; transition: color 0.15s, border-color 0.15s; }
          .toc-link:hover { color: #1468E8; border-left-color: rgba(20,104,232,0.4); }
          .toc-link.active { color: #1468E8; font-weight: 700; border-left-color: #1468E8; }
          .toc-news-input::placeholder { color: rgba(255,255,255,0.4); }
          .toc-news-input:focus { outline: none; border-color: rgba(255,255,255,0.35) !important; }
          .article-body p { font-size: 16px; color: #1E2A3B; line-height: 1.75; font-family: var(--font-body); margin: 0 0 20px; }
          .article-body a { color: #1468E8; text-decoration: none; font-weight: 700; overflow-wrap: anywhere; }
          .article-body a:hover { color: #0F52B8; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
          .article-body strong { font-weight: 800; color: #061A3A; }
          .article-body em { font-style: italic; }
          .article-body ul, .article-body ol { margin: 0 0 22px; padding-left: 24px; }
          .article-body li { font-size: 16px; color: #1E2A3B; line-height: 1.72; font-family: var(--font-body); margin-bottom: 9px; padding-left: 4px; }
          .article-body li::marker { color: #1E2A3B; }
          .article-body ol > li::marker { font-weight: 700; }
          .article-body li > p { margin: 0; }
          .article-body ul { list-style: disc; }
          .article-body ol { list-style: decimal; }
          .article-body hr { border: none; border-top: 1px solid #ECEEF1; margin: 36px 0; }
          .article-body blockquote { background: #EEF4FF; border-left: 4px solid #1468E8; border-radius: 0 12px 12px 0; padding: 16px 20px; margin: 28px 0; }
          .article-body blockquote p { font-size: 16px; color: #0F52B8; font-weight: 600; margin: 0; line-height: 1.7; }
          .article-body .article-img { width: 100%; height: auto; border-radius: 14px; display: block; margin: 28px 0; }
          .article-body .article-video { width: 100%; height: auto; border-radius: 14px; display: block; margin: 28px 0; background: #061A3A; }
          .article-body pre { background: #061A3A; color: #E8EAF0; border-radius: 12px; padding: 16px 18px; overflow-x: auto; margin: 0 0 20px; font-size: 13px; }
          .blog-card { border-radius: 18px !important; box-shadow: 0 1px 8px rgba(6,26,58,0.04) !important; transition: box-shadow 0.25s ease, transform 0.25s ease; }
          .blog-card:hover { box-shadow: 0 12px 36px rgba(6,26,58,0.10) !important; transform: translateY(-2px); }
          .blog-card-img { transition: transform 0.4s ease; }
          .blog-card:hover .blog-card-img { transform: scale(1.04); }
          .blog-cta-grid { display: grid; grid-template-columns: 1fr 148px; gap: 26px; align-items: center; position: relative; z-index: 1; }
          .blog-cta-btns { display: flex; gap: 10px; flex-wrap: wrap; }
          .blog-cta-vid { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 3/4; background: #0B0F1A; box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
          .blog-cta-vid video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
          .blog-cta-vid-tag { position: absolute; top: 9px; left: 9px; z-index: 2; font-size: 9px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #061A3A; background: #D7FF43; border-radius: 100px; padding: 3px 8px; font-family: var(--font-body); }
          .blog-cta-vid-dur { position: absolute; top: 9px; right: 9px; z-index: 2; font-size: 10px; font-weight: 700; color: #fff; background: rgba(6,26,58,0.55); border-radius: 5px; padding: 2px 6px; font-family: var(--font-body); }
          .blog-cta-vid-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 18px 10px 9px; background: linear-gradient(to top, rgba(6,26,58,0.9), transparent); z-index: 2; }
          @media (max-width: 560px) { .blog-cta-grid { grid-template-columns: 1fr; } .blog-cta-visual { display: none; } }
        `}</style>

        {/* Hero */}
        <section style={{ background: '#061A3A', padding: 'clamp(56px, 7vw, 88px) 24px clamp(0px, 0px, 0px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(20,104,232,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/blog" className="tap-44" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, textDecoration: 'none', marginBottom: '28px', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D7FF43')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                <ArrowLeft size={16} /> Back to Blog
              </Link>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: post.tagColor, background: post.tagBg, borderRadius: '100px', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>{post.tag}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '24px' }}>{post.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {post.date && <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>{post.date}</p>}
                {post.read && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.4)' }}>
                    <Clock size={12} />
                    <span style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}>{post.read} read</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          {/* Hero image */}
          {post.imageFull && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ maxWidth: '900px', margin: '40px auto 0', borderRadius: '20px 20px 0 0', overflow: 'hidden', height: 'clamp(240px, 35vw, 440px)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.imageFull} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </motion.div>
          )}
        </section>

        {/* Article */}
        <section style={{ background: '#fff', padding: 'clamp(48px, 6vw, 72px) 24px' }}>
          <div style={{ maxWidth: '940px', margin: '0 auto', display: 'grid', gridTemplateColumns: '230px 1fr', gap: '56px', alignItems: 'start' }} className="article-layout">
            <style>{`
              @media (max-width: 860px) { .article-layout { grid-template-columns: 1fr !important; gap: 0 !important; } .article-sidebar { display: none !important; } }
            `}</style>

            {/* Body */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: 0.3 }} style={{ minWidth: 0 }}>
              <div className="article-body">
                <StructuredText document={post.document} blocks={post.blocks} />
              </div>

              {/* CTA — compact version of the site-wide "Ready to stand out?" block */}
              <div style={{ background: 'radial-gradient(ellipse 52% 64% at 93% 0%, rgba(214,61,157,0.42), transparent 52%), linear-gradient(140deg, #071B3D 0%, #05142C 100%)', borderRadius: '20px', padding: 'clamp(24px, 3.4vw, 34px)', marginTop: '48px', position: 'relative', overflow: 'hidden' }}>
                <div className="blog-cta-grid">
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D7FF43', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Get started</p>
                    <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#fff', lineHeight: 0.98, letterSpacing: '-0.02em', marginBottom: '10px' }}>
                      Ready to stand out?
                    </h3>
                    <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', lineHeight: 1.6, marginBottom: '18px', maxWidth: '360px' }}>
                      One link with your video intro, your resume and your work. And you see exactly who opens it.
                    </p>
                    <div className="blog-cta-btns">
                      <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '11px 20px', background: '#D7FF43', color: '#061A3A', borderRadius: '10px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                        Get started for free <ArrowRight size={14} />
                      </Link>
                      <Link href="/oliviastone" style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 20px', background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.28)', borderRadius: '10px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                        See a real Reslink
                      </Link>
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', marginTop: '14px' }}>Free to start · under 5 minutes · no card needed</p>
                  </div>
                  <div className="blog-cta-visual">
                    <div className="blog-cta-vid">
                      <video src="/videos/cta-resume.mp4" poster="/videos/hero-cta-resume.jpg" autoPlay muted loop playsInline />
                      <span className="blog-cta-vid-tag">Video intro</span>
                      <span className="blog-cta-vid-dur">0:47</span>
                      <div className="blog-cta-vid-cap">
                        <p style={{ fontFamily: 'var(--font-phudu)', fontWeight: 800, fontSize: '13px', color: '#fff', letterSpacing: '-0.01em' }}>Daniel Chen</p>
                        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.78)', fontFamily: 'var(--font-body)', marginTop: '1px' }}>Business Dev Rep</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar — table of contents + newsletter */}
            <aside className="article-sidebar" style={{ position: 'sticky', top: '100px', order: -1 }}>
              {headings.length > 0 && (
                <>
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '14px' }}>On this page</p>
                  <nav style={{ borderLeft: '2px solid #ECEEF1', marginBottom: '28px' }}>
                    {headings.map(h => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`toc-link${activeId === h.id ? ' active' : ''}`}
                        onClick={e => {
                          const el = document.getElementById(h.id);
                          if (el) {
                            e.preventDefault();
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            history.replaceState(null, '', `#${h.id}`);
                          }
                        }}
                      >{h.text}</a>
                    ))}
                  </nav>
                </>
              )}

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
                  <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.35, delay: i * 0.06 }} style={{ height: '100%' }}>
                    <Link href={`/blog/${p.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                      <div className="blog-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', overflow: 'hidden', boxShadow: '0 1px 8px rgba(6,26,58,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '160px', overflow: 'hidden', flexShrink: 0 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className="blog-card-img" src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: p.tagColor, background: p.tagBg, borderRadius: '100px', padding: '2px 8px', fontFamily: 'var(--font-body)', display: 'inline-block', marginBottom: '8px', alignSelf: 'flex-start' }}>{p.tag}</span>
                          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 800, color: '#061A3A', lineHeight: 1.35, letterSpacing: '-0.01em', marginBottom: '6px' }}>{p.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px' }}>
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
