const CACHE_NAME = 'bujo-cache';
const URLS_TO_CACHE = [
  '/',
];

self.addEventListener('install', (event) => { /* eslint-disable-line no-restricted-globals */
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE)),
  );
});

self.addEventListener('activate', (event) => { /* eslint-disable-line no-restricted-globals */
  // eslint-disable-next-line no-undef
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => { /* eslint-disable-line no-restricted-globals */
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});