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
    if (process.env.NODE_ENV === 'production') {
      const base = 'https://css-irl'
      const url = new URL('/service-worker.js', base)

      navigator.serviceWorker.register(url, {
        type: 'module',
      })
    }
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
