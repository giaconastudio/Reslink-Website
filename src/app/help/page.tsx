'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserCheck, Play, DollarSign, Settings, Users, BarChart2, GraduationCap, Briefcase, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Article = { q: string; a: string };
type Category = { icon: React.ElementType; color: string; bg: string; title: string; articles: Article[] };

const RECRUITER_CATS: Category[] = [
  {
    icon: UserCheck, color: '#1468E8', bg: '#EEF4FF',
    title: 'Getting Started',
    articles: [
      { q: 'Creating a recruiter account', a: 'Sign up at reslink.io/agencies with your work email to create your agency workspace and start managing candidates in minutes.' },
      { q: 'Setting up your agency profile', a: 'Add your agency name, logo, and specialties so client-facing candidate packs carry your branding.' },
      { q: 'Inviting team members', a: 'From Workspace Settings > Team, invite recruiters by email. Each seat gets full access to your shared candidate pipeline.' },
      { q: 'Navigating the recruiter dashboard', a: 'Your dashboard centers on three tabs: Candidates, Clients, and Analytics — everything you need for a placement is one click away.' },
    ],
  },
  {
    icon: Users, color: '#1468E8', bg: '#EEF4FF',
    title: 'Managing Candidates',
    articles: [
      { q: 'How to add and manage candidates', a: 'Click Add Candidate to upload a resume and invite them to record a Reslink, or import candidates who’ve already applied through your job board.' },
      { q: 'Sharing candidate Reslinks with clients', a: 'Select any candidate and click Share to Client — they’ll get a branded link to view the video pitch and resume without needing a Reslink account.' },
      { q: 'Shortlisting and rating candidates', a: 'Build custom lists per client or role, and rate candidates as you review them to keep your pipeline organized for every placement.' },
      { q: 'Bulk candidate uploads', a: 'Upload a CSV of candidate contacts from Candidates > Bulk Upload to send Reslink invitations to your whole roster at once.' },
    ],
  },
  {
    icon: Play, color: '#1468E8', bg: '#EEF4FF',
    title: 'Presenting to Clients',
    articles: [
      { q: 'Creating client-facing candidate packs', a: 'Select multiple shortlisted candidates and click Create Pack to generate a single branded link showcasing all of them for your client.' },
      { q: 'Sending Reslink profiles via email', a: 'Use the Share button on any candidate or pack to send a branded email directly to your client — no manual link copying needed.' },
      { q: 'How clients view shared profiles', a: 'Clients open a clean, branded page with each candidate’s video pitch and resume — no login or account required on their end.' },
      { q: 'Getting client feedback', a: 'Clients can leave notes or a thumbs-up/down directly on shared profiles, which sync back to your dashboard in real time.' },
    ],
  },
  {
    icon: DollarSign, color: '#1468E8', bg: '#EEF4FF',
    title: 'Plans & Billing',
    articles: [
      { q: 'Agency pricing overview', a: 'Plans are priced by active candidate profiles and recruiter seats: Starter (25 profiles, 3 seats), Growth (100 profiles, 10 seats), and Scale (unlimited, custom).' },
      { q: 'Per-seat vs per-placement billing', a: 'Standard plans bill per recruiter seat. Ask your account manager about custom per-placement pricing if that better fits your agency’s model.' },
      { q: 'Upgrading your agency plan', a: 'Go to Billing > Change Plan to move up a tier as your roster grows — upgrades apply immediately, no interruption to active searches.' },
      { q: 'Requesting an invoice', a: 'Download invoices anytime from Billing > Invoice History, or email billing@reslink.io for PO-ready documentation.' },
    ],
  },
  {
    icon: BarChart2, color: '#1468E8', bg: '#EEF4FF',
    title: 'Analytics & Reporting',
    articles: [
      { q: 'Candidate engagement reports', a: 'See which candidates clients are actually watching and for how long — useful context before your next follow-up call.' },
      { q: 'Placement performance metrics', a: 'Track time-to-placement and candidate-to-hire ratios across your whole roster from the Analytics tab.' },
      { q: 'Client activity dashboards', a: 'See exactly when a client opens a shared pack and how long they spend on each candidate — know the moment to follow up.' },
      { q: 'Exporting recruiter data', a: 'Export candidate and placement data as CSV from Analytics > Export for reporting to your own leadership or clients.' },
    ],
  },
  {
    icon: Settings, color: '#1468E8', bg: '#EEF4FF',
    title: 'Integrations & Tools',
    articles: [
      { q: 'Connecting your CRM', a: 'Sync candidate and client data with your CRM from Settings > Integrations to keep every system in step automatically.' },
      { q: 'ATS integration guide', a: 'Connect your existing ATS so candidate Reslinks appear directly alongside their applications — no manual matching.' },
      { q: 'LinkedIn sourcing workflow', a: 'Use the Reslink Chrome extension to invite LinkedIn candidates to record a video pitch directly from their profile.' },
      { q: 'API access for agencies', a: 'Scale plans include API access for custom integrations — reach out to your account manager to get API keys provisioned.' },
    ],
  },
];

