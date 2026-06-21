'use client';

import { motion } from 'framer-motion';
import { Zap, Share2, UserCheck, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Attract recruiters instantly',
    desc: 'A video profile gets 6x more responses than a plain PDF. Get noticed the moment your link is opened.',
  },
  {
    icon: Share2,
    title: 'Share with a single link',
    desc: 'One URL. Works in emails, LinkedIn, job applications, and QR codes. No downloads, no friction.',
  },
  {
    icon: UserCheck,
    title: 'Personalize your pitch',
    desc: 'Show your personality, communication style, and drive — things a resume can never convey.',
  },
  {
    icon: BarChart2,
    title: 'Know when to follow up',
    desc: 'See exactly who viewed your profile and how long they watched, so you reach out at the right moment.',
  },
];

export default function ValueProp() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>
            Why Reslink
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5" style={{ color: '#0B1437' }}>
            Forget boring resumes.{' '}
            <br />Send a video pitch instead.
          </h2>
          <p className="text-lg" style={{ color: '#5C6070' }}>
            The job market is crowded. Your PDF looks like everyone else&apos;s. Reslink gives you a way to show — not just tell — why you&apos;re the right hire.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: '#FFF0EB' }}
              >
                <f.icon size={18} style={{ color: '#FF5A1F' }} />
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#0B1437' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6070' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
