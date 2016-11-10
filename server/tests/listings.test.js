import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Listing APIs', () => {
  const site = {
    site_id: '57f5390a5fdec70078e5923c'
  };

  const listing = {
    siteId: site.site_id,
    firstName: 'Test',
    lastName: 'Test',
    addressOne: '7500 Mission road',
    city: 'Prairie Village',
    state: 'Kansas'
  };

  const user = {
    username: 'Test User',
    site_name: 'Test Site',
    password: 'lakings',
    is_admin: false,
    mobile_number: '666-666-6666'
  };

  describe('# POST /api/users', () => {
    it('should create a new user for listing auth testing', (done) => {
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
          user.token = res.body.token;
          done();
        });
    });
  });
  describe('# GET /api/listings/:siteId', () => {
    it('should get site listings', (done) => {
      request(app)
        .get(`/api/listings?siteId=${site.site_id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  describe('# POST /api/listings', () => {
    it('should add a listing', (done) => {
      request(app)
        .post('/api/listings')
        .set('Authorization', `Bearer ${user.token}`)
        .send(listing)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.first_name).to.equal(listing.firstName);
          listing.id = res.body._id;
          done();
        });
    });
  });
  describe('# GET /api/listings/:listingId', () => {
    it('should get a single listing', (done) => {
      request(app)
        .get(`/api/listings/${listing.id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.first_name).to.equal(listing.firstName);
          done();
        });
    });
  });
  describe('# PUT /api/listings/:listingId', () => {
    it('should update a single listing', (done) => {
      listing.firstName = 'UpdateTest';
      request(app)
        .put(`/api/listings/${listing.id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .send(listing)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.first_name).to.equal(listing.firstName);
          done();
        });
    });
  });
  describe('# DELETE /api/listings/:listingId', () => {
    it('should delete a single listing', (done) => {
      request(app)
        .delete(`/api/listings/${listing.id}`)
        .set('Authorization', `Bearer ${user.token}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body._id).to.equal(listing.id);
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
