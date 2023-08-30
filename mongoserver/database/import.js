const fs = require('fs');
const csv = require('csv-parser');
const { Product, Feature, Style, Photo, Stock } = require('./mongo'); // Import models from mongo.js

fs.createReadStream('./sampledata/productSAMPLE.csv')
  .pipe(csv())
  .on('data', (row) => {
    const product = new Product({
      product_name: row.name,
      product_slogan: row.slogan,
      product_description: row.description,
      product_category: row.category,
      product_default_price: row.default_price
    });
    product.save()
      .then(() => {
        console.log('Product saved:', product);
      })
      .catch((error) => {
        console.error('Error saving product:', error);
      });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
