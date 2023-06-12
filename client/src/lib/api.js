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

export async function createSubscriber(firstName, lastName, email, address) {
  const req = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, email, address }),
  };
  const res = await fetch('/api/subscription', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
