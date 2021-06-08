const CACHE_NAME = 'bujo-cache';
const URLS_TO_CACHE = [
  'https://deploy-preview-55--theme-bujo.netlify.app/',
];

window.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      //console.log('Opened cache');
      return cache.addAll(URLS_TO_CACHE);
    }),
  );
});

window.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

window.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res;
      }

      return fetch(event.request).then((res) => {
        if (!res || res.status !== 200 || res.type !== 'basic') {
          return res;
        }

        const responseToCache = res.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return res;
      });
    }),
  );
});
