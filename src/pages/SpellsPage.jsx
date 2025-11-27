import React, { useEffect, useState } from 'react'
import { 
  Container,
  Typography, 
  Card,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  Alert,
  Button
} from '@mui/material'
import { Search, AutoFixHigh, ExpandMore } from '@mui/icons-material'
import { fetchSpells } from '../api/hpApi'
import { SpellsListSkeleton } from '../components/SkeletonLoaders'
import { usePagination } from '../hooks/usePagination'
import { motion, AnimatePresence } from 'framer-motion'

export default function SpellsPage() {
  const [spells, setSpells] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSpells = spells.filter(spell => 
    spell.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spell.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const {
    items: paginatedSpells,
    hasMore,
    loadMore,
    reset,
    totalItems,
    remainingItems,
    showingCount
  } = usePagination(filteredSpells, 12)

  useEffect(() => {
    let mounted = true
    fetchSpells()
      .then(data => mounted && setSpells(data))
      .catch(err => mounted && setError(err.message || 'Failed to load spells'))
      .finally(() => mounted && setLoading(false))

    return () => (mounted = false)
  }, [])

  useEffect(() => {
    reset()
  }, [searchTerm, reset])

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <AutoFixHigh sx={{ color: '#7dd3fc', fontSize: '2.5rem' }} />
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: '#e6eef6'
            }}
          >
            Spells
          </Typography>
        </Box>

        {/* Search */}
        <Box sx={{ mb: 4 }}>
          <TextField
            placeholder="Search spells..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ 
              maxWidth: 500,
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
        </Box>

        <Typography variant="body1" sx={{ color: '#9aa4b2', mb: 3 }}>
          {loading ? 'Loading...' : `Showing ${showingCount} of ${filteredSpells.length} spell${filteredSpells.length !== 1 ? 's' : ''}`}
        </Typography>
      </motion.div>
      {loading ? (
        <SpellsListSkeleton />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {paginatedSpells.map((spell, index) => (
            <motion.div
              key={spell.name + index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card 
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(125,211,252,0.3)'
                  }
                }}
              >
                <CardContent>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#7dd3fc',
                      mb: 1
                    }}
                  >
                    {spell.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#9aa4b2',
                      lineHeight: 1.6
                    }}
                  >
                    {spell.description || 'No description available'}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      )}
      <AnimatePresence>
        {!loading && hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center', marginTop: '2rem' }}
          >
            <Button
              onClick={loadMore}
              variant="outlined"
              size="large"
              endIcon={<ExpandMore />}
              sx={{
                borderColor: '#7dd3fc',
                color: '#7dd3fc',
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, rgba(125,211,252,0.1), rgba(125,211,252,0.05))',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#7dd3fc',
                  backgroundColor: 'rgba(125,211,252,0.15)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(125,211,252,0.3)'
                }
              }}
              className="load-more-btn"
            >
              Load More Spells ({remainingItems} remaining)
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && filteredSpells.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <AutoFixHigh sx={{ fontSize: '4rem', color: '#6b7280', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#9aa4b2', mb: 2 }}>
            No spells found
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Try adjusting your search criteria
          </Typography>
        </Box>
      )}
    </Container>
  )
}
