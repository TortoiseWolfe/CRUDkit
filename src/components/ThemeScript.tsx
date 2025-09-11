export default function ThemeScript() {
  const themeScript = `
    (function() {
      function applyTheme() {
        try {
          const theme = localStorage.getItem('theme') || 'light';
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {
          // Fallback if localStorage is not available
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }
      
      // Apply theme on initial load
      applyTheme();
      
      // Reapply theme when page is shown from bfcache (browser back/forward)
      window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
          applyTheme();
        }
      });
    })();
  `;
  
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}