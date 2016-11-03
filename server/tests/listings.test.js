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

  describe('# GET /api/listings/:siteId', () => {
    it('should get site listings', (done) => {
      request(app)
        .get(`/api/listings?siteId=${site.site_id}`)
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
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body._id).to.equal(listing.id);
          done();
        });
    });
  });
});
