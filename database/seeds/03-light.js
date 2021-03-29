exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('light')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('light').insert([
        { light_level: 'low indirect light' },
        { light_level: 'indirect light' },
        { light_level: 'medium indirect light' },
        { light_level: 'bright filtered light' },
        { light_level: 'direct sunlight' },
      ]);
    });
};
