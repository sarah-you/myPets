import './PetFav.css';
import { useEffect, useState } from 'react';
import { fetchFav, toDollars } from '../lib';
import { Link } from 'react-router-dom';

export default function PetFav() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadFav() {
      try {
        const products = await fetchFav();
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
  if (error) return <div>Error Loading Pet Favorites: {error.message}</div>;

  return (
    <div className="container">
      <div className="pet-fav-wrap">
        <h2 className="pet-fav">Pet Favorites ✨</h2>
        <div className="product-list">
          {products?.map((product) => (
            <div key={product.productId} className="prod-wrap">
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Product({ product }) {
  const { productName, itemPrice, imgUrl, detail, productId } = product;
  return (
    <div className="prod-card">
      <img src={imgUrl} alt={productName} />
      <div className="card-content">
        <h3 className="card-title">{productName}</h3>
        <p className="card-text price">{toDollars(itemPrice)}</p>
        <p className="card-text detail">{detail}</p>
        <Link to={`/details/${productId}`}>
          <button className="view-btn">View Product</button>
        </Link>
      </div>
    </div>
  );
}
