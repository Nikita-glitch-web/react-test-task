import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

// Theme configuration constants
const THEME_STORAGE_KEY = 'hp-explorer-theme'
const VALID_THEMES = ['light', 'dark']
const DEFAULT_THEME = 'dark'

// Create context with default value for better TypeScript support
const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
  setThemeMode: () => {},
  isDark: true,
  isLight: false,
})

/**
 * Custom hook to access theme context
 * @throws {Error} If used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider. Make sure to wrap your component tree with <ThemeProvider>')
  }
  return context
}

/**
 * Get initial theme with fallback chain: localStorage -> system preference -> default
 */
function getInitialTheme() {
  try {
    // Try to get saved theme from localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (savedTheme && VALID_THEMES.includes(savedTheme)) {
      return savedTheme
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error)
  }

  // Fallback to system preference
  try {
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
  } catch (error) {
    console.warn('Failed to detect system color scheme:', error)
  }

  // Final fallback to default theme
  return DEFAULT_THEME
}

/**
 * Theme Provider component that manages application theme state
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }, [])

  /**
   * Set specific theme mode
   * @param {string} newTheme - The theme to set ('light' or 'dark')
   */
  const setThemeMode = useCallback((newTheme) => {
    if (VALID_THEMES.includes(newTheme)) {
      setTheme(newTheme)
    } else {
      console.warn(`Invalid theme: ${newTheme}. Valid themes are: ${VALID_THEMES.join(', ')}`)
    }
  }, [])

  // Apply theme changes to document and persist to storage
  useEffect(() => {
    try {
      // Apply theme to document root
      document.documentElement.setAttribute('data-theme', theme)
      
      // Add theme class for additional CSS targeting if needed
      document.body.className = document.body.className.replace(/theme-\w+/g, '')
      document.body.classList.add(`theme-${theme}`)
      
      // Persist to localStorage
      localStorage.setItem(THEME_STORAGE_KEY, theme)
      
      // Update meta theme-color for mobile browsers and PWA
      updateMetaThemeColor(theme)
      
      // Dispatch custom event for other parts of the app to listen to
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }))
      
    } catch (error) {
      console.error('Failed to apply theme changes:', error)
    }
  }, [theme])

  // Listen for system theme changes and auto-switch if no manual preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    
    const handleSystemThemeChange = (event) => {
      try {
        // Only auto-switch if user hasn't manually set a preference
        const hasManualPreference = localStorage.getItem(THEME_STORAGE_KEY)
        if (!hasManualPreference) {
          setTheme(event.matches ? 'light' : 'dark')
        }
      } catch (error) {
        console.warn('Failed to handle system theme change:', error)
      }
    }

    // Use modern addEventListener API with fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange)
      return () => mediaQuery.removeListener(handleSystemThemeChange)
    }
  }, [])

  // Memoized context value to prevent unnecessary re-renders
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

/**
 * Update meta theme-color for mobile browsers and PWA
 * @param {string} theme - Current theme
 */
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
