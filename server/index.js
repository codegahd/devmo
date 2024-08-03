import express from "express"
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
import { router } from "./routes/userRoutes.js"
import { betRouter } from "./routes/betRoutes.js"
import { getFixtureOdd } from "./hooks/getFixtureOdds.js"
import { getFixtures } from "./hooks/getFixtures.js"

const app = express()
// middle ware
try {
  app.use(cookieParser());
  console.log('Cookie-parser setup successful');
} catch (error) {
  console.error('Error setting up cookie-parser:', error);
}
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })
// adding additional functions
const setIntervalFunc = async()=>{
    // await getFixtureOdd()
    // await getFixtures()
}

// adding user routes to express
app.use("/api/user",router)
app.use("/api/bets",betRouter)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    setIntervalFunc();
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

  