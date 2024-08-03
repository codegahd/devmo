import jasonwebtoken from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

const createToken = (_id) => {
  return jasonwebtoken.sign({ _id }, process.env.SECRET, { expiresIn: "12h" });
};
// login a user
const loginUser = async (req, res) => {
  const { email, password, userName } = req.body;
  console.log(userName);
  try {
    const user = await userModel.login(email, password, userName);
    const profile = {
      userName:user.userName,
      Balance:user.Balance,
      userType: user.userType
    }
    // create jwt token for a user
    const token = createToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure secure in production
      maxAge: 12 * 60 * 60 * 1000, // 12 hours
    });
    res.status(200).json({profile});
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message });
  }
};


// signup a user
const signupUser = async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    const user = await userModel.signup(email, password, userName);
    const profile = {
      userName:user.userName,
      Balance:user.Balance,
      userType: user.userType
    }
    // create jwt token for a user
    const token = createToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 12 * 60 * 60 * 1000,
    });
    res.status(200).json({profile});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token'); // Name of your authentication cookie
  res.status(200).json({ message: 'Logged out successfully'});
};

// get authenticated user details
const getUser = async(req,res)=>{
  try {
    const user = await userModel.findById({_id:req.user._id},{email:1,userName:2,userType:3,Balance:4});
    const profile = {
      userName:user.userName,
      Balance:user.Balance,
      userType: user.userType
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({profile});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
export { signupUser,logoutUser, loginUser,getUser};