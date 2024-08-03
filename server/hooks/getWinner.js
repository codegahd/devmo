
const getWinner = async(data) => {
  const home = data.response[0]?.goals.home
  const away = data.response[0]?.goals.away
  console.log({home:home,away:away})
  let winner = [];
  const goalTotal = home+away
  goalTotal>0?winner.push("ov1"):winner.push("un1")
  goalTotal>1?winner.push("ov1.5"):winner.push("un1.5")
  goalTotal>2?winner.push("ov2.5"):winner.push("un2.5")
  goalTotal>3?winner.push("ov3.5"):winner.push("un3.5")
  goalTotal>4?winner.push("ov4.5"):winner.push("un4.5")
  goalTotal>5?winner.push("ov5.5"):winner.push("un5.5")
  goalTotal>6?winner.push("ov6.5"):winner.push("un6.5")
  goalTotal>7?winner.push("ov7.5"):winner.push("un7.5")
  if(home === away){
    winner.push("x","1x","x2")
  }else if (home > away){
    winner.push("1","1x","12")
  }else if (home < away){
    winner.push("2","x2","12")
  }else{
    throw Error("this game can not be processed")
  }
  if(home+away)
    console.log(winner)
  return winner
}

export default getWinner