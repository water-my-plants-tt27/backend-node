exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('week_days')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('week_days').insert([
        { week_day_name: 'Monday' },
        { week_day_name: 'Tuesday' },
        { week_day_name: 'Wednesday' },
        { week_day_name: 'Thursday' },
        { week_day_name: 'Friday' },
        { week_day_name: 'Saturday' },
        { week_day_name: 'Sunday' },
      ]);
    });
};
