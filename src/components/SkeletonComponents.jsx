import React from 'react'
import { Card, CardContent, Skeleton, Box } from '@mui/material'

export function CharacterCardSkeleton() {
  return (
    <Card className="card">
      <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 2 }}>
        <Skeleton variant="rectangular" width={80} height={80} className="skeleton skeleton-image" />
        <Box flex={1}>
          <Skeleton variant="text" width="70%" height={24} className="skeleton skeleton-text title" />
          <Skeleton variant="text" width="50%" height={16} className="skeleton skeleton-text subtitle" />
        </Box>
      </CardContent>
    </Card>
  )
}

export function CharacterDetailsSkeleton() {
  return (
    <div className="details-card">
      <Skeleton variant="rectangular" width={320} height={420} className="skeleton skeleton-avatar" />
      <Box flex={1}>
        <Skeleton variant="text" width="60%" height={40} className="skeleton skeleton-text" sx={{ mb: 3 }} />
        <Skeleton variant="text" width="80%" height={20} className="skeleton skeleton-text" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" height={20} className="skeleton skeleton-text" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="85%" height={20} className="skeleton skeleton-text" sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={20} className="skeleton skeleton-text" sx={{ mb: 2 }} />
        <Skeleton variant="text" width="90%" height={16} className="skeleton skeleton-text" />
      </Box>
    </div>
  )
}

export function SpellCardSkeleton() {
  return (
    <div className="spell-card">
      <Skeleton variant="text" width="40%" height={24} className="skeleton skeleton-text" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="100%" height={16} className="skeleton skeleton-text" />
      <Skeleton variant="text" width="80%" height={16} className="skeleton skeleton-text" />
    </div>
  )
}
