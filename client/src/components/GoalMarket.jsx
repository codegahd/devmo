

const GoalMarkets = ({updateSelection,market,time,date,id,home,away,country,league}) => {
   
    const {values } = market
    const goalBounds = ["2.5"];
    const rearrangedValues = goalBounds.map((goalBound) =>
      values.filter((value) => value.value.includes(goalBound))
    );
    const modifiedValues=rearrangedValues.map((subArray)=>{
      return subArray.map((item,index)=>{
        if(index===1){
          return {...item,odd:(subArray[0].odd/(subArray[0].odd-1)).toFixed(2)}
        }else{
          return item
        }
      })
    })
  
    return (
      <>
       
        <div
          className={`flex flex-col gap-4`}
        >
          {modifiedValues.map((rearrangedValue, index) => (
            <div key={index} className="markets flex gap-8">
              {rearrangedValue.map((item,index) => {
                return(
                <div key={index} className="markets flex gap-8 justify-between">
                  <p onClick={()=>{
                     updateSelection({
                      time:time,
                      id:id,
                      home:home,
                      away:away,
                      country:country,
                      league:league,
                      date:date,
                      odd:item.odd,
                      value:item.value
                    })
                  }} className="bg-orange-600 cursor-pointer w-fit py-1 px-2 rounded-lg text-white">
                    {item.odd}
                  </p>
                </div>
              )})}
            </div>
          ))}
        </div>
      </>
    );
  };
  export default GoalMarkets
  