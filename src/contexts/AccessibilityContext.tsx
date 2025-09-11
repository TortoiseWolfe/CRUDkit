'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type FontSize = 'small' | 'medium' | 'large' | 'x-large';
type LineHeight = 'compact' | 'normal' | 'relaxed';
type FontFamily = 'sans-serif' | 'serif' | 'mono';

interface AccessibilitySettings {
  fontSize: FontSize;
  lineHeight: LineHeight;
  fontFamily: FontFamily;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'medium',
  lineHeight: 'normal',
  fontFamily: 'sans-serif'
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  // Font scale factors
  const scaleFactors: Record<FontSize, number> = {
    'small': 1.25,    // 20px - minimum comfortable size
    'medium': 1.5,    // 24px - good default
    'large': 1.75,    // 28px - easy to read
    'x-large': 2.125  // 34px - very accessible
  };
  
  // Line heights
  const lineHeights: Record<LineHeight, string> = {
    'compact': '1.25',
    'normal': '1.5',
    'relaxed': '1.75'
  };
  
  // Font families
  const fontFamilies: Record<FontFamily, string> = {
    'sans-serif': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    'serif': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    'mono': 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
  };

  // Apply settings to DOM
  const applySettings = useCallback((newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    root.style.setProperty('--font-scale-factor', scaleFactors[newSettings.fontSize].toString());
    root.style.setProperty('--base-line-height', lineHeights[newSettings.lineHeight]);
    root.style.setProperty('--base-font-family', fontFamilies[newSettings.fontFamily]);
    
    document.body.style.lineHeight = lineHeights[newSettings.lineHeight];
    document.body.style.fontFamily = fontFamilies[newSettings.fontFamily];
  }, []);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') as FontSize;
    const savedLineHeight = localStorage.getItem('lineHeight') as LineHeight;
    const savedFontFamily = localStorage.getItem('fontFamily') as FontFamily;
    
    const initialSettings: AccessibilitySettings = {
      fontSize: savedFontSize || defaultSettings.fontSize,
      lineHeight: savedLineHeight || defaultSettings.lineHeight,
      fontFamily: savedFontFamily || defaultSettings.fontFamily
    };
    
    setSettings(initialSettings);
    applySettings(initialSettings);
  }, [applySettings]);

  // Listen for storage events (changes from other tabs/windows)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fontSize' || e.key === 'lineHeight' || e.key === 'fontFamily') {
        const newSettings: AccessibilitySettings = {
          fontSize: (localStorage.getItem('fontSize') as FontSize) || settings.fontSize,
          lineHeight: (localStorage.getItem('lineHeight') as LineHeight) || settings.lineHeight,
          fontFamily: (localStorage.getItem('fontFamily') as FontFamily) || settings.fontFamily
        };
        setSettings(newSettings);
        applySettings(newSettings);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [settings, applySettings]);

  // Update settings function
  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    
    // Save to localStorage
    if (newSettings.fontSize) localStorage.setItem('fontSize', newSettings.fontSize);
    if (newSettings.lineHeight) localStorage.setItem('lineHeight', newSettings.lineHeight);
    if (newSettings.fontFamily) localStorage.setItem('fontFamily', newSettings.fontFamily);
    
    // Update state and apply
    setSettings(updatedSettings);
    applySettings(updatedSettings);
    
    // Dispatch storage event for same-tab updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: Object.keys(newSettings)[0],
      newValue: Object.values(newSettings)[0],
      url: window.location.href
    }));
  };

  // Reset settings function
  const resetSettings = () => {
    localStorage.removeItem('fontSize');
    localStorage.removeItem('lineHeight');
    localStorage.removeItem('fontFamily');
    
    setSettings(defaultSettings);
    applySettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}