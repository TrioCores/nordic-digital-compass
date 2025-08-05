// Analytics og performance tracking utilities
export const analytics = {
  // Google Analytics 4 tracking
  gtag: (...args: any[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag(...args);
    }
  },

  // Page view tracking
  pageview: (url: string, title: string) => {
    analytics.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: title,
      page_location: url,
    });
  },

  // Event tracking
  event: (action: string, category: string, label?: string, value?: number) => {
    analytics.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  },

  // Custom dimensions
  setCustomDimension: (index: number, value: string) => {
    analytics.gtag('config', 'GA_MEASUREMENT_ID', {
      [`custom_map.dimension${index}`]: value,
    });
  },
};

// Performance tracking
export const performance = {
  // Track Core Web Vitals
  trackWebVitals: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        analytics.event('core_web_vitals', 'LCP', 'timing', Math.round(lastEntry.startTime));
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        analytics.event('core_web_vitals', 'CLS', 'timing', Math.round(clsValue * 1000));
      }).observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Track loading performance
  trackPageLoad: () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          analytics.event('performance', 'page_load_time', 'timing', Math.round(loadTime));
        }, 0);
      });
    }
  },
};

// Error tracking
export const errorTracking = {
  // Track JavaScript errors
  trackErrors: () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        analytics.event('error', 'javascript', event.message, 1);
      });

      window.addEventListener('unhandledrejection', (event) => {
        analytics.event('error', 'promise_rejection', event.reason, 1);
      });
    }
  },
};

// SEO og Meta tracking
export const seo = {
  // Update page title
  updateTitle: (title: string) => {
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  },

  // Update meta description
  updateDescription: (description: string) => {
    if (typeof document !== 'undefined') {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', description);
      }
    }
  },

  // Track scroll depth
  trackScrollDepth: () => {
    if (typeof window !== 'undefined') {
      let maxScroll = 0;
      window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
            analytics.event('engagement', 'scroll_depth', 'percentage', maxScroll);
          }
        }
      });
    }
  },
};

// Form tracking
export const formTracking = {
  trackFormStart: (formName: string) => {
    analytics.event('form', 'start', formName);
  },

  trackFormSubmit: (formName: string) => {
    analytics.event('form', 'submit', formName);
  },

  trackFormError: (formName: string, error: string) => {
    analytics.event('form', 'error', `${formName}_${error}`);
  },
};

// Initialize alle tracking funktioner
export const initializeTracking = () => {
  if (typeof window !== 'undefined') {
    performance.trackWebVitals();
    performance.trackPageLoad();
    errorTracking.trackErrors();
    seo.trackScrollDepth();
  }
};

// Type definitions for window.gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
