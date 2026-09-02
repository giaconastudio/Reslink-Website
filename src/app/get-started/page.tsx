'use client';

import { useState, Suspense, type ElementType } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, CheckCircle, Eye, EyeOff, Briefcase, Building2, Users, GraduationCap, Flag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type AccountType = 'seeker' | 'student' | 'veteran' | 'company' | 'agency' | 'university';

type TypeCard = { id: AccountType; icon: ElementType; label: string; desc: string; tag?: string; tagBg?: string; tagColor?: string };

const INDIVIDUAL_TYPES: TypeCard[] = [
  { id: 'seeker', icon: Briefcase, label: 'Job Seeker', desc: 'Stand out and land more interviews' },
  { id: 'student', icon: GraduationCap, label: 'Student', desc: 'Land your first job or internship', tag: 'Half price', tagBg: '#FBEAF5', tagColor: '#D63D9D' },
  { id: 'veteran', icon: Flag, label: 'Veteran', desc: 'Translate your service into opportunity', tag: 'Half price', tagBg: '#EEF7CF', tagColor: '#5B7A0F' },
];

const ORG_TYPES: TypeCard[] = [
  { id: 'company', icon: Building2, label: 'Company', desc: 'Hiring for your own team' },
  { id: 'agency', icon: Users, label: 'Recruitment Agency', desc: 'Placing candidates with clients' },
  { id: 'university', icon: GraduationCap, label: 'University', desc: 'Supporting students into work' },
];

const ALL_TYPES = [...INDIVIDUAL_TYPES, ...ORG_TYPES];

// Each type's main video — pulled straight from that audience's own page.
// `pos` = object-position (which part of the frame shows); `scale` zooms in.
const VIDEOS: Record<AccountType, { src: string; pos: string; scale: number }> = {
  seeker: { src: '/videos/hero-pink.mp4', pos: '50% 25%', scale: 1.35 },
  student: { src: '/videos/student-hero.mp4', pos: '50% 18%', scale: 1 },
  veteran: { src: '/videos/military.mp4', pos: '50% 30%', scale: 1 },
  company: { src: '/videos/cta-resume.mp4', pos: '50% 22%', scale: 1 },
  agency: { src: '/videos/agencies-office.mp4', pos: '50% 30%', scale: 1 },
  university: { src: '/videos/universities-students.mp4', pos: '50% 45%', scale: 1 },
};

// Company sees a wall of candidates instead of a single one.
const COMPANY_FACES = [
  '/videos/hero-reel-d.jpg',
  '/videos/hero-cta-resume.jpg',
  '/videos/hero-reel-b.jpg',
];

// Job seeker / student / veteran share ONE right-hand panel — only the tag
// (from ALL_TYPES) and the video (from VIDEOS) change between them.
const INDIVIDUAL_PANEL = {
  headline: 'Show them why\nthey should hire you',
  sub: 'One link. Your video intro, your resume, your work.',
  quote: '"Reslink got me interviews at companies that had ignored my PDF for months."',
  author: 'Software Engineer', role: 'hired at a Fortune 500',
  stats: [{ val: '3×', label: 'more callbacks' }, { val: '85%', label: 'avg. watch rate' }, { val: '5 min', label: 'to your first Reslink' }],
};

// The candidate banner under the video — one person per individual type, matched
// to the face in that type's video and the example profile on its page.
const INDIVIDUAL_BANNER: Record<'seeker' | 'student' | 'veteran', { name: string; role: string; watch: string }> = {
  seeker: { name: 'Amara Okafor', role: 'Supply Chain Specialist · New York', watch: 'Recruiter at HubSpot watched 87%' },
  student: { name: 'Zara Johnson', role: 'Marketing · Class of 2025', watch: 'Recruiter at Google watched 92%' },
  veteran: { name: 'Jordan Hayes', role: 'Operations · US Marines Veteran', watch: 'Recruiter at Deloitte watched 90%' },
};

