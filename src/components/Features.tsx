'use client';

import { motion } from 'framer-motion';

const featureSections = [
  {
    label: 'For Job Seekers',
    title: 'Your profile works for you, 24/7.',
    desc: "While you sleep, recruiters discover your video resume. Every view is tracked, every play is recorded. You'll always know when to follow up.",
    cta: { label: 'Learn more', href: '/job-seekers' },
    mockup: 'analytics',
  },
  {
    label: 'For Companies',
    title: 'Find candidates who stand out.',
    desc: 'Browse a curated pool of video resumes. See the real person behind the application before scheduling a single interview.',
    cta: { label: 'Learn more', href: '/companies' },
    mockup: 'search',
  },
];

function AnalyticsMockup() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border" style={{ borderColor: '#EEEEF0' }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: '#9A9FA8' }}>
        This week
      </p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Profile views', value: '342', change: '+28%' },
          { label: 'Video plays', value: '189', change: '+15%' },
          { label: 'Click-throughs', value: '47', change: '+42%' },
          { label: 'Recruiter contacts', value: '12', change: '+8' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl p-4" style={{ background: '#F7F8FA' }}>
            <p className="font-bold text-xl" style={{ color: '#0B1437' }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9A9FA8' }}>{s.label}</p>
            <p className="text-xs mt-1 font-semibold" style={{ color: '#22c55e' }}>{s.change}</p>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1.5" style={{ height: '56px' }}>
        {[30, 50, 40, 70, 55, 90, 65].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              background: i === 5 ? '#FF5A1F' : '#EEEEF0',
            }}
          />
        ))}
      </div>
      <p className="text-xs mt-2 text-center" style={{ color: '#C8CBD2' }}>Views — last 7 days</p>
    </div>
  );
}

function SearchMockup() {
  const candidates = [
    { name: 'Oliver Stone', role: 'Supply Chain', location: 'New York', initials: 'OS' },
    { name: 'Priya Patel', role: 'UX Designer', location: 'London', initials: 'PP' },
    { name: 'Marcus Lee', role: 'Finance Analyst', location: 'Toronto', initials: 'ML' },
  ];
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border" style={{ borderColor: '#EEEEF0' }}>
      <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-5" style={{ background: '#F7F8FA' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span className="text-sm" style={{ color: '#9A9FA8' }}>Search candidates by role, skill, location...</span>
      </div>
      <div className="flex flex-col gap-2">
        {candidates.map((c) => (
          <div key={c.name} className="flex items-center justify-between rounded-xl p-3" style={{ background: '#F7F8FA' }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: '#0B1437' }}
              >
                {c.initials}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#0B1437' }}>{c.name}</p>
                <p className="text-xs" style={{ color: '#9A9FA8' }}>{c.role} · {c.location}</p>
              </div>
            </div>
            <button
              className="text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: '#FFF0EB', color: '#FF5A1F' }}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="flex flex-col gap-24">
          {featureSections.map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#FF5A1F' }}>
                  {section.label}
                </p>
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-5 leading-tight" style={{ color: '#0B1437' }}>
                  {section.title}
                </h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: '#5C6070' }}>
                  {section.desc}
                </p>
                <a href={section.cta.href} className="btn-outline">
                  {section.cta.label} →
                </a>
              </div>
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                {section.mockup === 'analytics' ? <AnalyticsMockup /> : <SearchMockup />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
