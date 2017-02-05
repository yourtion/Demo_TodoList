const superagent = require('supertest');
const assert = require('chai').assert;
const app = require('../app');
const agent = superagent(app.listen());
const utils = require('./utils');

let token = 'Bearer ';

describe('TodoList', () => {

  before(function (done) {
    utils.dropDB().then(done).catch(done);
  });

  it('login success', (done) => {
    agent
      .post('/auth/user', { json: true })
      .send({ name: 'yourtion', password: '123456' })
      .end((err, res) => {
        assert.isTrue(res.body.success);
        token += res.body.token;
        done(err);
      });
  });

  it('get todo list fail', (done) => {
    agent
      .get('/api/todolist/1', { json: true })
      .end((err, res) => {
        if (err) return done(err);
        assert.isFalse(res.body.success);
        assert.isNull(res.body.token);
        done();
      });
  });

  it('get todo list empty', (done) => {
    agent
      .get('/api/todolist/1', { json: true })
      .set('Authorization', token)
      .expect(200, [], done);
  });

  it('add todo success', (done) => {
    agent
      .post('/api/todolist', { json: true })
      .set('Authorization', token)
      .send({ id: 1, content: 'test1', status: 0 })
      .expect(200,
      { success: true },
      done);
  });

  it('get todo list one', (done) => {
    agent
      .get('/api/todolist/1', { json: true })
      .set('Authorization', token)
      .expect(200,
      [{ id: 1, content: 'test1', status: 0 }],
      done);
  });

  it('add todo success again', (done) => {
    agent
      .post('/api/todolist', { json: true })
      .set('Authorization', token)
      .send({ id: 1, content: 'test2', status: 1 })
      .expect(200,
      { success: true },
      done);
  });

  it('update todo success', (done) => {
    agent
      .put('/api/todolist/1/1/1', { json: true })
      .set('Authorization', token)
      .expect(200,
      { success: true },
      done);
  });

  it('get todo list after update', (done) => {
    agent
      .get('/api/todolist/1', { json: true })
      .set('Authorization', token)
      .expect(200,
      [
        { id: 1, content: 'test1', status: 0 },
        { id: 2, content: 'test2', status: 1 },
      ],
      done);
  });

  it('delete todo success', (done) => {
    agent
      .delete('/api/todolist/1/1', { json: true })
      .set('Authorization', token)
      .expect(200,
      { success: true },
      done);
  });

  it('get todo list after delete', (done) => {
    agent
      .get('/api/todolist/1', { json: true })
      .set('Authorization', token)
      .expect(200,
      [
        { id: 2, content: 'test2', status: 1 },
      ],
      done);
  });
});
