import Link from 'next/link';

/** Slim strip below the hero routing hiring teams to the B2B side. */
export default function HiringBand() {
  return (
    <section style={{ background: '#041635', padding: '14px 24px' }}>
      <style>{`
        .hiring-band-inner { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; text-align: center; }
        .hiring-band-link:hover span { text-decoration: underline; }
      `}</style>
      <div className="hiring-band-inner">
        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D8F950', fontFamily: 'var(--font-body)', background: 'rgba(216,249,80,0.12)', borderRadius: '100px', padding: '3px 10px' }}>Hiring?</span>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
          Meet the person behind every application.
        </p>
        <Link href="/companies" className="hiring-band-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '14px', fontWeight: 700, color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>
          <span>See Reslink for companies</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>
      </div>
    </section>
  );
}
