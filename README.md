# Retail Products API | Back-end services for e-commerce web app

Our 2 software engineers rebuilt back-end API service for a monolithic to service-oriented micorservices to support our existing e-commerce site in this project. The service I built was scaled to meet the demands of production traffic with 500RPS with < 25ms response time with 0% error rate.

## Techonologies Used

Backend Development: Node.js | Express | Postgres | NGINX
</br>
Deployment: Docker | AWS EC2
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
### Database Design
<img width="1308" alt="RDBMS schema" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/bb6122b0-84eb-4935-be58-85f9ae455dc0">

### Architecture
<img width="1078" alt="Screenshot 2023-09-08 at 8 37 15 PM" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/0db20c6a-7de7-49ee-93db-09539bc549ed">

### Stress Test Results via Loader.io
<img width="1078" alt="Untitled (1)" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/10505a5a-1cdb-473e-9914-fc1c69e5b755">

<img width="1078" alt="Untitled (1) copy" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/065d2204-48a9-4d9e-b5f6-f3fa4f8c3f9a">


 ---

## Usage
### List Products
  Retrieves the list of products.

  `GET /products`
  
  *Query Parameters*

  | Parameter	 | Type      | Description                                               |
  | ---------- | :-------: | --------------------------------------------------------- |
  | page |  integer  | Selects the page of results to return. Default 1. |
  | count |  integer  | Specifies how many results per page to return. Default 5. |

  Response: `Status: 200 OK`
  <img width="1078" alt="Screenshot 2023-09-08 at 7 47 43 PM" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/ca1c19d3-09cf-4faf-bfe3-87c497121c73">

### Product Information
  Returns all product level information for a specified product id.

  `GET /products/:product_id`
  
  *Query Parameters*

  | Parameter	 | Type      | Description                                               |
  | ---------- | :-------: | --------------------------------------------------------- |
  | product_id |  integer  | Required ID of the Product requested |

  Response: `Status: 200 OK`
  <img width="1078" alt="Screenshot 2023-09-08 at 7 50 43 PM" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/54fe8794-fe35-49ec-9dc9-e530aabdf9eb">

### Product Styles
  Returns the all styles available for the given product.
  
  `GET /products/:product_id/styles`
  
  *Query Parameters*

  | Parameter	 | Type      | Description                                               |
  | ---------- | :-------: | --------------------------------------------------------- |
  | product_id |  integer  | Required ID of the Product requested |

  Response: `Status: 200 OK`
  <img width="1078" alt="Screenshot 2023-09-08 at 7 53 14 PM" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/b9a57e77-8b70-4b32-b0c3-e47a01933292">
  <img width="1078" alt="Untitled (1)" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/8bdde80a-0fa5-4294-88ba-49df5859eb21">

### Related Products
  Returns the id's of products related to the product specified.
  
  `GET /products/:product_id/related`
  
  *Query Parameters*

  | Parameter	 | Type      | Description                                               |
  | ---------- | :-------: | --------------------------------------------------------- |
  | product_id |  integer  | Required ID of the Product requested |

  Response: `Status: 200 OK`
<img width="1078" alt="Screenshot 2023-09-08 at 7 55 31 PM" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/0eff8836-893a-4ee3-99ad-934104ef1f7d">

  ---

## DB Initialization and ETL Quaries in Postgres

### Local: Create and seed the database:

1. Running these command in the terminal
```
npm run configure
```

2. Running the following in psql command line import data to the database:
```
psql -U node_user overview < ./server/database/largeseeder.sql
```

3. Then you can using following command to check the new database and the tables
```
psql overview -U node_user
```
---
## Installation
  1. In the terminal inside, run `npm start` to start server
  2. Test by typing `http://localhost:3000/products` in the Postman to see the response.

---
