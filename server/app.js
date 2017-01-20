const app = require('koa')();
const koa = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger');
const auth = require('./routes/auth');

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

app.on('error', (err, _ctx) => {
  console.log('server error', err);
});

// 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
koa.use('/auth', auth.routes());

// 将路由规则挂载到Koa上。
app.use(koa.routes());

app.listen(8889, () => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
