const app = require('koa')();
const koa = require('koa-router')();
const json = require('koa-json');
const logger = require('koa-logger');

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

app.listen(8889, () => {
  console.log('Koa is listening in 8889');
});

module.exports = app;
