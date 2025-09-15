import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  initializeAnalytics,
  updateAnalyticsConsent,
  trackEvent,
  isAnalyticsLoaded,
  setGoogleConsentMode,
  getGoogleConsentState,
  shouldLoadAnalytics,
  cleanupAnalytics,
} from './analytics';
import { ConsentState, ConsentMethod } from './consent-types';

// Mock window.gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Mock document methods
const mockScript = {
  src: '',
  async: false,
  onload: null as (() => void) | null,
  onerror: null as ((error: Event) => void) | null,
};

describe('Analytics Integration', () => {
  const mockConsent: ConsentState = {
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
    version: '1.0.0',
    lastUpdated: Date.now(),
    method: ConsentMethod.DEFAULT,
  };

  beforeEach(() => {
    // Clear any existing scripts
    document
      .querySelectorAll('script[src*="googletagmanager"]')
      .forEach((script) => {
        script.remove();
      });

    // Reset window objects
    delete window.gtag;
    delete window.dataLayer;

    // Mock document.createElement for script tags
    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string) => {
        if (tagName === 'script') {
          return mockScript as unknown as HTMLScriptElement;
        }
        return document.createElement(tagName);
      }
    );

    // Mock document.head.appendChild
    vi.spyOn(document.head, 'appendChild').mockImplementation((node) => node);

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanupAnalytics();
  });

  describe('shouldLoadAnalytics', () => {
    it('should return false when analytics consent is not given', () => {
      const consent = { ...mockConsent, analytics: false };
      expect(shouldLoadAnalytics(consent)).toBe(false);
    });

    it('should return true when analytics consent is given', () => {
      const consent = { ...mockConsent, analytics: true };
      expect(shouldLoadAnalytics(consent)).toBe(true);
    });

    it('should return false when consent is null', () => {
      expect(shouldLoadAnalytics(null)).toBe(false);
    });
  });

  describe('initializeAnalytics', () => {
    it('should not load analytics scripts without consent', () => {
      const consent = { ...mockConsent, analytics: false };
      initializeAnalytics(consent);

      expect(document.createElement).not.toHaveBeenCalledWith('script');
      expect(isAnalyticsLoaded()).toBe(false);
    });

    it('should load analytics scripts with consent', () => {
      const consent = { ...mockConsent, analytics: true };
      const appendChildSpy = vi.spyOn(document.head, 'appendChild');

      initializeAnalytics(consent);

      expect(document.createElement).toHaveBeenCalledWith('script');
      expect(mockScript.src).toContain('googletagmanager.com/gtag/js');
      expect(mockScript.async).toBe(true);
      expect(appendChildSpy).toHaveBeenCalled();
    });

    it('should initialize gtag and dataLayer', () => {
      const consent = { ...mockConsent, analytics: true };
      initializeAnalytics(consent);

      // Simulate script load
      if (mockScript.onload) {
        mockScript.onload();
      }

      expect(window.dataLayer).toBeDefined();
      expect(window.gtag).toBeDefined();
      expect(typeof window.gtag).toBe('function');
    });

    it('should not reinitialize if already loaded', () => {
      const consent = { ...mockConsent, analytics: true };

      // First initialization
      initializeAnalytics(consent);
      if (mockScript.onload) mockScript.onload();

      const createElementCalls = (
        document.createElement as unknown as ReturnType<typeof vi.spyOn>
      ).mock.calls.length;

      // Second initialization
      initializeAnalytics(consent);

      // Should not create additional scripts
      expect(
        (document.createElement as unknown as ReturnType<typeof vi.spyOn>).mock
          .calls.length
      ).toBe(createElementCalls);
    });
  });

  describe('Google Consent Mode', () => {
    beforeEach(() => {
      // Setup gtag mock
      window.dataLayer = [];
      window.gtag = vi.fn((...args: unknown[]) => {
        window.dataLayer?.push(args);
      });
    });

    it('should set default consent state', () => {
      setGoogleConsentMode({
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
      });

      expect(window.gtag).toHaveBeenCalledWith('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
      });
    });

    it('should update consent state based on user preferences', () => {
      const consent = {
        ...mockConsent,
        analytics: true,
        marketing: true,
      };

      updateAnalyticsConsent(consent);

      expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted',
      });
    });

    it('should deny all optional storage without consent', () => {
      const consent = {
        ...mockConsent,
        analytics: false,
        marketing: false,
        functional: false,
      };

      updateAnalyticsConsent(consent);

      expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
      });
    });

    it('should get current consent state', () => {
      const consent = {
        ...mockConsent,
        analytics: true,
        marketing: false,
      };

      updateAnalyticsConsent(consent);
      const state = getGoogleConsentState();

      expect(state).toEqual({
        analytics_storage: 'granted',
        ad_storage: 'denied',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted',
      });
    });
  });

  describe('Event Tracking', () => {
    beforeEach(() => {
      window.gtag = vi.fn();
      window.dataLayer = [];
    });

    it('should not track events without analytics consent', () => {
      const consent = { ...mockConsent, analytics: false };
      updateAnalyticsConsent(consent);

      trackEvent('button_click', {
        button_name: 'submit',
        page: 'contact',
      });

      // gtag should be called for consent update but not for event
      expect(window.gtag).toHaveBeenCalledTimes(1);
      expect(window.gtag).toHaveBeenCalledWith(
        'consent',
        'update',
        expect.any(Object)
      );
    });

    it('should track events with analytics consent', () => {
      const consent = { ...mockConsent, analytics: true };

      // Set up gtag as a spy before initializing
      window.gtag = vi.fn();
      window.dataLayer = [];

      // First update the consent state
      updateAnalyticsConsent(consent);

      trackEvent('button_click', {
        button_name: 'submit',
        page: 'contact',
      });

      expect(window.gtag).toHaveBeenCalledWith('event', 'button_click', {
        button_name: 'submit',
        page: 'contact',
        consent_given: true,
        consent_timestamp: expect.any(Number),
      });
    });

    it('should include default parameters in events', () => {
      const consent = { ...mockConsent, analytics: true };

      // Set up gtag as a spy before initializing
      window.gtag = vi.fn();
      window.dataLayer = [];

      // First update the consent state
      updateAnalyticsConsent(consent);

      trackEvent('page_view');

      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'page_view',
        expect.objectContaining({
          consent_given: true,
          consent_timestamp: expect.any(Number),
        })
      );
    });
  });

  describe('Analytics Cleanup', () => {
    it('should remove analytics scripts on cleanup', () => {
      const consent = { ...mockConsent, analytics: true };
      initializeAnalytics(consent);

      // Create a real script element for testing
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=TEST';
      document.head.appendChild(script);

      cleanupAnalytics();

      expect(
        document.querySelector('script[src*="googletagmanager"]')
      ).toBeNull();
      expect(window.gtag).toBeUndefined();
      expect(window.dataLayer).toBeUndefined();
    });

    it('should handle cleanup when analytics not initialized', () => {
      expect(() => cleanupAnalytics()).not.toThrow();
    });
  });

  describe('Real-time Consent Updates', () => {
    it('should handle consent changes dynamically', () => {
      // Set up gtag as a spy that stays a spy
      window.gtag = vi.fn();
      window.dataLayer = [];

      // Start without consent
      let consent = { ...mockConsent, analytics: false };
      initializeAnalytics(consent);
      expect(isAnalyticsLoaded()).toBe(false);

      // User grants consent
      consent = { ...mockConsent, analytics: true };
      initializeAnalytics(consent);

      // Simulate script load but keep our spy
      if (mockScript.onload) {
        // Save the spy
        const gtagSpy = window.gtag;
        mockScript.onload();
        // Restore the spy
        window.gtag = gtagSpy;
      }
      expect(isAnalyticsLoaded()).toBe(true);

      // User revokes consent
      consent = { ...mockConsent, analytics: false };
      updateAnalyticsConsent(consent);

      // Analytics script remains but consent mode is updated
      expect(window.gtag).toHaveBeenCalledWith(
        'consent',
        'update',
        expect.objectContaining({
          analytics_storage: 'denied',
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle script loading errors gracefully', async () => {
      const consent = { ...mockConsent, analytics: true };
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const promise = initializeAnalytics(consent);

      // Simulate script error
      if (mockScript.onerror) {
        mockScript.onerror(new Event('error'));
      }

      // Catch the rejection to prevent unhandled rejection
      await expect(promise).rejects.toEqual(expect.any(Event));

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to load analytics'),
        expect.any(Event)
      );
      expect(isAnalyticsLoaded()).toBe(false);

      consoleErrorSpy.mockRestore();
    });

    it('should handle missing gtag gracefully', () => {
      delete window.gtag;

      expect(() => trackEvent('test_event')).not.toThrow();
      expect(() => updateAnalyticsConsent(mockConsent)).not.toThrow();
    });
  });
});
