const companies = ['Amazon', 'Meta', 'EY', 'Revolut', 'Accenture', 'HubSpot', 'Adidas', 'Tesla', 'Coca-Cola', 'Google', 'Microsoft', 'Salesforce'];

export default function LogoTicker() {
  const doubled = [...companies, ...companies];
  return (
    <section style={{ padding: '48px 0', borderTop: '1px solid #EEEEF0', borderBottom: '1px solid #EEEEF0', overflow: 'hidden' }}>
      <p style={{ textAlign: 'center', fontSize: '13px', fontWeight: 500, color: '#9A9FA8', marginBottom: '28px' }}>
        Candidates using Reslink have landed jobs at
      </p>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, white, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, white, transparent)', zIndex: 1, pointerEvents: 'none' }} />
        <div className="ticker-track" style={{ gap: '56px', paddingLeft: '40px' }}>
          {doubled.map((co, i) => (
            <span key={i} style={{ fontSize: '16px', fontWeight: 700, color: '#C8CBD2', whiteSpace: 'nowrap', letterSpacing: '-0.02em', flexShrink: 0 }}>
              {co}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