const SEEKER_CATS: Category[] = [
  {
    icon: UserCheck, color: '#1468E8', bg: '#EEF4FF',
    title: 'Getting Started',
    articles: [
      { q: 'How to create a Reslink account', a: 'Sign up free at reslink.io using your name and email — no credit card required. Your profile is ready the moment you land, and you can start building your first Reslink right away.' },
      { q: 'Setting up your Reslink profile', a: 'Add your headline, contact details, portfolio and LinkedIn links, and a profile photo. This information appears alongside your video pitch so recruiters get the full picture in one place.' },
      { q: 'Recording your first video resume', a: 'Open the in-app recorder, use the built-in teleprompter to stay on script, and record a 60–90 second pitch. You can re-record as many times as you like before publishing.' },
      { q: 'How to share your Reslink link', a: 'Every Reslink gets a unique, shareable URL. Paste it into job applications, LinkedIn messages, or your email signature — anywhere a recruiter might see it.' },
    ],
  },
  {
    icon: Play, color: '#1468E8', bg: '#EEF4FF',
    title: 'Using Reslink',
    articles: [
      { q: 'How to create a video using the in-app recorder', a: 'From your dashboard, click Record, grant camera access, and hit the red button when you’re ready. The teleprompter scrolls your script on screen so you stay natural and on-camera.' },
      { q: 'Tips for using the Teleprompter feature', a: 'Write a short, conversational script (60–90 seconds reads naturally), adjust the scroll speed to match your pace, and do a practice run before recording for real.' },
      { q: 'How to submit an application', a: 'Paste your Reslink URL directly into the application form, or attach your resume PDF — it comes with a clickable Play Intro badge built in, so recruiters can watch with one click.' },
      { q: 'Editing and re-recording your video', a: 'Head to your dashboard, select your Reslink, and click Re-record. Your link stays exactly the same, so anyone who already has it will automatically see your latest version.' },
    ],
  },
  {
    icon: DollarSign, color: '#1468E8', bg: '#EEF4FF',
    title: 'Pricing & Subscriptions',
    articles: [
      { q: 'Free vs Premium', a: 'Free gets you up to 2 Reslinks, in-app recording, and limited Pitch AI. Premium unlocks unlimited Reslinks, full analytics on who’s watching, and unlimited Pitch AI script generation.' },
      { q: 'Managing your subscription or plan', a: 'Go to Account Settings > Billing to see your current plan, change your billing cycle, or update your payment method at any time.' },
      { q: 'How to upgrade or downgrade', a: 'From Billing settings, click Change Plan and select Free or Premium. Upgrades apply immediately; downgrades take effect at the end of your current billing period.' },
      { q: 'Cancellation policy', a: 'Cancel anytime from Account Settings — no fees, no phone calls. You’ll keep Premium access until the end of your current billing period, then automatically move to the Free plan.' },
    ],
  },
  {
    icon: BarChart2, color: '#1468E8', bg: '#EEF4FF',
    title: 'Analytics & Views',
    articles: [
      { q: 'Understanding your view analytics', a: 'Your dashboard shows every recruiter who opens your Reslink, how much of your video they watched, and when — so you know exactly who’s paying attention.' },
      { q: 'How to see who viewed your profile', a: 'Open the Analytics tab on your dashboard for a real-time feed of viewers, including company name (when available) and watch time.' },
      { q: 'What counts as a view', a: 'A view is logged the moment someone opens your Reslink page, whether or not they play the video. Watch-time tracking separately shows how much of the video they actually watched.' },
      { q: 'Exporting analytics data', a: 'Premium members can export their full view history as a CSV from the Analytics tab — handy for tracking your job search progress over time.' },
    ],
  },
  {
    icon: Settings, color: '#1468E8', bg: '#EEF4FF',
    title: 'Account & Settings',
    articles: [
      { q: 'Changing your username or email', a: 'Go to Account Settings > Profile to update your email or username. We’ll send a confirmation link to your new email before the change takes effect.' },
      { q: 'Privacy settings and profile visibility', a: 'Under Settings > Privacy, choose whether your Reslink is publicly discoverable or only viewable by people with the direct link.' },
      { q: 'Deleting your account', a: 'In Account Settings, scroll to Danger Zone and select Delete Account. This permanently removes your profile, videos, and analytics — this can’t be undone, so export anything you need first.' },
      { q: 'Resetting your password', a: 'Click Forgot Password on the login screen and we’ll email you a secure reset link. It expires after 30 minutes for your security.' },
    ],
  },
  {
    icon: Users, color: '#1468E8', bg: '#EEF4FF',
    title: 'Sharing & Privacy',
    articles: [
      { q: 'Controlling who can see your Reslink', a: 'Set your link to Public (discoverable) or Unlisted (only people with the link can view) from Settings > Privacy — you can switch anytime.' },
      { q: 'How to disable your link', a: 'Toggle your Reslink to Inactive from your dashboard to temporarily take it offline without deleting it — flip it back on whenever you’re ready to job search again.' },
      { q: 'Sharing on LinkedIn and job boards', a: 'Paste your Reslink URL directly into your LinkedIn ‘Featured’ section or job board applications — it renders as a clean preview card wherever it’s shared.' },
      { q: 'ATS compatibility FAQ', a: 'Reslink supplements your traditional resume rather than replacing it — always submit your standard PDF through an employer’s ATS, then include your Reslink link for the human reviewing it.' },
    ],
  },
];

