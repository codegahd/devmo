// import EnglandLayout from "../CountryComponents/England/EnglandLayout"
import { useState, useReducer} from "react"
import useGamesContext from "../hooks/useGamesContext"
import Oddbet from "./Oddbet"
import Poolbet from "./Poolbet"
import NewForm from "./NewForm"



const leagueReducer = (state, action) => {

    switch (action.type) {
      case 'addLeague':
        return {
          leagues: [action.payload, ...state.leagues]
        }
      case 'deleteLeague':
        return {
          leagues: state.leagues.filter((L) => L.league !== action.payload.league && L.country !== action.payload.country)
        }
      default:
        return state
    }
  }

const SectionBody = ()=> {
    const [selection,setSelection] = useState(null)
    const [open,setOpen]=useState({})
    const {state:allgames}=useGamesContext()
    const [state, dispatch] = useReducer(leagueReducer, {
        leagues: []
    })

    if(allgames.games === null || undefined){
        return <div>error loading page</div>
    }
    const games = allgames?.games.fixtures
    const gameFixturesResponse = games?.map((game)=>game.data.response)
    const allFixtures = [].concat(...gameFixturesResponse)
    const gameOdds = allgames.games.fixtureOdd
    const gameOddsresponse = gameOdds.map((game)=>game.data.response)
    const allGameOdds = [].concat(...gameOddsresponse)
    const allOddFixture = Array.from(new Set(allGameOdds.map((game) => game.fixture.id)))
    const availableFixture = allFixtures.filter((game)=>allOddFixture.includes(game.fixture.id))
    const type = allgames.type
    const countries=["World","England","France","Germany","Italy","spain"]
    const availableCountry = Array.from(new Set(availableFixture.map((game) => game.league.country)))
    const otherCountries = availableCountry.filter((item)=>!countries.includes(item)).sort()
    const topCountries = availableCountry.filter((item)=>countries.includes(item)).reverse()
    const handleClick = (country) => {
        setOpen((prevState) => ({
        ...open,[country]:!prevState[country]
        }))
    }
    const selectLeague = (country,league)=>{
        dispatch({type:"addLeague",payload:{country,league}})
    }


    return (
        <>
             <div className="container flex bg-gray- mx-auto mt-10 mb-10 h-dvh overflow-hidden">

                <div className=" shadow-slate-800 rounded-sm w-1/4 shadow-md bg-gray-200 h-fit pb-4">
                    <div className="">
                        {
                            topCountries.map((country)=>{
                                const availableGame = availableFixture.filter((item)=>item.league.country === country)
                                const Leagues = Array.from(new Set(availableGame.map((game) => game.league.name)))
                                return(
                                    <div className="p-2" key={country}>
                                        <div onClick={()=>handleClick(country)} className="flex justify-between mx-2 py-1 font-semibold border-b-2 border-gray-900 cursor-pointer">
                                            <h1 className="text-lg">{country}</h1>
                                            <p className="w-4 h-4 mt-2 text-xs text-center rounded-full">{Leagues.length}</p>
                                        </div>
                                        {open[country]&&
                                            Leagues.map((league)=> {
                                                return <div onClick={()=>selectLeague(country,league)} className="mx-2 py-2 cursor-pointer" key={league}>{league}</div>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="">
                        {
                            otherCountries.map((country)=>{
                                const availableGame = availableFixture.filter((item)=>item.league.country === country)
                                const Leagues = Array.from(new Set(availableGame.map((game) => game.league.name)))
                                return(
                                    <div className="p-2" key={country}>
                                        <div onClick={()=>handleClick(country)} className="flex justify-between mx-2 font-semibold border-b-2 border-gray-900 cursor-pointer">
                                            <h1 className="text-lg">{country}</h1>
                                            <p className="w-4 h-4 mt-2 text-xs text-center rounded-full">{Leagues.length}</p>
                                        </div>
                                        {open[country]&&
                                            Leagues.map((league)=> {
                                                return <div onClick={()=>selectLeague(country,league)} className="mx-2 py-2 cursor-pointer" key={league}>{league}</div>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-full">
                    {type === "odd bet" && <Oddbet games={availableFixture}dispatch={dispatch} leagues={state.leagues} odds={allGameOdds} setSelection={setSelection}/>}
                    {type === "pool bet" &&<Poolbet games={availableFixture}dispatch={dispatch} leagues={state.leagues} odds={allGameOdds} setSelection={setSelection}/>}
                </div>
            </div>
           {selection !== null && <div className="absolute w-full top-0 h-[1500px] fill-transparent-12 opacity-40 bg bg-gray-600"></div>}
            {selection !== null && <NewForm selection={selection} betType={type} setSelection={setSelection}/>}
        </>
    )
}
export default SectionBody