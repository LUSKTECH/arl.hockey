// Analytics utility functions
// Supports Google Analytics and Plausible
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

/**
 * Track a custom event
 * Works with both Google Analytics and Plausible
 */
export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  // Google Analytics (gtag)
  if (globalThis.window !== undefined && (globalThis as any).gtag) {
    (globalThis as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Plausible Analytics
  if (globalThis.window !== undefined && (globalThis as any).plausible) {
    (globalThis as any).plausible(action, {
      props: {
        category,
        label,
        value,
      },
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', { action, category, label, value });
  }
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, label: string) => {
  trackEvent({
    action: 'click_external_link',
    category: 'engagement',
    label: `${label} - ${url}`,
  });
};

/**
 * Track page views (for SPAs)
 */
export const trackPageView = (path: string) => {
  // Google Analytics
  if (globalThis.window !== undefined && (globalThis as any).gtag) {
    (globalThis as any).gtag('config', (globalThis as any).GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }

  // Plausible automatically tracks page views

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Page view:', path);
  }
};
