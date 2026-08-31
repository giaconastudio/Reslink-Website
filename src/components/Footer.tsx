import Link from 'next/link';

type Item = { label: string; href: string; pill?: string };

// Link mapping kept from the current version of the site — only the design
// (subscribe box, socials, lime headings, "we're hiring" pill) matches the ref.
const COLS: { heading: string; items: Item[] }[] = [
  {
    heading: 'For Individuals',
    items: [
      { label: 'Job Seekers', href: '/job-seekers' },
      { label: 'Students', href: '/students' },
      { label: 'Veterans', href: '/veterans' },
    ],
  },
  {
    heading: 'For Business',
    items: [
      { label: 'Companies', href: '/companies' },
      { label: 'Agencies', href: '/agencies' },
      { label: 'Universities', href: '/universities' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Blog', href: '/blog' },
      { label: 'Free Templates', href: '/templates' },
      { label: 'Help Center', href: '/help' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Affiliates', href: '/affiliates' },
      { label: 'Careers', href: '/careers', pill: "we're hiring" },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const SOCIALS: { name: string; href: string; path: string }[] = [
  { name: 'Facebook', href: 'https://facebook.com', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z' },
  { name: 'Instagram', href: 'https://instagram.com', path: 'M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.63.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43-.25.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.63.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47-.66-.25-1.22-.6-1.77-1.15-.55-.55-.9-1.11-1.15-1.77-.25-.63-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.25-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.63-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.5.21-1.86.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.31.88-.35 1.86-.05 1.05-.06 1.37-.06 4.03s.01 2.98.06 4.03c.04.98.21 1.5.35 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.88.31 1.86.35 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.5-.21 1.86-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.31-.88.35-1.86.05-1.05.06-1.37.06-4.03s-.01-2.98-.06-4.03c-.04-.98-.21-1.5-.35-1.86-.18-.47-.4-.8-.75-1.15-.35-.35-.68-.57-1.15-.75-.36-.14-.88-.31-1.86-.35-1.05-.05-1.37-.06-4.04-.06zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68zm5.34-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z' },
  { name: 'TikTok', href: 'https://tiktok.com', path: 'M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.86a2.59 2.59 0 1 1-1.84-2.48V9.9a5.77 5.77 0 1 0 5.08 5.72V9.01a7.35 7.35 0 0 0 4.29 1.37V7.18a4.28 4.28 0 0 1-3.27-1.36z' },
  { name: 'X', href: 'https://x.com', path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.5 2.25h6.83l4.72 6.23 5.19-6.23zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64z' },
  { name: 'LinkedIn', href: 'https://linkedin.com', path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z' },
  { name: 'YouTube', href: 'https://youtube.com', path: 'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.45 12 20.45 12 20.45s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#071022', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1.9fr 1fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; }
        .footer-heading { font-size: 12px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #D7FF43; margin-bottom: 18px; font-family: var(--font-body); }
        .footer-link { color: rgba(255,255,255,0.72); text-decoration: none; font-size: 14px; transition: color 0.15s; font-family: var(--font-body); }
        .footer-link:hover { color: #fff; }
        .footer-blurb { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6; max-width: 300px; margin: 18px 0 22px; font-family: var(--font-body); }

        .footer-sub { display: flex; gap: 10px; max-width: 380px; margin-bottom: 26px; }
        .footer-input { flex: 1; min-width: 0; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.14); border-radius: 9px; padding: 11px 14px; font-size: 14px; color: #fff; font-family: var(--font-body); outline: none; transition: border-color 0.15s; }
        .footer-input::placeholder { color: rgba(255,255,255,0.35); }
        .footer-input:focus { border-color: rgba(215,255,67,0.6); }
        .footer-sub-btn { flex-shrink: 0; background: #D7FF43; color: #061A3A; border: none; border-radius: 9px; padding: 11px 22px; font-size: 14px; font-weight: 700; font-family: var(--font-body); cursor: pointer; transition: background 0.15s; }
        .footer-sub-btn:hover { background: #E4FF63; }

        .footer-socials { display: flex; gap: 10px; }
        .footer-social { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.85); transition: background 0.15s, color 0.15s; }
        .footer-social:hover { background: rgba(255,255,255,0.16); color: #fff; }

        .footer-hiring { display: inline-flex; align-items: center; font-size: 10px; font-weight: 700; color: #D7FF43; border: 1px solid rgba(215,255,67,0.5); border-radius: 100px; padding: 2px 9px; margin-left: 8px; white-space: nowrap; font-family: var(--font-body); }

        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 26px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-copy { font-size: 13px; color: rgba(255,255,255,0.4); font-family: var(--font-body); }
        .footer-legal { display: flex; gap: 26px; }
        .footer-legal-link { font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: underline; text-underline-offset: 3px; font-family: var(--font-body); transition: color 0.15s; }
        .footer-legal-link:hover { color: #fff; }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; row-gap: 36px; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr 1fr; row-gap: 30px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .footer-sub { max-width: 100%; }
        }
      `}</style>

      <div className="container" style={{ padding: '56px 24px 36px' }}>
        <div className="footer-grid">
          {/* Brand + newsletter + socials */}
          <div className="footer-brand">
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/reslink-logo.svg" alt="Reslink" style={{ height: '30px', width: 'auto', display: 'block' }} />
            </Link>

            <p className="footer-blurb">
              Subscribe to our newsletter for exclusive product updates and career tips.
            </p>

            {/* Subscribe box (presentational — not wired to a backend yet) */}
            <div className="footer-sub">
              <input className="footer-input" type="email" placeholder="example@mail.com" aria-label="Email address" />
              <button className="footer-sub-btn" type="button">Subscribe</button>
            </div>

            <div className="footer-socials">
              {SOCIALS.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label={s.name}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.heading}>
              <p className="footer-heading">{col.heading}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {col.items.map(item => (
                  <li key={item.href} style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href={item.href} className="footer-link">{item.label}</Link>
                    {item.pill && <span className="footer-hiring">{item.pill}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Reslink LLC. All rights reserved.</p>
          <div className="footer-legal">
            <Link href="/terms" className="footer-legal-link">Terms of Service</Link>
            <Link href="/privacy" className="footer-legal-link">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
