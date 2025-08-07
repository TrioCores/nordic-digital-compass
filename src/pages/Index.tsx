import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import OptimizedHeroSection from "@/components/OptimizedHeroSection";
import SEO from "@/components/SEO";
import {
  LazyWhyChooseSection,
  LazySolutionsSection,
  LazyPricingSection,
  LazyAboutSection,
  LazyTrustSection,
  LazyContactSection,
  LazyFAQSection,
  SectionLoadingFallback,
} from "@/components/LazyComponents";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <SEO
        title="Nordweb - Professionelle hjemmesider til danske virksomheder | Fra 899 kr/md"
        description="Få en professionel hjemmeside til din danske virksomhed. Fast pris fra 899 kr/md inkl. hosting, support og GDPR-sikkerhed. Ingen binding. Gratis konsultation."
        keywords="hjemmeside, website, dansk webureau, professionel hjemmeside, webdesign Danmark, hjemmeside pris, website udvikling, responsive design, SEO optimeret, hjemmeside abonnement"
        canonical="https://nordweb.dk/"
      />

      <div className="min-h-screen">
        <Navigation />
        <OptimizedHeroSection />

        <Suspense fallback={<SectionLoadingFallback />}>
          <LazyWhyChooseSection />
        </Suspense>

        <Suspense fallback={<SectionLoadingFallback />}>
          <LazySolutionsSection />
        </Suspense>

        <Suspense fallback={<SectionLoadingFallback />}>
          <LazyPricingSection />
        </Suspense>

        <Suspense fallback={<SectionLoadingFallback />}>
          <LazyAboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoadingFallback />}>
          <LazyTrustSection />
        </Suspense>

        <Suspense fallback={<SectionLoadingFallback />}>
          <LazyContactSection />
        </Suspense>

        <Suspense fallback={<SectionLoadingFallback />}>
          <LazyFAQSection />
        </Suspense>

        <Footer />
      </div>
    </>
  );
};

export default Index;
