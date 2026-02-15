import { createContext, useContext } from 'react'
import { useLists } from '../hooks/useLists'

const ListContext = createContext(null)

export function useListContext() {
  const context = useContext(ListContext)
  if (!context) throw new Error('useListContext must be used within ListProvider')
  return context
}

export function ListProvider({ children }) {
  const listsData = useLists()

  return (
    <ListContext.Provider value={listsData}>
      {children}
    </ListContext.Provider>
  )
}
