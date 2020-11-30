self.addEventListener('install', function() {
  self.skipWaiting()
})

self.addEventListener('activate', function() {
  self.caches.keys()
    .then(keys => {
      keys.forEach(key => {
        console.log(key)
        self.caches.delete(key)
      })
    })
    .then(() => {
      self.registration.unregister()
      console.log('unregister')
    })
    .then(() => {
      self.clients.matchAll()
      console.log(self.clients)
    })
    .then((clients) => {
      clients.forEach(client => client.navigate(client.url))
    })
    .catch((err) => console.log(err))
});