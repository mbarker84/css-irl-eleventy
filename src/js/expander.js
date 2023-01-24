class Expander {
  constructor(el) {
    this.el = el
    this.isExpanded = true
    this.content = el.querySelector('[data-content]')
    this.btn = el.querySelector('[data-btn]')
    this.isDesktop = window.matchMedia('(min-width: 1024px)')
    this.onToggle = this.toggleExpanded.bind(this)
    this.isDesktop.addEventListener('change', this.onChange.bind(this))

    this.init()
  }

  onChange(mq) {
    if (mq.matches) {
      this.open()
      this.btn.removeEventListener('click', this.onToggle)
    } else {
      this.close()
      this.btn.addEventListener('click', this.onToggle)
    }

    this.btn.hidden = this.isDesktop.matches
  }

  close() {
    this.isExpanded = false
    this.btn.setAttribute('aria-expanded', 'false')
    this.content.hidden = true
    this.content.setAttribute('tabindex', -1)
  }

  open() {
    this.isExpanded = true
    this.btn.setAttribute('aria-expanded', 'true')
    this.content.hidden = false
    this.content.setAttribute('tabindex', 0)
  }

  toggleExpanded() {
    if (this.isExpanded) {
      this.close()
    } else {
      this.open()
    }
  }

  init() {
    console.log('expander')
    this.btn.hidden = this.isDesktop.matches

    if (!this.isDesktop.matches) {
      this.close()
      this.btn.addEventListener('click', this.onToggle)
    }
  }
}

export default Expander
