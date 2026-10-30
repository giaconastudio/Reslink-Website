import MinimalNav from '@/components/free-trial/MinimalNav';
import Hero from '@/components/free-trial/Hero';
import LogoTicker from '@/components/free-trial/LogoTicker';
import ApplyNothing from '@/components/free-trial/ApplyNothing';
import ValueProp from '@/components/free-trial/ValueProp';
import HowItWorks from '@/components/free-trial/HowItWorks';
import Features from '@/components/free-trial/Features';
import Testimonials from '@/components/free-trial/Testimonials';
import FAQ from '@/components/free-trial/FAQ';
import CTA from '@/components/free-trial/CTA';
import MinimalFooter from '@/components/free-trial/MinimalFooter';

export default function FreeTrial() {
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
