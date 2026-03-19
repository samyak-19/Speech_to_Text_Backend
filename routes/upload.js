const express = require("express")
const multer = require("multer")

const authMiddleware = require("../middleware/auth") 

const Transcription = require("../models/Transcription")

const transcribeAudio = require("../services/deepgramService")


const router = express.Router()

// storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

// multer config with validation added
const upload = multer({
  storage,

  // ✅ file type validation
  fileFilter: (req, file, cb) => {

    const allowedTypes = [
      "audio/mpeg",
      "audio/wav",
      "audio/mp3",
      "audio/webm"
    ]

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only audio files are allowed"), false) 
    }
  },

  
  limits: { fileSize: 10 * 1024 * 1024 }
})


// PROTECT ROUTE  (authMiddleware)

router.post("/upload-audio", authMiddleware, (req, res) => {

  // ❗ wrap multer inside route to catch errors
  upload.single("audio")(req, res, async (err) => {

    // ✅ handle multer errors
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    }

    try {

      // ✅ check if file exists
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        })
      }

      const filePath = req.file.path

      const transcriptionText = await transcribeAudio(filePath)

      // ✅ check empty transcription
      if (!transcriptionText) {
        throw new Error("No speech detected in audio")
      }



      const newRecord = new Transcription({
        audioFile: filePath,
        transcription: transcriptionText,
        user: req.user
      })

      await newRecord.save()

      res.json({
        success: true,
        transcription: transcriptionText
      })

    } catch (error) {

      console.error(error)

      res.status(500).json({
        success: false,
        message: error.message || "Transcription failed"
      })

    }

  })

})
// get transcription history
router.get("/transcriptions", authMiddleware, async (req, res) => {

  try {

    const data = await Transcription
      .find({ user: req.user })
      .sort({ createdAt: -1 })
      .limit(5)

    res.json(data)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

})

module.exports = router