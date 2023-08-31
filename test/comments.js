const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server/index.js');

describe('Product API Tests', () => {

  it('should retrieves the list of products when GET /products', async() => {
    const res = await request(app).get('/products');
    expect(res.statusCode).to.be.eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body).not.to.be.empty;

  });

  it('should return product features when GET /products/:product_id', async() => {
    const productId = 11;
    const res = await request(app).get(`/products/${productId}`);
    const product = res.body;

    expect(res.statusCode).to.be.eq(200);
    expect(product).to.be.an('object');
    expect(product).to.have.property('id').equal(productId);
    expect(product).to.have.property('name');
    expect(product).to.have.property('slogan');
    expect(product).to.have.property('description');
    expect(product).to.have.property('category');
    expect(product).to.have.property('default_price');
    expect(product.features).to.be.an('array');
  });

  it('should returns the all styles available for the given product when GET /products/:product_id/styles', async() => {
    const productId = 1;
    const res = await request(app).get(`/products/${productId}/styles`);
    const stylesResponse = res.body;
    console.log(stylesResponse);

    // expect(res.statusCode).to.be.eq(200);
    // expect(stylesResponse).to.have.property('product_id').equal(productId);
    // expect(stylesResponse).to.have.property('results').to.be.an('array');

    // const style = stylesResponse.results[0];

    // expect(style).to.have.property('style_id');
    // expect(style).to.have.property('name');
    // expect(style).to.have.property('original_price');
    // expect(style).to.have.property('sale_price');
    // expect(style).to.have.property('default?');
    // expect(style).to.have.property('photos').to.be.an('array');
    // expect(style).to.have.property('skus').to.be.an('object');


  }, 100000);


});