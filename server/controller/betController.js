import mongoose from 'mongoose'
import {fixtureModel} from "../models/fixturesModel.js"
import {poolbetModel} from "../models/poolbetModel.js"
import { fetchGameStatus } from '../hooks/checkFinishedGame.js'
import { userModel } from '../models/userModel.js'
import {oddbetModel} from '../models/oddbetModel.js'
import {oddpairModel} from '../models/oddPairmodel.js'
import { gameModel } from '../models/game.js'
import {compliment} from "../hooks/complimentingBets.js"
import getWinner from '../hooks/getWinner.js'
import { fixtureOddsModel } from '../models/fixtureOddsModel.js'


// get all bets by a user
const getbets = async (req, res) => {
 console.log("try")
  const user_id = req.user._id
  const poolbets = await poolbetModel.find({user_id},{type:1,game_id:2,selection:3,stake:4,status:5,_id:6,createdAt:7}).sort({createdAt: -1})
  const oddbets = await oddbetModel.find({user_id},{type:1,game_id:2,selection:3,stake:4,odd:8,status:5,_id:6,createdAt:7}).sort({createdAt: -1})
  res.status(200).json({poolbets,oddbets})
}
//enable admin access
const enableAdmin= async(req,res)=>{
  const {email} = req.body
  try {
    const user_id = req.user._id
    const user = userModel.find({_id:user_id})
    if(user.userType === "admin"){
      await userModel.updateOne({email:email})
    }else{
      throw Error("request not allowed")
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// settle all bets
const getbetWinner = async(req,res) => {
  console.log("win")
  try {
    const allGames = await gameModel.find({})
    allGames.forEach(async (game)=>{
      const id = game.game_id
      const finishedGame = await fetchGameStatus(id)
      if(finishedGame){

        const winners = await getWinner(finishedGame)
        console.log(winners)
        if(winners.length<1){
          return;
        }
        //resolve bets
        winners.forEach(async(option)=>{
          //resolves odd bet 
          const oddpairs = await oddpairModel.find({game_id:id})
          oddpairs.forEach(async(pair)=>{
            if(option === pair.selection_a){
              console.log(pair)
              await userModel.updateOne({ _id: pair.user_a},{ $inc:{ Balance: pair.bond}})
              await oddbetModel.updateMany({$and:[{game_id:id},{selection:pair.selection_a}]},{$set:{status:"won"}})
              await oddbetModel.updateMany({$and:[{game_id:id},{selection:pair.selection_b}]},{$set:{status:"lost"}})
            }else if(option === pair.selection_b){
              console.log(pair)
              await userModel.updateOne({ _id:pair.user_b},{ $inc:{ Balance:pair.bond }})
              await oddbetModel.updateMany({$and:[{game_id:id},{selection:pair.selection_a}]},{$set:{status:"lost"}})
              await oddbetModel.updateMany({$and:[{game_id:id},{selection:pair.selection_b}]},{$set:{status:"won"}})
            }
          })
          //resolves pool bet
          const options1 = ["1","2","x"]
          const options2 = ["1x","12","x2"]
          //resolve match winner && double chance
          if(options1.includes(option)||options2.includes(option)){
            const allOutcome = options1.includes(option)?["1","x","2"]:["1x","12","x2"]
            const matchWinner = winners.filter((x)=>allOutcome.includes(x))
            const remOutcome = allOutcome.filter((x)=> x!==matchWinner[0])
            const loser1 = remOutcome[0]
            const loser2 = remOutcome[1]
            const allWinners = await poolbetModel.find({$and:[{game_id:id},{selection:matchWinner[0]}]})
            const allLoser1 = await poolbetModel.find({$and:[{game_id:id},{selection:loser1}]})
            const allLoser2 = await poolbetModel.find({$and:[{game_id:id},{selection:loser2}]})
            const propertyToBeAdded="stake"
            const allWinnerStake = allWinners.reduce((accumulator,currentValue)=>accumulator + currentValue[propertyToBeAdded],0)
            const allLoser1Stake = allLoser1.reduce((accumulator,currentValue)=>accumulator + currentValue[propertyToBeAdded],0)
            const allLoser2Stake = allLoser2.reduce((accumulator,currentValue)=>accumulator + currentValue[propertyToBeAdded],0)
            const totalStake = allLoser1Stake+allLoser2Stake+allWinnerStake
            console.log(totalStake)
            allWinners.forEach(async(winner)=>{
              const userStake = winner.stake
              const userShare = (userStake / allWinnerStake) * totalStake
              await userModel.updateOne({ _id: winner.user_id }, { $inc:{ Balance: +userShare } })
            })
            await poolbetModel.updateMany({$and:[{game_id:id},{selection:matchWinner[0]}]},{$set:{status:"won"}})
            await poolbetModel.updateMany({$and:[{game_id:id},{$or:[{selection:loser1},{selection:loser2}]}]},{$set:{status:"lost"}})
          }else{
            //resolve goal pool market 
            const optionCompliment = compliment(option)
            const goalWinners = await poolbetModel.find({$and:[{game_id:id},{selection:option}]})
            const goalLosers = await poolbetModel.find({$and:[{game_id:id},{selection:optionCompliment}]})
            const propertyToBeAdded="stake"
            const goalWinnersStake = goalWinners.reduce((accumulator,currentValue)=>accumulator + currentValue[propertyToBeAdded],0)
            const goalLosersStake = goalLosers.reduce((accumulator,currentValue)=>accumulator + currentValue[propertyToBeAdded],0)
            const totalGoalStake = goalWinnersStake + goalLosersStake
            goalWinners.forEach(async(winner)=>{
              const userStake = winner.stake
              const userShare = (userStake / goalWinnersStake) * totalGoalStake
              await userModel.updateOne({ _id: winner.user_id },{ $inc:{ Balance: +userShare } })
            })
            await poolbetModel.updateMany({$and:[{game_id:id},{selection:option}]},{$set:{status:"won"}})
            await poolbetModel.updateMany({$and:[{game_id:id},{selection:optionCompliment}]},{$set:{status:"lost"}})
          }
        })
        //resolve oddbets without pairs  
        const unpairedGames = await oddbetModel.find({$and:[{game_id:id},{available_offer:{$gt:0}},{intake_balance:{$gt:0}}]})
        unpairedGames.forEach(async(bet)=>{
          await userModel.updateOne({ _id: bet.user_id },{ $inc:{ Balance: +bet.available_offer } })
        })
        await gameModel.deleteOne({game_id:id})
      }
    })
   
  }catch(error){
    res.status(400).json({error:error.message})
  }
}

// place bets
const placeBet = async (req, res) => { 
  const {type, game_id, selection, odd, stake,} = req.body

  let emptyFields = []

  if(!type) {
    emptyFields.push('type')
  }
  if(!game_id) {
    emptyFields.push('game id')
  }
  if(!selection) {
    emptyFields.push('selection')
  }
  if(!odd && type==="odd bet") {
    emptyFields.push('odd bet')
  }
  if(!stake) {
    emptyFields.push('stake')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }
     
// placing bet
    try {
      const user_id = req.user._id
      const user = await userModel.findById({_id:user_id})
      // confirm user balance
      if(user.Balance < stake){
        throw Error("Balance is low, please Deposit and try again")
      }
      // place pool bet
      if(type === "pool bet"){
        const placedBet = await poolbetModel.create({type, game_id, selection, stake, user_id})
        const betUser = await userModel.findByIdAndUpdate({_id:user_id},{$inc:{Balance:-stake}},{new:true})
        const userBalance = betUser.Balance
        const userBet = {
          type:placedBet.type,
          game_id:placedBet.game_id,
          selection:placedBet.selection,
          stake:placedBet.stake,
          status:placedBet.status,
          bet_id:placedBet._id
        }
        
        res.status(200).json({userBet,userBalance})
      }
      // place odd bet
      if(type==="odd bet"){
        
        const match = (odd/(odd-1)).toFixed(2)
        const user_intake =(stake*odd)
        const betCompliment = compliment(selection)
        const complimentingBet = await oddbetModel.findOne({$and:[{type:"odd bet"},{selection:betCompliment},{game_id:game_id},{odd:{$lte:match}},{available_offer:{$gt:0}},{intake_balance:{$gt:0}}]})
        if(complimentingBet){
          const userQuota = (stake*odd)-stake
          const offerQuota = (complimentingBet.available_offer*complimentingBet.odd) - complimentingBet.stake
          const takerQuota = stake >= offerQuota?complimentingBet.available_offer:userQuota
          const makerQuota = takerQuota === complimentingBet.available_offer?offerQuota:stake
          const bond = takerQuota+Number(makerQuota)
          const taker={
            intake:Number(takerQuota),
            matched_stake:Number(makerQuota),
            available_offer:stake-Number(makerQuota),
            intake_balance:user_intake-bond,
          }
          const maker = {
            intake:complimentingBet.intake + Number(makerQuota),
            matched_stake:complimentingBet.matched_stake + Number(takerQuota),
            available_offer:complimentingBet.available_offer-Number(takerQuota),
            intake_balance:complimentingBet.intake_balance-bond
          }
          const pairs = {
            user_a:complimentingBet.user_id,
            user_b:user_id,
            selection_a:complimentingBet.selection,
            selection_b:selection,
            bond:bond
          }
          await oddbetModel.findByIdAndUpdate({_id:complimentingBet._id},{$set:{intake:maker.intake, matched_stake:maker.matched_stake,available_offer:maker.available_offer,intake_balance:maker.intake_balance}},{new:true})
          await oddpairModel.create({
            game_id:game_id,
            user_a:pairs.user_a,
            user_b:pairs.user_b,
            selection_a:pairs.selection_a,
            selection_b:pairs.selection_b,
            bond:pairs.bond
          })
        
          const betUser = await userModel.findByIdAndUpdate({_id:user_id},{$inc:{Balance:-stake}},{new:true})
          const placedBet = await oddbetModel.create({
            type, 
            game_id, 
            selection, 
            odd, 
            stake, 
            user_id,
            intake:taker.intake,
            matched_stake:taker.matched_stake,
            available_offer:taker.available_offer,
            intake_balance:taker.intake_balance
          })
         
          // checks for more complimenting bet to settle unsettled offers or intake balance
          for(;;){
            const anotherComplimentBet =await oddbetModel.findOne({$and:[{type:"odd bet"},{selection:betCompliment},{game_id:game_id},{odd:{$lte:match}},{available_offer:{$gt:0}},{intake_balance:{$gt:0}}]})
            const betToResolve = await oddbetModel.findOne({_id:placedBet._id})
            if(anotherComplimentBet && betToResolve.available_offer > 0 && betToResolve.intake_balance>0){
              console.log("another complimenting bet")
              const newUserQuota = (betToResolve.available_offer*betToResolve.odd)-betToResolve.available_offer
              const newOfferQuota = (anotherComplimentBet.available_offer * anotherComplimentBet.odd)-anotherComplimentBet.available_offer
                  const newTakerQuota = betToResolve.available_offer >= newOfferQuota?anotherComplimentBet.available_offer:newUserQuota
                  const newMakerQuota = newTakerQuota === anotherComplimentBet.available_offer?newOfferQuota:betToResolve.available_offer
                  const newBond = newTakerQuota+newMakerQuota
                const newTaker={
                  intake:betToResolve.intake + newTakerQuota,
                  matched_stake:betToResolve.matched_stake + newMakerQuota,
                  intake_balance:betToResolve.intake_balance - newBond,
                  available_offer:betToResolve.available_offer - newMakerQuota
                }
                const newMaker = {
                  intake:anotherComplimentBet.intake + newMakerQuota,
                  matched_stake:anotherComplimentBet.matched_stake + newTakerQuota,
                  intake_balance:anotherComplimentBet.intake_balance - newBond,
                  available_offer:anotherComplimentBet.available_offer - newTakerQuota
                }
                await oddbetModel.findByIdAndUpdate({_id:anotherComplimentBet._id},{$set:{intake:newMaker.intake, matched_stake:newMaker.matched_stake,available_offer:newMaker.available_offer,intake_balance:newMaker.intake_balance}},{new:true})
                await oddbetModel.findByIdAndUpdate({_id:betToResolve._id},{$set:{intake:newTaker.intake, matched_stake:newTaker.matched_stake,available_offer:newTaker.available_offer,intake_balance:newTaker.intake_balance}},{new:true})
                const pairs = {
                    user_a:anotherComplimentBet.user_id,
                    user_b:user_id,
                    selection_a:anotherComplimentBet.selection,
                    selection_b:selection,
                    bond:newBond
                  }
                await oddpairModel.create({
                    game_id:game_id,
                    user_a:pairs.user_a,
                    user_b:pairs.user_b,
                    selection_a:pairs.selection_a,
                    selection_b:pairs.selection_b,
                    bond:newBond
                  })
            }else{
              const userBalance = betUser.Balance
              const userBet = {
                type:placedBet.type,
                game_id:placedBet.game_id,
                selection:placedBet.selection,
                stake:placedBet.stake,
                status:placedBet.status,
                bet_id:placedBet._id
              }
              res.status(200).json({userBet,userBalance})
              break;
            }
          }
        }
        else{
          const placedBet = await oddbetModel.create({type, game_id, selection, odd, stake, user_id,available_offer:stake,intake_balance:user_intake})
          const betUser = await userModel.findByIdAndUpdate({_id:user_id},{$inc:{Balance:-stake}},{new:true})
          const userBalance = betUser.Balance
          const userBet = {
            type:placedBet.type,
            game_id:placedBet.game_id,
            selection:placedBet.selection,
            stake:placedBet.stake,
            status:placedBet.status,
            bet_id:placedBet._id
          }

          res.status(200).json({userBet,userBalance})
        }
      }
      const newGame = await gameModel.find({game_id:game_id})
      if(newGame.length < 1){
        await gameModel.create({game_id:game_id})
      }
      
    } catch (error) {
      console.log(error.message)
      res.status(400).json({error: error.message})
    }
  
}

const getfixtures = async(req,res)=>{
  console.log("hello")
  try {
    const fixtures = await fixtureModel.find({})
    const fixtureOdd = await fixtureOddsModel.find({})
    console.log({fixtures,fixtureOdd})
    res.status(200).json({fixtures,fixtureOdd})
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}

// delete a bet
const deleteBet = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such bet placed'})
  }

  const bet = await betModel.findOneAndDelete({_id: id})

  if (!bet) {
    return res.status(400).json({error: 'No such bet placed'})
  }

  res.status(200).json(bet)
}



export{getbets,getbetWinner,placeBet,deleteBet,getfixtures,enableAdmin}