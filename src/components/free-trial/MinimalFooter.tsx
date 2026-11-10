import Link from 'next/link';

/* Stripped footer for the /try-free landing page — just the copyright line
   and the legal links, on the site's footer background. */
export default function MinimalFooter() {
  return (
    <footer style={{ background: '#071022', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <style>{`
        .tff-inner { max-width: 1200px; margin: 0 auto; padding: 34px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
        .tff-copy { font-size: 13px; color: rgba(255,255,255,0.4); font-family: var(--font-body); }
        .tff-legal { display: flex; gap: 26px; }
        .tff-link { font-size: 13px; color: rgba(255,255,255,0.5); text-decoration: underline; text-underline-offset: 3px; font-family: var(--font-body); transition: color 0.15s; }
        .tff-link:hover { color: #fff; }
        @media (max-width: 560px) { .tff-inner { flex-direction: column; align-items: flex-start; gap: 16px; } }
      `}</style>
      <div className="tff-inner">
        <p className="tff-copy">© {new Date().getFullYear()} Reslink LLC. All rights reserved.</p>
        <div className="tff-legal">
          <Link href="/terms" className="tff-link">Terms of Service</Link>
          <Link href="/privacy" className="tff-link">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
