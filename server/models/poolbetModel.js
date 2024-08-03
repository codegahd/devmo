import mongoose from "mongoose"

const Schema = mongoose.Schema

const poolbetSchema = new Schema({
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
  stake: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default:"runing"
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

const poolbetModel = mongoose.model('pool', poolbetSchema)
export {poolbetModel}