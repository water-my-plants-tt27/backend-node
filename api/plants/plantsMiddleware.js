const Plants = require('./plants-model');

const validatePlantId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [plant] = await Plants.getPlantById(id);
    if (!plant) {
      res.status(404).json({ message: 'plant not found' });
    } else {
      req.plant = plant;
      next();
    }
  } catch (err) {
    next(err);
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
