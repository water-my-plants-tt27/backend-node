const db = require('../../database/dbConfig');

function getPlants() {
  return db('plants as p')
    .select(
      'plant_id',
      'plant_name',
      'species_name',
      'water_id',
      'water_schedule',
      'light_level',
      'plant_image'
    )
    .join('water_schedule as ws', 'ws.water_id', 'p.water_id')
    .join('light as l', 'l.light_id', 'p.light_id');
}

function getPlantById(id) {
  return db('plants').where('plant_id', id);
}

async function addPlant(newPlant) {
  const [id] = await db('plants').insert(newPlant, 'plant_id').first();
  return getPlantById(id);
}

async function updatePlant(id, updatedPlant) {
  await db('plants').where('plant_id', id).update(updatedPlant);
  return getPlantById(id);
}

async function removePlant(id) {
  const removedPlant = await getPlantById(id);
  await db('plants').where('plant_id', id).del();
  return removedPlant;
}

module.exports = {
  getPlants,
  getPlantById,
  addPlant,
  updatePlant,
  removePlant,
};
