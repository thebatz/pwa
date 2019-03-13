const filesToCache = [
  '/',
  'style/main.css',
  'images/still_life_medium.jpg',
  'images/volt_medium.jpg',
  'images/horses_medium.jpg',
  'index.html',
  'pages/offline.html',
  'pages/post2.html',
  'pages/404.html'
];

const staticCacheName = 'pages-cache-v3';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [staticCacheName];

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
// self.addEventListener('fetch', function(event) {
//   console.log('fetch');
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request);
//     })
//   );
// });

self.addEventListener('fetch', event => {
  // console.log('Fetch event for ', event.request.url);
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
    // caches.match(event.request)
    .then(response => {
      // if (response) {
      //   // console.log('Found ', event.request.url, ' in cache');
      //   return response;
      // }
      // // console.log('Network request for ', event.request.url);

      // return fetch(event.request)
      // .then(response => {
        if (response.status === 404) {
          return caches.match('pages/404.html');
        }
        return caches.open(staticCacheName)
        .then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        // });
      });
    }).catch(error => {
      console.log('Error, ', error);
      return caches.match('pages/offline.html');
    })
  );
});



