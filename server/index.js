require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const { getProducts, getFeatures, getStyles, getRelated } = require('./database/postgresdb.js')
const port = process.env.PORT1 || 3000;
const app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/loaderio-869df574dc066bb6d5921052b2774a51.txt', function (req, res) {
  res.send('loaderio-869df574dc066bb6d5921052b2774a51');
});

// GET /products

app.get('/products',(req, res) => {
  let page = parseInt(req.query.page, 10) || 1;
  let count = parseInt(req.query.count, 10) || 5;

  getProducts(page, count, (err, data) => {
    if (err) {
      res.status(404).send('Error message');
    } else {
      res.send(data);
    }
  });
});

//GET /products/:product_id

app.get('/products/:product_id',(req, res) => {
  // console.log(req.params);
  getFeatures(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send('Error message');
    } else {
      res.send(data);
    }
  });
});


// GET /products/:product_id/styles

app.get('/products/:product_id/styles', (req, res) => {

  getStyles(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send('Error message');
    } else {
      res.send(data);
    }
  });
});


// GET /products/:product_id/related

app.get('/products/:product_id/related', (req, res) => {

  getRelated(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send('Error message');
    } else {
      res.send(data);
    }
  });
});


app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});

module.exports = app;