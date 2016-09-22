import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai from 'chai';
import { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Site APIs', () => {
  let site = {
    name: 'NEA'
  };

  describe('# POST /api/sites', () => {
    it('should create a new site', (done) => {
      request(app)
        .post('/api/sites')
        .send(site)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(site.name);
          site = res.body;
          done();
        });
    });
  });
  describe('# GET /api/sites/:siteId', () => {
    it('should get site details', (done) => {
      request(app)
        .get(`/api/sites/${site._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal(site.name);
          done();
        });
    });

    it('should report error with message - Not found, when site does not exists', (done) => {
      request(app)
        .get('/api/sites/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then(res => {
          expect(res.body.message).to.equal('Not Found');
          done();
        });
    });
  });

  describe('# PUT /api/sites/:siteId', () => {
    it('should update site details', (done) => {
      site.name = 'Eczema';
      request(app)
        .put(`/api/sites/${site._id}`)
        .send(site)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('Eczema');
          done();
        });
    });
  });

  describe('# GET /api/sites/', () => {
    it('should get all sites', (done) => {
      request(app)
        .get('/api/sites')
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('# DELETE /api/sites/', () => {
    it('should delete site', (done) => {
      request(app)
        .delete(`/api/sites/${site._id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body.name).to.equal('Eczema');
          done();
        });
    });
  });
});
