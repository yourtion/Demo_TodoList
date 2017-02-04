const path = require('path');
const app = require('koa')();
const koa = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger');
const serve = require('koa-static');
const historyApiFallback = require('koa-history-api-fallback');
const auth = require('./routes/auth');
const api = require('./routes/api');
const jwt = require('koa-jwt');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function* (next){
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  // 显示执行的时间
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function* (next){
  //  如果JWT验证失败，返回验证失败信息
  try {
    yield next;
  } catch (err) {
    if (err.status === 401) {
      this.status = 401;
      this.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access',
      };
    } else {
      throw err;
    }
  }
});

app.on('error', (err, _ctx) => {
  console.log('server error', err);
});

// 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
koa.use('/auth', auth.routes());
// 所有走/api/打头的请求都需要经过jwt中间件的验证。secret密钥必须跟我们当初签发的secret一致
koa.use('/api', jwt({ secret: 'vue-koa-demo' }), api.routes());
// 将路由规则挂载到Koa上。
app.use(koa.routes());

app.use(historyApiFallback());
// 将webpack打包好的项目目录作为Koa静态文件服务的目录
app.use(serve(path.resolve(__dirname, '../dist')));

app.listen(8889, () => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
