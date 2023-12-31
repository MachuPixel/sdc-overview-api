# Retail Products API | E-Commerce Backend API Revamp: Microservices Architecture

Welcome to our revamped backend API service for our e-commerce site! Our team of two talented software engineers undertook a significant transformation to transition from a monolithic structure to a modern, service-oriented microservices architecture. This transition was designed to not only support our current system but to amplify its capabilities for the future.

## 🔥 Highlights:
- **Optimized Performance**: The products service that I developed has been meticulously optimized to handle production traffic seamlessly at a rate of **5000 requests per second (RPS)**.
- **Swift Response**: The same service consistently guarantees a response time of **less than 15 milliseconds**.
- **Robust & Reliable**: An outstanding **0% error rate** has been achieved, ensuring reliability and smooth user experiences.

## 📊 Data Overview:
Our e-commerce platform boasts a vast dataset:
- **Millions of Products**: Our expansive catalog ensures users have a plethora of options to choose from.
- **Rich Product Styles**: Each product on our platform is enriched with **around 10 unique styles**, offering depth and diversity.
- **SKU Inventory Table**: For each style, we meticulously track millions of products through our SKUs inventory table, ensuring stock accuracy and availability.
- **Extensive Photo Dataset**: We understand the importance of visuals in e-commerce. Hence, every single style for our products is accompanied by a rich photo dataset to provide clear and detailed imagery.
- **Related Products**: Dive deeper into our product range with our related products table. Each individual product showcases related items, enhancing user browsing and shopping experiences.

---

## 🛠 Technologies Used:
- **Backend Development**: Node.js | Express | Postgres | NGINX
- **Deployment**: Docker | AWS EC2
- **Testing**: Mocha | SuperTest | K6 | Loader.io

---
## Table of Contents
  - <a href='#-system-design'>System Design</a>
  - <a href='#️-usage'>Usage</a>
  - <a href='#-db-initialization-and-etl-queries-in-postgres'>DB Initialization and ETL Queries in Postgres</a>
  - <a href='#-quickstart'>Quickstart</a>
  - <a href='#other-services'>Other Services</a>
 
---

## 🏗 System Design
### Database Design
<img width="1308" alt="RDBMS schema" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/bb6122b0-84eb-4935-be58-85f9ae455dc0">

### Architecture
<img width="1078" alt="image" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/08c59bfb-27be-4d4f-9a16-31079c3a8458">

### Stress Test Results via Loader.io
<img width="1078" alt="Screenshot 2023-09-09 at 12 41 54 AM" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/3adb6c94-ab52-4e7c-8cbc-872f77884da3">

<img width="1078" alt="Untitled (1)" src="https://github.com/MachuPixel/sdc-overview-api/assets/136006024/02770ea8-4d11-4f3e-b3ba-b8fd5aa70f3e">



 ---

## ⚙️ Usage
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

## 🛠 DB Initialization and ETL Queries in Postgres

### Local: Create and seed the database:
To get started, download the data from:
`
https://drive.google.com/drive/folders/1Gqxt7Tw0I50OG2dn4LncHAJ_x_BnWuRX
`

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
## 🚀 Quickstart
To get started with our API:

  1. **Clone the repository**:
     ```
     git clone https://github.com/MachuPixel/sdc-overview-api.git
     ```
  2. **Navigate to the project directory**:
     ```
     cd sdc-overview-api
     ```
  3. **Install the dependencies**:
     ```
     npm install
     ```
  4. **Start the service**:
     ```
     npm start
     ```
  5. **Test the API**:
   Use Postman or any API client of your choice to test the endpoints. Here are some to get started:
   
   - **Fetch all products**:
     ```
     http://localhost:3000/products
     ```
   - **Fetch a specific product by its ID**:
     ```
     http://localhost:3000/products/${product_id}
     ```
   - **Fetch styles for a specific product**:
     ```
     http://localhost:3000/products/${product_id}/styles
     ```
   - **Fetch related products for a specific product**:
     ```
     http://localhost:3000/products/${product_id}/related
     ```

---
##  Other Services
Please reference other API Services that make up the other part of the e-commerce app API:
 - <a href='https://github.com/MachuPixel/QA-service'>Questions & Answers</a> by [Alisa Bondar](https://github.com/alisabondar)

---
