// client side API requests

/**
 * Fetches all products from the API.
 * @returns Promise that resolves to an array of products.
 */

export async function fetchFav() {
  const res = await fetch('/api/favpets');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchCatalog() {
  const res = await fetch('/api/catalog');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

/**
 * Fetches a single product from the API.
 * @param {number} productId The ID of the product to fetch.
 * @returns Promise that resolves to the product.
 */
export async function fetchProduct(productId) {
  const res = await fetch(`/api/details/${productId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchCatProd() {
  const res = await fetch('/api/meow');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchDogProd() {
  const res = await fetch('/api/woof');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

//user related fetch

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

export async function addtoWishList(productId) {
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
    }),
  };
  const res = await fetch('/api/wishlist', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function fetchWishList() {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
  };
  const res = await fetch('/api/wishlist/items', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function removeItem(productId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
  };
  const res = await fetch(`/api/wishlist/${productId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
