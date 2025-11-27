import React from 'react'
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material'
import { LightMode, DarkMode, Brightness6 } from '@mui/icons-material'
import { useTheme } from '../hooks/useTheme'
import { motion, AnimatePresence } from 'framer-motion'

const iconVariants = {
  initial: { scale: 0, rotate: -180, opacity: 0 },
  animate: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  exit: { 
    scale: 0, 
    rotate: 180, 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.6, 1] }
  }
}

const containerVariants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeInOut' }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1, ease: 'easeInOut' }
  }
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const muiTheme = useMuiTheme()
  
  const isDark = theme === 'dark'
  const tooltipText = `Switch to ${isDark ? 'light' : 'dark'} mode`
  const ariaLabel = `Current theme: ${theme}. Click to switch to ${isDark ? 'light' : 'dark'} mode`

  const handleToggle = React.useCallback((event) => {
    event.preventDefault()
    event.stopPropagation()
    
    // Add haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
    
    toggleTheme()
  }, [toggleTheme])

  return (
    <motion.div 
      className="theme-toggle"
      variants={containerVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
    >
      <Tooltip 
        title={tooltipText} 
        placement="left"
        arrow
        enterDelay={500}
        leaveDelay={200}
      >
        <IconButton
          onClick={handleToggle}
          aria-label={ariaLabel}
          className="theme-toggle-button"
          size="large"
          sx={{
            backgroundColor: muiTheme.palette.background.paper,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${muiTheme.palette.divider}`,
            boxShadow: muiTheme.shadows[4],
            '&:hover': {
              backgroundColor: muiTheme.palette.action.hover,
              transform: 'none', // Prevent MUI default transform
            },
            '&:focus-visible': {
              outline: `2px solid ${muiTheme.palette.primary.main}`,
              outlineOffset: '2px',
            },
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isDark ? (
                <LightMode 
                  sx={{ 
                    fontSize: 24,
                    color: muiTheme.palette.warning.main,
                    filter: 'drop-shadow(0 0 4px rgba(255, 193, 7, 0.3))',
                  }} 
                />
              ) : (
                <DarkMode 
                  sx={{ 
                    fontSize: 24,
                    color: muiTheme.palette.primary.main,
                    filter: 'drop-shadow(0 0 4px rgba(125, 211, 252, 0.3))',
                  }} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </IconButton>
      </Tooltip>
    </motion.div>
  )
}
