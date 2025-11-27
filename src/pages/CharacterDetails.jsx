import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { 
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Button,
  Alert
} from '@mui/material'
import { 
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Home as House,
  Cake,
  Person
} from '@mui/icons-material'
import { fetchCharacterByIndex } from '../api/hpApi'
import { CharacterDetailsSkeleton } from '../components/SkeletonLoaders'
import { useFavorites } from '../hooks/useHarryPotter'
import { motion } from 'framer-motion'

const houseColors = {
  'Gryffindor': '#740001',
  'Slytherin': '#1a472a', 
  'Ravenclaw': '#0e1a40',
  'Hufflepuff': '#ecb939'
}

export default function CharacterDetails() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(location.state?.character || null)
  const [loading, setLoading] = useState(!character)
  const [error, setError] = useState(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    if (!character) {
      setLoading(true)
      fetchCharacterByIndex(Number(id))
        .then(data => setCharacter(data))
        .catch(err => setError(err.message || 'Failed to load character'))
        .finally(() => setLoading(false))
    }
  }, [id, character])

  const handleFavoriteClick = () => {
    if (character) {
      toggleFavorite({ ...character, index: Number(id) })
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <CharacterDetailsSkeleton />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    )
  }

  if (!character) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mt: 4 }}>
          Character not found
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              color: '#9aa4b2',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#e6eef6'
              }
            }}
          >
            Back to Characters
          </Button>
        </Box>

        {/* Character Details Card */}
        <Card 
          sx={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 3,
            overflow: 'visible'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 4,
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' }
              }}
            >
              {/* Character Image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Avatar
                  src={character.image || 'https://via.placeholder.com/400'}
                  alt={character.name}
                  sx={{ 
                    width: { xs: 250, md: 300 }, 
                    height: { xs: 350, md: 400 },
                    border: character.house ? `4px solid ${houseColors[character.house]}` : '4px solid #444',
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                  }}
                  variant="rounded"
                />
              </motion.div>

              {/* Character Info */}
              <Box sx={{ flex: 1, width: '100%' }}>
                {/* Name and Favorite */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#e6eef6',
                      fontSize: { xs: '2rem', md: '3rem' }
                    }}
                  >
                    {character.name}
                  </Typography>
                  
                  <IconButton
                    onClick={handleFavoriteClick}
                    sx={{
                      color: isFavorite(character.name) ? '#ff4757' : '#9aa4b2',
                      fontSize: '2rem',
                      '&:hover': {
                        color: '#ff4757',
                        backgroundColor: 'rgba(255, 71, 87, 0.1)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {isFavorite(character.name) ? <Favorite sx={{ fontSize: '2rem' }} /> : <FavoriteBorder sx={{ fontSize: '2rem' }} />}
                  </IconButton>
                </Box>

                {/* House Chip */}
                {character.house && (
                  <Box sx={{ mb: 3 }}>
                    <Chip 
                      icon={<House />}
                      label={character.house} 
                      sx={{ 
                        backgroundColor: houseColors[character.house] || '#444',
                        color: 'white',
                        fontSize: '1rem',
                        height: 36,
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />
                  </Box>
                )}

                {/* Details Grid */}
                <Box sx={{ display: 'grid', gap: 2, mb: 3 }}>
                  {character.dateOfBirth && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Cake sx={{ color: '#9aa4b2' }} />
                      <Typography variant="body1" sx={{ color: '#e6eef6' }}>
                        <strong>Date of Birth:</strong> {character.dateOfBirth}
                      </Typography>
                    </Box>
                  )}

                  {character.actor && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Person sx={{ color: '#9aa4b2' }} />
                      <Typography variant="body1" sx={{ color: '#e6eef6' }}>
                        <strong>Portrayed by:</strong> {character.actor}
                      </Typography>
                    </Box>
                  )}

                  {character.species && character.species !== 'human' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body1" sx={{ color: '#e6eef6' }}>
                        <strong>Species:</strong> {character.species}
                      </Typography>
                    </Box>
                  )}

                  {character.patronus && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body1" sx={{ color: '#e6eef6' }}>
                        <strong>Patronus:</strong> {character.patronus}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Alternate Names */}
                {character.alternate_names && character.alternate_names.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ color: '#9aa4b2', fontStyle: 'italic' }}>
                      Also known as: {character.alternate_names.join(', ')}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  )
}
