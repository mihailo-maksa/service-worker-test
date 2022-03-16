const cacheName = 'v2'

// Call Install Event
this.addEventListener('install', (e) => {
  console.log('installed')
})

// Call Activate Event
this.addEventListener('activate', (e) => {
  console.log('activated')

  // Remove Unwanted Caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('clearing old caches...')
            return caches.delete(cache)
          }
          return console.log('no unwanted caches found')
        }),
      )
    }),
  )
})

// Use Case 1: Caching assets & API calls (fetch event)
this.addEventListener('fetch', (e) => {
  console.log('fetching site...')

  // Your pages will now be visible offline (even on reload)
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Make a clone of response
        const resClone = res.clone()
        // Open cache
        caches.open(cacheName).then((cache) => {
          // Add response to the cache
          cache.put(e.request, resClone)
        })
        return res
      })
      .catch(() => caches.match(e.request).then((res) => res)),
  )
})

// Use Case 2: Push notifications (push event)

// Use Case 3: Background data sync/preload (sync event)
