import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, Typography, Avatar, IconButton, Box, Chip } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useFavorites } from '../hooks/useFavorites'

const houseColors = {
  'Gryffindor': '#740001',
  'Slytherin': '#1a472a',
  'Ravenclaw': '#0e1a40',
  'Hufflepuff': '#ecb939'
}

export default function CharacterCard({ character, index }) {
  const { isFavorite, toggleFavorite } = useFavorites()

  const handleFavoriteClick = (e) => {
    e.preventDefault() // Prevent navigation when clicking favorite button
    e.stopPropagation()
    toggleFavorite({ ...character, index }) // Include index for routing
  }

  // Truncate long names to ensure uniform card sizes
  const truncateName = (name, maxLength = 20) => {
    return name && name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.02 }}
    >
      <Card 
        sx={{ 
          height: 140, // Fixed height for uniform card sizes
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))'
          }
        }}
      >
        <Avatar
          src={character.image || `https://via.placeholder.com/80x80/4a5568/e2e8f0?text=${character.name?.charAt(0) || '?'}`}
          alt={character.name}
          sx={{ 
            width: 80, 
            height: 80,
            flexShrink: 0, // Prevent avatar from shrinking
            border: character.house ? `3px solid ${houseColors[character.house]}` : '3px solid #555',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        />
        
        <Box sx={{ 
          flex: 1, 
          minWidth: 0, // Allow content to shrink
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0.5
        }}>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 600, 
              color: '#e6eef6',
              fontSize: '1rem',
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            title={character.name} // Show full name on hover
          >
            {truncateName(character.name)}
          </Typography>
          
          <Box sx={{ minHeight: 24, display: 'flex', alignItems: 'center' }}>
            {character.house ? (
              <Chip 
                label={character.house} 
                size="small"
                sx={{ 
                  backgroundColor: houseColors[character.house] || '#444',
                  color: 'white',
                  fontSize: '0.7rem',
                  height: 22,
                  fontWeight: 500
                }}
              />
            ) : (
              <Typography variant="caption" sx={{ color: '#9aa4b2', fontStyle: 'italic' }}>
                Unknown house
              </Typography>
            )}
          </Box>
          
          <Box sx={{ minHeight: 16 }}>
            {character.actor && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#9aa4b2', 
                  fontSize: '0.75rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block'
                }}
                title={`Played by ${character.actor}`} // Show full actor name on hover
              >
                {character.actor}
              </Typography>
            )}
          </Box>
        </Box>

        <IconButton
          onClick={handleFavoriteClick}
          size="small"
          sx={{
            flexShrink: 0, // Prevent button from shrinking
            color: isFavorite(character.name) ? '#ff4757' : '#9aa4b2',
            transition: 'all 0.2s ease',
            '&:hover': {
              color: '#ff4757',
              backgroundColor: 'rgba(255, 71, 87, 0.15)',
              transform: 'scale(1.1)'
            }
          }}
        >
          {isFavorite(character.name) ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Card>
    </motion.div>
  )
}
