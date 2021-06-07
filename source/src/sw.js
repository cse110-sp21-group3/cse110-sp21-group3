var CACHE_NAME = 'bujo-cache';
var URLS_TO_CACHE = [
    '/',
  'https://theme-bujo.netlify.app',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(URLS_TO_CACHE);
    })
    );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
        caches.match(event.request).then((res) => {

      if (res) {
                return res;
      }

      return fetch(event.request).then((res) => {
        if (!res || res.status !== 200 || res.type !== 'basic'){
                    return res;
                }

                let responseToCache = res.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
        });

                return res;
            });

        })
    );
});
