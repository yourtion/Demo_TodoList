const user = require('../models/user');
const jwt = require('koa-jwt');

const getUserInfo = function* () {
  const id = this.params.id;
  const result = yield user.getUserById(id);
  this.body = result;
};

const postUserAuth = function* () {
  const data = this.request.body;
  const userInfo = yield user.getUserByName(data.name);

  if(userInfo != null) {
    if(userInfo.password !== data.password) {
      this.body = {
        success: false,
        info: '密码错误！',
      };
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id,
      };
      const secret = 'vue-koa-demo';
      const token = jwt.sign(userToken, secret);
      this.body = {
        success: true,
        token,
      };
    }
  } else {
    this.body = {
      success: false,
      info: '用户不存在！',
    };
  }
};

module.exports = {
  auth: (router) => {
    router.get('/user/:id', getUserInfo);
    router.post('/user', postUserAuth);
  },
};
