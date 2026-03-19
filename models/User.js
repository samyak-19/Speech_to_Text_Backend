const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,

  // unique email for login
  email: {
    type: String,
    unique: true
  },

  // hashed password
  password: String
})

module.exports = mongoose.model("User", userSchema)