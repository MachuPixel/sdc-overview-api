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
    expect(product.default_price).to.be.eq(49);
  });

  it('should return all styles available for the given product when GET /products/:product_id/styles', function(done) { // Use regular function instead of arrow function
    this.timeout(50000);
    const productId = 12;
    request(app)
      .get(`/products/${productId}/styles`)
      .then((res) => {
        const stylesResponse = res.body;

        expect(stylesResponse).to.have.property('product_id').equal(productId.toString());
        expect(stylesResponse).to.have.property('results').to.be.an('array');

        const style = stylesResponse.results[0];

        expect(style).to.have.property('style_id');
        expect(style).to.have.property('name');
        expect(style).to.have.property('original_price');
        expect(style).to.have.property('sale_price');
        expect(style).to.have.property('default?');
        expect(style).to.have.property('photos').to.be.an('array');
        expect(style).to.have.property('skus').to.be.an('object');
        expect(style.name).to.be.equal('Purple');

        done(); // Indicate that the test is done
      })
      .catch(err => {
        done(err); // Pass the error to done, so it will fail the test if there's an error
      });
    });

  it('shoud return related product specified', async() => {
    const productId = 1;
    const res = await request(app).get(`/products/${productId}/related`);
    const related = res.body;
    // console.log(related);
    expect(res.statusCode).to.be.eq(200);
    expect(related).to.be.an('array');
    expect(related.length).to.be.equal(4);

  });






});