const COMPANY_CATS: Category[] = [
  {
    icon: Briefcase, color: '#1468E8', bg: '#EEF4FF',
    title: 'Getting Started',
    articles: [
      { q: 'Creating a company account', a: 'Sign up at reslink.io/companies with your work email. You’ll set your company name and logo, then get instant access to your hiring workspace.' },
      { q: 'Setting up your hiring workspace', a: 'Add your open roles, customize your public job board branding, and set screening preferences so every applicant is scored against what matters to your team.' },
      { q: 'Inviting team members', a: 'From Workspace Settings > Team, enter a colleague’s email to invite them. Admins can assign roles like Hiring Manager or Viewer to control what each teammate can see and do.' },
      { q: 'How to post a role with Reslink', a: 'Click New Role from your dashboard, fill in the job details, and publish. Your role instantly appears on your public Reslink job board and can be shared anywhere.' },
    ],
  },
  {
    icon: Play, color: '#1468E8', bg: '#EEF4FF',
    title: 'Reviewing Candidates',
    articles: [
      { q: 'How to view candidate Reslinks', a: 'Every applicant’s profile — video pitch, resume, and AI score — is a single click away from your candidate list. No downloads or attachments needed.' },
      { q: 'Sharing candidate profiles internally', a: 'Click Share on any candidate profile to send it to a teammate. They’ll see the exact same video, resume, and AI breakdown without needing to be added to the role.' },
      { q: 'Rating and shortlisting candidates', a: 'Use the star rating and custom lists (like ‘Final Round’ or ‘Strong Maybes’) to organize candidates as your team reviews them — no spreadsheets required.' },
      { q: 'How to download a video resume', a: 'Open a candidate’s profile and click Download to save their video pitch and resume PDF locally, useful for offline review or sharing outside Reslink.' },
    ],
  },
  {
    icon: DollarSign, color: '#1468E8', bg: '#EEF4FF',
    title: 'Plans & Billing',
    articles: [
      { q: 'Company pricing overview', a: 'Plans are priced by job postings and team seats: Free Trial (14 days, up to 5 postings), Growth (up to 25 postings, 10 seats), and Enterprise (unlimited, custom pricing).' },
      { q: 'How per-seat billing works', a: 'Each team member with dashboard access counts as one seat. You can add or remove seats anytime from Billing, and your invoice adjusts on a pro-rated basis.' },
      { q: 'Upgrading your plan', a: 'Go to Billing > Change Plan to move from Trial to Growth or Growth to Enterprise. Upgrades take effect immediately so you never lose access mid-hire.' },
      { q: 'Requesting an invoice', a: 'Download past invoices anytime from Billing > Invoice History, or email billing@reslink.io for a custom PO-ready invoice.' },
    ],
  },
  {
    icon: BarChart2, color: '#1468E8', bg: '#EEF4FF',
    title: 'Analytics & Reporting',
    articles: [
      { q: 'Candidate engagement analytics', a: 'See applicant volume, average AI score, and time-to-review trends for every open role from your Analytics dashboard.' },
      { q: 'Team activity reports', a: 'Track how quickly each hiring manager reviews candidates and moves them through your pipeline — useful for spotting bottlenecks.' },
      { q: 'Exporting hiring data', a: 'Export candidate and role data as CSV from Analytics > Export, ready to import into your BI tool or ATS.' },
      { q: 'Understanding funnel metrics', a: 'Your funnel view shows candidates at each stage — applied, reviewed, shortlisted, interviewed — so you can see exactly where your process speeds up or stalls.' },
    ],
  },
  {
    icon: Settings, color: '#1468E8', bg: '#EEF4FF',
    title: 'Integrations',
    articles: [
      { q: 'ATS integrations overview', a: 'Reslink connects with major ATS platforms so candidate Reslinks sync directly into your existing pipeline — no double data entry.' },
      { q: 'LinkedIn integration', a: 'Link your company’s LinkedIn page to auto-populate your Reslink job board branding and cross-post open roles.' },
      { q: 'Connecting your HRIS', a: 'From Settings > Integrations, connect your HRIS to automatically sync new hires’ Reslink profiles into onboarding workflows.' },
      { q: 'Webhooks and API access', a: 'Enterprise plans include full API and webhook access — trigger custom workflows whenever a candidate applies, is scored, or is shortlisted.' },
    ],
  },
  {
    icon: GraduationCap, color: '#1468E8', bg: '#EEF4FF',
    title: 'Universities & Agencies',
    articles: [
      { q: 'Setting up a university account', a: 'Career centers can request a university account at reslink.io/universities to give every student free or discounted access.' },
      { q: 'Bulk student onboarding', a: 'Upload a CSV of student emails from your university dashboard to send bulk Reslink invitations in one click.' },
      { q: 'Agency multi-client management', a: 'Agencies can manage multiple client workspaces from a single login, switching between them without re-authenticating.' },
      { q: 'White-label options', a: 'Enterprise and agency plans can apply custom branding — your logo, colors, and domain — so candidates never see the Reslink name.' },
    ],
  },
];

