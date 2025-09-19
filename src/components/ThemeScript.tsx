export default function ThemeScript() {
  const themeScript = `
    (function() {
      function getSystemTheme() {
        // Check if user prefers dark mode
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark'; // You can change this to 'dracula', 'night', etc.
        }
        return 'light'; // You can change this to 'corporate', 'cupcake', etc.
      }

      function applyTheme() {
        try {
          // First check if user has manually selected a theme
          let theme = localStorage.getItem('theme');

          // If no saved theme, use system preference
          if (!theme) {
            theme = getSystemTheme();
          }

          document.documentElement.setAttribute('data-theme', theme);
          // Also set on body as backup
          if (document.body) {
            document.body.setAttribute('data-theme', theme);
          }
        } catch (e) {
          // Fallback if localStorage is not available
          document.documentElement.setAttribute('data-theme', getSystemTheme());
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

      // Listen for system theme changes
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
          // Only apply system theme if user hasn't manually selected a theme
          if (!localStorage.getItem('theme')) {
            applyTheme();
          }
        });
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
