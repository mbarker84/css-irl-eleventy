import menu from './menu'
import headerChange from './header'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(
      function (registration) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      function (err) {
        console.log('ServiceWorker registration failed: ', err)
      }
    )
  })
}

document.body.classList.remove('no-js')
menu()
headerChange()
