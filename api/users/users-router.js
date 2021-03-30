const router = require('express').Router();
const Users = require('./user-model');

router.get('/', (req, res, next) => {
    Users.get()
      .then((users) => res.status(200).json(users))
      .catch(next);
  });
module.exports = router;
