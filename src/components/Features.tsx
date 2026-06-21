'use client';

import { motion } from 'framer-motion';
import { BarChart2, Mic, Link2, LayoutGrid } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Built-in Video Recorder',
    desc: 'Record your pitch directly in the browser. No software to install, no editing skills required.',
    color: '#FF5A1F',
    bg: '#FFF1EC',
  },
  {
    icon: BarChart2,
    title: 'Real-Time Analytics',
    desc: 'See exactly who viewed your profile, how many times, and how long they watched your video.',
    color: '#4F6EF7',
    bg: '#EEF1FF',
  },
  {
    icon: Link2,
    title: 'One-Click Sharing',
    desc: 'Your personal Reslink URL works anywhere — email signatures, cover letters, LinkedIn, QR codes.',
    color: '#10B981',
    bg: '#ECFDF5',
  },
  {
    icon: LayoutGrid,
    title: 'ATS-Compatible',
    desc: 'Your video resume integrates seamlessly with all major applicant tracking systems and job boards.',
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
];

export default function Features() {
  return (
    <section className="section bg-white">
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
            Platform Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4" style={{ color: '#0B1437' }}>
            Everything you need to{' '}
            <span className="gradient-text">get hired faster</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Built specifically for job seekers who want to make a lasting impression.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
              style={{ '--shadow-color': f.color } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.bg }}
              >
                <f.icon size={22} style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#0B1437' }}>{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Dark feature showcase */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 rounded-3xl overflow-hidden gradient-navy relative"
          style={{ minHeight: '400px' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
              style={{ background: 'radial-gradient(circle, #FF5A1F 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          </div>
          <div className="relative z-10 p-12 lg:p-16 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>
                Built for job seekers
              </span>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
                Your profile works for you, 24/7
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                While you sleep, recruiters discover your profile. Every view is tracked, every play is recorded. You'll know exactly when to reach out.
              </p>
              <a href="/job-seekers" className="btn-primary inline-flex">
                See all job seeker features
              </a>
            </div>
            {/* Mock analytics card */}
            <div className="glass rounded-2xl p-6">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">This Week's Activity</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Profile views', value: '342', change: '+28%' },
                  { label: 'Video plays', value: '189', change: '+15%' },
                  { label: 'Click-throughs', value: '47', change: '+42%' },
                  { label: 'Recruiter contacts', value: '12', change: '+8' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4">
                    <p className="text-white font-bold text-xl">{stat.value}</p>
                    <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                    <p className="text-green-400 text-xs mt-1 font-semibold">{stat.change}</p>
                  </div>
                ))}
              </div>
              {/* Mini chart */}
              <div className="flex items-end gap-1.5 h-16">
                {[40, 60, 45, 80, 65, 95, 75].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm opacity-60" style={{
                    height: `${h}%`,
                    background: i === 5 ? '#FF5A1F' : 'rgba(255,255,255,0.2)',
                    opacity: i === 5 ? 1 : 0.4,
                  }} />
                ))}
              </div>
              <p className="text-white/30 text-xs mt-2 text-center">Views over the past 7 days</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
