import { useEffect, useState } from 'react';
import { fetchProduct, toDollars, addtoCart, addtoWishList } from '../lib';
import './ProductDetails.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PdCarousel from '../components/PdCarousel';
import Ratings from '../lib/Ratings';
import { BsCart4 } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

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

  useEffect(() => {
    const stringData = localStorage.getItem('userInput');
    if (stringData !== null) {
      const userData = JSON.parse(stringData);
      setUserId(userData.userId);
    }
    return;
  }, []);

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
    ratings,
    reviews,
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

  async function handleCart() {
    try {
      await addtoCart(productId, userId);
      navigate('/cart');
    } catch (err) {
      alert(
        `Oops! Cannot add item to cart. Please check to see if you are logged in. Then confirm if this item is already added to your cart and try again!`
      );
    }
  }

  async function handleSaveItem() {
    try {
      await addtoWishList(productId, userId);
      navigate('/signout');
    } catch (err) {
      alert(
        `Oops! Cannot add item to wishlist. Please check to see if you are logged in. Then confirm if this item is already added to your wishlist and try again!`
      );
    }
  }

  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-12 col-sm-6 col-md-5 pd-imgs-wrap">
              <PdCarousel imgs={[imgUrl, imgUrl2, imgUrl3, imgUrl4]} />
            </div>
            <div className="col-12 col-sm-6 col-md-7">
              <h2 className="name">{productName}</h2>
              <div className="rev-rating-heart-wrap">
                <div className="r-wrap">
                  <Ratings className="ratings-comp" ratings={ratings} />
                  <p className="ratings">{ratings}</p>
                  <p className="reviews">{reviews} reviews</p>
                </div>
              </div>
              <div className="all-price-wrap">
                <div className="item-price-wrap">
                  <p className="ip-text">Item Price</p>
                  <h5 className="item-price">{toDollars(itemPrice)}</h5>
                </div>
                <div className="sub-price-wrap">
                  <p className="sp-text">myPets Price (monthly)</p>
                  <h5 className="sub-price">{toDollars(subscriptionPrice)}</h5>
                </div>
              </div>
              <ul className="details-wrap">
                <h4>Product Information</h4>
                <li className="detail">{detail}</li>
                <li className="detail">{detail2}</li>
                <li className="detail">{detail3}</li>
                <li className="detail">{detail4}</li>
                <li className="detail">{detail5}</li>
              </ul>
            </div>
            <div className="sub-n-save-wrap">
              <div className="sub-link-div">
                {localStorage.getItem('userInput') !== null ? (
                  <Link to="/success" className="pd-sub-link">
                    <h4 className="sub-text-h4">Subscribe Now</h4>
                  </Link>
                ) : (
                  <Link to="/subscription" className="pd-sub-link">
                    <h4 className="sub-text-h4">Subscribe Now</h4>
                  </Link>
                )}
              </div>
              <div className="pd-cart-wrap">
                {localStorage.getItem('account') !== null ? (
                  <Link to="/cart">
                    <button onClick={handleCart} className="cart-icon-btn">
                      <BsCart4 className="cart-icon" />
                      Add to Cart
                    </button>
                  </Link>
                ) : (
                  <Link to="/signin">
                    <button onClick={handleCart} className="cart-icon-btn">
                      <BsCart4 className="cart-icon" />
                      Add to Cart
                    </button>
                  </Link>
                )}
              </div>
              <div className="save-item-wrap">
                {localStorage.getItem('account') !== null ? (
                  <Link to="/signout">
                    <button onClick={handleSaveItem} className="heart-icon-btn">
                      <FaHeart className="heart-icon" />
                      Save Item
                    </button>
                  </Link>
                ) : (
                  <Link to="/signin">
                    <button onClick={handleSaveItem} className="heart-icon-btn">
                      <FaHeart className="heart-icon" />
                      Save Item
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col btn-wrap">
        <Link to="/">
          <div className="back-btn-wrap">
            <button className="btn home-btn">Home</button>
          </div>
        </Link>
        <Link to="/meow">
          <div className="back-btn-wrap">
            <button className="btn home-btn">Cats Page</button>
          </div>
        </Link>
        <Link to="/woof">
          <div className="back-btn-wrap">
            <button className="btn home-btn">Dogs Page</button>
          </div>
        </Link>
        <Link to="/catalog">
          <div className="back-btn-wrap">
            <button className="btn home-btn">Catalog Page</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
