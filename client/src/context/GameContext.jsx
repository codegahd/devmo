/* eslint-disable no-unused-vars */
import { createContext, useEffect, useReducer, useState } from "react";
import { useFetchGames } from "../hooks/useFetchGames";
export const GameContext = createContext([]);

const initialState = {
  games:[],
  type:"",
  markets: [],
  date:""
};

function reducer(state, action) {
  switch (action.type) {
    case "loadGames":
      return {
        ...state,
        games: action.payload,
      };
    case "loadMarkets":
      return {
        ...state,
        markets: action.payload,
      };
    case "selectOddOption":
      return {
        ...state,
        selection: action.payload,
      };
    case "selectPoolOption":
      return {
        ...state,
        poolSelection: action.payload,
      };
    case "updateType":
      return {
        ...state,
        type: action.payload,
      };
    case "updateDate":
      return {
        ...state,
        date: action.payload,
      };
    case "createOptions":
      return {
        ...state,
        allOptions: action.payload,
      };
      default :
      return state;
  }
}

// eslint-disable-next-line react/prop-types
export const GameContextProvider = ({children}) => {
  const today = new Date().toISOString().split('T')[0]
  const [state, dispatch] = useReducer(reducer,initialState,()=>{
    const fixtures = localStorage.getItem(today)
    return fixtures?{...initialState,games:JSON.parse(fixtures)}:initialState
  });
  const [type,setType]=useState("")
  const {fetchGames} = useFetchGames()

  //getting type from local stoarage
  useEffect(()=>{
    const type=localStorage.getItem("type")
    dispatch({type:"updateType",payload:type})
  },[type])

  //fetching and storing games data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    const getGames = async()=>{
      await fetchGames()
      const fixtures = localStorage.getItem(today)
      console.log(JSON.parse(fixtures))
      dispatch({type:"loadGames",payload:JSON.parse(fixtures)})
    }

    const fixtures = localStorage.getItem(today)
    if (fixtures){
      dispatch({type:"loadGames",payload:JSON.parse(fixtures)})
    }else{
      getGames()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[today])

  return (
    <GameContext.Provider value={{setType,state,dispatch}}>
      {children}
    </GameContext.Provider>
  );
};