const UNIVERSITY_CATS: Category[] = [
  {
    icon: GraduationCap, color: '#1468E8', bg: '#EEF4FF',
    title: 'Getting Started',
    articles: [
      { q: 'Setting up a university account', a: 'Career centers can request access at reslink.io/universities. We’ll set up your school’s branded portal and issue admin access to your career services team.' },
      { q: 'Adding your career center team', a: 'Invite career advisors from Settings > Team so they can help students set up profiles and track engagement across your student body.' },
      { q: 'Branding your university’s Reslink portal', a: 'Upload your school’s logo and colors so every student Reslink carries your university’s branding when shared with employers.' },
      { q: 'Understanding student eligibility', a: 'Any current student or recent alum with a valid .edu email (or one you manually verify) can be onboarded to your university’s Reslink program.' },
    ],
  },
  {
    icon: Users, color: '#1468E8', bg: '#EEF4FF',
    title: 'Student Onboarding',
    articles: [
      { q: 'Bulk student onboarding', a: 'Upload a CSV of student emails from your dashboard to send bulk Reslink invitations to your entire class or department in one click.' },
      { q: 'Sending onboarding reminders', a: 'Set automatic reminder emails for students who haven’t completed their profile yet — configurable from Onboarding > Reminders.' },
      { q: 'Tracking onboarding completion', a: 'See a live completion rate for your cohort, broken down by department or graduating class, right from your dashboard.' },
      { q: 'Student support resources', a: 'Share our student-specific guides (recording tips, script templates) directly from your portal to help students get a strong Reslink live fast.' },
    ],
  },
  {
    icon: Briefcase, color: '#1468E8', bg: '#EEF4FF',
    title: 'Career Services Tools',
    articles: [
      { q: 'Reviewing student profiles', a: 'Career advisors can browse every student’s Reslink from the admin dashboard to give feedback before it goes live to employers.' },
      { q: 'Connecting students with employers', a: 'Feature top student Reslinks on your university’s public job board, visible to any company recruiting on campus.' },
      { q: 'Hosting virtual career fairs', a: 'Create a shareable collection of student Reslinks for virtual fair attendees to browse before or during your event.' },
      { q: 'Employer partnership tools', a: 'Give partner employers direct, branded access to browse your student talent pool without needing individual Reslink accounts.' },
    ],
  },
  {
    icon: BarChart2, color: '#1468E8', bg: '#EEF4FF',
    title: 'Analytics & Reporting',
    articles: [
      { q: 'Cohort engagement analytics', a: 'See completion rates, average watch time, and employer views broken down by class year or major from your Analytics dashboard.' },
      { q: 'Employer view tracking', a: 'Track exactly which employers are viewing student profiles and how often — useful data for your recruiting partnerships.' },
      { q: 'Exporting program data', a: 'Export full program analytics as CSV for reporting to department heads or accreditation reviews.' },
      { q: 'Placement outcome tracking', a: 'Log post-graduation placement outcomes against Reslink usage to measure your program’s real-world impact.' },
    ],
  },
  {
    icon: DollarSign, color: '#1468E8', bg: '#EEF4FF',
    title: 'Plans & Billing',
    articles: [
      { q: 'University pricing overview', a: 'University programs are priced per student cohort with volume discounts — reach out for a custom quote based on your enrollment size.' },
      { q: 'Free student access', a: 'Most university partnerships include free Reslink Premium access for enrolled students — check with your career center for eligibility.' },
      { q: 'Renewing your program', a: 'Programs renew annually; your account manager will reach out ahead of renewal to review usage and adjust cohort size if needed.' },
      { q: 'Requesting a custom quote', a: 'Email partnerships@reslink.io with your enrollment size and program goals for a tailored university pricing quote.' },
    ],
  },
  {
    icon: Settings, color: '#1468E8', bg: '#EEF4FF',
    title: 'Support & Resources',
    articles: [
      { q: 'Training career center staff', a: 'We offer a live onboarding session for your career services team covering the admin dashboard, student support, and reporting.' },
      { q: 'Student workshop materials', a: 'Download our ready-to-use workshop slides and script templates to run a Reslink info session for your students.' },
      { q: 'Employer outreach templates', a: 'Use our email templates to introduce your university’s Reslink talent pool to recruiting partners.' },
      { q: 'Getting dedicated support', a: 'University partners get a dedicated account manager — reach out anytime through your admin dashboard’s Support tab.' },
    ],
  },
];

