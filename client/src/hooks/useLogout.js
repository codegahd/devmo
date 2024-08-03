import { useAuthContext } from './useAuthContext'
// import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  // const { dispatch: dispatchWorkouts } = useWorkoutsContext()

  const logout = async() => {
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST',
        credentials: 'include' // Include credentials (cookies) in the request
      });
      if (response.ok) {
        console.log("well")
        // Optionally, clear any local state or context related to the user
        dispatch({ type: 'LOGOUT',payload: null })
        window.location.reload(); // Refresh the page
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  return { logout }
}