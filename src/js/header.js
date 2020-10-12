const header = document.querySelector('[data-header]')
const trigger = document.querySelector('[data-trigger="header-change"]')

const options = {
  rootMargin: '-40px',
  threshold: 0
}

const toggleHeaderStyle = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      header.classList.remove('c-header--bg')
    } else {
      header.classList.add('c-header--bg')
    }
  })
}

const headerChange = () => {
  if (trigger) {
    const observer = new IntersectionObserver(toggleHeaderStyle, options)
    observer.observe(trigger)
  }
}

export default headerChange