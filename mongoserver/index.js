require('dotenv').config();


const express = require('express');

const app = express();
app.use(express.json());

app.listen(process.env.PORT2, () => {
  console.log(`Listening at port ${process.env.PORT2}...`);
});