import Efltrophy from "./Efltrophy"
import useGamesContext from "../../hooks/useGamesContext"

const EnglandLayout = () => {
    const {state} = useGamesContext()
    const gameData= state.games
    const availableLeague = Array.from(new Set(gameData.map((game) => game.league.name)))
    
    return (
        <>
            {
                availableLeague.includes("EFL Trophy")?<Efltrophy/>:null
            }
        </>
        )
 }

export default EnglandLayout