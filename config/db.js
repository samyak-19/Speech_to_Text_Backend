const mongoose = require("mongoose")

const connectDB = async () => {
  try {

    const uri =
      process.env.DB_TYPE === "atlas"
        ? process.env.MONGO_ATLAS
        : process.env.MONGO_LOCAL
        console.log("DB URI:", uri)

    await mongoose.connect(uri)

    console.log("MongoDB connected")

  } catch (error) {
    console.error("Database connection error:", error)
    process.exit(1)
  }
}

module.exports = connectDB