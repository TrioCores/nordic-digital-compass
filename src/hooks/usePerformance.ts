import { useEffect } from 'react';

// Performance monitoring utility
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics (kun i development)
        if (process.env.NODE_ENV === 'development') {
          console.log(`${entry.name}: ${entry.duration || 'N/A'}`);
        }
        
        // Send til analytics service (tilføj når relevant)
        // sendToAnalytics(entry.name, entry.value);
      }
    });

    // Observér Core Web Vitals
    try {
      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
    } catch (e) {
      // Fallback for older browsers
      console.warn('Performance Observer not supported');
    }

    return () => observer.disconnect();
  }, []);
};

// Lazy loading intersection observer hook
export const useLazyLoading = (ref: React.RefObject<Element>, options = {}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element er nu synligt - trigger lazy loading
          entry.target.setAttribute('data-loaded', 'true');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [ref, options]);
};
