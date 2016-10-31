import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Authentication APIs', () => {
  const user = {
    username: 'admin',
    password: 'test',
    site_name: 'Test Site',
    is_admin: true,
    mobile_number: '666-666-6666'
  };

  describe('# POST /api/users', () => {
    it('should create a new user for authentication testing', (done) => {
      request(app)
        .post('/api/users')
        .send(user)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username);
          user._id = res.body._id;
          done();
        });
    });
  });
  describe('# POST /api/login', () => {
    it('should login a user when correct credentials are supplied', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(user)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username);
          expect(res.body).to.have.any.key('token');
          user.password = 'incorrectPassword';
          done();
        });
    });

    it('should return an Unauthorized error if the password does not match', (done) => {
      request(app)
        .post('/api/auth/login')
        .send(user)
        .expect(httpStatus.UNAUTHORIZED)
        .then(res => {
          expect(res.body.message).to.equal('Unauthorized');
          done();
        });
    });
  });
  describe('# DELETE /api/users/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.username).to.equal(user.username);
          done();
        });
    });
  });
});
