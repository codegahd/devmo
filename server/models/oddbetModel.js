import mongoose from "mongoose"

const Schema = mongoose.Schema

const oddbetSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  game_id: {
    type: String,
    required: true
  },
  selection: {
    type: String,
    required: true
  },
  odd: {
    type: Number,
  },
  stake: {
    type: Number,
    required: true
  },
  intake: {
    type: Number,
    default:0
  },
  matched_stake: {
    type: Number,
    default:0
  },
  available_offer: {
    type: Number,
    default:0
  },
  intake_balance: {
    type: Number,
    default:0
  },
  status: {
    type: String,
    default:"not started"
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

const oddbetModel = mongoose.model('odd', oddbetSchema)
export {oddbetModel}