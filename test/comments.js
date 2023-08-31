const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server/index.js');

describe('Product API Tests', (done) => {
  it('should retrieves the list of products using GET /products', () => {
    request(app).get('/products').then((res) => {
      expect(res.statusCode).to.be.eq(200);
      expect(res.body.data).not.to.be.empty;
      expect(res.body).to.be.an('array');
      done();
    })
  });





});