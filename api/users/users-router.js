const router = require('express').Router();
const Users = require('./user-model');

router.get('/', (req,res) => {
    res.status(200).json(Users);
})

module.exports = router;
