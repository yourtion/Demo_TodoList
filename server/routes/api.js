const todolist = require('../controllers/todolist');
const router = require('koa-router')();

todolist(router);

module.exports = router;
