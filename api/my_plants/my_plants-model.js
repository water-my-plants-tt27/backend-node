const db = require('../../database/dbConfig');
const { getPlantById } = require('../plants/plants-model');

function getMyPlants(id) {
  return db('my_plants as mp')
    .where('user_id', id)
    .select(
      'my_plant_id',
      'user_id',
      'plant_name',
      'species_name',
      'water_schedule',
      'light_level',
      'plant_image',
      'week_day_name'
    )
    .join('plants as p', 'p.plant_id', 'mp.plant_id')
    .join('week_days as wd', 'wd.week_day_id', 'mp.week_day_id')
    .join('water_schedule as ws', 'ws.water_id', 'p.water_id')
    .join('light as l', 'l.light_id', 'p.light_id');
}

function getMyPlantById(my_plant_id) {
  return db('my_plants').where('my_plant_id', my_plant_id).first();
}

async function addMyPlant(newMyPlant) {
  const [my_plant_id] = await db('my_plants').insert(newMyPlant, 'my_plant_id');
  return getMyPlantById(my_plant_id);
}

async function updateMyPlant(id, updatedPlant) {
  await db('my_plants').where('my_plant_id', id).update(updatedPlant);
  return getMyPlantById(id);
}

async function removeMyPlant(id) {
  const removedMyPlant = await getPlantById(id);
  await db('my_plants').where('my_plant_id', id).del();
  return removedMyPlant;
}

module.exports = {
  getMyPlants,
  getMyPlantById,
  addMyPlant,
  updateMyPlant,
  removeMyPlant,
};
