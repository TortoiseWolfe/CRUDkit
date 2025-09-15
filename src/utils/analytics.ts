import { ConsentState } from './consent-types';

// Google Analytics Measurement ID (replace with your actual ID)
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Global declarations for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Google Consent Mode types
export interface GoogleConsentState {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  security_storage: 'granted' | 'denied';
}

// Track if analytics is loaded
let analyticsLoaded = false;
let currentConsentState: GoogleConsentState | null = null;

/**
 * Check if analytics should be loaded based on consent
 */
export function shouldLoadAnalytics(consent: ConsentState | null): boolean {
  return consent?.analytics === true;
}

/**
 * Check if analytics is currently loaded
 */
export function isAnalyticsLoaded(): boolean {
  return analyticsLoaded;
}

/**
 * Get current Google Consent state
 */
export function getGoogleConsentState(): GoogleConsentState | null {
  return currentConsentState;
}

/**
 * Set Google Consent Mode
 */
export function setGoogleConsentMode(state: GoogleConsentState): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer if needed
  window.dataLayer = window.dataLayer || [];

  // Initialize gtag if needed
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  // Set consent defaults
  window.gtag('consent', 'default', state);
  currentConsentState = state;
}

/**
 * Update analytics consent based on user preferences
 */
export function updateAnalyticsConsent(consent: ConsentState): void {
  if (typeof window === 'undefined') return;

  const consentMode: GoogleConsentState = {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    functionality_storage: consent.functional ? 'granted' : 'denied',
    personalization_storage: consent.marketing ? 'granted' : 'denied',
    security_storage: 'granted', // Always granted for necessary cookies
  };

  // Initialize gtag if needed
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  // Update consent state
  window.gtag('consent', 'update', consentMode);
  currentConsentState = consentMode;
}

/**
 * Initialize Google Analytics with consent check
 */
export async function initializeAnalytics(
  consent: ConsentState | null
): Promise<void> {
  if (typeof window === 'undefined') return;

  // Check if we should load analytics
  if (!shouldLoadAnalytics(consent)) {
    // Set default denied state
    setGoogleConsentMode({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    });
    return;
  }

  // Don't reinitialize if already loaded
  if (analyticsLoaded) {
    // Just update consent state
    if (consent) {
      updateAnalyticsConsent(consent);
    }
    return;
  }

  return new Promise<void>((resolve, reject) => {
    try {
      // Create script element
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;

      script.onload = () => {
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];

        // Define gtag function
        window.gtag = function (...args: unknown[]) {
          window.dataLayer?.push(args);
        };

        // Initialize with timestamp
        window.gtag('js', new Date());

        // Configure GA with measurement ID
        window.gtag('config', GA_MEASUREMENT_ID, {
          send_page_view: false, // We'll manually send page views
          cookie_flags: 'SameSite=None;Secure',
        });

        // Update consent state
        if (consent) {
          updateAnalyticsConsent(consent);
        }

        analyticsLoaded = true;
        resolve();
      };

      script.onerror = (error) => {
        console.error('Failed to load analytics script:', error);
        analyticsLoaded = false;
        reject(error);
      };

      // Append script to document
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error initializing analytics:', error);
      reject(error);
    }
  });
}

/**
 * Track an analytics event
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Don't track if analytics consent not given
  if (currentConsentState?.analytics_storage !== 'granted') return;

  // Add default parameters
  const eventParams = {
    ...parameters,
    consent_given: true,
    consent_timestamp: Date.now(),
  };

  window.gtag('event', eventName, eventParams);
}

/**
 * Track page view
 */
export function trackPageView(url?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  // Don't track if analytics consent not given
  if (currentConsentState?.analytics_storage !== 'granted') return;

  window.gtag('event', 'page_view', {
    page_location: url || window.location.href,
    page_title: document.title,
    consent_given: true,
  });
}

/**
 * Clean up analytics (remove scripts and reset state)
 */
export function cleanupAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Remove analytics scripts
  document
    .querySelectorAll('script[src*="googletagmanager"]')
    .forEach((script) => {
      script.remove();
    });

  // Clear window objects
  delete window.gtag;
  delete window.dataLayer;

  // Reset state
  analyticsLoaded = false;
  currentConsentState = null;
}

/**
 * Initialize analytics on consent change
 */
export function handleConsentChange(consent: ConsentState): void {
  if (consent.analytics && !analyticsLoaded) {
    // User granted consent - load analytics
    initializeAnalytics(consent);
  } else if (!consent.analytics && analyticsLoaded) {
    // User revoked consent - update consent mode
    updateAnalyticsConsent(consent);
  } else if (analyticsLoaded) {
    // Just update consent state
    updateAnalyticsConsent(consent);
  }
}
