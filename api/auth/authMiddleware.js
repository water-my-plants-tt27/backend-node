const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ message: 'Token does not exist' })
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'token is not verified ' })
      } else {
        req.decodedJwt = decoded
        next()
      }
    })
  }
};
