


const DoubleChanceMarket = ({firstMarket,market,updateSelection,time,date,id,home,away,country,league}) => {
    
    const newMarket ={
      ...market,
      values:market.values.slice().reverse()
    }
    const marketArray=[firstMarket,newMarket]
    const modifiedValues=marketArray.map((item,index)=>{
          if(index===1){
            return{
              ...item,
              values:item.values.map((obj,index)=>{
                return{
                  ...obj,
                  odd:(marketArray[0].values[index].odd/(marketArray[0].values[index].odd-1)).toFixed(2)
                }
              })
            }
          }else{
            return item
          }
        
      })
    const filteredMarket = modifiedValues.filter((value)=>value.name==="Double Chance")
    const finalMarket=filteredMarket.map((obj)=>{
      return{
        ...obj,
        values:obj.values.slice().reverse()
      }
    })
   
    return (
      <>
        <div
          className={`flex gap-4 mr-4`}>
          {finalMarket[0].values.map((value) => (
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
              }} className="bg-orange-600 cursor-pointer py-1 px-2 w-14 rounded-lg text-center text-white">
                {value.odd}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };
  

export default DoubleChanceMarket