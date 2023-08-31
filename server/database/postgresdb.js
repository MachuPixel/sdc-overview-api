require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_URL,
  database: 'overview',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getProducts = (cb) => {
  pool.query('SELECT * FROM products LIMIT 10', (err, res) => {
    if (err) {
      cb (err);
    } else {
      cb(null, res.rows);
    }
  })

};

const getFeatures = async (product_id, cb) => {
  // try {
  //   const productQuery = `SELECT * FROM products WHERE product_id = ${product_id}`;
  //   const productResult = await pool.query(productQuery);
  //   const productObj = productResult.rows[0];

  //   const featuresQuery = `SELECT feature_name, feature_value FROM features WHERE product_id = ${product_id}`;
  //   const featuresResult = await pool.query(featuresQuery);
  //   const features = featuresResult.rows;

  //   productObj.features = features;

  //   cb(null, productObj);
  // } catch (err) {
  //   console.log(`Error while getting features for product ${product_id}:`, err);
  //   cb(err);
  // }
  try {
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

    const featuresResult = await pool.query(featuresQuery, [product_id]);
    const features = featuresResult.rows[0];
    cb(null, features);
  } catch (err) {
    console.log(`Error while getting features for product ${product_id}:`, err);
    cb(err);
  }
};

const getStyles = async (product_id, cb) => {
  try {
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

    const stylesResult = await pool.query(stylesQuery, [product_id]);
    const styles = stylesResult.rows;

    const response = {
      product_id: product_id,
      results: styles,
    };

    cb(null, response);
  } catch (err) {
    console.log(`Error while getting styles for product ${product_id}:`, err);
    cb(err);
  }
};



// module.exports.pool = pool;
module.exports = {
  getProducts,
  getFeatures,
  getStyles
 };



// GET https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products

// [
//   {
//       "id": 37311,
//       "campus": "hr-rfe",
//       "name": "Camo Onesie",
//       "slogan": "Blend in to your crowd",
//       "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//       "category": "Jackets",
//       "default_price": "140.00",
//       "created_at": "2021-08-13T14:37:33.145Z",
//       "updated_at": "2021-08-13T14:37:33.145Z"
//   },
//  ...
// ]



// GET https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37311

// {
//   "id": 37311,
//   "campus": "hr-rfe",
//   "name": "Camo Onesie",
//   "slogan": "Blend in to your crowd",
//   "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//   "category": "Jackets",
//   "default_price": "140.00",
//   "created_at": "2021-08-13T14:37:33.145Z",
//   "updated_at": "2021-08-13T14:37:33.145Z",
//   "features": [
//       {
//           "feature": "Fabric",
//           "value": "Canvas"
//       },
//       {
//           "feature": "Buttons",
//           "value": "Brass"
//       }
//   ]
// }



// GET https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37311/styles

// {
//   "product_id": "37311",
//   "results": [
//       {
//           "style_id": 220998,
//           "name": "Forest Green & Black",
//           "original_price": "140.00",
//           "sale_price": null,
//           "default?": true,
//           "photos": [
//               {
//                   "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                   "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//               },
//               {
//                   "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                   "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
//               },
//               {
//                   "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                   "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
//               },
//               {
//                   "thumbnail_url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
//                   "url": "https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
//               },
//               {
//                   "thumbnail_url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                   "url": "https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//               },
//               {
//                   "thumbnail_url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
//                   "url": "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
//               }
//           ],
//           "skus": {
//               "1281032": {
//                   "quantity": 8,
//                   "size": "XS"
//               },
//               "1281033": {
//                   "quantity": 16,
//                   "size": "S"
//               },
//               "1281034": {
//                   "quantity": 17,
//                   "size": "M"
//               },
//               "1281035": {
//                   "quantity": 10,
//                   "size": "L"
//               },
//               "1281036": {
//                   "quantity": 15,
//                   "size": "XL"
//               },
//               "1281037": {
//                   "quantity": 4,
//                   "size": "XL"
//               }
//           }
//       },
//       ...
//     ]
// }