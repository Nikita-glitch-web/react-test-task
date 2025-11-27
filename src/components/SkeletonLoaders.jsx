import React from 'react'
import { Skeleton, Card, CardContent, Box } from '@mui/material'
import { motion } from 'framer-motion'

export function CharacterCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          p: 1.5,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Skeleton 
          variant="rectangular" 
          width={84} 
          height={84} 
          sx={{ borderRadius: 1, flexShrink: 0 }}
          animation="wave"
        />
        <CardContent sx={{ flex: 1, p: 0, '&:last-child': { pb: 0 } }}>
          <Skeleton variant="text" width="80%" height={24} animation="wave" />
          <Skeleton variant="text" width="60%" height={20} animation="wave" />
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Grid of skeleton loaders
export function CharacterGridSkeleton({ count = 8 }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2,
        mt: 3
      }}
    >
      {Array.from({ length: count }, (_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </Box>
  )
}

// Skeleton for character details page
export function CharacterDetailsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        sx={{ 
          display: 'flex', 
          gap: 3, 
          p: 3,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' }
        }}
      >
        <Skeleton 
          variant="rectangular" 
          width={300} 
          height={400} 
          sx={{ borderRadius: 2, flexShrink: 0 }}
          animation="wave"
        />
        <Box sx={{ flex: 1, width: '100%' }}>
          <Skeleton variant="text" width="70%" height={40} animation="wave" sx={{ mb: 2 }} />
          <Skeleton variant="text" width="50%" height={24} animation="wave" sx={{ mb: 1 }} />
          <Skeleton variant="text" width="60%" height={24} animation="wave" sx={{ mb: 1 }} />
          <Skeleton variant="text" width="55%" height={24} animation="wave" sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={20} animation="wave" sx={{ mt: 3 }} />
        </Box>
      </Card>
    </motion.div>
  )
}

// Skeleton for spells list
export function SpellCardSkeleton() {
  return (
    <Card 
      sx={{ 
        p: 2,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Skeleton variant="text" width="40%" height={28} animation="wave" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="90%" height={20} animation="wave" />
      <Skeleton variant="text" width="70%" height={20} animation="wave" />
    </Card>
  )
}

export function SpellsListSkeleton({ count = 6 }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
      {Array.from({ length: count }, (_, i) => (
        <SpellCardSkeleton key={i} />
      ))}
    </Box>
  )
}
