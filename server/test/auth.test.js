const superagent = require('supertest');
const app = require('../app');
const agent = superagent(app.listen());

describe('Auth', () => {
  describe('Login', () => {
    it('should return 200', (done) => {
      agent
        .get('/')
        .expect(200, done);
    });
  });
});
