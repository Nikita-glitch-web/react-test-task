import { useState, useEffect } from 'react'

const FAVORITES_KEY = 'hp-explorer-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.warn('Failed to load favorites from localStorage:', error)
      return []
    }
  })

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (error) {
      console.warn('Failed to save favorites to localStorage:', error)
    }
  }, [favorites])

  const addFavorite = (character) => {
    setFavorites(prev => {
      // Check if character already exists (by name as unique identifier)
      const exists = prev.some(fav => fav.name === character.name)
      if (exists) {
        return prev
      }
      
      // Create a clean favorite object with essential data
      const favoriteCharacter = {
        name: character.name,
        image: character.image,
        house: character.house,
        actor: character.actor,
        index: character.index,
        dateOfBirth: character.dateOfBirth,
        species: character.species,
        patronus: character.patronus,
        alternate_names: character.alternate_names
      }
      
      return [...prev, favoriteCharacter]
    })
  }

  const removeFavorite = (characterName) => {
    setFavorites(prev => prev.filter(fav => fav.name !== characterName))
  }

  const isFavorite = (characterName) => {
    if (!characterName) return false
    return favorites.some(fav => fav.name === characterName)
  }

  const toggleFavorite = (character) => {
    if (!character || !character.name) {
      console.warn('Cannot toggle favorite: invalid character data')
      return
    }

    if (isFavorite(character.name)) {
      removeFavorite(character.name)
    } else {
      addFavorite(character)
    }
  }

  const clearAllFavorites = () => {
    setFavorites([])
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    favoritesCount: favorites.length
  }
}
