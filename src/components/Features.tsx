'use client';

import { motion } from 'framer-motion';

function AnalyticsCard() {
  return (
    <div style={{ gridColumn: 'span 1', borderRadius: '20px', background: '#041635', padding: '32px', overflow: 'hidden', position: 'relative', minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>Analytics</p>
      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '10px' }}>Know exactly who&apos;s watching.</h3>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>Real-time data on every recruiter who viewed your profile, how long they watched, and which companies clicked through.</p>
      {/* Mini dashboard */}
      <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {[{ v: '342', l: 'Views' }, { v: '189', l: 'Plays' }, { v: '47', l: 'Callbacks' }].map(s => (
          <div key={s.l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px 8px', textAlign: 'center' }}>
            <p style={{ fontSize: '22px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)', lineHeight: 1 }}>{s.v}</p>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', marginTop: '3px' }}>{s.l}</p>
          </div>
        ))}
      </div>
      {/* Sparkline */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '44px' }}>
        {[22, 38, 28, 55, 42, 78, 62, 85, 70, 92, 68, 96].map((h, i) => (
          <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', height: `${h}%`, background: i >= 9 ? '#D8F950' : 'rgba(255,255,255,0.1)' }} />
        ))}
      </div>
      {/* Activity ping */}
      <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '8px 12px' }}>
        <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Amazon viewed your profile · <span style={{ color: 'rgba(255,255,255,0.25)' }}>2m ago</span></span>
      </div>
    </div>
  );
}

function CoachCard() {
  const messages = [
    { from: 'ai', text: "Strong hook! Your first 5 seconds are excellent." },
    { from: 'ai', text: "⚡ Around 0:38 your pacing dips — try speaking 10% faster there. Add a specific number to your intro." },
    { from: 'user', text: "Can you rewrite my intro?" },
    { from: 'ai', text: '"In the last 3 years, I cut costs by 23% at two companies. Here\'s how I\'d do the same for you."' },
  ];
  return (
    <div style={{ gridColumn: 'span 1', borderRadius: '20px', background: '#fff', border: '1px solid #EEEEF0', padding: '32px', overflow: 'hidden', minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>Coach AI</p>
      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#041635', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '10px' }}>Your pitch coach, on demand.</h3>
      <p style={{ fontSize: '14px', color: '#9A9FA8', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '20px' }}>AI reviews your video and gives you real feedback — then helps you rewrite and perfect your pitch before it goes live.</p>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '88%', borderRadius: m.from === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px', padding: '8px 12px', background: m.from === 'user' ? '#041635' : '#F7F8FA', border: m.from === 'ai' ? '1px solid #EEEEF0' : 'none' }}>
              <p style={{ fontSize: '12px', color: m.from === 'user' ? '#fff' : '#041635', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeleprompterCard() {
  return (
    <div style={{ gridColumn: 'span 1', borderRadius: '20px', background: '#F7F8FA', border: '1px solid #EEEEF0', padding: '32px', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>Teleprompter</p>
      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#041635', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '10px' }}>Look confident. Sound confident.</h3>
      <p style={{ fontSize: '14px', color: '#9A9FA8', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '20px' }}>Your script scrolls right on screen as you record — so you stay on camera looking natural, not glancing at notes.</p>
      {/* Camera mockup */}
      <div style={{ marginTop: 'auto', borderRadius: '12px', background: '#041635', overflow: 'hidden' }}>
        <div style={{ aspectRatio: '16/7', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(4,22,53,0.9)', backdropFilter: 'blur(4px)', padding: '10px 14px', borderTop: '1px solid rgba(216,249,80,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D8F950' }} />
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}>TELEPROMPTER · 1.0x</span>
            </div>
            <div style={{ overflow: 'hidden', height: '28px' }}>
              <motion.p animate={{ y: [0, -28] }} transition={{ duration: 3, ease: 'linear', repeat: Infinity, repeatDelay: 1 }} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                Hi, I&apos;m Oliver — a supply chain specialist. In the last 3 years I&apos;ve reduced logistics costs by 23% across two companies. I&apos;d love to bring that to your team.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsCard() {
  const platforms = [
    { name: 'LinkedIn', color: '#0A66C2' },
    { name: 'Indeed', color: '#003A9B' },
    { name: 'Greenhouse', color: '#24A148' },
    { name: 'Lever', color: '#3B82F6' },
    { name: 'Workday', color: '#0875E1' },
    { name: 'Ashby', color: '#111827' },
    { name: 'Gmail', color: '#EA4335' },
    { name: 'Zapier', color: '#FF4A00' },
    { name: 'Slack', color: '#4A154B' },
  ];
  return (
    <div style={{ gridColumn: 'span 1', borderRadius: '20px', background: 'linear-gradient(135deg, #041635 0%, #0C2860 100%)', padding: '32px', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '10px', fontFamily: 'var(--font-body)' }}>Integrations</p>
      <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '26px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '10px' }}>Apply anywhere. Stand out everywhere.</h3>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '24px' }}>Your Reslink link works with every job board, ATS, and inbox. One link, infinite reach.</p>
      {/* Pill grid */}
      <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {platforms.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', padding: '6px 12px 6px 8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>{p.name}</span>
          </motion.div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(216,249,80,0.1)', borderRadius: '100px', padding: '6px 12px', border: '1px solid rgba(216,249,80,0.25)' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#D8F950', fontFamily: 'var(--font-body)' }}>+ many more</span>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section style={{ padding: '80px 0 96px', background: '#fff' }}>
      <div className="container">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>Built for job seekers</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.02em', maxWidth: '540px' }}>
            Everything you need to land the role.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <AnalyticsCard />
          <CoachCard />
          <TeleprompterCard />
          <IntegrationsCard />
        </motion.div>
      </div>
    </section>
  );
}
