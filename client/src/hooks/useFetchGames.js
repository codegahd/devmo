import { useState } from "react";
import useGamesContext from "./useGamesContext";


export const useFetchGames =() => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const today = new Date().toISOString().split('T')[0]
  const {dispatch} = useGamesContext()

  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);
    const response = await fetch('/api/bets/fixtures', {
      method: 'GET',
      credentials: 'include'
    })
    const json = await response.json();
    console.log(response)
  
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem(today, JSON.stringify(json))
      dispatch({type:"loadGames",payload:json})
      // update loading state
      setIsLoading(false);
    }
  };

  return { fetchGames, isLoading, error };
};
