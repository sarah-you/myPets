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
        <div className="row">
          {products?.map((product) => (
            <div key={product.productId}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Product({ product }) {
  const {
    productName,
    petType,
    category,
    itemPrice,
    subscriptionPrice,
    imgUrl,
    imgUrl2,
    imgUrl3,
    imgUrl4,
    detail,
    detail2,
    detail3,
    detail4,
    detail5,
    productId,
  } = product;
  return (
    <>
      <Link to={`/details/${productId}`} className="prod-wrap">
        <img src={imgUrl} className="main-img" alt={productName} />
        <img src={imgUrl2} className="main-img" alt={productName} />
        <img src={imgUrl3} className="main-img" alt={productName} />
        <img src={imgUrl4} className="main-img" alt={productName} />
        <div className="prod-detail-wrap">
          <h5 className="prod-title">{productName}</h5>
          <p className="pet-type">{petType}</p>
          <p className="category">{category}</p>
          <p className="prod-price">{toDollars(itemPrice)}</p>
          <p className="prod-sub-price">{toDollars(subscriptionPrice)}</p>
          <ol className="prod-details">
            <li className="details">{detail}</li>
            <li className="details">{detail2}</li>
            <li className="details">{detail3}</li>
            <li className="details">{detail4}</li>
            <li className="details">{detail5}</li>
          </ol>
        </div>
      </Link>
    </>
  );
}
