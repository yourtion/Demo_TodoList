const schema = require('../schema').schema;
const config = require('../config');
const TodolistDB = config.Todolist;
const coroutine = require('lei-coroutine');

const creatAdmin = coroutine.wrap(function* () {
  const user = TodolistDB.import(schema.user);
  yield user.create({
    user_name: 'yourtion',
    password: '123456',
  });
});

const dropDB = coroutine.wrap(function* () {
  for(const file in schema) {
    const model = TodolistDB.import(schema[file]);
    yield model.sync({ force: true });
  }
  console.log('  - Clean DB');
  yield creatAdmin();
  console.log('  - Add Admin to DB');
});

module.exports = {
  dropDB,
};
