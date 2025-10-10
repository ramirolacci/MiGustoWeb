// Versión simple para habilitar installability y cache básico
const CACHE_NAME = 'migusto-cache-v2';
const OFFLINE_URL = '/index.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      '/',
      OFFLINE_URL,
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => key !== CACHE_NAME && caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // Ignorar esquemas no soportados (p. ej. chrome-extension) y datos
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Para recursos fuera de nuestro origen, pasa directo (no cachear)
  const isSameOrigin = url.origin === self.location.origin;
  if (!isSameOrigin) {
    return event.respondWith(fetch(request).catch(() => caches.match(request)));
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          // Solo cachear respuestas OK del mismo origen
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});


