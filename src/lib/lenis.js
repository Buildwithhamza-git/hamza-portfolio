let lenisInstance = null

export function setLenis(lenis) {
  lenisInstance = lenis
}

export function getLenis() {
  return lenisInstance
}

export function scrollToId(id) {
  const el = document.querySelector(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset: 0,
      duration: 1.4,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
