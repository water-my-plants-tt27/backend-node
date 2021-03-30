const router = require('express').Router();
const { validatePlantId, validatePayload } = require('./plantsMiddleware');
const Plants = require('./plants-model');

// GET - returns all plants
router.get('/', (req, res, next) => {
  Plants.getPlants()
    .then((plants) => res.status(200).json(plants))
    .catch(next);
});

// GET - returns specified plant
router.get('/:id', validatePlantId, (req, res, next) => {
  const { id } = req.params;
  Plants.getPlantById(id)
    .then((plant) => res.status(200).json(plant))
    .catch(next);
});

// POST - adds a new plant
router.post('/', validatePayload, (req, res, next) => {
  const newPlant = req.body;
  Plants.addPlant(newPlant)
    .then((newPlant) =>
      res.status(201).json({ message: `plant added`, newPlant })
    )
    .catch(next);
});

// PUT - updated specified plant
router.put('/:id', validatePlantId, (req, res, next) => {
  const updatedPlant = req.body;
  const { id } = req.params;
  Plants.updatePlant(id, updatedPlant)
    .then((updatedPlant) =>
      res.status(200).json({ message: `plant updated`, updatedPlant })
    )
    .catch(next);
});

// DELETE - deletes specified plant
router.delete('/:id', validatePlantId, (req, res, next) => {
  const { id } = req.params;
  Plants.removePlant(id)
    .then((deletedPlant) =>
      res.status(410).json({ message: `plant deleted`, deletedPlant })
    )
    .catch(next);
});

// Error handling middleware
router.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'There was an error in the server (plants router)',
  });
});

module.exports = router;
