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

  describe('# GET /api/listings/:siteId', () => {
    it('should get site listings', (done) => {
      request(app)
        .get(`/api/listings/${site.site_id}`)
        .expect(httpStatus.OK)
        .then(res => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});
