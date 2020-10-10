// const CACHE_NAME = 'my-pwa-cache-v1';
//
// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         // Open a cache and cache our files
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('activate', function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       console.log(cacheNames);
//
//       return Promise.all(
//         cacheNames
//           .filter(function (cacheName) {
//             return true;
//           })
//           .map(function (cacheName) {
//             return caches.delete(cacheName);
//           })
//       );
//     })
//   );
// });