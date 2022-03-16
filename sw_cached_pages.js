const cacheName = 'v1'
const cacheAssets = ['index.html', 'about.html', 'style.css', 'main.js']

// Call Install Event
this.addEventListener('install', (e) => {
  console.log('installed')

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('caching files...')
        cache.addAll(cacheAssets)
      })
      .then(() => this.skipWaiting()),
  )
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
  console.log('fetching...')

  // Your pages will now be visible offline (even on reload)
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})

// Use Case 2: Push notifications (push event)

// Use Case 3: Background data sync/preload (sync event)
