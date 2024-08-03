import mongoose from "mongoose"

const Schema = mongoose.Schema

const fixtureOddSchema = new Schema({
  date: {
    type: String,
  },
  data: {
    type: Object,
  }
})

const fixtureOddsModel = mongoose.model('fixtureodds', fixtureOddSchema)
export {fixtureOddsModel}