DROP DATABASE IF EXISTS overview;
CREATE DATABASE overview;


CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  product_name TEXT NOT NULL,
  product_slogan TEXT NOT NULL,
  product_description TEXT NOT NULL,
  product_category TEXT NOT NULL,
  product_default_price INTEGER NOT NULL
);

CREATE TABLE features (
  feature_id SERIAL PRIMARY KEY,
  product_id SERIAL,
  feature_name TEXT,
  feature_value TEXT,
  CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id SERIAL,
  style_name TEXT NOT NULL,
  style_price_sale TEXT,
  style_price INTEGER NOT NULL,
  style_default BOOLEAN NOT NULL,
  CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  style_id SERIAL,
  photo_url TEXT,
  photo_thumbnail_url TEXT,
  CONSTRAINT fk_style FOREIGN KEY(style_id) REFERENCES styles(style_id)
);

CREATE TABLE stock (
  stock_id SERIAL PRIMARY KEY,
  style_id SERIAL,
  stock_name TEXT NOT NULL,
  stock_quantity INTEGER NOT NULL,
  CONSTRAINT fk_style FOREIGN KEY(style_id) REFERENCES styles(style_id)
);