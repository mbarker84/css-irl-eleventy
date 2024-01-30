import menu from './menu'
import headerChange from './header'
import DarkModeToggle from './darkModeToggle'
import Expander from './expander'

const components = [
  {
    name: 'dark-mode-toggle',
    component: DarkModeToggle,
  },
  {
    name: 'expander',
    component: Expander,
  },
]

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js')
  menu()
  headerChange()

  /* Init components */
  components.forEach(({ name, component }) => {
    const elements = [
      ...document.querySelectorAll(`[data-behaviour="${name}"]`),
    ]

    elements.forEach((el) => new component(el))
  })
})
