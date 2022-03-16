// Register Service Worker
if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw_cached_site.js')
      .then((res) => console.log('registered'))
      .catch((err) => console.log(`sw error: ${err}`))
  })
}
