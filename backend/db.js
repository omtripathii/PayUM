const mongoose = require("mongoose");
const { number } = require("zod");

mongoose.connect("mongodb://localhost:27017/Paytm");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // minlength: [8, "Password must be at least 8 characters long"],
    // maxlength: [100, "Password cannot exceed 100 characters"],
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const UserDb = mongoose.model("User", userSchema);
const AcountsDb = mongoose.model("Account", accountSchema);
module.exports = {
  UserDb,
  AcountsDb,
};
