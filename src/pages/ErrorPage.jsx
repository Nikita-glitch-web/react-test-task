import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Card,
  CardContent
} from '@mui/material'
import { 
  Home, 
  ErrorOutline,
  Refresh,
  ArrowBack
} from '@mui/icons-material'
import { motion } from 'framer-motion'

export default function ErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: 'Page Not Found',
        message: 'The magical page you\'re looking for has disappeared into the Room of Requirement.',
        code: '404'
      }
    }
    
    if (error?.status >= 500) {
      return {
        title: 'Server Error',
        message: 'The magic servers are having trouble. Please try again later.',
        code: error.status
      }
    }

    return {
      title: 'Oops! Something went wrong',
      message: error?.statusText || error?.message || 'An unexpected magical mishap occurred.',
      code: error?.status || 'Error'
    }
  }

  const errorInfo = getErrorInfo()

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 4
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%' }}
      >
        <Card 
          sx={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            textAlign: 'center',
            p: 2
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ErrorOutline 
                sx={{ 
                  fontSize: '6rem', 
                  color: '#ff6b6b',
                  mb: 2
                }} 
              />
            </motion.div>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800,
                color: '#7dd3fc',
                mb: 2,
                fontSize: { xs: '3rem', md: '4rem' }
              }}
            >
              {errorInfo.code}
            </Typography>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 600,
                color: '#e6eef6',
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              {errorInfo.title}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#9aa4b2',
                mb: 4,
                maxWidth: '500px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              {errorInfo.message}
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center'
              }}
            >
              <Button
                variant="contained"
                startIcon={<Home />}
                onClick={handleGoHome}
                sx={{
                  backgroundColor: '#7dd3fc',
                  color: '#0f1724',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#38bdf8',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleGoBack}
                sx={{
                  borderColor: '#7dd3fc',
                  color: '#7dd3fc',
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(125, 211, 252, 0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Go Back
              </Button>

              <Button
                variant="text"
                startIcon={<Refresh />}
                onClick={handleRefresh}
                sx={{
                  color: '#9aa4b2',
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    color: '#e6eef6',
                    backgroundColor: 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                Refresh Page
              </Button>
            </Box>
            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#6b7280',
                  fontStyle: 'italic',
                  fontSize: '0.875rem'
                }}
              >
                "It is our choices that show what we truly are, far more than our abilities." - Albus Dumbledore
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  )
}
