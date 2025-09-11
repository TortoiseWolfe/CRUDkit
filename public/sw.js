// Service Worker for CRUDkit PWA
// Version with timestamp to force updates
const BUILD_TIMESTAMP = new Date().toISOString();
const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const CACHE_NAME = isDev ? 'crudkit-dev-' + BUILD_TIMESTAMP.slice(0,10) : 'crudkit-v4-' + BUILD_TIMESTAMP.slice(0,10);

console.log('[SW] Initializing Service Worker');
console.log('[SW] Cache name:', CACHE_NAME);
console.log('[SW] Environment:', isDev ? 'development' : 'production');
// Only cache assets, not HTML pages (to ensure theme scripts always run)
const urlsToCache = [
  '/CRUDkit/manifest.json',
  '/CRUDkit/next.svg',
  '/CRUDkit/vercel.svg',
  '/CRUDkit/file.svg',
  '/CRUDkit/globe.svg',
  '/CRUDkit/window.svg'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('[SW] Install event triggered');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache opened:', CACHE_NAME);
        // In dev, only cache essential files
        const filesToCache = isDev ? urlsToCache.slice(0, 2) : urlsToCache;
        console.log('[SW] Caching', filesToCache.length, 'files');
        return cache.addAll(filesToCache);
      })
      .catch((error) => {
        console.error('[SW] Cache failed:', error);
      })
  );
  // Force the waiting service worker to become active
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event triggered');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      console.log('[SW] Found caches:', cacheNames);
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete ALL old caches that don't match current version
          const prefix = isDev ? 'crudkit-dev-' : 'crudkit-';
          if (cacheName.startsWith(prefix) && cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all pages immediately
  console.log('[SW] Claiming all clients');
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // In dev, log fetch requests for debugging
  if (isDev && !event.request.url.includes('_next')) {
    console.log('[SW] Fetch:', event.request.url);
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Don't cache HTML documents to ensure theme scripts always run
  const isHTMLRequest = event.request.destination === 'document' || 
                        event.request.headers.get('accept')?.includes('text/html');
  
  if (isHTMLRequest) {
    // Always fetch HTML fresh from network
    event.respondWith(
      fetch(event.request).catch(() => {
        // Offline fallback - return a basic offline page
        return new Response('Offline - Please check your connection', {
          status: 503,
          headers: { 'Content-Type': 'text/html' }
        });
      })
    );
    return;
  }

  // For non-HTML resources, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache for next time (only non-HTML)
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background Sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

// Function to sync offline forms when connection is restored
async function syncOfflineForms() {
  try {
    // Get all offline form data from IndexedDB or cache
    const cache = await caches.open('offline-forms');
    const requests = await cache.keys();
    
    const syncPromises = requests.map(async (request) => {
      try {
        // Attempt to send the cached request
        const response = await fetch(request.clone());
        
        if (response.ok) {
          // If successful, remove from cache
          await cache.delete(request);
          console.log('Synced offline form:', request.url);
        }
      } catch (error) {
        console.error('Failed to sync form:', error);
        // Keep in cache for next sync attempt
      }
    });
    
    await Promise.all(syncPromises);
    
    // Notify clients about sync completion
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'BACKGROUND_SYNC_COMPLETE',
        timestamp: new Date().toISOString()
      });
    });
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Handle form submissions when offline
self.addEventListener('fetch', (event) => {
  // Check if this is a form submission
  if (event.request.method === 'POST' && event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request.clone()).catch(async () => {
        // If offline, cache the request for later
        const cache = await caches.open('offline-forms');
        await cache.put(event.request.url, event.request.clone());
        
        // Register sync event for when connection returns
        if ('sync' in self.registration) {
          await self.registration.sync.register('sync-forms');
        }
        
        // Return a custom response indicating offline storage
        return new Response(
          JSON.stringify({ 
            status: 'offline', 
            message: 'Your submission has been saved and will be sent when connection is restored' 
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      })
    );
    return;
  }
});