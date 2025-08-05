import { lazy } from "react";

// Lazy load alle store komponenter for bedre performance
export const LazyHeroSection = lazy(() => import("./HeroSection"));
export const LazyAboutSection = lazy(() => import("./AboutSection"));
export const LazySolutionsSection = lazy(() => import("./SolutionsSection"));
export const LazyPricingSection = lazy(() => import("./PricingSection"));
export const LazyTrustSection = lazy(() => import("./TrustSection"));
export const LazyFAQSection = lazy(() => import("./FAQSection"));
export const LazyContactSection = lazy(() => import("./ContactSection"));
export const LazyWhyChooseSection = lazy(() => import("./WhyChooseSection"));

// Fallback loading komponent
export const SectionLoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Optimeret billede komponent med lazy loading
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    width={width}
    height={height}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
  />
);
