// src/pages/CharactersPage.jsx
// Characters list with search, house filter, and favorites system

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Box, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Alert,
  Container,
  InputAdornment,
  Chip,
  Button,
  CircularProgress
} from '@mui/material'
import { Search, FilterList, ExpandMore } from '@mui/icons-material'
import { fetchCharacters } from '../api/hpApi'
import CharacterCard from '../components/CharacterCard'
import { CharacterGridSkeleton } from '../components/SkeletonLoaders'
import { useCharacterFilters } from '../hooks/useHarryPotter'
import { usePagination } from '../hooks/usePagination'
import { motion, AnimatePresence } from 'framer-motion'

const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff', 'Unknown']

export default function CharactersPage() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {
    searchTerm,
    setSearchTerm,
    selectedHouse,
    setSelectedHouse,
    filteredCharacters
  } = useCharacterFilters(characters)

  const {
    items: paginatedCharacters,
    hasMore,
    loadMore,
    reset,
    totalItems,
    remainingItems,
    showingCount
  } = usePagination(filteredCharacters, 15)

  const handleLoadMore = () => {
    console.log('Load More clicked!', {
      currentShowing: paginatedCharacters.length,
      hasMore,
      remainingItems,
      totalItems: filteredCharacters.length
    })
    
    loadMore()
  }

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchCharacters()
      .then(data => {
        if (mounted) setCharacters(data)
      })
      .catch(err => {
        if (mounted) setError(err.message || 'Failed to load characters')
      })
      .finally(() => mounted && setLoading(false))

    return () => (mounted = false)
  }, [])

  useEffect(() => {
    reset()
  }, [searchTerm, selectedHouse])

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
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
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 4, 
            fontWeight: 700, 
            color: '#e6eef6',
            textAlign: 'center'
          }}
        >
          Characters
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 4, 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center'
          }}
        >
          <TextField
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="medium"
            sx={{ 
              flex: 1,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7dd3fc',
                }
              },
              '& .MuiInputBase-input': {
                color: '#e6eef6'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#9aa4b2' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel 
              sx={{ color: '#9aa4b2' }}
            >
              <FilterList sx={{ mr: 1, fontSize: '1rem' }} />
              House
            </InputLabel>
            <Select
              value={selectedHouse}
              label="House"
              onChange={(e) => setSelectedHouse(e.target.value)}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#7dd3fc',
                },
                '& .MuiSelect-select': {
                  color: '#e6eef6'
                }
              }}
            >
              <MenuItem value="">All Houses</MenuItem>
              {houses.map(house => (
                <MenuItem key={house} value={house}>{house}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ color: '#9aa4b2' }}>
          {loading ? 'Loading...' : `Showing ${showingCount} of ${totalItems} character${totalItems !== 1 ? 's' : ''}`}
        </Typography>          {(searchTerm || selectedHouse) && !loading && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {searchTerm && (
                <Chip 
                  label={`Search: "${searchTerm}"`} 
                  onDelete={() => setSearchTerm('')}
                  size="small"
                  sx={{ backgroundColor: 'rgba(125,211,252,0.2)', color: '#7dd3fc' }}
                />
              )}
              {selectedHouse && (
                <Chip 
                  label={`House: ${selectedHouse}`} 
                  onDelete={() => setSelectedHouse('')}
                  size="small"
                  sx={{ backgroundColor: 'rgba(125,211,252,0.2)', color: '#7dd3fc' }}
                />
              )}
            </Box>
          )}
        </Box>
      </motion.div>
      {loading ? (
        <CharacterGridSkeleton />
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 3,
            }}
          >
            {paginatedCharacters.map((character, idx) => {
              const originalIndex = characters.indexOf(character);
              return (
                <motion.div
                  key={`character-${character.name}-${originalIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: idx < 15 ? idx * 0.05 : 0
                  }}
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <Link 
                    to={`/characters/${originalIndex}`} 
                    state={{ character }}
                    style={{ textDecoration: 'none' }}
                  >
                    <CharacterCard character={character} index={idx} />
                  </Link>
                </motion.div>
              );
            })}
          </Box>
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleLoadMore}
                  startIcon={<ExpandMore />}
                  sx={{
                    borderColor: '#7dd3fc',
                    color: '#7dd3fc',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, rgba(125,211,252,0.1), rgba(125,211,252,0.05))',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#7dd3fc',
                      backgroundColor: 'rgba(125,211,252,0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px rgba(125,211,252,0.3)'
                    }
                  }}
                >
                  {`Load More Characters (${remainingItems} remaining)`}
                </Button>
              </Box>
            </motion.div>
          )}
        </>
      )}

      {!loading && filteredCharacters.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#9aa4b2', mb: 2 }}>
              No characters found
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        </motion.div>
      )}
    </Container>
  )
}
