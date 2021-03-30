const router = require('express').Router();
const Users = require('./user-model');

router.get('/', (req, res, next) => {
  Users.get()
    .then((users) => res.status(200).json(users))
    .catch(next);
});

// PUT - updated user
router.put('/:id', (req, res, next) => {
  const updatedUser = req.body;
  const { id } = req.params;
  Users.updateUser(id, updatedUser)
    .then((updatedUser) =>
      res.status(200).json({ message: `user updated`, updatedUser })
    )
    .catch(next);
});

// Error handling middleware
//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'There was an error in the server (users router)',
  });
});

module.exports = router;
