const fs = require("fs")
const axios = require("axios")
const path = require("path")

const transcribeAudio = async (filePath) => {
  try {

    // ✅ check file exists
    if (!fs.existsSync(filePath)) {
      throw new Error("Audio file not found")
    }

    const audioBuffer = fs.readFileSync(filePath)
    const stats = fs.statSync(filePath)

    // ✅ detect file type dynamically
    const ext = path.extname(filePath).toLowerCase()

    let contentType = "audio/mpeg" // default

    if (ext === ".wav") contentType = "audio/wav"
    if (ext === ".mp3") contentType = "audio/mpeg"
    if (ext === ".webm") contentType = "audio/webm"
    if (ext === ".m4a") contentType = "audio/mp4"

    const response = await axios({
      method: "post",
      url: "https://api.deepgram.com/v1/listen?model=nova-2&punctuate=true&smart_format=true",
      data: audioBuffer,

      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": contentType, // ✅ FIXED (dynamic type)
        "Content-Length": stats.size
      },

      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 60000
    })

    console.log("Deepgram response:", response.data)

    // ✅ safe extraction (prevents crash)
    const transcript =
      response?.data?.results?.channels?.[0]?.alternatives?.[0]?.transcript

    // ✅ handle empty transcription properly
    if (!transcript || transcript.trim() === "") {
      throw new Error("No speech detected in audio")
    }

    return transcript

  } catch (error) {

    console.error(
      "Deepgram error:",
      error.response?.data || error.message
    )

    // ✅ send clean error to frontend
    throw new Error(
      error.response?.data?.err_msg ||
      "Speech-to-text conversion failed"
    )
  }
}

module.exports = transcribeAudio