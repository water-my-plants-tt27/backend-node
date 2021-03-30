const router = require('express').Router();
const myPlants = require('./my_plants-model');

router.get('/:id', (req, res, next) => {
  myPlants
    .getMyPlants(req.params.id)
    .then((plants) => res.status(200).json(plants))
    .catch(next);
});

router.get('/:id', (req, res, next) => {});

router.post('/', (req, res, next) => {
  myPlants
    .addMyPlant(req.body)
    .then((newPlant) => res.status(201).json(newPlant))
    .catch(next);
});

router.put('/:id', (req, res, next) => {});

router.delete('/:id', (req, res, next) => {});

// Error handling middleware
router.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'There was an error in the server (my_plants router)',
  });
});

module.exports = router;
