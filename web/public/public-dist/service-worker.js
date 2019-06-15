importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.setConfig({
  debug: true
});

// This will trigger the importScripts() for workbox.strategies and its dependencies:
workbox.loadModule('workbox-strategies');

self.addEventListener('fetch', (event) => {
  console.log(event)
  if (event.request.url.endsWith('.css')) {
    // Referencing workbox.strategies will now work as expected.
    const cacheFirst = new workbox.strategies.CacheFirst();
    event.respondWith(cacheFirst.makeRequest({request: event.request}));
  }
});