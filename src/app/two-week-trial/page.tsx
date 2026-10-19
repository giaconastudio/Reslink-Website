import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* Every section is the lander's own copy, under components/two-week-trial/,
   not the shared component the homepage uses. That's the point of the test:
   this page can change freely while the homepage stays the untouched control.
   Edit the files in components/two-week-trial/ — editing components/Hero.tsx
   and friends would change the homepage too.

   Navbar and Footer stay shared, since they're site chrome rather than part of
   what's being tested. */
import Hero from '@/components/two-week-trial/Hero';
import LogoTicker from '@/components/two-week-trial/LogoTicker';
import ValueProp from '@/components/two-week-trial/ValueProp';
import HowItWorks from '@/components/two-week-trial/HowItWorks';
import Features from '@/components/two-week-trial/Features';
import AudienceStories from '@/components/two-week-trial/AudienceStories';
import Testimonials from '@/components/two-week-trial/Testimonials';
import FAQ from '@/components/two-week-trial/FAQ';
import CTA from '@/components/two-week-trial/CTA';

export default function TwoWeekTrial() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <ValueProp />
        <HowItWorks />
        <Features />
        <AudienceStories />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
