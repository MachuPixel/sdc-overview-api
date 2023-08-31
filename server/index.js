require('dotenv').config();

const express = require('express');
const { getProducts, getFeatures, getStyles } = require('./database/postgresdb.js')

const app = express();

// GET /products

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

//GET /products/:product_id

app.get('/products/:product_id',(req, res) => {
  // console.log(req.params);
  getFeatures(req.params.product_id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404);
    } else {
      res.send(data);
    }
  });

  // adding features
//   {
//     "id": 11,
//     "name": "Air Minis 250",
//     "slogan": "Full court support",
//     "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
//     "category": "Basketball Shoes",
//     "default_price": "0",
//     "features": [
//   	{
//             "feature": "Sole",
//             "value": "Rubber"
//         },
//   	{
//             "feature": "Material",
//             "value": "FullControlSkin"
//         },
//   	// ...
//     ],
// }
});


// GET /products/:product_id/styles

app.get('/products/:product_id/styles', (req, res) => {

  getStyles(req.params.product_id, (err, data) => {
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