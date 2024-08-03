import { useState } from 'react'
import {useBetsContext} from './useBetsContext'
import { useAuthContext } from './useAuthContext'

export const usePlaceBets = () => {
  const {user,dispatch:authDispatch} = useAuthContext()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [success,setSuccess]= useState(null)
  const { dispatch } = useBetsContext()

  const placeBet = async (data) => {
    const type = data.type
    const game_id = data.game_id
    const selection= data.selection
    const odd = data.odd
    const stake = data.stake
    setIsLoading(true) 
    setError(null)
    console.log(data)
    const response = await fetch('/api/bets', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type,game_id,selection,odd,stake})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setSuccess(false)
      setError(json.error)
    }
    if (response.ok) {
      console.log(json)
      const updateUser = {...user,balance:json.userBalance}
      authDispatch({type:'UPDATE_USER',payload:updateUser})
      localStorage.setItem("user",JSON.stringify(updateUser))
      dispatch({type: 'createBet', payload: json.userBet})
      console.log(user)
      // update loading state
      setIsLoading(false)
      setSuccess(true)
    }
  }

  return { placeBet, isLoading, error,success }
}