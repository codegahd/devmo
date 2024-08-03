import { createContext, useReducer } from 'react'
import { useEffect }from 'react'
export const BetsContext = createContext()

const betsReducer = (state, action) => {
  switch (action.type) {
    case 'setBet': 
      return {
        bets: action.payload
      }
    case 'createBet':
      return {
        bets: [action.payload, ...state.bets]
      }
    case 'deleteBet':
      return {
        bets: state.bets.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const BetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(betsReducer, {
    bets: []
  })

  useEffect(() => {
    // const user = localStorage.getItem('user')
    const fetchBets = async () => {
      const response = await fetch('/api/bets/bets', {
        method: 'GET',
        credentials: 'include'
      })
      const json = await response.json()
      const joinedBet = [...json.poolbets,...json.oddbets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      if (response.ok) {
        dispatch({type: 'setBet', payload: joinedBet})
      }
    }
      fetchBets()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  return (
    <BetsContext.Provider value={{...state, dispatch}}>
      { children }
    </BetsContext.Provider>
  )
}