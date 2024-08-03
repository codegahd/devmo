import ChanceMarkets from "./ChanceMarket"
import DoubleChanceMarket from "./DoubleChanceMarket"
import GoalMarkets from "./GoalMarket"


const Oddbet = ({games,odds,leagues,dispatch,setSelection}) => {
    // const allLeagues = Array.from(new Set(games.map((game) =>game.league.name)))
    const handleDelete=(country,league)=>{
        dispatch({type:"deleteLeague",payload:{country,league}})
     }
    return (
        <div>
    {
        leagues.map((league,index)=>{
            const availableGames = games.filter((game)=>game.league.name === league.league && game.league.country===league.country)
            const country = new Set(availableGames.map((game) => game.league.country))
            return(
                <div className="mb-2 text-lg" key={index}>
                    <div className="flex bg-orange-600 text-lg font-semibold px-3 py-4 justify-between mx-2 ">
                        <h1 className="text-white">{country}-{league.league}</h1>
                        <button onClick={()=>handleDelete(country,league.league)} className="text-xl re">x</button>
                    </div>
                    <div>
                        {
                            availableGames.map((game,index)=>{
                                const gameOdds = odds.filter((odd)=>odd.fixture.id == game.fixture.id)
                                const fetchMarkets = gameOdds[0].bookmakers[0].bets.filter(
                                    (_, i) => i === 0 || i === 3 || i === 12
                                  );
                                
                                const time =new Date(game.fixture.timestamp).toLocaleTimeString(undefined, {hour:'2-digit',minute:'2-digit',hour12:false})
                                const newDate =new Date(game.fixture.timestamp).toLocaleDateString('en-GB', {day:'numeric',month:"long",year:"numeric",options:'Intl.DateTimeFormatOptions'})
                                return(
                                    <div key={index}>
                                          {index === 0 && <div className="heading border-y-2 border-gray-900 flex justify-between font-semibold mx-2 bg-gray-200 px-2 pr-[80px] ">
                                            <h1 className="px-4 py-2">{newDate}</h1>
                                            <div className="flex">
                                                <p className="mr-[120px] border-x-2 py-3 px-20 border-gray-900">1X2</p>
                                                <p className="mr-[40px] border-r-2 border-gray-900 py-3 pr-28">DC</p>
                                                <select className="bg-gray-200 pr-2 outline-none">
                                                    <option value="">O/U 2.5</option>
                                                </select>
                                            </div>
                                          </div>}
                                          {index === 0 && <div className="sub-heading flex list-none justify-between font-semibold mx-2 bg bg-gray-200 py-4 px-2 pr-16">
                                            <div className="flex gap-14 ml-4">
                                                <li>ID</li>
                                                <li>Time</li>
                                                <li>Event</li>
                                            </div>
                                            <div className="flex gap-16 ">
                                                <li>1</li>
                                                <li>X</li>
                                                <li>2</li>
                                                <li>1X</li>
                                                <li>12</li>
                                                <li>X2</li>
                                                <div className="flex gap-6">
                                                    <li>Over</li>
                                                    <li>Under</li>
                                                </div>
                            
                                            </div>
                                          </div>}
                                            <div className="flex list-none justify-between font-semibold mx-2 py-2 px-2 pr-16" >
                                                <div className="flex gap-7">
                                                    <li>{game.fixture.id}</li> 
                                                    <li>{time}</li> 
                                                    <li>{game.teams.home.name} - {game.teams.away.name}</li>  
                                                </div>
                                                <div className="flex gap-[34px] mr-[-16px] ">
                                                   {
                                                    [fetchMarkets[0],fetchMarkets[2],fetchMarkets[1]].map((market,index)=>{
                                                        return (
                                                            <div key={index}>
                                                        {market?.name === "Match Winner" && (
                                                            <ChanceMarkets
                                                                updateSelection={setSelection}
                                                                market={market}
                                                                id={game.fixture.id}
                                                                time={time}
                                                                date={newDate}
                                                                country = {league.country}
                                                                league = {league.league}
                                                                home = {game.teams.home.name}
                                                                away = {game.teams.away.name}
                                                            />
                                                        )}
                                                        {market?.name === "Double Chance" && (
                                                            <DoubleChanceMarket
                                                                firstMarket={fetchMarkets[0]}
                                                                updateSelection={setSelection}
                                                                market={market}
                                                                id={game.fixture.id}
                                                                time={time}
                                                                date={newDate}
                                                                country = {league.country}
                                                                league = {league.league}
                                                                home = {game.teams.home.name}
                                                                away = {game.teams.away.name}
                                                            />
                                                        )}
                                                        {market?.name === "Goals Over/Under" && (
                                                            <GoalMarkets
                                                                updateSelection={setSelection}
                                                                market={market}
                                                                id={game.fixture.id}
                                                                time={time}
                                                                date={newDate}
                                                                country = {league.country}
                                                                league = {league.league}
                                                                home = {game.teams.home.name}
                                                                away = {game.teams.away.name}
                                                                
                                                            />
                                                        )}
                                                        </div>
                                                        )
                                                    })
                                                   }
                                                </div>
                                            </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            )
        })
    }
    <div>
        
    </div>
    </div>
  )
}

export default Oddbet