import { useState,useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePlaceBets } from "../hooks/usePlaceBets";
import Error from "./Error";
import Loading from "./Loading";
import Success from "./Success";



// eslint-disable-next-line react/prop-types
const NewForm = ({selection,setSelection,betType}) => {
  const [odd,setOdd]= useState(selection.odd)
  const { user } = useAuthContext();
  const stake = useRef()
  const {placeBet,isLoading,error,success} = usePlaceBets()

  const placebet = async(event) => {
    event.preventDefault();
    const selectedValues = selection.value 
    const changedValues=()=>{
      switch (selectedValues) {
        case "Home":return "1"
        case "Away":return "2"
        case "Draw":return "x"
        case "Home/Draw":return "1x"
        case "Home/Away":return "12"
        case "Draw/Away":return "x2"
        default:return selectedValues
      }
    }
    const data = {
      type:betType,
      game_id :selection.id,
      selection:changedValues(),
      odd:odd,
      stake:stake.current?.value,
    }
    await placeBet(data)
  }; 
  if(isLoading)return<Loading/>
  if(error)return<Error setSelection={setSelection}/>
  if(success)return<Success setSelection={setSelection}/>
  
  return (
  <div>
    <form className="shadow-md pb-6 rounded-sm p-2 fixed top-[10vh] left-[40vw] z-2 bg-gray-200" action="" method="post" onSubmit={placebet} >
      <div className="w-[450px] h-auto ml-2">
        <div className="bg-gray-50 p-4 h-40">
          <h1 className="mb-4">{selection.country} - {selection.league}</h1>

          <div className="flex gap-12">
            <h2 className="mt-1">{selection.time}</h2>
            <h2 className="text-lg font-semibold">{selection.home} - {selection.away}</h2>
          </div>

          <div className="flex justify-between">
            <h2 className="mt-10">{'2024-04-17'}</h2>
            <p onClick={()=>setSelection(null)} 
            className={` cursor-default font-bold mt-6 text-[13px] px-6 pt-4 bg-white h-10 leading-3 shadow-md rounded-sm ${betType==="odd bet"?"text-orange-600":"text-green-600"}`}>
              CHANGE EVENT
            </p>
          </div>

        </div>

        <div className="bg-gray-50 w-[450px] mt-4 justify-between p-4">
          <div className="title border-b-4 w-full">
            <h2 className="bg-black p-2 w-fit text-gray-100">{selection.value}</h2>
          </div>
          <div className="flex gap-60">
            <div className="p-2 mt-1">
              <h1 className="font-bold text-lg leading-3">
               
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-60">
          <div className="home-win flex flex-col  font-semibold text-sm">
        
              {betType === "odd bet" && <div className="flex flex-col  font-semibold text-sm">
                <label className="mb-1" htmlFor="">
                  CHANGE ODDS
                </label>
                  <input
                    className="border-2 border-gray-300 p-1 rounded-md mb-6 outline-none"
                    type="text"
                    placeholder={``}
                    value={odd}
                    onChange={(e)=>{setOdd(e.target.value)}}
                  />
              </div>}
            
            <label className="mb-1" htmlFor="">
              STAKE
            </label>
            <input
              className="border-2 border-gray-300 p-1 rounded-md outline-none"
              name="stake"
              type=""
              placeholder="Stake"
              ref={stake}
            />
            <h2 className="my-2">Balance:{user?.profile.Balance}{" "} </h2>
            <button
              className={`${betType ==="odd bet"?"bg-orange-600":"bg-green-600"} py-2 px-6 rounded-full shadow-md text-white`}
              type="submit"
              disabled={user?false:true}
            >
              PLACE BET
            </button>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
};

export default NewForm;
