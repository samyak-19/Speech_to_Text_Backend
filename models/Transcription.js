const mongoose = require("mongoose")

const transcriptionSchema = new mongoose.Schema(
  {
    audioFile: {
      type: String,
      required: true
    },
    transcription: {
      type: String,
      default: ""
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  "Transcription",
  transcriptionSchema
)