// TO DO - get validatePlantId function working
const validatePlantId = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: `plant id not found` });
  } else {
    next();
  }
};

const validatePayload = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: 'missing plant data' });
  } else if (
    !req.body.plant_name ||
    !req.body.species_name ||
    !req.body.water_id ||
    !req.body.light_id ||
    !req.body.plant_image
  ) {
    res.status(400).json({ message: 'missing required field' });
  } else {
    next();
  }
};

module.exports = { validatePlantId, validatePayload };
