import useGamesContext from "../../hooks/useGamesContext"
import Games from "../../components/Games"


const Efltrophy = () => {
    const {state}=useGamesContext()
    const gameData = state.games
    console.log(gameData)
    const eflgames = gameData.filter(items => items.league.name === "EFL Trophy").sort()
    return (
        <>
            <div className="title flex justify-between font-semibold text-black py-2 border-b-2">
                <h1 className="text-gray-400">England - EFL Trophy</h1>
                <div>
                    <span><img src="" alt="expand more"  /></span>
                </div>
            </div>
            <div>
                { eflgames.map((games) => (
                    <Games
                        id = {games.fixture.id}
                        key={games.fixture.id}
                        hometeam={ games.teams.home.name }
                        awayteam={ games.teams.away.name }
                        homescore={games.score.fulltime.home}
                        awayscore={games.score.fulltime.away}
                    />
                ))}
            </div>
        
        </>
    )
}
export default Efltrophy