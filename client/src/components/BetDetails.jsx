import { useState } from "react"


  const BetDetails = ({bet,fixtures}) => {
    console.log(fixtures)
    const items = fixtures.find((fixture) => {
      if(fixtures){
        return String(fixture.fixture.id) === bet?.game_id;
      }
    });
    console.log(items)
      const [details,setDetails]=useState(false)
      const options = { day: 'numeric', month: 'short' }
      const date =new Date(bet.createdAt).toLocaleDateString(undefined, options)
      const newDate =new Date(bet.createdAt).toLocaleDateString(undefined, {day:'numeric',month:'numeric'})
      const time =new Date(bet.createdAt).toLocaleTimeString(undefined, {hour:'2-digit',minute:'2-digit',hour12:false})
      const changedValues=()=>{
        switch (bet.selection) {
          case "1":return "Home"
          case "2":return "Away"
          case "x":return "Draw"
          case "1x":return "Home/Draw"
          case "12":return "Home/Away"
          case "x2":return "Draw/away"
          default:return bet.selection
        }
      }
      const newValues = changedValues()
      const potWin = (bet.stake*bet.odd).toFixed(2)
      return (
        <div key={bet._id} className=" bg-white w-2/6 ml-2 mb-4 shadow-md rounded-sm container mx-auto">
          <div className="flex gap-4 w-7/8 mx-2 border-b-2 border-gray-300 py-2">
            <h1 className="text-md font-semibold">{bet.type}</h1>
            <p>{bet._id}</p>
            <p className="text-gray-600 font-medium">{date}</p>
          </div>
          {!details && <div>
            <p className="ml-2 font-medium pt-2">{items?.teams.home.name} <span className="text-sm font-normal">vs</span> {items?.teams.away.name}</p>
            <div className="flex ml-2 pb-2">
              <p className="font-medium"> <span className="font-normal text-gray-400">stake: </span>{bet.stake}</p>
              <p className="ml-40 underline text-green-600 cursor-pointer hover:text-green-800" onClick={()=>{setDetails(!details)}}>Details</p>
            </div>
          </div>}
          {details&&
            <div>
              <div className="w-7/8 mx-4 border-b-2 border-gray-300 py-2">
                <div className="flex gap-6">
                  <p>{bet.status}</p>
                  <div>
                    <p className="font-medium">{newValues}{" "}{bet.type == "odd bet"?"@"+bet.odd:null}</p>
                    <p>{items?.teams.home.name} <span>vs</span>{items?.teams.away.name} </p>
                    <p className="text-green-600">{newDate}{" "}{time}</p>
                  </div>
                </div>
                <p className="ml-52 underline text-green-600 cursor-pointer hover:text-green-800" onClick={()=>{setDetails(!details)}}>Hide Details</p>
              </div>
              <div className="flex justify-between mx-4 text-gray-500">
                <p>Stake</p>
                <p>{bet.type === "odd bet" && "Pot. Win"}</p>
              </div>
              <div className="flex justify-between mx-4 font-medium">
                <p>{bet.stake}</p>
                <p>{bet.type === "odd bet" && potWin}</p>
              </div>
            </div>
            }
        </div>
      )
  }
 


export default BetDetails