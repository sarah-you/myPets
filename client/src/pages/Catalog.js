import { Link } from 'react-router-dom';
import { FaCaretLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { fetchCatalog } from '../lib';
import './Catalog.css';

export default function Catalog() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadFav() {
      try {
        const products = await fetchCatalog();
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
