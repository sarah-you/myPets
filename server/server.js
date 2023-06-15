import 'dotenv/config';
import express from 'express';
import ClientError from './lib/client-error.js';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// data for landing page (pet favorites)
app.get('/api/favpets', async (req, res, next) => {
  try {
    const sql = `
SELECT *
FROM "myPets"
WHERE "subscriptionPrice" IS NOT NULL
ORDER BY "ratings" desc
LIMIT 6
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// data for cat page (Meow page)
app.get('/api/meow', async (req, res, next) => {
  try {
    const sql = `
SELECT *
FROM "myPets"
WHERE "petType" = 'cat';
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// data for dog page (Woof page)
app.get('/api/woof', async (req, res, next) => {
  try {
    const sql = `
SELECT *
FROM "myPets"
WHERE "petType" = 'dog';
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// data for all products (Catalog page)
app.get('/api/catalog', async (req, res, next) => {
  try {
    const sql = `
SELECT *
FROM "myPets"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// data for specific product based on productId (ProductDetails)
app.get('/api/details/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }
    const sql = `
      select *
        from "myPets"
        where "productId" = $1
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(
        404,
        `cannot find product with productId ${productId}`
      );
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// client POST subscription form (Subscription page)
app.post('/api/subscription', async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const address = req.body.address;
    if (!firstName || !lastName || !email || !address) {
      throw new ClientError(
        400,
        `first name, last name, email, and address are required fields`
      );
    }
    const sql = `
    insert into "subscription" ("firstName", "lastName", "email", "address")
    values ($1, $2, $3, $4)
    returning *;
    `;
    const params = [firstName, lastName, email, address];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// client remove/DELETE subscription (Subscription page)
app.delete('/api/success/:userId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }
    const sql = `
      delete
        from "subscription"
        where "userId" = $1
        returning *;
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(
        400,
        `cannot find subscriber with 'userId' ${userId}`
      );
    }
    res.status(201).send(`User ID: ${userId} has been unsubscribed`);
  } catch (err) {
    next(err);
  }
});

// get userID of subscribed user
app.get('/api/success/:userId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      throw new ClientError(400, 'userId must be a positive integer');
    }
    const sql = `
      select *
        from "subscription"
        where "userId" = $1
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `cannot find user with userId ${userId}`);
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// client update/PUT subscription form info (Subscription page)
// app.put('/api/subscription/:userId', async (res, req, next) => {
//   try {
//     const userId = req.params.userId;
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const address = req.body.address;
//     if (!firstName || !lastName || !email || !address || !userId) {
//       throw new ClientError(
//         400,
//         `first name, last name, email, address, and userId are required fields`
//       );
//     }
//     const sql = `
//     update "subscription"
//     set "firstName" = $2,
//         "lastName" = $3,
//         "email" = $4,
//         "address" = $5
//     where "userId" = $1
//     returning *;
//     `;
//     const params = [userId, firstName, lastName, email, address];
//     const result = await db.query(sql, params);
//     if (!result.rows[0]) {
//       throw new ClientError(
//         404,
//         `cannot find subscriber with 'userId' ${userId}`
//       );
//     }
//     res.status(200).json(result.rows);
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
