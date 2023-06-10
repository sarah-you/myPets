import { useEffect, useState } from 'react';
import { fetchProduct, toDollars } from '../lib';
import './ProductDetails.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaCaretLeft } from 'react-icons/fa';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {productId}: {error.message}
      </div>
    );
  }
  if (!product) return null;
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
  } = product;
  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-md-5">
              <img src={imgUrl} alt={productName} className="main-img" />
              <img src={imgUrl2} alt={productName} className="img2" />
              <img src={imgUrl3} alt={productName} className="img3" />
              <img src={imgUrl4} alt={productName} className="img4" />
            </div>
            <div className="col-12 col-sm-6 col-md-7">
              <h2 className="name">{productName}</h2>
              <h5 className="text-secondary">{toDollars(itemPrice)}</h5>
              <h5 className="text-secondary">{toDollars(subscriptionPrice)}</h5>
              <p className="pet-type">{petType}</p>
              <p className="category">{category}</p>
              <p className="detail">{detail}</p>
              <p className="detail">{detail2}</p>
              <p className="detail">{detail3}</p>
              <p className="detail">{detail4}4</p>
              <p className="detail">{detail5}</p>
            </div>
          </div>
          <div className="row">
            <div className="col btn-wrap">
              <Link to="/">
                <div className="back-btn-wrap">
                  <FaCaretLeft />
                  <button className="btn home-btn">Back to Home</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
