importScripts("/public-dist/precache-manifest.6dada79781929549e97817dc66c58b81.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.core.setCacheNameDetails({ prefix: "ehs-public" });

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// workbox.setConfig({
//   debug: true
// });

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp("/public"),
  workbox.strategies.networkFirst({
    cacheName: "public"
  })
);
workbox.routing.registerRoute(
  new RegExp("/languages"),
  workbox.strategies.networkFirst({
    cacheName: "languages"
  })
);
workbox.routing.registerRoute(
  new RegExp("/forms"),
  workbox.strategies.networkFirst({
    cacheName: "forms"
  })
);

workbox.routing.registerRoute(
    new RegExp("/forms/*"),
    workbox.strategies.networkFirst({
      cacheName: "forms-detail"
    })
  );

workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  workbox.strategies.cacheFirst({
    cacheName: "googleapis",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30
      })
    ]
  })
);

