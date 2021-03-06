const config = require('../config');
const userModel = '../schema/user';
const TodolistDB = config.Todolist;

const User = TodolistDB.import(userModel);

const getUserById = function* (id) {
  const userInfo = yield User.findOne({
    where: { id },
  });
  return userInfo;
};

const getUserByName = function* (name) {
  const userInfo = yield User.findOne({
    where: { user_name: name },
  });
  return userInfo;
};

module.exports = {
  getUserById,
  getUserByName,
};
