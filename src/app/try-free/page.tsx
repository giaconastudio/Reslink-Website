import MinimalNav from '@/components/try-free/MinimalNav';
import Hero from '@/components/try-free/Hero';
import LogoTicker from '@/components/try-free/LogoTicker';
import ApplyNothing from '@/components/try-free/ApplyNothing';
import ValueProp from '@/components/try-free/ValueProp';
import HowItWorks from '@/components/try-free/HowItWorks';
import Features from '@/components/try-free/Features';
import Testimonials from '@/components/try-free/Testimonials';
import FAQ from '@/components/try-free/FAQ';
import CTA from '@/components/try-free/CTA';
import MinimalFooter from '@/components/try-free/MinimalFooter';

export default function TryFree() {
  return (
    <>
      <MinimalNav />
      <main style={{ paddingTop: '68px' }}>
        <Hero />
        <LogoTicker />
        <ApplyNothing />
        <ValueProp />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <MinimalFooter />
    </>
  );
}
