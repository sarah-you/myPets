import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { fetchCatalog } from '../lib';
import './Catalog.css';
import { FaCaretLeft } from 'react-icons/fa';

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
      <h1 className="catalog-h1">Shop All Products</h1>
      <div className="product-list">
        {products?.map((product) => (
          <div key={product.productId} className="prod-wrap">
            <Product product={product} />
          </div>
        ))}
      </div>
      <div className="link">
        <Link to="/">
          <div className="back-btn-wrap">
            <FaCaretLeft />
            <button className="btn home-btn">Back to Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
