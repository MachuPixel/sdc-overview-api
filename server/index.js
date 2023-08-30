require('dotenv').config();

const express = require('express');
const { getProducts } = require('./database/postgresdb.js')

const app = express();

app.get('/products',(req, res) => {
  getProducts((err, data) => {
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      res.send(data);
    }
  });
});


app.listen(process.env.PORT1, () => {
  console.log(`Listening at port ${process.env.PORT1}...`);
});