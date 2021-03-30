exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('my_plants')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('my_plants').insert([
        { user_id: 1, plant_id: 1, week_day_id: 1 },
        { user_id: 1, plant_id: 2, week_day_id: 3 },
        { user_id: 1, plant_id: 3, week_day_id: 4 },
        { user_id: 2, plant_id: 4, week_day_id: 2 },
        { user_id: 2, plant_id: 5, week_day_id: 5 },
        { user_id: 2, plant_id: 6, week_day_id: 6 },
        { user_id: 3, plant_id: 7, week_day_id: 3 },
        { user_id: 3, plant_id: 8, week_day_id: 1 },
        { user_id: 3, plant_id: 9, week_day_id: 7 },
      ]);
    });
};
