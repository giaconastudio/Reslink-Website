'use client';

import { motion } from 'framer-motion';
import { UserPlus, Upload, Video, Share2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create your free account',
    desc: 'Sign up in 30 seconds. No credit card needed — your Reslink profile is always free.',
  },
  {
    number: '02',
    icon: Upload,
    title: 'Upload your resume',
    desc: 'Drop in your existing PDF. We parse it instantly and build your profile automatically.',
  },
  {
    number: '03',
    icon: Video,
    title: 'Record your video pitch',
    desc: "Use our built-in recorder or upload a video you've already made. Keep it under 2 minutes — punchy wins.",
  },
  {
    number: '04',
    icon: Share2,
    title: 'Share your Reslink',
    desc: "Paste your link in job applications, emails, or LinkedIn. Track who's watching and when.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section" style={{ background: '#F8F9FC' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>
            How it works
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: '#0B1437' }}>
            Up and running in{' '}
            <span className="gradient-text">under 10 minutes</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #E5E7EB 10%, #E5E7EB 90%, transparent)', top: '52px' }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className="relative mb-6 z-10">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: 'white', boxShadow: '0 8px 32px rgba(11,20,55,0.1)' }}
                  >
                    <step.icon size={32} style={{ color: '#FF5A1F' }} />
                  </div>
                  <span
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center"
                    style={{ background: '#0B1437', fontSize: '11px' }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0B1437' }}>{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a href="/signup" className="btn-primary text-base px-8 py-4 inline-flex">
            Start for Free — No Credit Card
          </a>
        </motion.div>
      </div>
    </section>
  );
}
