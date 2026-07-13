const CACHE_NAME = 'telmex-app-v1.1';
const ASSETS = [
  './index.html',
  './icon-152x152.jpg',
  './icon-180x180.jpg',
  './icon-192x192.jpg',
  './icon-512x512.jpg',
  './manifest.json'
];

// Instala el Service Worker y guarda los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepta peticiones de red y sirve desde caché si no hay internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
