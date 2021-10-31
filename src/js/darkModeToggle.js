class DarkModeToggle {
  constructor(el) {
    this.button = el
    this.buttonText = el.querySelector('[data-btn-text]')
    this.theme = localStorage.getItem('theme')
    this.init()
  }

  get prefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  get prefersLight() {
    return window.matchMedia('(prefers-color-scheme: light)').matches
  }

  get noPreference() {
    return window.matchMedia('(prefers-color-scheme: no-preference)').matches
  }

  get shouldSetToDark() {
    if (this.theme === 'light') return true
    if (!this.theme && this.prefersLight) return true
    if (!this.theme && this.noPreference) return true
    return false
  }

  setTheme(theme) {
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
    const classToRemove = `th-${oppositeTheme}`

    if (document.body.classList.contains(classToRemove)) {
      document.body.classList.remove(classToRemove)
    }

    document.body.classList.add(`th-${theme}`)
  }

  init() {
    this.button.addEventListener('click', this.onClick.bind(this))

    if (this.theme) {
      return this.setTheme(this.theme)
    }

    this.button.setAttribute('aria-checked', !this.shouldSetToDark)
  }

  onClick() {
    this.theme = this.shouldSetToDark ? 'dark' : 'light'

    this.setTheme(this.theme)
    localStorage.setItem('theme', this.theme)
    this.button.setAttribute('aria-checked', !this.shouldSetToDark)
  }
}

export default DarkModeToggle
