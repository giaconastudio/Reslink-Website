'use client';

import { motion } from 'framer-motion';
import { UserPlus, Upload, Video, Share2 } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create your free account',
    desc: 'Sign up in 30 seconds. No credit card required.',
  },
  {
    icon: Upload,
    title: 'Upload your resume',
    desc: 'Drop in your existing PDF and we build your profile automatically.',
  },
  {
    icon: Video,
    title: 'Record a video pitch',
    desc: "Use our built-in recorder or upload one you've already made.",
  },
  {
    icon: Share2,
    title: 'Share your Reslink',
    desc: "Paste your link in applications and track who's watching.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24" style={{ background: '#F7F8FA' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>
            How it works
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: '#0B1437' }}>
            Up and running in minutes
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6"
              style={{ boxShadow: '0 1px 4px rgba(11,20,55,0.06)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: '#FFF0EB' }}
                >
                  <step.icon size={16} style={{ color: '#FF5A1F' }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: '#C8CBD2' }}
                >
                  Step {i + 1}
                </span>
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#0B1437' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5C6070' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="/signup" className="btn-primary">
            Create your free video resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
