// Service Worker for CRUDkit PWA
// Version with timestamp to force updates
const BUILD_TIMESTAMP = new Date().toISOString();
const isDev =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const CACHE_NAME = isDev
  ? 'crudkit-dev-' + BUILD_TIMESTAMP.slice(0, 10)
  : 'crudkit-v4-' + BUILD_TIMESTAMP.slice(0, 10);

console.log('[SW] Initializing Service Worker');
console.log('[SW] Cache name:', CACHE_NAME);
console.log('[SW] Environment:', isDev ? 'development' : 'production');

// Background sync tag for form submissions
const SYNC_TAG = 'form-submission-sync';

// IndexedDB queue processing function
async function processIndexedDBQueue() {
  console.log('[SW] Processing IndexedDB queue...');
  let syncedCount = 0;

  try {
    // Open the offline submissions database
    const dbRequest = indexedDB.open('OfflineFormSubmissions', 1);

    const db = await new Promise((resolve, reject) => {
      dbRequest.onsuccess = () => resolve(dbRequest.result);
      dbRequest.onerror = () => reject(dbRequest.error);
    });

    const transaction = db.transaction(['submissions'], 'readwrite');
    const store = transaction.objectStore('submissions');

    // Get all queued items
    const getAllRequest = store.getAll();
    const items = await new Promise((resolve, reject) => {
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    });

    console.log(`[SW] Found ${items.length} items in IndexedDB queue`);

    // Process each item
    for (const item of items) {
      try {
        // Attempt to submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...item.data,
            access_key: 'd9b95b8e-fcd3-486e-9e9d-b96a60833cab', // Web3Forms access key
          }),
        });

        if (response.ok) {
          // Remove from IndexedDB on success
          const deleteRequest = store.delete(item.id);
          await new Promise((resolve) => {
            deleteRequest.onsuccess = resolve;
          });
          syncedCount++;
          console.log(`[SW] Successfully synced submission ${item.id}`);
        } else {
          console.error(
            `[SW] Failed to sync submission ${item.id}: ${response.status}`
          );
        }
      } catch (error) {
        console.error(`[SW] Error syncing submission ${item.id}:`, error);
      }
    }

    db.close();
    return syncedCount;
  } catch (error) {
    console.error('[SW] Error processing IndexedDB queue:', error);
    return 0;
  }
}

// Only cache assets, not HTML pages (to ensure theme scripts always run)
const urlsToCache = [
  '/CRUDkit/manifest.json',
  '/CRUDkit/next.svg',
  '/CRUDkit/vercel.svg',
  '/CRUDkit/file.svg',
  '/CRUDkit/globe.svg',
  '/CRUDkit/window.svg',
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('[SW] Install event triggered');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
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
  const isHTMLRequest =
    event.request.destination === 'document' ||
    event.request.headers.get('accept')?.includes('text/html');

  if (isHTMLRequest) {
    // Always fetch HTML fresh from network
    event.respondWith(
      fetch(event.request).catch(() => {
        // Offline fallback - return a basic offline page
        return new Response('Offline - Please check your connection', {
          status: 503,
          headers: { 'Content-Type': 'text/html' },
        });
      })
    );
    return;
  }

  // For non-HTML resources, use cache-first strategy
  event.respondWith(
    caches.match(event.request).then((response) => {
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
        caches.open(CACHE_NAME).then((cache) => {
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
  console.log('[SW] Sync event triggered:', event.tag);

  if (event.tag === SYNC_TAG || event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

// Function to sync offline forms when connection is restored
async function syncOfflineForms() {
  console.log('[SW] Starting background sync for forms...');
  let syncedCount = 0;

  try {
    // Primary method: Process IndexedDB queue (used by offline queue utils)
    try {
      const indexedDBSyncCount = await processIndexedDBQueue();
      syncedCount += indexedDBSyncCount;
      console.log(
        `[SW] IndexedDB queue processed: ${indexedDBSyncCount} items synced`
      );
    } catch (error) {
      console.error('[SW] Error processing IndexedDB queue:', error);
    }

    // Fallback method: Process any cached requests (for backward compatibility)
    try {
      const cache = await caches.open('offline-forms');
      const requests = await cache.keys();

      if (requests.length > 0) {
        console.log(`[SW] Found ${requests.length} cached requests to sync`);

        const syncPromises = requests.map(async (request) => {
          try {
            // Attempt to send the cached request
            const response = await fetch(request.clone());

            if (response.ok) {
              // If successful, remove from cache
              await cache.delete(request);
              syncedCount++;
              console.log('[SW] Synced cached form:', request.url);
            }
          } catch (error) {
            console.error('[SW] Failed to sync cached form:', error);
            // Keep in cache for next sync attempt
          }
        });

        await Promise.all(syncPromises);
      }
    } catch (error) {
      console.error('[SW] Error processing cached forms:', error);
    }

    // Notify clients about sync completion
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: 'BACKGROUND_SYNC_COMPLETE',
        timestamp: new Date().toISOString(),
        syncedCount: syncedCount,
      });
    });

    console.log(`[SW] Background sync completed. Synced ${syncedCount} items.`);
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Note: Form submission offline handling is managed by the application code
// using IndexedDB queue (offline-queue.ts) for better reliability and control.
// The service worker only processes the queue during background sync events.
