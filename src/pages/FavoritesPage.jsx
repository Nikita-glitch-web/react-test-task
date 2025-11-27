// Favorites page to display favorited characters
import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Container, Alert } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import CharacterCard from '../components/CharacterCard'
import { useFavorites } from '../hooks/useFavorites'
import { motion } from 'framer-motion'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <Favorite sx={{ color: '#ff4757', fontSize: '2rem' }} />
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                color: '#e6eef6'
              }}
            >
              Favorites
            </Typography>
          </Box>
          
          <Alert 
            severity="info" 
            sx={{ 
              backgroundColor: 'rgba(125,211,252,0.1)',
              border: '1px solid rgba(125,211,252,0.3)',
              '& .MuiAlert-message': {
                color: '#e6eef6'
              }
            }}
          >
            No favorite characters yet! Start exploring and click the heart icon to add characters to your favorites.
          </Alert>
        </motion.div>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Favorite sx={{ color: '#ff4757', fontSize: '2rem' }} />
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: '#e6eef6'
            }}
          >
            Favorites
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ color: '#9aa4b2', mb: 4 }}>
          {favorites.length} favorite character{favorites.length !== 1 ? 's' : ''}
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 3,
        }}
      >
        {favorites.map((character, idx) => (
          <Link 
            key={character.name + idx} 
            to={`/characters/${character.index}`} 
            state={{ character }}
            style={{ textDecoration: 'none' }}
          >
            <CharacterCard character={character} index={idx} />
          </Link>
        ))}
      </Box>
    </Container>
  )
}
