

const PoolChanceMarket = ({updateSelection,market,time,date,id,home,away,country,league}) => {
    return (
      <>
        <div
          className={`flex gap-4 cursor-default`}>
          {market.values.map((value,index) => {
            const changedValues=()=>{
              switch (value.value) {
                case "Home":return "1"
                case "Away":return "2"
                case "Draw":return "x"
              }
            }
            return(
            <div key={index} className="markets flex flex-col gap-8">
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
              }}
               className="bg-green-600 py-1 px-6 rounded-lg text-white">
                {changedValues()}
              </p>
            </div>
          )})}
        </div>
      </>
    );
  };
  

export default PoolChanceMarket