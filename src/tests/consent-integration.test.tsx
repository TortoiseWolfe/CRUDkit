import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsentProvider } from '@/contexts/ConsentContext';
import { CookieConsent } from '@/components/privacy/CookieConsent';
import { ConsentModal } from '@/components/privacy/ConsentModal';
import { PrivacyControls } from '@/components/privacy/PrivacyControls';
import { getConsentFromStorage, saveConsentToStorage } from '@/utils/consent';
import {
  initializeAnalytics,
  trackEvent,
  isAnalyticsLoaded,
} from '@/utils/analytics';
import { exportUserData, clearUserData } from '@/utils/privacy';
import {
  addConsentHistoryEntry,
  getConsentHistory,
} from '@/utils/consent-history';

// Mock analytics module
vi.mock('@/utils/analytics', () => ({
  initializeAnalytics: vi.fn(),
  trackEvent: vi.fn(),
  isAnalyticsLoaded: vi.fn(() => false),
  updateAnalyticsConsent: vi.fn(),
  handleConsentChange: vi.fn(),
}));

describe('Consent Integration Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('should handle first-time visitor consent flow', async () => {
    render(
      <ConsentProvider>
        <CookieConsent />
        <ConsentModal />
      </ConsentProvider>
    );

    expect(screen.getAllByText(/We use cookies/i).length).toBeGreaterThan(0);
  });
});
