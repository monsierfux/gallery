const CACHE = 'gallery-images-v1';

const shouldCache = url =>
  url.includes('lh3.googleusercontent.com') ||
  (url.includes('googleapis.com/drive') && url.includes('alt=media'));

self.addEventListener('fetch', event => {
  if (!shouldCache(event.request.url)) return;

  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(event.request);
      if (cached) return cached;

      const response = await fetch(event.request);
      if (response.ok) cache.put(event.request, response.clone());
      return response;
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});
