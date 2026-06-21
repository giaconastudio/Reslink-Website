'use client';

import { motion } from 'framer-motion';

function AnalyticsFeature() {
  return (
    <section style={{ padding: '96px 0', background: '#041635' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '64px', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Analytics & Insights</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Know exactly who&apos;s watching.
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '32px', fontFamily: 'var(--font-body)' }}>
              See real-time data on every profile view, every second of video watched, and every recruiter who clicked through. Stop guessing and start following up at exactly the right moment.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Who viewed your profile and when', 'How long they watched your video', 'Which companies are interested', 'Click-through rates by platform'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>This week</p>
                <div style={{ background: '#D8F950', borderRadius: '100px', padding: '4px 12px', fontSize: '12px', fontWeight: 700, color: '#041635', fontFamily: 'var(--font-body)' }}>↑ 28% vs last week</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                {[{ v: '342', l: 'Views' }, { v: '189', l: 'Plays' }, { v: '47', l: 'Clicks' }, { v: '12', l: 'Contacts' }].map(s => (
                  <div key={s.l} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px 10px', textAlign: 'center' }}>
                    <p style={{ fontSize: '22px', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-phudu)' }}>{s.v}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>{s.l}</p>
                  </div>
                ))}
              </div>
              {/* Chart */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '72px', marginBottom: '8px' }}>
                  {[22, 38, 28, 55, 42, 78, 62, 85, 70, 92, 68, 88, 74, 96].map((h, i) => (
                    <div key={i} style={{ flex: 1, borderRadius: '3px 3px 0 0', height: `${h}%`, background: i === 13 ? '#D8F950' : i > 9 ? 'rgba(216,249,80,0.4)' : 'rgba(255,255,255,0.12)', transition: 'background 0.3s' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Mon</span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>Today</span>
                </div>
              </div>
              {/* Recent activity */}
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { co: 'Amazon', action: 'Viewed your profile', time: '2m ago', dot: '#22c55e' },
                  { co: 'Meta', action: 'Watched video — 1:12', time: '18m ago', dot: '#0C63E3' },
                  { co: 'Google', action: 'Clicked your resume', time: '1h ago', dot: '#D8F950' },
                ].map(a => (
                  <div key={a.co} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: a.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>{a.co}</span>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>{a.action}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-body)' }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CoachAIFeature() {
  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>
          {/* Visual first */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <div style={{ borderRadius: '20px', border: '1px solid #EEEEF0', overflow: 'hidden', boxShadow: '0 16px 48px rgba(4,22,53,0.08)' }}>
              {/* AI header */}
              <div style={{ background: 'linear-gradient(135deg, #041635, #0C63E3)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#D8F950', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#041635" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>Reslink Coach AI</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Analyzing your pitch...</p>
                </div>
              </div>
              {/* Chat */}
              <div style={{ padding: '20px', background: '#F7F8FA', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { from: 'ai', msg: "I've analyzed your pitch! Here's what's working well and what to improve." },
                  { from: 'ai', msg: '✅ Strong opening — you hook them in the first 5 seconds.\n⚡ Tip: Your pacing drops around 0:38. Try to speak 10% faster here.\n🎯 Add a specific achievement — numbers land better than adjectives.' },
                  { from: 'user', msg: 'Can you rewrite my intro to be punchier?' },
                  { from: 'ai', msg: 'Sure! Try: "In the last 3 years, I cut fulfillment costs by 23% at two different companies. Here\'s how I\'d do the same for you..."' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '85%', borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', padding: '10px 14px', background: m.from === 'user' ? '#041635' : '#fff', border: m.from === 'ai' ? '1px solid #EEEEF0' : 'none', boxShadow: m.from === 'ai' ? '0 2px 8px rgba(4,22,53,0.06)' : 'none' }}>
                      <p style={{ fontSize: '13px', color: m.from === 'user' ? '#fff' : '#041635', lineHeight: 1.5, whiteSpace: 'pre-line', fontFamily: 'var(--font-body)' }}>{m.msg}</p>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1, background: '#fff', borderRadius: '10px', border: '1.5px solid #EEEEF0', padding: '10px 14px', fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>Ask Coach AI anything...</div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0C63E3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Coach AI</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Your personal pitch coach. On demand.
            </h2>
            <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
              Our AI reviews your video and gives you actionable feedback — pacing, tone, content, body language. Then helps you rewrite, rehearse, and perfect your pitch before it goes live.
            </p>
            <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              It&apos;s like having a professional career coach in your pocket, available 24/7 and completely free.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TeleprompterFeature() {
  return (
    <section style={{ padding: '96px 0', background: '#F7F8FA' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '64px', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Teleprompter</p>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Look confident. Sound confident.
            </h2>
            <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, marginBottom: '24px', fontFamily: 'var(--font-body)' }}>
              Never fumble for words again. Write your script once, and our built-in teleprompter scrolls it at your pace while you record — so you stay on camera looking natural, not down at notes.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Scroll speed adjusts to your reading pace', 'Overlaid on camera so you maintain eye contact', 'Edit your script live between takes'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0C63E3', marginTop: '7px', flexShrink: 0 }} />
                  <span style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #EEEEF0', boxShadow: '0 16px 48px rgba(4,22,53,0.08)' }}>
              {/* Camera view with teleprompter overlay */}
              <div style={{ background: '#041635', aspectRatio: '4/3', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                {/* Silhouette */}
                <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'absolute', top: '74px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '60px', borderRadius: '50px 50px 0 0', background: 'rgba(255,255,255,0.06)' }} />
                {/* Teleprompter overlay */}
                <div style={{ background: 'rgba(4,22,53,0.85)', backdropFilter: 'blur(4px)', padding: '14px 18px', borderTop: '1px solid rgba(216,249,80,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D8F950' }} />
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#D8F950', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>TELEPROMPTER</span>
                    </div>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>Speed: 1.0x</span>
                  </div>
                  <div style={{ overflow: 'hidden', height: '52px', position: 'relative' }}>
                    <motion.div animate={{ y: [0, -40] }} transition={{ duration: 4, ease: 'linear', repeat: Infinity, repeatDelay: 1 }}>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
                        Hi, I&apos;m Oliver — a supply chain specialist who&apos;s reduced logistics costs by over 23% across two companies. I&apos;m passionate about building systems that scale, and I&apos;d love to bring that same drive to your team. Here&apos;s what I&apos;ve built...
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
              {/* Controls bar */}
              <div style={{ background: '#fff', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#041635', fontFamily: 'var(--font-body)' }}>Recording — 0:47</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['0.5x', '1.0x', '1.5x'].map(s => (
                    <button key={s} style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', fontSize: '11px', fontWeight: 600, background: s === '1.0x' ? '#041635' : '#F7F8FA', color: s === '1.0x' ? '#fff' : '#9A9FA8', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IntegrationsFeature() {
  const integrations = ['LinkedIn', 'Indeed', 'Greenhouse', 'Lever', 'Workday', 'Ashby', 'Jobvite', 'Gmail', 'Outlook', 'Slack', 'Notion', 'Zapier'];

  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0C63E3', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Integrations</p>
          <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 900, color: '#041635', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Apply anywhere. Stand out everywhere.
          </h2>
          <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Your Reslink link works with every job board, ATS, and inbox. One link to rule them all.
          </p>
        </motion.div>

        {/* Integration grid */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', marginBottom: '40px' }}>
            {integrations.map((name, i) => (
              <motion.div key={name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{ borderRadius: '14px', border: '1px solid #EEEEF0', padding: '20px 12px', textAlign: 'center', cursor: 'default' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#F7F8FA', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#041635', fontFamily: 'var(--font-phudu)' }}>{name[0]}</span>
                </div>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#5C6070', fontFamily: 'var(--font-body)' }}>{name}</p>
              </motion.div>
            ))}
          </div>

          {/* Center CTA strip */}
          <div style={{ borderRadius: '20px', background: '#041635', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: '28px', fontWeight: 900, color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em' }}>Ready to get started?</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>Join thousands of job seekers already using Reslink.</p>
            </div>
            <a href="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px', flexShrink: 0 }}>Create your free account</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Features() {
  return (
    <>
      <AnalyticsFeature />
      <CoachAIFeature />
      <TeleprompterFeature />
      <IntegrationsFeature />
    </>
  );
}
