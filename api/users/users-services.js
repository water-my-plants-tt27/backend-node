module.exports = {
  isValid,
};

function isValid(user) {
  return Boolean(
    user.name &&
      user.email &&
      user.phone_number &&
      user.password &&
      typeof user.password === 'string'
  );
}
