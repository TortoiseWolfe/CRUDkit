'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Check debug mode immediately
  const [isDebugMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('pwa-debug') === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Register service worker (enabled in development for testing)
    if ('serviceWorker' in navigator) {
      // Skip in test environments
      if (process.env.NODE_ENV === 'test') return;

      window.addEventListener('load', () => {
        // Use basePath for GitHub Pages in production, root path in dev
        const swPath =
          process.env.NODE_ENV === 'production' ? '/CRUDkit/sw.js' : '/sw.js';

        console.log(`[PWA] Registering Service Worker from: ${swPath}`);

        // Add timestamp to force update
        const swUrl = `${swPath}?v=${Date.now()}`;

        navigator.serviceWorker.register(swUrl).then(
          (registration) => {
            console.log('[PWA] Service Worker registered:', registration);
            console.log('[PWA] SW Scope:', registration.scope);
            console.log(
              '[PWA] SW State:',
              registration.active?.state || 'installing'
            );

            // Force update check
            registration
              .update()
              .catch((err) => console.log('SW update failed:', err));

            // Check for updates periodically
            setInterval(() => {
              registration
                .update()
                .catch((err) => console.log('SW update check failed:', err));
            }, 60000); // Check every minute
          },
          (error) => {
            console.error('[PWA] Service Worker registration failed:', error);
          }
        );
      });
    } else {
      console.log('[PWA] Service Worker not supported in this browser');
    }

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('[PWA] Install prompt captured');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if the app was successfully installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed');
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user choice
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User choice: ${outcome}`);

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    // Store minimized state in localStorage
    localStorage.setItem('pwa-install-minimized', 'true');
  };

  const handleExpand = () => {
    setIsMinimized(false);
    localStorage.removeItem('pwa-install-minimized');
  };

  const handleHideForever = () => {
    setShowInstallButton(false);
    // Store permanent dismissal
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Check localStorage for previous state
  useEffect(() => {
    // Check for debug mode
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get('pwa-debug') === 'true';

    if (debugMode) {
      console.log('[PWA] Debug mode enabled - forcing install prompt to show');
      setShowInstallButton(true);
      setIsMinimized(false);
      // Clear dismissal in debug mode
      localStorage.removeItem('pwa-install-dismissed');
      localStorage.removeItem('pwa-install-minimized');
    } else if (localStorage.getItem('pwa-install-dismissed') === 'true') {
      setShowInstallButton(false);
    } else if (localStorage.getItem('pwa-install-minimized') === 'true') {
      setIsMinimized(true);
    }
  }, []);

  // Check for reset request
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('pwa-reset') === 'true') {
      console.log('[PWA] Resetting install prompt dismissal');
      localStorage.removeItem('pwa-install-dismissed');
      // Remove the query parameter to avoid constant resets
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  // Show if: debug mode is on, OR install button should show and not installed
  if (!isDebugMode && (!showInstallButton || isInstalled)) return null;

  // Log debug info
  if (isDebugMode) {
    console.log('[PWA Debug] Component rendering in debug mode');
    console.log('[PWA Debug] showInstallButton:', showInstallButton);
    console.log('[PWA Debug] isInstalled:', isInstalled);
    console.log('[PWA Debug] deferredPrompt:', deferredPrompt);
  }

  // Minimized CTA button
  if (isMinimized && !isInstalled) {
    return (
      <div className="fixed right-4 bottom-4 z-50">
        <button
          onClick={handleExpand}
          className="btn btn-circle btn-primary btn-lg transform shadow-lg transition-all hover:scale-110 hover:shadow-xl"
          aria-label="Install CRUDkit App"
          title="Install CRUDkit App"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
    );
  }

  // Full alert UI
  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 md:right-4 md:left-auto md:w-auto md:max-w-lg">
      <div className="alert alert-info text-base shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="shrink-0 stroke-current"
          style={{ width: '1.5em', height: '1.5em' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <div className="flex-1">
          <div className="text-base font-bold">
            Install CRUDkit App {isDebugMode && '(Debug Mode)'}
          </div>
          <p className="text-sm">
            {isDebugMode
              ? 'Debug mode active - Install prompt forced to show'
              : 'Install for offline access and app-like experience!'}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-top dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box mb-2 w-52 p-2 shadow"
            >
              <li>
                <a onClick={handleMinimize}>Minimize</a>
              </li>
              <li>
                <a onClick={handleHideForever}>Don&apos;t show again</a>
              </li>
            </ul>
          </div>
          <button
            onClick={handleMinimize}
            className="btn btn-sm btn-ghost text-sm"
          >
            Later
          </button>
          <button
            onClick={handleInstallClick}
            className="btn btn-sm btn-primary text-sm"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
