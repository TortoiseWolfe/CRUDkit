export default function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {
        // Fallback if localStorage is not available
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  `;
  
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}