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

const removeTodolist = function* (){
  const id = this.params.id;
  const user_id = this.params.userId;
  const result = yield todolist.removeTodolist(id, user_id);

  this.body = { success: result };
};

const updateTodolist = function* (){
  const id = this.params.id;
  const user_id = this.params.userId;
  let status = this.params.status;
  // 状态反转（更新）
  status === '0' ? status = true : status = false;

  const result = yield todolist.updateTodolist(id, user_id, status);

  this.body = { success: result };
};

module.exports = (router) => {
  router.get('/todolist/:id', getTodolist);
  router.post('/todolist', createTodolist);
  router.delete('/todolist/:userId/:id', removeTodolist);
  router.put('/todolist/:userId/:id/:status', updateTodolist);
};
