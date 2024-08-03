import mongoose from "mongoose"

const Schema = mongoose.Schema

const fixtureSchema = new Schema({
  date: {
    type: String,
  },
  data: {
    type: Object,
  }
})
 
const fixtureModel = mongoose.model('fixtures', fixtureSchema)
export {fixtureModel}