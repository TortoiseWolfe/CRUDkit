export default function ThemeScript() {
  const themeScript = `
    (function() {
      function applyTheme() {
        try {
          const theme = localStorage.getItem('theme') || 'light';
          document.documentElement.setAttribute('data-theme', theme);
          // Also set on body as backup
          if (document.body) {
            document.body.setAttribute('data-theme', theme);
          }
        } catch (e) {
          // Fallback if localStorage is not available
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }
      
      // Apply theme immediately
      applyTheme();
      
      // Reapply when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTheme);
      } else {
        applyTheme();
      }
      
      // Reapply when page becomes visible (tab switching)
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
          applyTheme();
        }
      });
      
      // Reapply when page is shown from bfcache (browser back/forward)
      window.addEventListener('pageshow', function(event) {
        applyTheme();
      });
      
      // Fallback: watch for body element if it doesn't exist yet
      if (!document.body) {
        var observer = new MutationObserver(function(mutations) {
          if (document.body) {
            applyTheme();
            observer.disconnect();
          }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
      }
    })();
  `;
  
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}