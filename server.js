require("dotenv").config()

const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth")

const connectDB = require("./config/db")

const uploadRoute = require("./routes/upload")

const app = express()

// CONNECT DATABASE
// console.log("Connecting to database...")

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api",uploadRoute)
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Speech to Text backend running")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})