'use client';

const companies = [
  'Amazon', 'Meta', 'EY', 'Revolut', 'Accenture',
  'HubSpot', 'Adidas', 'Tesla', 'Coca-Cola', 'Google',
  'Microsoft', 'Salesforce',
];

export default function LogoTicker() {
  const doubled = [...companies, ...companies];

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mb-6">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest">
          Trusted by candidates who landed jobs at
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div className="flex overflow-hidden">
          <div className="ticker-track flex items-center gap-16 px-8">
            {doubled.map((company, i) => (
              <span
                key={i}
                className="text-gray-300 font-bold text-xl whitespace-nowrap select-none hover:text-gray-500 transition-colors cursor-default"
                style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.02em' }}
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
