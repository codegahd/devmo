import { BetsContext } from '../context/BetsContext'
import { useContext } from 'react'

export const useBetsContext = () => {
  const context = useContext(BetsContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}