const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const router = require("express").Router();

const { jwtSecret } = require('../../config/secrets');

const Users = require("../users/user-model");
const { isValid } = require("../users/users-services.js");
const { checkPayload } = require('./authMiddleware');
const { checkEmailUnique } = require('./authMiddleware');



router.post("/register", checkPayload, checkEmailUnique, (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {


    const rounds = process.env.BCRYPT_ROUNDS || 11;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user, message: "registered " });
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password",
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (isValid(req.body)) {
    Users.getBy({ email: email })
    //why is it in this array?
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user)
          res.status(200).json({             
          message: `Hello, ${user.name}`,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          token, });
        } else {
          res.status(401).json({ message: "try again" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide email and password ",
    });
  }
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;