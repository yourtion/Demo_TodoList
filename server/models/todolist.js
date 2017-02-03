const db = require('../config/db');
const todoModel = '../schema/list';
const TodolistDB = db.Todolist;

const Todolist = TodolistDB.import(todoModel);

// 获取某个用户的全部todolist
const getTodolistById = function* (id) {
  const todolist = yield Todolist.findAll({
    // 查找全部的todolist
    where: { user_id: id },
    // 只需返回这三个字段的结果即可
    attributes: [ 'id', 'content', 'status' ],
  });
  return todolist;
};

// 给某个用户创建一条todolist
const createTodolist = function* (data) {
  yield Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.status,
  });
  return true;
};

const removeTodolist = function* (id, user_id) {
  yield Todolist.destroy({
    where: { id, user_id },
  });
  return true;
};

const updateTodolist = function* (id, user_id, status) {
  yield Todolist.update(
    { status },
    { where: { id, user_id }}
  );
  return true;
};

module.exports = {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist,
};
