'use client';

import React from 'react';
import { useConsent } from '../../../contexts/ConsentContext';

export interface CookieConsentProps {
  position?: 'top' | 'bottom';
  className?: string;
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onCustomize?: () => void;
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;
  customContent?: React.ReactNode;
}

/**
 * Cookie Consent Banner Component
 * Displays a GDPR-compliant cookie consent banner
 */
export function CookieConsent({
  position = 'bottom',
  className = '',
  onAcceptAll,
  onRejectAll,
  onCustomize,
  privacyPolicyUrl,
  // cookiePolicyUrl is reserved for future use
  cookiePolicyUrl: _cookiePolicyUrl,
  customContent,
}: CookieConsentProps) {
  const { showBanner, isLoading, acceptAll, rejectAll, openModal } =
    useConsent();

  // Don't render if banner shouldn't be shown or still loading
  if (!showBanner || isLoading) {
    return null;
  }

  const handleAcceptAll = () => {
    acceptAll();
    onAcceptAll?.();
  };

  // handleRejectAll is defined but not currently used in the UI
  // Keeping it for potential future use
  const _handleRejectAll = () => {
    rejectAll();
    onRejectAll?.();
  };
  // Suppress unused variable warning
  void _handleRejectAll;

  const handleCustomize = () => {
    openModal();
    onCustomize?.();
  };

  const positionClasses = position === 'top' ? 'top-0' : 'bottom-0';

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      aria-live="polite"
      className={`fixed right-0 left-0 ${positionClasses} bg-base-100/95 border-base-300 z-40 translate-y-0 transform border-t shadow-md backdrop-blur-sm transition-transform duration-500 ${className} `}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Message Section - Compact */}
          <div className="flex-1">
            {customContent || (
              <p className="text-xs sm:text-sm">
                We use cookies to enhance your experience.
                {privacyPolicyUrl && (
                  <>
                    {' '}
                    <a
                      href={privacyPolicyUrl}
                      className="link link-primary text-xs"
                      aria-label="Privacy Policy"
                    >
                      Learn more
                    </a>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Actions Section - Compact */}
          <div className="flex gap-2" role="group" aria-label="Consent actions">
            <button
              onClick={handleAcceptAll}
              className="btn btn-primary btn-xs sm:btn-sm"
              aria-label="Accept all cookies"
            >
              Accept
            </button>
            <button
              onClick={handleCustomize}
              className="btn btn-ghost btn-xs sm:btn-sm"
              aria-label="Customize cookie preferences"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
