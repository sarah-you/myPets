// client side API requests

// products fetch

/**
 * Fetches the most popular products from the myPets API.
 * @param {}
 * @returns Promise that resolves to the product.
 */
export async function fetchFav() {
  const res = await fetch('/api/favpets');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches all products from the myPets API.
 * @param {}
 * @returns Promise that resolves to the product.
 */
export async function fetchCatalog() {
  const res = await fetch('/api/catalog');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches a single product from the myPets API.
 * @param {number} productId The ID of the product to fetch.
 * @returns Promise that resolves to the product.
 */
export async function fetchProduct(productId) {
  const res = await fetch(`/api/details/${productId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches all the cat products from the API.
 * @param {}
 * @returns Promise that resolves to the product.
 */
export async function fetchCatProd() {
  const res = await fetch('/api/meow');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches all the dog products from the myPets API.
 * @param {}
 * @returns Promise that resolves to the product.
 */
export async function fetchDogProd() {
  const res = await fetch('/api/woof');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

//user related fetch

/**
 * Fetches the user from the subscription API.
 * @param {number} userId The ID of the user.
 * @returns Promise that resolves to the product.
 */
export async function fetchUser(userId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
  };
  const res = await fetch(`/api/success/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Adds the user data to the subscription API.
 * @param {string} firstName of user
 * @param {string} lastName of user
 * @param {string} email of user
 * @param {string} address of user
 * @param {string} username of user
 * @param {string} password of user
 * @returns Promise that resolves to the product.
 */
export async function createSubscriber(
  firstName,
  lastName,
  email,
  address,
  username,
  password
) {
  const req = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      address,
      username,
      password,
    }),
  };
  const res = await fetch('/api/subscription', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Deletes the user from the subscription API.
 * @param {number} userId The ID of the user.
 * @returns Promise that resolves to the product.
 */
export async function deleteSubscriber(userId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
  };
  const res = await fetch(`/api/success/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

// myCart fetch

/**
 * Adds a product to the myCart API.
 * @param {number} userId The ID of the user.
 * @param {number} productId The ID of the product.
 * @returns Promise that resolves to the product.
 */
export async function addtoCart(productId, userId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${pw}`,
    },
    body: JSON.stringify({
      productId,
      userId,
    }),
  };
  const res = await fetch('/api/addcart', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches all products from the myCart API.
 * @param {number} userId The ID of the user.
 * @param {number} productId The ID of the product.
 * @returns Promise that resolves to the product.
 */
export async function fetchCart(userId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
  };
  const res = await fetch(`/api/cart/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Deletes a product from the myCart API.
 * @param {number} productId The ID of the product.
 * @returns Promise that resolves to the product.
 */
export async function removeCartItem(productId, userId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
    body: JSON.stringify({
      productId,
      userId,
    }),
  };
  const res = await fetch(`/api/cart/${userId}/${productId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

// myWishList fetch

/**
 * Adds a product to the myWishList API.
 * @param {number} userId The ID of the user.
 * @param {number} productId The ID of the product.
 * @returns Promise that resolves to the product.
 */
export async function addtoWishList(productId, userId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${pw}`,
    },
    body: JSON.stringify({
      productId,
      userId,
    }),
  };
  const res = await fetch('/api/wishlist', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches all products from the myWishList API.
 * @param {number} userId The ID of the user.
 * @returns Promise that resolves to the product.
 */
export async function fetchWishList(userId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
  };
  const res = await fetch(`/api/wishlist/${userId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Deletes a product from the myWishList API.
 * @param {number} productId The ID of the product.
 * @returns Promise that resolves to the product.
 */
export async function removeWishListItem(productId, userId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
    body: JSON.stringify({
      productId,
      userId,
    }),
  };
  const res = await fetch(`/api/wishlist/${userId}/${productId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
