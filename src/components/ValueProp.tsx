'use client';

import { motion } from 'framer-motion';
import { Zap, Share2, UserCheck, BarChart2 } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Attract recruiters instantly', desc: 'A video profile gets 6x more responses than a plain PDF. Get noticed the moment your link is opened.' },
  { icon: Share2, title: 'Share with a single link', desc: 'One URL. Works in emails, LinkedIn, job applications, and QR codes. No downloads, no friction.' },
  { icon: UserCheck, title: 'Personalize your pitch', desc: 'Show your personality, communication style, and drive — things a resume can never convey.' },
  { icon: BarChart2, title: 'Know when to follow up', desc: 'See exactly who viewed your profile and how long they watched, so you reach out at the right moment.' },
];

export default function ValueProp() {
  return (
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 64px' }}
        >
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF5A1F', marginBottom: '16px' }}>
            Why Reslink
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0B1437', lineHeight: 1.12, marginBottom: '20px' }}>
            Forget boring resumes.<br />Send a video pitch instead.
          </h2>
          <p style={{ fontSize: '17px', color: '#5C6070', lineHeight: 1.65 }}>
            The job market is crowded. Your PDF looks like everyone else&apos;s. Reslink gives you a way to show — not just tell — why you&apos;re the right hire.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FFF0EB', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <f.icon size={18} color="#FF5A1F" />
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0B1437', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.65 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
