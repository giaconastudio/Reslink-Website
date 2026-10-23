import Link from 'next/link';
import Image from 'next/image';
import { APP_SIGNUP_URL } from '@/lib/links';

/* Logo-left, CTA-right header for the /try-free landing page — no nav links
   and no mobile menu, just the brand and the primary call to action. Fixed at
   the top like the site navbar (68px tall) so the page's main paddingTop still
   lines up. */
export default function MinimalNav() {
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: '68px', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(6,26,58,0.06)' }}>
      <style>{`
        .mn-inner { max-width: 1200px; width: 100%; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .mn-logo img { height: 30px; width: auto; }
        .mn-cta { font-size: 14px; padding: 10px 20px; white-space: nowrap; }
        @media (max-width: 440px) {
          .mn-logo img { height: 26px; }
          .mn-cta { font-size: 13px; padding: 8px 14px; }
        }
      `}</style>
      <div className="mn-inner">
        <Link href="/" aria-label="Reslink home" className="mn-logo" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Image src="/reslink-og.svg" alt="Reslink" width={140} height={36} priority />
        </Link>
        <Link href={APP_SIGNUP_URL} className="btn-primary mn-cta">
          Create your free Reslink
        </Link>
      </div>
    </header>
  );
}
