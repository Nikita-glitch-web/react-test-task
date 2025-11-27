import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('hp-favorites')
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse favorites from localStorage:', e)
        setFavorites([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('hp-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (character) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.name === character.name)
      if (!exists) {
        return [...prev, character]
      }
      return prev
    })
  }

  const removeFavorite = (characterName) => {
    setFavorites(prev => prev.filter(fav => fav.name !== characterName))
  }

  const isFavorite = (characterName) => {
    return favorites.some(fav => fav.name === characterName)
  }

  const toggleFavorite = (character) => {
    if (isFavorite(character.name)) {
      removeFavorite(character.name)
    } else {
      addFavorite(character)
    }
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }
}

export function useCharacterFilters(characters) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHouse, setSelectedHouse] = useState('')

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHouse = !selectedHouse || character.house === selectedHouse || 
      (!character.house && selectedHouse === 'Unknown')
    
    return matchesSearch && matchesHouse
  })

  return {
    searchTerm,
    setSearchTerm,
    selectedHouse,
    setSelectedHouse,
    filteredCharacters
  }
}
