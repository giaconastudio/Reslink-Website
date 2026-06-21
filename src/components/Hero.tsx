'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import Link from 'next/link';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden gradient-navy noise">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FF5A1F 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #4F6EF7 0%, transparent 70%)' }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{ backgroundColor: '#FF5A1F' }} />
              <span className="text-white/80 text-sm font-medium">The #1 Video Resume Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
            >
              Your Resume,{' '}
              <span className="gradient-text">But Better.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg"
            >
              Stop blending in. Reslink lets you build a personalized video resume that puts a face to your name — so recruiters remember you, not just your PDF.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link href="/signup" className="btn-primary text-base px-7 py-3.5">
                Create Your Free Video Resume
                <ArrowRight size={16} />
              </Link>
              <button className="btn-secondary flex items-center gap-2 text-base px-6 py-3.5">
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <Play size={12} fill="white" className="ml-0.5" />
                </span>
                See how it works
              </button>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-teal-400'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-navy ${c} flex items-center justify-center text-white text-xs font-bold`}>
                    {['A', 'B', 'C', 'D', 'E'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#FF5A1F" className="text-orange-400" style={{ color: '#FF5A1F' }} />
                  ))}
                </div>
                <p className="text-white/60 text-sm">
                  <span className="text-white font-semibold">200+ candidates</span> landed interviews
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right — Product mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative">
              {/* Profile card */}
              <div className="glass rounded-2xl p-6 shadow-2xl" style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.4)' }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      O
                    </div>
                    <div>
                      <p className="text-white font-bold text-base">Oliver Stone</p>
                      <p className="text-white/50 text-xs">Supply Chain Operations</p>
                    </div>
                  </div>
                  <div className="glass rounded-lg px-3 py-1.5">
                    <p className="text-white/70 text-xs">New York, NY</p>
                  </div>
                </div>

                {/* Video preview placeholder */}
                <div
                  className="relative rounded-xl overflow-hidden mb-5"
                  style={{ height: '200px', background: 'linear-gradient(135deg, #1a2456 0%, #0d1b3e 100%)' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/15 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/25 transition-colors glow-orange">
                      <Play size={20} fill="white" className="ml-1 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="glass rounded-md px-2 py-1">
                      <p className="text-white/70 text-xs">Video Pitch • 1:32</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1.5 h-4 rounded-full bg-orange-400 opacity-80" style={{ height: `${[16, 24, 12][i]}px`, backgroundColor: '#FF5A1F' }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Profile Views', value: '1.2k' },
                    { label: 'Video Plays', value: '847' },
                    { label: 'Responses', value: '23' },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-xl p-3 text-center">
                      <p className="text-white font-bold text-lg">{stat.value}</p>
                      <p className="text-white/45 text-xs mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating notification cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="absolute -left-14 top-1/3 glass-white rounded-xl p-3 shadow-xl w-48"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    A
                  </div>
                  <div>
                    <p className="text-navy text-xs font-semibold">Amazon viewed your</p>
                    <p className="text-navy text-xs font-semibold">video resume</p>
                    <p className="text-gray-400 text-xs mt-0.5">2 min ago</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -right-10 bottom-1/4 glass-white rounded-xl p-3 shadow-xl w-44"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
                  <p className="text-navy text-xs font-semibold">Interview Scheduled</p>
                </div>
                <p className="text-gray-500 text-xs">Meta · Tomorrow at 2pm</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
