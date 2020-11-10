self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  self.caches.keys()
    .then(keys => keys.forEach(key => {
      console.log(key)
      self.caches.delete(key)
    }))

  console.log(self.caches)

  self.registration.unregister()
    .then(function() {

      return self.clients.matchAll();
    })
    .then(function(clients) {
      clients.forEach(client => client.navigate(client.url))
    });
});