const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

  // 🔥 get token from header
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "No token" })
  }

  try {

    // 🔥 verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // store user id in request
    req.user = decoded.id

    next()

  } catch (error) {

    res.status(401).json({ message: "Invalid token" })

  }

}