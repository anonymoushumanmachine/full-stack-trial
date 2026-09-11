const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
});
// model
const User = mongoose.model("User", userSchema);
module.exports = User;
