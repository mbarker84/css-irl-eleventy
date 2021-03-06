import { trapFocus, visibleLinks } from './helpers/trapFocus'
import bodyScrollLock from './helpers/bodyScrollLock'

const header = document.querySelector('[data-header]')
const menuBtn = header.querySelector('[data-btn="menu"]')
const menuContainer = header.querySelector('[data-menu-container]')
const menuWrapper = header.querySelector('[data-menu-wrapper]')
const homeLink = header.querySelector('[data-home-link]')

const open = () => {
  menuWrapper.hidden = false
  menuBtn.setAttribute('aria-expanded', true)
  menuBtn.innerText = 'Close'

  if (window.innerWidth < 1024) {
    bodyScrollLock(true)
  }

  setTimeout(() => {
    menuWrapper.classList.add('is-visible')
  }, 50)
}

const close = () => {
  menuWrapper.classList.remove('is-visible')

  setTimeout(() => {
    menuWrapper.hidden = true
    menuBtn.setAttribute('aria-expanded', false)
    menuBtn.innerText = 'Menu'
    bodyScrollLock(false)
  }, 250)
}

const toggleMenu = (e) => {
  if (menuWrapper.hidden) {
    open()
  } else {
    close()
  }
}

const trapFocusInMenu = (e) => {
  trapFocus(e, menuContainer)

  /* if Esc key pressed */
  if (e.keyCode === 27) {
    close()
  }
}

const menu = () => {
  menuBtn.hidden = false
  menuWrapper.hidden = true
  homeLink.hidden = false
  menuWrapper.classList.add('js-menu')
  menuBtn.addEventListener('click', toggleMenu)
  menuWrapper.addEventListener('keydown', trapFocusInMenu)
}

export default menu
