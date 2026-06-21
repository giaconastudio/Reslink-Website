'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-white text-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8"
            style={{ background: '#FFF0EB', color: '#FF5A1F' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            The #1 platform for video resumes
          </div>

          {/* Headline */}
          <h1
            className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6"
            style={{ color: '#0B1437' }}
          >
            Your resume,{' '}
            <span style={{ color: '#FF5A1F' }}>but better.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-xl leading-relaxed mb-10 mx-auto"
            style={{ color: '#5C6070', maxWidth: '560px' }}
          >
            Reslink helps you stand out and land more interviews by creating personalized video resumes that build human connections with recruiters.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-16">
            <Link href="/signup" className="btn-primary text-base" style={{ padding: '14px 28px' }}>
              Create your free video resume
              <ArrowRight size={16} />
            </Link>
            <Link href="#how-it-works" className="btn-outline text-base" style={{ padding: '14px 28px' }}>
              See how it works
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-sm mb-4" style={{ color: '#9A9FA8' }}>
            Trusted by candidates who landed jobs at
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['Amazon', 'Meta', 'Google', 'Tesla', 'Revolut', 'EY', 'Accenture'].map((co) => (
              <span
                key={co}
                className="text-base font-bold"
                style={{ color: '#C8CBD2' }}
              >
                {co}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Product screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 relative mx-auto"
          style={{ maxWidth: '900px' }}
        >
          {/* Browser chrome */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100"
            style={{ boxShadow: '0 24px 80px rgba(11,20,55,0.12)' }}
          >
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100" style={{ background: '#F7F8FA' }}>
              <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
              <div
                className="flex-1 mx-4 rounded-md px-3 py-1 text-xs text-center"
                style={{ background: '#EEEEF0', color: '#9A9FA8' }}
              >
                reslink.io/oliverstone
              </div>
            </div>

            {/* Mock profile UI */}
            <div className="bg-white p-8">
              <div className="grid grid-cols-3 gap-6 items-start">
                {/* Left — profile info */}
                <div className="col-span-1 text-left">
                  <div
                    className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-2xl font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #0B1437, #1a2456)' }}
                  >
                    OS
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#0B1437' }}>Oliver Stone</h3>
                  <p className="text-sm mb-3" style={{ color: '#5C6070' }}>Supply Chain Operations</p>
                  <p className="text-xs mb-4" style={{ color: '#9A9FA8' }}>New York, NY</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {['Operations', 'Logistics', 'SAP', 'Analytics'].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: '#F7F8FA', color: '#5C6070' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Center — video player */}
                <div className="col-span-2">
                  <div
                    className="rounded-xl overflow-hidden mb-4 flex items-center justify-center relative"
                    style={{ background: '#0B1437', aspectRatio: '16/9' }}
                  >
                    {/* Play button */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
                      style={{ background: '#FF5A1F' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    {/* Duration */}
                    <div
                      className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ background: 'rgba(0,0,0,0.5)' }}
                    >
                      1:32
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Profile views', value: '1,204' },
                      { label: 'Video plays', value: '847' },
                      { label: 'Recruiter contacts', value: '23' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl p-3 text-center"
                        style={{ background: '#F7F8FA' }}
                      >
                        <p className="font-bold text-lg" style={{ color: '#0B1437' }}>{stat.value}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#9A9FA8' }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle shadow below */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full blur-3xl"
            style={{ width: '70%', height: '40px', background: 'rgba(11,20,55,0.08)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
