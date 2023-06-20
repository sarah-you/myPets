// client side API requests

/**
 * Fetches a single product from the API.
 * @param {number} productId The ID of the product to fetch.
 * @returns Promise that resolves to the product.
 */

// products fetch

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

// myCart fetch

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

export async function removeCartItem(productId) {
  const signInData = JSON.parse(localStorage.getItem('account'));
  const pw = signInData.pw;
  const req = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${pw}`,
    },
  };
  const res = await fetch(`/api/cart/${productId}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

// myWishList fetch

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

export async function removeWishListItem(productId) {
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
