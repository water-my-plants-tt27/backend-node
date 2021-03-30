const router = require('express').Router();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const Users = require("../users/user-model");

router.post("/register", (req, res) => {
    const credentials = req.body;
  
    if (isValid(credentials)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
  
      // hash the password
      const hash = bcryptjs.hashSync(credentials.password, rounds);
  
      credentials.password = hash;
  
      // save the user to the database
      Users.add(credentials)
        .then(user => {
          res.status(201).json({ data: user });
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({
        message: "please provide name and password and the password shoud be alphanumeric",
      });
    }
  });
  
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    if (isValid(req.body)) {
      Users.getBy({ email: email })
        .then(([user]) => {
          // compare the password the hash stored in the database
          if (user && bcryptjs.compareSync(password, user.password)) {
            // issue token
            const token = buildToken(user)
            res.status(200).json({ message: "Welcome to our API", token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({
        message: "please provide name and password and the password shoud be alphanumeric",
      });
    }
  });
  
  function buildToken(user) {
    const payload = {
      // claims
      id: user.id,
      name: user.name,
    }
    const config = {
      expiresIn: '1d',
    }
    return jwt.sign(
      payload, jwtSecret, config
    )
  }
  

module.exports = router;
