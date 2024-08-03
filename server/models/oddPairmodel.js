import mongoose from "mongoose"

const Schema = mongoose.Schema

const oddpairSchema = new Schema({
  game_id: {
    type: String,
  },
  user_a: {
    type: String,
  },
  user_b: {
    type: String,
  },
  selection_a: {
    type: String,
  },
  selection_b: {
    type: String,
  },
  bond: {
    type: Number,
  },
  status: {
    type: String,
    default:"not started"
  },
}, { timestamps: true })

const oddpairModel = mongoose.model('pair', oddpairSchema)
export {oddpairModel}