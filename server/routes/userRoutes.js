import express from "express"
import { loginUser,signupUser,logoutUser } from "../controller/userController.js"

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)
// log out
router.post('/logout', logoutUser)

export{router}