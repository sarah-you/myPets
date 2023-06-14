import { Product } from './Product';
import { useEffect, useState } from 'react';
import { fetchDogProd } from '../lib';

export default function DogProd() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadFav() {
      try {
        const products = await fetchDogProd();
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
