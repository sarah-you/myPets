import 'dotenv/config';
import express from 'express';
import {
  ClientError,
  errorMiddleware,
  authorizationMiddleware,
} from './lib/index.js';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

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

// user related fetch

// fetchUser(userId) -- get user info of subscribed user
app.get(
  '/api/success/:userId',
  authorizationMiddleware,
  async (req, res, next) => {
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
  }
);

// function createSubscriber -- client Sign Up form (Subscription page)
app.post('/api/subscription', async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const address = req.body.address;
    const username = req.body.username;
    const password = req.body.password;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !username ||
      !password
    ) {
      throw new ClientError(400, `all fields are required`);
    }

    const hashedPassword = await argon2.hash(password);
    const sql = `
    insert into "subscription" ("firstName", "lastName", "email", "address", "username", "hashedPassword")
    values ($1, $2, $3, $4, $5, $6)
    returning *;
    `;
    const params = [
      firstName,
      lastName,
      email,
      address,
      username,
      hashedPassword,
    ];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// Subscriber Sign In (api inside SignIn.js handleSubmit function)
app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword"
        from "subscription"
      where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

// deleteSubscriber(userId) -- client remove/DELETE subscription (Subscription page)
app.delete(
  '/api/success/:userId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        throw new ClientError(400, 'userId must be a positive integer');
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
      res.status(201).json(`User ID: ${userId} has been unsubscribed`);
    } catch (err) {
      next(err);
    }
  }
);

// addtoCart (productId) -- add item to subscribers's wishlist (to db)
app.post('/api/addcart', authorizationMiddleware, async (req, res, next) => {
  try {
    const productId = req.body.productId;
    if (!productId) {
      throw new ClientError(400, `all fields are required`);
    }
    const sql = `
    insert into "myCart" ("productId")
    values ($1)
    returning *;
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// function fetchCart() -- display the cart item(s) in Cart page
app.get('/api/cart/items', authorizationMiddleware, async (req, res, next) => {
  try {
    const sql = `
select *
  from "myPets"
  join "myCart" using ("productId");
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// function removeCartItem(productId) -- remove selected item from cart
app.delete(
  '/api/cart/:productId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const productId = Number(req.params.productId);
      if (!productId) {
        throw new ClientError(400, 'productId must be a positive integer');
      }
      const sql = `
       delete
        from "myCart"
        where "productId" = $1
        returning *;
 `;
      const params = [productId];
      const result = await db.query(sql, params);
      if (!result.rows[0]) {
        throw new ClientError(
          400,
          `cannot find item with 'productId' ${productId}`
        );
      }
      res.status(201).json(`${productId} has been removed from myCart`);
    } catch (err) {
      next(err);
    }
  }
);

// addtoWishList(productId) -- add item to myWishList
app.post('/api/wishlist', authorizationMiddleware, async (req, res, next) => {
  try {
    const { productId, userId } = req.body;
    if (!productId || !userId) {
      throw new ClientError(400, `all fields are required`);
    }
    const sql = `
    insert into "myWishList" ("productId", "userId")
    values ($1, $2)
    returning *;
    `;
    const params = [productId, userId];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// function fetchWishList() -- display the wishlist item(s) in wishlist section
app.get(
  '/api/wishlist/:userId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        throw new ClientError(400, 'userId must be a positive integer');
      }
      const sql = `
select *
  from "myPets"
  join "myWishList" using ("productId")
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
  }
);

// // function removeItem(productId) -- remove selected item from wishlist
app.delete(
  '/api/wishlist/:productId',
  authorizationMiddleware,
  async (req, res, next) => {
    try {
      const productId = Number(req.params.productId);
      if (!productId) {
        throw new ClientError(400, 'productId must be a positive integer');
      }
      const sql = `
       delete
        from "myWishList"
        where "productId" = $1
        returning *;
 `;
      const params = [productId];
      const result = await db.query(sql, params);
      if (!result.rows[0]) {
        throw new ClientError(
          400,
          `cannot find item with 'productId' ${productId}`
        );
      }
      res.status(201).json(`${productId} has been removed from myWishList`);
    } catch (err) {
      next(err);
    }
  }
);

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
