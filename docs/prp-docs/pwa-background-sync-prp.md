# Product Requirements Prompt (PRP)

**Feature Name**: PWA Background Sync  
**Priority**: P0 (Constitutional Requirement)  
**Sprint**: Sprint 3  
**Status**: 📥 Inbox  
**Created**: 2025-09-13  
**Author**: AI Assistant (from SpecKit analysis)

---

## 1. Product Requirements

### What We're Building

A Progressive Web App (PWA) background sync capability that enables offline form submission and data synchronization when the connection is restored. This will ensure users never lose data due to connectivity issues.

### Why We're Building It

- Constitutional requirement (Section 2: PWA - background sync)
- Currently marked as "❌ background sync" not implemented
- Critical for offline-first functionality
- Improves user experience in unreliable network conditions
- Prevents data loss from form submissions

### Success Criteria

- [ ] Service worker implements background sync API
- [ ] Forms queue submissions when offline
- [ ] Automatic retry when connection restored
- [ ] User notification of sync status
- [ ] Works with existing form validation (Zod)
- [ ] Integrates with Web3Forms and EmailJS providers

### Out of Scope

- Real-time collaborative features
- Binary file uploads in background sync
- Custom conflict resolution (use last-write-wins)
- Sync for non-form data

---

## 2. Context & Codebase Intelligence

### Existing Patterns to Follow

#### Current Service Worker

```javascript
// Located at: public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Need to add sync event listener here
```

#### Form Validation with Zod

```typescript
// Current pattern at: src/components/atomic/Form.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});
```

#### PWA Manifest

```json
// Located at: public/manifest.json
{
  "name": "CRUDkit",
  "short_name": "CRUDkit",
  "start_url": "/CRUDkit/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000"
}
```

### Dependencies & Libraries

- Service Worker API (native browser API)
- Background Sync API (native browser API)
- IndexedDB for queue storage (via idb package)
- react-hook-form: ^7.54.2 (already installed)
- zod: ^3.24.1 (already installed)

```bash
# Need to install
pnpm add idb workbox-background-sync
```

### File Structure

```
public/
├── sw.js                    # UPDATE: Add background sync
src/
├── utils/
│   ├── pwa/
│   │   ├── sync-manager.ts # NEW: Sync queue management
│   │   └── db.ts           # NEW: IndexedDB wrapper
├── hooks/
│   └── useBackgroundSync.ts # NEW: React hook for sync
└── components/
    └── atomic/
        └── Form.tsx         # UPDATE: Add offline support
```

---

## 3. Technical Specifications

### Background Sync API Implementation

```javascript
// sw.js enhancement
self.addEventListener('sync', (event) => {
  if (event.tag === 'form-submission') {
    event.waitUntil(processQueuedForms());
  }
});

async function processQueuedForms() {
  const db = await openDB();
  const tx = db.transaction('sync-queue', 'readonly');
  const requests = await tx.objectStore('sync-queue').getAll();

  for (const request of requests) {
    try {
      await fetch(request.url, {
        method: 'POST',
        headers: request.headers,
        body: JSON.stringify(request.data),
      });
      // Remove from queue on success
      await removeFromQueue(request.id);
    } catch (error) {
      // Will retry on next sync
      console.error('Sync failed, will retry:', error);
    }
  }
}
```

### React Integration

```typescript
// useBackgroundSync.ts
export function useBackgroundSync() {
  const queueFormSubmission = async (formData: any) => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration = await navigator.serviceWorker.ready;

      // Store in IndexedDB
      await addToSyncQueue({
        url: '/api/submit-form',
        data: formData,
        timestamp: Date.now(),
      });

      // Request background sync
      await registration.sync.register('form-submission');

      return { queued: true };
    }

    // Fallback to direct submission
    return submitForm(formData);
  };

  return { queueFormSubmission };
}
```

### IndexedDB Schema

