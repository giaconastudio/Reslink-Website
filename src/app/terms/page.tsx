'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    n: '1', title: 'Acceptance of Terms',
    body: 'By accessing and using the website you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these Terms, please do not use our website.',
  },
  {
    n: '2', title: 'Privacy Policy',
    body: 'Our Privacy Policy, which outlines how we collect, use, and protect your personal information, is incorporated here by reference. Please review it carefully.',
  },
  {
    n: '3', title: 'Changes to Terms',
    body: 'We may modify these Terms at any time. You will be notified of significant changes through a notice on the website or via email. Your continued use of the website following such changes will indicate your acceptance. It is your responsibility to review these Terms periodically.',
  },
  {
    n: '4', title: 'Account Registration and Use',
    body: 'To use certain features of Reslink, you may need to register for an account. By registering, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of unauthorized use.',
  },
  {
    n: '5', title: 'Email Notifications and Marketing',
    body: 'By creating an account, you agree to receive notifications and marketing emails from Reslink. You can unsubscribe from marketing emails at any time, but we are not responsible for missed communications.',
  },
  {
    n: '6', title: 'User Conduct',
    body: 'You agree to use the website lawfully and in a manner that does not infringe upon others\' rights or restrict their use of the website. Prohibited behaviors include harassment, transmission of obscene content, and disrupting website operations.',
  },
  {
    n: '7', title: 'Intellectual Property',
    body: 'The content on Reslink, including but not limited to text, graphics, and code, is protected by copyright and other intellectual property laws. Unauthorized use of content is prohibited.',
  },
  {
    n: '8', title: 'Third-Party Links',
    body: 'The website may contain links to third-party sites that are not operated by Reslink. We are not responsible for the content or practices of these sites. Accessing these links is at your own risk.',
  },
  {
    n: '9', title: 'Dispute Resolution',
    body: 'Disputes arising from these Terms will be governed by the laws of the United States. You agree to submit to the exclusive jurisdiction of the courts located in the U.S. to resolve legal matters.',
  },
  {
    n: '10', title: 'Contact Information',
    body: 'For questions about these Terms, contact us at support@reslink.com.',
  },
  {
    n: '11', title: 'Termination',
    body: 'We may terminate or suspend your access to the website without notice for any breach of these Terms. Upon termination, your right to use Reslink will cease immediately. Certain provisions of these Terms will survive termination, including those related to ownership, warranties, and liability.',
  },
  {
    n: '12', title: 'General Provisions',
    body: 'If any provision of these Terms is deemed invalid or unenforceable, it will be enforced to the maximum extent permitted by law, and the remaining provisions will remain in full effect. Failure to enforce any provision does not constitute a waiver of that right.',
  },
  {
    n: '13', title: 'Cookie Policy',
    body: null,
    cookies: [
      { label: 'Essential Cookies', desc: 'Necessary for core functionality.' },
      { label: 'Performance Cookies', desc: 'Analyze user behavior for improvements.' },
      { label: 'Functionality Cookies', desc: 'Remember user preferences.' },
      { label: 'Advertising Cookies', desc: 'Deliver relevant advertisements.' },
    ],
    cookieNote: 'You can accept or decline cookies. Declining cookies may affect the website\'s functionality.',
  },
  {
    n: '14', title: 'No Guarantees',
    body: 'We do not guarantee that using Reslink will result in employment. The platform is intended to enhance visibility and improve application outcomes but does not ensure job offers.',
  },
  {
    n: '15', title: 'Limitation of Liability',
    body: 'Reslink is not liable for direct, indirect, incidental, or punitive damages resulting from website use. Your use of Reslink is at your own risk.',
  },
  {
    n: '16', title: 'Refund Policy',
    body: 'Due to the digital nature of our services, all sales are final. We encourage careful consideration before making a purchase.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar dark />
      <main style={{ paddingTop: '68px', background: '#fff', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ background: '#041635', padding: 'clamp(60px, 8vw, 96px) 24px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D8F950', marginBottom: '16px', fontFamily: 'var(--font-body)' }}>Legal</p>
            <h1 style={{ fontFamily: 'var(--font-phudu)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '20px' }}>Terms of Service</h1>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>Last updated: June 2025</p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: 'clamp(32px, 5vw, 80px) clamp(16px, 4vw, 24px)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {sections.map((s) => (
              <div key={s.n} style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid #F0F1F3' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0C63E3', fontFamily: 'var(--font-body)' }}>{s.n}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: 'var(--font-phudu)', fontSize: '22px', fontWeight: 900, color: '#041635', letterSpacing: '-0.01em', marginBottom: '10px' }}>{s.title}</h2>
                    {s.body && (
                      <p style={{ fontSize: '15px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>{s.body}</p>
                    )}
                    {s.cookies && (
                      <>
                        <p style={{ fontSize: '15px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.75, marginBottom: '14px' }}>We use cookies to enhance the website experience:</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {s.cookies.map((c) => (
                            <li key={c.label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0C63E3', marginTop: '8px', flexShrink: 0 }} />
                              <p style={{ fontSize: '15px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>
                                <strong style={{ color: '#041635' }}>{c.label}:</strong> {c.desc}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <p style={{ fontSize: '15px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>{s.cookieNote}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Acknowledgement */}
            <div style={{ background: '#F7F8FA', borderRadius: '14px', padding: '28px 32px', border: '1px solid #E8E9EC' }}>
              <p style={{ fontSize: '15px', color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>
                By using Reslink, you acknowledge that you have read, understood, and agree to these Terms of Service and our{' '}
                <a href="/privacy" style={{ color: '#0C63E3', textDecoration: 'underline' }}>Privacy Policy</a>.
                If you do not agree, please refrain from using the website.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
