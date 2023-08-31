\copy products FROM './sampledata/productSAMPLE.csv' DELIMITER ',' CSV HEADER;

\copy features FROM './sampledata/featuresSAMPLE.csv' DELIMITER ',' CSV HEADER;

\copy styles FROM './sampledata/stylesSAMPLE.csv' DELIMITER ',' CSV HEADER;

\copy photos FROM './sampledata/photosSAMPLE.csv' DELIMITER ',' CSV HEADER;

\copy stock FROM './sampledata/skusSAMPLE.csv' DELIMITER ',' CSV HEADER;

\copy related FROM './sampledata/relatedSAMPLE.csv' DELIMITER ',' CSV HEADER;
