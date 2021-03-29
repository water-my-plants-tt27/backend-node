const db = require('../../database/dbConfig');

function getPlants() {
  return db('plants');
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
