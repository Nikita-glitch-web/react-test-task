import { useState, useMemo, useCallback } from 'react'

export function usePagination(items, itemsPerPage = 15) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const paginatedItems = useMemo(() => {
    const startIndex = 0
    const endIndex = currentPage * itemsPerPage
    console.log('useMemo recalculating:', { currentPage, itemsPerPage, startIndex, endIndex, totalItems: items.length })
    const result = items.slice(startIndex, endIndex)
    console.log('Returning items:', result.length)
    return result
  }, [items, currentPage, itemsPerPage])
  
  const hasMore = currentPage * itemsPerPage < items.length
  const totalItems = items.length
  const remainingItems = totalItems - (currentPage * itemsPerPage)
  
  const loadMore = useCallback(() => {
    console.log('loadMore called')
    setCurrentPage(prev => {
      console.log('Setting currentPage from', prev, 'to', prev + 1)
      return prev + 1
    })
  }, [])
  
  const reset = useCallback(() => {
    console.log('Reset called')
    setCurrentPage(1)
  }, [])
  
  return {
    items: paginatedItems,
    hasMore,
    loadMore,
    reset,
    currentPage,
    totalItems,
    remainingItems: Math.max(0, remainingItems),
    showingCount: paginatedItems.length
  }
}
