import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useResolveBet = () => {
  const {user} = useAuthContext()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [success,setSuccess]= useState(null)

  const resolveBet = async () => {
    setIsLoading(true) 
    setError(null)
    const response = await fetch('/api/bets/resolve', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
    const json = await response.json()
    console.log(json)

    if (!response.ok) {
      setIsLoading(false)
      setSuccess(false)
      setError(json.error)
    }
    if (response.ok) {

      // update loading state
      setIsLoading(false)
      setSuccess(true)
    }
  }

  return { resolveBet, isLoading, error,success }
}