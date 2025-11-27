import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Box,
  Badge
} from '@mui/material'
import { 
  People, 
  AutoFixHigh, 
  Favorite,
  Star
} from '@mui/icons-material'
import { useFavorites } from '../hooks/useFavorites'

const drawerWidth = 280

export default function Sidebar() {
  const { favorites } = useFavorites()

  const menuItems = [
    {
      text: 'Characters',
      path: '/characters',
      icon: <People />
    },
    {
      text: 'Spells',
      path: '/spells', 
      icon: <AutoFixHigh />
    },
    {
      text: 'Favorites',
      path: '/favorites',
      icon: <Favorite />,
      badge: favorites.length
    }
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(20px)',
          border: 'none',
          borderRight: '1px solid rgba(255,255,255,0.1)'
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Star sx={{ color: '#fbbf24', fontSize: '2rem' }} />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 700, 
              color: '#e6eef6',
              background: 'linear-gradient(45deg, #7dd3fc, #fbbf24)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            HP Explorer
          </Typography>
        </Box>
        
        <List sx={{ px: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(125,211,252,0.1)',
                    transform: 'translateX(4px)'
                  },
                  '&.active': {
                    backgroundColor: 'rgba(125,211,252,0.15)',
                    borderLeft: '4px solid #7dd3fc',
                    '& .MuiListItemIcon-root': {
                      color: '#7dd3fc'
                    },
                    '& .MuiListItemText-primary': {
                      color: '#7dd3fc',
                      fontWeight: 600
                    }
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#9aa4b2', minWidth: 40 }}>
                  {item.badge && item.badge > 0 ? (
                    <Badge badgeContent={item.badge} color="secondary">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      color: '#e6eef6',
                      fontSize: '0.95rem'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      
      <Box sx={{ mt: 'auto', p: 3, textAlign: 'center' }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#6b7280',
            fontSize: '0.75rem'
          }}
        >
          Built with ❤️ & Material UI
        </Typography>
      </Box>
    </Drawer>
  )
}
