'use client';

import { motion } from 'framer-motion';
import { UserPlus, Upload, Video, Share2 } from 'lucide-react';

const steps = [
  { icon: UserPlus, title: 'Create your free account', desc: 'Sign up in 30 seconds. No credit card required.' },
  { icon: Upload, title: 'Upload your resume', desc: 'Drop in your existing PDF and we build your profile automatically.' },
  { icon: Video, title: 'Record a video pitch', desc: "Use our built-in recorder or upload a video you've already made." },
  { icon: Share2, title: 'Share your Reslink', desc: "Paste your link in applications and track who's watching." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '96px 0', background: '#F7F8FA' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 56px' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C5E63A', marginBottom: '16px' }}>
            How it works
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0C1E5B', lineHeight: 1.12 }}>
            Up and running in minutes
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(11,20,55,0.06)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EBF5D6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <step.icon size={15} color="#FF5A1F" />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C8CBD2' }}>
                  Step {i + 1}
                </span>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0C1E5B', marginBottom: '8px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.6 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/signup" className="btn-primary">Create your free video resume</a>
        </div>
      </div>
    </section>
  );
}
