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
  cookiePolicyUrl,
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

  const handleRejectAll = () => {
    rejectAll();
    onRejectAll?.();
  };

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
      className={`fixed right-0 left-0 ${positionClasses} bg-base-100 border-base-300 z-50 translate-y-0 transform border-t shadow-lg transition-transform duration-500 ${className} `}
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Message Section */}
          <div className="flex-1">
            {customContent || (
              <div className="space-y-2">
                <p className="text-sm font-medium md:text-base">
                  We use cookies to enhance your experience
                </p>
                <p className="text-base-content/70 text-xs md:text-sm">
                  We use cookies and similar technologies to help personalize
                  content, tailor and measure ads, and provide a better
                  experience. By clicking accept, you agree to this use.
                  {(privacyPolicyUrl || cookiePolicyUrl) && (
                    <span className="mt-1 block">
                      Learn more in our{' '}
                      {privacyPolicyUrl && (
                        <>
                          <a
                            href={privacyPolicyUrl}
                            className="link link-primary"
                            aria-label="Privacy Policy"
                          >
                            Privacy Policy
                          </a>
                          {cookiePolicyUrl && ' and '}
                        </>
                      )}
                      {cookiePolicyUrl && (
                        <a
                          href={cookiePolicyUrl}
                          className="link link-primary"
                          aria-label="Cookie Policy"
                        >
                          Cookie Policy
                        </a>
                      )}
                      .
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Actions Section */}
          <div
            className="flex flex-col gap-2 sm:flex-row sm:gap-3"
            role="group"
            aria-label="Consent actions"
          >
            <button
              onClick={handleAcceptAll}
              className="btn btn-primary btn-sm md:btn-md"
              aria-label="Accept all cookies"
            >
              Accept All
            </button>
            <button
              onClick={handleRejectAll}
              className="btn btn-ghost btn-sm md:btn-md"
              aria-label="Reject all optional cookies"
            >
              Reject All
            </button>
            <button
              onClick={handleCustomize}
              className="btn btn-outline btn-sm md:btn-md"
              aria-label="Customize cookie preferences"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
