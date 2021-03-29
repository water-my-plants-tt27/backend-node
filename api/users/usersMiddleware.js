// const jwt = require('jsonwebtoken')
// const { JWT_SECRET } = require("../secrets"); 
const User = require('./user-model');

// Email is free
const checkEmailFree = async (req,res,next) => {
    try{
      const rows = await User.getBy({email: req.body.email})
       if(!rows.length) {
         next()
       }else{
         res.status(422).json({message: 'An account with that email already exists'})
       }
    }catch(e){
      res.status(500).json(`Server error: ${e}`)
    }
  
  }

// Does Email Exists
const checkEmailExists = (req, res, next) => {
    const { email } = req.body;
    const checkUser = User.getBy({ email }).first();
    if (checkUser.email === email) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      next();
    }
  }

//   Check if passoword Exists
  const checkPasswordExists = (req, res, next) => {
    const {password} = req.body;
    const checkPassword = User.getBy({ password }).first();
    if(checkPassword.password === password) {
      res.status(401).json({message: 'Email and password are required!'})
    }else{
      next()
    }
  }

  module.exports = {
      checkEmailFree,
      checkEmailExists,
      checkPasswordExists,
  }