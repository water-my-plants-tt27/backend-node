const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const { jwtSecret } = require('../../config/secrets');

const Users = require('../users/user-model');
const { isValid } = require('../users/users-services.js');
const { checkPayload } = require('./authMiddleware');
const { checkEmailUnique } = require('./authMiddleware');
const {
  checkEmailExists,
  checkPasswordExists,
} = require('../users/usersMiddleware');

router.post('/register', checkPayload, checkEmailUnique, (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 11;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user, message: 'registered ' });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: 'please provide username and password',
    });
  }
});

router.post(
  '/login',
  checkEmailExists,
  checkPasswordExists,
  async (req, res, next) => {
    const { email, password } = req.body;

    Users.getBy(email)
      .first()
      .then((user) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user);
          res.status(200).json({ message: 'Welcome', user, token });
        } else if (!email || password) {
          res.status(401).json({ message: 'email and password required' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      })
      .catch(next);
  }
);


function makeToken(user) {
  const payload = {
    subject: user.user_id,
    email: user.email,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