const FAQS = [
  { q: 'Is Reslink free?', a: 'Yes. Reslink has a free tier that lets you create and share a video resume at no cost. Pro and Premium plans unlock advanced analytics, multiple videos, and custom branding.' },
  { q: 'What if I\'m not comfortable on camera?', a: 'That is completely normal. Reslink has a built-in teleprompter so you can read from a script, and you can re-record as many times as you like until it feels right. Most people are surprised how natural it feels after a couple of takes.' },
  { q: 'Can I edit or re-record my Reslink after sharing it?', a: 'Yes. You can update or re-record your video anytime. Your link stays the same, so anyone who already received it will see your latest version automatically.' },
  { q: 'Who can see my Reslink?', a: 'Only the people you share your link with. Your Reslink is not public or searchable, so you decide exactly who gets it - whether that is a single recruiter or everyone who sees your LinkedIn.' },
  { q: 'How can employers view my Reslink?', a: 'Anyone with your unique Reslink link can view your profile. Share it on LinkedIn, in email applications, or directly with recruiters.' },
  { q: 'Will my Reslink affect ATS compatibility?', a: 'Reslink is a supplement to your standard application, not a replacement. You still submit your traditional resume through ATS. Reslink is the extra layer that makes you memorable.' },
  { q: 'How long should my video be?', a: 'We recommend 60-90 seconds. Concise and confident. Shorter videos get watched all the way through, which is exactly what you want.' },
  { q: 'Do I need special equipment to record?', a: 'No. Your laptop webcam or smartphone camera works great. Good lighting and a quiet space make the biggest difference.' },
];

