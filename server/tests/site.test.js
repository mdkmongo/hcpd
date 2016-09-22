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
});
