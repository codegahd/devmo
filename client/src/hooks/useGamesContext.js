import { GameContext } from "../context/GameContext";
import { useContext } from "react";

const useGamesContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw Error("useGameContext must be used inside a GameContextProvider");
  }
  return context;
};

export default useGamesContext;
