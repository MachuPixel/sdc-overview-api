require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_URL,
  database: 'overview',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function testQueryPerformance(query, params = []) {
  const startTime = Date.now();

  await pool.query(query, params);

  const duration = Date.now() - startTime;
  return duration;
}


// (async function runTests() {...})() is an example of an Immediately Invoked Function Expression (IIFE) for asynchronous functions.
(async function runTests() {

  const productsQuery = `
    SELECT
      p.product_id AS id,
      p.product_name AS name,
      p.product_slogan AS slogan,
      p.product_description AS description,
      p.product_category AS category,
      p.product_default_price AS default_price
    FROM products AS p
    ORDER BY p.product_id
    LIMIT $1 OFFSET $2
  `;

  const featuresQuery = `
      SELECT
        p.product_id AS id,
        p.product_name AS name,
        p.product_slogan AS slogan,
        p.product_description AS description,
        p.product_category AS category,
        p.product_default_price AS default_price,
        array_agg(jsonb_build_object(
          'feature', f.feature_name,
          'value', f.feature_value
        )) AS features
      FROM products AS p
      LEFT JOIN features AS f ON p.product_id = f.product_id
      WHERE p.product_id = $1
      GROUP BY p.product_id;
    `;

    const stylesQuery = `
    SELECT
      s.style_id,
      s.style_name AS name,
      s.style_price AS original_price,
      s.style_price_sale AS sale_price,
      s.style_default AS "default?",
      array_agg(jsonb_build_object(
        'thumbnail_url', p.photo_thumbnail_url,
        'url', p.photo_url
      )) AS photos,
      json_object_agg(st.stock_id, jsonb_build_object(
        'quantity', st.stock_quantity,
        'size', st.stock_name
      )) AS skus
    FROM styles AS s
    JOIN photos AS p ON s.style_id = p.style_id
    JOIN stock AS st ON s.style_id = st.style_id
    WHERE s.product_id = $1
    GROUP BY s.style_id
    ORDER BY s.style_id;
  `;

  const relatedQuery = `
      SELECT related_product_id
      FROM related
      WHERE current_product_id = $1;
    `;

  const queries = [
    {
      sql: productsQuery,
      params: [Math.floor(Math.random() * 200) + 1, Math.floor(Math.random() * 10) + 1],
      description: 'Fetch products',
      acceptableDuration: 50  // duration in milliseconds, adjust as needed
    },

    {
      sql: featuresQuery,
      params: [Math.floor(Math.random() * 1000011) + 1],
      description: 'Fetch product features by product id',
      acceptableDuration: 50  // duration in milliseconds, adjust as needed
    },

    {
      sql: stylesQuery,
      params: [Math.floor(Math.random() * 1000011) + 1],
      description: 'Fetch product styles by product id',
      acceptableDuration: 50  // duration in milliseconds, adjust as needed
    },

    {
      sql: relatedQuery,
      params: [Math.floor(Math.random() * 1000011) + 1],
      description: 'Fetch related products by product id',
      acceptableDuration: 50  // duration in milliseconds, adjust as needed
    },

  ];

  for (const queryTest of queries) {
    for (let i = 0; i < 10; i++) {
      // Regenerate params if they're based on random numbers for each run
      switch (queryTest.description) {
        case 'Fetch products':
          queryTest.params = [Math.floor(Math.random() * 200) + 1, Math.floor(Math.random() * 10) + 1];
          break;
        case 'Fetch product features by product id':
        case 'Fetch product styles by product id':
        case 'Fetch related products by product id':
          queryTest.params = [Math.floor(Math.random() * 1000011) + 1];
          break;
        default:
          break;
      }

      const duration = await testQueryPerformance(queryTest.sql, queryTest.params);

      if (duration <= queryTest.acceptableDuration) {
        console.log(`[Attempt ${i+1}] ${queryTest.description} for params ${queryTest.params} passed in ${duration}ms`);
      } else {
        console.error(`[Attempt ${i+1}] ${queryTest.description} failed. Took ${duration}ms, expected under ${queryTest.acceptableDuration}ms.`);
      }
    }
  }

  pool.end();
})();
