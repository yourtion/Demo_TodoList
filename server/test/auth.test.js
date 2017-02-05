const superagent = require('supertest');
const assert = require('chai').assert;
const app = require('../app');
const agent = superagent(app.listen());
const utils = require('./utils');

describe('Auth', () => {

  before(function (done) {
    utils.dropDB().then(done).catch(done);
  });

  it('login success', (done) => {
    agent
      .post('/auth/user', { json: true })
      .send({ name: 'yourtion', password: '123456' })
      .end((err, res) => {
        if (err) return done(err);
        assert.isTrue(res.body.success);
        assert.ok(res.body.token);
        done();
      });
  });

  it('login fail - user not exits', (done) => {
    agent
      .post('/auth/user', { json: true })
      .send({ name: 'yourtion1', password: '123456' })
      .end((err, res) => {
        if (err) return done(err);
        assert.isFalse(res.body.success);
        assert.equal(res.body.info, '用户不存在！');
        done();
      });
  });

  it('login fail - password error', (done) => {
    agent
      .post('/auth/user', { json: true })
      .send({ name: 'yourtion', password: '12345' })
      .end((err, res) => {
        if (err) return done(err);
        assert.isFalse(res.body.success);
        assert.equal(res.body.info, '密码错误！');
        done();
      });
  });

  it('user info success', (done) => {
    agent
      .get('/auth/user/1')
      .expect(200, done);
  });

  it('user info fail', (done) => {
    agent
      .get('/auth/user/2')
      .expect(204, done);
  });

});