// Everything searchable: every article across all tabs, plus the FAQs.
const ALL_ENTRIES: { q: string; a: string; group: string }[] = [
  ...[...SEEKER_CATS, ...COMPANY_CATS, ...RECRUITER_CATS, ...UNIVERSITY_CATS]
    .flatMap(c => c.articles.map(a => ({ q: a.q, a: a.a, group: c.title }))),
  ...FAQS.map(f => ({ q: f.q, a: f.a, group: 'Common questions' })),
];

function FAQ({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #ECEEF1' }}>
      <button onClick={toggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#061A3A', fontFamily: 'var(--font-body)' }}>{q}</span>
        <span style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: open ? '#1468E8' : '#EAF1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}>
          {open
            ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1468E8" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          }
        </span>
      </button>
      {open && <p style={{ fontSize: '14px', color: '#5C6070', lineHeight: 1.7, paddingBottom: '20px', fontFamily: 'var(--font-body)' }}>{a}</p>}
    </div>
  );
}

/** Q&A modal — browses the full flattened article list for the current tab so
 *  Next/Prev moves seamlessly across category boundaries. */
function ArticleModal({ flat, index, catTitleFor, onClose, onNav }: {
  flat: Article[];
  index: number;
  catTitleFor: (i: number) => string;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const article = flat[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && index < flat.length - 1) onNav(index + 1);
      if (e.key === 'ArrowLeft' && index > 0) onNav(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, flat.length, onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(6,26,58,0.55)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '20px', maxWidth: '560px', width: '100%', maxHeight: '82vh', overflowY: 'auto', boxShadow: '0 32px 100px rgba(6,26,58,0.35)', position: 'relative' }}
      >
        <div style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '18px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1468E8', background: '#EEF4FF', borderRadius: '100px', padding: '5px 12px', fontFamily: 'var(--font-body)' }}>
              {catTitleFor(index)}
            </span>
            <button onClick={onClose} aria-label="Close"
              style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: '#F1F3F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <X size={16} color="#5C6070" />
            </button>
          </div>
          <h3 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#061A3A', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            {article.q}
          </h3>
          <p style={{ fontSize: '15px', color: '#5C6070', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            {article.a}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '18px clamp(28px, 4vw, 40px)', borderTop: '1px solid #ECEEF1' }}>
          <button onClick={() => onNav(index - 1)} disabled={index === 0}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', border: '1.5px solid #E4E6EC', background: '#fff', color: index === 0 ? '#C7CAD1' : '#061A3A', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: index === 0 ? 'default' : 'pointer' }}>
            <ChevronLeft size={14} /> Previous
          </button>
          <span style={{ fontSize: '12px', color: '#9A9FA8', fontFamily: 'var(--font-body)' }}>{index + 1} of {flat.length}</span>
          <button onClick={() => onNav(index + 1)} disabled={index === flat.length - 1}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 16px', borderRadius: '8px', border: 'none', background: index === flat.length - 1 ? '#F1F3F5' : '#061A3A', color: index === flat.length - 1 ? '#C7CAD1' : '#fff', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)', cursor: index === flat.length - 1 ? 'default' : 'pointer' }}>
            Next <ChevronRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HelpPage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'seeker' | 'company' | 'recruiter' | 'university'>('seeker');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openArticle, setOpenArticle] = useState<number | null>(null);
  const [openResult, setOpenResult] = useState<number | null>(null);
  const cats = tab === 'seeker' ? SEEKER_CATS : tab === 'company' ? COMPANY_CATS : tab === 'recruiter' ? RECRUITER_CATS : UNIVERSITY_CATS;

  const searching = query.trim().length > 0;
  const results = useMemo(() => {
    const t = query.trim().toLowerCase();
    if (!t) return [];
    return ALL_ENTRIES.filter(e => e.q.toLowerCase().includes(t) || e.a.toLowerCase().includes(t));
  }, [query]);
  // Collapse any open result when the query changes so the wrong one isn't left open.
  useEffect(() => { setOpenResult(null); }, [query]);

  // Flatten the current tab's categories into one browsable list, and track
  // which category each flattened index belongs to (for the modal's label).
  const flat: Article[] = cats.flatMap(c => c.articles);
  const catBounds = useMemo(() => {
    const bounds: { title: string; start: number; end: number }[] = [];
    let cursor = 0;
    for (const c of cats) {
      bounds.push({ title: c.title, start: cursor, end: cursor + c.articles.length });
      cursor += c.articles.length;
    }
    return bounds;
  }, [cats]);
  const catTitleFor = useCallback((i: number) => catBounds.find(b => i >= b.start && i < b.end)?.title ?? '', [catBounds]);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px' }}>

        {/* Hero + search */}
        <section style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF1FF 100%)', padding: 'clamp(48px, 6vw, 76px) 24px clamp(56px, 7vw, 84px)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden style={{ position: 'absolute', top: '-150px', right: '-90px', width: '540px', height: '440px', background: 'radial-gradient(ellipse at center, rgba(214,61,157,0.09), transparent 66%)', pointerEvents: 'none' }} />
          <div aria-hidden style={{ position: 'absolute', top: '-110px', left: '-70px', width: '520px', height: '420px', background: 'radial-gradient(ellipse at center, rgba(20,104,232,0.08), transparent 66%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1468E8', marginBottom: '18px', fontFamily: 'var(--font-body)' }}>Help center</p>
              <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(42px, 8vw, 92px)', fontWeight: 900, color: '#061A3A', lineHeight: 0.92, letterSpacing: '-0.03em', marginBottom: '22px' }}>
                Need <span style={{ background: 'linear-gradient(#D7FF43, #D7FF43) no-repeat', backgroundSize: '100% 0.34em', backgroundPosition: '0 calc(100% - 0.1em)', padding: '0 0.05em', WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>help?</span>
              </h1>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 18px)', color: '#5C6070', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: '30px', maxWidth: '520px', margin: '0 auto 30px' }}>
                Search, or browse the guides below.
              </p>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center', zIndex: 2 }}>
                  <Search size={18} color="#9AA1AE" />
                </span>
                <input type="text" placeholder="Search for answers..." value={query} onChange={e => setQuery(e.target.value)}
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '14px', border: '1.5px solid #E4E7EC', background: '#fff', color: '#061A3A', fontSize: '15px', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(6,26,58,0.06)' }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section style={{ background: '#F6F7F9', padding: 'clamp(56px, 7vw, 88px) 24px' }}>
          <div style={{ maxWidth: '1060px', margin: '0 auto' }}>

            {searching && (
              <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)', marginBottom: '18px', textAlign: 'center' }}>
                  {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query.trim()}&rdquo;
                </p>
                {results.length === 0 ? (
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '44px 28px', textAlign: 'center', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
                    <p style={{ fontSize: '15px', color: '#5C6070', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
                      No results found. Try a different search, or{' '}
                      <Link href="/contact/support" style={{ color: '#1468E8', textDecoration: 'none', fontWeight: 600 }}>contact support</Link>.
                    </p>
                  </div>
                ) : (
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
                    {results.map((r, i) => (
                      <FAQ key={`${r.q}-${i}`} q={r.q} a={r.a} open={openResult === i} toggle={() => setOpenResult(openResult === i ? null : i)} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!searching && (<>
            {/* Tabs */}
            <style>{`
              .help-tabs-wrap { display: flex; justify-content: center; margin-bottom: 12px; }
              .help-tabs-inner { background: #ECEEF1; border-radius: 12px; padding: 4px; display: flex; gap: 2px; }
              .help-swipe-hint { display: none; }
              @media (max-width: 600px) {
                .help-tabs-wrap { justify-content: flex-start; overflow-x: auto; padding: 0 0 4px; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
                .help-tabs-wrap::-webkit-scrollbar { display: none; }
                .help-tabs-inner { flex-shrink: 0; }
                .help-swipe-hint { display: flex; align-items: center; justify-content: center; gap: 6px; margin-bottom: 28px; }
              }
              @media (min-width: 601px) { .help-tabs-wrap { margin-bottom: 40px; } }
            `}</style>
            <div className="help-tabs-wrap">
              <div className="help-tabs-inner">
                {[{ id: 'seeker', label: 'Job seekers' }, { id: 'company', label: 'Companies' }, { id: 'recruiter', label: 'Recruiters' }, { id: 'university', label: 'Universities' }].map(t => (
                  <button key={t.id} onClick={() => { setTab(t.id as 'seeker' | 'company'); setOpenArticle(null); }}
                    style={{ padding: '11px 26px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-body)', transition: 'color 0.2s', background: 'transparent', color: tab === t.id ? '#fff' : '#64748B', whiteSpace: 'nowrap', position: 'relative' }}>
                    {tab === t.id && <motion.span layoutId="helpTabPill" transition={{ type: 'spring', stiffness: 450, damping: 38 }} style={{ position: 'absolute', inset: 0, background: '#061A3A', borderRadius: '100px', zIndex: 0 }} />}
                    <span style={{ position: 'relative', zIndex: 1 }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="help-swipe-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              <span style={{ fontSize: '11px', color: '#9A9FA8', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.04em' }}>Swipe to explore categories</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9FA8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>

            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '64px' }} className="help-cat-grid">
                <style>{`
                  .help-cat-grid { }
                  @media (max-width: 760px) { .help-cat-grid { grid-template-columns: 1fr 1fr !important; } }
                  @media (max-width: 480px) { .help-cat-grid { grid-template-columns: 1fr !important; } }
                `}</style>
                {cats.map((cat, ci) => {
                  const catStart = catBounds[ci].start;
                  return (
                    <motion.div key={cat.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: ci * 0.04 }} style={{ height: '100%' }}>
                      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '24px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)', transition: 'box-shadow 0.15s, transform 0.15s', height: '100%', boxSizing: 'border-box' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(6,26,58,0.09)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(6,26,58,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                          <cat.icon size={20} color={cat.color} strokeWidth={1.8} />
                        </div>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#061A3A', fontFamily: 'var(--font-body)', marginBottom: '12px' }}>{cat.title}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {cat.articles.map((a, ai) => (
                            <button key={a.q} className="tap-44" onClick={() => setOpenArticle(catStart + ai)}
                              style={{ fontSize: '13px', color: '#5C6070', fontFamily: 'var(--font-body)', textDecoration: 'none', lineHeight: 1.4, transition: 'color 0.15s', background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#1468E8')}
                              onMouseLeave={e => (e.currentTarget.style.color = '#5C6070')}>
                              {a.q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* FAQ */}
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D63D9D', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>Common questions</p>
                <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 900, color: '#061A3A', letterSpacing: '-0.02em', marginBottom: '10px' }}>Got questions? We&apos;ve got answers</h2>
                <p style={{ fontSize: '14px', color: '#5C6070', fontFamily: 'var(--font-body)' }}>
                  Can&apos;t find what you need?{' '}
                  <Link href="/contact/support" style={{ color: '#1468E8', textDecoration: 'none', fontWeight: 600 }}>Contact support</Link>. We reply fast.
                </p>
              </div>
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ECEEF1', padding: '0 28px', boxShadow: '0 1px 8px rgba(6,26,58,0.04)' }}>
                {FAQS.map((f, i) => <FAQ key={f.q} q={f.q} a={f.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
              </div>
            </div>
            </>)}
          </div>
        </section>

      </main>
      <Footer />

      <AnimatePresence>
        {openArticle !== null && (
          <ArticleModal
            flat={flat}
            index={openArticle}
            catTitleFor={catTitleFor}
            onClose={() => setOpenArticle(null)}
            onNav={(i) => setOpenArticle(Math.max(0, Math.min(flat.length - 1, i)))}
          />
        )}
      </AnimatePresence>
    </>
  );
}
