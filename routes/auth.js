const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const authMiddleware = require("../middleware/auth")

const router = express.Router()

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {

  const { name, email, password } = req.body

  try {

    // 🔥 VALIDATION 1: check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    // 🔥 VALIDATION 2: email format
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      })
    }

    // 🔥 VALIDATION 3: password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      })
    }

    // 🔥 VALIDATION 4: check if user exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    // 🔥 hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10)



    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save()

    res.json({ message: "User created" })

  } catch (error) {
    res.status(500).json({ message: "Signup failed" })
  }

})


// ================= LOGIN =================
router.post("/login", async (req, res) => {

  const { email, password } = req.body

  try {

    

     if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    } 

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    // 🔥 compare password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" })
    }

    // 🔥 generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({ token })

  } catch (error) {
    res.status(500).json({ message: "Login failed" })
  }

})


  router.get("/me", authMiddleware, (req, res) => {

     // 🔥 VALIDATION: ensure user exists
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    })
  }

  res.json({
    success: true,
    userId: req.user
  })
})

module.exports = router