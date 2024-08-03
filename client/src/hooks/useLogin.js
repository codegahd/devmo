import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useFetchGames } from "./useFetchGames";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const {fetchGames} = useFetchGames()
  
  const login = async (email, password, userName) => {
    setIsLoading(true);
    setError(null);
    console.log(email, password, userName);

    const response = await fetch("api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, userName }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      await fetchGames()
      // to be added ********
      localStorage.setItem("type","pool bet")
      dispatch({ type: "LOGIN", payload: json });
      
      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
