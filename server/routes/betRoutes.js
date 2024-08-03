import express from "express"
import requireAuth from "../middleware/requireAuth.js"
import { getUser } from "../controller/userController.js"
import {
  getbets,
  getbetWinner,
  placeBet,
  deleteBet,
  getfixtures,
  enableAdmin
}  from '../controller/betController.js'


const betRouter = express.Router()

// require auth for routes
betRouter.use(requireAuth)


// GET all workouts
betRouter.get('/bets', getbets)

// get all available fixtures and odd
betRouter.get('/fixtures', getfixtures)

//GET a single workout
betRouter.get('/resolve', getbetWinner)

betRouter.post('/enableAdmin',enableAdmin)

betRouter.get('/user',getUser)

// POST a new workout
betRouter.post('/', placeBet)

// DELETE a workout
betRouter.delete('/:id', deleteBet) 
export {betRouter}