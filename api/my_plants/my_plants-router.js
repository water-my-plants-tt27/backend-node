const router = require('express').Router();
const myPlants = require('./my_plants-model');

// GET - returns all my_plants from a user
router.get('/:id', (req, res, next) => {
  myPlants
    .getMyPlants(req.params.id)
    .then((plants) => res.status(200).json(plants))
    .catch(next);
});

// POST - adds a plant
router.post('/', (req, res, next) => {
  const newMyPlant = req.body;
  myPlants
    .addMyPlant(newMyPlant)
    .then((newPlant) => res.status(201).json(newPlant))
    .catch(next);
});

// PUT - updated day of the week for a plant
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const updatedPlant = req.body;
  myPlants
    .updateMyPlant(id, updatedPlant)
    .then((updatedPlant) =>
      res.status(201).json({ message: 'updated plant', updatedPlant })
    )
    .catch(next);
});

// DELETE - removes a plant
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  myPlants
    .removeMyPlant(id)
    .then((removedPlant) =>
      res.status(200).json({ message: 'plant removed', removedPlant })
    )
    .catch(next);
});

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
