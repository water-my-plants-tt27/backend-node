const db = require('../../database/dbConfig');

function get() {
  return db('users').select('user_id', 'name', 'phone_number', 'email');
}

function getBy(filter) {
  return db('users')
    .select('user_id', 'email', 'password')
    .where('email', filter);
}

function getById(id) {
  return db('users').where('user_id', id).first();
}

async function add(user) {
  const [id] = await db('users')
    .select('user_id', 'email', 'phone_number', 'password')
    .insert(user, 'user_id');
  return getById(id);
}

async function updateUser(id, updatedUser) {
  await db('users').where('user_id', id).update(updatedUser);
  return getById(id);
}

function remove(id) {
  return db('users').where({ id }).del();
}
module.exports = {
  remove,
  updateUser,
  add,
  getById,
  getBy,
  get,
};
