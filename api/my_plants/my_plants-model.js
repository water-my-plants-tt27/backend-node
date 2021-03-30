const db = require('../../database/dbConfig');

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

function getMyPlantById(id) {
  return db('my_plants').where('my_plant)id', id).first();
}

async function addMyPlant(plant) {
  const [id] = await db('my_plants').insert(plant);
  return getMyPlantById(id);
}

module.exports = { getMyPlants, getMyPlantById, addMyPlant };
