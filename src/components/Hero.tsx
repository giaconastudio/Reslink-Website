'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '80px', background: '#fff' }}>
      <div className="container">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#EBF0FF', color: "#0C63E3",
            fontSize: '13px', fontWeight: 600,
            padding: '6px 14px', borderRadius: '100px',
            fontFamily: 'var(--font-body)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0C63E3', display: 'inline-block' }} />
            The #1 platform for video resumes
          </span>
        </motion.div>

        {/* Headline — Phudu font */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          style={{
            textAlign: 'center',
            fontSize: 'clamp(48px, 7vw, 80px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#041635',
            marginBottom: '24px',
            fontFamily: 'var(--font-phudu)',
          }}
        >
          Your resume,{' '}
          <span style={{ color: '#D8F950' }}>but better.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{
            textAlign: 'center', fontSize: '18px', lineHeight: 1.6,
            color: '#5C6070', maxWidth: '520px',
            margin: '0 auto 40px',
            fontFamily: 'var(--font-body)', fontWeight: 400,
          }}
        >
          Stand out and land more interviews by creating personalized video resumes that build human connections with recruiters.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '72px' }}
        >
          <Link href="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '14px 26px' }}>
            Create your free video resume <ArrowRight size={15} />
          </Link>
          <Link href="#how-it-works" className="btn-outline" style={{ fontSize: '15px', padding: '14px 26px' }}>
            See how it works
          </Link>
        </motion.div>

        {/* Product screenshot mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ maxWidth: '880px', margin: '0 auto' }}
        >
          <div style={{
            borderRadius: '16px', overflow: 'hidden',
            border: '1px solid #EEEEF0',
            boxShadow: '0 24px 80px rgba(12,30,91,0.12)',
          }}>
            {/* Browser bar */}
            <div style={{ background: '#F7F8FA', padding: '11px 16px', borderBottom: '1px solid #EEEEF0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
              <div style={{ flex: 1, margin: '0 12px', background: '#EEEEF0', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', color: '#9A9FA8', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                reslink.io/oliverstone
              </div>
            </div>

            {/* Profile content */}
            <div style={{ background: '#fff', padding: '28px 28px 24px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '24px' }}>
              {/* Left sidebar */}
              <div>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px', background: '#041635',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#D8F950', fontWeight: 800, fontSize: '16px',
                  marginBottom: '14px', fontFamily: 'var(--font-phudu)',
                }}>OS</div>
                <p style={{ fontWeight: 700, fontSize: '16px', color: '#041635', marginBottom: '3px', fontFamily: 'var(--font-body)' }}>Oliver Stone</p>
                <p style={{ fontSize: '13px', color: '#5C6070', marginBottom: '3px', fontFamily: 'var(--font-body)' }}>Supply Chain Operations</p>
                <p style={{ fontSize: '12px', color: '#9A9FA8', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>New York, NY</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Operations', 'Logistics', 'SAP', 'Analytics'].map(s => (
                    <span key={s} style={{ background: '#F7F8FA', color: '#5C6070', fontSize: '11px', fontWeight: 500, padding: '4px 10px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Video + stats */}
              <div>
                <div style={{ background: '#041635', borderRadius: '10px', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '14px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#041635"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span style={{ position: 'absolute', bottom: '10px', right: '12px', background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-body)' }}>1:32</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[{ label: 'Profile views', value: '1,204' }, { label: 'Video plays', value: '847' }, { label: 'Recruiter contacts', value: '23' }].map(s => (
                    <div key={s.label} style={{ background: '#F7F8FA', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                      <p style={{ fontWeight: 700, fontSize: '18px', color: '#041635', fontFamily: 'var(--font-phudu)' }}>{s.value}</p>
                      <p style={{ fontSize: '11px', color: '#9A9FA8', marginTop: '2px', fontFamily: 'var(--font-body)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
