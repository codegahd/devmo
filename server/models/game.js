import mongoose from "mongoose"

const Schema = mongoose.Schema

const gameSchema = new Schema({
  game_id: {
    type: String,
  }})
 
const gameModel = mongoose.model('games', gameSchema)
export {gameModel}