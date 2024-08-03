import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user:action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'UPDATE_USER':
      return {user:action.payload}
    default:
      return state
  }
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {user: null})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/bets/user', {
          method: 'GET',
          credentials: 'include'
         });
         if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'LOGIN', payload: data })
        } else {
          dispatch({ type: 'LOGIN', payload: null })
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [])
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}