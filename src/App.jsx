import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { ThemeProvider as CustomThemeProvider, useTheme } from './hooks/useTheme.jsx'
import MainLayout from './layout/MainLayout'
import CharactersPage from './pages/CharactersPage'
import CharacterDetails from './pages/CharacterDetails'
import SpellsPage from './pages/SpellsPage'
import FavoritesPage from './pages/FavoritesPage'
import ErrorPage from './pages/ErrorPage'

const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#7dd3fc' : '#0284c7',
    },
    secondary: {
      main: mode === 'dark' ? '#ff4757' : '#dc2626',
    },
    background: {
      default: mode === 'dark' ? '#071021' : '#ffffff',
      paper: mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.95)',
    },
    text: {
      primary: mode === 'dark' ? '#e6eef6' : '#0f172a',
      secondary: mode === 'dark' ? '#9aa4b2' : '#334155',
    },
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: mode === 'dark' 
            ? 'linear-gradient(180deg, #071021 0%, #09202b 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          backgroundAttachment: 'fixed',
          transition: 'background 0.3s ease',
        },
      },
    },
  },
})

function AppContent() {
  const { theme } = useTheme()
  const muiTheme = createAppTheme(theme)

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
            <Route index element={<Navigate to="/characters" replace />} />
            <Route path="characters" element={<CharactersPage />} errorElement={<ErrorPage />} />
            <Route path="characters/:id" element={<CharacterDetails />} errorElement={<ErrorPage />} />
            <Route path="spells" element={<SpellsPage />} errorElement={<ErrorPage />} />
            <Route path="favorites" element={<FavoritesPage />} errorElement={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  )
}
