exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('my_plants')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('my_plants').insert([
        { user_id: 1, plant_id: 1, week_day_id: 1 },
      ]);
    });
};
