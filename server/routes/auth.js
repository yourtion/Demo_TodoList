const user = require('../controllers/user');
const router = require('koa-router')();

user.auth(router);

module.exports = router;
