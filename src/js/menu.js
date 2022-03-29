import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import * as focusTrap from 'focus-trap'

const header = document.querySelector('[data-header]')
const menuButtonText = header.querySelector('[data-menu-button-text]')
const menuBtn = header.querySelector('[data-btn="menu"]')
const menuContainer = header.querySelector('[data-menu-container]')
const menuWrapper = header.querySelector('[data-menu-wrapper]')
const homeLink = header.querySelector('[data-home-link]')

const open = () => {
  menuWrapper.hidden = false
  menuBtn.setAttribute('aria-expanded', true)
  menuButtonText.innerText = 'Close'
  disableBodyScroll(menuWrapper)

  setTimeout(() => {
    menuWrapper.classList.add('is-visible')
    document.body.classList.add('is-menu-open')
  }, 50)
}

const close = () => {
  menuWrapper.classList.remove('is-visible')
  document.body.classList.remove('is-menu-open')

  setTimeout(() => {
    menuWrapper.hidden = true
    menuBtn.setAttribute('aria-expanded', false)
    menuButtonText.innerText = 'Menu'
    enableBodyScroll(menuWrapper)
  }, 250)
}

const trap = focusTrap.createFocusTrap(menuContainer, {
  escapeDeactivates: true,
  onActivate: open,
  onDeactivate: close,
})

const toggleMenu = (e) => {
  if (menuWrapper.hidden) return trap.activate()
  return trap.deactivate()
}

const menu = () => {
  menuBtn.hidden = false
  menuWrapper.hidden = true
  homeLink.hidden = false
  menuWrapper.classList.add('js-menu')
  menuBtn.addEventListener('click', toggleMenu)
}

export default menu
