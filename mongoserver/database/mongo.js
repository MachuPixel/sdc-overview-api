const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: String,
  product_slogan: String,
  product_description: String,
  product_category: String,
  product_default_price: Number
});

const Product = mongoose.model('Product', productSchema);



const featureSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  feature_name: String,
  feature_value: String
});

const Feature = mongoose.model('Feature', featureSchema);



const styleSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  style_name: { type: String, required: true },
  style_price_sale: String,
  style_price: { type: Number, required: true },
  style_default: { type: Boolean, required: true }
});

const Style = mongoose.model('Style', styleSchema);



const photoSchema = new mongoose.Schema({
  style_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Style' },
  photo_url: String,
  photo_thumbnail_url: String
});

const Photo = mongoose.model('Photo', photoSchema);


const stockSchema = new mongoose.Schema({
  style_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Style' },
  stock_name: { type: String, required: true },
  stock_quantity: { type: Number, required: true }
});

const Stock = mongoose.model('Stock', stockSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/overview', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Database connected successfully");
});

module.exports = {
  Product,
  Feature,
  Style,
  Photo,
  Stock
};
