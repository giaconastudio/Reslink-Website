'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    n: '1', title: 'Data Collection',
    body: 'Reslink collects user information, such as names, email addresses, roles applied for, resumes, and video submissions. This data is used to facilitate the job application process, provide personalized services, and improve user experience.',
  },
  {
    n: '2', title: 'Data Processing',
    body: 'User data collected on Reslink is processed securely to enable personalized job applications and video-based resumes. This processing is conducted with strict adherence to privacy and confidentiality.',
  },
  {
    n: '3', title: 'In-App Video Recording and Teleprompter',
    body: 'Reslink\'s in-app video recording feature processes video data to allow candidates to create personalized pitches. Videos are stored securely within the platform and are only accessible to users and potential employers.',
  },
  {
    n: '4', title: 'Third-Party Services',
    body: 'Reslink may use third-party services (e.g., cloud storage providers, video processing tools) to enhance functionality. These third parties adhere to strict data protection measures and do not have access to personal data beyond what is necessary for providing services.',
  },
  {
    n: '5', title: 'Log Files',
    body: 'Reslink follows standard procedures for using log files. Information collected may include IP addresses, browser type, ISP, date and time stamps, referring/exit pages, and the number of clicks. This data is not linked to any personally identifiable information.',
  },
  {
    n: '6', title: 'Cookies',
    body: 'Reslink uses cookies to store user preferences and track website interactions. Cookies help us optimize user experience by customizing web content based on browser type or user preferences.',
  },
  {
    n: '7', title: 'No Third-Party Data Sharing',
    body: 'Reslink does not sell or share user data with third parties. Your information is used solely for enhancing your experience within the Reslink platform.',
  },
  {
    n: '8', title: 'Data Removal Upon Account Closure',
    body: 'Upon closing your account with Reslink, all personal data associated with your account will be permanently deleted from our systems.',
  },
  {
    n: '9', title: 'User Data Protection Rights (GDPR)',
    body: 'If you are a resident of the EEA, you have the right to request access, correction, deletion, or limitation of your personal data. To exercise these rights or request the removal of your data, please contact us at support@reslink.com.',
  },
  {
    n: '10', title: 'Changes to this Privacy Policy',
    body: 'Reslink may update this Privacy Policy periodically. Significant changes will be communicated through a notice on our website. Users are encouraged to review the Privacy Policy regularly.',
  },
  {
    n: '11', title: 'User Responsibilities',
    body: 'Users are responsible for maintaining the confidentiality of their account credentials and using strong, unique passwords.',
  },
  {
    n: '12', title: 'Limitation of Liability',
    body: 'While Reslink strives to protect your personal data, we cannot guarantee its absolute security. In case of unauthorized access or breaches, our liability will be limited to the fullest extent permitted by law.',
  },
  {
    n: '13', title: 'Third-Party Links Disclaimer',
    body: 'The Reslink platform may contain links to external websites. Reslink is not responsible for the privacy practices of these external sites. We encourage users to review the privacy policies of any third-party sites they visit.',
  },
  {
    n: '14', title: 'Contact Us',
    body: 'For questions about this Privacy Policy, please contact us at support@reslink.com.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(60px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Legal</p>
            <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '20px' }}>Privacy Policy</h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>Last updated: June 2025</p>
          </div>
        </section>

        {/* Intro */}
        <section style={{ padding: 'clamp(40px, 6vw, 64px) 24px 0' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p style={{ fontSize: '16px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.75, marginBottom: '48px', paddingBottom: '40px', borderBottom: '1px solid #F0F1F3' }}>
              At Reslink, accessible from our website, we prioritize the privacy of our users. This Privacy Policy outlines the types of information we collect and how we use it.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '0 24px clamp(48px, 7vw, 80px)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {sections.map((s) => (
              <div key={s.n} style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid #F0F1F3' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>{s.n}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#041635', letterSpacing: '-0.01em', marginBottom: '10px' }}>{s.title}</h2>
                    <p style={{ fontSize: '15px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>{s.body}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Cross-link to Terms */}
            <div style={{ background: '#F7F8FA', borderRadius: '14px', padding: '28px 32px', border: '1px solid #E8E9EC' }}>
              <p style={{ fontSize: '15px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>
                This Privacy Policy is incorporated by reference into our{' '}
                <a href="/terms" style={{ color: '#0C63E3', textDecoration: 'underline' }}>Terms of Service</a>.
                By using Reslink, you agree to both documents.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
