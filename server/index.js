require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const redis = require('redis');

const { getProducts, getFeatures, getStyles, getRelated } = require('./database/postgresdb.js')
const port = process.env.PORT1 || 3000;
const app = express();
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

// Middleware for Redis caching
const cache = (req, res, next) => {
  const key = req.url; // use the request url as the cache key

  client.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(compression());

app.get('/loaderio-869df574dc066bb6d5921052b2774a51.txt', function (req, res) {
  res.send('loaderio-869df574dc066bb6d5921052b2774a51');
});

// GET /products

app.get('/products', cache, (req, res) => {
  let page = parseInt(req.query.page, 10) || 1;
  let count = parseInt(req.query.count, 10) || 5;

  getProducts(page, count, (err, data) => {
    if (err) {
      res.status(404).send('Error message');
    } else {
      client.set(req.url, JSON.stringify(data), 'EX', 3600);  // cache the response for 1 hour

      res.send(data);
    }
  });
});

//GET /products/:product_id

app.get('/products/:product_id', cache, (req, res) => {
  // console.log(req.params);
  getFeatures(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send('Error message');
    } else {
      client.set(req.url, JSON.stringify(data), 'EX', 3600);

      res.send(data);
    }
  });
});


// GET /products/:product_id/styles

app.get('/products/:product_id/styles', cache, (req, res) => {

  getStyles(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send('Error message');
    } else {
      client.set(req.url, JSON.stringify(data), 'EX', 3600);

      res.send(data);
    }
  });
});


// GET /products/:product_id/related

app.get('/products/:product_id/related', cache, (req, res) => {

  getRelated(req.params.product_id, (err, data) => {
    if (err) {
      res.status(404).send('Error message');
    } else {
      client.set(req.url, JSON.stringify(data), 'EX', 3600);

      res.send(data);
    }
  });
});


app.listen(port, () => {
  console.log(`Listening at port ${port}...`);
});

module.exports = app;