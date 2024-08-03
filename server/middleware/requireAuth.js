import jasonwebtoken from "jsonwebtoken"
import { userModel } from "../models/userModel.js"

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    // verify token and user
    const { _id } = jasonwebtoken.verify(token, process.env.SECRET)
    req.user = await userModel.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    res.status(401).json({error: 'Request is not authorized'})
  }
}

export default requireAuth