const PANELS: Record<AccountType, {
  headline: string; sub: string; quote: string; author: string; role: string;
  stats: { val: string; label: string }[]; avatar?: string;
}> = {
  seeker: INDIVIDUAL_PANEL,
  student: INDIVIDUAL_PANEL,
  veteran: INDIVIDUAL_PANEL,
  company: {
    headline: "See who's worth a call\nbefore you make one",
    sub: 'Every applicant sends a video pitch, not just a PDF.',
    quote: '"Reslink cut our first-round phone screens by 60%. The candidates we do call are genuinely the right ones."',
    author: 'Head of Talent', role: '',
    avatar: '/avatars/a4.jpg',
    stats: [],
  },
  agency: {
    headline: 'Send clients more\nthan a resume',
    sub: 'Clients see the person, not just the paperwork.',
    quote: '"Our resume-to-interview ratio doubled. Same candidates, better presented."',
    author: 'Principal Recruiter', role: '',
    avatar: '/avatars/a3.jpg',
    stats: [],
  },
  university: {
    headline: 'Get more of your\nstudents hired',
    sub: 'Every student sends a video pitch, not just a PDF.',
    quote: '"It\'s the first thing we\'ve given students that helps the ones without internships or connections."',
    author: 'Director of Career Services', role: '',
    avatar: '/avatars/a5.jpg',
    stats: [],
  },
};

function RightSide({ type }: { type: AccountType }) {
  const p = PANELS[type];
  const label = ALL_TYPES.find(t => t.id === type)!.label;
  const v = VIDEOS[type];
  const isIndividual = type === 'seeker' || type === 'student' || type === 'veteran';
  const banner = isIndividual ? INDIVIDUAL_BANNER[type] : null;
  // Agency & university show just the clip — no candidate banner, badge, or timer.
  const videoOnly = type === 'agency' || type === 'university';
  // Company sees a grid of candidate faces instead of a single video card.
  const isCompany = type === 'company';
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '0 20px 20px 0', background: 'radial-gradient(ellipse 62% 50% at 94% 0%, rgba(214,61,157,0.30), transparent 55%), linear-gradient(160deg, #0A2350 0%, #061A3A 62%)' }}>
      <motion.div key={type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', padding: '38px 34px', gap: '18px' }}>
          {/* Tag — changes per type */}
          <span style={{ alignSelf: 'flex-start', background: '#D7FF43', color: '#061A3A', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '100px', padding: '5px 14px', fontFamily: 'var(--font-body)' }}>
            {label}
          </span>
          <div>
            <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 2.8vw, 38px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.95, whiteSpace: 'pre-line', marginBottom: '12px' }}>{p.headline}</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.6, maxWidth: '400px' }}>{p.sub}</p>
          </div>

          {/* Company: a grid of candidate faces. Everyone else: a single video card. */}
          {isCompany ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {COMPANY_FACES.map(src => (
                <div key={src} style={{ position: 'relative', aspectRatio: '1 / 1', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 22px rgba(0,0,0,0.3)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%' }} />
                </div>
              ))}
            </div>
          ) : (
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.35)', ...(isIndividual ? { flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 } : {}) }}>
            <div style={{ position: 'relative', background: '#C74FA0', overflow: 'hidden', ...(isIndividual ? { flex: 1, minHeight: '240px' } : videoOnly ? { height: '200px' } : { height: '138px' }) }}>
              <video key={v.src} src={v.src} autoPlay muted loop playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: v.pos, transform: v.scale !== 1 ? `scale(${v.scale})` : undefined }} />
              {!videoOnly && (
                <>
                  <span style={{ position: 'absolute', top: '12px', left: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(6,26,58,0.55)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', fontFamily: 'var(--font-body)' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D7FF43' }} /> Playing
                  </span>
                </>
              )}
            </div>
            {!videoOnly && (
              <div style={{ padding: '13px 18px' }}>
                <p style={{ fontSize: '16px', fontWeight: 800, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.1 }}>{banner?.name}</p>
                <p style={{ fontSize: '12px', color: '#8A93A3', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{banner?.role}</p>
                <div style={{ borderTop: '1px solid #EDEFF2', margin: '11px 0 9px' }} />
                <p style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: '#3A4150', fontFamily: 'var(--font-body)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5B7A0F', flexShrink: 0 }} />
                  {banner?.watch}
                </p>
              </div>
            )}
          </div>
          )}

          {/* Quote + stats — business types only (individuals just show the video) */}
          {!isIndividual && (
            <>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px 18px' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, fontFamily: 'var(--font-body)', marginBottom: '12px' }}>{p.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {p.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.avatar} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'radial-gradient(circle at 32% 28%, #8FB4FF, #4F6EF7)', flexShrink: 0 }} />
                  )}
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{p.author}</p>
                    {p.role && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: '2px' }}>{p.role}</p>}
                  </div>
                </div>
              </div>
              {p.stats.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: 'auto' }}>
                {p.stats.map(s => {
                  const m = s.val.match(/^([\d.]+)\s*(.*)$/);
                  const num = m ? m[1] : s.val;
                  const unit = m ? m[2] : '';
                  return (
                    <div key={s.label}>
                      <p style={{ fontFamily: 'var(--font-phudu)', fontSize: '24px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
                        {num}{unit && <span style={{ color: '#D7FF43', fontSize: '14px', marginLeft: '1px' }}>{unit}</span>}
                      </p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: '4px', lineHeight: 1.3 }}>{s.label}</p>
                    </div>
                  );
                })}
              </div>
              )}
            </>
          )}
        </motion.div>
    </div>
  );
}

