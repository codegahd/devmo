import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;
// creating user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default:"regular"
  },
  Balance: {
    type: Number,
    default: 5000,
  },
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
// static signup method
userSchema.statics.signup = async function (email, password, userName) {
  // email and password validation
  if (!email || !password || !userName) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("please insert a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password is not strong");
  }
  const userExist = await this.findOne({ email });
  const usernameExist = await this.findOne({ userName });
  // adding an extra layer of check for user exist
  if (usernameExist) {
    throw Error("username already exist");
  }
  if (userExist) {
    throw Error("user exist please sign in");
  }
  // creating hashcode for password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash, userName });
  return user;
};
// static login method
userSchema.statics.login = async function (email, password, userName) {
  // check if email and password are passed in
  if (!email || !password || !userName) {
    throw Error("All field must be filled");
  }
  // find user
  const user = await this.findOne({ email });
  const usernameExist = await this.findOne({ userName });
  // check if user exists
  if (!user) {
    throw Error("incorrect email");
  }
  if (!usernameExist) {
    throw Error("incorrect username");
  }
  // validate user password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password");
  }
  return user;
};
const userModel = mongoose.model("User", userSchema);
export { userModel };
