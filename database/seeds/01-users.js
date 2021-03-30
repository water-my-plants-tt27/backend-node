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
          password: '1234',
        },
        {
          name: 'Juan',
          email: 'j@gmail.com',
          phone_number: '8888888888',
          password: '123',
        },
        {
          name: 'Mohammed',
          email: 'm@gmail.com',
          phone_number: '7777777777',
          password: '12345',
        },
      ]);
    });
};
