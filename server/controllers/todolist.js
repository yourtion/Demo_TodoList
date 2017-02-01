const todolist = require('../models/todolist.js');

const getTodolist = function* () {
  const id = this.params.id;
  const result = yield todolist.getTodolistById(id);
  this.body = result;
};

const createTodolist = function* () {
  const data = this.request.body;
  const result = yield todolist.createTodolist(data);
  this.body = { success: result };
};

module.exports = (router) => {
  router.get('/todolist/:id', getTodolist);
  router.post('/todolist', createTodolist);
};
