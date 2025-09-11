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

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        // Use basePath for GitHub Pages
        const swPath = process.env.NODE_ENV === 'production' ? '/CRUDkit/sw.js' : '/sw.js';
        
        // Add timestamp to force update
        const swUrl = `${swPath}?v=${Date.now()}`;
        
        navigator.serviceWorker.register(swUrl).then(
          (registration) => {
            console.log('Service Worker registered:', registration);
            
            // Force update check
            registration.update().catch(err => console.log('SW update failed:', err));
            
            // Check for updates periodically
            setInterval(() => {
              registration.update().catch(err => console.log('SW update check failed:', err));
            }, 60000); // Check every minute
          },
          (error) => {
            console.log('Service Worker registration failed:', error);
          }
        );
      });
    }

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
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

  // Don't show if already dismissed
  useEffect(() => {
    if (localStorage.getItem('pwa-install-dismissed') === 'true') {
      setShowInstallButton(false);
    }
  }, []);

  if (!showInstallButton || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto md:max-w-lg z-50">
      <div className="alert alert-info shadow-lg text-base">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0" style={{ width: '1.5em', height: '1.5em' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div className="flex-1">
          <div className="font-bold text-base">Install CRUDkit App</div>
          <p className="text-sm">Install for offline access and app-like experience!</p>
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