function GetStartedForm() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const initialType: AccountType = ALL_TYPES.some(t => t.id === typeParam) ? (typeParam as AccountType) : 'seeker';
  const initialAudience: 'individual' | 'org' = ORG_TYPES.some(t => t.id === initialType) ? 'org' : 'individual';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [audience, setAudience] = useState<'individual' | 'org'>(initialAudience);
  const [selectedType, setSelectedType] = useState<AccountType>(initialType);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '' });

  const currentGroup = audience === 'individual' ? INDIVIDUAL_TYPES : ORG_TYPES;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid #ECEEF1', fontSize: '14px',
    fontFamily: 'var(--font-body)', color: '#061A3A', outline: 'none',
    boxSizing: 'border-box', background: '#FAFAFA',
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '108px 24px 48px', boxSizing: 'border-box' }}>
        <style>{`
          .gs-card { display: grid; grid-template-columns: 460px 1fr; width: 100%; max-width: 1040px; min-height: 600px; background: #fff; border-radius: 20px; box-shadow: 0 8px 48px rgba(6,26,58,0.13); overflow: hidden; }
          .gs-right-col { display: block; }
          @media (max-width: 800px) { .gs-card { grid-template-columns: 1fr !important; } .gs-right-col { min-height: 280px !important; border-radius: 0 !important; } }
          @media (max-width: 800px) { .gs-right-col > div { border-radius: 0 0 20px 20px !important; } }
          .gs-type-btn:hover { background: #F4F6FF !important; border-color: #BDC8D8 !important; }
          input:focus { border-color: #1468E8 !important; outline: none; }
        `}</style>

        <AnimatePresence mode="wait">

          {/* Step 1 */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="gs-card">
              {/* Left */}
              <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: '32px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', marginBottom: '8px' }}>Create an account</h1>
                  <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', lineHeight: 1.5, marginBottom: '20px' }}>What best describes you?</p>

                  {/* Audience toggle */}
                  <div style={{ display: 'flex', gap: '6px', background: '#ECEEF1', borderRadius: '14px', padding: '5px', marginBottom: '20px' }}>
                    {(['individual', 'org'] as const).map(a => (
                      <button key={a} onClick={() => {
                        setAudience(a);
                        setSelectedType(a === 'individual' ? 'seeker' : 'company');
                      }}
                        style={{ flex: 1, padding: '10px 12px', borderRadius: '10px', border: 'none', background: 'transparent', color: audience === a ? '#fff' : '#9A9FA8', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'color 0.2s', position: 'relative' }}>
                        {audience === a && <motion.span layoutId="gsAudiencePill" transition={{ type: 'spring', stiffness: 450, damping: 38 }} style={{ position: 'absolute', inset: 0, background: '#061A3A', borderRadius: '10px', boxShadow: '0 2px 10px rgba(6,26,58,0.28)', zIndex: 0 }} />}
                        <span style={{ position: 'relative', zIndex: 1 }}>{a === 'individual' ? 'Individuals' : 'Business'}</span>
                      </button>
                    ))}
                  </div>

                  {/* Account type cards */}
                  <AnimatePresence mode="wait">
                    <motion.div key={audience} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentGroup.map(({ id, label, desc, tag, tagBg, tagColor }) => {
                        const active = selectedType === id;
                        return (
                          <button key={id} onClick={() => setSelectedType(id)} className={active ? '' : 'gs-type-btn'}
                            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '14px', padding: '15px 16px 15px 22px', borderRadius: '14px', border: active ? '1.5px solid #1468E8' : '1.5px solid #ECEEF1', background: active ? '#EEF4FF' : '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%' }}>
                            {/* Left accent bar */}
                            <span style={{ position: 'absolute', left: '10px', top: '15px', bottom: '15px', width: '4px', borderRadius: '100px', background: active ? '#1468E8' : '#E2E6EC' }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                <p style={{ fontSize: '15px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', lineHeight: 1.2 }}>{label}</p>
                                {tag && <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: tagColor, background: tagBg, borderRadius: '100px', padding: '3px 9px', fontFamily: 'var(--font-body)' }}>{tag}</span>}
                              </div>
                              <p style={{ fontSize: '13px', color: active ? '#5C6070' : '#9A9FA8', fontFamily: 'var(--font-body)', marginTop: '3px', lineHeight: 1.3 }}>{desc}</p>
                            </div>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: active ? 'none' : '2px solid #DCDFE6', background: active ? '#1468E8' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                              {active && <Check size={14} color="#fff" strokeWidth={3} />}
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <button onClick={() => setStep(2)}
                    style={{ width: '100%', padding: '14px', background: '#1468E8', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.15s, transform 0.1s', marginBottom: '14px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A52C4'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1468E8'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                    Continue <ArrowRight size={16} />
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: '#1468E8', textDecoration: 'none', fontWeight: 700 }}>Log in</Link>
                  </p>
                </div>
              </div>
              {/* Right */}
              <div className="gs-right-col"><RightSide type={selectedType} /></div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="gs-card">
              {/* Left */}
              <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EEF4FF', borderRadius: '100px', padding: '5px 12px', marginBottom: '16px', width: 'fit-content' }}>
                  {(() => { const t = ALL_TYPES.find(t => t.id === selectedType)!; const Icon = t.icon; return <><Icon size={12} color="#1468E8" /><span style={{ fontSize: '12px', fontWeight: 700, color: '#1468E8', fontFamily: 'var(--font-body)' }}>{t.label}</span></>; })()}
                </div>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '30px', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', marginBottom: '6px' }}>Your details</h2>
                <p style={{ fontSize: '13px', color: '#9A9FA8', fontFamily: 'var(--font-body)', marginBottom: '22px' }}>You&apos;re almost in.</p>

                <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1.5px solid #ECEEF1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)', cursor: 'pointer', marginBottom: '16px', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F6F7F9')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
                  <span style={{ fontSize: '12px', color: '#C4C8D0', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>or with email</span>
                  <div style={{ flex: 1, height: '1px', background: '#ECEEF1' }} />
                </div>

                <form onSubmit={e => { e.preventDefault(); setStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Full name</label>
                      <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
                      <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Reslink username</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: '#BEC3CC', fontFamily: 'var(--font-body)', pointerEvents: 'none' }}>reslink.io/</span>
                      <input type="text" placeholder="yourname" value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))} required style={{ ...inputStyle, paddingLeft: '92px' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#9A9FA8', marginBottom: '5px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input type={showPw ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required minLength={8} style={{ ...inputStyle, paddingRight: '44px' }} />
                      <button type="button" onClick={() => setShowPw(p => !p)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        {showPw ? <EyeOff size={16} color="#9A9FA8" /> : <Eye size={16} color="#9A9FA8" />}
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '12px', background: '#F6F7F9', color: '#5C6070', border: '1.5px solid #ECEEF1', borderRadius: '10px', fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>Back</button>
                    <button type="submit"
                      style={{ flex: 2, padding: '12px', background: '#1468E8', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#0A52C4')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#1468E8')}>
                      Create my Reslink <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
                <p style={{ marginTop: '14px', fontSize: '11px', color: '#C4C8D0', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
                  By signing up you agree to our <Link href="#" style={{ color: '#9A9FA8', textDecoration: 'none' }}>Terms</Link> & <Link href="#" style={{ color: '#9A9FA8', textDecoration: 'none' }}>Privacy</Link>.
                </p>
              </div>
              {/* Right */}
              <div className="gs-right-col"><RightSide type={selectedType} /></div>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
              style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 8px 48px rgba(6,26,58,0.13)', padding: '64px 48px', textAlign: 'center', maxWidth: '480px', width: '100%' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#D7FF43', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle size={36} color="#061A3A" strokeWidth={2.5} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.03em', marginBottom: '12px' }}>You&apos;re in.</h2>
              <p style={{ fontSize: '15px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.65, marginBottom: '32px' }}>
                Welcome, {form.name.split(' ')[0] || 'there'}. Time to build something that gets you noticed.
              </p>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#1468E8', color: '#fff', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
                Start building <ArrowRight size={14} />
              </Link>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense fallback={null}>
      <GetStartedForm />
    </Suspense>
  );
}
