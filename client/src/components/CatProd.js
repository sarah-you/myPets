import { Product } from './Product';
import { useEffect, useState } from 'react';
import { fetchCatProd } from '../lib';

export default function CatProd() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadFav() {
      try {
        const products = await fetchCatProd();
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadFav();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) console.log(error);
  if (error) return <div>Error Loading Cat Products: {error.message}</div>;

  return (
    <div className="container">
      <div className="product-list">
        {products?.map((product) => (
          <div key={product.productId} className="prod-wrap">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
