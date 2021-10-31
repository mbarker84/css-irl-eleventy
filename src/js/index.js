import menu from './menu'
import headerChange from './header'
import DarkModeToggle from './darkModeToggle'

const components = [
  {
    name: 'dark-mode-toggle',
    component: DarkModeToggle,
  },
]

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

/* Init components */
components.forEach(({ name, component }) => {
  const elements = [...document.querySelectorAll(`[data-behaviour="${name}"]`)]

  elements.forEach((el) => new component(el))
})
