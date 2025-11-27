import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

const THEME_STORAGE_KEY = 'hp-explorer-theme'
const VALID_THEMES = ['light', 'dark']
const DEFAULT_THEME = 'dark'

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
  setThemeMode: () => {},
  isDark: true,
  isLight: false,
})


export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider. Make sure to wrap your component tree with <ThemeProvider>')
  }
  return context
}


function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme && VALID_THEMES.includes(savedTheme)) {
      return savedTheme
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error)
  }

  try {
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
  } catch (error) {
    console.warn('Failed to detect system color scheme:', error)
  }

  return DEFAULT_THEME
}


export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }, [])

  const setThemeMode = useCallback((newTheme) => {
    if (VALID_THEMES.includes(newTheme)) {
      setTheme(newTheme)
    } else {
      console.warn(`Invalid theme: ${newTheme}. Valid themes are: ${VALID_THEMES.join(', ')}`)
    }
  }, [])

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      document.body.className = document.body.className.replace(/theme-\w+/g, '')
      document.body.classList.add(`theme-${theme}`)
      localStorage.setItem(THEME_STORAGE_KEY, theme)
      updateMetaThemeColor(theme)
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }))
      
    } catch (error) {
      console.error('Failed to apply theme changes:', error)
    }
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    
    const handleSystemThemeChange = (event) => {
      try {
        const hasManualPreference = localStorage.getItem(THEME_STORAGE_KEY)
        if (!hasManualPreference) {
          setTheme(event.matches ? 'light' : 'dark')
        }
      } catch (error) {
        console.warn('Failed to handle system theme change:', error)
      }
    }
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    } else {
      mediaQuery.addListener(handleSystemThemeChange)
      return () => mediaQuery.removeListener(handleSystemThemeChange)
    }
  }, [])
  const contextValue = React.useMemo(() => ({
    theme,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }), [theme, toggleTheme, setThemeMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

function updateMetaThemeColor(theme) {
  try {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.name = 'theme-color'
      document.head.appendChild(metaThemeColor)
    }
    
    const themeColors = {
      dark: '#071021',
      light: '#ffffff'
    }
    
    metaThemeColor.content = themeColors[theme] || themeColors.dark
  } catch (error) {
    console.warn('Failed to update meta theme-color:', error)
  }
}
