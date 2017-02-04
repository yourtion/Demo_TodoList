const superagent = require('supertest');
const app = require('../app');
const agent = superagent(app.listen());
const utils = require('./utils');

describe('Auth', () => {
  before(function (done) {
    utils.dropDB().then(done).catch(done);
  });

  describe('Login', () => {

    it('user info success', (done) => {
      agent
        .get('/auth/user/1')
        .expect(200, done);
    });
  });
});
