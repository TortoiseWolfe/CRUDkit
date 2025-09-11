/**
 * ResourceHints Component
 * Provides performance optimizations through resource hints
 * DNS prefetch and preconnect for faster resource loading
 */

export default function ResourceHints() {
  return (
    <>
      {/* DNS Prefetch for faster domain resolution */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* Preconnect for establishing early connections */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Prefetch high-priority resources */}
      <link rel="prefetch" href="/CRUDkit/icon-192.svg" as="image" />
      <link rel="prefetch" href="/CRUDkit/icon-512.svg" as="image" />
      
      {/* Font display optimization for web fonts */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-display: swap;
          }
        `
      }} />
    </>
  );
}