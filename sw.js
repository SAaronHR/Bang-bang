const CACHE_NAME = 'bang-bang-v1';
const urlsToCache = [
  './',
  './index.html',
  './juego.html',
  './personaje.html',
  './personaje2.html',
  './estilos.css',
  './funciones.js',
  './manifest.webmanifest',
  './sfx/Jump.mp3',
  './sfx/start.m4a',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/bg1.png',
  './img/bg2.png',
  './img/bg3.png',
  './img/bg_personaje.png',
  './img/calavera.png',
  './img/left.png',
  './img/main.png',
  './img/p1.png',
  './img/p2.png',
  './img/p3.png',
  './img/p4.png',
  './img/p5.png',
  './img/p6.png',
  './img/pwa-192x192.png',
  './img/pwa-512x512.png',
  './img/right.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