```typescript
// db.ts
interface SyncQueueItem {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  data: any;
  timestamp: number;
  retryCount: number;
}
```

### Performance Requirements

- Queue storage: < 10MB per user
- Sync attempt frequency: Every 5 minutes when online
- Max retry attempts: 3 per item
- Queue persistence: 7 days

---

## 4. Implementation Runbook

### Step 1: Install Dependencies

```bash
pnpm add idb workbox-background-sync
pnpm add -D @types/serviceworker-api
```

### Step 2: Enhance Service Worker

1. Add background sync event listener
2. Implement queue processing logic
3. Add IndexedDB for queue storage
4. Handle retry logic with exponential backoff

### Step 3: Create Sync Manager Utility

```typescript
// src/utils/pwa/sync-manager.ts
import { openDB } from 'idb';

const DB_NAME = 'CRUDkit-Sync';
const STORE_NAME = 'sync-queue';

export class SyncManager {
  async addToQueue(request: SyncRequest) {
    const db = await this.getDB();
    await db.add(STORE_NAME, {
      ...request,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      retryCount: 0,
    });
  }

  async processQueue() {
    // Implementation
  }

  private async getDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      },
    });
  }
}
```

### Step 4: Update Form Component

```typescript
// Add to Form.tsx
const { queueFormSubmission } = useBackgroundSync();

const handleSubmit = async (data: FormData) => {
  if (!navigator.onLine) {
    const result = await queueFormSubmission(data);
    toast.info('Form queued for submission when online');
    return;
  }

  // Normal submission
  await submitForm(data);
};
```

### Step 5: Testing

- [ ] Test offline form submission
- [ ] Verify queue persistence
- [ ] Test sync on reconnection
- [ ] Verify retry logic
- [ ] Test with multiple queued items

---

## 5. Validation Loops

### Pre-Implementation Checks

- [x] Service worker already registered
- [x] PWA manifest configured
- [x] Form validation with Zod working
- [ ] Background Sync API browser support check

### During Implementation

- [ ] Service worker updates properly
- [ ] IndexedDB operations work
- [ ] Sync events trigger correctly
- [ ] Forms queue when offline

### Post-Implementation

- [ ] All forms support offline submission
- [ ] Sync status visible to users
- [ ] No data loss on network failures
- [ ] Performance metrics acceptable

---

## 6. Risk Mitigation

### Potential Risks

1. **Risk**: Browser doesn't support Background Sync
   **Mitigation**: Fallback to localStorage queue with manual retry

2. **Risk**: Large queue causes storage issues
   **Mitigation**: Implement queue size limits and cleanup

3. **Risk**: Duplicate submissions
   **Mitigation**: Use idempotency keys for each submission

4. **Risk**: Sensitive data in queue
   **Mitigation**: Encrypt data before storing in IndexedDB

---

## 7. References

### Internal Documentation

- Constitution: `/docs/constitution.md` (Section 2: PWA)
- Service Worker: `/public/sw.js`
- Form Component: `/src/components/atomic/Form.tsx`
- PWA Test Utils: `/src/utils/pwa-test.ts`

### External Resources

- [Background Sync API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)
- [Workbox Background Sync](https://developer.chrome.com/docs/workbox/modules/workbox-background-sync)
- [IndexedDB with idb](https://github.com/jakearchibald/idb)
- [Service Worker Cookbook](https://serviceworke.rs/)

---

## PRP Workflow Status

### Review Checklist (Inbox → Outbox)

- [ ] Product requirements clear and complete
- [ ] Technical approach validated
- [ ] Resources available
- [ ] No blocking dependencies
- [ ] Approved by: [PENDING]

### Processing Status (Outbox → Processed)

- [ ] Specification generated
- [ ] Plan created
- [ ] Tasks broken down
- [ ] Implementation started
- [ ] Completed on: [PENDING]

---

<!--
PRP for PWA Background Sync
Generated from SpecKit constitution analysis
Implements offline-first form submission
-->
