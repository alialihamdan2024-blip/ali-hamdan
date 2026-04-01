
const CACHE_NAME = 'anatomy-ot-v2';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // STRATEGY 1: Cache First (falling back to network)
  // Best for static assets (images, fonts, external libraries) that don't change often.
  if (
    url.hostname.includes('esm.sh') ||
    url.hostname.includes('tailwindcss.com') ||
    url.hostname.includes('wsrv.nl') ||
    url.hostname.includes('quizlet.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('gstatic.com')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          // Cache valid responses (including opaque responses for images)
          if (
            !networkResponse || 
            (networkResponse.status !== 200 && networkResponse.type !== 'opaque')
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        }).catch(() => {
          // Fallback for images if offline and not in cache could go here
        });
      })
    );
    return;
  }

  // STRATEGY 2: Stale-While-Revalidate
  // Best for local application files (HTML, JS, CSS). 
  // Serves cached content immediately, then updates cache in background for next visit.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch((error) => {
          // Network failed
          // If we have no cached response, we might want to return a fallback for navigation
          if (event.request.mode === 'navigate') {
             return caches.match('./index.html');
          }
        });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
});
