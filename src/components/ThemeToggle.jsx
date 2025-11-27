import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { useTheme } from '../hooks/useTheme'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="theme-toggle">
      <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} placement="left">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <IconButton
            onClick={toggleTheme}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              width: 56,
              height: 56,
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-primary)',
              zIndex: 1000,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'var(--bg-card)',
                borderColor: 'var(--accent-primary)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px var(--shadow-color)'
              }
            }}
          >
            <motion.div
              initial={false}
              animate={{ 
                rotate: theme === 'dark' ? 0 : 180,
                scale: theme === 'dark' ? 1 : 1.1
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {theme === 'dark' ? (
                <LightMode sx={{ fontSize: 24 }} />
              ) : (
                <DarkMode sx={{ fontSize: 24 }} />
              )}
            </motion.div>
          </IconButton>
        </motion.div>
      </Tooltip>
    </div>
  )
}
