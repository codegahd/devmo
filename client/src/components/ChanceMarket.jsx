
const ChanceMarkets = ({updateSelection,market,time,date,id,home,away,country,league}) => 
  {
    return (
      <>
        <div className={`flex gap-4 `}>
          {market.values.map((value) => (
            <div key={value.value} className="markets flex flex-col gap-8">
              
              <p onClick={()=>{
                updateSelection({
                  time:time,
                  id:id,
                  home:home,
                  away:away,
                  country:country,
                  league:league,
                  date:date,
                  odd:value.odd,
                  value:value.value
                })
              }} className="bg-orange-600 cursor-pointer w-14 text-center py-1 px-2 rounded-lg text-white">
                {value.odd}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };
  

export default ChanceMarkets