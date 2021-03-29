exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('water_schedule')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('water_schedule').insert([
        { water_schedule: 'Once per week' },
        { water_schedule: 'Twice per week' },
        { water_schedule: 'Every 14 days' },
      ]);
    });
};
