const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  address: String,
  password: String,
  dob: String,
  avatar: 
  {
  	type: String,
  	default: "https://res.cloudinary.com/huyendxnkgd/image/upload/v1593013282/kattie/avatar/2020-08-18T14:11:08.490Z"
  },
  cart: Array
});

var User = mongoose.model("User", userSchema, "users");

module.exports = User;
