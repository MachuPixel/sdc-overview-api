\copy products FROM './largedata/product.csv' DELIMITER ',' CSV HEADER;

\copy features FROM './largedata/features.csv' DELIMITER ',' CSV HEADER;

\copy styles FROM './largedata/styles.csv' DELIMITER ',' CSV HEADER;

\copy photos FROM './largedata/photos.csv' DELIMITER ',' CSV HEADER;

\copy stock FROM './largedata/skus.csv' DELIMITER ',' CSV HEADER;

\copy related FROM './largedata/related.csv' DELIMITER ',' CSV HEADER;