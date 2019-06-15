importScripts("/public-dist/precache-manifest.bbf2df97efd42f6824139f2570a2b6fe.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");


workbox.core.setCacheNameDetails({prefix: "ehs-public"});

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
  new RegExp(".*/public"),
  workbox.strategies.networkFirst({
    cacheName: "public"
  })
);
workbox.routing.registerRoute(
  /\.\*\/languages$/,
  workbox.strategies.networkFirst({
    cacheName: "languages"
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

