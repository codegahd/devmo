
import { useBetsContext } from "../hooks/useBetsContext"
import BetDetails from '../components/BetDetails'
import useGamesContext from "../hooks/useGamesContext"


const Bets = () =>{
  const {state} = useGamesContext()
  const games = state?.games?.fixtures
  const gameFixturesResponse = games.map((game)=>game.data.response)
  const allFixtures = [].concat(...gameFixturesResponse)
  const {bets} = useBetsContext()
  return (
    <div className="container mx-auto mt-6 bg-green-600 py-4">
        {bets.map((bet) => {
          return(
          <BetDetails key={bet._id} bet={bet} fixtures={allFixtures}/>
        )
        })}
      </div>
  )
}


export default Bets