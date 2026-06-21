import Link from 'next/link';
import Image from 'next/image';

const links = {
  Solutions: [
    { label: 'Job Seekers', href: '/job-seekers' },
    { label: 'Companies', href: '/companies' },
    { label: 'Recruitment Agencies', href: '/agencies' },
    { label: 'Universities', href: '/universities' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Help Center', href: '/help' },
    { label: 'Video Resume Guide', href: '/guide' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: '#EEEEF0' }}>
      <div className="container py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image src="/reslink-logo.png" alt="Reslink" width={120} height={30} style={{ height: '28px', width: 'auto' }} />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#9A9FA8' }}>
              The platform that helps job seekers stand out with personalized video resumes.
            </p>
          </div>

          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#C8CBD2' }}>{col}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm transition-colors hover:text-navy" style={{ color: '#5C6070' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: '#EEEEF0' }}>
          <p className="text-sm" style={{ color: '#C8CBD2' }}>
            © {new Date().getFullYear()} Reslink. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-sm transition-colors" style={{ color: '#9A9FA8' }}>Privacy</Link>
            <Link href="/terms" className="text-sm transition-colors" style={{ color: '#9A9FA8' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
