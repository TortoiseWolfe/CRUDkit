'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  
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
        const swPath = process.env.NODE_ENV === 'production' ? '/CRUDkit/sw.js' : '/sw.js';
        
        console.log(`[PWA] Registering Service Worker from: ${swPath}`);
        
        // Add timestamp to force update
        const swUrl = `${swPath}?v=${Date.now()}`;
        
        navigator.serviceWorker.register(swUrl).then(
          (registration) => {
            console.log('[PWA] Service Worker registered:', registration);
            console.log('[PWA] SW Scope:', registration.scope);
            console.log('[PWA] SW State:', registration.active?.state || 'installing');
            
            // Force update check
            registration.update().catch(err => console.log('SW update failed:', err));
            
            // Check for updates periodically
            setInterval(() => {
              registration.update().catch(err => console.log('SW update check failed:', err));
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
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
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

  const handleDismiss = () => {
    setShowInstallButton(false);
    // Store dismissal in localStorage
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already dismissed (unless in debug mode)
  useEffect(() => {
    // Check for debug mode
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get('pwa-debug') === 'true';
    
    if (debugMode) {
      console.log('[PWA] Debug mode enabled - forcing install prompt to show');
      setShowInstallButton(true);
      // Clear dismissal in debug mode
      localStorage.removeItem('pwa-install-dismissed');
    } else if (localStorage.getItem('pwa-install-dismissed') === 'true') {
      setShowInstallButton(false);
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

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto md:max-w-lg z-50">
      <div className="alert alert-info shadow-lg text-base">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0" style={{ width: '1.5em', height: '1.5em' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div className="flex-1">
          <div className="font-bold text-base">Install CRUDkit App {isDebugMode && '(Debug Mode)'}</div>
          <p className="text-sm">
            {isDebugMode 
              ? 'Debug mode active - Install prompt forced to show' 
              : 'Install for offline access and app-like experience!'}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleDismiss}
            className="btn btn-sm btn-ghost text-sm"
          >
            Not now
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