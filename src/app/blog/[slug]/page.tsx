'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, TrendingUp, Bookmark } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { POSTS } from '../data';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = POSTS.find(p => p.slug === slug);
  const related = POSTS.filter(p => p.slug !== slug && p.tag === post?.tag).slice(0, 3);
  const postIndex = POSTS.findIndex(p => p.slug === slug);
  const prevPost = postIndex > 0 ? POSTS[postIndex - 1] : null;
  const nextPost = postIndex < POSTS.length - 1 ? POSTS[postIndex + 1] : null;

  if (!post) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '68px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: '48px', fontWeight: 900, color: '#041635' }}>Article not found</h1>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', color: '#0C63E3', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
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
      <Navbar />
      <main style={{ paddingTop: '68px' }}>
        <style>{`
          .article-body h2 { font-family: var(--font-phudu); font-size: clamp(22px, 2.8vw, 30px); font-weight: 900; color: #041635; letter-spacing: -0.02em; line-height: 1.1; margin: 40px 0 16px; }
          .article-body p { font-size: 17px; color: #3D4452; line-height: 1.8; font-family: var(--font-body); margin: 0 0 20px; }
          .article-body .callout { background: #EEF4FF; border-left: 4px solid #0C63E3; border-radius: 0 12px 12px 0; padding: 16px 20px; margin: 28px 0; }
          .article-body .callout p { font-size: 15px; color: #0C63E3; font-weight: 600; margin: 0; line-height: 1.65; }
          .blog-card { transition: box-shadow 0.2s, transform 0.2s; }
          .blog-card:hover { box-shadow: 0 12px 36px rgba(4,22,53,0.12) !important; transform: translateY(-2px); }
          .blog-card-img { transition: transform 0.4s ease; }
          .blog-card:hover .blog-card-img { transform: scale(1.04); }
        `}</style>

        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(56px, 7vw, 88px) 24px clamp(0px, 0px, 0px) 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(12,99,227,0.22), transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', marginBottom: '28px' }}>
                <ArrowLeft size={13} /> Blog
              </Link>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {post.hot && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#D8F950', color: '#041635', fontSize: '11px', fontWeight: 800, borderRadius: '100px', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>
                    <TrendingUp size={9} strokeWidth={2.5} /> Trending
                  </span>
                )}
                <span style={{ fontSize: '11px', fontWeight: 700, color: post.tagColor, background: post.tagBg, borderRadius: '100px', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>{post.tag}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '24px' }}>{post.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-phudu)', flexShrink: 0 }}>{post.authorInitials}</div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.1 }}>{post.author}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{post.date}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.4)' }}>
                  <Clock size={12} />
                  <span style={{ fontSize: '12px', fontFamily: 'var(--font-body)' }}>{post.read} read</span>
                </div>
                <button style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 14px', color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                  <Bookmark size={12} /> Save
                </button>
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
          <div style={{ maxWidth: '780px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 200px', gap: '64px', alignItems: 'start' }} className="article-layout">
            <style>{`
              @media (max-width: 860px) { .article-layout { grid-template-columns: 1fr !important; } .article-sidebar { display: none !important; } }
            `}</style>

            {/* Body */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <p style={{ fontSize: '19px', color: '#041635', lineHeight: 1.75, fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: '32px', borderBottom: '1px solid #ECEEF1', paddingBottom: '32px' }}>
                {post.excerpt}
              </p>
              <div className="article-body">
                {post.body.map((block, i) => {
                  if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
                  if (block.type === 'callout') return (
                    <div key={i} className="callout">
                      <p>{block.text}</p>
                    </div>
                  );
                  return <p key={i}>{block.text}</p>;
                })}
              </div>

              {/* CTA */}
              <div style={{ background: '#041635', borderRadius: '20px', padding: 'clamp(28px, 4vw, 40px)', marginTop: '48px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(12,99,227,0.3), transparent 65%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', marginBottom: '10px' }}>Stand out instantly</p>
                  <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                    Put what you learned into action.
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.65, marginBottom: '20px' }}>
                    Create your free Reslink in under 10 minutes. No credit card required.
                  </p>
                  <Link href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#D8F950', color: '#041635', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                    Create your free Reslink <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="article-sidebar" style={{ position: 'sticky', top: '100px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>Also on the blog</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {POSTS.filter(p => p.slug !== slug).slice(0, 4).map(p => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px', borderRadius: '10px', border: '1px solid #ECEEF1', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F7F8FA')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <div style={{ width: '48px', height: '36px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.35 }}>{p.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        {(prevPost || nextPost) && (
          <section style={{ background: '#F7F8FA', borderTop: '1px solid #ECEEF1', padding: 'clamp(32px, 4vw, 48px) 24px' }}>
            <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ArrowLeft size={14} color="#5C6070" />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '2px' }}>Previous</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.3 }}>{prevPost.title.length > 60 ? prevPost.title.slice(0, 60) + '…' : prevPost.title}</p>
                  </div>
                </Link>
              ) : <div style={{ flex: 1 }} />}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'flex-end', textAlign: 'right' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '2px' }}>Next</p>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)', lineHeight: 1.3 }}>{nextPost.title.length > 60 ? nextPost.title.slice(0, 60) + '…' : nextPost.title}</p>
                  </div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ECEEF1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ArrowRight size={14} color="#5C6070" />
                  </div>
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <section style={{ background: '#fff', padding: 'clamp(56px, 7vw, 88px) 24px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '24px' }}>
                More in {post.tag}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="related-grid">
                <style>{`@media (max-width: 760px) { .related-grid { grid-template-columns: 1fr !important; } } @media (min-width: 500px) and (max-width: 760px) { .related-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
                {related.map((p, i) => (
                  <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.06 }}>
                    <Link href={`/blog/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <div className="blog-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', overflow: 'hidden', boxShadow: '0 1px 8px rgba(4,22,53,0.04)' }}>
                        <div style={{ height: '160px', overflow: 'hidden' }}>
                          <img className="blog-card-img" src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '16px 18px 18px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: p.tagColor, background: p.tagBg, borderRadius: '100px', padding: '2px 8px', fontFamily: 'var(--font-body)', display: 'inline-block', marginBottom: '8px' }}>{p.tag}</span>
                          <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '15px', fontWeight: 900, color: '#041635', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '6px' }}>{p.title}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{p.date}</span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>Read →</span>
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
