'use client';

import { motion, type Variants } from 'framer-motion';
import { Zap, Share2, UserCheck, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Attract recruiters instantly',
    desc: 'A video profile is 6x more likely to get a response than a plain PDF resume. Stand out the moment your profile loads.',
  },
  {
    icon: Share2,
    title: 'Share with a single link',
    desc: 'One link. Works everywhere — email, LinkedIn, job applications, QR codes. No downloads, no friction.',
  },
  {
    icon: UserCheck,
    title: 'Personalize your pitch',
    desc: 'Record a custom video for each role. Show your personality, communication skills, and drive — things a resume can never capture.',
  },
  {
    icon: TrendingUp,
    title: 'Land interviews faster',
    desc: 'Real-time analytics show you who viewed your video and how long they watched — so you know when to follow up.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ValueProp() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-4" style={{ color: '#FF5A1F' }}>
              Why Reslink
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy leading-tight mb-6" style={{ color: '#0B1437' }}>
              Forget boring resumes.{' '}
              <span className="gradient-text">Send a video pitch instead.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              The job market is crowded. Your resume looks like everyone else's. Reslink gives you a way to show — not just tell — recruiters why you're the right hire.
            </p>
            <a href="/signup" className="btn-primary inline-flex" style={{ width: 'fit-content' }}>
              Build Your Video Resume Free
            </a>
          </motion.div>

          {/* Right — feature grid */}
          <motion.div
            className="grid sm:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-lg transition-all duration-300 cursor-default"
                style={{ '--hover-shadow': '0 10px 40px rgba(255, 90, 31, 0.08)' } as React.CSSProperties}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors"
                  style={{ background: '#FFF1EC' }}
                >
                  <f.icon size={20} style={{ color: '#FF5A1F' }} />
                </div>
                <h3 className="font-bold text-navy text-base mb-2" style={{ color: '#0B1437' }}>{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
