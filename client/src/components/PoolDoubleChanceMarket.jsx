

const PoolDoubleChanceMarket = ({updateSelection,firstMarket,market,time,date,id,home,away,country,league}) => {
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
          className={`flex gap-4`}>
          {finalMarket[0].values.map((value) => {
            const changedValues=()=>{
              switch (value.value) {
                case "Home/Draw":return "1x"
                case "Home/Away":return "12"
                case "Draw/Away":return "x2"
                default:return value.value
              }
            }
            return(
            <div key={value.value} className="markets flex flex-col gap-8">
              <p
                 onClick={()=>{
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
                className="bg-green-600 cursor-default py-1 px-4 rounded-lg text-white"
              >
                {changedValues()}
              </p>
            </div>
          )})}
        </div>
      </>
    );
  };
  

export default PoolDoubleChanceMarket