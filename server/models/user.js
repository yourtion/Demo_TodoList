const db = require('../config/db');
const userModel = '../schema/user';
const TodolistDB = db.Todolist;

const User = TodolistDB.import(userModel);

const getUserById = function* (id) {
  const userInfo = yield User.findOne({
    where: { id },
  });
  return userInfo;
};

module.exports = {
  getUserById,
};
