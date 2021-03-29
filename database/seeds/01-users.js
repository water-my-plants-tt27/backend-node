exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Katie',
          email: 'katieolson84@gmail.com',
          phone_number: '5207774444',
          password: '123',
        },
      ]);
    });
};
