const CACHE_NAME = 'fozayel-portfolio-v5';
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data/github-snapshot.json',
  './data/profile.json',
  './data/linkedin.json',
  './assets/avatar.jpg',
  './assets/favicon.svg',
  './assets/Fozayel-Ibn-Ayaz-CV.pdf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== 'GET') return;
  if (requestUrl.origin !== self.location.origin) return;
  if (requestUrl.pathname.startsWith('/api/') || requestUrl.pathname.startsWith('/.netlify/functions/')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html')))
  );
});
