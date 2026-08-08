import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'hamza-theme'

export function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
  window.dispatchEvent(new CustomEvent('hamza-themechange'))
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
    const root = document.documentElement
    root.classList.add('theme-transition')
    const id = window.setTimeout(() => root.classList.remove('theme-transition'), 800)
    return () => window.clearTimeout(id)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
