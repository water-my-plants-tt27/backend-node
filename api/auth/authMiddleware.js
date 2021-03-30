const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.headers.authorization)
  if (!token) {
    res.status(401).json('token required');
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json('token is not verified ');
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }
}


const User = require('../users/user-model');

const checkEmailUnique = async (req, res, next) => {
  try {
    const rows = await User.getBy({ email: req.body.email });
    if (!rows.length) {
      next();
    } else {
      res.status(401).json('email taken');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const checkPayload = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    console.log(req.body)
    res.status(401).json('Please, email and password required');
  } else {
    next();
  }
};


module.exports = {
  checkEmailUnique,
  checkPayload,
  restricted
};