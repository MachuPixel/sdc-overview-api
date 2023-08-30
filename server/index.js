require('dotenv').config();


const express = require('express');

const app = express();


app.listen(process.env.PORT1, () => {
  console.log(`Listening at port ${process.env.PORT1}...`);
});