import axios from 'axios'

const BASE_CHARS = 'https://hp-api.onrender.com/api/characters'
const BASE_SPELLS = 'https://hp-api.onrender.com/api/spells'

export async function fetchCharacters() {
  const res = await axios.get(BASE_CHARS)
  return res.data
}

export async function fetchCharacterByIndex(index) {
  const chars = await fetchCharacters()
  return chars[index]
}

export async function fetchSpells() {
  const res = await axios.get(BASE_SPELLS)
  return res.data
}
