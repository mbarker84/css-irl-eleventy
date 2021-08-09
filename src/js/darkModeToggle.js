class DarkModeToggle {
  constructor(el) {
    this.button = el
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

  setCurrentThemeState() {
    if (this.theme === 'dark') {
      this.setTheme('dark')
    }

    if (this.theme === 'light') {
      this.setTheme('light')
    }
  }

  init() {
    this.button.addEventListener('click', this.onClick.bind(this))

    if (this.theme) {
      return this.setCurrentThemeState()
    }
  }

  onClick() {
    if (this.shouldSetToDark) {
      localStorage.setItem('theme', 'dark')
      this.setTheme('dark')
      this.theme = 'dark'
    } else {
      localStorage.setItem('theme', 'light')
      this.setTheme('light')
      this.theme = 'light'
    }
  }
}

export default DarkModeToggle
