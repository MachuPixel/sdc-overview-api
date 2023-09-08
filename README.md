# Retail Products API | Back-end services for e-commerce web app

Our 2 software engineers rebuilt back-end API service for a monolithic to service-oriented micorservices to support our existing e-commerce site in this project. The service I built was scaled to meet the demands of production traffic with 500RPS with < 25ms response time with 0% error rate.

## Techonologies Used

Backend Development: Node.js | Express | Postgres | NGINX
</br>
Deployement: Docker | AWS EC2
</br>
Testing: Mocha | SuperTest | K6 | Loader.io

---
## Table of Contents
  - <a href='#system-design'>System Design</a>
  - <a href='#usage'>Usage</a>
  - <a href='#db-initialization-and-etl-quaries-in-postgres'>DB Initialization and ETL Quaries in Postgres</a>
  - <a href='#installation'>Installation</a>
  - <a href='#other-services'>Other Services</a>
 
---

## System Design
 ---

## Usage
  ---

## DB Initialization and ETL Quaries in Postgres

### Local: Create and seed the database:

Running these command in the terminal
```
npm run configure
```

Running the following in psql command line import data to the database:
```
psql -U node_user overview < ./server/database/largeseeder.sql
```

Then you can using following command to check the new database and the tables
```
psql overview -U node_user
```
---
## Installation
  1. In the terminal inside, run `npm start` to start server
  2. Test by typing `http://localhost:3000/products` in the Postman to see the response.

---
