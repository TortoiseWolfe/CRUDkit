'use client';

import { useEffect, useState } from 'react';
import Text from '@/components/subatomic/Text/Text';

type FontSize = 'small' | 'medium' | 'large' | 'x-large';
type LineHeight = 'compact' | 'normal' | 'relaxed';
type FontFamily = 'sans-serif' | 'serif' | 'mono';

export default function AccessibilityPage() {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [lineHeight, setLineHeight] = useState<LineHeight>('normal');
  const [fontFamily, setFontFamily] = useState<FontFamily>('sans-serif');

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('fontSize') as FontSize || 'medium';
    const savedLineHeight = localStorage.getItem('lineHeight') as LineHeight || 'normal';
    const savedFontFamily = localStorage.getItem('fontFamily') as FontFamily || 'sans-serif';
    
    setFontSize(savedFontSize);
    setLineHeight(savedLineHeight);
    setFontFamily(savedFontFamily);
    
    applyAccessibilitySettings(savedFontSize, savedLineHeight, savedFontFamily);
  }, []);

  const applyAccessibilitySettings = (size: FontSize, height: LineHeight, family: FontFamily) => {
    const root = document.documentElement;
    
    // Font size settings
    const fontSizes = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'x-large': '20px'
    };
    
    // Line height settings
    const lineHeights = {
      'compact': '1.25',
      'normal': '1.5',
      'relaxed': '1.75'
    };
    
    // Font family settings
    const fontFamilies = {
      'sans-serif': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      'serif': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      'mono': 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
    };
    
    root.style.setProperty('--base-font-size', fontSizes[size]);
    root.style.setProperty('--base-line-height', lineHeights[height]);
    root.style.setProperty('--base-font-family', fontFamilies[family]);
    
    // Apply to body
    document.body.style.fontSize = fontSizes[size];
    document.body.style.lineHeight = lineHeights[height];
    document.body.style.fontFamily = fontFamilies[family];
  };

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    applyAccessibilitySettings(size, lineHeight, fontFamily);
  };

  const handleLineHeightChange = (height: LineHeight) => {
    setLineHeight(height);
    localStorage.setItem('lineHeight', height);
    applyAccessibilitySettings(fontSize, height, fontFamily);
  };

  const handleFontFamilyChange = (family: FontFamily) => {
    setFontFamily(family);
    localStorage.setItem('fontFamily', family);
    applyAccessibilitySettings(fontSize, lineHeight, family);
  };

  const resetSettings = () => {
    setFontSize('medium');
    setLineHeight('normal');
    setFontFamily('sans-serif');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('lineHeight');
    localStorage.removeItem('fontFamily');
    applyAccessibilitySettings('medium', 'normal', 'sans-serif');
  };

  return (
    <main className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Accessibility Controls</h1>
          <p className="text-lg mb-8 text-base-content/70">
            Customize the reading experience to suit your preferences
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Font Size Control */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Font Size</h2>
                <div className="flex gap-2 flex-wrap">
                  {(['small', 'medium', 'large', 'x-large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFontSizeChange(size)}
                      className={`btn ${fontSize === size ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Height Control */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Line Spacing</h2>
                <div className="flex gap-2 flex-wrap">
                  {(['compact', 'normal', 'relaxed'] as const).map((height) => (
                    <button
                      key={height}
                      onClick={() => handleLineHeightChange(height)}
                      className={`btn ${lineHeight === height ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {height.charAt(0).toUpperCase() + height.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Font Family Control */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Reading Mode</h2>
                <div className="flex gap-2 flex-wrap">
                  {(['sans-serif', 'serif', 'mono'] as const).map((family) => (
                    <button
                      key={family}
                      onClick={() => handleFontFamilyChange(family)}
                      className={`btn ${fontFamily === family ? 'btn-primary' : 'btn-outline'}`}
                    >
                      {family === 'sans-serif' ? 'Sans' : family === 'serif' ? 'Serif' : 'Mono'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Reset Settings</h2>
                <button onClick={resetSettings} className="btn btn-warning">
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="divider my-12">Preview</div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <Text variant="h2">Sample Heading</Text>
              <Text variant="lead">
                This is a lead paragraph showing how your accessibility settings affect the text display.
              </Text>
              <Text variant="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Text>
              <Text variant="small">
                Small text: These accessibility controls are saved to your browser and will persist across sessions.
              </Text>
              <div className="mt-4">
                <Text variant="code">
                  // Code example
                  const settings = {`{`}
                    fontSize: &quot;{fontSize}&quot;,
                    lineHeight: &quot;{lineHeight}&quot;,
                    fontFamily: &quot;{fontFamily}&quot;
                  {`}`};
                </Text>
              </div>
            </div>
          </div>

          {/* Current Settings Display */}
          <div className="stats shadow mt-8">
            <div className="stat">
              <div className="stat-title">Current Font Size</div>
              <div className="stat-value text-primary">{fontSize}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Current Line Height</div>
              <div className="stat-value text-secondary">{lineHeight}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Current Font</div>
              <div className="stat-value text-accent">{fontFamily === 'sans-serif' ? 'Sans' : fontFamily === 'serif' ? 'Serif' : 'Mono'}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}